<template>
  <div id="app" class="container">
    <div id="nav" class="row">
      <router-link to="/charts">Charts</router-link>
      |
      <router-link to="/table">Table</router-link>
      |
      <router-link to="/preview">Skr</router-link>
      |
      <router-link to="/about">About</router-link>
    </div>
    <div class="row">
      <Profile/>
    </div>
    <div class="row">
      <router-view/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Profile from './components/Profile.vue'

export default Vue.extend({
  components: {
    Profile
  }
})
</script>

<style lang="less">
  #nav {
    padding: 10px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #4a8aff;
      }
    }
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  }
</style>
