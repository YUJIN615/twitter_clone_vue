<template>
  <div class="flex-1">
    <div class="flex h-screen">
      <!-- 트윗 섹션 -->
      <div class="flex-1 border-r borer-gray-100 overflow-y-auto">
        <!-- 타이틀 -->
        <div class="flex items-center px-3 py-2 border-b border-gray-100">
          <button @click="router.go(-1)">
            <i
              class="fas fa-arrow-left text-primary text-lg ml-3 hover:bg-blue-50 p-2 rounded-full h-10 w-10"
            ></i>
            <span class="font-bold text-lg ml-10">트윗</span>
          </button>
        </div>
        <!-- 트윗 프로필 -->
        <div class="px-4 py-3 flex">
          <img
            :src="tweet.profile_image_url"
            alt=""
            class="w-10 h-10 rounded-full hover:opacity-90 cursor-pointer"
          />
          <div class="ml-3">
            <span class="block font-bold">{{ tweet.email }}</span>
            <span class="block text-gray-500 text-sm"
              >@{{ tweet.username }}</span
            >
          </div>
        </div>
        <!-- 트윗 본문 -->
        <div class="px-4 py-3">{{ tweet.tweet_body }}</div>
        <div class="px-4 py-3 border-b border-gray-100">
          {{ moment(tweet.created_at).fromNow() }}
        </div>
        <!-- 트윗 정보 -->
        <div class="px-4 py-3 flex space-x-5 border-b border-gray-100">
          <div class="text-gray-500">
            <span class="font-bold text-black mr-1">
              {{ tweet.num_retweets }}
            </span>
            리트윗
          </div>
          <div class="text-gray-500">
            <span class="font-bold text-black mr-1">
              {{ tweet.num_likes }}
            </span>
            마음에 들어요
          </div>
        </div>
        <!-- 버튼 -->
        <div
          class="px-3 flex justify-around text-gray-400 border-b border-gray-100"
        >
          <!-- 코멘트 버튼 -->
          <button
            class="hover:text-primary py-3"
            @click="isShowCommentModal = true"
          >
            <i class="far fa-comment"></i>
          </button>
          <!-- 리트윗 버튼 -->
          <button
            v-if="!tweet.isRetweeted"
            class="hover:text-green-500 py-3"
            @click="handleRetweet(tweet)"
          >
            <i class="fas fa-retweet"></i>
          </button>
          <button
            v-else
            class="text-green-500 py-3"
            @click="handleRetweet(tweet)"
          >
            <i class="fas fa-retweet"></i>
          </button>
          <!-- 좋아요 버튼 -->
          <button
            v-if="!tweet.isLiked"
            class="hover:text-red-400 py-3"
            @click="handleLikes(tweet)"
          >
            <i class="far fa-heart"></i>
          </button>
          <button v-else class="text-red-400 py-3" @click="handleLikes(tweet)">
            <i class="far fa-heart"></i>
          </button>
          <!-- 공유 버튼 -->
          <button class="hover:text-primary py-3">
            <i class="fas fa-external-link-alt"></i>
          </button>
        </div>
        <!-- 코멘트 -->
        <div v-if="isShowComment">
          <div
            class="px-4 py-3 flex hover:bg-gray-100 cursor-pointer border-b border-gray-100"
            v-for="comment in comments"
            :key="comment"
          >
            <img
              :src="comment.profile_image_url"
              alt=""
              class="w-10 h-10 rounded-full mr-2 hover:opacity-90 cursor-pointer"
            />
            <div class="flex-1">
              <span class="font-bold">{{ comment.email }}</span>
              <span class="text-gray-500 text-sm ml-2"
                >@{{ comment.username }}</span
              >
              <span class="text-gray-800 text-sm ml-2">
                {{ moment(comment.created_at).fromNow() }}
              </span>
              <div class="text-black">
                {{ comment.comment_tweet_body }}
              </div>
            </div>
            <!-- 코멘트 삭제 버튼 -->
            <button
              v-if="comment.uid === currentUser.uid"
              @click="handleDeleteComment(comment)"
            >
              <i
                class="fas fa-trash text-gray-400 w-10 h-10 text-sm hover:text-gray-500"
              ></i>
            </button>
          </div>
        </div>
      </div>

      <!-- 트렌드 섹션 -->
      <AppTrends />
    </div>
    <comment-modal
      v-if="isShowCommentModal"
      @closeCommenttModal="isShowCommentModal = false"
      :tweet="tweet"
    />
  </div>
</template>

<script>
import AppTrends from "@/components/AppTrends.vue";
import router from "@/router/index.js";
import { onBeforeMount, ref, computed } from "vue";
import store from "@/store/index.js";
import { TWEET_COLLECTION, COMMENT_COLLECTION } from "@/firebase/index.js";
import { useRoute } from "vue-router";
import getTweetInfo from "@/utils/getTweetInfo.js";
import moment from "moment";
import CommentModal from "@/components/CommentModal.vue";
import handleRetweet from "@/utils/handleRetweet.js";
import handleLikes from "@/utils/handleLikes.js";
import firebase from "firebase/compat";

export default {
  components: {
    AppTrends,
    CommentModal,
  },
  setup() {
    const route = useRoute();
    const tweet = ref({});
    const comments = ref([]);
    const currentUser = computed(() => store.state.user);
    let isShowCommentModal = ref(false);
    let isShowComment = ref(false);

    const handleDeleteComment = async (comment) => {
      if (confirm("코멘트를 삭제하시겠습니까?")) {
        // 코멘트 삭제하기
        await COMMENT_COLLECTION.doc(comment.id).delete();

        // 코멘트 수 줄이기
        await TWEET_COLLECTION.doc(comment.from_tweet_id).update({
          num_comments: firebase.firestore.FieldValue.increment(-1),
        });
      }
    };

    onBeforeMount(async () => {
      // 라우터를 통해서 유저의 id를 가져온다.
      // 트윗 정보 불러오기
      await TWEET_COLLECTION.doc(route.params.id).onSnapshot(async (doc) => {
        const t = await getTweetInfo(doc.data(), currentUser.value);
        tweet.value = t;

        // snapshot을 이용해서 바뀐 snapshot을 반복문으로 돌린다.
        // orderBy로 작성날짜 기준 내림차순이 되도록 한다.
        COMMENT_COLLECTION.orderBy("created_at", "desc").onSnapshot(
          (snapshot) => {
            snapshot.docChanges().forEach(async (change) => {
              // 유저 정보를 비동기로 가져왔으므로 여기도 비동기로 처리해야 한다.
              let comment = await getTweetInfo(
                change.doc.data(),
                currentUser.value
              );

              // snapshot 유형에 따라 바꾼다
              // 추가됐을 때, 첫번째 index에 추가
              if (change.type === "added") {
                comments.value.splice(change.newIndex, 0, comment);
                // 수정됐을 때, 첫번째 index 내용 삭제하고 추가
              } else if (change.type === "modified") {
                comments.value.splice(change.oldIndex, 1, comment);
                // 삭제됐을 때, 첫번째 index 내용 삭제
              } else if (change.type === "removed") {
                comments.value.splice(change.oldIndex, 1);
              }

              // 코멘트가 해당 트윗의 코멘트인지 확인
              if (tweet.value.id === comment.from_tweet_id) {
                isShowComment.value = true;
              }
            });
          }
        );
      });
    });

    return {
      router,
      tweet,
      comments,
      currentUser,
      moment,
      isShowCommentModal,
      handleRetweet,
      handleLikes,
      handleDeleteComment,
      isShowComment,
    };
  },
};
</script>

<style></style>
