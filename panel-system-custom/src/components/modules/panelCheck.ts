import { Ref } from 'vue'
import { Panel } from './types'
import { COLORS } from './enums'
import { getStrNo } from './getStrNo'
import { upSandCheck, downSandCheck, leftSandCheck, rightSandCheck, leftUpSandCheck, leftDownSandCheck, rightUpSandCheck, rightDownSandCheck } from './sandCheck'

export const panelCheck = (panel: Panel[][], colorRef: Ref<number>): string => {
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
          panel[m][n].condition = canGetPanelCheck(panel, m, n, colorRef)
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
  // 終了（取れるパネルがなくなる）の判定
  let isFinish = false
  // 取れるパネルの枚数
  let emptyCount = 0
  for (m = 0; m <= 6; m++) {
    for (n = 0; n <= 6; n++) {
      if (panel[m][n].colorNo === COLORS.GRAY || panel[m][n].colorNo === COLORS.YELLOW) {
        emptyCount++
      }
    }
  }
  // 終了判定
  emptyCount > 0 ? isFinish = false : isFinish = true
  if (isFinish) {
    return '終了です。'
  } else {
    // 入れる番号を戻り値にして返す
    return canGetPanelNo.join(',')
  }
}

// 取得可能か確認する関数（v:縦番号,s:横番号）
const canGetPanelCheck = (panel: Panel[][], v: number, s: number, colorRef: Ref<number>): number => {
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
  if (condNum === 9 && upSandCheck(panel, sandPanel, colorRef.value, v, s)) {
    condNum = 1
  } else if (condNum !== 1 && downSandCheck(panel, sandPanel, colorRef.value, v, s)) {
    condNum = 1
  } else if (condNum !== 1 && leftSandCheck(panel, sandPanel, colorRef.value, v, s)) {
    condNum = 1
  } else if (condNum !== 1 && rightSandCheck(panel, sandPanel, colorRef.value, v, s)) {
    condNum = 1
  } else if (condNum !== 1 && leftUpSandCheck(panel, sandPanel, colorRef.value, v, s)) {
    condNum = 1
  } else if (condNum !== 1 && leftDownSandCheck(panel, sandPanel, colorRef.value, v, s)) {
    condNum = 1
  } else if (condNum !== 1 && rightUpSandCheck(panel, sandPanel, colorRef.value, v, s)) {
    condNum = 1
  } else if (condNum !== 1 && rightDownSandCheck(panel, sandPanel, colorRef.value, v, s)) {
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
