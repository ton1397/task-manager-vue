<template>
  <router-view>
  </router-view>
  <ToastContainer ref="toast" />
</template>

<script>
import ToastContainer from './components/ToastContainerComponent.vue'

export default {
  name: 'App',
  components: {
    ToastContainer
  }
}
</script>

<style>
	
</style>
