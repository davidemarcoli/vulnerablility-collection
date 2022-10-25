#!/bin/bash

# make a function
function sortString() {
  sort_result=$(echo "$1" | grep -o . | sort | tr -d "\n")
}

# Sort the argument 1 by alphabetical order
# and store it in a variable
sortString "$1"
sorted=$sort_result
echo "$sorted"

inputHash=$(/bin/echo "$sorted" | /usr/bin/md5sum | /bin/cut -f1 -d" ")

solutionHash="e154b0145709a73e9f51e2db116764c2"


echo "$inputHash"
echo "$solutionHash"

# test if the input hash is the same as the solution hash
if [ "$inputHash" == "$solutionHash" ]; then
  echo "Correct"
  exit 0
else
  echo "Incorrect"
  exit 1
fi