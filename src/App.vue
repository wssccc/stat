<template>
  <div id="app">
    <div id="nav">
      <router-link to="/weight">Weight</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <Profile/>
    <router-view/>
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  display: none;
  padding: 10px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
}
</style>
