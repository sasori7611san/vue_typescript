<template>
  <div>
    <PanelScreen :action="action"/>
    <MessagePlace :str-color-ref="strColorRef" :warning-ref="warningRef" :panel-no-ref="panelNoRef" />
    <ChoiceColor :choiceColor="choiceColor" :red-count-ref="redCountRef" :green-count-ref="greenCountRef" :white-count-ref="whiteCountRef" :blueCountRef="blueCountRef" />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import ChoiceColor from './ChoiceColor.vue'
import PanelScreen from './PanelScreen.vue'
import MessagePlace from './MessagePlace.vue'

export default defineComponent({
  setup () {
    // 使用色番号
    const colorRef = ref<number>(0)
    // Panel型の定義
    type Panel = {
      colorNo: number;
      check: boolean;
      condition: number;
    };
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
    // 色の定数
    enum COLORS {
      GRAY,
      YELLOW,
      RED,
      GREEN,
      WHITE,
      BLUE
    }
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
      // 取得可能な番号を格納する配列
      const canGetPanelNo = []
      // 処理に使用するfor文用変数
      let m = 0
      let n = 0
      // チェック箇所の初期化
      for (m = 0; m <= 6; m++) {
        for (n = 0; n <= 6; n++) {
          panel[m][n].check = false
        }
      }
      // 黄色が入れる箇所を抽出
      if (colorRef.value === COLORS.YELLOW) {
        for (m = 0; m <= 6; m++) {
          for (n = 0; n <= 6; n++) {
            // 赤、緑、白、青のいずれかなら入れる様にチェックし、取得可能な番号として格納
            if (panel[m][n].colorNo >= COLORS.RED) {
              panel[m][n].check = true
            }
            if (panel[m][n].check) {
              canGetPanelNo.push(getStrNo(m, n))
            }
          }
        }
      } else {
        // 他の色のチェック
        // 最小条件番号（1:挟める場所及び、最初の13番,2:1以外で次挟める場所,3:1,2以外で赤、緑、白、青と隣接している場所,9:入れない場所）
        let minCondNum = 9
        // 条件の初期化
        for (m = 0; m <= 6; m++) {
          for (n = 0; n <= 6; n++) {
            panel[m][n].condition = 9
          }
        }
        // 条件確認ロジック
        for (m = 0; m <= 6; m++) {
          for (n = 0; n <= 6; n++) {
            // 条件を判定（灰色か黄色（空いているパネル）で、条件番号を判定し、最小条件番号を取得）
            if (panel[m][n].colorNo === COLORS.GRAY || panel[m][n].colorNo === COLORS.YELLOW) {
              panel[m][n].condition = canGetPanelCheck(m, n)
            }
            if (panel[m][n].condition < minCondNum) {
              minCondNum = panel[m][n].condition
            }
          }
        }
        // 入れる箇所を抽出
        for (m = 0; m <= 6; m++) {
          for (n = 0; n <= 6; n++) {
            // 最小条件番号と一致する番号を入れる場所としてチェックし、取得可能な番号として格納
            if (panel[m][n].condition === minCondNum) {
              panel[m][n].check = true
            }
            if (panel[m][n].check) {
              canGetPanelNo.push(getStrNo(m, n))
            }
          }
        }
      }
      // 入れる番号を出力用変数に代入する
      panelNoRef.value = canGetPanelNo.join(',')
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
            panelChange = upSandCheck(panelChange, currentColorNo, verNo, sideNo)
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
            panelChange = downSandCheck(panelChange, currentColorNo, verNo, sideNo)
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
            panelChange = leftSandCheck(panelChange, currentColorNo, verNo, sideNo)
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
            panelChange = rightSandCheck(panelChange, currentColorNo, verNo, sideNo)
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
            panelChange = leftUpSandCheck(panelChange, currentColorNo, verNo, sideNo)
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
            panelChange = leftDownSandCheck(panelChange, currentColorNo, verNo, sideNo)
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
            panelChange = rightUpSandCheck(panelChange, currentColorNo, verNo, sideNo)
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
            panelChange = rightDownSandCheck(panelChange, currentColorNo, verNo, sideNo)
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
          warningRef.value = '必ず入力する色を選んでから番号を押してください'
        } else {
          // 警告文（入れないことを表示）
          warningRef.value = '今は取れません'
        }
      }
    }
    // パネル色の設定（cn:色番号,v:縦番号,s:横番号）
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
    // 縦横各番号からパネル番号を算出し文字列に変換（v:縦番号,s:横番号）
    const getStrNo = (v: number, s: number): string => {
      let panelNum = 0
      panelNum = (v - 1) * 5 + s
      return panelNum.toString()
    }
    // 取得可能か確認する関数（v:縦番号,s:横番号）
    const canGetPanelCheck = (v: number, s: number): number => {
      // 条件番号（1:挟める箇所,2:次挟める箇所,3:自分や他人と隣接している箇所,9:それ以外）
      let condNum = 9
      // 最初の判定フラグ（13番以外入れないようにする為）
      let beginLock = false
      // 挟める箇所フラグ
      const sandPanel = false
      // 最初は配列[3][3]（13番）のみ条件番号1を設定
      if (panel[3][3].colorNo === COLORS.GRAY) {
        beginLock = true
        if (v === 3 && s === 3) {
          condNum = 1
          beginLock = false
        }
      }
      // 挟める箇所か（該当すれば条件番号1を設定）
      if (condNum === 9 && upSandCheck(sandPanel, colorRef.value, v, s)) {
        condNum = 1
      } else if (condNum !== 1 && downSandCheck(sandPanel, colorRef.value, v, s)) {
        condNum = 1
      } else if (condNum !== 1 && leftSandCheck(sandPanel, colorRef.value, v, s)) {
        condNum = 1
      } else if (condNum !== 1 && rightSandCheck(sandPanel, colorRef.value, v, s)) {
        condNum = 1
      } else if (condNum !== 1 && leftUpSandCheck(sandPanel, colorRef.value, v, s)) {
        condNum = 1
      } else if (condNum !== 1 && leftDownSandCheck(sandPanel, colorRef.value, v, s)) {
        condNum = 1
      } else if (condNum !== 1 && rightUpSandCheck(sandPanel, colorRef.value, v, s)) {
        condNum = 1
      } else if (condNum !== 1 && rightDownSandCheck(sandPanel, colorRef.value, v, s)) {
        condNum = 1
      }
      // 次挟める箇所か、各方向で確認する（既に条件番号1がある時、又は、最初の場合は行わない）
      // 1.自分のパネルと空いているパネルや枠（colorNo = -1）以外なら挟む対象フラグを立てる
      // 2.空いているパネルで挟む対象フラグがtrueなら次挟める箇所となるので条件番号2を設定してその方向の確認を抜ける
      // 3.それ以外は何もせずその方向の確認を抜ける
      // 確認用for文用変数
      let a
      let b
      if (condNum !== 1 && !beginLock) {
        // 挟む対象フラグ
        let isSandTarget = false
        // 上方向確認
        for (a = v - 1; a >= 0; a--) {
          if (panel[a][s].colorNo !== colorRef.value && panel[a][s].colorNo > COLORS.YELLOW) {
            isSandTarget = true
          } else if (panel[a][s].colorNo === COLORS.GRAY || panel[a][s].colorNo === COLORS.YELLOW) {
            if (isSandTarget) {
              condNum = 2
            }
            break
          } else {
            break
          }
        }
        // 下方向確認
        if (condNum > 2) {
          let isSandTarget = false
          for (a = v + 1; a <= 6; a++) {
            if (panel[a][s].colorNo !== colorRef.value && panel[a][s].colorNo > COLORS.YELLOW) {
              isSandTarget = true
            } else if (panel[a][s].colorNo === COLORS.GRAY || panel[a][s].colorNo === COLORS.YELLOW) {
              if (isSandTarget) {
                condNum = 2
              }
              break
            } else {
              break
            }
          }
        }
        // 左方向確認
        if (condNum > 2) {
          let isSandTarget = false
          for (a = s - 1; a >= 0; a--) {
            if (panel[v][a].colorNo !== colorRef.value && panel[v][a].colorNo > COLORS.YELLOW) {
              isSandTarget = true
            } else if (panel[v][a].colorNo === COLORS.GRAY || panel[v][a].colorNo === COLORS.YELLOW) {
              if (isSandTarget) {
                condNum = 2
              }
              break
            } else {
              break
            }
          }
        }
        // 右方向確認
        if (condNum > 2) {
          let isSandTarget = false
          for (a = s + 1; a <= 6; a++) {
            if (panel[v][a].colorNo !== colorRef.value && panel[v][a].colorNo > COLORS.YELLOW) {
              isSandTarget = true
            } else if (panel[v][a].colorNo === COLORS.GRAY || panel[v][a].colorNo === COLORS.YELLOW) {
              if (isSandTarget) {
                condNum = 2
              }
              break
            } else {
              break
            }
          }
        }
        // 左斜め上方向確認
        if (condNum > 2) {
          let isSandTarget = false
          for (a = v - 1, b = s - 1; a >= 0 || b >= 0; a--, b--) {
            if (panel[a][b].colorNo !== colorRef.value && panel[a][b].colorNo > COLORS.YELLOW) {
              isSandTarget = true
            } else if (panel[a][b].colorNo === COLORS.GRAY || panel[a][b].colorNo === COLORS.YELLOW) {
              if (isSandTarget) {
                condNum = 2
              }
              break
            } else {
              break
            }
          }
        }
        // 左斜め下方向確認
        if (condNum > 2) {
          let isSandTarget = false
          for (a = v + 1, b = s - 1; a <= 6 || b >= 0; a++, b--) {
            if (panel[a][b].colorNo !== colorRef.value && panel[a][b].colorNo > COLORS.YELLOW) {
              isSandTarget = true
            } else if (panel[a][b].colorNo === COLORS.GRAY || panel[a][b].colorNo === COLORS.YELLOW) {
              if (isSandTarget) {
                condNum = 2
              }
              break
            } else {
              break
            }
          }
        }
        // 右斜め上方向確認
        if (condNum > 2) {
          let isSandTarget = false
          for (a = v - 1, b = s + 1; a >= 0 || b <= 6; a--, b++) {
            if (panel[a][b].colorNo !== colorRef.value && panel[a][b].colorNo > COLORS.YELLOW) {
              isSandTarget = true
            } else if (panel[a][b].colorNo === COLORS.GRAY || panel[a][b].colorNo === COLORS.YELLOW) {
              if (isSandTarget) {
                condNum = 2
              }
              break
            } else {
              break
            }
          }
        }
        // 右斜め下方向確認
        if (condNum > 2) {
          let isSandTarget = false
          for (a = v + 1, b = s + 1; a <= 6 || b <= 6; a++, b++) {
            if (panel[a][b].colorNo !== colorRef.value && panel[a][b].colorNo > COLORS.YELLOW) {
              isSandTarget = true
            } else if (panel[a][b].colorNo === COLORS.GRAY || panel[a][b].colorNo === COLORS.YELLOW) {
              if (isSandTarget) {
                condNum = 2
              }
              break
            } else {
              break
            }
          }
        }
      }
      // 誰かのパネルに隣接しているか確認（あれば条件番号3を設定）
      if (condNum > 2) {
        if (panel[v - 1][s].colorNo >= COLORS.RED || panel[v + 1][s].colorNo >= COLORS.RED) {
          condNum = 3
        } else if (panel[v][s - 1].colorNo >= COLORS.RED || panel[v][s + 1].colorNo >= COLORS.RED) {
          condNum = 3
        } else if (panel[v - 1][s - 1].colorNo >= COLORS.RED || panel[v + 1][s - 1].colorNo >= COLORS.RED) {
          condNum = 3
        } else if (panel[v - 1][s + 1].colorNo >= COLORS.RED || panel[v + 1][s + 1].colorNo >= COLORS.RED) {
          condNum = 3
        }
      }
      return condNum
    }
    // ここからの関数は以下の動作を行う
    // 1.自分のパネルと空いているパネルや枠（colorNo = -1）以外なら使用フラグを立てる
    // 2.空いているパネルや枠の場合使用フラグを降し、確認を抜ける
    // 3.それ以外は何もせず確認を抜ける
    // 4.使用フラグを戻り値として返す
    // 挟めるか確認（上方向）（flag:使用フラグ,cn:色番号,v:縦番号,s:横番号）
    const upSandCheck = (flag: boolean, cn: number, v: number, s: number): boolean => {
      // 確認for文用変数
      let i
      for (i = v - 1; i >= 0; i--) {
        if (panel[i][s].colorNo !== cn && panel[i][s].colorNo > COLORS.YELLOW) {
          flag = true
        } else if (panel[i][s].colorNo <= COLORS.YELLOW) {
          flag = false
          break
        } else {
          break
        }
      }
      return flag
    }
    // 挟めるか確認（下方向）（flag:使用フラグ,cn:色番号,v:縦番号,s:横番号）
    const downSandCheck = (flag: boolean, cn: number, v: number, s: number): boolean => {
      // 確認for文用変数
      let i
      for (i = v + 1; i <= 6; i++) {
        if (panel[i][s].colorNo !== cn && panel[i][s].colorNo > COLORS.YELLOW) {
          flag = true
        } else if (panel[i][s].colorNo <= COLORS.YELLOW) {
          flag = false
          break
        } else {
          break
        }
      }
      return flag
    }
    // 挟めるか確認（左方向）（flag:使用フラグ,cn:色番号,v:縦番号,s:横番号）
    const leftSandCheck = (flag: boolean, cn: number, v: number, s: number): boolean => {
      // 確認for文用変数
      let i
      for (i = s - 1; i >= 0; i--) {
        if (panel[v][i].colorNo !== cn && panel[v][i].colorNo > COLORS.YELLOW) {
          flag = true
        } else if (panel[v][i].colorNo <= COLORS.YELLOW) {
          flag = false
          break
        } else {
          break
        }
      }
      return flag
    }
    // 挟めるか確認（右方向）（flag:使用フラグ,cn:色番号,v:縦番号,s:横番号）
    const rightSandCheck = (flag: boolean, cn: number, v: number, s: number): boolean => {
      // 確認for文用変数
      let i
      for (i = s + 1; i <= 6; i++) {
        if (panel[v][i].colorNo !== cn && panel[v][i].colorNo > COLORS.YELLOW) {
          flag = true
        } else if (panel[v][i].colorNo <= COLORS.YELLOW) {
          flag = false
          break
        } else {
          break
        }
      }
      return flag
    }
    // 挟めるか確認（左斜め上方向）（flag:使用フラグ,cn:色番号,v:縦番号,s:横番号）
    const leftUpSandCheck = (flag: boolean, cn: number, v: number, s: number): boolean => {
      // 確認for文用変数
      let i
      let j
      for (i = v - 1, j = s - 1; i >= 0 || j >= 0; i--, j--) {
        if (panel[i][j].colorNo !== cn && panel[i][j].colorNo > COLORS.YELLOW) {
          flag = true
        } else if (panel[i][j].colorNo <= COLORS.YELLOW) {
          flag = false
          break
        } else {
          break
        }
      }
      return flag
    }
    // 挟めるか確認（左斜め下方向）（flag:使用フラグ,cn:色番号,v:縦番号,s:横番号）
    const leftDownSandCheck = (flag: boolean, cn: number, v: number, s: number): boolean => {
      // 確認for文用変数
      let i
      let j
      for (i = v + 1, j = s - 1; i <= 6 || j >= 0; i++, j--) {
        if (panel[i][j].colorNo !== cn && panel[i][j].colorNo > COLORS.YELLOW) {
          flag = true
        } else if (panel[i][j].colorNo <= COLORS.YELLOW) {
          flag = false
          break
        } else {
          break
        }
      }
      return flag
    }
    // 挟めるか確認（右斜め上方向）（flag:使用フラグ,cn:色番号,v:縦番号,s:横番号）
    const rightUpSandCheck = (flag: boolean, cn: number, v: number, s: number): boolean => {
      // 確認for文用変数
      let i
      let j
      for (i = v - 1, j = s + 1; i >= 0 || j <= 6; i--, j++) {
        if (panel[i][j].colorNo !== cn && panel[i][j].colorNo > COLORS.YELLOW) {
          flag = true
        } else if (panel[i][j].colorNo <= COLORS.YELLOW) {
          flag = false
          break
        } else {
          break
        }
      }
      return flag
    }
    // 挟めるか確認（右斜め下方向）（flag:使用フラグ,cn:色番号,v:縦番号,s:横番号）
    const rightDownSandCheck = (flag: boolean, cn: number, v: number, s: number): boolean => {
      // 確認for文用変数
      let i
      let j
      for (i = v + 1, j = s + 1; i <= 6 || j <= 6; i++, j++) {
        if (panel[i][j].colorNo !== cn && panel[i][j].colorNo > COLORS.YELLOW) {
          flag = true
        } else if (panel[i][j].colorNo <= COLORS.YELLOW) {
          flag = false
          break
        } else {
          break
        }
      }
      return flag
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
