<template>
  <div class="image-wrapper">
    <div
      class="image-base"
      @click="copyImage"
    >
      <svg
        v-if="imageSprite"
        :class="[imageClass]"
      >
        <use
          v-bind="{'xlink:href': spritePath}"
        />
      </svg>
      <img
        v-else
        :class="[imageClass]"
        :src="imagePath"
      />
      <div class="image-name">
        {{ imageName }}
        <span
          v-if="imageSize"
        >
          ({{ kbSize }}Kb)
        </span>
      </div>
    </div>
    <div class="image-actions">
      <a
        title="Copy to clipboard"
        @click="copyImage"
      >
        <svg class="image-sm">
          <use
            v-bind="{'xlink:href': `dist/icons.svg#copy-to-clipboard`}"
          />
        </svg>
      </a>
      <a
        title="Permalink"
        @click="selectPermalink"
      >
        <svg class="image-sm">
          <use
            v-bind="{'xlink:href': `dist/icons.svg#link`}"
          />
        </svg>
      </a>
      <a
        title="Open source"
        target="_blank"
        :href="sourceLink"
      >
        <svg class="image-sm">
          <use
            v-bind="{'xlink:href': `dist/icons.svg#external-link`}"
          />
        </svg>
      </a>
    </div>
  </div>
</template>

<script>
import copyToClipboard from '../helpers/copy_to_clipboard';

export default {
  props: {
    image: {
      type: String,
      required: true,
    },
    imageClass: {
      type: String,
      required: false,
      default: '',
    },
    imageSprite: {
      type: String,
      required: false,
      default: '',
    },
    imageSize: {
      type: Number,
      required: false,
      default: 0,
    },
    sourcePath: {
      type: String,
      required: true,
    },
  },
  computed: {
    imageName() {
      return this.image.replace(/_/g, '_\u200B');
    },
    spritePath() {
      return `${this.imageSprite}#${this.image}`;
    },
    imagePath() {
      return `dist/${this.image}`;
    },
    sourceLink() {
      const path = `${this.sourcePath}${this.image}`;
      return path.includes('.svg') ? path : `${path}.svg`;
    },
    kbSize() {
      return Math.round(this.imageSize / 1024);
    },
  },
  methods: {
    copyImage() {
      this.$emit('imageCopied', copyToClipboard(this.image) ? 1 : -1);
    },
    selectPermalink() {
      this.$emit('permalinkSelected', this.image);
    },
  },
};
</script>

<style scoped>
svg {
  fill: currentColor;
}

.image-wrapper {
  min-height: 125px;
  font-size: 12px;
  line-height: 1.4;
  text-align: center;
  background-color: #f9f9f9;
  list-style: none;
  display: flex;
  border: 1px solid #dfdfdf;
  flex-direction: column;
}

.image-base {
  padding: 20px 20px 0;
  flex-grow: 1;
}

.image-base:hover {
  cursor: pointer;
  box-shadow: inset 0 0 0 2px #ccc;
}

.image-base img {
  height: 200px;
}

.image-name {
  margin: 1rem 0;
}

.image-actions {
  border-top: 1px solid #ccc;
  background-color: #f9f9f9;
  text-align: center;
}

.image-actions a {
  color: #707070;
  display: inline-block;
  margin: 0.5rem 0.25rem;
}

.image-actions a:hover {
  cursor: pointer;
  color: black;
}

svg.image-xs {
  width: 8px;
  height: 8px;
}

svg.image-sm {
  width: 16px;
  height: 16px;
}

svg.image-md {
  width: 32px;
  height: 32px;
}

svg.image-lg {
  width: 48px;
  height: 48px;
}

svg.image-xl {
  width: 72px;
  height: 72px;
}

svg.image-hu {
  width: 256px;
  height: 256px;
}

svg.image-nav {
  width: 16px;
  height: 16px;
  fill: #707070;
}
</style>
