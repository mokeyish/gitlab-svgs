<script>
import MenuBar from '../components/menu_bar.vue';

export default {
  components: {
    MenuBar,
  },
};
</script>

<template>
  <div>
    <menu-bar />
    <nuxt />
  </div>
</template>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
  font-size: 12px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

html {
  --default-fg: #1f1f1f;
  --default-bg: #ffffff;
  --inverse-fg: #ffffff;
  --inverse-bg: #1f1f1f;
  --indigo-fg: #C7C7f2;
  --indigo-bg: #222261;
  --gray-fg: #666;
  --gray-bg: #fafafa;
  --red-fg: #dd2b0e;
  --red-bg: #fdd4cd;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
