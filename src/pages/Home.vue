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
                :src="currentUser.profile_image_url"
                alt=""
                class="w-12 h-12 rounded-full cursor-pointer hover:opacity-80 object-cover"
              />
              <textarea
                placeholder="무슨 일이 일어나고 있나요?"
                class="w-full color-slate-800 px-3 pt-3 outline-none"
                v-model="tweetBody"
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
                v-if="!tweetBody.length"
                class="w-24 h-9 bg-light text-white rounded-3xl mr-3 font-bold"
                disabled
              >
                트윗하기
              </button>
              <button
                v-else
                @click="onAddTweet()"
                class="w-24 h-9 bg-primary text-white rounded-3xl mr-3 font-bold"
              >
                트윗하기
              </button>
            </div>
          </div>
          <!-- 트윗 -->
          <AppTweets
            :currentUser="currentUser"
            :tweet="tweet"
            v-for="tweet in tweets"
            :key="tweet.id"
          />
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
import { ref, computed, onBeforeMount } from "vue";
import store from "@/store";
import { TWEET_COLLECTION } from "@/firebase";
import addTweet from "@/utils/addTweet";
import getTweetInfo from "@/utils/getTweetInfo";

export default {
  components: {
    AppTrends,
    AppTweets,
  },
  setup() {
    const tweetBody = ref("");
    // 스토어에서 현재 사용자 정보 가져오기
    const currentUser = computed(() => store.state.user);
    const tweets = ref([]);

    // mount되기 전에 트윗한 내용 가져오기
    onBeforeMount(() => {
      // snapshot을 이용해서 바뀐 snapshot을 반복문으로 돌린다.
      // orderBy로 작성날짜 기준 내림차순이 되도록 한다.
      TWEET_COLLECTION.orderBy("created_at", "desc").onSnapshot((snapshot) => {
        snapshot.docChanges().forEach(async (change) => {
          // 유저 정보를 비동기로 가져왔으므로 여기도 비동기로 처리해야 한다.
          let tweet = await getTweetInfo(change.doc.data(), currentUser.value);
          // console.log(tweet);

          // snapshot 유형에 따라 바꾼다
          // 추가됐을 때, 첫번째 index에 추가
          if (change.type === "added") {
            tweets.value.splice(change.newIndex, 0, tweet);
            // 수정됐을 때, 첫번째 index 내용 삭제하고 추가
          } else if (change.type === "modified") {
            tweets.value.splice(change.oldIndex, 1, tweet);
            // 삭제됐을 때, 첫번째 index 내용 삭제
          } else if (change.type === "removed") {
            tweets.value.splice(change.oldIndex, 1);
          }
        });
      });
    });

    // 작성한 트윗 추가하기
    const onAddTweet = async () => {
      try {
        // utils에 있는 addTweet을 불러옴
        // promise를 return 했으므로 await를 사용
        // tweetBody와 currentUser를 넘겨줌.
        await addTweet(tweetBody.value, currentUser.value);
        tweetBody.value = "";
      } catch (e) {
        console.log(`error:`, e);
      }
    };

    return { tweetBody, currentUser, onAddTweet, tweets };
  },
};
</script>

<style></style>
