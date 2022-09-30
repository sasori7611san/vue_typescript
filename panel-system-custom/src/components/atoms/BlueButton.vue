<template>
  <div class="choice">
    <button id="buttonBlue" @click="choiceBlue()">{{ blueCount }}</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRef } from 'vue'

export default defineComponent({
  props: {
    choiceColor: Function,
    blueCountRef: Number
  },
  setup (props) {
    const blueCount = toRef(props, 'blueCountRef')
    const choiceBlue = () => {
      if (props.choiceColor) {
        props.choiceColor(5)
      }
    }
    return { blueCount, choiceBlue }
  }
})
</script>

<style scoped>
.choice > button {
  margin: 5px;
  width: 50px;
  height: 50px;
}

#buttonBlue {
  background-color: blue;
}
</style>
