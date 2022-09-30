<template>
  <div class="choice">
    <button id="buttonRed" @click="choiceRed()">{{ redCount }}</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRef } from 'vue'

export default defineComponent({
  props: {
    choiceColor: Function,
    redCountRef: Number
  },
  setup (props) {
    const redCount = toRef(props, 'redCountRef')
    const choiceRed = () => {
      if (props.choiceColor) {
        props.choiceColor(2)
      }
    }
    return { redCount, choiceRed }
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
</style>
