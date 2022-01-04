<template>
  <div class="flex h-screen container mx-auto">
    <!-- 사이드 네비 -->
    <AppNav />
    <!-- 메인 섹션 -->
    <router-view />
  </div>
</template>

<script>
import AppNav from "@/components/AppNav.vue";
import Home from "@/pages/Home.vue";
import AppTrends from "@/components/AppTrends.vue";

export default {
  components: {
    AppNav,
    Home,
    AppTrends,
  },
};
</script>

<style></style>
