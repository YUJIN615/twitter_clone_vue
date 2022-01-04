<template>
  <div
    class="
      lg:w-1/5
      w-20
      pt-5
      lg:ml-10
      flex flex-col
      justify-between
      border-r border-gray-200
    "
  >
    <div class="flex flex-col items-center lg:items-start">
      <!-- 로고 -->
      <i class="fab fa-twitter text-2xl text-primary lg:ml-4 mb-3"></i>
      <!--사이드 메뉴 -->
      <ul class="flex flex-col items-start font-medium text-gray-900">
        <li v-for="route in routes" :key="route">
          <div v-if="route.meta.isMenu">
            <router-link
              :to="route.path"
              class="
                block
                hover:text-primary hover:bg-blue-50
                px-4
                py-2
                my-1
                rounded-full
              "
            >
              <i :class="route.icon" class="fa-fw text-lg"></i>
              <span class="text-base ml-5 hidden lg:inline-block">
                {{ route.title }}
              </span>
            </router-link>
          </div>
        </li>
      </ul>
      <!-- 트윗 버튼 -->
      <div class="lg:w-full w-12 lg:pr-3">
        <button
          class="
            bg-primary
            text-white
            w-full
            h-12
            mt-3
            rounded-full
            text-base
            hover:bg-dark
          "
        >
          <span class="hidden lg:inline-block">트윗</span>
          <i class="fas fa-plus lg:hidden"></i>
        </button>
      </div>
    </div>
    <!-- 프로필 버튼 -->
    <div class="lg:pr-3 py-3">
      <button
        class="
          hidden
          lg:flex
          bg-gray-100
          w-full
          h-12
          px-2
          py-1
          rounded-full
          text-base
          hover:bg-gray-200
          items-center
        "
      >
        <img
          src="http://picsum.photos/100"
          alt=""
          class="w-10 h-10 rounded-full"
        />
        <div class="ml-2 hidden lg:block">
          <p class="text-sm font-bold">yujin</p>
          <p class="text-xs text-gray-500">@yujin</p>
        </div>
        <i class="fas fa-ellipsis-h fa-fw text-xs ml-auto hidden lg:block"></i>
      </button>

      <div
        class="lg:hidden flex justify-center cursor-pointer hover:opacity-80"
      >
        <button>
          <img
            src="http://picsum.photos/100"
            alt=""
            class="w-10 h-10 rounded-full"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import router from "@/router";

export default {
  setup() {
    const routes = ref([]);

    onBeforeMount(() => {
      routes.value = router.options.routes;
    });

    return { routes };
  },
};
</script>

<style></style>
