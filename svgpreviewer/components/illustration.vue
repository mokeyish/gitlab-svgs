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
      const iconNameElement = this.$el.querySelector('.js-illustration-name');
      const range = document.createRange();
      range.selectNode(iconNameElement);
      window.getSelection().addRange(range);

      try {
        const successful = document.execCommand('copy');
        const msg = successful ? 'successful' : 'unsuccessful';
        console.log(`Copy illustration command was ${msg}`);
        this.$emit('itemCopied', 1);
      } catch (err) {
        console.log('Oops, unable to copy');
        this.$emit('itemCopied', -1);
      }
      window.getSelection().removeAllRanges();
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
