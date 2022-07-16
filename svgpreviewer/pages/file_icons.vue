<script>
import SvgImage from '../components/svg_image.vue';
import icons from '../static/dist/file_icons/file_icons.json';

const DEFAULT_ICON_SIZE = 'image-sm';
const DEFAULT_COLORING = 'default';

export default {
  name: 'FileIconsExplorer',
  components: {
    SvgImage,
  },
  data() {
    return {
      iconData: icons,
      searchString: this.$route.query.q || '',
      selectedClass: this.$route.query.size || DEFAULT_ICON_SIZE,
      selectedColor: this.$route.query.color || DEFAULT_COLORING,
      copyStatus: 0,
    };
  },
  computed: {
    filteredIcons() {
      if (this.searchString && this.searchString.startsWith('~')) {
        return this.iconData.icons.filter((icon) => `~${icon}` === this.searchString);
      }
      return this.iconData.icons.filter((icon) => icon.includes(this.searchString));
    },
    kbSize() {
      return Math.round(this.iconData.spriteSize / 1024);
    },
    colors() {
      return [
        { value: DEFAULT_COLORING, name: 'Default' },
        { value: 'inverse', name: 'Inverse' },
        { value: 'indigo', name: 'Indigo' },
        { value: 'gray', name: 'Gray' },
        { value: 'red', name: 'Red' },
      ];
    },
  },
  watch: {
    searchString() {
      this.updateQueryParams();
    },
    selectedClass() {
      this.updateQueryParams();
    },
    selectedColor() {
      this.updateQueryParams();
    },
    $route(to) {
      const query = to.query || {};
      this.searchString = query.q || '';
      this.selectedClass = query.size || DEFAULT_ICON_SIZE;
      this.selectedColor = query.color || DEFAULT_COLORING;
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
          color: this.selectedColor !== DEFAULT_COLORING ? this.selectedColor : undefined,
        },
      };

      this.$router.replace(location);
    },
  },
};
</script>

<template>
  <div>
    <header class="subheader">
      <div class="container">
        <div class="row">
          <div class="col-sm-4">
            <h5 class="subtitle">{{ iconData.iconCount }} Icons ({{ kbSize }}Kb)</h5>
          </div>
          <div class="col-sm-3">
            <div v-if="copyStatus === 1" class="label label-success">Copied to your clipboard!</div>
            <div v-if="copyStatus === -1" class="label label-danger">Copying didn't work :-(</div>
            <div v-else-if="copyStatus === 0" class="label muted">
              Click Icons to copy their name
            </div>
          </div>
          <div class="col-sm-5">
            <input
              v-model="searchString"
              maxlength="255"
              autofocus="autofocus"
              class="form-control pad"
              size="255"
              type="text"
              placeholder="Icon Search"
            />
            <svg class="icon-reset" @click="resetSearch">
              <use v-bind="{ 'xlink:href': `dist/icons.svg#close` }" />
            </svg>
          </div>
        </div>
      </div>
    </header>
    <section class="container">
      <div class="icons-list" :class="selectedClass + '-list'">
        <aside>
          <h3>Icon configuration</h3>
          <label>
            <strong> Select a icon size:</strong>
          </label>
          <select v-model="selectedClass" class="form-control select-control chevron-down">
            <option value="image-xs">Extra Small (12px)</option>
            <option value="image-sm" selected>Small (Default 16px)</option>
            <option value="image-md">Medium (32px)</option>
            <option value="image-lg">Large (48px)</option>
            <option value="image-xl">Extra Large (72px)</option>
            <option value="image-hu">Huge (256px)</option>
            <option value="image-nav">Sidemenu</option>
          </select>
          <br />
          <strong> Select a color combination </strong>
          <template v-for="color in colors">
            <br :key="color.value + 'br'" />
            <input
              :id="color.value"
              :key="color.value + 'input'"
              v-model="selectedColor"
              type="radio"
              :value="color.value"
            />
            <label :key="color.value + 'label'" :for="color.value">
              {{ color.name }}
            </label>
          </template>
        </aside>

        <svg-image
          v-for="(icon, index) in filteredIcons"
          :key="index"
          :image="icon"
          :class="selectedColor"
          :image-class="selectedClass"
          image-sprite="dist/file_icons/file_icons.svg"
          @imageCopied="setCopyStatus"
          @permalinkSelected="setSearchString"
        />
        <a v-show="filteredIcons.length === 0" @click="resetSearch">
          No file icons found. Click here to reset your search!
        </a>
      </div>
    </section>
  </div>
</template>

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
  justify-content: center;
  margin-top: 90px;
  padding: 0;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
}

.icons-list.image-xl-list {
  grid-template-columns: repeat(auto-fill, 20rem);
}

.icons-list.image-hu-list {
  grid-template-columns: repeat(auto-fill, 30rem);
}

.icons-list aside {
  padding: 1rem;
  grid-column: -1 / -3;
  grid-row: 1 / 3;
  border: 1px solid #ccc;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
}

.icons-list.image-xl-list aside {
  grid-column: -1 / -2;
  grid-row: 1 / 3;
}

.icons-list.image-hu-list aside {
  grid-column: -1 / -2;
  grid-row: 1 / 2;
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

select.chevron-down {
  background: white url('~assets/chevron-down.svg') no-repeat right 8px center;
}

.image-wrapper.default .image-base {
  color: var(--default-fg);
  background-color: var(--default-bg);
}

.image-wrapper.inverse .image-base {
  color: var(--inverse-fg);
  background-color: var(--inverse-bg);
}

.image-wrapper.indigo .image-base {
  color: var(--indigo-fg);
  background-color: var(--indigo-bg);
}

.image-wrapper.gray .image-base {
  color: var(--gray-fg);
  background-color: var(--gray-bg);
}

.image-wrapper.red .image-base {
  color: var(--red-fg);
  background-color: var(--red-bg);
}
</style>
