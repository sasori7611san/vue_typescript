<template>
  <div>
    <button class="choice" :id="color">{{ count }}</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRef } from 'vue'

export default defineComponent({
  props: {
    strColor: String,
    countRef: Number
  },
  setup (props) {
    // 枚数（数値）代入
    const numCount = toRef(props, 'countRef')
    // 枚数（表示用文字列）代入
    const count = ref('')
    // 数値かつ25以下ならそのまま表示、それ以外は空文字（非表示）にする
    if (numCount.value !== undefined) {
      if (numCount.value <= 25) {
        count.value = numCount.value.toString()
      } else {
        count.value = ''
      }
    }
    // 色の名前を受け取り、色分けする
    const color = toRef(props, 'strColor')
    return { count, color }
  }
})
</script>

<style scoped>
.choice {
  margin: 5px;
  width: 50px;
  height: 50px;
}

#red {
  background-color: red;
}

#green {
  background-color: green;
}

#white {
  background-color: white;
}

#blue {
  background-color: blue;
}

#yellow {
  background-color: yellow;
}
</style>
