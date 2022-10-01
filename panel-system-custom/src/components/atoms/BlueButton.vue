<template>
  <div>
    <BaseButton :str-color="colorName" @click="choiceBlue()" />
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
    const choiceBlue = () => {
      if (props.choiceColor !== undefined) {
        props.choiceColor(5)
      }
    }
    // 色指定
    const colorName = ref('blue')
    return { choiceBlue, colorName }
  },
  components: { BaseButton }
})
</script>

<style scoped>

</style>
