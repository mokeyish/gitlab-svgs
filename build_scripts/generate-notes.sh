#!/usr/bin/env bash

LAST_TAG="$1"
NEW_TAG="$2"

function svg_type() {
  if [[ $1 == "sprite_icons"* ]]; then
    echo "icon"
  elif [[ $1 == "illustrations"* ]]; then
    echo "illustration"
  fi
}

function svg_name() {
  FILE=${1##*/}
  echo ${FILE%%.*}
}

echo "# [$NEW_TAG]"

while read STATUS SOURCE TARGET; do
   TYPE=$(svg_type "$SOURCE");
   NAME=$(svg_name "$SOURCE")
    case "$STATUS" in
        "R"*)
            TARGET_NAME=$(svg_name "$TARGET")
            echo "  - Renamed $TYPE '$NAME' to '$TARGET_NAME'";;
        A)
            echo "  - Added $TYPE '$NAME'";;
        M)
            echo "  - Updated $TYPE '$NAME'";;
        D)
            echo "  - Removed $TYPE '$NAME'";;
        *)
            echo "  - INVALID OPERATION $STATUS for $NAME";;
    esac
done  < <(git diff "$LAST_TAG..HEAD" --name-status --diff-filter=ADMR -- sprite_icons illustrations | sort)

exit 0
