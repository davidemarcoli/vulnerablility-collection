#!/bin/bash

# This script generates a docker image of a Dockerfile in a given directory

# Usage: ./generateDockerImage.sh <folder>

# Example: ./generateDockerImage.sh path-traversal

# Check if it was run with sudo
if [ "$EUID" -ne 0 ]
  then echo "Please run as root"
  exit
fi

# Check if a folder is specified
if [ -z "$1" ]; then
    echo "No folder specified"
    exit 1
fi

# Check if the folder exists
if [ ! -d "$1" ]; then
    echo "Folder $1 does not exist"
    exit 1
fi

# Check if a Dockerfile exists in the folder
if [ ! -f "$1/Dockerfile" ]; then
    echo "Dockerfile does not exist in folder $1"
    exit 1
fi

# Get the name of the folder
folderName=$(basename "$1")

# Get the name of the image
imageName=$(echo "$folderName" | tr '[:upper:]' '[:lower:]')

# Generate the image
docker build -t "$imageName" "$1"