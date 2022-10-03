<template>
  <div>
     <button :id=panelNo class="panel gray">{{ panelNum }}</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    panelNum: Number
  },
  // }
  setup (props) {
    // パネル番号のundefinedチェック
    const panelNo = ref('')
    if (props.panelNum !== undefined) {
      panelNo.value = props.panelNum.toString()
    }
    return { panelNo }
  }
})
</script>

<style scoped>
.panel {
  width: 60px;
  height: 60px;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

.gray {
  background-color: gray;
}

button {
  font-size: 16px;
}
</style>
