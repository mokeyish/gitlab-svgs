/* eslint object-shorthand: "off" */
<template>
  <li 
    class="icon-base"
    @click="copyIcon">
    <svg v-bind:class="[iconClass]">
      <use 
        v-bind="{'xlink:href':'dist/icons.svg#'+icon}">
      </use>
    </svg>
    <div class="js-icon-name" v-on:copy="copyEvent(icon)">
      {{icon}}
    </div>
  </li>
</template>

<<script>
export default {
  props: {
    icon: {
      type: String,
      required: true,
    },
    iconClass: {
      type: String,
      required: true,
    },
  },
  methods: {
    copyIcon: function () {
      const iconNameElement = this.$el.querySelector('.js-icon-name');
      const range = document.createRange();
      range.selectNode(iconNameElement);
      window.getSelection().addRange(range);

      try {
        const successful = document.execCommand('copy');
        const msg = successful ? 'successful' : 'unsuccessful';
        console.log(`Copy email command was ${msg}`);
        this.$emit('itemCopied', 1);
      } catch (err) {
        console.log('Oops, unable to copy');
        this.$emit('itemCopied', -1);
      }
      window.getSelection().removeAllRanges();
    },
    copyEvent: function(icon) {
      event.preventDefault();
      if (event.clipboardData) {
        event.clipboardData.setData("text/plain", icon);
      }
    },
  },
};
</script>

<style>
  .icon-base svg {
    width: 32px;
    height: 32px;
  }

  svg.icon-xs {
    width: 8px;
    height: 8px;
  }

  svg.icon-sm {
    width: 16px;
    height: 16px;
  }

  svg.icon-md {
    width: 32px;
    height: 32px;
  }

  svg.icon-lg {
    width: 48px;
    height: 48px;
  }

  svg.icon-xl {
    width: 72px;
    height: 72px;
  }

  svg.icon-hu {
    width: 256px;
    height: 256px;
  }

  svg.icon-nav {
    width: 16px;
    height: 16px;
    fill: #707070;
  }

</style>

