<template>
  <div>
    <Progress/>
    <HeatMap/>
    <KLine/>
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
