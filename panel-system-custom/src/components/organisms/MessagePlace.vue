<template>
  <div>
    <br />
    <!-- {{ message }} -->
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
    const message = toRef(props, 'messageRef')
    const strColor = toRef(props, 'strColorRef')
    const panelNo = toRef(props, 'panelNoRef')
    return { strColor, message, panelNo }
  }
})
</script>

<style scoped>

</style>
