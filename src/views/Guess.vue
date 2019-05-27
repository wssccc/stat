<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <div>
          <pre v-for="(item, index) in outputs" :key="index">{{item}}</pre>
        </div>
        <div>
          <div class="form" role="form">
            <div class="form-group">
              <input type="text" class="form-control" ref="numberInput"
                     @keydown="$event.key ==='Enter' && guess()" placeholder="Number">
            </div>
            <!--<button class="btn btn-primary pull-right" @click="debug">Debug</button>-->
            <button class="btn btn-danger pull-right" @click="reset">Reset</button>
            <button class="btn btn-primary pull-right" @click="guess">Guess</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

class Game {
  theNumber: string = ''
  count = 0

  constructor () {
    this.reset()
  }

  guess (num: string, print: (arg0: string) => void) {
    if (this.count > 0) {
      --this.count
      if (this.theNumber === num) {
        print('right!')
        this.reset()
      } else {
        const numstr = String(this.theNumber)
        const instr = String(num)
        let right = 0
        let wrong = 0
        if (numstr.length !== instr.length) {
          print('Input 4-digits number')
          return
        }
        for (let i = 0; i < numstr.length; i++) {
          if (numstr.charAt(i) === instr.charAt(i)) {
            ++right
          } else {
            if (instr.indexOf(numstr.charAt(i)) !== -1) {
              ++wrong
            }
          }
        }
        let outstr = (10 - this.count) + '. ' + instr + ': A' + right + 'B' + wrong
        print(outstr)
        if (this.count === 0) {
          print(`Game over,the number is ${this.theNumber}`)
          this.reset()
        }
      }
    }
  }

  static test (num: number, target: number) {
    const numstr = String(target)
    const instr = String(num)
    let right = 0
    let wrong = 0
    for (let i = 0; i < numstr.length; i++) {
      if (numstr.charAt(i) === instr.charAt(i)) {
        ++right
      } else {
        if (instr.indexOf(numstr.charAt(i)) !== -1) {
          ++wrong
        }
      }
    }
    return [right, wrong]
  }
  reset () {
    let digits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let run = true
    let number = ''
    while (run) {
      let selected = 0
      for (let i = 0; i < digits.length; i++) {
        if (digits[i] !== 0) {
          ++selected
        }
      }
      if (selected === 4) {
        run = false
      } else {
        let sel = Math.floor(Math.random() * 9) + 1
        if (digits[sel] === 0) {
          number = number + sel
          digits[sel] = 1
        }
      }
    }
    this.theNumber = number
    this.count = 10
  }
}

@Component
export default class Guess extends Vue {
  outputs: string[] = []
  game = new Game()

  reset () {
    this.game.reset()
    while (this.outputs.length > 0) {
      this.outputs.pop()
    }
    const numberInput = this.$refs.numberInput as HTMLInputElement
    numberInput.value = ''
  }

  guess () {
    const numberInput = this.$refs.numberInput as HTMLInputElement
    let num = numberInput.value
    numberInput.value = ''
    numberInput.focus()

    this.game.guess(num, (text: string) => {
      this.outputs.push(text)
    })
  }

  debug () {
    let select = []
    out:
      for (let i = 1000; i < 10000; i++) {
        for (let output of this.outputs) {
          const match = output.match(/(\d{4}).*A(\d)B(\d)/)
          if (match) {
            let n = parseInt(match[1])
            let r = parseInt(match[2])
            let w = parseInt(match[3])
            let [rr, ww] = Game.test(n, i)
            if (rr !== r || ww !== w) {
              continue out
            }
          }
        }
        select.push(i)
      }
    console.log(select.length)
    console.log(select)
  }
}

</script>
<style scoped>
</style>
