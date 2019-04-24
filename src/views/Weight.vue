<template>
  <div>
    <div class="container">
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
import HelloWorld from '@/components/HelloWorld.vue'
import Progress from '@/components/Progress.vue'
import { store } from '@/store'
import HeatMap from '@/components/HeatMap.vue'
import KLine from '../components/KLine.vue'

@Component({
  store,
  components: {
    KLine,
    HeatMap,
    HelloWorld,
    Progress
  }
})
export default class Weight extends Vue {
}
</script>
