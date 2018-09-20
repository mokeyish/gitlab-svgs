<template>
  <div
    class="svg-content"
    @click="copyIcon">
    <img
      :src="imgPath"/>
    <h4>
      <span class="js-illustration-name" v-on:copy="copyEvent" :data-illustration="illustration.name">
        {{illustration.name}}
      </span> ({{kbSize}}Kb)
    </h4>
  </div>
</template>

<script>
import copyToClipboard from '../helpers/copy_to_clipboard';

export default {
  props: {
    illustration: {
      type: Object,
      required: true,
    },
  },
  computed: {
    imgPath() {
      return `dist/${this.illustration.name}`;
    },
    kbSize() {
      return Math.round(this.illustration.size / 1024);
    },
  },
  methods: {
    copyIcon() {
      this.$emit('itemCopied', copyToClipboard(this.illustration.name) ? 1 : -1);
    },
    copyEvent(event) {
      event.preventDefault();
      if (event.clipboardData) {
        event.clipboardData.setData('text/plain', event.target.dataset.illustration);
      }
    },
  },
};
</script>
