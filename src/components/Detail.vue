<script setup>
import { ref, computed } from 'vue';
import { useFetchStore } from '@/stores/counter';

const store = useFetchStore()

const props = defineProps(['detailProps'])

const close = () => {
    store.selectedPlayer = null
}

</script>

<template>
    <!-- Popup Overlay -->
    <div id="popup" class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <!-- Popup Content -->
      <div class="bg-gray-800 text-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 relative scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-900">
        
        <!-- Close Button -->
        <button @click="close" class="absolute top-4 right-4 p-2 bg-red-600 text-white rounded-full focus:outline-none hover:bg-red-500 transition">
          <span class="text-xl">×</span>
        </button>
  
        <!-- Header: Character and General Info -->
        <div class="flex justify-between items-start mb-6">
          <div>
            <h2 class="text-2xl font-bold">{{ detailProps.name }}</h2>
            <p class="text-lg"><span class="font-semibold">{{ detailProps.character }}</span> on <span class="font-semibold">{{ detailProps.map }}</span></p>
            <p class="text-sm text-gray-400">Team: {{ detailProps.userPlayedTeam }}</p>
            <p class="text-sm text-gray-400">Match Date: {{ detailProps.date }}</p>
          </div>
          <div class="w-24 h-24 flex-shrink-0">
            <img :src="detailProps.characterIcon" class="w-full h-full object-cover rounded-lg" alt="Character Icon">
          </div>
        </div>
  
        <!-- Stats Section -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6">
          <!-- KDA -->
          <div class="flex flex-col items-center bg-gray-700 p-4 rounded-lg">
            <h3 class="text-xl font-bold">KDA</h3>
            <p class="text-lg">{{ detailProps.kda.kills }}/{{ detailProps.kda.deaths }}/{{ detailProps.kda.assists }}</p>
          </div>
          <!-- +/- -->
          <div class="flex flex-col items-center bg-gray-700 p-4 rounded-lg">
            <h3 class="text-xl font-bold">+/-</h3>
            <p class="text-lg" :class="detailProps.kda.kills - detailProps.kda.deaths >= 0 ? 'text-green-400' : 'text-red-400'">
              {{ detailProps.kda.kills - detailProps.kda.deaths >= 0 ? `+${detailProps.kda.kills - detailProps.kda.deaths}` : `${detailProps.kda.kills - detailProps.kda.deaths}` }}
            </p>
          </div>
          <!-- ACS -->
          <div class="flex flex-col items-center bg-gray-700 p-4 rounded-lg">
            <h3 class="text-xl font-bold">ACS</h3>
            <p class="text-lg">{{ detailProps.acs }}</p>
          </div>
          <!-- HS% -->
          <div class="flex flex-col items-center bg-gray-700 p-4 rounded-lg">
            <h3 class="text-xl font-bold">HS%</h3>
            <p class="text-lg">{{ detailProps.hsPercent }}%</p>
          </div>
        </div>
  
        <!-- Damage Section -->
        <div class="grid grid-cols-2 gap-6 mb-6">
          <div class="flex flex-col bg-gray-700 p-4 rounded-lg">
            <h3 class="text-xl font-bold">Damage Made</h3>
            <p class="text-lg">{{ detailProps.damage_made }}</p>
          </div>
          <div class="flex flex-col bg-gray-700 p-4 rounded-lg">
            <h3 class="text-xl font-bold">Damage Received</h3>
            <p class="text-lg">{{ detailProps.damage_received }}</p>
          </div>
        </div>
  
        <!-- Shot Section -->
        <div class="bg-gray-700 p-4 rounded-lg mb-6">
          <h3 class="text-xl font-bold mb-4">Shot made</h3>
          <div class="grid grid-cols-3 sm:grid-cols-3 gap-4">
            <p><span class="font-semibold">Headshot:</span> {{ detailProps.shotStat.headshots }}</p>
            <p><span class="font-semibold">Bodyshot:</span> {{ detailProps.shotStat.bodyshots }}</p>
            <p><span class="font-semibold">Legshot:</span> {{ detailProps.shotStat.legshots }}</p>
          </div>
        </div>

        <!-- Skills Section -->
        <div class="bg-gray-700 p-4 rounded-lg mb-6">
          <h3 class="text-xl font-bold mb-4">Skills Used</h3>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <p><span class="font-semibold">C:</span> {{ detailProps.ability_casts.c_cast }}</p>
            <p><span class="font-semibold">Q:</span> {{ detailProps.ability_casts.q_cast }}</p>
            <p><span class="font-semibold">E:</span> {{ detailProps.ability_casts.e_cast }}</p>
            <p><span class="font-semibold">Ultimate:</span> {{ detailProps.ability_casts.x_cast }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  