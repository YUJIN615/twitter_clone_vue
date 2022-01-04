<template>
  <div class="flex-1">
    <div class="flex h-screen">
      <div class="flex-1 border-r borer-gray-100 overflow-y-auto">
        <!-- 타이틀 -->
        <h2 class="px-4 py-5 font-bold text-lg">알림</h2>
        <ul class="flex justify-between text-center border-b border-gray-200">
          <li class="w-1/2">
            <button class="w-full py-3 hover:bg-gray-100">전체</button>
          </li>
          <li class="w-1/2">
            <button class="w-full py-3 hover:bg-gray-100">멘션</button>
          </li>
        </ul>
        <div>
          <div class="border-b border-gray-200 px-5 py-3 relative">
            <img
              src="http://picsum.photos/100"
              alt=""
              class="w-12 h-12 rounded-full cursor-pointer hover:opacity-80"
            />
            <h4 class="mt-3"><b>방탄소년단</b> 님의 최근 트윗</h4>
            <p class="text-sm text-gray-500 my-2">
              날이 많이 춥습니다 감기 조심하세요! 날이 많이 춥습니다 감기
              조심하세요! 날이 많이 춥습니다 감기 조심하세요! 날이 많이 춥습니다
              감기 조심하세요! 날이 많이 춥습니다 감기 조심하세요! 날이 많이
              춥습니다 감기 조심하세요! 날이 많이 춥습니다 감기 조심하세요!
            </p>
            <button class="text-sm text-gray-400 absolute top-5 right-5">
              <i class="fas fa-ellipsis-h fa-fw"></i>
            </button>
          </div>
          <div class="border-b border-gray-200 px-5 py-3 relative">
            <img
              src="http://picsum.photos/100"
              alt=""
              class="w-12 h-12 rounded-full cursor-pointer hover:opacity-80"
            />
            <h4 class="mt-3"><b>방탄소년단</b> 님의 최근 트윗</h4>
            <p class="text-sm text-gray-500 my-2">
              날이 많이 춥습니다 감기 조심하세요! 날이 많이 춥습니다 감기
              조심하세요! 날이 많이 춥습니다 감기 조심하세요! 날이 많이 춥습니다
              감기 조심하세요! 날이 많이 춥습니다 감기 조심하세요! 날이 많이
              춥습니다 감기 조심하세요! 날이 많이 춥습니다 감기 조심하세요!
            </p>
            <button class="text-sm text-gray-400 absolute top-5 right-5">
              <i class="fas fa-ellipsis-h fa-fw"></i>
            </button>
          </div>
          <div class="border-b border-gray-200 px-5 py-3 relative">
            <img
              src="http://picsum.photos/100"
              alt=""
              class="w-12 h-12 rounded-full cursor-pointer hover:opacity-80"
            />
            <h4 class="mt-3"><b>방탄소년단</b> 님의 최근 트윗</h4>
            <p class="text-sm text-gray-500 my-2">
              날이 많이 춥습니다 감기 조심하세요! 날이 많이 춥습니다 감기
              조심하세요! 날이 많이 춥습니다 감기 조심하세요! 날이 많이 춥습니다
              감기 조심하세요! 날이 많이 춥습니다 감기 조심하세요! 날이 많이
              춥습니다 감기 조심하세요! 날이 많이 춥습니다 감기 조심하세요!
            </p>
            <button class="text-sm text-gray-400 absolute top-5 right-5">
              <i class="fas fa-ellipsis-h fa-fw"></i>
            </button>
          </div>
          <div class="border-b border-gray-200 px-5 py-3 relative">
            <img
              src="http://picsum.photos/100"
              alt=""
              class="w-12 h-12 rounded-full cursor-pointer hover:opacity-80"
            />
            <h4 class="mt-3"><b>방탄소년단</b> 님의 최근 트윗</h4>
            <p class="text-sm text-gray-500 my-2">
              날이 많이 춥습니다 감기 조심하세요! 날이 많이 춥습니다 감기
              조심하세요! 날이 많이 춥습니다 감기 조심하세요! 날이 많이 춥습니다
              감기 조심하세요! 날이 많이 춥습니다 감기 조심하세요! 날이 많이
              춥습니다 감기 조심하세요! 날이 많이 춥습니다 감기 조심하세요!
            </p>
            <button class="text-sm text-gray-400 absolute top-5 right-5">
              <i class="fas fa-ellipsis-h fa-fw"></i>
            </button>
          </div>
          <div class="border-b border-gray-200 px-5 py-3 relative">
            <img
              src="http://picsum.photos/100"
              alt=""
              class="w-12 h-12 rounded-full cursor-pointer hover:opacity-80"
            />
            <h4 class="mt-3"><b>방탄소년단</b> 님의 최근 트윗</h4>
            <p class="text-sm text-gray-500 my-2">
              날이 많이 춥습니다 감기 조심하세요! 날이 많이 춥습니다 감기
              조심하세요! 날이 많이 춥습니다 감기 조심하세요! 날이 많이 춥습니다
              감기 조심하세요! 날이 많이 춥습니다 감기 조심하세요! 날이 많이
              춥습니다 감기 조심하세요! 날이 많이 춥습니다 감기 조심하세요!
            </p>
            <button class="text-sm text-gray-400 absolute top-5 right-5">
              <i class="fas fa-ellipsis-h fa-fw"></i>
            </button>
          </div>
        </div>
      </div>
      <AppTrends />
    </div>
  </div>
</template>

<script>
import AppTrends from "@/components/AppTrends.vue";
export default {
  components: {
    AppTrends,
  },
  setup() {},
};
</script>

<style></style>
