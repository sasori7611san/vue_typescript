// 色の定数
export const COLORS = {
  GRAY: 0,
  YELLOW: 1,
  RED: 2,
  GREEN: 3,
  WHITE: 4,
  BLUE: 5
} as const
type COLORS = typeof COLORS[keyof typeof COLORS];

export const RESULT = {
  FIRST: 1,
  SAND: 1,
  NEXT_SAND: 2,
  NEXT_PANEL: 3,
  NONE: 9
} as const
type RESULT = typeof RESULT[keyof typeof RESULT]
