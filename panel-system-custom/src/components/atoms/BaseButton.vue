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
    const panelTotal = inject(totalKey, reactive<Total>({
      redSheet: 0,
      greenSheet: 0,
      whiteSheet: 0,
      blueSheet: 0
    }))
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
