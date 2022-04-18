import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  state() {
    return {
      // 유저 상태
      user: null,
    };
  },
  // 상태 변경
  mutations: {
    SET_USER: (state, user) => {
      state.user = user;
    },
    // 프로필 이미지, 배경 이미지 변경했을때 스토어에 바로 반영되게 해주기
    SET_BACKGROUND_IMAGE: (state, image) => {
      state.user.background_image_url = image;
    },
    SET_PROFILE_IMAGE: (state, image) => {
      state.user.profile_image_url = image;
    },
    // 팔로우 상태값 업데이트 하기
    SET_FOLLOW: (state, uid) => {
      state.user.followings.push(uid);
    },
    // 언팔로우 상태값 업데이트 하기
    SET_UNFOLLOW: (state, uid) => {
      // 팔로잉의 값을 돌려서 uid 값과 일치하는 것은 제외하기
      state.user.followings = state.user.followings.filter((u) => u !== uid);
    },
  },
  // 새로고침해도 사용자 정보가 남아있게 해주는 플러그인
  plugins: [createPersistedState()],
});

export default store;
