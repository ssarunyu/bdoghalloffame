<script setup>
import { computed, onMounted, ref } from 'vue';
import { useFetchStore } from '@/stores/counter';
import Detail from './Detail.vue';

const isLoading = ref(false);
const store = useFetchStore();
const sortBy = ref('acs'); // Default sort by ACS
const sortOrder = ref('desc'); // Default sort order is descending

async function getLast5Matches() {
    if (store.getAllPlayer().length === 0) {
        isLoading.value = true;
        await store.getData(`https://api.henrikdev.xyz/valorant/v3/matches/ap/Clara/ttt`);
        isLoading.value = false;
    } else {
        console.log(store.getAllPlayer());
    }
}

onMounted(() => getLast5Matches());

const sortedAcs = computed(() => {
    return [...store.getAllPlayer()].sort((a, b) => {
        const valueA = sortBy.value === 'hsPercent' ? a.hsPercent : sortBy.value === 'acs' ? a.acs : a.kda.kills - a.kda.deaths;
        const valueB = sortBy.value === 'hsPercent' ? b.hsPercent : sortBy.value === 'acs' ? b.acs : b.kda.kills - b.kda.deaths;

        // Sort order: Ascending or Descending
        return sortOrder.value === 'asc' ? valueA - valueB : valueB - valueA;
    });
});

const watchMoreDetail = (player) => {
    store.selectedPlayer = player;
};

const toggleSort = (field) => {
    if (sortBy.value === field) {
        // Toggle the sort order if the same field is clicked
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    } else {
        // Switch to sorting by the new field
        sortBy.value = field;
        sortOrder.value = 'desc'; // Default to descending order
    }
};
</script>


<template>
  <!-- Detail of the selected user -->
  <Detail v-if="store.selectedPlayer" :detail-props="store.selectedPlayer" />

  <!-- Main Content -->
  <div class="w-full h-screen bg-slate-800 flex flex-col items-center">
    <div class="w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
      
      <!-- Notification about API limitations -->
      <div class="bg-red-500 text-center text-sm text-white p-2 rounded-md mb-4 shadow-md">
        <p>*Due to API rate limits, stats are based on the last 5 matches of 'Clara' only</p>
        <p>Stats show your last 5 games.</p>
      </div>

      <!-- Table Header -->
      <div class="flex justify-between p-4 bg-slate-900 rounded-t-lg shadow-md text-sm font-semibold text-gray-300">
        <div class="flex items-center space-x-10">
          <div>#</div>
          <div>IGN</div>
        </div>
        <div class="flex items-center space-x-4">
          <div class="w-24 text-center">Character</div>
          <div class="w-24 text-center">Map</div>
          <div class="w-24 text-center">KDA</div>
          <div class="w-24 text-center cursor-pointer hover:text-white" @click="toggleSort('+/-')">
            +/- <span>{{ sortBy === '+/-' ? (sortOrder === 'asc' ? '▲' : '▼') : '▼' }}</span>
          </div>
          <div class="w-24 text-center cursor-pointer hover:text-white" @click="toggleSort('hsPercent')">
            HS% <span>{{ sortBy === 'hsPercent' ? (sortOrder === 'asc' ? '▲' : '▼') : '▼' }}</span>
          </div>
          <div class="w-24 text-center cursor-pointer hover:text-white" @click="toggleSort('acs')">
            ACS <span>{{ sortBy === 'acs' ? (sortOrder === 'asc' ? '▲' : '▼') : '▼' }}</span>
          </div>
        </div>
      </div>

      <!-- Loading Spinner -->
      <div v-if="isLoading" class="flex flex-col items-center mt-5 text-white">
        <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-gray-500"></div>
        <p class="mt-2">Loading data... Please wait, as this may take some time due to API limitations</p>
      </div>

      <!-- Player Data List -->
      <div class="overflow-y-auto max-h-[500px] space-y-5 bg-gray-800 rounded-b-lg shadow-md scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900">
        <div
          class="p-4 flex justify-between items-center bg-gray-700 hover:bg-gray-600 text-white cursor-pointer transition rounded-md"
          v-for="(player, index) in sortedAcs"
          :key="index"
          @click="watchMoreDetail(player)"
        >
          <!-- Rank and Player Name -->
          <div class="flex items-center space-x-4">
            <div class="w-8 text-center font-bold text-lg">{{ index + 1 }}</div>
            <div class="w-40 font-semibold truncate">{{ player.name }}</div>
          </div>

          <!-- Player Stats -->
          <div class="flex items-center space-x-4">
            <img :src="player.characterIcon" class="w-10 h-10 rounded-full object-cover" alt="Character Icon" />
            <div class="w-24 text-center">{{ player.character }}</div>
            <div class="w-24 text-center">{{ player.map }}</div>
            <div class="w-24 text-center">{{ player.kda.kills }}/{{ player.kda.deaths }}/{{ player.kda.assists }}</div>
            <div
            class="w-20 text-center font-semibold"
            :class="player.kda.kills - player.kda.deaths >= 0 ? 'text-green-400' : 'text-red-400'"
            >
            {{ player.kda.kills - player.kda.deaths >= 0 ? `+${player.kda.kills - player.kda.deaths }` : `${player.kda.kills - player.kda.deaths }` }}
            </div>
            <div class="w-24 text-center">{{ player.hsPercent }}%</div>
            <div class="w-20 text-center font-semibold">{{ player.acs }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
