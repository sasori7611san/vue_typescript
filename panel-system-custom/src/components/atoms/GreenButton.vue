<template>
  <div>
    <BaseButton :str-color="colorName" @click="choiceGreen()" />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref, toRef } from 'vue'
import BaseButton from './BaseButton.vue'

export default defineComponent({
  props: {
    choiceColor: Function
  },
  setup (props) {
    // undefinedチェックした上で、色の選択を行う
    const choiceGreen = () => {
      if (props.choiceColor !== undefined) {
        props.choiceColor(3)
      }
    }
    // 色指定
    const colorName = ref('green')
    return { choiceGreen, colorName }
  },
  components: { BaseButton }
})
</script>

<style scoped>

</style>
