import { Ref } from 'vue'
import { COLORS, RESULT } from './enums'
import { Panel } from './types'
import { upSandCheck, downSandCheck, leftSandCheck, rightSandCheck, leftUpSandCheck, leftDownSandCheck, rightUpSandCheck, rightDownSandCheck } from './sandCheck'

// 取得可能か確認する関数（panel:使用パネル,v:縦番号,s:横番号,colorRef:色番号）
export const canGetPanelCheck = (panel: Panel[][], v: number, s: number, colorRef: Ref<number>): number => {
  // 条件番号（RESULTから読み取り）
  // （FIRST:最初,SAND:挟める箇所,NEXT_SAND:次挟める箇所,NEXT_PANEL:自分や他人と隣接している箇所,NONE:それ以外）
  let condNum: number
  condNum = RESULT.NONE
  // 最初の判定フラグ（13番以外入れないようにする為）
  let firstLock = false
  // 挟める箇所フラグ
  const sandPanel = false
  // 最初は配列[3][3]（13番）のみ条件番号1を設定
  if (panel[3][3].colorNo === COLORS.GRAY) {
    firstLock = true
    if (v === 3 && s === 3) {
      condNum = RESULT.FIRST
      firstLock = false
    }
  }
  // 挟める箇所か（該当すれば条件番号1を設定）
  if (condNum === RESULT.NONE && upSandCheck(panel, sandPanel, colorRef.value, v, s)) {
    condNum = RESULT.SAND
  } else if (condNum !== RESULT.SAND && downSandCheck(panel, sandPanel, colorRef.value, v, s)) {
    condNum = RESULT.SAND
  } else if (condNum !== RESULT.SAND && leftSandCheck(panel, sandPanel, colorRef.value, v, s)) {
    condNum = RESULT.SAND
  } else if (condNum !== RESULT.SAND && rightSandCheck(panel, sandPanel, colorRef.value, v, s)) {
    condNum = RESULT.SAND
  } else if (condNum !== RESULT.SAND && leftUpSandCheck(panel, sandPanel, colorRef.value, v, s)) {
    condNum = RESULT.SAND
  } else if (condNum !== RESULT.SAND && leftDownSandCheck(panel, sandPanel, colorRef.value, v, s)) {
    condNum = RESULT.SAND
  } else if (condNum !== RESULT.SAND && rightUpSandCheck(panel, sandPanel, colorRef.value, v, s)) {
    condNum = RESULT.SAND
  } else if (condNum !== RESULT.SAND && rightDownSandCheck(panel, sandPanel, colorRef.value, v, s)) {
    condNum = RESULT.SAND
  }
  // 次挟める箇所か、各方向で確認する（既に条件番号1がある時、又は、最初の場合は行わない）
  // 1.自分のパネルと空いているパネルや枠（colorNo = -1）以外なら挟む対象フラグを立てる
  // 2.空いているパネルで挟む対象フラグがtrueなら次挟める箇所となるので条件番号2を設定してその方向の確認を抜ける
  // 3.それ以外は何もせずその方向の確認を抜ける
  // 確認用for文用変数
  let a
  let b
  if (condNum !== RESULT.SAND && !firstLock) {
    // 挟む対象フラグ
    let isSandTarget = false
    // 上方向確認
    for (a = v - 1; a >= 0; a--) {
      if (panel[a][s].colorNo !== colorRef.value && panel[a][s].colorNo > COLORS.YELLOW) {
        isSandTarget = true
      } else if (panel[a][s].colorNo === COLORS.GRAY || panel[a][s].colorNo === COLORS.YELLOW) {
        if (isSandTarget) {
          condNum = RESULT.NEXT_SAND
        }
        break
      } else {
        break
      }
    }
    // 下方向確認
    if (condNum > RESULT.NEXT_SAND) {
      let isSandTarget = false
      for (a = v + 1; a <= 6; a++) {
        if (panel[a][s].colorNo !== colorRef.value && panel[a][s].colorNo > COLORS.YELLOW) {
          isSandTarget = true
        } else if (panel[a][s].colorNo === COLORS.GRAY || panel[a][s].colorNo === COLORS.YELLOW) {
          if (isSandTarget) {
            condNum = RESULT.NEXT_SAND
          }
          break
        } else {
          break
        }
      }
    }
    // 左方向確認
    if (condNum > RESULT.NEXT_SAND) {
      let isSandTarget = false
      for (a = s - 1; a >= 0; a--) {
        if (panel[v][a].colorNo !== colorRef.value && panel[v][a].colorNo > COLORS.YELLOW) {
          isSandTarget = true
        } else if (panel[v][a].colorNo === COLORS.GRAY || panel[v][a].colorNo === COLORS.YELLOW) {
          if (isSandTarget) {
            condNum = RESULT.NEXT_SAND
          }
          break
        } else {
          break
        }
      }
    }
    // 右方向確認
    if (condNum > RESULT.NEXT_SAND) {
      let isSandTarget = false
      for (a = s + 1; a <= 6; a++) {
        if (panel[v][a].colorNo !== colorRef.value && panel[v][a].colorNo > COLORS.YELLOW) {
          isSandTarget = true
        } else if (panel[v][a].colorNo === COLORS.GRAY || panel[v][a].colorNo === COLORS.YELLOW) {
          if (isSandTarget) {
            condNum = RESULT.NEXT_SAND
          }
          break
        } else {
          break
        }
      }
    }
    // 左斜め上方向確認
    if (condNum > RESULT.NEXT_SAND) {
      let isSandTarget = false
      for (a = v - 1, b = s - 1; a >= 0 || b >= 0; a--, b--) {
        if (panel[a][b].colorNo !== colorRef.value && panel[a][b].colorNo > COLORS.YELLOW) {
          isSandTarget = true
        } else if (panel[a][b].colorNo === COLORS.GRAY || panel[a][b].colorNo === COLORS.YELLOW) {
          if (isSandTarget) {
            condNum = RESULT.NEXT_SAND
          }
          break
        } else {
          break
        }
      }
    }
    // 左斜め下方向確認
    if (condNum > RESULT.NEXT_SAND) {
      let isSandTarget = false
      for (a = v + 1, b = s - 1; a <= 6 || b >= 0; a++, b--) {
        if (panel[a][b].colorNo !== colorRef.value && panel[a][b].colorNo > COLORS.YELLOW) {
          isSandTarget = true
        } else if (panel[a][b].colorNo === COLORS.GRAY || panel[a][b].colorNo === COLORS.YELLOW) {
          if (isSandTarget) {
            condNum = RESULT.NEXT_SAND
          }
          break
        } else {
          break
        }
      }
    }
    // 右斜め上方向確認
    if (condNum > RESULT.NEXT_SAND) {
      let isSandTarget = false
      for (a = v - 1, b = s + 1; a >= 0 || b <= 6; a--, b++) {
        if (panel[a][b].colorNo !== colorRef.value && panel[a][b].colorNo > COLORS.YELLOW) {
          isSandTarget = true
        } else if (panel[a][b].colorNo === COLORS.GRAY || panel[a][b].colorNo === COLORS.YELLOW) {
          if (isSandTarget) {
            condNum = RESULT.NEXT_SAND
          }
          break
        } else {
          break
        }
      }
    }
    // 右斜め下方向確認
    if (condNum > RESULT.NEXT_SAND) {
      let isSandTarget = false
      for (a = v + 1, b = s + 1; a <= 6 || b <= 6; a++, b++) {
        if (panel[a][b].colorNo !== colorRef.value && panel[a][b].colorNo > COLORS.YELLOW) {
          isSandTarget = true
        } else if (panel[a][b].colorNo === COLORS.GRAY || panel[a][b].colorNo === COLORS.YELLOW) {
          if (isSandTarget) {
            condNum = RESULT.NEXT_SAND
          }
          break
        } else {
          break
        }
      }
    }
  }
  // 誰かのパネルに隣接しているか確認（あれば条件番号3を設定）
  if (condNum > RESULT.NEXT_SAND) {
    if (panel[v - 1][s].colorNo >= COLORS.RED || panel[v + 1][s].colorNo >= COLORS.RED) {
      condNum = RESULT.NEXT_PANEL
    } else if (panel[v][s - 1].colorNo >= COLORS.RED || panel[v][s + 1].colorNo >= COLORS.RED) {
      condNum = RESULT.NEXT_PANEL
    } else if (panel[v - 1][s - 1].colorNo >= COLORS.RED || panel[v + 1][s - 1].colorNo >= COLORS.RED) {
      condNum = RESULT.NEXT_PANEL
    } else if (panel[v - 1][s + 1].colorNo >= COLORS.RED || panel[v + 1][s + 1].colorNo >= COLORS.RED) {
      condNum = RESULT.NEXT_PANEL
    }
  }
  return condNum
}
