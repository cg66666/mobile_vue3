<template>
  <HomeSearchMode defaultSearchWord="烧烤" @click="SearchCover.setStatus()"></HomeSearchMode>
  <SearchCoverPage defaultSearchWord="蜜雪冰城" ref="SearchCover"></SearchCoverPage>
</template>

<script setup lang="ts">
import HomeSearchMode from '@/components/HomeSearchMode.vue';
import SearchCoverPage from '@/components/SearchCoverPage.vue';
import { ref } from 'vue';
const SearchCover = ref();
</script>

<style></style>
