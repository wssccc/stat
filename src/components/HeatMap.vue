<template>
  <div v-if="isReady" class="heat-map" ref="heatMap"></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { echarts } from '@/global'
import { store } from '../store'

const weekMap = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

@Component
export default class HeatMap extends Vue {
  mounted () {
    this.update()
  }

  updated () {
    this.update()
  }

  get isReady () {
    return store.state.data
  }

  update () {
    store.state.data && new Heatmap(store.state.data).init(this.$refs.heatMap as HTMLElement)
  }
}

type HeatMapDataItem = [string, number | undefined]

export class Heatmap {
  data: HeatMapDataItem[]
  begin: number = 0
  end: number = 0
  absDiffMax: number = 0

  constructor (data: Item[]) {
    this.data = this.process(data)
  }

  process (rawData: Item[]) {
    let data: HeatMapDataItem[] = []
    for (let i = 0; i < rawData.length; ++i) {
      let diff = rawData[i][5]
      let now = new Date(rawData[i][0]).getTime()
      data.push([echarts.format.formatTime('yyyy-MM-dd', now), diff || undefined])
      if (!this.begin || now < this.begin) {
        this.begin = now
      }
      if (!this.end || now > this.end) {
        this.end = now
      }
      if (!this.absDiffMax || Math.abs(diff) > this.absDiffMax) {
        this.absDiffMax = Math.abs(diff)
      }
    }
    return data
  }

  init (elem: HTMLElement) {
    echarts.init(elem).setOption({
      title: {
        top: 30,
        left: 'center',
        text: ''
      },
      tooltip: {},
      visualMap: {
        show: false,
        min: -this.absDiffMax,
        max: 0,
        type: 'piecewise',
        orient: 'horizontal',
        left: 'center',
        top: 65,
        textStyle: {
          color: '#000'
        },
        inRange: {
          color: ['#254e77', '#acd5f2']
        },
        outOfRange: {
          color: ['red', 'red']
        }
      },
      calendar: {
        top: 20,
        left: 30,
        right: 30,
        cellSize: 17,
        range: '2019',
        splitLine: {
          show: true,
          lineStyle: {
            color: '#fff',
            width: 2,
            type: 'solid'
          }
        },
        itemStyle: {
          normal: {
            color: '#ededed',
            borderWidth: 2,
            borderColor: '#fff'
          }
        },
        yearLabel: { show: false }
      },
      series: {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        data: this.data,
        tooltip: {
          formatter: function (d: any) {
            let date = new Date(d.value[0])
            let dateText = echarts.format.formatTime('yyyy/MM/dd ', new Date(d.value[0])) + weekMap[date.getDay()]
            return `${dateText}<br/><span class="tip-arrow glyphicon glyphicon-arrow-${d.value[1] > 0 ? 'up' : 'down'}" aria-hidden="true"></span> ${Math.abs(d.value[1])}kg`
          },
          textStyle: {
            fontWeight: 'bold'
          },
          extraCssText: 'text-align: right;'
        }
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .heat-map {
    height: 180px;
  }
</style>
<style>
  .tip-arrow.glyphicon-arrow-up {
    color: #ec0000
  }

  .tip-arrow.glyphicon-arrow-down {
    color: #00da3c
  }
</style>
