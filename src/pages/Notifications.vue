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
        <div v-for="notification in notifications" :key="notification.id">
          <div class="border-b border-gray-200 px-5 py-3 relative">
            <router-link :to="`/profile/${notification.uid}`">
              <img
                :src="notification.profile_image_url"
                alt=""
                class="w-12 h-12 rounded-full cursor-pointer object-cover hover:opacity-80"
              />
            </router-link>
            <h4 class="mt-3">
              <b>{{ notification.username }}</b> 님의 최근 트윗
            </h4>
            <router-link :to="`/tweet/${notification.id}`">
              <p class="text-sm text-gray-500 my-2">
                {{ notification.tweet_body }}
              </p>
            </router-link>
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
import { ref, computed, onBeforeMount } from "vue";
import store from "@/store";
import { TWEET_COLLECTION } from "@/firebase";
import getTweetInfo from "@/utils/getTweetInfo";

export default {
  components: {
    AppTrends,
  },
  setup() {
    const currentUser = computed(() => store.state.user);
    const notifications = ref([]);

    onBeforeMount(() => {
      // 현재 유저의 팔로잉 배열에 있는 값 돌리기
      currentUser.value.followings.forEach(async (following) => {
        // 최근 일주일의 트윗만 가져오기
        const dateForm = Date.now() - 60 * 60 * 24 * 7 * 1000;

        // 팔로잉과 uid가 일치하는 값 가져오기
        const snapshot = await TWEET_COLLECTION.where(
          "created_at",
          ">",
          dateForm
        )
          .where("uid", "==", following)
          .orderBy("created_at", "desc")
          .get();

        // 일치하는 값을 돌려서 트윗 정보 가져오기
        snapshot.docs.forEach(async (doc) => {
          let tweet = await getTweetInfo(doc.data(), currentUser.value);
          // notification에 트윗 정보 넣기
          notifications.value.push(tweet);
          console.log(tweet);
        });
      });
    });

    return { currentUser, notifications };
  },
};
</script>

<style></style>
