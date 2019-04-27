<template xmlns:rel="http://www.w3.org/1999/xhtml">
  <div class="preview container">
    <div class="hidden">
      <img ref='img' src="../assets/wulifanfan.gif" rel:auto_play="0" rel:rubbable="1"/>
    </div>
    <div class="col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-3">
      <div>
        <img ref='img2' src="../assets/loading.gif"/>
      </div>
      <div style="margin-top: 50px">
        <vue-slider v-model="value" v-bind="sliderOptions" tooltip="always" tooltipFormatter="{value}kg"/>
      </div>
    </div>
  </div>
</template>
<script type="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { store } from '@/store'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'
import { TweenLite } from '@/global'

const SuperGif = require('libgif')
const MIN_WEIGHT = 60
const MAX_WEIGHT = 90

@Component({
  components: {
    VueSlider
  }
})
export default class Preview extends Vue {
  data () {
    let rubResolve = null
    let rubPromise = new Promise(
      function (resolve, reject) {
        rubResolve = resolve
      }
    )
    return {
      sliderOptions: {
        min: MIN_WEIGHT,
        max: MAX_WEIGHT,
        duration: 1,
        dotSize: 25
      },
      rub: {
        promise: rubPromise,
        resolve: rubResolve
      },
      _tweenedValue: MAX_WEIGHT
    }
  }

  get value () {
    let cur = ((!store.state.latest || store.state.latest < MIN_WEIGHT) ? MIN_WEIGHT : store.state.latest)
    this.getRub().then(() => {
      TweenLite.to(this.$data, 0.5, { _tweenedValue: cur })
    })
    return cur
  }

  set value (val) {
    this.getRub().then(() => {
      TweenLite.to(this.$data, 0.5, { _tweenedValue: val })
    })
  }

  @Watch('$data._tweenedValue')
  onChangeValue (newVal, oldVal) {
    // 3,35
    this.getRub().then((rub) => {
      let cur = Math.round((newVal - MIN_WEIGHT) * (32 / (MAX_WEIGHT - MIN_WEIGHT))) + 3
      if (cur === rub.get_current_frame()) {
        return
      }
      rub.move_to(cur)
      let img2 = this.$refs.img2
      if (img2.style.width !== '100%') {
        // clear loading
        img2.src = ''
        // update style
        img2.style.width = '100%'
      }
      img2.src = rub.get_canvas().toDataURL('image/png')
    })
  }

  get records () {
    return store.state.data && [...store.state.data].reverse()
  }

  mounted () {
    let rub = new SuperGif({ gif: this.$refs.img })
    rub.load(() => {
      this.$data.rub.resolve(rub)
    })
  }

  getRub () {
    return this.$data.rub.promise
  }
}
</script>
<style scoped>
  .preview {
    text-align: center;
  }
</style>
