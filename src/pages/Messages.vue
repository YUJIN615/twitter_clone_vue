<template>
  <div class="flex-1">
    <div class="flex h-screen">
      <!--채팅 목록 섹션 -->
      <div class="w-2/5 border-r border-gray-100 overflow-y-auto">
        <!-- 타이틀 -->
        <h2
          class="text-lg font-bold w-full px-4 py-5 border-b-2 border-gray-100"
        >
          쪽지
        </h2>

        <!-- 검색창 -->
        <div class="px-3 py-3 border-b border-gray-100 relative">
          <input
            type="text"
            placeholder="사용자 및 그룹 검색"
            class="bg-gray-100 w-full h-11 rounded-full pl-12"
          />
          <i class="fas fa-search absolute top-6 left-7 text-gray-400"></i>
        </div>

        <!-- 채팅 목록 -->
        <ul>
          <li
            class="border-b border-gray-100 px-3 py-4 cursor-pointer hover:bg-gray-50"
            v-for="user in users"
            :key="user.id"
            @click="onSelectUser(user)"
          >
            <div class="flex">
              <img
                :src="user.profile_image_url"
                alt=""
                class="w-12 h-12 rounded-full cursor-pointer hover:opacity-80 block object-cover"
              />
              <div class="flex-1 ml-3">
                <div class="flex justify-between">
                  <div>
                    <span class="font-bold mr-2">{{ user.email }}</span>
                    <span class="text-sm text-gray-500"
                      >@{{ user.username }}</span
                    >
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ moment(user.created_at).format("M월 DD일") }}
                  </div>
                </div>
                <div class="text-sm text-gray-500 mt-1"></div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <!--채팅창 섹션 -->
      <div class="w-3/5 border-r border-gray-100" v-if="selectedUser">
        <div class="flex flex-col h-screen">
          <!-- 아이디 -->
          <div class="text-lg w-full px-4 py-3 border-b-2 border-gray-100">
            <div class="flex items-center">
              <img
                :src="currentUser.profile_image_url"
                alt=""
                class="w-9 h-9 rounded-full cursor-pointer hover:opacity-80 mr-3 object-cover"
              />
              <div>
                <div class="text-lg font-bold">{{ currentUser.email }}</div>
                <div class="text-xs text-gray-500">
                  @{{ currentUser.username }}
                </div>
              </div>
              <button class="ml-auto">
                <i class="fas fa-exclamation-circle text-primary"></i>
              </button>
            </div>
          </div>

          <!-- 유저 정보 -->
          <div class="border-b border-gray-100 py-7 flex flex-col items-center">
            <div>
              <span class="font-bold mr-2">{{ selectedUser.email }}</span>
              <span class="text-gray-500">@{{ selectedUser.username }}</span>
            </div>
            <div class="my-1">
              <span class="mr-4"
                ><b>{{ selectedUser.followings.length }}</b> 팔로우 중</span
              >
              <span
                ><b>{{ selectedUser.followers.length }}</b> 팔로워</span
              >
            </div>
            <div class="text-gray-500 text-sm">
              <i class="far fa-calendar-alt"></i> 가입일:
              {{ moment(selectedUser.created_at).format("YYYY년 M월") }}
            </div>
          </div>

          <!-- 채팅창 -->
          <div class="px-5 py-5 flex-1">
            <div v-for="message in messages" :key="message.id">
              <!-- 내가 보낸 메세지 -->
              <div
                class="text-right mt-3"
                v-if="currentUser.uid === message.from_uid"
              >
                <span
                  class="bg-primary text-white px-4 py-2 rounded-full inline-block"
                >
                  {{ message.message_body }}
                </span>
                <div class="text-gray-500 text-xs mt-1">
                  {{ moment(message.created_at).fromNow() }}
                </div>
              </div>
              <!-- 상대가 보낸 메세지 -->
              <div
                class="text-left mt-3"
                v-if="currentUser.uid === message.to_uid"
              >
                <span class="bg-gray-200 px-4 py-2 rounded-full inline-block">
                  {{ message.message_body }}
                </span>
                <div class="text-gray-500 text-xs mt-1">
                  {{ moment(message.created_at).fromNow() }}
                </div>
              </div>
            </div>
          </div>

          <!-- 채팅 작성창 -->
          <div class="left-0 border-t border-gray-100 px-5 py-3">
            <div class="flex justify-between items-center">
              <button><i class="far fa-image text-primary"></i></button>
              <button><i class="fas fa-photo-video text-primary"></i></button>
              <input
                type="text"
                placeholder="새 쪽지 작성하기"
                class="w-4/5 h-10 rounded-full bg-gray-100 pl-5 outline-none focus:ring-1 focus:ring-primary focus:bg-white"
                v-model="messageBody"
                @keyup.enter="onSendMessage"
              />
              <button><i class="far fa-smile text-primary"></i></button>
              <button @click="onSendMessage">
                <i class="far fa-paper-plane text-primary"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="w-3/5 border-r mt-5 ml-5 border-gray-100" v-else>
        <p>
          <strong>선택된 사용자가 없습니다.</strong>
          <span class="text-gray-400 text-sm block"
            >사용자를 선택해 주세요</span
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onBeforeMount, ref } from "@vue/runtime-core";
import { MESSAGE_COLLECTION, USER_COLLECTION } from "@/firebase";
import store from "@/store";
import moment from "moment";

export default {
  setup() {
    const currentUser = computed(() => store.state.user);
    const users = ref([]);
    const selectedUser = ref(null);
    const messageBody = ref("");
    const messages = ref([]);
    const selected = ref(false);

    onBeforeMount(async () => {
      // 유저컬렉션에서 모든 정보 가져오기
      const snapshot = await USER_COLLECTION.orderBy(
        "created_at",
        "desc"
      ).get();
      snapshot.docs.forEach((doc) => {
        let user = doc.data();

        // 유저 정보가 현재 유저와 동일하면 return
        if (user.email === currentUser.value.email) return;

        users.value.push(user);
      });
    });

    // 유저 선택했을 때
    const onSelectUser = async (user) => {
      selectedUser.value = user;

      // 내가 보낸 메세지 정보 불러오기
      let snapshot = await MESSAGE_COLLECTION.where(
        "from_uid",
        "==",
        currentUser.value.uid
      )
        .where("to_uid", "==", selectedUser.value.uid)
        .get();
      // messages 배열에 대화 정보를 담는다.
      messages.value = snapshot.docs.map((doc) => doc.data());

      // 상대방이 보낸 메세지 정보 불러오기
      snapshot = await MESSAGE_COLLECTION.where(
        "to_uid",
        "==",
        currentUser.value.uid
      )
        .where("from_uid", "==", selectedUser.value.uid)
        .get();
      // messages 배열에 대화 정보를 넣는다.
      snapshot.docs.map((doc) => messages.value.push(doc.data()));

      // 불러온 메세지 시간순으로 정렬하기
      messages.value = messages.value.sort((a, b) =>
        a.created_at > b.created_at ? 0 : -1
      );
      console.log(messages.value);
    };

    const onSendMessage = async () => {
      // 메세지 내용이 없거나 선택된 유저가 없을때는 return
      if (!messageBody.value || !selectedUser.value) return;

      const doc = MESSAGE_COLLECTION.doc();
      let message = {
        id: doc.id,
        from_uid: currentUser.value.uid, // 메세지 보내는 사람의 uid
        to_uid: selectedUser.value.uid, // 메세지 받는 사람의 uid
        message_body: messageBody.value,
        created_at: Date.now(),
      };
      // 메세지 컬렉션에 방금 작성한 메세지를 넘겨준다.
      await doc.set(message);
      messages.value.push(message);
      messageBody.value = "";
    };

    return {
      currentUser,
      users,
      moment,
      onSelectUser,
      onSendMessage,
      messageBody,
      messages,
      selectedUser,
    };
  },
};
</script>

<style></style>
