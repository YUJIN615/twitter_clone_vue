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
        @click="$emit('closeTweetModal')"
      ></div>
      <div
        class="inline-block bg-white w-full sm:rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg"
      >
        <div class="bg-white px-3 pt-3 pb-3 sm:p-5 sm:pb-3">
          <div class="flex justify-between">
            <button
              @click="$emit('closeTweetModal')"
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
                @click="onAddTweet()"
                class="bg-primary text-white px-5 py-2 rounded-full font-bold"
              >
                트윗하기
              </button>
            </div>
          </div>
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
                placeholder="무슨 일이 일어나고 있나요?"
                v-model="tweetBody"
              ></textarea>
              <div
                class="text-primary font-bold text-sm py-3 border-b border-gray-100"
              >
                모든 사람이 답글을 달 수 있습니다.
              </div>
              <div class="flex justify-between mt-3">
                <div></div>
                <!-- 트윗 버튼 -->
                <div class="hidden sm:block">
                  <button
                    v-if="!tweetBody.length"
                    class="bg-light text-white px-5 py-2 rounded-full font-bold"
                    disabled
                  >
                    트윗하기
                  </button>
                  <button
                    v-else
                    @click="onAddTweet()"
                    class="bg-primary text-white px-5 py-2 rounded-full font-bold"
                  >
                    트윗하기
                  </button>
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
import addTweet from "@/utils/addTweet";

export default {
  // setup에 여러 인자들이 있음. 그 중 emit을 가져와서 사용.
  setup(props, { emit }) {
    const tweetBody = ref("");
    // 스토어에서 현재 사용자 정보 가져오기
    const currentUser = computed(() => store.state.user);

    const onAddTweet = async () => {
      try {
        await addTweet(tweetBody.value, currentUser.value);
        // 성공하면 모달창 닫기
        emit("closeTweetModal");
      } catch (e) {
        console.log(`error:`, e);
      }
    };

    return {
      tweetBody,
      onAddTweet,
      currentUser,
    };
  },
};
</script>

<style></style>
