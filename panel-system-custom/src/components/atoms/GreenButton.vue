<template>
  <div class="choice">
    <button id="buttonGreen" @click="choiceGreen()">{{ greenCount }}</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRef } from 'vue'

export default defineComponent({
  props: {
    choiceColor: Function,
    greenCountRef: Number
  },
  setup (props) {
    const greenCount = toRef(props, 'greenCountRef')
    const choiceGreen = () => {
      if (props.choiceColor) {
        props.choiceColor(3)
      }
    }
    return { greenCount, choiceGreen }
  }
})
</script>

<style scoped>
.choice > button {
  margin: 5px;
  width: 50px;
  height: 50px;
}

#buttonGreen {
  background-color: green;
}
</style>
