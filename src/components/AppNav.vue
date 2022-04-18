<template>
  <nav
    class="lg:w-1/5 w-20 pt-5 lg:ml-10 flex flex-col justify-between border-r border-gray-200 relative"
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
              :class="`block
                hover:text-primary hover:bg-blue-50
                xl:px-4
                px-3
                py-2
                my-1
                rounded-full
                ${
                  router.currentRoute.value.name == route.name
                    ? 'text-primary font-bold'
                    : ''
                }`"
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
          @click="$emit('onShowTweetModal')"
          class="bg-primary text-white w-full py-3 mt-3 rounded-full text-base hover:bg-dark"
        >
          <span class="hidden lg:inline-block">트윗</span>
          <i class="fas fa-plus lg:hidden"></i>
        </button>
      </div>
    </div>
    <!-- 프로필 버튼 -->
    <div class="lg:pr-3 py-3">
      <button
        class="hidden lg:flex bg-gray-100 w-full h-12 px-2 py-1 rounded-full text-base hover:bg-gray-200 items-center"
        @click="showProfileDropdown()"
      >
        <img
          :src="currentUser.profile_image_url"
          alt=""
          class="w-10 h-10 rounded-full object-cover"
        />
        <div class="ml-2 hidden lg:block">
          <p class="text-sm font-bold">{{ currentUser.email }}</p>
          <p class="text-xs text-gray-500 text-left">
            @{{ currentUser.username }}
          </p>
        </div>
        <i class="fas fa-ellipsis-h fa-fw text-xs ml-auto hidden lg:block"></i>
      </button>

      <div
        class="lg:hidden flex justify-center cursor-pointer hover:opacity-80"
      >
        <button>
          <img
            :src="currentUser.profile_image_url"
            alt=""
            class="w-10 h-10 rounded-full object-cover"
          />
        </button>
      </div>
    </div>
    <!-- 프로필 드롭다운 메뉴 -->
    <div
      class="absolute bottom-16 w-full lg:pr-3 mb-2 shadow rounded-lg bg-white"
      v-if="isProfileDropdown"
    >
      <button
        class="hidden lg:flex bg-gray-50 w-full h-12 px-2 py-1 rounded-full text-base hover:bg-gray-100 items-center"
      >
        <img
          :src="currentUser.profile_image_url"
          alt=""
          class="w-10 h-10 rounded-full object-cover"
        />
        <div class="ml-2 hidden lg:block">
          <p class="text-sm font-bold">{{ currentUser.email }}</p>
          <p class="text-xs text-gray-500 text-left">
            @{{ currentUser.username }}
          </p>
        </div>
        <i
          class="fas fa-check fa-fw text-xs text-primary ml-auto hidden lg:block"
        ></i>
      </button>
      <button class="py-3 px-4 text-xs text-gray-600" @click="onLogout()">
        @{{ currentUser.username }} 계정에서 로그아웃
      </button>
    </div>
  </nav>
</template>

<script>
import { ref, onBeforeMount, computed } from "vue";
import router from "@/router";
import { auth } from "../firebase";
import store from "../store";

export default {
  setup() {
    const routes = ref([]);
    const isProfileDropdown = ref(false);

    // 현재 사용자 정보 가져오기
    const currentUser = computed(() => store.state.user);

    const showProfileDropdown = () => {
      isProfileDropdown.value = !isProfileDropdown.value;
    };
    // 로그아웃
    const onLogout = async () => {
      await auth.signOut();
      // 상태에 null을 넣어줌
      store.commit("SET_USER", null);
      router.replace("/login");
    };

    onBeforeMount(() => {
      routes.value = router.options.routes;
    });

    return {
      routes,
      isProfileDropdown,
      showProfileDropdown,
      onLogout,
      currentUser,
      router,
    };
  },
};
</script>

<style></style>
