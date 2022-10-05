import { Ref } from 'vue'
import { colorSet } from './colorSet'
import { COLORS } from './enums'
import { panelAggregation } from './panelAggregation'
import { Panel, Total } from './types'

// for文用変数
let i = 0
let j = 0
// パネル変化に要する秒数（ミリ秒単位）
const time = 800
// パネル変化枚数
let sheets = 0

// パネル更新（上方向）（col:対象色番号,v:縦番号,s:横番号,pan:パネル,color:使用色番号,total:パネル集計,panelChange:パネル変更フラグ）
export const upPanelChenge = (col: number, v: number, s: number, pan: Panel[][], color: Ref<number>, total: Total, sheet: number): number => {
  sheets = sheet
  for (i = v - 1; i >= 0; i--) {
    if (pan[i][s].colorNo !== col && pan[i][s].colorNo > COLORS.YELLOW) {
      // パネル更新
      panelChangeTime(col, i, s, pan, color, total)
    } else {
      break
    }
  }
  return sheets
}
// パネル更新（下方向）（col:対象色番号,v:縦番号,s:横番号,pan:パネル,color:使用色番号,total:パネル集計,panelChange:パネル変更フラグ）
export const downPanelChenge = (col: number, v: number, s: number, pan: Panel[][], color: Ref<number>, total: Total, sheet: number): number => {
  sheets = sheet
  for (i = v + 1; i <= 6; i++) {
    if (pan[i][s].colorNo !== col && pan[i][s].colorNo > COLORS.YELLOW) {
      // パネル更新
      panelChangeTime(col, i, s, pan, color, total)
    } else {
      break
    }
  }
  return sheets
}
// パネル更新（左方向）（col:対象色番号,v:縦番号,s:横番号,pan:パネル,color:使用色番号,total:パネル集計,panelChange:パネル変更フラグ）
export const leftPanelChenge = (col: number, v: number, s: number, pan: Panel[][], color: Ref<number>, total: Total, sheet: number): number => {
  sheets = sheet
  for (i = s - 1; i >= 0; i--) {
    if (pan[v][i].colorNo !== col && pan[v][i].colorNo > COLORS.YELLOW) {
      // パネル更新
      panelChangeTime(col, v, i, pan, color, total)
    } else {
      break
    }
  }
  return sheets
}
// パネル更新（右方向）（col:対象色番号,v:縦番号,s:横番号,pan:パネル,color:使用色番号,total:パネル集計,panelChange:パネル変更フラグ）
export const rightPanelChenge = (col: number, v: number, s: number, pan: Panel[][], color: Ref<number>, total: Total, sheet: number): number => {
  sheets = sheet
  for (i = s + 1; i <= 6; i++) {
    if (pan[v][i].colorNo !== col && pan[v][i].colorNo > COLORS.YELLOW) {
      // パネル更新
      panelChangeTime(col, v, i, pan, color, total)
    } else {
      break
    }
  }
  return sheets
}
// パネル更新（左斜め上方向）（col:対象色番号,v:縦番号,s:横番号,pan:パネル,color:使用色番号,total:パネル集計,panelChange:パネル変更フラグ）
export const leftUpPanelChenge = (col: number, v: number, s: number, pan: Panel[][], color: Ref<number>, total: Total, sheet: number): number => {
  sheets = sheet
  for (i = v - 1, j = s - 1; i >= 0 || j >= 0; i--, j--) {
    if (pan[i][j].colorNo !== col && pan[i][j].colorNo > COLORS.YELLOW) {
      // パネル更新
      panelChangeTime(col, i, j, pan, color, total)
    } else {
      break
    }
  }
  return sheets
}
// パネル更新（左斜め下方向）（col:対象色番号,v:縦番号,s:横番号,pan:パネル,color:使用色番号,total:パネル集計,panelChange:パネル変更フラグ）
export const leftDownPanelChenge = (col: number, v: number, s: number, pan: Panel[][], color: Ref<number>, total: Total, sheet: number): number => {
  sheets = sheet
  for (i = v + 1, j = s - 1; i <= 6 || j >= 0; i++, j--) {
    if (pan[i][j].colorNo !== col && pan[i][j].colorNo > COLORS.YELLOW) {
      // パネル更新
      panelChangeTime(col, i, j, pan, color, total)
    } else {
      break
    }
  }
  return sheets
}
// パネル更新（右斜め上方向）（col:対象色番号,v:縦番号,s:横番号,pan:パネル,color:使用色番号,total:パネル集計,panelChange:パネル変更フラグ）
export const rightUpPanelChenge = (col: number, v: number, s: number, pan: Panel[][], color: Ref<number>, total: Total, sheet: number): number => {
  sheets = sheet
  for (i = v - 1, j = s + 1; i >= 0 || j <= 6; i--, j++) {
    if (pan[i][j].colorNo !== col && pan[i][j].colorNo > COLORS.YELLOW) {
      // パネル更新
      panelChangeTime(col, i, j, pan, color, total)
    } else {
      break
    }
  }
  return sheets
}
// パネル更新（右斜め下方向）（col:対象色番号,v:縦番号,s:横番号,pan:パネル,color:使用色番号,total:パネル集計,panelChange:パネル変更フラグ）
export const rightDownPanelChenge = (col: number, v: number, s: number, pan: Panel[][], color: Ref<number>, total: Total, sheet: number): number => {
  sheets = sheet
  for (i = v + 1, j = s + 1; i <= 6 || j <= 6; i++, j++) {
    if (pan[i][j].colorNo !== col && pan[i][j].colorNo > COLORS.YELLOW) {
      // パネル更新
      panelChangeTime(col, i, j, pan, color, total)
    } else {
      break
    }
  }
  return sheets
}
// パネル変更動作（col:対象色番号,v:縦番号,s:横番号,pan:パネル,color:使用色番号,total:パネル集計）
const panelChangeExec = (col: number, v: number, s: number, pan: Panel[][], color: Ref<number>, total: Total): void => {
  colorSet(col, v, s, pan)
  panelAggregation(pan, total)
}
// パネル動作(時間考慮)（col:対象色番号,v:縦番号,s:横番号,pan:パネル,color:使用色番号,total:パネル集計）
const panelChangeTime = (col: number, v: number, s: number, pan: Panel[][], color: Ref<number>, total: Total) => {
  // 枚数を追加
  sheets++
  // パネル動作（時間考慮）
  window.setTimeout(panelChangeExec, time * sheets, col, v, s, pan, color, total)
}
