<template>
  <div class="max-w-md mx-auto text-center py-8">
    <i
      class="fab fa-twitter text-4xl text-primary"
      :class="`${isLoading ? 'animate-bounce' : ''}`"
    ></i>
    <h1 class="font-bold text-2xl mt-3 mb-5">트위터 회원가입</h1>
    <form>
      <input
        type="text"
        title="이메일"
        placeholder="이메일"
        class="border border-gray-300 w-4/5 py-2 px-3 mb-4 rounded text-gray-600 font-bold text-sm focus:ring-2 focus:border-primary focus:outline-none"
        v-model="email"
      />
      <input
        type="text"
        title="아이디"
        placeholder="아이디"
        class="border border-gray-300 w-4/5 py-2 px-3 mb-4 rounded text-gray-600 font-bold text-sm focus:ring-2 focus:border-primary focus:outline-none"
        v-model="username"
      />
      <input
        type="password"
        title="비밀번호"
        placeholder="비밀번호"
        class="border border-gray-300 w-4/5 py-2 px-3 mb-4 rounded text-gray-600 font-bold text-sm focus:ring-2 focus:border-primary focus:outline-none"
        v-model="password"
        @keyup.enter="onRegister"
      />
      <button
        v-if="isLoading"
        class="bg-light text-white rounded-full py-3 w-4/5 block mx-auto"
        disabled
      >
        회원가입 중입니다.
      </button>
      <button
        v-else
        class="bg-primary text-white rounded-full py-3 w-4/5 block mx-auto hover:bg-dark"
        @click="onRegister"
      >
        회원가입
      </button>
      <router-link to="/login" class="text-primary text-sm block my-3"
        >계정이 이미 있으신가요? 로그인 하기</router-link
      >
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { auth, USER_COLLECTION } from "../firebase";
import { useRouter } from "vue-router";

export default {
  setup() {
    const email = ref("");
    const username = ref("");
    const password = ref("");
    const isLoading = ref(false);
    const router = useRouter();

    const onRegister = async () => {
      // 유효성 검사
      if (!username.value || !email.value || !password.value) {
        alert("이름, 이메일, 비밀번호를 모두 입력해주세요.");
        return;
      }

      try {
        // 로딩 아이콘 활성화
        isLoading.value = true;

        // 사용자정보 받아와서 회원가입
        const { user } = await auth.createUserWithEmailAndPassword(
          email.value,
          password.value
        );

        // users 컬렉션에 doc을 만듬
        const doc = USER_COLLECTION.doc(user.uid);
        await doc.set({
          uid: user.uid,
          email: email.value,
          username: username.value,
          profile_image_url: "@/assets/img/profile.jpeg",
          background_image_url: "@/assets/img//bg.png",
          num_tweets: 0,
          followers: [],
          followings: [],
          created_at: Date.now(),
        });

        alert("회원 가입에 성공하셨습니다. 로그인 해주세요.");

        // 회원가입 성공하면 로그인 페이지로 가기
        router.push("/login");
      } catch (e) {
        // 유효성 검사
        switch (e.code) {
          case "auth/invalid-email":
            alert("이메일을 바르게 입력해주세요.");
            break;
          case "auth/weak-password":
            alert("비밀번호가 너무 쉬워요.");
            break;
          case "auth/email-already-in-use":
            alert("이미 가입되어 있는 이메일 입니다.");
            break;
          default:
            alert("회원가입에 실패했습니다.");
            console.log(e);
            break;
        }
      } finally {
        isLoading.value = false;
      }
    };

    return { username, email, password, onRegister, isLoading };
  },
};
</script>

<style></style>
