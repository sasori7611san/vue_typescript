<template>
  <div>
    <button class="choice" :id="color"></button>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRef } from 'vue'

export default defineComponent({
  props: {
    strColor: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    // 色の名前を受け取り、色分けする
    const color = toRef(props, 'strColor')
    return { color }
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
