<template>
  <div class="flex-1" v-if="profileUser">
    <div class="flex h-screen">
      <div class="flex-1 border-r borer-gray-100 overflow-y-auto">
        <!-- 타이틀 -->
        <div class="flex flex-col px-3 py-2">
          <div class="flex">
            <button
              class="mr-5 hover:bg-gray-50 p-2 rounded-full h-10 w-10"
              @click="router.go(-1)"
            >
              <i class="fas fa-arrow-left"></i>
            </button>
            <div>
              <div class="text-lg font-bold">이유진</div>
              <div class="text-sm font-gray-400">
                {{ profileUser.num_tweets }} 트윗
              </div>
            </div>
          </div>
        </div>
        <!-- 배경 사진 -->
        <div class="w-full h-1/4 overflow-hidden">
          <img
            :src="profileUser.background_image_url"
            alt=""
            class="w-full object-cover"
          />
        </div>
        <!-- 프로필 -->
        <div class="px-5">
          <!-- 프로필 사진 -->
          <div class="flex justify-between">
            <img
              :src="profileUser.profile_image_url"
              alt=""
              class="block w-32 h-32 rounded-full border-white border-4 mt-[-75px] cursor-pointer object-cover"
            />
            <!-- 내 프로필 페이지일 때 -->
            <div v-if="currentUser.uid === profileUser.uid">
              <button
                class="px-3 py-2 rounded-full border border-primary text-primary mt-3 text-sm font-bold hover:bg-blue-50"
                @click="showProfileEditModal = true"
              >
                프로필 수정
              </button>
            </div>
            <!-- 다른 유저의 프로필 페이지일 때 -->
            <div v-else>
              <!-- 팔로잉한 유저일 때 -->
              <div
                v-if="currentUser.followings.includes(profileUser.uid)"
                class="relative w-24"
                @click="onUnFollow"
              >
                <button
                  class="absolute top-0 left-0 w-24 py-2 rounded-full bg-red-400 text-white mt-3 text-sm font-bold"
                >
                  언팔로우
                </button>
                <button
                  class="absolute top-0 left-0 w-24 py-2 rounded-full bg-primary text-white mt-3 text-sm font-bold hover:opacity-0"
                >
                  팔로잉
                </button>
              </div>
              <!-- 팔로잉하지 않은 유저일 때 -->
              <div v-else @click="onFollow">
                <button
                  class="w-24 py-2 rounded-full border border-primary text-primary mt-3 text-sm font-bold hover:bg-blue-50"
                >
                  팔로우
                </button>
              </div>
            </div>
          </div>
          <!-- 프로필 정보 -->
          <div class="mt-3 text-lg font-bold">{{ profileUser.email }}</div>
          <div class="text-gray-600">@{{ profileUser.username }}</div>
          <div class="text-gray-600 text-sm my-3">
            <i class="far fa-calendar-alt"></i> 가입일:
            {{ moment(profileUser.created_at).format("YYYY년 MM일") }}
          </div>
          <div>
            <span class="mr-5">
              <b>{{ profileUser.followings.length }}</b>
              팔로우 중
            </span>
            <span>
              <b>{{ profileUser.followers.length }}</b>
              팔로워
            </span>
          </div>
        </div>
        <!-- 탭 버튼 -->
        <ul
          class="flex justify-between mt-5 border-b border-gray-100 text-gray-700"
        >
          <li class="flex-1">
            <button
              @click="currentTab = 'tweet'"
              :class="`${
                currentTab === 'tweet'
                  ? 'border-b border-primary text-primary font-bold'
                  : ''
              } w-full py-4 hover:bg-blue-50`"
            >
              트윗
            </button>
          </li>
          <li class="flex-1">
            <button
              @click="currentTab = 'retweet'"
              :class="`${
                currentTab === 'retweet'
                  ? 'border-b border-primary text-primary font-bold'
                  : ''
              } w-full py-4 hover:bg-blue-50`"
            >
              리트윗
            </button>
          </li>
          <li class="flex-1">
            <button
              @click="currentTab = 'like'"
              :class="`${
                currentTab === 'like'
                  ? 'border-b border-primary text-primary font-bold'
                  : ''
              } w-full py-4 hover:bg-blue-50`"
            >
              마음에 들어요
            </button>
          </li>
        </ul>
        <!-- 트윗 -->
        <AppTweets
          v-for="tweet in currentTab == 'tweet'
            ? tweets
            : currentTab == 'retweet'
            ? reTweets
            : likeTweets"
          :key="tweet.id"
          :currentUser="currentUser"
          :tweet="tweet"
        />
      </div>
      <AppTrends />
    </div>
    <profile-edit-modal
      v-if="showProfileEditModal"
      @close-modal="showProfileEditModal = false"
    />
  </div>
</template>

<script>
import AppTrends from "@/components/AppTrends.vue";
import AppTweets from "@/components/AppTweets.vue";
import store from "@/store";
import { computed, ref, onBeforeMount } from "vue";
import moment from "moment";
import {
  LIKE_COLLECTION,
  TWEET_COLLECTION,
  RETWEET_COLLECTION,
  USER_COLLECTION,
} from "@/firebase";
import getTweetInfo from "@/utils/getTweetInfo";
import router from "@/router";
import { useRoute } from "vue-router";
import ProfileEditModal from "@/components/ProfileEditModal.vue";
import firebase from "firebase/compat";

export default {
  components: {
    AppTrends,
    AppTweets,
    ProfileEditModal,
  },
  setup() {
    const currentUser = computed(() => store.state.user);
    const profileUser = ref(null);
    const tweets = ref([]);
    const reTweets = ref([]);
    const likeTweets = ref([]);
    const currentTab = ref("tweet");
    const route = useRoute();
    const showProfileEditModal = ref(false);

    onBeforeMount(() => {
      // 라우터의 파라미터의 id 불러오기
      const profileUID = route.params.uid ?? currentUser.value.uid;

      // 트윗 등록했을 때 트윗수 증가된것을 반영시키기 위해 유저 컬렉션에서 바뀐 부문이 있으면 가져온다.
      USER_COLLECTION.doc(profileUID).onSnapshot((doc) => {
        // 프로필유저 변수에 가져온 값을 담는다.
        profileUser.value = doc.data();
      });

      // 현재 유저의 트윗 정보 가져오기
      // 현재 유저의 uid와 동일한 uid인 트윗을 가져오는 조건을 추가한다.
      TWEET_COLLECTION.where("uid", "==", profileUID)
        .orderBy("created_at", "desc")
        .onSnapshot((snapshot) => {
          console.log(snapshot);
          snapshot.docChanges().forEach(async (change) => {
            // 유저 정보를 비동기로 가져왔으므로 여기도 비동기로 처리해야 한다.
            let tweet = await getTweetInfo(
              change.doc.data(),
              currentUser.value
            );
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

      // 현재 유저가 리트윗한 트윗 가져오기
      RETWEET_COLLECTION.where("uid", "==", profileUID)
        // .orderBy("created_at", "desc")
        .onSnapshot((snapshot) => {
          console.log(profileUID);
          console.log(snapshot);
          snapshot.docChanges().forEach(async (change) => {
            console.log(change);

            // 트윗 바디의 내용을 가져오기 위해 트윗 아이디를 가져온다.
            const doc = await TWEET_COLLECTION.doc(
              change.doc.data().from_tweet_id
            ).get();
            // 트윗 아이디에서 트윗 바디 정보를 가져온다.
            let tweet = await getTweetInfo(doc.data(), currentUser.value);

            console.log(tweet);

            if (change.type === "added") {
              reTweets.value.splice(change.newIndex, 0, tweet);
              // 수정됐을 때, 첫번째 index 내용 삭제하고 추가
            } else if (change.type === "modified") {
              reTweets.value.splice(change.oldIndex, 1, tweet);
              // 삭제됐을 때, 첫번째 index 내용 삭제
            } else if (change.type === "removed") {
              reTweets.value.splice(change.oldIndex, 1);
            }
          });
        });

      // 현재 유저가 좋아요한 트윗 가져오기
      LIKE_COLLECTION.where("uid", "==", profileUID)
        // .orderBy("created_at", "desc")
        .onSnapshot((snapshot) => {
          snapshot.docChanges().forEach(async (change) => {
            // 트윗 바디의 내용을 가져오기 위해 트윗 아이디를 가져온다.
            const doc = await TWEET_COLLECTION.doc(
              change.doc.data().from_tweet_id
            ).get();
            let tweet = await getTweetInfo(doc.data(), currentUser.value);
            if (change.type === "added") {
              likeTweets.value.splice(change.newIndex, 0, tweet);
              // 수정됐을 때, 첫번째 index 내용 삭제하고 추가
            } else if (change.type === "modified") {
              likeTweets.value.splice(change.oldIndex, 1, tweet);
              // 삭제됐을 때, 첫번째 index 내용 삭제
            } else if (change.type === "removed") {
              likeTweets.value.splice(change.oldIndex, 1);
            }
          });
        });
    });

    // 팔로우 하기
    const onFollow = async () => {
      await USER_COLLECTION.doc(currentUser.value.uid).update({
        // 현재 유저의 followings에 프로필유저의 uid를 넣는다.
        followings: firebase.firestore.FieldValue.arrayUnion(
          profileUser.value.uid
        ),
      });

      await USER_COLLECTION.doc(profileUser.value.uid).update({
        // 프로필 유저의 followers에 현재 유저의 uid를 넣는다.
        followers: firebase.firestore.FieldValue.arrayUnion(
          currentUser.value.uid
        ),
      });

      // 스토어 상태값 업데이트
      store.commit("SET_FOLLOW", profileUser.value.uid);
    };

    // 언팔로우 하기
    const onUnFollow = async () => {
      await USER_COLLECTION.doc(currentUser.value.uid).update({
        // 현재 유저의 followings에서 프로필유저의 uid를 삭제한다.
        followings: firebase.firestore.FieldValue.arrayRemove(
          profileUser.value.uid
        ),
      });

      await USER_COLLECTION.doc(profileUser.value.uid).update({
        // 프로필 유저의 followers에서 현재 유저의 uid를 삭제한다.
        followers: firebase.firestore.FieldValue.arrayRemove(
          currentUser.value.uid
        ),
      });

      // 스토어 상태값 업데이트
      store.commit("SET_UNFOLLOW", profileUser.value.uid);
    };

    return {
      currentUser,
      moment,
      tweets,
      router,
      currentTab,
      reTweets,
      likeTweets,
      profileUser,
      showProfileEditModal,
      onUnFollow,
      onFollow,
    };
  },
};
</script>

<style></style>
