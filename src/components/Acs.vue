<script setup>
  import { computed, onMounted, ref } from 'vue'
  import { useFetchStore } from '@/stores/counter'
  import Detail from './Detail.vue';

  const isLoading = ref(false)

  // access the `store` variable anywhere in the component ✨
  const store = useFetchStore()
  async function getLast5Matches() {
    if(store.getAllPlayer().length === 0) {
      isLoading.value = true
      await store.getData(`https://api.henrikdev.xyz/valorant/v3/matches/ap/Clara/ttt`)
      // Since async await this no need to settimeout because it's wait above task to finish yet
      isLoading.value = false
    } else {
      console.log(store.getAllPlayer())
    }
  }

  onMounted(() => getLast5Matches())
  const sortedAcs = computed(() => {
    return [...store.getAllPlayer()].sort((a, b) => b.acs - a.acs)
  })

  const watchMoreDetail = (player) => {
    store.selectedPlayer = player
  }
</script>

<template>
  <!-- Detail of that users -->
  <Detail v-if="store.selectedPlayer" :detail-props="store.selectedPlayer" />
  <div class="w-full h-screen bg-slate-800 flex flex-col">
    <div class="flex flex-col items-center">
      <div class="w-full max-w-4xl px-4 sm:px-0">
        <div class="m-3">
          <p class="flex justify-center items-center text-white text-sm text-red-400">*From limitation of API rate limit all stats are based on 'Clara' only last 5 matches to fix the problem</p>
          <p class="flex justify-center items-center text-white text-sm text-red-400">Stats show your last 5 games</p>
        </div>
        <div class="flex justify-around p-3 bg-white rounded-t-lg shadow-md text-sm font-semibold">
          <div>#</div>
          <div>IGN</div>
          <div>Character</div>
          <div>Map</div>
          <div>KDA</div>
          <div>+/-</div>
          <div>ACS</div>
        </div>
        <!-- Show loading spinner while fetching data -->
        <div v-if="isLoading" class="flex flex-col text-white justify-center items-center mt-5">
          <!-- Spinner -->
          <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-slate-500"></div>
          <p class="mt-2">Loading the data... This process will slow because API Endpoint not me :3</p>
        </div>
        <div class="mt-5 space-y-5 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-slate-700">
          <!-- Looped Data -->
          <div class="p-3 bg-slate-700 text-white flex justify-between items-center rounded-md shadow-sm cursor-pointer"
          v-for="(player, index) in sortedAcs"
          @click="watchMoreDetail(player)">
            <div class="w-8 text-center">{{ index + 1 }}</div>
            <div class="w-32 font-semibold truncate">{{ player.name }}</div>
            <div class="w-24 text-center">{{ player.character }}</div>
            <div class="w-24 text-center">{{ player.map }}</div>
            <div class="w-32 text-center">{{ player.kda.kills }}/{{ player.kda.deaths }}/{{ player.kda.assists }}</div>
            <div 
            class="w-32 text-center"
            :class="player.kda.kills - player.kda.deaths >= 0 ? 'text-green-500' : 'text-red-500'">
            {{ player.kda.kills - player.kda.deaths >= 0 ? `+${player.kda.kills - player.kda.deaths }` : `${player.kda.kills - player.kda.deaths }` }}
            </div>
            <div class="w-24 text-center">{{ player.acs }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
