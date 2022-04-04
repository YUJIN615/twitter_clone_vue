<template>
  <div class="flex h-screen container mx-auto">
    <!-- 사이드 네비 -->
    <AppNav @onShowTweetModal="showTweetModal = true" />
    <!-- 메인 섹션 -->
    <router-view />
    <!-- 트윗 모달 -->
    <TweetModal
      v-if="showTweetModal"
      @closeTweetModal="showTweetModal = false"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import AppNav from "@/components/AppNav.vue";
import Home from "@/pages/Home.vue";
import AppTrends from "@/components/AppTrends.vue";
import TweetModal from "@/components/TweetModal.vue";

export default {
  components: {
    AppNav,
    Home,
    AppTrends,
    TweetModal,
  },
  setup() {
    const showTweetModal = ref(false);

    return { showTweetModal };
  },
};
</script>

<style></style>
