<template>
  <div>
    <button class="choice" :id="color">{{ sheetTotal }}</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, reactive, ref, toRef, watchEffect } from 'vue'
import { Total } from '../modules/types'
import { totalKey } from '../PanelLogic.vue'

export default defineComponent({
  props: {
    strColor: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    // 色の名前を受け取り、色分けする
    const color = toRef(props, 'strColor')
    // 集計を受け取る（デフォルトは全部0とする）
    const panelTotal = inject(totalKey, reactive<Total>({
      redSheet: 0,
      greenSheet: 0,
      whiteSheet: 0,
      blueSheet: 0
    }))
    // 集計表示用変数（文字列:黄色を非表示にするため）
    const sheetTotal = ref<string>('')
    watchEffect(() => {
      switch (color.value) {
        case 'red':
          sheetTotal.value = panelTotal.redSheet.toString()
          break
        case 'green':
          sheetTotal.value = panelTotal.greenSheet.toString()
          break
        case 'white':
          sheetTotal.value = panelTotal.whiteSheet.toString()
          break
        case 'blue':
          sheetTotal.value = panelTotal.blueSheet.toString()
          break
        default:
          break
      }
    })
    return { color, sheetTotal }
  }
})
</script>

<style scoped>
.choice {
  margin: 5px;
  width: 50px;
  height: 50px;
  color: black;
  border-width: 2px;
  border-style: solid;
  border-color: black;
}

#red {
  background-color: red;
}

#green {
  background-color: green;
}

#white {
  background-color: white;
}

#blue {
  background-color: blue;
}

#yellow {
  background-color: yellow;
}

button {
  font-size: 16px;
}
</style>
