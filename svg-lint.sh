#!/usr/bin/env bash

if grep -Rolq "\<mask\>" sprite_icons; then
    echo "SVG sprite icons are not allowed to use masking (<mask>)"
    echo "Please check the following files:"
    grep -Rol "\<mask\>" sprite_icons
    exit 1
fi

echo "Checking the icon sprites succeeded"
exit 0