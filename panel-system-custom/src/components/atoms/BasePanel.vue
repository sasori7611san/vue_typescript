<template>
  <div>
    <!-- <button class="panel gray" @click="action?.(panelNum)" >{{ panelNum }}</button> -->
    <button :id=panelNo class="panel gray">{{ panelNum }}</button>
  </div>
</template>

<script lang="ts">
// import { defineComponent, toRef } from 'vue'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    // strColor: String,
    // countRef: Number
    panelNum: Number
    // action: Function
  },
  // }
  setup (props) {
    // パネル番号のundefinedチェック
    const panelNo = ref('')
    if (props.panelNum !== undefined) {
      panelNo.value = props.panelNum.toString()
    }
    // // パネル番号代入
    // const panelNo = toRef(props, 'panelNum')
    // // 代入値のundefinedチェック
    // if (panelNo.value !== undefined) {
    //   panelNo.value = 1
    // }

    // // メソッドのundefinedチェック
    // const panelAction = () => {
    //   if (props.action !== undefined) {
    //     if (panelNo.value !== undefined) {
    //       props.action(panelNo.value)
    //     }
    //   }
    // }

    // return { panelAction, panelNo }
    // return { panelNo }
    return { panelNo }
  }
})
</script>

<style scoped>

/* .panel > button {
  width: 60px;
  height: 60px;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
} */

.panel {
  width: 60px;
  height: 60px;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

.gray {
  background-color: gray;
}
</style>
