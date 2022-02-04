#!/usr/bin/env/python3

from setuptools import find_packages, setup

setup(
    name="random_labgraph",
    version="1.0.0",
    description="Trying out LabGraph with random noise generator",
    packages=find_packages(),
    python_requires=">=3.8",
    install_requires=[
        "labgraph>=2.0.0",
        "matplotlib>=3.1.2",
        "numpy>=1.19.5",
    ],
    include_package_data=True,
)
