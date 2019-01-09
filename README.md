# Gitlab SVG's

Repository to manage all SVG Assets for GitLab. Creates SVG Sprites out of Icons and optimises SVG based Illustrations.

## SVG Online Viewer - [http://gitlab-org.gitlab.io/gitlab-svgs/](http://gitlab-org.gitlab.io/gitlab-svgs/)

## Requirements

You need to have [`yarn`](https://yarnpkg.com/en/) and `node` installed. On a Mac you can install both with `brew install yarn`

On first time, or after updating from master, use `yarn install` to install the latest dependencies.

## Commands

`yarn run svg` - Runs all tasks that are available, if you want to release a new version just run this task

All output is saved to the `dist` folder, from where it is also taken from our main applications.

## Adding icons or illustrations

- Create a new branch in your local copy from `gitlab-svgs`. Make sure that you have the latest master first.

- Make sure that your dependencies are up to date by running `yarn install`

- Export the icons or illustrations you created as SVGs

  - Place icons in the `sprite_icons` folder, see [instructions below on how to properly export an icon](#exporting-icons-from-sketch).
  - Place illustrations in the `illustration` folder

- Make sure [SVGO Compressor Sketch plugin](https://github.com/bohemiancoding/svgo-compressor) is installed (it will compress the SVG automatically) or use [SVGO](https://github.com/svg/svgo) to optimize the SVG after you export.

- After adding the new svgs, you need to execute the following commands, so that you can verify your changes locally at http://localhost:3333/

  ```bash
  # This will optimize all illustrations and combine the icons into one file
  yarn run svg
  # Starts a local server to preview your changes
  yarn run dev
  ```

- If you are happy with the new/changed SVG, commit and push all changes (including the ones to the `dist` folder) and create an MR.

- Assign the merge request to a maintainer of the `gitlab-svg` project.
  You can find the maintainers on the [GitLab project overview page](https://about.gitlab.com/handbook/engineering/projects#gitlab-svgs).

### Exporting icons from Sketch

1. Confirm that your icon is designed at 14px by 14px and is centered within a 16px by 16px artboard.

1. Make sure your icon has been designed using `#000000` as the only fill color.

1. Double check there are no masks applied to your icon and that you’ve used combined shapes when necessary.

   ![icon-guidelines-no-masks-combined-shapes](./docs/icon-guidelines-no-masks-combined-shapes.png)

1. Make sure there is no background color applied to the Artboard.

   ![icon-guidelines-no-background](./docs/icon-guidelines-no-background.png)

1. Once exported, view the .svg file and make sure you don't see `</mask>` or any other fill except for `<path fill="#000">` in the file. Otherwise, we cannot change the color of the icon.

## Preview Application

The application for previewing is based on [NUXT](https://nuxtjs.org/) and is located in the folder `svgpreviewer`.

You can run it locally through `yarn run dev` then it will available under `http://localhost:3333/`.

With `yarn run generate` you can generate the static output to the `public` folder.

## Publishing a new version

_Note:_ The following steps need to be done by a maintainer. After your MR is merged, and they forgot to release a new version, please nudge them.

Follow these steps when publishing a new version:

1.  Update the version in `package.json` with [`npm version`](https://docs.npmjs.com/cli/version). We usually publish minor versions:

    ```
    npm version minor -m "Explain which SVGs are added/modified"
    ```

    This command will also tag the version for you.

1.  Push the new version.
    ```
    git push
    ```
1.  Push the new tag
    ```
    git push origin <tagname>
    ```
1.  Make sure `package.json` has an updated version and the tag are correctly set

    - [`package.json`](https://gitlab.com/gitlab-org/gitlab-svgs/blob/master/package.json)
    - [tags](https://gitlab.com/gitlab-org/gitlab-svgs/tags)

1.  Publish the new version
    _Note:_ You will need an npm account with the correct permissions. Please contact [Tim Zallmann](https://about.gitlab.com/company/team/#tpmtim)
    ```
    npm publish
    ```

## Contributing

GitLab is an open source project and we are very happy to accept community contributions. Please refer to [CONTRIBUTING.md](/CONTRIBUTING.md) for details.
