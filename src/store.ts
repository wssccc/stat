import Vue from 'vue'
import Vuex from 'vuex'
import { env } from '@/global'

Vue.use(Vuex)

let staticdata = require('../data.json')
let state: StoreState = { data: undefined, progress: 0 }

const dateFormat = (date: Date) => {
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
}
const interpolation = (data: any[][]): StoreState => {
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
          pre[3]
        ])
      }
    }
    pre = item
  })
  const last = data.length - 1
  result.push([dateFormat(new Date(data[last][0])), data[last][0], data[last][1], data[last][2], data[last][3]])
  let progress = parseFloat(((80 - data[last][2]) / 15 * 100).toFixed(1))
  return {
    data: result,
    progress
  }
}

function load () {
  return new Promise<any[][]>((resolve, reject) => {
    if (env === 'development') {
      resolve(staticdata)
    } else {
      fetch('../data.json?_=' + Math.random()).then(res => res.json()).then(data => {
        resolve(data as any[][])
      })
    }
  })
}

let store = new Vuex.Store({
  state: state,
  mutations: {
    update (state, newState: StoreState) {
      Object.assign(state, newState)
    }
  },
  actions: {},
  getters: {}
})

Vue.nextTick(() => {
  load().then(res => {
    let d = interpolation(res)
    store.commit('update', d)
  })
})

let fields = Object.keys(state)

export {
  store, fields
}
