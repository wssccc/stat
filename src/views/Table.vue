<template>
  <div class="container">
    <div v-if="records" class="row">
      <table class="table table-striped table-hover">
        <thead>
        <tr class="active">
          <th class="hidden-xs">#</th>
          <th><i class="fa fa-calendar fa-lg"></i></th>
          <th><i class="fa fa-sun fa-lg fa-spin"></i></th>
          <th class="hidden-xs"><i class="fa fa-moon fa-lg"></i></th>
          <th><i class="fa fa-chart-line fa-lg"></i></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in records" :key="index">
          <th class="hidden-xs" scope="row">{{index+1}}</th>
          <td>{{item[0]}}</td>
          <td>{{item[3].toFixed(1)}}</td>
          <td class="hidden-xs">{{item[4].toFixed(1)}}</td>
          <td :class="rowClass(item[5])">
            <span class="tip-arrow glyphicon" :class="arrowIcon(item[5])"></span>
            {{item[5]? Math.abs(item[5]).toFixed(1):'-'}}
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p style="text-align: center"><img src="../assets/loading.gif"/></p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { store } from '../store'

@Component
export default class Table extends Vue {
  get records () {
    return store.state.data && [...store.state.data].reverse()
  }

  rowClass (diff: number) {
    if (diff > 0) {
      return 'danger'
    }
    if (diff < 0) {
      return 'success'
    }
    return ''
  }

  arrowIcon (num: number) {
    if (num > 0) {
      return 'glyphicon-arrow-up'
    } else if (num < 0) {
      return 'glyphicon-arrow-down'
    } else {
      return ''
    }
  }
}
</script>
<style>
  .tip-arrow.glyphicon-arrow-up {
    color: #ec0000
  }

  .tip-arrow.glyphicon-arrow-down {
    color: #00da3c
  }
</style>
