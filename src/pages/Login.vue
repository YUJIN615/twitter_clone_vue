<template>
  <div class="max-w-md mx-auto text-center py-8">
    <i
      class="fab fa-twitter text-4xl text-primary"
      :class="`${isLoading ? 'animate-bounce' : ''}`"
    ></i>
    <h1 class="font-bold text-2xl mt-3 mb-5">트위터 로그인</h1>
    <!-- <form> -->
    <input
      type="text"
      title="이메일"
      placeholder="이메일"
      class="border border-gray-300 w-4/5 py-2 px-3 mb-4 rounded text-gray-600 font-bold text-sm focus:ring-2 focus:border-primary focus:outline-none"
      v-model="email"
    />
    <input
      type="password"
      title="비밀번호"
      placeholder="비밀번호"
      class="border border-gray-300 w-4/5 py-2 px-3 mb-4 rounded text-gray-600 font-bold text-sm focus:ring-2 focus:border-primary focus:outline-none"
      v-model="password"
      @keyup.enter="onLogin"
    />
    <button
      v-if="isLoading"
      class="bg-light text-white rounded-full py-3 w-4/5 block mx-auto"
      disabled
    >
      로그인 중입니다.
    </button>
    <button
      v-else
      class="bg-primary text-white rounded-full py-3 w-4/5 block mx-auto hover:bg-dark"
      @click="onLogin"
    >
      로그인
    </button>
    <router-link to="/register" class="text-primary text-sm block my-3"
      >계정이 없으신가요? 회원가입 하기</router-link
    >
    <!-- </form> -->
  </div>
</template>

<script>
import { ref } from "vue";
import { auth, USER_COLLECTION } from "../firebase";
import { useRouter } from "vue-router";
import store from "../store";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const isLoading = ref(false);
    const router = useRouter();

    const onLogin = async () => {
      // 유효성 검사
      if (!email.value || !password.value) {
        alert("이메일, 비밀번호를 모두 입력해주세요.");
        return;
      }

      try {
        // 로딩중 아이콘 활성화
        isLoading.value = true;
        // 유저 정보 가져와서 로그인하기
        const { user } = await auth.signInWithEmailAndPassword(
          email.value,
          password.value
        );

        // 사용자 정보 가져오기
        const doc = await USER_COLLECTION.doc(user.uid).get();
        // 가져온 사용자 정보 저장하기
        store.commit("SET_USER", doc.data());

        // 로그인 후에 뒤도가기 해서 로그인 페이지 못가게 함
        router.replace("/");
      } catch (e) {
        // 유효성 검사
        switch (e.code) {
          case "auth/invalid-email":
            alert("잘못된 이메일 형식입니다.");
            break;
          case "auth/wrong-password":
            alert("비밀번호를 확인해주세요.");
            break;
          case "auth/user-not-found":
            alert("등록되지 않은 이메일입니다.");
            break;
          default:
            alert(e.message);
            console.log(e);
            break;
        }
      } finally {
        isLoading.value = false;
      }
    };

    return { email, password, onLogin, isLoading };
  },
};
</script>

<style></style>
