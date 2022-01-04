<template>
  <div class="w-2/5 lg:block hidden px-3 py-3">
    <!-- 검색창 -->
    <div class="relative">
      <input
        type="text"
        placeholder="트위터 검색"
        class="
          w-full
          rounded-full
          p-2
          pl-10
          bg-blue-50
          focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white
        "
      />
      <i
        class="fas fa-search absolute top-0 left-0 ml-3 mt-3 text-gray-500"
      ></i>
    </div>

    <!-- 트렌드 -->
    <div class="mt-5 bg-gray-50 rounded-xl px-3 py-3">
      <div class="flex justify-between items-center mb-4">
        <h2 class="font-bold text-xl">나를 위한 트렌드</h2>
        <i class="fas fa-cog text-primary"></i>
      </div>
      <ul>
        <li class="mb-5 relative">
          <div class="text-sm text-gray-500">뮤직.실시간 트렌드</div>
          <strong class="block">우리 애옹이</strong>
          <div class="text-sm text-gray-600">1,753 트윗</div>
          <button class="text-sm text-gray-400 absolute top-0 right-0">
            <i class="fas fa-ellipsis-h fa-fw"></i>
          </button>
        </li>
        <li class="mb-5 relative">
          <div class="text-sm text-gray-500">뮤직.실시간 트렌드</div>
          <strong class="block">우리 애옹이</strong>
          <div class="text-sm text-gray-600">1,753 트윗</div>
          <button class="text-sm text-gray-400 absolute top-0 right-0">
            <i class="fas fa-ellipsis-h fa-fw"></i>
          </button>
        </li>
        <li class="mb-5 relative">
          <div class="text-sm text-gray-500">뮤직.실시간 트렌드</div>
          <strong class="block">우리 애옹이</strong>
          <div class="text-sm text-gray-600">1,753 트윗</div>
          <button class="text-sm text-gray-400 absolute top-0 right-0">
            <i class="fas fa-ellipsis-h fa-fw"></i>
          </button>
        </li>
        <li class="mb-5 relative">
          <div class="text-sm text-gray-500">뮤직.실시간 트렌드</div>
          <strong class="block">우리 애옹이</strong>
          <div class="text-sm text-gray-600">1,753 트윗</div>
          <button class="text-sm text-gray-400 absolute top-0 right-0">
            <i class="fas fa-ellipsis-h fa-fw"></i>
          </button>
        </li>
        <li class="mb-5 relative">
          <div class="text-sm text-gray-500">뮤직.실시간 트렌드</div>
          <strong class="block">우리 애옹이</strong>
          <div class="text-sm text-gray-600">1,753 트윗</div>
          <button class="text-sm text-gray-400 absolute top-0 right-0">
            <i class="fas fa-ellipsis-h fa-fw"></i>
          </button>
        </li>
      </ul>
      <button class="text-primary">더보기</button>
    </div>

    <!-- 팔로우 추천 -->
    <div class="mt-5 bg-gray-50 rounded-xl px-3 py-3">
      <h2 class="font-bold text-xl mb-4">팔로우 추천</h2>
      <ul>
        <li class="mb-5 relative">
          <div class="flex items-center justify-between">
            <div class="flex">
              <img
                src="http://picsum.photos/100"
                alt=""
                class="
                  w-12
                  h-12
                  rounded-full
                  cursor-pointer
                  hover:opacity-80
                  mr-2
                "
              />
              <div>
                <div class="font-bold">방탄소년단</div>
                <div class="text-gray-500 text-sm">@BTS_twt</div>
              </div>
            </div>
            <button
              class="
                bg-black
                text-white
                rounded-full
                p-1.5
                w-20
                block
                justify-self-end
              "
            >
              팔로우
            </button>
          </div>
        </li>
        <li class="mb-5 relative">
          <div class="flex items-center justify-between">
            <div class="flex">
              <img
                src="http://picsum.photos/100"
                alt=""
                class="
                  w-12
                  h-12
                  rounded-full
                  cursor-pointer
                  hover:opacity-80
                  mr-2
                "
              />
              <div>
                <div class="font-bold">방탄소년단</div>
                <div class="text-gray-500 text-sm">@BTS_twt</div>
              </div>
            </div>
            <button
              class="
                bg-black
                text-white
                rounded-full
                p-1.5
                w-20
                block
                justify-self-end
              "
            >
              팔로우
            </button>
          </div>
        </li>
        <li class="mb-5 relative">
          <div class="flex items-center justify-between">
            <div class="flex">
              <img
                src="http://picsum.photos/100"
                alt=""
                class="
                  w-12
                  h-12
                  rounded-full
                  cursor-pointer
                  hover:opacity-80
                  mr-2
                "
              />
              <div>
                <div class="font-bold">방탄소년단</div>
                <div class="text-gray-500 text-sm">@BTS_twt</div>
              </div>
            </div>
            <button
              class="
                bg-black
                text-white
                rounded-full
                p-1.5
                w-20
                block
                justify-self-end
              "
            >
              팔로우
            </button>
          </div>
        </li>
      </ul>
      <button class="text-primary">더보기</button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
