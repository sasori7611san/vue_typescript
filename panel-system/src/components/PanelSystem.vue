<template>
    <div>
        <p>{{ message }}</p>
        <div class ="panel">
            <button id="1" class="gray" v-on:click="action(1);">1</button><button id="2" class="gray" v-on:click="action(2);">2</button><button id="3" class="gray" v-on:click="action(3);">3</button><button id="4" class="gray" v-on:click="action(4);">4</button><button id="5" class="gray" v-on:click="action(5);">5</button><br />
            <button id="6" class="gray" v-on:click="action(6);">6</button><button id="7" class="gray" v-on:click="action(7);">7</button><button id="8" class="gray" v-on:click="action(8);">8</button><button id="9" class="gray" v-on:click="action(9);">9</button><button id="10" class="gray" v-on:click="action(10);">10</button><br />
            <button id="11" class="gray" v-on:click="action(11);">11</button><button id="12" class="gray" v-on:click="action(12);">12</button><button id="13" class="gray" v-on:click="action(13);">13</button><button id="14" class="gray" v-on:click="action(14);">14</button><button id="15" class="gray" v-on:click="action(15);">15</button><br />
            <button id="16" class="gray" v-on:click="action(16);">16</button><button id="17" class="gray" v-on:click="action(17);">17</button><button id="18" class="gray" v-on:click="action(18);">18</button><button id="19" class="gray" v-on:click="action(19);">19</button><button id="20" class="gray" v-on:click="action(20);">20</button><br />
            <button id="21" class="gray" v-on:click="action(21);">21</button><button id="22" class="gray" v-on:click="action(22);">22</button><button id="23" class="gray" v-on:click="action(23);">23</button><button id="24" class="gray" v-on:click="action(24);">24</button><button id="25" class="gray" v-on:click="action(25);">25</button><br />
        </div>
        <br />
        {{ warningRef }}
        <p>選択中の色：{{ strColorRef }}</p>
        <p>取れる番号は、{{ panelNoRef }}</p>
        {{ resultRef }}
        <div class="choice">
            <button id="buttonRed" v-on:click="choiceColor(2);"></button>
            <button id="buttonGreen" v-on:click="choiceColor(3);"></button>
            <button id="buttonWhite" v-on:click="choiceColor(4);"></button>
            <button id="buttonBlue" v-on:click="choiceColor(5);"></button><br />
            <button id="buttonYellow" v-on:click="choiceColor(1);"></button>
        </div>
        <p>更新で最初からに戻ります。</p>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  setup () {
    // 使用色番号保持
    let color = 0

    // パネル
    const panels: number[][] = [
      [-1, -1, -1, -1, -1, -1, -1],
      [-1, 0, 0, 0, 0, 0, -1],
      [-1, 0, 0, 0, 0, 0, -1],
      [-1, 0, 0, 0, 0, 0, -1],
      [-1, 0, 0, 0, 0, 0, -1],
      [-1, 0, 0, 0, 0, 0, -1],
      [-1, -1, -1, -1, -1, -1, -1]
    ]

    // チェックパネル
    const checkPanel: boolean[][] = [
      [false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false]
    ]

    // 色定数
    enum Colors {GRAY, YELLOW, RED, GREEN, WHITE, BLUE}

    // 使用メッセージ
    const message = 'I have seen it...'
    const resultRef = ref<string>('赤:0,緑:0,白:0,青:0')
    const strColorRef = ref<string>('')
    const warningRef = ref<string>('必ず入力する色を選んでから番号を押してください')
    const panelNoRef = ref<string>('')

    // 色選択
    const choiceColor = (num: number): void => {
      switch (num) {
        case Colors.RED: color = 2
          break
        case Colors.GREEN: color = 3
          break
        case Colors.WHITE: color = 4
          break
        case Colors.BLUE: color = 5
          break
        case Colors.YELLOW: color = 1
          break
        default: color = 0
          break
      }
      currentColor()
      // 取得可能な番号
      let pNo = 0
      const canGetPanelNo = []
      // for文用変数
      let m = 0
      let n = 0
      // 黄色（チャンスの場合は違うロジック）
      if (color === Colors.YELLOW) {
        // チェックパネル初期化
        checkPanelInit(checkPanel, m, n)
        // 黄色が入れる箇所を抽出
        for (m = 0; m <= 6; m++) {
          for (n = 0; n <= 6; n++) {
            if (panels[m][n] >= Colors.RED) {
              // 変わる条件を判定
              checkPanel[m][n] = true
            }
            if (checkPanel[m][n]) {
              pNo = (m - 1) * 5 + n
              canGetPanelNo.push(pNo.toString())
            }
          }
        }
      } else {
        // 取れるか否かチェック
        // 条件番号
        let condNo = 9
        // チェックワークパネル
        const checkPanelwk: number[][] = [
          [9, 9, 9, 9, 9, 9, 9],
          [9, 9, 9, 9, 9, 9, 9],
          [9, 9, 9, 9, 9, 9, 9],
          [9, 9, 9, 9, 9, 9, 9],
          [9, 9, 9, 9, 9, 9, 9],
          [9, 9, 9, 9, 9, 9, 9],
          [9, 9, 9, 9, 9, 9, 9]
        ]
        // チェックパネル初期化
        checkPanelInit(checkPanel, m, n)
        // 条件確認ロジック
        for (m = 0; m <= 6; m++) {
          for (n = 0; n <= 6; n++) {
            if (panels[m][n] === Colors.GRAY || panels[m][n] === Colors.YELLOW) {
              // 変わる条件を判定
              checkPanelwk[m][n] = canGetPanelCheck(m, n)
            }
            if (checkPanelwk[m][n] < condNo) {
              condNo = checkPanelwk[m][n]
            }
          }
        }
        for (m = 0; m <= 6; m++) {
          for (n = 0; n <= 6; n++) {
            if (checkPanelwk[m][n] === condNo) {
              // 変わるパネルがあるか判定
              checkPanel[m][n] = true
            }
            if (checkPanel[m][n]) {
              pNo = (m - 1) * 5 + n
              canGetPanelNo.push(pNo.toString())
            }
          }
        }
      }
      panelNoRef.value = canGetPanelNo.join(',')
    }

    // チェックパネル初期化
    const checkPanelInit = (cPanel: boolean[][], m: number, n: number) => {
      for (m = 0; m <= 6; m++) {
        for (n = 0; n <= 6; n++) {
          cPanel[m][n] = false
        }
      }
    }

    // パネル取得
    const action = (num: number): void => {
      // 縦要素番号
      let verNo = 0
      // 横要素番号
      let sideNo = 0
      // パネルID
      const panelId = num
      // ロジック
      if (num <= 25 && num > 0) {
        // 取得配列要素取得
        Math.floor(num / 5) < 5 && num % 5 !== 0 ? verNo = Math.floor(num / 5) + 1 : verNo = Math.floor(num / 5)
        num % 5 === 0 ? sideNo = 5 : sideNo = num % 5
        if (checkPanel[verNo][sideNo]) {
          colorSet(color, panelId, verNo, sideNo)
          panelChange(panels, verNo, sideNo)
          total()
          warningRef.value = '必ず入力する色を選んでから番号を押してください'
        } else {
          warningRef.value = '今は取れません'
        }
      }
    }

    // パネル色の設定
    const colorSet = (col: number, id: number, v: number, s: number): void => {
      // id文字列化
      const strId = id.toString()
      // パネルに色を反映
      const elem = document.getElementById(strId)
      if (elem !== null) {
        switch (col) {
          case 1:
            panels[v][s] = Colors.YELLOW
            elem.style.backgroundColor = 'yellow'
            break
          case 2:
            panels[v][s] = Colors.RED
            elem.style.backgroundColor = 'red'
            break
          case 3:
            panels[v][s] = Colors.GREEN
            elem.style.backgroundColor = 'green'
            break
          case 4:
            panels[v][s] = Colors.WHITE
            elem.style.backgroundColor = 'white'
            break
          case 5:
            panels[v][s] = Colors.BLUE
            elem.style.backgroundColor = 'blue'
            break
          default:
            panels[v][s] = Colors.GRAY
            elem.style.backgroundColor = 'gray'
            break
        }
      }
    }

    // パネル変化ロジック
    const panelChange = (pan: number[][], v: number, s: number) : void => {
      // 起点の色
      const cn = pan[v][s]
      // パネル変わる可能性
      let panelPreChange = false
      // 色判定（0:灰色、1:黄色は除外）
      if (cn >= Colors.RED) {
        // 上確認
        // 変わるパネルがあるか判定
        panelPreChange = upSandCheck(panelPreChange, cn, v, s)
        // for文用変数
        let i
        let j
        // パネルを変える
        if (panelPreChange) {
          for (i = v - 1; i >= 0; i--) {
            if (pan[i][s] !== cn && pan[i][s] > Colors.YELLOW) {
              doPanelChange(cn, i, s)
            } else {
              break
            }
          }
          panelPreChange = false
        }
        // 下確認
        // 変わるパネルがあるか判定
        panelPreChange = downSandCheck(panelPreChange, cn, v, s)
        // パネルを変える
        if (panelPreChange) {
          for (i = v + 1; i <= 6; i++) {
            if (pan[i][s] !== cn && pan[i][s] > Colors.YELLOW) {
              doPanelChange(cn, i, s)
            } else {
              break
            }
          }
          panelPreChange = false
        }
        // 左確認
        // 変わるパネルがあるか判定
        panelPreChange = leftSandCheck(panelPreChange, cn, v, s)
        // パネルを変える
        if (panelPreChange) {
          for (i = s - 1; i >= 0; i--) {
            if (pan[v][i] !== cn && pan[v][i] > Colors.YELLOW) {
              doPanelChange(cn, v, i)
            } else {
              break
            }
          }
          panelPreChange = false
        }
        // 右確認
        // 変わるパネルがあるか判定
        panelPreChange = rightSandCheck(panelPreChange, cn, v, s)
        // パネルを変える
        if (panelPreChange) {
          for (i = s + 1; i <= 6; i++) {
            if (pan[v][i] !== cn && pan[v][i] > Colors.YELLOW) {
              doPanelChange(cn, v, i)
            } else {
              break
            }
          }
          panelPreChange = false
        }
        // 左上確認
        // 変わるパネルがあるか判定
        panelPreChange = leftUpSandCheck(panelPreChange, cn, v, s)
        // パネルを変える
        if (panelPreChange) {
          for (i = v - 1, j = s - 1; i >= 0 || j >= 0; i--, j--) {
            if (pan[i][j] !== cn && pan[i][j] > Colors.YELLOW) {
              doPanelChange(cn, i, j)
            } else {
              break
            }
          }
          panelPreChange = false
        }
        // 左下確認
        // 変わるパネルがあるか判定
        panelPreChange = leftDownSandCheck(panelPreChange, cn, v, s)
        // パネルを変える
        if (panelPreChange) {
          for (i = v + 1, j = s - 1; i <= 6 || j >= 0; i++, j--) {
            if (pan[i][j] !== cn && pan[i][j] > Colors.YELLOW) {
              doPanelChange(cn, i, j)
            } else {
              break
            }
          }
          panelPreChange = false
        }
        // // 右上確認
        // 変わるパネルがあるか判定
        panelPreChange = rightUpSandCheck(panelPreChange, cn, v, s)
        // パネルを変える
        if (panelPreChange) {
          for (i = v - 1, j = s + 1; i >= 0 || j <= 6; i--, j++) {
            if (pan[i][j] !== cn && pan[i][j] > Colors.YELLOW) {
              doPanelChange(cn, i, j)
            } else {
              break
            }
          }
          panelPreChange = false
        }
        // 右下確認
        // 変わるパネルがあるか判定
        panelPreChange = rightDownSandCheck(panelPreChange, cn, v, s)
        // パネルを変える
        if (panelPreChange) {
          for (i = v + 1, j = s + 1; i <= 6 || j <= 6; i++, j++) {
            if (pan[i][j] !== cn && pan[i][j] > Colors.YELLOW) {
              doPanelChange(cn, i, j)
            } else {
              break
            }
          }
          panelPreChange = false
        }
      }
    }
    // パネルの色を変える
    const doPanelChange = (cn: number, v: number, s: number): void => {
      const cNum = (v - 1) * 5 + s
      colorSet(cn, cNum, v, s)
    }

    // 集計ロジック
    const total = (): void => {
      let redCount = 0
      let greenCount = 0
      let whiteCount = 0
      let blueCount = 0
      // for文用変数
      let x
      let y
      for (x = 0; x <= 6; x++) {
        for (y = 0; y <= 6; y++) {
          switch (panels[x][y]) {
            case Colors.RED:
              redCount++
              break
            case Colors.GREEN:
              greenCount++
              break
            case Colors.WHITE:
              whiteCount++
              break
            case Colors.BLUE:
              blueCount++
              break
            default:
              break
          }
        }
      }
      resultRef.value = `赤:${redCount},緑:${greenCount},白:${whiteCount},青:${blueCount}`
    }

    // 選択中の色表示
    const currentColor = (): void => {
      switch (color) {
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

    // 取得可能か確認する関数
    const canGetPanelCheck = (v: number, s: number): number => {
      // 取得可能フラグ（1:挟める箇所,2:次挟める箇所,3:自分や他人と隣接している箇所,9:それ以外）
      let canGetPanel = 9
      // 最初の判定フラグ
      let beginLock = false
      // 挟める箇所フラグ
      const sandPanel = false
      // 最初は配列[3][3]（13番）のみ
      if (panels[3][3] === Colors.GRAY) {
        beginLock = true
        if (v === 3 && s === 3) {
          canGetPanel = 1
          beginLock = false
        }
      }
      // 挟める箇所か
      if (canGetPanel === 9 && upSandCheck(sandPanel, color, v, s)) {
        canGetPanel = 1
      } else if (canGetPanel !== 1 && downSandCheck(sandPanel, color, v, s)) {
        canGetPanel = 1
      } else if (canGetPanel !== 1 && leftSandCheck(sandPanel, color, v, s)) {
        canGetPanel = 1
      } else if (canGetPanel !== 1 && rightSandCheck(sandPanel, color, v, s)) {
        canGetPanel = 1
      } else if (canGetPanel !== 1 && leftUpSandCheck(sandPanel, color, v, s)) {
        canGetPanel = 1
      } else if (canGetPanel !== 1 && leftDownSandCheck(sandPanel, color, v, s)) {
        canGetPanel = 1
      } else if (canGetPanel !== 1 && rightUpSandCheck(sandPanel, color, v, s)) {
        canGetPanel = 1
      } else if (canGetPanel !== 1 && rightDownSandCheck(sandPanel, color, v, s)) {
        canGetPanel = 1
      }
      // 次挟める箇所か
      // for文用変数
      let a
      let b
      if (canGetPanel !== 1) {
        // 上確認
        if (!beginLock) {
          // 挟む対象判定フラグ
          let isSandTarget = false
          for (a = v - 1; a >= 0; a--) {
            if (panels[a][s] !== color && panels[a][s] > Colors.YELLOW) {
              isSandTarget = true
            } else if (panels[a][s] === Colors.GRAY || panels[a][s] === Colors.YELLOW) {
              if (isSandTarget) {
                canGetPanel = 2
              }
              break
            } else {
              break
            }
          }
        }
        // 下確認
        if (!(canGetPanel <= 2) && !beginLock) {
          // 挟む対象判定フラグ
          let isSandTarget = false
          for (a = v + 1; a <= 6; a++) {
            if (panels[a][s] !== color && panels[a][s] > Colors.YELLOW) {
              isSandTarget = true
            } else if (panels[a][s] === Colors.GRAY || panels[a][s] === Colors.YELLOW) {
              if (isSandTarget) {
                canGetPanel = 2
              }
              break
            } else {
              break
            }
          }
        }
        // 左確認
        if (!(canGetPanel <= 2) && !beginLock) {
          // 挟む対象判定フラグ
          let isSandTarget = false
          for (a = s - 1; a >= 0; a--) {
            if (panels[v][a] !== color && panels[v][a] > Colors.YELLOW) {
              isSandTarget = true
            } else if (panels[v][a] === Colors.GRAY || panels[v][a] === Colors.YELLOW) {
              if (isSandTarget) {
                canGetPanel = 2
              }
              break
            } else {
              break
            }
          }
        }
        // 右確認
        if (!(canGetPanel <= 2) && !beginLock) {
          // 挟む対象判定フラグ
          let isSandTarget = false
          for (a = s + 1; a <= 6; a++) {
            if (panels[v][a] !== color && panels[v][a] > Colors.YELLOW) {
              isSandTarget = true
            } else if (panels[v][a] === Colors.GRAY || panels[v][a] === Colors.YELLOW) {
              if (isSandTarget) {
                canGetPanel = 2
              }
              break
            } else {
              break
            }
          }
        }
        // 左上確認
        if (!(canGetPanel <= 2) && !beginLock) {
          // 挟む対象判定フラグ
          let isSandTarget = false
          for (a = v - 1, b = s - 1; a >= 0 || b >= 0; a--, b--) {
            if (panels[a][b] !== color && panels[a][b] > Colors.YELLOW) {
              isSandTarget = true
            } else if (panels[a][b] === Colors.GRAY || panels[a][b] === Colors.YELLOW) {
              if (isSandTarget) {
                canGetPanel = 2
              }
              break
            } else {
              break
            }
          }
        }
        // 左下確認
        if (!(canGetPanel <= 2) && !beginLock) {
          // 挟む対象判定フラグ
          let isSandTarget = false
          for (a = v + 1, b = s - 1; a <= 6 || b >= 0; a++, b--) {
            if (panels[a][b] !== color && panels[a][b] > Colors.YELLOW) {
              isSandTarget = true
            } else if (panels[a][b] === Colors.GRAY || panels[a][b] === Colors.YELLOW) {
              if (isSandTarget) {
                canGetPanel = 2
              }
              break
            } else {
              break
            }
          }
        }
        // 右上確認
        if (!(canGetPanel <= 2) && !beginLock) {
          // 挟む対象判定フラグ
          let isSandTarget = false
          for (a = v - 1, b = s + 1; a >= 0 || b <= 6; a--, b++) {
            if (panels[a][b] !== color && panels[a][b] > Colors.YELLOW) {
              isSandTarget = true
            } else if (panels[a][b] === Colors.GRAY || panels[a][b] === Colors.YELLOW) {
              if (isSandTarget) {
                canGetPanel = 2
              }
              break
            } else {
              break
            }
          }
        }
        // 右下確認
        if (!(canGetPanel <= 2) && !beginLock) {
          // 挟む対象判定フラグ
          let isSandTarget = false
          for (a = v + 1, b = s + 1; a <= 6 || b <= 6; a++, b++) {
            if (panels[a][b] !== color && panels[a][b] > Colors.YELLOW) {
              isSandTarget = true
            } else if (panels[a][b] === Colors.GRAY || panels[a][b] === Colors.YELLOW) {
              if (isSandTarget) {
                canGetPanel = 2
              }
              break
            } else {
              break
            }
          }
        }
      }
      // 誰かのパネルに隣接しているか
      if (canGetPanel > 2) {
        if (panels[v - 1][s] >= Colors.RED || panels[v + 1][s] >= Colors.RED) {
          canGetPanel = 3
        } else if (panels[v][s - 1] >= Colors.RED || panels[v][s + 1] >= Colors.RED) {
          canGetPanel = 3
        } else if (panels[v - 1][s - 1] >= Colors.RED || panels[v + 1][s - 1] >= Colors.RED) {
          canGetPanel = 3
        } else if (panels[v - 1][s + 1] >= Colors.RED || panels[v + 1][s + 1] >= Colors.RED) {
          canGetPanel = 3
        }
      }
      return canGetPanel
    }

    // 挟めるか確認（上）
    const upSandCheck = (flag: boolean, cn: number, v: number, s: number): boolean => {
      // for文用変数
      let i
      for (i = v - 1; i >= 0; i--) {
        if (panels[i][s] !== cn && panels[i][s] > Colors.YELLOW) {
          flag = true
        } else if (panels[i][s] <= Colors.YELLOW) {
          flag = false
          break
        } else {
          break
        }
      }
      return flag
    }

    // 挟めるか確認（下）
    const downSandCheck = (flag: boolean, cn: number, v: number, s: number): boolean => {
      // for文用変数
      let i
      for (i = v + 1; i <= 6; i++) {
        if (panels[i][s] !== cn && panels[i][s] > Colors.YELLOW) {
          flag = true
        } else if (panels[i][s] <= Colors.YELLOW) {
          flag = false
          break
        } else {
          break
        }
      }
      return flag
    }

    // 挟めるか確認（左）
    const leftSandCheck = (flag: boolean, cn: number, v: number, s: number): boolean => {
      // for文用変数
      let i
      for (i = s - 1; i >= 0; i--) {
        if (panels[v][i] !== cn && panels[v][i] > Colors.YELLOW) {
          flag = true
        } else if (panels[v][i] <= Colors.YELLOW) {
          flag = false
          break
        } else {
          break
        }
      }
      return flag
    }

    // 挟めるか確認（右）
    const rightSandCheck = (flag: boolean, cn: number, v: number, s: number): boolean => {
      // for文用変数
      let i
      for (i = s + 1; i <= 6; i++) {
        if (panels[v][i] !== cn && panels[v][i] > Colors.YELLOW) {
          flag = true
        } else if (panels[v][i] <= Colors.YELLOW) {
          flag = false
          break
        } else {
          break
        }
      }
      return flag
    }

    // 挟めるか確認（左上）
    const leftUpSandCheck = (flag: boolean, cn: number, v: number, s: number): boolean => {
      // for文用変数
      let i
      let j
      for (i = v - 1, j = s - 1; i >= 0 || j >= 0; i--, j--) {
        if (panels[i][j] !== cn && panels[i][j] > Colors.YELLOW) {
          flag = true
        } else if (panels[i][j] <= Colors.YELLOW) {
          flag = false
          break
        } else {
          break
        }
      }
      return flag
    }

    // 挟めるか確認（左下）
    const leftDownSandCheck = (flag: boolean, cn: number, v: number, s: number): boolean => {
      // for文用変数
      let i
      let j
      for (i = v + 1, j = s - 1; i <= 6 || j >= 0; i++, j--) {
        if (panels[i][j] !== cn && panels[i][j] > Colors.YELLOW) {
          flag = true
        } else if (panels[i][j] <= Colors.YELLOW) {
          flag = false
          break
        } else {
          break
        }
      }
      return flag
    }

    // 挟めるか確認（右上）
    const rightUpSandCheck = (flag: boolean, cn: number, v: number, s: number): boolean => {
      // for文用変数
      let i
      let j
      for (i = v - 1, j = s + 1; i >= 0 || j <= 6; i--, j++) {
        if (panels[i][j] !== cn && panels[i][j] > Colors.YELLOW) {
          flag = true
        } else if (panels[i][j] <= Colors.YELLOW) {
          flag = false
          break
        } else {
          break
        }
      }
      return flag
    }

    // 挟めるか確認（右下）
    const rightDownSandCheck = (flag: boolean, cn: number, v: number, s: number): boolean => {
      // for文用変数
      let i
      let j
      for (i = v + 1, j = s + 1; i <= 6 || j <= 6; i++, j++) {
        if (panels[i][j] !== cn && panels[i][j] > Colors.YELLOW) {
          flag = true
        } else if (panels[i][j] <= Colors.YELLOW) {
          flag = false
          break
        } else {
          break
        }
      }
      return flag
    }
    return {
      message, resultRef, strColorRef, warningRef, panelNoRef, choiceColor, action
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
