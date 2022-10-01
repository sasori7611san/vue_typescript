<template>
  <div>
    <BaseButton :str-color="colorName" @click="choiceWhite()" />
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
    const choiceWhite = () => {
      if (props.choiceColor !== undefined) {
        props.choiceColor(4)
      }
    }
    // 色指定
    const colorName = ref('white')
    return { choiceWhite, colorName }
  },
  components: { BaseButton }
})
</script>

<style scoped>

</style>
