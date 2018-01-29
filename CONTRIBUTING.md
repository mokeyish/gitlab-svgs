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

- Exporting the icons or illustrations you created as SVGs.
- Download [SVGO Compressor Sketch plugin](https://github.com/bohemiancoding/svgo-compressor) or use [SVGO](https://github.com/svg/svgo) to optimize them. For powerful users, you can also open the SVGs in a text editor and remove unneeded `<title>` and `color references` manually.
- Switch to terminal:
 1. Go to `gitlab-svgs` directory.
 1. Pull latest changes from master.
 1. Create a new branch for your changes.
- Go to the `gitlab-svgs` directory, and then you will see `sprite_icons` and `illustrations` folders.
 * For icons, copy and paste the icons to `sprite_icons` folder.
 * For illustrations, copy and paste the illustrations to `illustrations` folder.
- Switch to terminal:
 1. Run `brew install yarn` to install [Yarn](https://yarnpkg.com/en/).
 1. Run `yarn svg`.
 1. Push your changes and create a merge request on [gitlab-svgs](https://gitlab.com/gitlab-org/gitlab-svgs).
- Assign [@timzallmann](https://gitlab.com/timzallmann) or [@hazelyang](https://gitlab.com/hazelyang) to merge it.
