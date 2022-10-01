<template>
  <div>
      <div class="play">
        <RedButton :choice-color="choiceColor" />
        <GreenButton :choice-color="choiceColor" />
        <WhiteButton :choice-color="choiceColor" />
        <BlueButton :choice-color="choiceColor" />
      </div>
        <YellowButton :choice-color="choiceColor"></YellowButton>
    <p>更新で最初からに戻ります。</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import RedButton from '../atoms/RedButton.vue'
import GreenButton from '../atoms/GreenButton.vue'
import WhiteButton from '../atoms/WhiteButton.vue'
import BlueButton from '../atoms/BlueButton.vue'
import YellowButton from '../atoms/YellowButton.vue'

export default defineComponent({
  props: {
    choiceColor: Function
  },
  components: { RedButton, GreenButton, WhiteButton, BlueButton, YellowButton }
})
</script>

<style scoped>
  /* 横に並べ、中央揃えにする */
.play {
  display:flex;
  justify-content: center;
}
</style>
