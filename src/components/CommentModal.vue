<template>
  <div
    class="fixed z-10 inset-0 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="flex justify-center min-h-screen text-center sm:pt-8 sm:block sm:p-0"
    >
      <div
        class="fixed inset-0 bg-black bg-opacity-40 transition-opacity"
        aria-hidden="true"
        @click="$emit('closeCommenttModal')"
      ></div>
      <div
        class="inline-block bg-white w-full sm:rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg"
      >
        <div class="bg-white px-3 pt-3 pb-3 sm:p-5 sm:pb-3 flex-col">
          <!-- 닫기 버튼 -->
          <div class="flex justify-between">
            <button
              @click="$emit('closeCommenttModal')"
              class="fas fa-times text-primary mb-4 hover:bg-lighter px-3 py-2 rounded-full"
            ></button>
            <!-- 트윗 버튼 -->
            <div class="sm:hidden mr-2">
              <button
                v-if="!tweetBody.length"
                class="bg-light text-white px-5 py-2 rounded-full font-bold"
                disabled
              >
                트윗하기
              </button>
              <button
                v-else
                @click="onAddComment()"
                class="bg-primary text-white px-5 py-2 rounded-full font-bold"
              >
                트윗하기
              </button>
            </div>
          </div>
          <!-- 트윗 내용 -->
          <div class="flex mb-3">
            <!-- 프로필 사진 -->
            <div class="flex flex-col w-16">
              <img
                :src="tweet.profile_image_url"
                alt=""
                class="w-12 h-12 rounded-full cursor-pointer hover:opacity-80"
              />
              <div class="h-full ml-6 border-l-2 border-gray-200"></div>
            </div>
            <div class="flex flex-col w-full text-medium">
              <!-- 유저 정보 -->
              <div class="mb-1">
                <strong class="text-sm">{{ tweet.email }}</strong>
                <span class="text-gray-500 mx-2 text-sm"
                  >@{{ tweet.username }}</span
                >
                <span class="text-gray-500 text-sm">{{
                  moment(tweet.created_at).fromNow()
                }}</span>
              </div>
              <!-- 내용 -->
              <div class="text-gray-700 leading-5 text-sm">
                {{ tweet.tweet_body }}
              </div>
              <div class="my-3 text-sm text-gray-400">
                <span class="text-primary">@{{ tweet.username }}</span> 님에게
                보내는 답글
              </div>
            </div>
          </div>
          <!-- 답글 -->
          <div>
            <div class="flex">
              <div>
                <img
                  :src="currentUser.profile_image_url"
                  alt=""
                  class="w-12 h-12 rounded-full cursor-pointer hover:opacity-80 mr-4"
                />
              </div>
              <div class="flex-1">
                <textarea
                  class="w-full pt-3 block outline-none"
                  rows="4"
                  placeholder="내 답글을 트윗합니다."
                  v-model="tweetBody"
                ></textarea>
                <div class="flex justify-between mt-3">
                  <div></div>
                  <!-- 트윗 버튼 -->
                  <div class="hidden sm:block">
                    <button
                      v-if="!tweetBody.length"
                      class="bg-light text-white px-5 py-2 rounded-full font-bold"
                      disabled
                    >
                      답글
                    </button>
                    <button
                      v-else
                      @click="onAddComment()"
                      class="bg-primary text-white px-5 py-2 rounded-full font-bold"
                    >
                      답글
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import store from "../store";
import moment from "moment";
import { COMMENT_COLLECTION, TWEET_COLLECTION } from "../firebase";
// 파이어스토어에서 제공되는 기능 사용하기 위해 firebase import
import firebase from "firebase/compat/app";

export default {
  props: ["tweet"],
  // setup의 인자로 props와 emit 가져오기
  setup(props, { emit }) {
    const tweetBody = ref("");
    // 스토어에서 현재 사용자 정복 불러오기
    const currentUser = computed(() => store.state.user);

    // 코멘트 추가하기
    const onAddComment = async () => {
      try {
        // 코멘트 컬렉션 문서 불러오기
        const doc = COMMENT_COLLECTION.doc();
        // 도큐먼트에 정보 입력하기
        await doc.set({
          id: doc.id, // 컬렉션에서 만든 id
          from_tweet_id: props.tweet.id,
          comment_tweet_body: tweetBody.value,
          uid: currentUser.value.uid,
          created_at: Date.now(),
        });
        // 코멘트 수 1 증가시키기
        await TWEET_COLLECTION.doc(props.tweet.id).update({
          // firebase에서 제공되는 기능
          num_comments: firebase.firestore.FieldValue.increment(1),
        });
        emit("closeCommenttModal");
      } catch (e) {
        console.log(`error:`, e);
      }
    };

    return {
      tweetBody,
      currentUser,
      moment,
      onAddComment,
    };
  },
};
</script>

<style></style>
