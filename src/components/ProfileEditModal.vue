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
        @click="$emit('close-modal')"
      ></div>
      <div
        class="inline-block bg-white w-full sm:rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg"
      >
        <div class="bg-white pt-3 pb-3 sm:py-5 sm:pb-3">
          <!-- 헤더 -->
          <div class="flex items-center mb-4 px-4">
            <button
              @click="$emit('close-modal')"
              class="fas fa-times text-primary hover:bg-lighter px-3 py-2 rounded-full justify-self-start"
            ></button>
            <h1 class="font-bold ml-2">프로필 수정</h1>
            <div class="flex-1 text-right">
              <button
                class="text-white text-sm px-3 py-1 bg-primary rounded-full justify-self-end"
                @click="onSaveProfile"
              >
                저장
              </button>
            </div>
          </div>
          <!-- 배경이미지 -->
          <div
            class="w-full h-48 bg-gray-300 flex justify-center items-center relative"
          >
            <img
              :src="currentUser.background_image_url"
              alt="프로필 배경 사진"
              class="object-cover absolute w-full h-full"
              ref="backgroundImage"
            />

            <button
              class="absolute top-0 left-0 w-full h-full"
              @click="onChangeBackgroundImage"
            >
              <i class="fas fa-camera text-gray-400"></i>
              <input
                type="file"
                accept="image/*"
                id="backgroundImageInput"
                class="hidden"
                @change="previewBackgroundImage"
              />
            </button>
          </div>
          <!-- 프로필 이미지 -->
          <div class="px-4">
            <div class="mt-[-35px] relative">
              <img
                :src="currentUser.profile_image_url"
                alt="프로필 사진"
                class="object-cover w-24 h-24 rounded-full cursor-pointer hover:opacity-80 border-4 brder-white relative"
                ref="profileImage"
              />
              <button
                class="absolute top-0 left-0 w-24 h-full"
                @click="onChangeProfileImage"
              >
                <i class="fas fa-camera text-gray-300"></i>
                <input
                  type="file"
                  accept="image/*"
                  id="profileImageInput"
                  class="hidden"
                  @change="previewProfileImage"
                />
              </button>
            </div>
          </div>
          <!-- 기타 정보 -->
          <div class="px-4">
            <div class="w-full border-2 px-2 py-1 mt-2 border-gray-100 rounded">
              <div class="text-sm text-gray-500">이름</div>
              <div>yujin@test.com</div>
            </div>
            <div class="w-full mt-2">
              <textarea
                name=""
                id=""
                cols="30"
                rows="2"
                placeholder="자기소개"
                class="w-full h-full px-2 py-1 border-2 border-gray-100 focus:outline-none focus:border-light rounded"
              ></textarea>
            </div>
            <div class="w-full mt-2">
              <input
                type="text"
                placeholder="위치"
                class="w-full px-2 py-1 border-2 border-gray-100 focus:outline-none focus:border-light rounded"
              />
            </div>
            <div class="w-full mt-2">
              <input
                type="text"
                placeholder="웹사이트"
                class="w-full px-2 py-1 border-2 border-gray-100 focus:outline-none focus:border-light rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import store from "@/store";
import addTweet from "@/utils/addTweet";
import { storage, USER_COLLECTION } from "@/firebase";

export default {
  // setup에 여러 인자들이 있음. 그 중 emit을 가져와서 사용.
  setup(props, { emit }) {
    const tweetBody = ref("");
    // 스토어에서 현재 사용자 정보 가져오기
    const currentUser = computed(() => store.state.user);

    const backgroundImage = ref(null);
    const profileImage = ref(null);
    const profileImageData = ref(null);
    const backgroundImageData = ref(null);

    const onAddTweet = async () => {
      try {
        await addTweet(tweetBody.value, currentUser.value);
        // 성공하면 모달창 닫기
        emit("closeTweetModal");
      } catch (e) {
        console.log(`error:`, e);
      }
    };

    // 배경 이미지 등록 버튼 클릭
    const onChangeBackgroundImage = () => {
      document.getElementById("backgroundImageInput").click();
    };

    // 프로필 이미지 등록 버튼 클릭
    const onChangeProfileImage = () => {
      document.getElementById("profileImageInput").click();
    };

    // 배경 이미지 선택했을 때
    const previewBackgroundImage = (event) => {
      const file = event.target.files[0];
      backgroundImageData.value = file;
      let reader = new FileReader();

      reader.onload = function (event) {
        backgroundImage.value.src = event.target.result;
      };
      reader.readAsDataURL(file);
    };

    // 프로필 이미지 선택했을 때
    const previewProfileImage = (event) => {
      const file = event.target.files[0];
      profileImageData.value = file;
      let reader = new FileReader();
      reader.onload = function (event) {
        profileImage.value.src = event.target.result;
      };
      reader.readAsDataURL(file);
    };

    // 프로필 정보 저장하기
    const onSaveProfile = async () => {
      // 프로필 이미지와 배경 이미지가 둘 다 없을 때 리턴
      if (!profileImageData.value && !backgroundImageData.value) {
        return;
      }
      // 프로필 이미지만 있을 때
      if (profileImageData.value) {
        try {
          // 스토리지에 업로드한 이미지를 넣는다.
          const uploadTask = await storage
            .ref(`profile/${currentUser.value.uid}/profile`)
            .put(profileImageData.value);
          // uploadTask로 url을 구한다.
          const url = await uploadTask.ref.getDownloadURL();
          // 유저컬렉션에 받아온 url을 넣는다.
          await USER_COLLECTION.doc(currentUser.value.uid).update({
            profile_image_url: url,
          });
          // 스토어에 변경된 프로필 이미지 반영
          store.commit("SET_PROFILE_IMAGE", url);
        } catch (e) {
          console.log(`profile image data error: ${e}`);
        }
      }

      // 배경 이미지만 있을 때
      if (backgroundImageData.value) {
        try {
          // 스토리지에 업로드한 이미지를 넣는다.
          const uploadTask = await storage
            .ref(`profile/${currentUser.value.uid}/background`)
            .put(backgroundImageData.value);
          // uploadTask로 url을 구한다.
          const url = await uploadTask.ref.getDownloadURL();
          // 유저컬렉션에 받아온 url을 넣는다.
          await USER_COLLECTION.doc(currentUser.value.uid).update({
            background_image_url: url,
          });
          // 스토어에 변경된 배경 이미지 반영
          store.commit("SET_BACKGROUND_IMAGE", url);
        } catch (e) {
          console.log(`profile image data error: ${e}`);
        }
      }
      // 정상적으로 저장된 후 창 닫기
      emit("close-modal");
    };

    return {
      tweetBody,
      onAddTweet,
      currentUser,
      onChangeBackgroundImage,
      onChangeProfileImage,
      previewBackgroundImage,
      previewProfileImage,
      backgroundImage,
      profileImage,
      onSaveProfile,
      profileImageData,
      backgroundImageData,
    };
  },
};
</script>

<style></style>
