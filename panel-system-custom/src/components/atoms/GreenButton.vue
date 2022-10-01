<template>
  <!-- <div class="choice">
    <button id="buttonGreen" @click="choiceGreen()">{{ greenCount }}</button>
  </div> -->
  <div>
    <BaseButton :count-ref="greenCount" :str-color="colorName" @click="choiceGreen()" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRef } from 'vue'
import BaseButton from './BaseButton.vue'

export default defineComponent({
  props: {
    choiceColor: Function,
    greenCountRef: Number
  },
  setup (props) {
    // 枚数の代入
    const greenCount = toRef(props, 'greenCountRef')
    // undefinedチェックした上で、色の選択を行う
    const choiceGreen = () => {
      if (props.choiceColor !== undefined) {
        props.choiceColor(3)
      }
    }
    // 色指定
    const colorName = ref('green')
    return { greenCount, choiceGreen, colorName }
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

#buttonGreen {
  background-color: green;
} */
</style>
