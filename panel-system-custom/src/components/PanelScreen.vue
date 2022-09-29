<template>
  <div>
    <p>I have seen it...</p>
    <div class ="panel">
      <button id="1" class="gray" @click="action1()">1</button><button id="2" class="gray" @click="action2()">2</button><button id="3" class="gray" @click="action3()">3</button><button id="4" class="gray" @click="action4()">4</button><button id="5" class="gray" @click="action5()">5</button><br />
      <button id="6" class="gray" @click="action6()">6</button><button id="7" class="gray" @click="action7()">7</button><button id="8" class="gray" @click="action8()">8</button><button id="9" class="gray" @click="action9()">9</button><button id="10" class="gray" @click="action10()">10</button><br />
      <button id="11" class="gray" @click="action11()">11</button><button id="12" class="gray" @click="action12()">12</button><button id="13" class="gray" @click="action13()">13</button><button id="14" class="gray" @click="action14()">14</button><button id="15" class="gray" @click="action15()">15</button><br />
      <button id="16" class="gray" @click="action16()">16</button><button id="17" class="gray" @click="action17()">17</button><button id="18" class="gray" @click="action18()">18</button><button id="19" class="gray" @click="action19()">19</button><button id="20" class="gray" @click="action20()">20</button><br />
      <button id="21" class="gray" @click="action21()">21</button><button id="22" class="gray" @click="action22()">22</button><button id="23" class="gray" @click="action23()">23</button><button id="24" class="gray" @click="action24()">24</button><button id="25" class="gray" @click="action25()">25</button><br />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    action: Function
  },
  setup (props) {
    const action1 = () => {
      if (props.action) {
        props.action(1)
      }
    }
    const action2 = () => {
      if (props.action) {
        props.action(2)
      }
    }
    const action3 = () => {
      if (props.action) {
        props.action(3)
      }
    }
    const action4 = () => {
      if (props.action) {
        props.action(4)
      }
    }
    const action5 = () => {
      if (props.action) {
        props.action(5)
      }
    }
    const action6 = () => {
      if (props.action) {
        props.action(6)
      }
    }
    const action7 = () => {
      if (props.action) {
        props.action(7)
      }
    }
    const action8 = () => {
      if (props.action) {
        props.action(8)
      }
    }
    const action9 = () => {
      if (props.action) {
        props.action(9)
      }
    }
    const action10 = () => {
      if (props.action) {
        props.action(10)
      }
    }
    const action11 = () => {
      if (props.action) {
        props.action(11)
      }
    }
    const action12 = () => {
      if (props.action) {
        props.action(12)
      }
    }
    const action13 = () => {
      if (props.action) {
        props.action(13)
      }
    }
    const action14 = () => {
      if (props.action) {
        props.action(14)
      }
    }
    const action15 = () => {
      if (props.action) {
        props.action(15)
      }
    }
    const action16 = () => {
      if (props.action) {
        props.action(16)
      }
    }
    const action17 = () => {
      if (props.action) {
        props.action(17)
      }
    }
    const action18 = () => {
      if (props.action) {
        props.action(18)
      }
    }
    const action19 = () => {
      if (props.action) {
        props.action(19)
      }
    }
    const action20 = () => {
      if (props.action) {
        props.action(20)
      }
    }
    const action21 = () => {
      if (props.action) {
        props.action(21)
      }
    }
    const action22 = () => {
      if (props.action) {
        props.action(22)
      }
    }
    const action23 = () => {
      if (props.action) {
        props.action(23)
      }
    }
    const action24 = () => {
      if (props.action) {
        props.action(24)
      }
    }
    const action25 = () => {
      if (props.action) {
        props.action(25)
      }
    }
    return {
      action1, action2, action3, action4, action5, action6, action7, action8, action9, action10, action11, action12, action13, action14, action15, action16, action17, action18, action19, action20, action21, action22, action23, action24, action25
    }
  }
})
</script>

<style scoped>
.panel > button {
  width: 60px;
  height: 60px;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

.gray {
  background-color: gray;
}

.red {
  background-color: red;
}

.green {
  background-color: green;
}

.white {
  background-color: white;
}

.blue {
  background-color: blue;
}

.yellow {
  background-color: yellow;
}

</style>
