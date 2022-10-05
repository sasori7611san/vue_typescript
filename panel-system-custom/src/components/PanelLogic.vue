<template>
  <div>
    <PanelScreen :action="action"/>
    <MessagePlace :str-color-ref="strColorRef" :message-ref="messageRef" :panel-no-ref="panelNoRef" />
    <ChoiceColor :choice-color="choiceColor" />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive, provide, InjectionKey, watch } from 'vue'
import ChoiceColor from './organisms/ChoiceColor.vue'
import PanelScreen from './organisms/PanelScreen.vue'
import MessagePlace from './organisms/MessagePlace.vue'
import { ColorType, Panel, Total } from './modules/types'
import { COLORS } from './modules/enums'
import { panelCheck } from './modules/panelCheck'
import { upSandCheck, downSandCheck, leftSandCheck, rightSandCheck, leftUpSandCheck, leftDownSandCheck, rightUpSandCheck, rightDownSandCheck } from './modules/sandCheck'
import { upPanelChenge, downPanelChenge, leftPanelChenge, rightPanelChenge, leftUpPanelChenge, leftDownPanelChenge, rightUpPanelChenge, rightDownPanelChenge, panelChangeExec } from './modules/panelChangeExec'
import { choiceColorSet } from './modules/choiceColorSet'

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
    // パネル集計用変数
    let colorType: ColorType = {
      colorNum: 0,
      colorStr: '灰'
    }

    // 色の選択・表示用変数へ代入（num:色番号）
    const choiceColor = (num: number): void => {
      // 色の選択を反映
      colorType = choiceColorSet(num)
      colorRef.value = colorType.colorNum
      strColorRef.value = colorType.colorStr
      // 取れるパネルを確認
      panelNoRef.value = panelCheck(panel, colorRef)
    }
    // パネル取得（num:パネル番号）
    const action = (num: number): void => {
      // 縦要素番号
      let verNo = 0
      // 横要素番号
      let sideNo = 0
      // パネル取得ロジック
      if (num <= 25 && num > 0) {
        // 取得配列要素取得
        Math.floor(num / 5) < 5 && num % 5 !== 0 ? verNo = Math.floor(num / 5) + 1 : verNo = Math.floor(num / 5)
        num % 5 === 0 ? sideNo = 5 : sideNo = num % 5
        if (panel[verNo][sideNo].check) {
          // パネルに色を設定し、次取れる箇所や枚数を集計
          panelChangeExec(colorRef.value, verNo, sideNo, panel, panelTotal)
          panelNoRef.value = panelCheck(panel, colorRef)
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
            // パネル更新（各方向で確認）
            // 1.変わるパネルがあるか判定し、あるならpanelChangeをtrueにする
            // 2.panelChangeがtrueならパネル更新する
            // 上方向確認
            panelChange = upSandCheck(panel, panelChange, currentColorNo, verNo, sideNo)
            if (panelChange) {
              sheet = upPanelChenge(currentColorNo, verNo, sideNo, panel, panelTotal, sheet)
              panelChange = false
            }
            // 下方向確認
            panelChange = downSandCheck(panel, panelChange, currentColorNo, verNo, sideNo)
            if (panelChange) {
              sheet = downPanelChenge(currentColorNo, verNo, sideNo, panel, panelTotal, sheet)
              panelChange = false
            }
            // 左方向確認
            panelChange = leftSandCheck(panel, panelChange, currentColorNo, verNo, sideNo)
            if (panelChange) {
              sheet = leftPanelChenge(currentColorNo, verNo, sideNo, panel, panelTotal, sheet)
              panelChange = false
            }
            // 右方向確認
            panelChange = rightSandCheck(panel, panelChange, currentColorNo, verNo, sideNo)
            if (panelChange) {
              sheet = rightPanelChenge(currentColorNo, verNo, sideNo, panel, panelTotal, sheet)
              panelChange = false
            }
            // 左斜め上方向確認
            panelChange = leftUpSandCheck(panel, panelChange, currentColorNo, verNo, sideNo)
            if (panelChange) {
              sheet = leftUpPanelChenge(currentColorNo, verNo, sideNo, panel, panelTotal, sheet)
              panelChange = false
            }
            // 左斜め下方向確認
            panelChange = leftDownSandCheck(panel, panelChange, currentColorNo, verNo, sideNo)
            if (panelChange) {
              sheet = leftDownPanelChenge(currentColorNo, verNo, sideNo, panel, panelTotal, sheet)
              panelChange = false
            }
            // 右斜め上方向確認
            panelChange = rightUpSandCheck(panel, panelChange, currentColorNo, verNo, sideNo)
            if (panelChange) {
              sheet = rightUpPanelChenge(currentColorNo, verNo, sideNo, panel, panelTotal, sheet)
              panelChange = false
            }
            // 右斜め下方向確認
            panelChange = rightDownSandCheck(panel, panelChange, currentColorNo, verNo, sideNo)
            if (panelChange) {
              sheet = rightDownPanelChenge(currentColorNo, verNo, sideNo, panel, panelTotal, sheet)
              panelChange = false
            }
            // 取れるパネルを再チェック
            window.setTimeout(panelCheck, time * sheet, panel, colorRef)
          }
          // パネル状況変わるたびに取れるパネルをチェック
          watch(panelTotal, () => {
            panelNoRef.value = panelCheck(panel, colorRef)
          })
          messageRef.value = ''
        } else {
          // メッセージ出力（入れないことを表示）
          messageRef.value = '今は取れません'
        }
      }
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
