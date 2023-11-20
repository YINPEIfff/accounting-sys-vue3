<script setup lang="ts">

</script>

<template>
  <transition>
    <RouterView/>
  </transition>


</template>

<style>

.v-enter-active,
.v-leave-active {
  transition: opacity 1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>