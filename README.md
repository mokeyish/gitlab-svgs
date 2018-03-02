# Gitlab SVG's

Repository to manage all SVG Assets for GitLab. Creates SVG Sprites out of Icons and optimises SVG based Illustrations.

## SVG Online Viewer - [http://gitlab-org.gitlab.io/gitlab-svgs/](http://gitlab-org.gitlab.io/gitlab-svgs/)

## Commands

On first time use locally you need to install dependencies through `yarn install`

`yarn run svg` - Runs all tasks that are available, if you want to release a new version just run this task

All output is saved to the `dist` folder, from where it is also taken from our main applications.

## Adding something

If you add something in `master` automatically all the steps will be done for previewing the icons.

To add new icons, simply place them in the sprite_icons folder, afterwards run the `yarn run svg` command.

To add new illustrations, simply copy them in the illustrations folder, afterwards run the `yarn run svg` command.

On a Merge Request also run 'yarn run svg' to check in the updated SVG Sprite and corresponding files until we have an automatic CI/CD solution.

## Preview Application

The application for previwing is based on [NUXT](https://nuxtjs.org/) and is located in the folder `svgpreviewer`.

You can run it locally through `yarn run dev` then it will available under `http://localhost:3333/gitlab-svgs/`.

With `yarn run generate` you can generate the static output to the `public` folder.

## Publish a new version
Follow these steps when publishing a new version:
1. Update the version in `package.json` with [`npm version`](https://docs.npmjs.com/cli/version). We usually publish minor versions:
    ```
    npm version minor -m "Explain which SVGs are added/modified"
    ```

    This command will also tag the version for you.

1. Push the new version
    ```
    git push
    ```
1. Push the new tag
    ```
    git push origin <tagname>
    ```
1. Make sure `package.json` has an updated version and the tag are correctly set
    * [`package.json`](https://gitlab.com/gitlab-org/gitlab-svgs/blob/master/package.json)
    * [tags](https://gitlab.com/gitlab-org/gitlab-svgs/tags)

1. Publish the new version
    ```
    npm publish
    ```

## Maintainers

- [@timzallmann](https://gitlab.com/timzallmann)
- [@hazelyang](https://gitlab.com/hazelyang)

## Contributing

GitLab is an open source project and we are very happy to accept community contributions. Please refer to [CONTRIBUTING.md](/CONTRIBUTING.md) for details.

