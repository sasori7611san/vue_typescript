<template>
  <div>
    <PanelScreen :action="action"/>
    <MessagePlace :str-color-ref="strColorRef" :warning-ref="warningRef" :panel-no-ref="panelNoRef" />
    <ChoiceColor :choice-color="choiceColor" :red-count-ref="redCountRef" :green-count-ref="greenCountRef" :white-count-ref="whiteCountRef" :blueCountRef="blueCountRef" />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import ChoiceColor from './organisms/ChoiceColor.vue'
import PanelScreen from './organisms/PanelScreen.vue'
import MessagePlace from './organisms/MessagePlace.vue'
import { Panel } from './modules/types'
import { COLORS } from './modules/enums'
import { panelCheck } from './modules/panelCheck'
import { getStrNo } from './modules/getStrNo'
import { upSandCheck, downSandCheck, leftSandCheck, rightSandCheck, leftUpSandCheck, leftDownSandCheck, rightUpSandCheck, rightDownSandCheck } from './modules/sandCheck'

export default defineComponent({
  setup () {
    // 使用色番号
    const colorRef = ref<number>(0)
    // パネルの初期化、colorNo = -1は枠、0はパネル（灰色）
    const panel: Panel[][] = [
      [
        { colorNo: -1, check: false, condition: 9 },
        { colorNo: -1, check: false, condition: 9 },
        { colorNo: -1, check: false, condition: 9 },
        { colorNo: -1, check: false, condition: 9 },
        { colorNo: -1, check: false, condition: 9 },
        { colorNo: -1, check: false, condition: 9 },
        { colorNo: -1, check: false, condition: 9 }
      ],
      [
        { colorNo: -1, check: false, condition: 9 },
        { colorNo: 0, check: false, condition: 9 },
        { colorNo: 0, check: false, condition: 9 },
        { colorNo: 0, check: false, condition: 9 },
        { colorNo: 0, check: false, condition: 9 },
        { colorNo: 0, check: false, condition: 9 },
        { colorNo: -1, check: false, condition: 9 }
      ],
      [
        { colorNo: -1, check: false, condition: 9 },
        { colorNo: 0, check: false, condition: 9 },
        { colorNo: 0, check: false, condition: 9 },
        { colorNo: 0, check: false, condition: 9 },
        { colorNo: 0, check: false, condition: 9 },
        { colorNo: 0, check: false, condition: 9 },
        { colorNo: -1, check: false, condition: 9 }
      ],
      [
        { colorNo: -1, check: false, condition: 9 },
        { colorNo: 0, check: false, condition: 9 },
        { colorNo: 0, check: false, condition: 9 },
        { colorNo: 0, check: false, condition: 9 },
        { colorNo: 0, check: false, condition: 9 },
        { colorNo: 0, check: false, condition: 9 },
        { colorNo: -1, check: false, condition: 9 }
      ],
      [
        { colorNo: -1, check: false, condition: 9 },
        { colorNo: 0, check: false, condition: 9 },
        { colorNo: 0, check: false, condition: 9 },
        { colorNo: 0, check: false, condition: 9 },
        { colorNo: 0, check: false, condition: 9 },
        { colorNo: 0, check: false, condition: 9 },
        { colorNo: -1, check: false, condition: 9 }
      ],
      [
        { colorNo: -1, check: false, condition: 9 },
        { colorNo: 0, check: false, condition: 9 },
        { colorNo: 0, check: false, condition: 9 },
        { colorNo: 0, check: false, condition: 9 },
        { colorNo: 0, check: false, condition: 9 },
        { colorNo: 0, check: false, condition: 9 },
        { colorNo: -1, check: false, condition: 9 }
      ],
      [
        { colorNo: -1, check: false, condition: 9 },
        { colorNo: -1, check: false, condition: 9 },
        { colorNo: -1, check: false, condition: 9 },
        { colorNo: -1, check: false, condition: 9 },
        { colorNo: -1, check: false, condition: 9 },
        { colorNo: -1, check: false, condition: 9 },
        { colorNo: -1, check: false, condition: 9 }
      ]
    ]
    // 使用メッセージ
    const strColorRef = ref<string>('')
    const warningRef = ref<string>('必ず入力する色を選んでから番号を押してください')
    const panelNoRef = ref<string>('')
    // パネル集計用変数
    const redCountRef = ref<number>(0)
    const greenCountRef = ref<number>(0)
    const whiteCountRef = ref<number>(0)
    const blueCountRef = ref<number>(0)
    // 色の選択・表示用変数へ代入（num:色番号）
    const choiceColor = (num: number): void => {
      switch (num) {
        case 2:
          colorRef.value = COLORS.RED
          strColorRef.value = '赤'
          break
        case 3:
          colorRef.value = COLORS.GREEN
          strColorRef.value = '緑'
          break
        case 4:
          colorRef.value = COLORS.WHITE
          strColorRef.value = '白'
          break
        case 5:
          colorRef.value = COLORS.BLUE
          strColorRef.value = '青'
          break
        case 1:
          colorRef.value = COLORS.YELLOW
          strColorRef.value = '黄'
          break
        default:
          colorRef.value = COLORS.GRAY
          strColorRef.value = '灰'
          break
      }
      panelNoRef.value = panelCheck(panel, colorRef)
    }
    // パネル取得（num:パネル番号）
    const action = (num: number): void => {
      // 縦要素番号
      let verNo = 0
      // 横要素番号
      let sideNo = 0
      // ロジック
      if (num <= 25 && num > 0) {
        // 取得配列要素取得
        Math.floor(num / 5) < 5 && num % 5 !== 0 ? verNo = Math.floor(num / 5) + 1 : verNo = Math.floor(num / 5)
        num % 5 === 0 ? sideNo = 5 : sideNo = num % 5
        if (panel[verNo][sideNo].check) {
          // パネルに色を設定
          colorSet(colorRef.value, verNo, sideNo)
          // 挟まったパネルの色を変える
          // 起点の色
          const currentColorNo = panel[verNo][sideNo].colorNo
          // パネル変わるフラグ
          let panelChange = false
          // 色判定（0:灰色、1:黄色は除外）
          if (currentColorNo >= COLORS.RED) {
            // for文用変数
            let i
            let j
            // 上方向確認
            // 変わるパネルがあるか判定
            panelChange = upSandCheck(panel, panelChange, currentColorNo, verNo, sideNo)
            // panelChangeがtrueならパネルを変える
            if (panelChange) {
              for (i = verNo - 1; i >= 0; i--) {
                if (panel[i][sideNo].colorNo !== currentColorNo && panel[i][sideNo].colorNo > COLORS.YELLOW) {
                  colorSet(currentColorNo, i, sideNo)
                } else {
                  break
                }
              }
              panelChange = false
            }
            // 下方向確認
            // 変わるパネルがあるか判定
            panelChange = downSandCheck(panel, panelChange, currentColorNo, verNo, sideNo)
            // panelChangeがtrueならパネルを変える
            if (panelChange) {
              for (i = verNo + 1; i <= 6; i++) {
                if (panel[i][sideNo].colorNo !== currentColorNo && panel[i][sideNo].colorNo > COLORS.YELLOW) {
                  colorSet(currentColorNo, i, sideNo)
                } else {
                  break
                }
              }
              panelChange = false
            }
            // 左方向確認
            // 変わるパネルがあるか判定
            panelChange = leftSandCheck(panel, panelChange, currentColorNo, verNo, sideNo)
            // panelChangeがtrueならパネルを変える
            if (panelChange) {
              for (i = sideNo - 1; i >= 0; i--) {
                if (panel[verNo][i].colorNo !== currentColorNo && panel[verNo][i].colorNo > COLORS.YELLOW) {
                  colorSet(currentColorNo, verNo, i)
                } else {
                  break
                }
              }
              panelChange = false
            }
            // 右方向確認
            // 変わるパネルがあるか判定
            panelChange = rightSandCheck(panel, panelChange, currentColorNo, verNo, sideNo)
            // panelChangeがtrueならパネルを変える
            if (panelChange) {
              for (i = sideNo + 1; i <= 6; i++) {
                if (panel[verNo][i].colorNo !== currentColorNo && panel[verNo][i].colorNo > COLORS.YELLOW) {
                  colorSet(currentColorNo, verNo, i)
                } else {
                  break
                }
              }
              panelChange = false
            }
            // 左斜め上方向確認
            // 変わるパネルがあるか判定
            panelChange = leftUpSandCheck(panel, panelChange, currentColorNo, verNo, sideNo)
            // panelChangeがtrueならパネルを変える
            if (panelChange) {
              for (i = verNo - 1, j = sideNo - 1; i >= 0 || j >= 0; i--, j--) {
                if (panel[i][j].colorNo !== currentColorNo && panel[i][j].colorNo > COLORS.YELLOW) {
                  colorSet(currentColorNo, i, j)
                } else {
                  break
                }
              }
              panelChange = false
            }
            // 左斜め下方向確認
            // 変わるパネルがあるか判定
            panelChange = leftDownSandCheck(panel, panelChange, currentColorNo, verNo, sideNo)
            // panelChangeがtrueならパネルを変える
            if (panelChange) {
              for (i = verNo + 1, j = sideNo - 1; i <= 6 || j >= 0; i++, j--) {
                if (panel[i][j].colorNo !== currentColorNo && panel[i][j].colorNo > COLORS.YELLOW) {
                  colorSet(currentColorNo, i, j)
                } else {
                  break
                }
              }
              panelChange = false
            }
            // 右斜め上方向確認
            // 変わるパネルがあるか判定
            panelChange = rightUpSandCheck(panel, panelChange, currentColorNo, verNo, sideNo)
            // panelChangeがtrueならパネルを変える
            if (panelChange) {
              for (i = verNo - 1, j = sideNo + 1; i >= 0 || j <= 6; i--, j++) {
                if (panel[i][j].colorNo !== currentColorNo && panel[i][j].colorNo > COLORS.YELLOW) {
                  colorSet(currentColorNo, i, j)
                } else {
                  break
                }
              }
              panelChange = false
            }
            // 右斜め下方向確認
            // 変わるパネルがあるか判定
            panelChange = rightDownSandCheck(panel, panelChange, currentColorNo, verNo, sideNo)
            // panelChangeがtrueならパネルを変える
            if (panelChange) {
              for (i = verNo + 1, j = sideNo + 1; i <= 6 || j <= 6; i++, j++) {
                if (panel[i][j].colorNo !== currentColorNo && panel[i][j].colorNo > COLORS.YELLOW) {
                  colorSet(currentColorNo, i, j)
                } else {
                  break
                }
              }
              panelChange = false
            }
          }
          // 各色の枚数を集計の為、初期化
          redCountRef.value = 0
          greenCountRef.value = 0
          whiteCountRef.value = 0
          blueCountRef.value = 0
          // for文用変数
          let x
          let y
          // 各色の枚数を集計
          for (x = 0; x <= 6; x++) {
            for (y = 0; y <= 6; y++) {
              switch (panel[x][y].colorNo) {
                case COLORS.RED:
                  redCountRef.value++
                  break
                case COLORS.GREEN:
                  greenCountRef.value++
                  break
                case COLORS.WHITE:
                  whiteCountRef.value++
                  break
                case COLORS.BLUE:
                  blueCountRef.value++
                  break
                default:
                  break
              }
            }
          }
          // 警告文（必ず色のボタンを押してから番号を押すように促す）
          panelNoRef.value = panelCheck(panel, colorRef)
          // warningRef.value = '必ず入力する色を選んでから番号を押してください'
          warningRef.value = `赤：${redCountRef.value}枚、緑：${greenCountRef.value}枚、白：${whiteCountRef.value}枚、青：${blueCountRef.value}枚`
        } else {
          // 警告文（入れないことを表示）
          warningRef.value = '今は取れません'
        }
      }
    }
    // パネル色の設定（col:色番号,v:縦番号,s:横番号）
    const colorSet = (col: number, v: number, s: number): void => {
      // idを文字列に変換
      const strId = getStrNo(v, s)
      // パネルに色を反映
      const elem = document.getElementById(strId)
      if (elem !== null) {
        switch (col) {
          case 1:
            panel[v][s].colorNo = COLORS.YELLOW
            elem.style.backgroundColor = 'yellow'
            break
          case 2:
            panel[v][s].colorNo = COLORS.RED
            elem.style.backgroundColor = 'red'
            break
          case 3:
            panel[v][s].colorNo = COLORS.GREEN
            elem.style.backgroundColor = 'green'
            break
          case 4:
            panel[v][s].colorNo = COLORS.WHITE
            elem.style.backgroundColor = 'white'
            break
          case 5:
            panel[v][s].colorNo = COLORS.BLUE
            elem.style.backgroundColor = 'blue'
            break
          default:
            panel[v][s].colorNo = COLORS.GRAY
            elem.style.backgroundColor = 'gray'
            break
        }
      }
    }
    return {
      strColorRef,
      warningRef,
      panelNoRef,
      redCountRef,
      greenCountRef,
      whiteCountRef,
      blueCountRef,
      choiceColor,
      action
    }
  },
  components: { ChoiceColor, PanelScreen, MessagePlace }
})
</script>

<style scoped>

</style>
