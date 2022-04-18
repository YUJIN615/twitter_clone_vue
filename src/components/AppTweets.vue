<template>
  <!-- 트윗 -->
  <div
    class="px-3 pt-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
  >
    <div class="flex">
      <!-- 프로필 사진 -->
      <div class="w-20" v-if="tweet.profile_image_url">
        <router-link :to="`/profile/${tweet.uid}`">
          <img
            :src="tweet.profile_image_url"
            alt=""
            class="w-12 h-12 rounded-full cursor-pointer hover:opacity-80 object-cover"
          />
        </router-link>
      </div>
      <div class="flex flex-col w-full text-medium">
        <!-- 프로필 -->
        <div class="flex justify-between items-center mb-1">
          <div>
            <strong>{{ tweet.email }}</strong>
            <span class="text-gray-500 mx-2">@{{ tweet.username }}</span>
            <span class="text-gray-500 text-sm">{{
              moment(tweet.created_at).fromNow()
            }}</span>
          </div>
          <!-- 트윗 삭제 버튼 -->
          <button
            @click="onDeletTweet(tweet)"
            v-if="tweet.uid === currentUser.uid"
          >
            <i
              class="fas fa-trash text-gray-400 w-10 p-2 text-xs hover:text-gray-500"
            ></i>
          </button>
        </div>
        <!-- 내용 -->
        <div class="text-gray-700 leading-5">
          <router-link :to="`/tweet/${tweet.id}`">
            {{ tweet.tweet_body }}
          </router-link>
        </div>
        <div class="flex justify-between w-5/6 text-gray-400">
          <!-- 코멘트 버튼 -->
          <button
            @click="isShowCommentModal = true"
            class="hover:text-primary py-3"
          >
            <i class="far fa-comment"></i>
            <span class="text-sm mx-3">{{ tweet.num_comments }}</span>
          </button>
          <!-- 리트윗 버튼 -->
          <button
            v-if="!tweet.isRetweeted"
            @click="handleRetweet(tweet)"
            class="hover:text-green-500 py-3"
          >
            <i class="fas fa-retweet"></i>
            <span class="text-sm mx-3">{{ tweet.num_retweets }}</span>
          </button>
          <button
            v-else
            @click="handleRetweet(tweet)"
            class="text-green-400 py-3"
          >
            <i class="fas fa-retweet"></i>
            <span class="text-sm mx-3">{{ tweet.num_retweets }}</span>
          </button>
          <!-- 좋아요 버튼 -->
          <button
            v-if="!tweet.isLiked"
            @click="handleLikes(tweet)"
            class="hover:text-red-400 py-3"
          >
            <i class="far fa-heart"></i>
            <span class="text-sm mx-3">{{ tweet.num_likes }}</span>
          </button>
          <button v-else @click="handleLikes(tweet)" class="text-red-400 py-3">
            <i class="far fa-heart"></i>
            <span class="text-sm mx-3">{{ tweet.num_likes }}</span>
          </button>
          <!-- 공유 버튼 -->
          <button class="hover:text-primary py-3">
            <i class="fas fa-external-link-alt"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- 코멘트 모달 -->
  <CommentModal
    v-if="isShowCommentModal"
    @closeCommenttModal="isShowCommentModal = false"
    :tweet="tweet"
  />
</template>

<script>
import { ref } from "vue";
import moment from "moment";
import CommentModal from "./CommentModal.vue";
import handleRetweet from "@/utils/handleRetweet";
import handleLikes from "@/utils/handleLikes";
import {
  COMMENT_COLLECTION,
  LIKE_COLLECTION,
  RETWEET_COLLECTION,
  TWEET_COLLECTION,
  USER_COLLECTION,
} from "@/firebase";
import firebase from "firebase/compat";

export default {
  components: { CommentModal },
  props: ["currentUser", "tweet"],
  setup() {
    // 코멘트 모달 상태
    const isShowCommentModal = ref(false);
    const onDeletTweet = async (tweet) => {
      // 얼럿 띄우기
      if (confirm("트윗을 삭제하시겠습니까?"))
        // 트윗 지우기
        await TWEET_COLLECTION.doc(tweet.id).delete();

      // 코멘트 지우기
      const commentSnapshot = await COMMENT_COLLECTION.where(
        "from_tweet_id",
        "==",
        tweet.id
      ).get();
      commentSnapshot.docs.forEach(async (doc) => await doc.ref.delete());

      // 좋아요 지우기
      const likeSnapshot = await LIKE_COLLECTION.where(
        "from_tweet_id",
        "==",
        tweet.id
      ).get();
      likeSnapshot.docs.forEach(async (doc) => await doc.ref.delete());

      // 리트윗 지우기
      const retweetSnapshot = await RETWEET_COLLECTION.where(
        "from_tweet_id",
        "==",
        tweet.id
      ).get();
      retweetSnapshot.docs.forEach(async (doc) => await doc.ref.delete());

      // 유저정보에서 트윗 숫자 -1 하기
      USER_COLLECTION.doc(tweet.uid).update({
        num_tweets: firebase.firestore.FieldValue.increment(-1),
      });
    };
    return {
      moment,
      isShowCommentModal,
      handleRetweet,
      handleLikes,
      onDeletTweet,
    };
  },
};
</script>

<style></style>
