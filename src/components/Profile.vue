<template>
  <div class="row profile">
    <img
      class="profile-avatar"
      src="https://blog.ngscript.org/avatar.jpg"
      width="80"
      alt="wssccc logo"
    >
    <p>
      <a class="profile-name" href="#">@wssccc</a>
    </p>
    <p>Time waits for no one</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Profile extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.profile {
  text-align: center;
  //border-bottom: 1px solid #e5e5e5;
  margin-top: 30px;
  margin-bottom: 0px;
  padding-bottom: 0px;
}

.profile-avatar {
  border-radius: 50%;
  border: 1px solid;
}

.profile-name {
  font-size: 23px;
}
</style>
