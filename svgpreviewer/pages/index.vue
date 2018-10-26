/* eslint-disable no-unused-vars, import/no-unresolved */
<template>
  <div>
    <header class="subheader">
      <div class="container">
        <div class="row">
          <div class="col-sm-3">
            <h5 class="subtitle">
              {{ iconData.iconCount }} Icons ({{ kbSize }}Kb)
            </h5>
          </div>
          <div class="col-sm-3">
            <div
              v-if="copyStatus===1"
              class="label label-success"
            >
              Copied to your clipboard!
            </div>
            <div
              v-if="copyStatus===-1"
              class="label label-danger"
            >
              Copying didn't work :-(
            </div>
            <div
              v-else-if="copyStatus===0"
              class="label muted"
            >
              Click Icons to copy their name
            </div>
          </div>
          <div class="col-sm-3">
            <input
              v-model="searchString"
              maxlength="255"
              autofocus="autofocus"
              class="form-control pad"
              size="255"
              type="text"
              placeholder="Icon Search"
            />
            <svg
              class="icon-reset"
              @click="resetSearch"
            >
              <use
                v-bind="{'xlink:href': `dist/icons.svg#close`}"
              />
            </svg>
          </div>
          <div class="col-sm-3">
            <div class="select-wrapper">
              <select
                v-model="selectedClass"
                class="form-control select-control"
              >
                <option value="image-xs">Very Small (8px)</option>
                <option value="image-sm">Small (16px)</option>
                <option
                  value="image-md"
                  selected
                >
                  Medium (32px)
                </option>
                <option value="image-lg">Large (48px)</option>
                <option value="image-xl">Very Large (72px)</option>
                <option value="image-hu">Huge (256px)</option>
                <option value="image-nav">Sidemenu</option>
              </select>
              <i
                aria-hidden="true"
                data-hidden="true"
                class="fa fa-chevron-down"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </header>
    <section class="container">
      <div class="icons-list">
        <svg-image
          v-for="(icon, index) in filteredIcons"
          :key="index"
          :image="icon"
          :image-class="selectedClass"
          image-sprite="dist/icons.svg"
          source-path="https://gitlab.com/gitlab-org/gitlab-svgs/blob/master/sprite_icons/"
          @imageCopied="setCopyStatus"
          @permalinkSelected="setSearchString"
        />
        <a
          v-show="filteredIcons.length === 0"
          @click="resetSearch"
        >
          No icons found. Click here to reset your search!
        </a>
      </div>
    </section>
  </div>
</template>

<script>
import icons from '../static/dist/icons.json';
import SvgImage from '../components/svg_image.vue';

const DEFAULT_ICON_SIZE = 'image-md';

export default {
  components: {
    SvgImage,
  },
  data() {
    return {
      iconData: icons,
      searchString: this.$route.query.q || '',
      selectedClass: this.$route.query.size || DEFAULT_ICON_SIZE,
      copyStatus: 0,
    };
  },
  computed: {
    filteredIcons() {
      if (this.searchString && this.searchString.startsWith('~')) {
        return this.iconData.icons.filter(icon => `~${icon}` === this.searchString);
      }
      return this.iconData.icons.filter(icon => icon.includes(this.searchString));
    },
    kbSize() {
      return Math.round(this.iconData.spriteSize / 1024);
    },
  },
  watch: {
    searchString() {
      this.updateQueryParams();
    },
    selectedClass() {
      this.updateQueryParams();
    },
    $route(to) {
      const query = to.query || {};
      this.searchString = query.q || '';
      this.selectedClass = query.size || DEFAULT_ICON_SIZE;
    },
  },
  methods: {
    setSearchString(value) {
      this.searchString = `~${value}`;
    },
    resetSearch() {
      this.searchString = '';
    },
    setCopyStatus(newStatus) {
      this.copyStatus = newStatus;
      setTimeout(() => {
        this.copyStatus = 0;
      }, 5000);
    },
    updateQueryParams() {
      const location = {
        query: {
          q: this.searchString ? this.searchString : undefined,
          size: this.selectedClass !== DEFAULT_ICON_SIZE ? this.selectedClass : undefined,
        },
      };

      this.$router.replace(location);
    },
  },
};
</script>

<style>
.subheader {
  position: fixed;
  top: 40px;
  left: 0;
  right: 0;
  background-color: #f5f5f5;
  border-bottom: solid 1px #ccc;
}

.subheader .container {
  margin-top: 3px;
  margin-bottom: 3px;
}

.subheader .container .label {
  margin-top: 7px;
}

.subtitle {
  margin-top: 8px;
}

.icons-list {
  margin-top: 90px;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .icons-list {
    margin-top: 180px;
  }
}

.muted {
  color: #999;
  font-size: smaller;
}

.icon-reset {
  position: absolute;
  right: 24px;
  top: 9px;
  cursor: pointer;
  width: 16px;
  height: 16px;
  fill: #707070;
}

.icon-reset:hover {
  fill: black;
}
</style>
