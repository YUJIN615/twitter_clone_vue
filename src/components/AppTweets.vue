<template>
  <!-- 트윗 -->
  <div
    class="px-3 pt-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
  >
    <div class="flex">
      <!-- 프로필 사진 -->
      <div class="w-16">
        <img
          src="http://picsum.photos/100"
          alt=""
          class="w-12 h-12 rounded-full cursor-pointer hover:opacity-80"
        />
      </div>
      <div class="flex flex-col w-full text-medium">
        <!-- 프로필 -->
        <div>
          <strong>방탄소년단</strong>
          <span class="text-gray-500 mx-2">@BTS_twt</span>
          <span class="text-gray-500 text-sm">12월 18일</span>
        </div>
        <!-- 내용 -->
        <div class="text-gray-700 leading-5">
          날이 많이 춥습니다. <br />감기 조심하세요!
        </div>
        <div class="text-primary">#JIMIN</div>
        <!-- 아이콘 버튼 -->
        <div class="flex justify-between w-5/6 text-gray-400">
          <button class="hover:text-primary py-3">
            <i class="fab fa-speakap"></i>
            <span class="text-sm mx-3">6.8만</span>
          </button>
          <button class="hover:text-primary py-3">
            <i class="fas fa-retweet"></i>
            <span class="text-sm mx-3">39.8만</span>
          </button>
          <button class="hover:text-primary py-3">
            <i class="far fa-heart"></i>
            <span class="text-sm mx-3">149만</span>
          </button>
          <button class="hover:text-primary py-3">
            <i class="fas fa-external-link-alt"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
