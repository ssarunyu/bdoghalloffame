<script setup>
  import { computed, onMounted, ref } from 'vue'
  import { useFetchStore } from '@/stores/counter'

  const isLoading = ref(false)

  // access the `store` variable anywhere in the component ✨
  const store = useFetchStore()
  function searchUser(name, tag){
    store.getData(`https://api.henrikdev.xyz/valorant/v2/account/${name}/${tag}`)
  }
  async function testFindLastMatch() {
    if(store.getHsResult().length === 0) {
      isLoading.value = true
      await store.getData(`https://api.henrikdev.xyz/valorant/v3/matches/ap/Clara/ttt`)
      // Since async await this no need to settimeout because it's wait above task to finish yet
      isLoading.value = false
    } else {
      console.log(store.getHsResult())
    }
  }
  
  // Result to show
  const sorted = computed(() => {
    // Most to less
    return [...store.getHsResult()].sort((a, b) => b.hsPercent - a.hsPercent)
  })
  onMounted(() => testFindLastMatch())
</script>

<template>
  <div class="w-full h-screen bg-slate-800 flex flex-col">
    <div class="flex flex-col items-center">
      <div class="w-full max-w-4xl px-4 sm:px-0">
        <div class="m-3">
          <p class="flex justify-center items-center text-white text-sm text-red-400">*From limitation of API rate limit all stats are based on 'Clara' only last 5 matches to fix the problem</p>
          <p class="flex justify-center items-center text-white text-sm text-red-400">Stats show your best match of last 5 games</p>
        </div>
        <div class="flex justify-around p-3 bg-white rounded-t-lg shadow-md text-sm font-semibold">
          <div>#</div>
          <div>IGN</div>
          <div>Character</div>
          <div>Map</div>
          <div>KDA</div>
          <div>HS%</div>
        </div>
        <!-- Show loading spinner while fetching data -->
        <div v-if="isLoading" class="flex flex-col text-white justify-center items-center mt-5">
          <!-- Spinner -->
          <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-slate-500"></div>
          <p class="mt-2">Loading the data... This process will slow because API Endpoint not me :3</p>
        </div>
        <div class="mt-5 space-y-5">
          <div class="p-3 bg-slate-700 text-white flex justify-between items-center rounded-md shadow-sm" v-for="(player, index) in sorted">
            <div class="w-8 text-center">{{ index + 1 }}</div>
            <div class="w-32 font-semibold truncate">{{ player.name }}</div>
            <div class="w-24 text-center">{{ player.character }}</div>
            <div class="w-24 text-center">{{ player.map }}</div>
            <div class="w-32 text-center">{{ player.kda.kills }}/{{ player.kda.deaths }}/{{ player.kda.assists }}</div>
            <div class="w-32 text-center">{{ player.hsPercent }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center mt-10">
      <button v-show="!isLoading" class="px-6 py-2 bg-white text-black rounded-md shadow hover:bg-slate-300 transition disabled:cursor-wait disabled:bg-slate-100" @click="testFindLastMatch">Refresh</button>
    </div>
  </div>
</template>
