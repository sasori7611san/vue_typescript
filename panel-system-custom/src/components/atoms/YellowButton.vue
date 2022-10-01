<template>
  <!-- <div class="choice">
    <button id="buttonYellow" @click="choiceYellow()"></button>
  </div> -->
  <div>
    <BaseButton :count-ref="yellowCount" :str-color="colorName" @click="choiceYellow()" />
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
    const choiceYellow = () => {
      if (props.choiceColor !== undefined) {
        props.choiceColor(1)
      }
    }
    // BaseButtonで非表示にするため仮の数値99を入れる
    const yellowCount = ref(99)
    // 色指定
    const colorName = ref('yellow')
    return { choiceYellow, yellowCount, colorName }
  },
  components: { BaseButton }
})
</script>

<style scoped>

</style>
