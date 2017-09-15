# Gitlab SVG

Repository to manage all SVG Assets for GitLab. Creates SVG Sprites out of Icons and optimises SVG based Illustrations.

## Commands

`yarn run svg` - Runs all tasks that are available, if you want to release a new version just run this task

`yarn run sprite_icons` - To create a sprite_icon file

`yarn run illustrations` - Optimises only the illustrations

All output files are saved to the `dist` folder.

## Adding something

To add new icons, simply place them in the sprite_icons folder, afterwards run the `yarn run sprite_icons` command.

To add new illustrations, simply copy them in the illustrations folder, afterwards run the `yarn run illustrations` command.
