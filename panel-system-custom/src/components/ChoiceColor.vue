<template>
  <div>
    <div class="choice">
      <button id="buttonRed" @click="choiceColor?.(2)">{{ redCount }}</button>
      <button id="buttonGreen" @click="choiceColor?.(3)">{{ greenCount }}</button>
      <button id="buttonWhite" @click="choiceColor?.(4)">{{ whiteCount }}</button>
      <button id="buttonBlue" @click="choiceColor?.(5)">{{ blueCount }}</button><br />
      <button id="buttonYellow" @click="choiceColor?.(1)"></button>
    </div>
    <p>更新で最初からに戻ります。</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRef } from 'vue'

export default defineComponent({
  props: {
    choiceColor: Function,
    redCountRef: Number,
    greenCountRef: Number,
    whiteCountRef: Number,
    blueCountRef: Number
  },
  setup (props) {
    const redCount = toRef(props, 'redCountRef')
    const greenCount = toRef(props, 'greenCountRef')
    const whiteCount = toRef(props, 'whiteCountRef')
    const blueCount = toRef(props, 'blueCountRef')
    return { redCount, greenCount, whiteCount, blueCount }
  }
})
</script>

<style scoped>
.choice > button {
  margin: 5px;
  width: 50px;
  height: 50px;
}

#buttonRed {
  background-color: red;
}

#buttonGreen {
  background-color: green;
}

#buttonWhite {
  background-color: white;
}

#buttonBlue {
  background-color: blue;
}

#buttonYellow {
  background-color: yellow;
}
</style>
