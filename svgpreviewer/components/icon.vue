<template>
  <div class="icon-wrapper">
    <div
        class="icon-base"
        @click="copyIcon">
      <svg
          :class="[iconClass]">
        <use
            v-bind="{'xlink:href': `dist/icons.svg#${icon}`}">
        </use>
      </svg>
      <div class="icon-name">
        {{iconName}}
      </div>
    </div>
    <div class="icon-actions">
      <a
          title="Copy to clipboard"
          @click="copyIcon">
        <svg class="icon-sm">
          <use
              v-bind="{'xlink:href': `dist/icons.svg#duplicate`}">
          </use>
        </svg>
      </a>
      <a
          title="Permalink"
          @click="permaLink">
        <svg class="icon-sm">
          <use
              v-bind="{'xlink:href': `dist/icons.svg#link`}">
          </use>
        </svg>
      </a>
      <a
          title="Open source"
          target="_blank"
          :href="sourceLink">
        <svg class="icon-sm">
          <use
              v-bind="{'xlink:href': `dist/icons.svg#external-link`}">
          </use>
        </svg>
      </a>
    </div>
  </div>
</template>

<script>
import copyToClipboard from '../helpers/copy_to_clipboard';

export default {
  props: {
    icon: {
      type: String,
      required: true,
    },
    iconClass: {
      type: String,
      required: true,
    },
  },
  computed: {
    iconName() {
      return this.icon.replace(/_/g, '_\u200B');
    },
    sourceLink() {
      return `https://gitlab.com/gitlab-org/gitlab-svgs/blob/master/sprite_icons/${this.icon}.svg`;
    },
  },
  methods: {
    copyIcon() {
      this.$emit('itemCopied', copyToClipboard(this.icon) ? 1 : -1);
    },
    permaLink() {
      this.$emit('permaLink', this.icon);
    },
  },
};
</script>

<style scoped>
svg {
  fill: currentColor;
}

.icon-wrapper {
  flex-basis: 120px;
  max-width: 300px;
  min-height: 125px;
  font-size: 12px;
  flex-grow: 0;
  line-height: 1.4;
  text-align: center;
  background-color: #f9f9f9;
  list-style: none;
  margin: 0.5rem;
  display: flex;
  flex-direction: column;
}

.icon-base {
  padding: 20px 20px 0;
  border: 1px solid #fff;
  border-bottom: 1px solid #ccc;
  flex-grow: 1;
}

.icon-base:hover {
  cursor: pointer;
  border: solid 1px #ccc;
}

.icon-name {
  margin: 1rem 0;
}

.icon-actions {
  height: 2rem;
  padding: 0.5rem;
  background-color: #f9f9f9;
}

.icon-actions a {
  color: #707070;
  margin-right: 4px;
}

.icon-actions a:hover {
  cursor: pointer;
  color: black;
}

svg.icon-xs {
  width: 8px;
  height: 8px;
}

svg.icon-sm {
  width: 16px;
  height: 16px;
}

svg.icon-md {
  width: 32px;
  height: 32px;
}

svg.icon-lg {
  width: 48px;
  height: 48px;
}

svg.icon-xl {
  width: 72px;
  height: 72px;
}

svg.icon-hu {
  width: 256px;
  height: 256px;
}

svg.icon-nav {
  width: 16px;
  height: 16px;
  fill: #707070;
}
</style>
