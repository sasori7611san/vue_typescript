<template>
  <div>
    <PanelScreen :action="action"/>
    <MessagePlace :str-color-ref="strColorRef" :message-ref="messageRef" :panel-no-ref="panelNoRef" />
    <ChoiceColor :choice-color="choiceColor" />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive, Ref, provide, InjectionKey, watch } from 'vue'
import ChoiceColor from './organisms/ChoiceColor.vue'
import PanelScreen from './organisms/PanelScreen.vue'
import MessagePlace from './organisms/MessagePlace.vue'
import { Panel, Total } from './modules/types'
import { COLORS } from './modules/enums'
import { panelCheck } from './modules/panelCheck'
import { colorSet } from './modules/colorSet'
import { upSandCheck, downSandCheck, leftSandCheck, rightSandCheck, leftUpSandCheck, leftDownSandCheck, rightUpSandCheck, rightDownSandCheck } from './modules/sandCheck'
import { upPanelChenge, downPanelChenge, leftPanelChenge, rightPanelChenge, leftUpPanelChenge, leftDownPanelChenge, rightUpPanelChenge, rightDownPanelChenge } from './modules/panelChangeExec'
import { panelAggregation } from './modules/panelAggregation'

// InjectionKeyの作成
export const totalKey: InjectionKey<Total> = Symbol('total')

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
      // 取れるパネルを確認
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
            // パネル変化に要する秒数（ミリ秒単位）
            const time = 800
            // 挟まる枚数
            let sheet = 0
            // 上方向確認。変わるパネルがあるか判定
            panelChange = upSandCheck(panel, panelChange, currentColorNo, verNo, sideNo)
            // panelChangeがtrueならパネルを変える
            if (panelChange) {
              // パネル更新
              sheet = upPanelChenge(currentColorNo, verNo, sideNo, panel, colorRef, panelTotal, sheet)
              panelChange = false
            }
            // 下方向確認。変わるパネルがあるか判定
            panelChange = downSandCheck(panel, panelChange, currentColorNo, verNo, sideNo)
            // panelChangeがtrueならパネルを変える
            if (panelChange) {
              // パネル更新
              sheet = downPanelChenge(currentColorNo, verNo, sideNo, panel, colorRef, panelTotal, sheet)
              panelChange = false
            }
            // 左方向確認。変わるパネルがあるか判定
            panelChange = leftSandCheck(panel, panelChange, currentColorNo, verNo, sideNo)
            // panelChangeがtrueならパネルを変える
            if (panelChange) {
              // パネル更新
              sheet = leftPanelChenge(currentColorNo, verNo, sideNo, panel, colorRef, panelTotal, sheet)
              panelChange = false
            }
            // 右方向確認。変わるパネルがあるか判定
            panelChange = rightSandCheck(panel, panelChange, currentColorNo, verNo, sideNo)
            // panelChangeがtrueならパネルを変える
            if (panelChange) {
              // パネル更新
              sheet = rightPanelChenge(currentColorNo, verNo, sideNo, panel, colorRef, panelTotal, sheet)
              panelChange = false
            }
            // 左斜め上方向確認。変わるパネルがあるか判定
            panelChange = leftUpSandCheck(panel, panelChange, currentColorNo, verNo, sideNo)
            // panelChangeがtrueならパネルを変える
            if (panelChange) {
              // パネル更新
              sheet = leftUpPanelChenge(currentColorNo, verNo, sideNo, panel, colorRef, panelTotal, sheet)
              panelChange = false
            }
            // 左斜め下方向確認。変わるパネルがあるか判定
            panelChange = leftDownSandCheck(panel, panelChange, currentColorNo, verNo, sideNo)
            // panelChangeがtrueならパネルを変える
            if (panelChange) {
              // パネル更新
              sheet = leftDownPanelChenge(currentColorNo, verNo, sideNo, panel, colorRef, panelTotal, sheet)
              panelChange = false
            }
            // 右斜め上方向確認。変わるパネルがあるか判定
            panelChange = rightUpSandCheck(panel, panelChange, currentColorNo, verNo, sideNo)
            // panelChangeがtrueならパネルを変える
            if (panelChange) {
            // パネル更新
              sheet = rightUpPanelChenge(currentColorNo, verNo, sideNo, panel, colorRef, panelTotal, sheet)
              panelChange = false
            }
            // 右斜め下方向確認。変わるパネルがあるか判定
            panelChange = rightDownSandCheck(panel, panelChange, currentColorNo, verNo, sideNo)
            // panelChangeがtrueならパネルを変える
            if (panelChange) {
              // パネル更新
              sheet = rightDownPanelChenge(currentColorNo, verNo, sideNo, panel, colorRef, panelTotal, sheet)
              panelChange = false
            }
            // 取れるパネルを再チェック
            window.setTimeout(panelCheck, time * sheet, panel, colorRef)
          }
          // パネル状況変わるたびに取れるパネルをチェック
          watch(panelTotal, () => {
            panelNoRef.value = panelCheck(panel, colorRef)
          })
          // messageRef.value = '必ず入力する色を選んでから番号を押してください'
          messageRef.value = ''
        } else {
          // メッセージ出力（入れないことを表示）
          messageRef.value = '今は取れません'
        }
      }
    }
    // パネル変更動作（col:対象色番号,v:縦番号,s:横番号,pan:パネル,color:使用色番号,total:パネル集計）
    const panelChangeOpe = (col: number, v: number, s: number, pan: Panel[][], color: Ref<number>, total: Total): void => {
      colorSet(col, v, s, pan)
      panelAggregation(pan, total)
      panelNoRef.value = panelCheck(pan, color)
    }
    // パネルの集計値を渡す
    provide(totalKey, panelTotal)
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
