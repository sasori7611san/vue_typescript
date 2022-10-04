<template>
  <div>
    <br />
    <p>{{ message }}</p>
    <p>選択中の色：{{ strColor }}</p>
    <p>取れる番号は、{{ panelNo }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRef } from 'vue'

export default defineComponent({
  props: {
    messageRef: String,
    strColorRef: String,
    panelNoRef: String
  },
  setup (props) {
    // メッセージ
    const message = toRef(props, 'messageRef')
    // 選択中の色
    const strColor = toRef(props, 'strColorRef')
    // 取れる番号
    const panelNo = toRef(props, 'panelNoRef')
    return { strColor, message, panelNo }
  }
})
</script>

<style scoped>

</style>
