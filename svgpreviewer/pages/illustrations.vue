/* eslint-disable no-unused-vars, import/no-unresolved */
<template>
  <div>
     <header class="subheader">
      <div class="container">
        <div class="row">
          <div class="col-sm-6">
            <h4 class="subtitle">
              {{illustrationsData.illustrationCount}} Illustrations
            </h4>
          </div>
          <div class="col-sm-3">
            <span class="label label-success" v-if="copyStatus===1">Copied to your clipboard!</span>
            <span class="label label-danger" v-if="copyStatus===-1">Copying didn't work :-(</span>
            <span class="label muted" v-else-if="copyStatus===0">Click Illustration to copy path</span>
          </div>
          <div class="col-sm-3">
            <input maxlength="255" autofocus="autofocus" class="form-control pad" size="255" type="text" placeholder="Illustration Search" v-model="searchString">
          </div>
        </div>
      </div>      
    </header>
    <section class="container">
      <div class="illustrations-list">
        <illustration v-for="(illustration, index) in filteredIllustrations" :key="index" :illustration="illustration" @itemCopied="setCopyStatus"></illustration>
      </div>
    </section>
  </div>
</template>

<script>
import illustrations from '../static/dist/illustrations.json';
import Illustration from '../components/illustration.vue';

export default {
  components: {
    Illustration,
  },
  data() {
    return { 
      illustrationsData: illustrations,
      searchString: '',
      copyStatus: 0
    };
  },
  computed: {
    filteredIllustrations () {
      return this.illustrationsData.illustrations.filter(illustration => {
        return this.searchString==='' || illustration.name.indexOf(this.searchString)>-1;
      });
    },
  },
  methods: {
    setCopyStatus (newStatus) {
      this.copyStatus = newStatus;
      setTimeout(() => {
        this.copyStatus = 0;
      }, 5000);
    }
  }
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
  margin-top:3px;
}

.subheader .container .label {
  margin-top: 7px;
}

.subtitle {
  margin-top: 8px;
}

.illustrations-list {
  margin-top: 90px;
  padding: 0;
}

.illustrations-list div {
  border-bottom: solid 1px #ccc;
}

.illustrations-list div:hover {
  cursor: pointer;
  border: solid 1px #ccc;
}

.muted {
  color: #999;
  font-size: smaller;
}

</style>
