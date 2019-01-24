#!/usr/bin/env bash

LAST_TAG="$1"

>&2 echo "Checking LAST_TAG $LAST_TAG against HEAD, changes:"

if git diff "$LAST_TAG..HEAD" --quiet -- sprite_icons illustrations; then
  >&2 echo "No changes"
else
  >&2 git diff "$LAST_TAG..HEAD" --name-only -- sprite_icons illustrations
  echo "minor"
fi

exit 0
