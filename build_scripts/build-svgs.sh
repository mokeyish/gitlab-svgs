#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

scriptPath=${0%/*}

# In order to update the file icons, go to
# https://github.com/PKief/vscode-material-icon-theme
# and pick a newer commit and put that commit into
# file_icons_version
FILE_ICONS_VERSION=$(cat "$scriptPath/file_icons_version")

function download_file_icons {
  echo "Download vscode-material-icon-theme File Icons"
  
  # Cleanup previous downloads
  rm -rf vscode-material-icon-theme-* file_icons/*.svg file_icons.zip file_icons_unused
  
  # Download and unpack specified versions file_icons_version
  curl --location --output file_icons.zip \
    "https://github.com/PKief/vscode-material-icon-theme/archive/$FILE_ICONS_VERSION.zip"
  unzip file_icons.zip

  # Only copy used icons
  for icon in $(node "$scriptPath/used_file_icons.js"); do
    mv vscode-material-icon-theme-*/icons/"$icon.svg" file_icons
  done

  # Overwrite GitLab Logo with latest version
  cp -f illustrations/gitlab_logo.svg file_icons/gitlab.svg

  # Move unused icons over to a separate folder (useful for adding more language support later)
  mv vscode-material-icon-theme-*/icons file_icons_unused

  # Remove downloaded artifacts
  rm -rf file_icons.zip vscode-material-icon-theme-*
}

download_file_icons

echo "Starting SVG Build (combining sprites and minifying assets)"
node "$scriptPath/index.js"
