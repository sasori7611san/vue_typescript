<template>
  <!-- <div class="choice">
    <button id="buttonBlue" @click="choiceBlue()">{{ blueCount }}</button>
  </div> -->
  <div>
    <BaseButton :count-ref="blueCount" :str-color="colorName" @click="choiceBlue()" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRef } from 'vue'
import BaseButton from './BaseButton.vue'

export default defineComponent({
  props: {
    choiceColor: Function,
    blueCountRef: Number
  },
  setup (props) {
    // 枚数の代入
    const blueCount = toRef(props, 'blueCountRef')
    // undefinedチェックした上で、色の選択を行う
    const choiceBlue = () => {
      if (props.choiceColor !== undefined) {
        props.choiceColor(5)
      }
    }
    // 色指定
    const colorName = ref('blue')
    return { blueCount, choiceBlue, colorName }
  },
  components: { BaseButton }
})
</script>

<style scoped>
/* .choice > button {
  margin: 5px;
  width: 50px;
  height: 50px;
}

#buttonBlue {
  background-color: blue;
} */
</style>
