<template>
  <div class="choice">
    <button id="buttonYellow" @click="choiceColor?.(1)"></button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    choiceColor: Function
  }
})
</script>

<style scoped>
.choice > button {
  margin: 5px;
  width: 50px;
  height: 50px;
}

#buttonYellow {
  background-color: yellow;
}
</style>
