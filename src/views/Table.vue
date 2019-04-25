<template>
  <div class="container">
    <div v-if="records" class="row">
      <table class="table table-striped table-hover">
        <thead>
        <tr class="active">
          <th class="hidden-xs">#</th>
          <th><i class="fa fa-calendar fa-lg"></i></th>
          <th><i class="fa fa-sun fa-lg fa-spin"></i></th>
          <th><i class="fa fa-moon fa-lg"></i></th>
          <th><i class="fa fa-chart-line fa-lg"></i></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in records" :key="index">
          <th class="hidden-xs" scope="row">{{index+1}}</th>
          <td>{{item[0]}}</td>
          <td>{{item[3]}}</td>
          <td>{{item[4]}}</td>
          <td :class="rowClass(item[5])">{{item[5]}}</td>
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
}
</script>
<style>
</style>
