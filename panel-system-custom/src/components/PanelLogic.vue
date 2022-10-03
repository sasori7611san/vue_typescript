<template>
  <div>
    <PanelScreen :action="action"/>
    <MessagePlace :str-color-ref="strColorRef" :message-ref="messageRef" :panel-no-ref="panelNoRef" />
    <ChoiceColor :choice-color="choiceColor" />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive, Ref } from 'vue'
import ChoiceColor from './organisms/ChoiceColor.vue'
import PanelScreen from './organisms/PanelScreen.vue'
import MessagePlace from './organisms/MessagePlace.vue'
import { Panel, Total } from './modules/types'
import { COLORS } from './modules/enums'
import { panelCheck } from './modules/panelCheck'
import { colorSet } from './modules/colorSet'
import { upSandCheck, downSandCheck, leftSandCheck, rightSandCheck, leftUpSandCheck, leftDownSandCheck, rightUpSandCheck, rightDownSandCheck } from './modules/sandCheck'
import { panelAggregation } from './modules/panelAggregation'

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
    const messageRef = ref<string>('必ず入力する色を選んでから番号を押してください')
    const panelNoRef = ref<string>('')
    // パネル集計用変数
    const panelTotal = reactive<Total>({
      redSheet: 0,
      greenSheet: 0,
      whiteSheet: 0,
      blueSheet: 0
    })

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
          // パネルに色を設定し、次取れる箇所や枚数を集計
          panelChangeOpe(colorRef.value, verNo, sideNo, panel, colorRef, panelTotal)
          // 挟まったパネルの色を変える
          // 起点の色
          const currentColorNo = panel[verNo][sideNo].colorNo
          // パネル変わるフラグ
          let panelChange = false
          // 色判定（0:灰色、1:黄色は除外）
          if (currentColorNo >= COLORS.RED) {
            // for文用変数
            let i: number
            let j: number
            // パネル変化に要する秒数（ミリ秒単位）
            const time = 800
            // 挟まる枚数
            let sheet = 0
            // 上方向確認
            // 変わるパネルがあるか判定
            panelChange = upSandCheck(panel, panelChange, currentColorNo, verNo, sideNo)
            // panelChangeがtrueならパネルを変える
            if (panelChange) {
              for (i = verNo - 1; i >= 0; i--) {
                if (panel[i][sideNo].colorNo !== currentColorNo && panel[i][sideNo].colorNo > COLORS.YELLOW) {
                  // 枚数を追加
                  sheet++
                  window.setTimeout(panelChangeOpe, time * sheet, currentColorNo, i, sideNo, panel, colorRef, panelTotal)
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
                  // 枚数を追加
                  sheet++
                  window.setTimeout(panelChangeOpe, time * sheet, currentColorNo, i, sideNo, panel, colorRef, panelTotal)
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
                  // 枚数を追加
                  sheet++
                  window.setTimeout(panelChangeOpe, time * sheet, currentColorNo, verNo, i, panel, colorRef, panelTotal)
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
                  // 枚数を追加
                  sheet++
                  window.setTimeout(panelChangeOpe, time * sheet, currentColorNo, verNo, i, panel, colorRef, panelTotal)
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
                  // 枚数を追加
                  sheet++
                  window.setTimeout(panelChangeOpe, time * sheet, currentColorNo, i, j, panel, colorRef, panelTotal)
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
                  // 枚数を追加
                  sheet++
                  window.setTimeout(panelChangeOpe, time * sheet, currentColorNo, i, j, panel, colorRef, panelTotal)
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
                  // 枚数を追加
                  sheet++
                  window.setTimeout(panelChangeOpe, time * sheet, currentColorNo, i, j, panel, colorRef, panelTotal)
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
                  // 枚数を追加
                  sheet++
                  window.setTimeout(panelChangeOpe, time * sheet, currentColorNo, i, j, panel, colorRef, panelTotal)
                } else {
                  break
                }
              }
              panelChange = false
            }
          }
        } else {
          // メッセージ出力（入れないことを表示）
          messageRef.value = '今は取れません'
        }
      }
    }
    // パネル変更動作（col:対象色番号,v:縦番号,s:横番号,pan:パネル,color:使用色番号,total:パネル集計）
    const panelChangeOpe = (col: number, v: number, s: number, pan: Panel[][], color: Ref<number>, total: Total): void => {
      colorSet(col, v, s, pan)
      messageRef.value = panelAggregation(panel, total.redSheet, total.greenSheet, total.whiteSheet, total.blueSheet)
      panelNoRef.value = panelCheck(pan, color)
    }
    return {
      strColorRef,
      messageRef,
      panelNoRef,
      choiceColor,
      action
    }
  },
  components: { ChoiceColor, PanelScreen, MessagePlace }
})
</script>

<style scoped>

</style>
