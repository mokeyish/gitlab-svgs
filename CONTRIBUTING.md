## Developer Certificate of Origin + License

By contributing to GitLab B.V., You accept and agree to the following terms and
conditions for Your present and future Contributions submitted to GitLab B.V.
Except for the license granted herein to GitLab B.V. and recipients of software
distributed by GitLab B.V., You reserve all right, title, and interest in and to
Your Contributions. All Contributions are subject to the following DCO + License
terms.

[DCO + License](https://gitlab.com/gitlab-org/dco/blob/master/README.md)

_This notice should stay as the first item in the CONTRIBUTING.md file._

## Updating SVGs on [gitlab-svgs](http://gitlab-org.gitlab.io/gitlab-svgs/)

- Export the icons or illustrations you created as SVGs.
- Download [SVGO Compressor Sketch plugin](https://github.com/bohemiancoding/svgo-compressor) or use [SVGO](https://github.com/svg/svgo) to optimize them. You can also open the SVGs in a text editor and remove unneeded `<title>` and `color` references manually.
- Create a new branch in `gitlab-svgs`.
- Go to the `gitlab-svgs` directory, and then you will see `sprite_icons` and `illustrations` folders.
 * For icons, add them to `sprite_icons` folder.
 * For illustrations, add them to `illustrations` folder.
- Using the terminal:
 1. Run `brew install yarn` to install [Yarn](https://yarnpkg.com/en/).
 1. Run `yarn run svg` to update SVG Sprite and corresponding files.
 1. Run `yarn run dev` to preview it locally on `http://localhost:3333/gitlab-svgs/`.
 1. Push your changes and create a merge request on [gitlab-svgs](https://gitlab.com/gitlab-org/gitlab-svgs).
- Assign the merge request to a maintainer of the `gitlab-svg` project. You can find the maintainers on [GitLab team page](https://about.gitlab.com/team/) or [Readme](https://gitlab.com/gitlab-org/gitlab-svgs/blob/master/README.md).
