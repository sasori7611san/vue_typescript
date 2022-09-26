<template>
  <!-- <PanelSystem /> -->
  <!-- <div>
    <PanelScreen />
    <ChoiceColor />
  </div> -->
  <TestPanel />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import PanelSystem from './components/PanelSystem.vue'
// import PanelScreen from './components/PanelScreen.vue'
// import ChoiceColor from './components/ChoiceColor.vue'
import TestPanel from './components/TestPanel.vue'

export default defineComponent({
  name: 'App',
  components: {
    // PanelSystem
    // PanelScreen,
    // ChoiceColor
    TestPanel
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
