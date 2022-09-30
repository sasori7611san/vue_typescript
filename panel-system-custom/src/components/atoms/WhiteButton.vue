<template>
  <div class="choice">
    <button id="buttonWhite" @click="choiceWhite()">{{ whiteCount }}</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRef } from 'vue'

export default defineComponent({
  props: {
    choiceColor: Function,
    whiteCountRef: Number
  },
  setup (props) {
    const whiteCount = toRef(props, 'whiteCountRef')
    const choiceWhite = () => {
      if (props.choiceColor) {
        props.choiceColor(4)
      }
    }
    return { whiteCount, choiceWhite }
  }
})
</script>

<style scoped>
.choice > button {
  margin: 5px;
  width: 50px;
  height: 50px;
}

#buttonWhite {
  background-color: white;
}
</style>
