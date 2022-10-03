<template>
  <div>
    <p>I have seen it...</p>
    <div class ="panel">
      <BasePanel :panelNum="1" @click="action1()" />
      <BasePanel :panelNum="2" @click="action2()" />
      <BasePanel :panelNum="3" @click="action3()" />
      <BasePanel :panelNum="4" @click="action4()" />
      <BasePanel :panelNum="5" @click="action5()" />
      <BasePanel :panelNum="6" @click="action6()" />
      <BasePanel :panelNum="7" @click="action7()" />
      <BasePanel :panelNum="8" @click="action8()" />
      <BasePanel :panelNum="9" @click="action9()" />
      <BasePanel :panelNum="10" @click="action10()" />
      <BasePanel :panelNum="11" @click="action11()" />
      <BasePanel :panelNum="12" @click="action12()" />
      <BasePanel :panelNum="13" @click="action13()" />
      <BasePanel :panelNum="14" @click="action14()" />
      <BasePanel :panelNum="15" @click="action15()" />
      <BasePanel :panelNum="16" @click="action16()" />
      <BasePanel :panelNum="17" @click="action17()" />
      <BasePanel :panelNum="18" @click="action18()" />
      <BasePanel :panelNum="19" @click="action19()" />
      <BasePanel :panelNum="20" @click="action20()" />
      <BasePanel :panelNum="21" @click="action21()" />
      <BasePanel :panelNum="22" @click="action22()" />
      <BasePanel :panelNum="23" @click="action23()" />
      <BasePanel :panelNum="24" @click="action24()" />
      <BasePanel :panelNum="25" @click="action25()" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BasePanel from '../atoms/BasePanel.vue'

export default defineComponent({
  props: {
    action: Function
  },
  setup (props) {
    // 各パネルの処理
    const action1 = () => {
      if (props.action !== undefined) {
        props.action(1)
      }
    }
    const action2 = () => {
      if (props.action !== undefined) {
        props.action(2)
      }
    }
    const action3 = () => {
      if (props.action !== undefined) {
        props.action(3)
      }
    }
    const action4 = () => {
      if (props.action !== undefined) {
        props.action(4)
      }
    }
    const action5 = () => {
      if (props.action !== undefined) {
        props.action(5)
      }
    }
    const action6 = () => {
      if (props.action !== undefined) {
        props.action(6)
      }
    }
    const action7 = () => {
      if (props.action !== undefined) {
        props.action(7)
      }
    }
    const action8 = () => {
      if (props.action !== undefined) {
        props.action(8)
      }
    }
    const action9 = () => {
      if (props.action !== undefined) {
        props.action(9)
      }
    }
    const action10 = () => {
      if (props.action !== undefined) {
        props.action(10)
      }
    }
    const action11 = () => {
      if (props.action !== undefined) {
        props.action(11)
      }
    }
    const action12 = () => {
      if (props.action !== undefined) {
        props.action(12)
      }
    }
    const action13 = () => {
      if (props.action !== undefined) {
        props.action(13)
      }
    }
    const action14 = () => {
      if (props.action !== undefined) {
        props.action(14)
      }
    }
    const action15 = () => {
      if (props.action !== undefined) {
        props.action(15)
      }
    }
    const action16 = () => {
      if (props.action !== undefined) {
        props.action(16)
      }
    }
    const action17 = () => {
      if (props.action !== undefined) {
        props.action(17)
      }
    }
    const action18 = () => {
      if (props.action !== undefined) {
        props.action(18)
      }
    }
    const action19 = () => {
      if (props.action !== undefined) {
        props.action(19)
      }
    }
    const action20 = () => {
      if (props.action !== undefined) {
        props.action(20)
      }
    }
    const action21 = () => {
      if (props.action !== undefined) {
        props.action(21)
      }
    }
    const action22 = () => {
      if (props.action !== undefined) {
        props.action(22)
      }
    }
    const action23 = () => {
      if (props.action !== undefined) {
        props.action(23)
      }
    }
    const action24 = () => {
      if (props.action !== undefined) {
        props.action(24)
      }
    }
    const action25 = () => {
      if (props.action !== undefined) {
        props.action(25)
      }
    }
    return {
      action1,
      action2,
      action3,
      action4,
      action5,
      action6,
      action7,
      action8,
      action9,
      action10,
      action11,
      action12,
      action13,
      action14,
      action15,
      action16,
      action17,
      action18,
      action19,
      action20,
      action21,
      action22,
      action23,
      action24,
      action25
    }
  },
  components: { BasePanel }
})
</script>

<style scoped>
.panel {
  display: grid;
  grid-template-columns: 60px 60px 60px 60px 60px;
  gap: 0px;
  justify-content: center;
}

.gray {
  background-color: gray;
}
</style>
