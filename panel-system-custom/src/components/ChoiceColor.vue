<template>
  <div>
    <div class="choice">
      <button id="buttonRed" @click="choiceRed()">{{ redCount }}</button>
      <button id="buttonGreen" @click="choiceGreen()">{{ greenCount }}</button>
      <button id="buttonWhite" @click="choiceWhite()">{{ whiteCount }}</button>
      <button id="buttonBlue" @click="choiceBlue()">{{ blueCount }}</button><br />
      <button id="buttonYellow" @click="choiceYellow()"></button>
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
    const choiceRed = () => {
      if (props.choiceColor) {
        props.choiceColor(2)
      }
    }
    const choiceGreen = () => {
      if (props.choiceColor) {
        props.choiceColor(3)
      }
    }
    const choiceWhite = () => {
      if (props.choiceColor) {
        props.choiceColor(4)
      }
    }
    const choiceBlue = () => {
      if (props.choiceColor) {
        props.choiceColor(5)
      }
    }
    const choiceYellow = () => {
      if (props.choiceColor) {
        props.choiceColor(1)
      }
    }
    return { redCount, greenCount, whiteCount, blueCount, choiceRed, choiceGreen, choiceWhite, choiceBlue, choiceYellow }
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
