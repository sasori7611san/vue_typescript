<template>
  <div>
    <BaseButton :count-ref="redCount" :str-color="colorName" @click="choiceRed()" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRef } from 'vue'
import BaseButton from './BaseButton.vue'

export default defineComponent({
  props: {
    choiceColor: Function,
    redCountRef: Number
  },
  setup (props) {
    // 枚数の代入
    const redCount = toRef(props, 'redCountRef')
    // undefinedチェックした上で、色の選択を行う
    const choiceRed = () => {
      if (props.choiceColor !== undefined) {
        props.choiceColor(2)
      }
    }
    // 色指定
    const colorName = ref('red')
    return { redCount, choiceRed, colorName }
  },
  components: { BaseButton }
})
</script>

<style scoped>

</style>
