<template>
  <PanelSystem />
  <!-- <div>
    <PanelScreen />
    <ChoiceColor />
  </div> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PanelSystem from './components/PanelSystem.vue'
// import PanelScreen from './components/PanelScreen.vue'
// import ChoiceColor from './components/ChoiceColor.vue'

export default defineComponent({
  name: 'App',
  components: {
    PanelSystem
    // PanelScreen,
    // ChoiceColor
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
