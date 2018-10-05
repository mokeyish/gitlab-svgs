#!/usr/bin/env bash

echo "Generating SVGs"

yarn run svg

echo -e "\nChecking if there are uncommitted changes\n"

RESULT=$(git status --porcelain dist)

if [ -n "$RESULT" ]; then
  echo "There are uncommitted changes to the dist/ folder.";
  echo -e "Please execute \`yarn run svg\` and push updates to the files below\n"
  echo "$RESULT"
  exit 1
fi

echo "No uncommited changes"
exit 0
