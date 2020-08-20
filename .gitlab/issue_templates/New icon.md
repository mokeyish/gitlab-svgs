## Purpose

<!-- Briefly describe the purpose and use case for the new icon. -->

## Concept

<!-- Explain how the concept(s) align with the purpose and use. If metaphors are used, explain how they relate. Note if there’s an existing icon in the library that may conflict with this new one. If the icon require any variants, for example, a solid version or different states for open and closed, you can include them all in one issue. If possible, provide screenshots of the icon in context. You can also embed the SVG here for visual reference. -->

---

## Checklists

Complete all items in both checklists before closing the issue. All items are the responsibility of the author, unless otherwise noted.

### Design

<!-- This checklist ensures that icons are created and reviewed according to the guidelines and a predictable workflow. -->

1. [ ] Duplicate the [Icon template](https://www.figma.com/file/MboeR2wMu28t4S0DOniunX/Icon-template) and move the copy to your Drafts folder in Figma. Update the file name and cover thumbnail with relevant issue information.
1. [ ] Share your draft file with a [FE/UX Foundation designer](https://about.gitlab.com/company/team/?department=fe-ux-foundations-team)
       to review, and make sure they have view permissions in Figma. If they have the capacity, they should assign themselves to this issue. If not, try pinging another Foundations designer.
1. [ ] **Reviewer**: Review the icon in the author’s draft file. Add design-specific comments in Figma to maintain context. Add general comments to this issue, including your approval status. Once approved, assign to a [Figma maintainer](https://about.gitlab.com/handbook/engineering/projects/#design.gitlab.com) for final review.
1. [ ] **Maintainer:** Add the icon to the **component library** file, convert it to a component, and view it in the Assets panel to ensure it aligns with what’s outlined in the
       [document and asset library structure](https://gitlab.com/gitlab-org/gitlab-services/design.gitlab.com/-/blob/master/doc/pajamas-ui-kit.md#structure) documentation.
1. [ ] **Maintainer:** Publish the library changes along with a clear message about the update.
1. [ ] **Author:** Move your draft file to the **Component archive** Figma project.

### Library addition

<!-- This checklist helps streamline the process of getting an icon from Figma to the library. -->

1. [ ] Create a new merge request (MR) from this issue.
1. [ ] Checkout the new branch locally.
1. [ ] Export the icon component from the Pajamas UI Kit (in Figma) to the **/sprite_icons** folder in your local instance of the repo. The file name should be lowercase, and use hyphens as a separator between terms.
1. [ ] Open the SVG you just exported in your code editor and remove `fill="none"` from the `<svg>` element.
1. [ ] In a terminal window, run `yarn run svg` to add the icon to the library in the **/dist** folder.
1. [ ] In a terminal window, run `yarn run dev` to preview the SVG library locally. Find the new icon and test it out by changing settings in the **Icon configuration** panel of the site. The icon should change color and size with no issues.
1. [ ] After you’ve committed the changes and the pipeline passes, assign the MR to be reviewed and merged by a [maintainer](https://about.gitlab.com/handbook/engineering/projects/#gitlab-svgs), and proceed with any changes.
1. [ ] Add a read only (FYI) agenda item to the next [UX weekly
       call](https://docs.google.com/document/d/189WZO7uTlZCznzae2gqLqFn55koNl3-pHvU-eVnvG9c/edit?usp=sharing)
       to inform everyone of the new icon, linking to this issue.

If you run into any problems, ensure that all other steps in the project [README](https://gitlab.com/gitlab-org/gitlab-svgs/-/blob/main/README.md) have been followed.

---

## Links / references

<!-- Add external links and references if necessary -->

/label ~"UX" ~"Pajamas UI Kit" ~"icon"
