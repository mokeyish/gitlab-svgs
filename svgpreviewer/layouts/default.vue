<template>
  <div>
    <menu-bar />
    <nuxt />
  </div>
</template>


<script>
import MenuBar from '../components/menu_bar.vue';

export default {
  components: {
    MenuBar,
  },
};
</script>

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
  --default-fg: #000000;
  --default-bg: #ffffff;
  --inverse-fg: #ffffff;
  --inverse-bg: #000000;
  --indigo-fg: #d1d1f0;
  --indigo-bg: #292961;
  --gray-fg: #707070;
  --gray-bg: #f2f2f2;
  --red-fg: #b03927;
  --red-bg: #fae2de;
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
