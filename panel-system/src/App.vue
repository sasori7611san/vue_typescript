<template>
  <PanelSystem />
  <PanelScreen />
  <!-- <Infomation />
  <ChoiceColors /> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PanelSystem from './components/PanelSystem.vue'
import PanelScreen from './components/PanelScreen.vue'
// import Infomation from './components/Infomation.vue'
// import ChoiceColors from './components/ChoiceColors.vue'

export default defineComponent({
  name: 'App',
  components: {
    PanelSystem,
    // Panel,
    // Infomation,
    // ChoiceColors
    PanelScreen
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
