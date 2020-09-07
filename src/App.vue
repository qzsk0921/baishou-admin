<template>
  <div id="app">
    <!-- <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" /> -->
    <router-view name="navbar" />
    <router-view name="sidebar" />
    <router-view />
  </div>
</template>

<script>
import ResizeMixin from '@/layout/mixin/ResizeHandler'

export default {
  name: 'App',
  mixins: [ResizeMixin]
}
</script>

<style>
#app {
  height: 100%;
}
</style>
