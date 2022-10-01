<template>
  <div>
    <BaseButton :str-color="colorName" @click="choiceRed()" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import BaseButton from './BaseButton.vue'

export default defineComponent({
  props: {
    choiceColor: Function
  },
  setup (props) {
    // undefinedチェックした上で、色の選択を行う
    const choiceRed = () => {
      if (props.choiceColor !== undefined) {
        props.choiceColor(2)
      }
    }
    // 色指定
    const colorName = ref('red')
    return { choiceRed, colorName }
  },
  components: { BaseButton }
})
</script>

<style scoped>

</style>
