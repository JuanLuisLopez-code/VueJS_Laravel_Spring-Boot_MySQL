<script setup>
import { RouterView } from 'vue-router'
import FooterVue from './components/Footer.vue';
import HeaderVue from './components/Header.vue';
</script>

<template>
  <HeaderVue />
  <RouterView />
  <FooterVue />
</template>