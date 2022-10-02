import { COLORS } from './enums'
import { Panel } from './types'

export const panelAggregation = (panel: Panel[][], red:number, green:number, white:number, blue:number): string => {
  // 各色の枚数を集計の為、初期化
  red = 0
  green = 0
  white = 0
  blue = 0
  // for文用変数
  let x
  let y
  // 各色の枚数を集計
  for (x = 0; x <= 6; x++) {
    for (y = 0; y <= 6; y++) {
      switch (panel[x][y].colorNo) {
        case COLORS.RED:
          red++
          break
        case COLORS.GREEN:
          green++
          break
        case COLORS.WHITE:
          white++
          break
        case COLORS.BLUE:
          blue++
          break
        default:
          break
      }
    }
  }
  // メッセージ（枚数内容を表示）
  return `赤：${red}枚、緑：${green}枚、白：${white}枚、青：${blue}枚`
}
