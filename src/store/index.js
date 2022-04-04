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
  },
  // 새로고침해도 사용자 정보가 남아있게 해주는 플러그인
  plugins: [createPersistedState()],
});

export default store;
