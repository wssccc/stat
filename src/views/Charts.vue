<template>
  <div class="container">
    <div v-if="!isReady">
      <p style="text-align: center"><img src="../assets/loading.gif"/></p>
    </div>
    <div v-else>
      <div class="row">
        <div class="col-xs-12 col-md-6 col-md-offset-3">
          <Progress/>
        </div>
      </div>
      <div class="row hidden-xs">
        <HeatMap/>
      </div>
      <div class="row">
        <KLine/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Progress from '@/components/Progress.vue'
import { store } from '@/store'
import HeatMap from '@/components/HeatMap.vue'
import KLine from '../components/KLine.vue'

@Component({
  components: {
    KLine,
    HeatMap,
    Progress
  }
})
export default class Weight extends Vue {
  get isReady () {
    return store.state.data
  }
}
</script>
