<template>
    <div class="spinner"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
    name: "LoadingCircle"
})
</script>

<style scoped>
.spinner {
  width: 50px;
  height: 50px;
  border: 8px solid #f3f3f3; /* Light grey background */
  border-top: 8px solid #3498db; /* Blue spinner color */
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Keyframes for spinning animation */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>