<template>
  <div class="flex-1">
    <div class="flex h-screen">
      <div class="flex-1 border-r borer-gray-100 overflow-y-auto">
        <!-- 타이틀 -->
        <div class="flex flex-col px-3 py-2">
          <div class="flex">
            <button class="p-3 mr-5"><i class="fas fa-arrow-left"></i></button>
            <div>
              <div class="text-lg font-bold">이유진</div>
              <div class="text-sm font-gray-400">0 트윗</div>
            </div>
          </div>
        </div>
        <!-- 배경 사진 -->
        <div class="w-full h-1/4 overflow-hidden">
          <img src="http://picsum.photos/400" alt="" class="w-full" />
        </div>
        <!-- 프로필 -->
        <div class="px-5">
          <!-- 프로필 사진 -->
          <div class="flex justify-between">
            <img
              src="http://picsum.photos/130"
              alt=""
              class="
                w-130
                h-130
                rounded-full
                border-white border-4
                mt-[-75px]
                cursor-pointer
              "
            />
            <div class="">
              <button
                class="
                  px-4
                  py-2
                  rounded-full
                  border border-gray-300
                  mt-3
                  text-sm
                  font-bold
                  hover:bg-gray-200
                "
              >
                프로필 수정
              </button>
            </div>
          </div>
          <!-- 프로필 정보 -->
          <div class="mt-3 text-lg font-bold">이유진</div>
          <div class="text-gray-600">@yujin12345</div>
          <div class="text-gray-600 text-sm my-3">
            <i class="far fa-calendar-alt"></i> 가입일: 2021년 12월
          </div>
          <div>
            <span class="mr-5"><b>3</b> 팔로우 중</span>
            <span><b>0</b> 팔로워</span>
          </div>
        </div>
        <!-- 탭 버튼 -->
        <ul
          class="
            flex
            justify-between
            mt-5
            border-b border-gray-100
            text-gray-700
          "
        >
          <li class="flex-1">
            <button
              class="
                w-full
                py-4
                hover:bg-gray-200
                font-bold
                border-b border-primary
              "
            >
              트윗
            </button>
          </li>
          <li class="flex-1">
            <button class="w-full py-4 hover:bg-gray-200">트윗 및 답글</button>
          </li>
          <li class="flex-1">
            <button class="w-full py-4 hover:bg-gray-200">미디어</button>
          </li>
          <li class="flex-1">
            <button class="w-full py-4 hover:bg-gray-200">마음에 들어요</button>
          </li>
        </ul>
        <!-- 트윗 -->
        <AppTweets v-for="tweet in 10" :key="tweet" />
      </div>
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
