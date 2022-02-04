![labgraph-interactive](https://socialify.git.ci/MLH-Fellowship/labgraph-interactive/image?description=1&descriptionEditable=Discover%20LabGraph%20with%20us!&font=Rokkitt&issues=1&logo=https%3A%2F%2Fimages.emojiterra.com%2Fgoogle%2Fandroid-11%2F512px%2F1f4c9.png&pattern=Circuit%20Board&pulls=1&stargazers=1&theme=Light)

# LabGraph Interactive

Learning LabGraph online.

## What is LabGraph?

**LabGraph** is a a **Python-first framework used to build sophisticated research systems** with *real-time streaming*, *graph API*, and *parallelism*. Facebook Researchers use it prototype wearable hardware systems and process digital signals under their [**VR/AR efforts into the Metaverse**](https://tech.fb.com/ar-vr/).

To put it simply, LabGraph sets the relationship between the inputs and outputs of computations and provides the needed tooling to run them in parallel to help developers focus on algorithms instead of the environment.

## What is LabGraph Interactive?

As MLH Fellows who have not used LabGraph before, **we had a hard time understanding its purpose, how to set it up correctly, and what to expect from the library**. So we decided to help future MLH Fellows **get up to speed both on concepts and usage** with an interactive tool.

We built the interactive tool to let users get the taste of LabGraph with zero commitments. The interactive terminal lets the users run simulations we prepared with **different numbers of features** and **see their expected outputs**.

## How to Use LabGraph Interactive?

1. Navigate to the website hosted on GitHub Pages at [**mlh-fellowship.github.io/labgraph-interactive**](https://mlh-fellowship.github.io/labgraph-interactive/)
2. Type `help` into the terminal
3. Run the commands you would like to try out
4. Check the resulted graph built with random data

## How to Use LabGraph?

To run LabGraph simulations on your machine, follow steps listed below:

1. Run `pip install labgraph` to install LabGraph along with its dependecieis
2. Run `python setup.py install` to work with the simulation we prepared and listed under `random_labgraph/simulation.py`
3. Run `python random_labgraph/simulation.py 100` to get a graph produced with LabGraph's node in real-time

![](https://raw.githubusercontent.com/MLH-Fellowship/labgraph-interactive/main/docs/media/simple_viz.gif)

## License

This project is served unded the MIT License.

```
MIT License

Copyright (c) 2022 MLH Fellowship

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```