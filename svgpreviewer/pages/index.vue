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
            <span class="label label-success" v-if="copyStatus===1">Copied to your clipboard!</span>
            <span class="label label-danger" v-if="copyStatus===-1">Copying didn't work :-(</span>
            <span class="label muted" v-else-if="copyStatus===0">Click Icons to copy their name</span>
          </div>
          <div class="col-sm-3">
            <input maxlength="255" autofocus="autofocus" class="form-control pad" size="255" type="text" placeholder="Icon Search" v-model="searchString">
          </div>
          <div class="col-sm-3">
            <div class="select-wrapper">
              <select
                v-model="selectedClass"
                class="form-control select-control">
                <option value="icon-xs">Very Small (8px)</option>
                <option value="icon-sm">Small (16px)</option>
                <option value="icon-md" selected>Medium (32px)</option>
                <option value="icon-lg">Large (48px)</option>
                <option value="icon-xl">Very Large (72px)</option>
                <option value="icon-hu">Huge (256px)</option>
                <option value="icon-nav">Sidemenu</option>
              </select>
              <i aria-hidden="true" data-hidden="true" class="fa fa-chevron-down"></i>
            </div>
          </div>
        </div>
      </div>
    </header>
    <section class="container">
      <ul class="icons-list">
        <icon v-for="(icon, index) in filteredIcons" :key="index" :icon="icon" :iconClass="selectedClass" @itemCopied="setCopyStatus"></icon>
      </ul>
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
      searchString: '',
      selectedClass: 'icon-md',
      copyStatus: 0,
    };
  },
  computed: {
    filteredIcons() {
      return this.iconData.icons.filter(icon => icon.includes(this.searchString));
    },
    kbSize() {
      return Math.round(this.iconData.spriteSize / 1024);
    },
  },
  methods: {
    setCopyStatus(newStatus) {
      this.copyStatus = newStatus;
      setTimeout(() => {
        this.copyStatus = 0;
      }, 5000);
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
}

.icons-list li {
  min-width: 12.5%;
  min-height: 125px;
  font-size: 12px;
  float: left;
  line-height: 1.4;
  text-align: center;
  background-color: #f9f9f9;
  border: 1px solid #fff;
  padding: 20px;
  display: list-item;
  list-style: none;
  margin: 3px;
}

.icons-list li:hover {
  cursor: pointer;
  border: solid 1px #ccc;
}

.icons-list li svg {
  margin-bottom: 15px;
}

.muted {
  color: #999;
  font-size: smaller;
}
</style>
