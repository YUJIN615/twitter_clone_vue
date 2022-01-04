<template>
  <div class="flex-1">
    <div class="flex h-screen">
      <!-- 홈 섹션 -->
      <div class="flex-1 border-r borer-gray-100 overflow-y-auto">
        <div class="flex flex-col">
          <!-- 타이틀 -->
          <h2 class="px-4 py-5 font-bold text-lg">홈</h2>
          <!-- 트윗하기 -->
          <div class="flex flex-col px-3 py-2">
            <div class="flex">
              <img
                src="http://picsum.photos/100"
                alt=""
                class="w-12 h-12 rounded-full cursor-pointer hover:opacity-80"
              />
              <textarea
                placeholder="무슨 일이 일어나고 있나요?"
                class="w-full color-slate-800 px-3 pt-3 outline-none"
              ></textarea>
            </div>
            <div
              class="flex justify-between pl-14 py-3 border-b border-gray-100"
            >
              <div class="text-primary">
                <button class="w-8 h-8 rounded-full hover:bg-blue-50">
                  <i class="far fa-image fa-fw"></i>
                </button>
                <button class="w-8 h-8 rounded-full hover:bg-blue-50">
                  <i class="fas fa-photo-video fa-fw"></i>
                </button>
                <button class="w-8 h-8 rounded-full hover:bg-blue-50">
                  <i class="fas fa-poll-h fa-fw"></i>
                </button>
                <button class="w-8 h-8 rounded-full hover:bg-blue-50">
                  <i class="far fa-smile fa-fw"></i>
                </button>
                <button class="w-8 h-8 rounded-full hover:bg-blue-50">
                  <i class="far fa-calendar-alt fa-fw"></i>
                </button>
                <button class="w-8 h-8 rounded-full hover:bg-blue-50">
                  <i class="fas fa-map-marker-alt fa-fw"></i>
                </button>
              </div>
              <button
                class="
                  w-24
                  h-9
                  bg-light
                  hover:bg-primary
                  text-white
                  rounded-3xl
                  mr-3
                  font-bold
                "
              >
                트윗하기
              </button>
            </div>
          </div>
          <!-- 트윗 -->
          <AppTweets v-for="tweet in 10" :key="tweet" />
        </div>
      </div>

      <!-- 트렌드 섹션 -->
      <AppTrends />
    </div>
  </div>
</template>

<script>
import AppTrends from "@/components/AppTrends.vue";
import AppTweets from "@/components/AppTweets.vue";
export default {
  components: {
    AppTrends,
    AppTweets,
  },
  setup() {},
};
</script>

<style></style>
