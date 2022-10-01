<template>
  <div>
    <BaseButton :count-ref="whiteCount" :str-color="colorName" @click="choiceWhite()" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRef } from 'vue'
import BaseButton from './BaseButton.vue'

export default defineComponent({
  props: {
    choiceColor: Function,
    whiteCountRef: Number
  },
  setup (props) {
    // 枚数の代入
    const whiteCount = toRef(props, 'whiteCountRef')
    // undefinedチェックした上で、色の選択を行う
    const choiceWhite = () => {
      if (props.choiceColor !== undefined) {
        props.choiceColor(4)
      }
    }
    // 色指定
    const colorName = ref('white')
    return { whiteCount, choiceWhite, colorName }
  },
  components: { BaseButton }
})
</script>

<style scoped>

</style>
