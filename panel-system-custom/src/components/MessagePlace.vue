<template>
  <div>
    <br />
    {{ warning }}
    <p>選択中の色：{{ strColor }}</p>
    <p>取れる番号は、{{ panelNo }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRef } from 'vue'

export default defineComponent({
  props: {
    warningRef: String,
    strColorRef: String,
    panelNoRef: String
  },
  setup (props) {
    const warning = toRef(props, 'warningRef')
    const strColor = toRef(props, 'strColorRef')
    const panelNo = toRef(props, 'panelNoRef')
    return { strColor, warning, panelNo }
  }
})
</script>

<style scoped>

</style>
