import { createWebHistory, createRouter } from "vue-router";
import Home from "@/pages/Home.vue";
import Notifications from "@/pages/Notifications.vue";
import Messages from "@/pages/Messages.vue";
import Profile from "@/pages/Profile.vue";
import Tweet from "@/pages/Tweet.vue";
import Register from "@/pages/Register.vue";
import Login from "@/pages/Login.vue";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    title: "홈",
    icon: "fas fa-home",
    meta: { isMenu: true, layout: "DefaultLayout", requireAuth: true },
  },
  {
    path: "/",
    name: "explore",
    component: Home,
    title: "탐색하기",
    icon: "fas fa-hashtag",
    meta: { isMenu: true, layout: "DefaultLayout", requireAuth: true },
  },
  {
    path: "/notifications",
    name: "notifications",
    component: Notifications,
    title: "알림",
    icon: "far fa-bell",
    meta: { isMenu: true, layout: "DefaultLayout", requireAuth: true },
  },
  {
    path: "/messages",
    name: "messages",
    component: Messages,
    title: "쪽지",
    icon: "far fa-envelope",
    meta: { isMenu: true, layout: "DefaultLayout", requireAuth: true },
  },
  {
    path: "/",
    name: "bookmarks",
    component: Home,
    title: "북마크",
    icon: "far fa-bookmark",
    meta: { isMenu: true, layout: "DefaultLayout", requireAuth: true },
  },
  {
    path: "/",
    name: "list",
    component: Home,
    title: "리스트",
    icon: "far fa-list-alt",
    meta: { isMenu: true, layout: "DefaultLayout", requireAuth: true },
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    title: "프로필",
    icon: "far fa-user",
    meta: { isMenu: true, layout: "DefaultLayout", requireAuth: true },
  },
  {
    path: "/profile/:uid",
    component: Profile,
    meta: { isMenu: false, layout: "DefaultLayout", requireAuth: true },
  },
  {
    path: "/",
    name: "more",
    component: Home,
    title: "더보기",
    icon: "fas fa-ellipsis-h",
    meta: { isMenu: true, layout: "DefaultLayout", requireAuth: true },
  },
  {
    path: "/tweet/:id",
    name: "tweet",
    component: Tweet,
    meta: { isMenu: false, layout: "DefaultLayout", requireAuth: true },
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: { isMenu: false, layout: "EmptyLayout" },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { isMenu: false, layout: "EmptyLayout" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

//(이동하려는 페이지 정보, 원래 페이지, )
router.beforeEach((to, from, next) => {
  // 유저 정보 불러오기
  const currentUser = store.state.user;
  // 이동하려는 페이지의 matched 배열에 requireAuth가 있으면 true
  // record는 matched 배열의 요소 하나하나
  const requireAuth = to.matched.some((record) => record.meta.requireAuth);
  console.log('requireAuth', requireAuth);
  console.log('!currentUser', !currentUser);
  // requireAuth가 없고 현재 유재 정보가 없다면 로그인 페이지로 이동
  if (requireAuth && !currentUser) next("/login");
  //authenticated
  else next();
});

export default router;
