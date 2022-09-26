<template>
  <div>
    <div>
      <PanelScreenVue :color="color" />
    </div>
    <p>選択中の色：{{ strColorRef }}</p>
    <div class="choice">
      <button id="buttonRed" v-on:click="choiceColor(2)"></button>
      <button id="buttonGreen" v-on:click="choiceColor(3)"></button>
      <button id="buttonWhite" v-on:click="choiceColor(4)"></button>
      <button id="buttonBlue" v-on:click="choiceColor(5)"></button><br />
      <button id="buttonYellow" v-on:click="choiceColor(1)"></button>
    </div>
    <p>更新で最初からに戻ります。</p>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive } from 'vue'
import PanelScreenVue from './PanelScreen.vue'

export default defineComponent({
  components: { PanelScreenVue },
  setup () {
      // 使用色番号保持
      type Color = {
          cNumber: number;
          check: boolean;
      }
      const color: Color = reactive({ cNumber: 0, check: false })
      // 色定数
      enum Colors {
          GRAY,
          YELLOW,
          RED,
          GREEN,
          WHITE,
          BLUE
      }
      // 使用メッセージ
      const strColorRef = ref<string>('')
      // 色選択
      const choiceColor = (num: number): void => {
        if (num !== color.cNumber) {
          switch (num) {
            case 2:
              color.cNumber = Colors.RED
              break
            case 3:
              color.cNumber = Colors.GREEN
              break
            case 4:
              color.cNumber = Colors.WHITE
              break
            case 5:
              color.cNumber = Colors.BLUE
              break
            case 1:
              color.cNumber = Colors.YELLOW
              break
            default:
              color.cNumber = Colors.GRAY
              break
          }
          color.check = false
        } else {
          color.check = true
        }
        currentColor()
      }
      // 選択中の色表示
      const currentColor = (): void => {
        switch (color.cNumber) {
          case Colors.YELLOW:
            strColorRef.value = '黄'
            break
          case Colors.RED:
            strColorRef.value = '赤'
            break
          case Colors.GREEN:
            strColorRef.value = '緑'
            break
          case Colors.WHITE:
            strColorRef.value = '白'
            break
          case Colors.BLUE:
            strColorRef.value = '青'
            break
          default:
            strColorRef.value = '灰'
            break
        }
      }
      return {
        strColorRef,
        color,
        choiceColor
      }
  }
})
</script>

<style scoped>
.panel > button {
  width: 60px;
  height: 60px;
}

.choice > button {
  margin: 5px;
  width: 50px;
  height: 50px;
}

.gray {
  background-color: gray;
}

.red {
  background-color: red;
}

.green {
  background-color: green;
}

.white {
  background-color: white;
}

.blue {
  background-color: blue;
}

.yellow {
  background-color: yellow;
}

#buttonRed {
  background-color: red;
}

#buttonGreen {
  background-color: green;
}

#buttonWhite {
  background-color: white;
}

#buttonBlue {
  background-color: blue;
}

#buttonYellow {
  background-color: yellow;
}
</style>
