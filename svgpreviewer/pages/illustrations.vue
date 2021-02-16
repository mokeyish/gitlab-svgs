<script>
import SvgImage from '../components/svg_image.vue';
import illustrations from '../static/dist/illustrations.json';

const DEFAULT_COLORING = 'default';

export default {
  components: {
    SvgImage,
  },
  data() {
    return {
      illustrationsData: illustrations,
      searchString: this.$route.query.q || '',
      selectedColor: this.$route.query.color || DEFAULT_COLORING,
      copyStatus: 0,
    };
  },
  computed: {
    filteredIllustrations() {
      const unfiltered = this.illustrationsData.illustrations;

      if (this.searchString === '') {
        return unfiltered;
      }

      return this.illustrationsData.illustrations.filter(({ name }) =>
        name.includes(this.searchString),
      );
    },
    colors() {
      return [
        { value: DEFAULT_COLORING, name: 'Default' },
        { value: 'gray', name: 'Gray' },
        { value: 'inverse', name: 'Inverse' },
        { value: 'indigo', name: 'Indigo' },
        { value: 'red', name: 'Red' },
      ];
    },
  },
  watch: {
    searchString() {
      this.updateQueryParams();
    },
    selectedColor() {
      this.updateQueryParams();
    },
    $route(to) {
      const query = to.query || {};
      this.searchString = query.q || '';
      this.selectedColor = query.color || DEFAULT_COLORING;
    },
  },
  methods: {
    setSearchString(value) {
      this.searchString = value;
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
            <h5 class="subtitle">{{ illustrationsData.illustrationCount }} Illustrations</h5>
          </div>
          <div class="col-sm-3">
            <span v-if="copyStatus === 1" class="label label-success">
              Copied to your clipboard!
            </span>
            <span v-if="copyStatus === -1" class="label label-danger">
              Copying didn't work :-(
            </span>
            <span v-else-if="copyStatus === 0" class="label muted">
              Click Illustration to copy their path
            </span>
          </div>
          <div class="col-sm-5">
            <input
              v-model="searchString"
              maxlength="255"
              autofocus="autofocus"
              class="form-control pad"
              size="255"
              type="text"
              placeholder="Illustration Search"
            />
            <svg class="icon-reset" @click="resetSearch">
              <use v-bind="{ 'xlink:href': `dist/icons.svg#close` }" />
            </svg>
          </div>
        </div>
      </div>
    </header>
    <section class="container">
      <div class="illustrations-list">
        <aside>
          <h3>Illustration configuration</h3>
          <label>
            <strong> Select a background color:</strong>
          </label>
          <select v-model="selectedColor" class="form-control select-control chevron-down">
            <template v-for="color in colors">
              <option :key="color.value" :value="color.value">
                {{ color.name }}
              </option>
            </template>
          </select>
        </aside>
        <svg-image
          v-for="(illustration, index) in filteredIllustrations"
          :key="index"
          :image="illustration.name"
          :class="selectedColor"
          source-path="https://gitlab.com/gitlab-org/gitlab-svgs/blob/main/"
          @imageCopied="setCopyStatus"
          @permalinkSelected="setSearchString"
        />
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

.illustrations-list {
  margin-top: 98px;
  padding: 0;
}

.illustrations-list aside {
  display: block;
  border: 1px solid #ccc;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  margin-bottom: 1rem;
  padding: 1rem;
}

.illustrations-list .image-wrapper {
  margin-bottom: 1rem;
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
