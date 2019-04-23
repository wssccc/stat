<template>
  <div class="container">
    <div class="col-xs-12 col-md-6 col-md-offset-3">
      <div id="progress-container" class="progress" :style="{display: progress>0? 'block':'none'}">
        <div
          class="progress-bar progress-bar-striped active"
          role="progressbar"
          aria-valuenow="0"
          aria-valuemin="0"
          aria-valuemax="100"
          :style="{width: progress+'%'}"
        >{{progress}}%
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { fields, store } from '@/store'

@Component
export default class Progress extends Vue {
  get progress () {
    return store.state.progress
  }
}
</script>
<style scoped lang="less">
</style>
