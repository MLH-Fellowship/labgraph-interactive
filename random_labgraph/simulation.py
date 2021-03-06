# Built while following LabGraph's explantion of concepts https://github.com/facebookresearch/labgraph/blob/main/docs/concepts.md
import asyncio
import numpy as np
import labgraph as lg
from dataclasses import field
from typing import Any, List, Optional, Tuple

import matplotlib.animation as animation
import matplotlib.axes
import matplotlib.pyplot as plt
import numpy as np

import argparse
parser = argparse.ArgumentParser()
parser.add_argument("NUM_FEATURES", help="The number of features used for the graph")
args = parser.parse_args()

# Constants used by nodes
SAMPLE_RATE = 10.0
NUM_FEATURES = int(args.NUM_FEATURES)
WINDOW = 2.0
REFRESH_RATE = 2.0

# Message is a piece of data with a consistent structure
class RandomMessage(lg.Message):
    timestamp: float
    data: np.ndarray

import time
random_message = RandomMessage(
    timestamp=time.time(), data=np.random.rand(100)
)

class CustomMessage(RandomMessage):
  button_pressed: bool

custom_message = CustomMessage(
  timestamp=time.time(),
  data=np.random.rand(100),
  button_pressed=True,
)

class RollingState(lg.State):
    messages: List[RandomMessage] = field(default_factory=list)

class RollingConfig(lg.Config):
    window: float

class RollingAverager(lg.Node):
    INPUT = lg.Topic(RandomMessage)
    OUTPUT = lg.Topic(RandomMessage)

    state: RollingState
    config: RollingConfig

    @lg.subscriber(INPUT)
    @lg.publisher(OUTPUT)
    async def average(self, message: RandomMessage) -> lg.AsyncPublisher:
        current_time = time.time()
        self.state.messages.append(message)
        self.state.messages = [
            message
            for message in self.state.messages
            if message.timestamp >= current_time - self.config.window
        ]
        if len(self.state.messages) == 0:
            return
        all_data = np.stack([message.data for message in self.state.messages])
        mean_data = np.mean(all_data, axis=0)
        yield self.OUTPUT, RandomMessage(timestamp=current_time, data=mean_data)

class GeneratorConfig(lg.Config):
    sample_rate: float
    num_features: int

class Generator(lg.Node):
    OUTPUT = lg.Topic(RandomMessage)
    config: GeneratorConfig

    @lg.publisher(OUTPUT)
    async def generate_noise(self) -> lg.AsyncPublisher:
        while True:
            yield self.OUTPUT, RandomMessage(
                timestamp=time.time(), data=np.random.rand(self.config.num_features)
            )
            await asyncio.sleep(1 / self.config.sample_rate)

class AveragedNoiseConfig(lg.Config):
    sample_rate: float
    num_features: int
    window: float

class AveragedNoise(lg.Group):
    OUTPUT = lg.Topic(RandomMessage)

    config: AveragedNoiseConfig
    GENERATOR: Generator
    ROLLING_AVERAGER: RollingAverager

    def connections(self) -> lg.Connections:
        return (
            (self.GENERATOR.OUTPUT, self.ROLLING_AVERAGER.INPUT),
            (self.ROLLING_AVERAGER.OUTPUT, self.OUTPUT),
        )

    def setup(self) -> None:
        # Cascade configuration to contained nodes
        self.GENERATOR.configure(
            GeneratorConfig(
                sample_rate=self.config.sample_rate,
                num_features=self.config.num_features,
            )
        )
        self.ROLLING_AVERAGER.configure(RollingConfig(window=self.config.window))

# The state of the Plot: holds the most recent data received, which should be displayed
class PlotState(lg.State):
    data: Optional[np.ndarray] = None


# The configuration for the Plot
class PlotConfig(lg.Config):
    refresh_rate: float  # How frequently to refresh the bar graph
    num_bars: int  # The number of bars to display (note this should be == num_features)


# A node that creates a matplotlib bar graph that displays the produced data in
# real-time
class Plot(lg.Node):
    INPUT = lg.Topic(RandomMessage)
    state: PlotState
    config: PlotConfig

    def setup(self) -> None:
        self.ax: Optional[matplotlib.axes.Axes] = None

    @lg.subscriber(INPUT)
    def got_message(self, message: RandomMessage) -> None:
        self.state.data = message.data

    @lg.main
    def run_plot(self) -> None:
        fig = plt.figure()
        self.ax = fig.add_subplot(1, 1, 1)
        self.ax.set_ylim((0, 1))
        anim = animation.FuncAnimation(  # noqa: F841
            fig, self._animate, interval=1 / self.config.refresh_rate * 1000
        )
        plt.show()
        raise lg.NormalTermination()

    def _animate(self, i: int) -> None:
        if self.ax is None:
            return
        self.ax.clear()
        self.ax.set_ylim([0, 1])
        self.ax.bar(range(self.config.num_bars), self.state.data)

class Demo(lg.Graph):
    AVERAGED_NOISE: AveragedNoise
    PLOT: Plot

    def setup(self) -> None:
        self.AVERAGED_NOISE.configure(
            AveragedNoiseConfig(
                sample_rate=SAMPLE_RATE, num_features=NUM_FEATURES, window=WINDOW
            )
        )
        self.PLOT.configure(
            PlotConfig(refresh_rate=REFRESH_RATE, num_bars=NUM_FEATURES)
        )

    def connections(self) -> lg.Connections:
        return ((self.AVERAGED_NOISE.OUTPUT, self.PLOT.INPUT),)

    def process_modules(self) -> Tuple[lg.Module, ...]:
        return (self.AVERAGED_NOISE, self.PLOT)

if __name__ == "__main__":
  lg.run(Demo)
