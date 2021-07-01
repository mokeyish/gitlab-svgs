## Purpose

<!-- Briefly describe the purpose and use case for the new illustration. -->

## Concept

<!-- Explain how the illustration aligns with the purpose and use. If metaphors are used, explain how they relate. If possible, provide screenshots of the illustration in context. You can also embed the SVG here for visual reference. -->

---

## Checklists

Complete all items in both checklists before closing the issue. All items are the responsibility of the author, unless otherwise noted.

### Design

<!-- This checklist ensures that illustrations are created and reviewed according to the guidelines and a predictable workflow. -->

1. [ ] Duplicate the [Illustration template](https://www.figma.com/file/TVmF1obx2qYW8f5H1lAkOt/Illustration-template?node-id=0%3A1) and move the copy to your Drafts folder in Figma. Update the file name and cover thumbnail with relevant issue information.
1. [ ] Share your draft file with a [FE/UX Foundation designer](https://about.gitlab.com/company/team/?department=fe-ux-foundations-team) to review, and make sure they have view permissions in Figma. If they have the capacity, they should assign themselves to this issue. If not, try pinging another designer.
1. [ ] **Reviewer**: Review the illustration in the author’s draft file. Add design-specific comments in Figma to maintain context. Add general comments to this issue, including your approval status. Once approved, assign to a [Figma maintainer](https://about.gitlab.com/handbook/engineering/projects/#design.gitlab.com) for final review.
1. [ ] **Maintainer:** Add the illustration to the **[Illustrations](https://www.figma.com/file/0DhXXlTakscLiHZLKuiJ6C/Illustration-library?node-id=0%3A1)** file under the appropriate page and category. The illustration should be in a frame with the bounds set to the artwork. The frame name should match the exported file name (without the extension).
1. [ ] **Author:** Move your draft file to the **Component archive** Figma project.

### Library addition

<!-- This checklist helps streamline the process of getting an illustration from Figma to the library. -->

1. [ ] Create a new merge request (MR) from this issue.
1. [ ] Checkout the new branch locally.
1. [ ] Export the illustration from the **Illustrations** file (in Figma) to the **/illustrations** folder in your local instance of the repo. The file name should be lowercase, and use hyphens as a separator between terms. If necessary, place the illustration in one of the sub-directories.
1. [ ] In a terminal window, run `yarn run dev` to preview the SVG library locally. Find the new illustration and ensure it is rendered accurately.
1. [ ] After you’ve committed the changes and the pipeline passes, double-check your icon in the review app and test that it matches your expectations.
1. [ ] Assign the MR to a review by a [maintainer](https://about.gitlab.com/handbook/engineering/projects/#gitlab-svgs), and proceed with any changes.

If you run into any problems, ensure that all other steps in the project [README](https://gitlab.com/gitlab-org/gitlab-svgs/-/blob/main/README.md) have been followed.

---

## Links / references

<!-- Add external links and references if necessary -->

/label ~"UX" ~"Illustration"
