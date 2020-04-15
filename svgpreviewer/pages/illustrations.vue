<script>
import illustrations from '../static/dist/illustrations.json';
import SvgImage from '../components/svg_image.vue';

export default {
  components: {
    SvgImage,
  },
  data() {
    return {
      illustrationsData: illustrations,
      searchString: this.$route.query.q || '',
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
  },
  watch: {
    searchString() {
      this.updateQueryParams();
    },
    $route(to) {
      const query = to.query || {};
      this.searchString = query.q || '';
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
            <h5 class="subtitle">
              {{ illustrationsData.illustrationCount }} Illustrations
            </h5>
          </div>
          <div class="col-sm-3">
            <span
              v-if="copyStatus===1"
              class="label label-success"
            >
              Copied to your clipboard!
            </span>
            <span
              v-if="copyStatus===-1"
              class="label label-danger"
            >
              Copying didn't work :-(
            </span>
            <span
              v-else-if="copyStatus===0"
              class="label muted"
            >
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
            <svg
              class="icon-reset"
              @click="resetSearch"
            >
              <use
                v-bind="{'xlink:href': `dist/icons.svg#close`}"
              />
            </svg>
          </div>
        </div>
      </div>
    </header>
    <section class="container">
      <div class="illustrations-list">
        <svg-image
          v-for="(illustration, index) in filteredIllustrations"
          :key="index"
          :image="illustration.name"
          source-path="https://gitlab.com/gitlab-org/gitlab-svgs/blob/master/"
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
</style>
