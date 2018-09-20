/* eslint-disable no-unused-vars, import/no-unresolved */
<template>
  <div>
    <header class="subheader">
      <div class="container">
        <div class="row">
          <div class="col-sm-3">
            <h5 class="subtitle">
              {{iconData.iconCount}} Icons ({{kbSize}}Kb)
            </h5>
          </div>
          <div class="col-sm-3">
            <div
                class="label label-success"
                v-if="copyStatus===1">
              Copied to your clipboard!
            </div>
            <div
                class="label label-danger"
                v-if="copyStatus===-1">
              Copying didn't work :-(
            </div>
            <div
                class="label muted"
                v-else-if="copyStatus===0">
              Click Icons to copy their name
            </div>
          </div>
          <div class="col-sm-3">
            <input
                maxlength="255"
                autofocus="autofocus"
                class="form-control pad"
                size="255"
                type="text"
                placeholder="Icon Search"
                v-model="searchString">
            <svg
                class="icon-reset"
                @click="resetSearch">
              <use
                  v-bind="{'xlink:href': `dist/icons.svg#close`}">
              </use>
            </svg>
          </div>
          <div class="col-sm-3">
            <div class="select-wrapper">
              <select
                  v-model="selectedClass"
                  class="form-control select-control">
                <option value="icon-xs">Very Small (8px)</option>
                <option value="icon-sm">Small (16px)</option>
                <option
                    value="icon-md"
                    selected>
                  Medium (32px)
                </option>
                <option value="icon-lg">Large (48px)</option>
                <option value="icon-xl">Very Large (72px)</option>
                <option value="icon-hu">Huge (256px)</option>
                <option value="icon-nav">Sidemenu</option>
              </select>
              <i
                  aria-hidden="true"
                  data-hidden="true"
                  class="fa fa-chevron-down"></i>
            </div>
          </div>
        </div>
      </div>
    </header>
    <section class="container">
      <div class="icons-list">
        <icon
            v-for="(icon, index) in filteredIcons"
            :key="index"
            :icon="icon"
            :iconClass="selectedClass"
            @itemCopied="setCopyStatus"
            @permaLink="setSearchString"/>
        <a
            v-show="filteredIcons.length === 0"
            @click="resetSearch">
          No icons found. Click here to reset your search!
        </a>
      </div>
    </section>
  </div>
</template>

<script>
import icons from '../static/dist/icons.json';
import Icon from '../components/icon.vue';

export default {
  components: {
    Icon,
  },
  data() {
    return {
      iconData: icons,
      searchString: this.$route.query.q || '',
      selectedClass: this.$route.query.size || 'icon-md',
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
          size: this.selectedClass !== 'icon-md' ? this.selectedClass : undefined,
        },
      };

      this.$router.replace(location);
    },
  },
  watch: {
    searchString() {
      this.updateQueryParams();
    },
    selectedClass() {
      this.updateQueryParams();
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
