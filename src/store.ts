import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import { env } from '@/global'
import { AppState, Item } from '@/typings'

Vue.use(Vuex)

let staticData = require('../data.json')
let state: AppState = { data: undefined, progress: 0 }

const dateFormat = (date: Date) => {
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
}
const interpolation = (data: any[][]): AppState => {
  let result: Item[] = []
  data = data.map((item) => {
    let strs = item.filter(v => typeof v === 'string')
    let vals = item.filter(v => typeof v === 'number')
    while (strs.length < 2) {
      strs.push(undefined)
    }
    while (vals.length < 2) {
      vals.push(vals[vals.length - 1])
    }
    return [new Date(strs[0]).getTime(), strs[1], vals[0], vals[1]]
  })
  let pre: any[]
  data.forEach(item => {
    if (pre) {
      let right = item[0]
      let left = pre[0]
      for (let k = left; k < right; k += 86400 * 1000) {
        result.push([
          dateFormat(new Date(k)),
          k,
          (k === left ? pre[1] : undefined),
          pre[2],
          pre[3],
          0
        ])
      }
    }
    pre = item
  })
  const last = data.length - 1
  result.push([dateFormat(new Date(data[last][0])), data[last][0], data[last][1], data[last][2], data[last][3], 0])
  //
  for (let i = 0; i < result.length; ++i) {
    let diff = 0
    if (i !== result.length - 1) {
      diff = result[i + 1][3] - result[i][3]
    }
    diff = parseFloat(diff.toFixed(2))
    result[i][5] = diff
  }
  //
  let progress = parseFloat(((80 - data[last][2]) / 15 * 100).toFixed(1))
  return {
    data: result,
    progress
  }
}

function load () {
  return new Promise<any[][]>((resolve, reject) => {
    if (env === 'development') {
      resolve(staticData)
    } else {
      fetch('../data.json?_=' + Math.random()).then(res => res.json()).then(data => {
        resolve(data as any[][])
      })
    }
  })
}

let store: Store<AppState> = new Vuex.Store<AppState>({
  state: state,
  mutations: {
    update (state, newState: AppState) {
      Object.assign(state, newState)
    }
  },
  actions: {},
  getters: {}
})

Vue.nextTick(() => {
  setTimeout(() => {
    load().then(res => {
      let d = interpolation(res)
      store.commit('update', d)
    })
  }, 0)
})

let fields = Object.keys(state)

export {
  store, fields
}
