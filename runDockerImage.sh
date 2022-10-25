#!/bin/bash

echo "Not implemented yet"
exit 0

# This script runs a docker image of a Dockerfile

# Usage: ./runDockerImage.sh <image>

# Example: ./runDockerImage.sh path-traversal

# Check if it was run with sudo
if [ "$EUID" -ne 0 ]; then
  echo "Please run as root"
  exit
fi

# check if the image name is specified
if [ -z "$1" ]; then
  echo "No image name specified"
  exit 1
fi

# Check if the image exists
if [ -z "$(docker images -q $1)" ]; then
  echo "Image $1 does not exist, try running generateDockerImage.sh first"
  exit 1
fi

additonalArgs=""

echo "All arguments: $*"

# Add all arguments after the first one to the additional arguments
for i in "$@"; do
  #print the index
  echo "Argument: $i"
  if [ "$i" != "$1" ]; then
    # if additionalArgs is not empty, add a space and the argument
    echo "Adding argument $i"
    additionalArgs+=" $i"
  fi
done

echo "Running image $1 with additional arguments$additionalArgs"
echo "docker run${additonalArgs} ${1}"
# Run the image
docker run"${additonalArgs} ${1}"
