<script setup>
import { ref, computed } from 'vue';
import { useFetchStore } from '@/stores/counter';

const store = useFetchStore()

const agentData = ref([])

const props = defineProps(['detailProps'])

const close = () => {
    store.selectedPlayer = null
}

</script>

<template>
<div id="popup" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
    <div class="bg-slate-700 text-white rounded-lg shadow-lg w-[700px] max-h-[600px] overflow-auto p-5 scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-slate-700">
        <div class="relative flex flex-col space-y-5">
        <!-- Close Button -->
         <div @click="close" class="absolute top-2 right-2 text-white bg-red-500 rounded-full p-2 cursor-pointer">x</div>
            <!-- Personal Data -->
            <div class="flex justify-between">
                <div>
                    <h2 class="text-xl font-bold">{{ detailProps.name }}</h2>
                    <p class="text-lg font-bold"><span>{{ detailProps.character }}</span> in <span>{{ detailProps.map }}</span></p>
                    <p>Team {{ detailProps.userPlayedTeam }}</p>
                    <p class="text-sm">{{ detailProps.date }}</p>
                </div>
            </div>
            <!-- Stats -->
            <div class="flex justify-between">
                <div>
                    <h2 class="text-xl font-bold">KDA</h2>
                    <h2>{{ detailProps.kda.kills }}/{{ detailProps.kda.deaths }}/{{ detailProps.kda.assists }}</h2>
                </div>
                <div>
                    <h2 class="text-xl font-bold">+/-</h2>
                    <h2>{{ detailProps.kda.kills - detailProps.kda.deaths >= 0 ? `+${detailProps.kda.kills - detailProps.kda.deaths}` : `${detailProps.kda.kills - detailProps.kda.deaths}` }}</h2>
                </div>
                <div>
                    <h2 class="text-xl font-bold">ACS</h2>
                    <h2>{{ detailProps.acs }}</h2>
                </div>
                <div>
                    <h2 class="text-xl font-bold">HS%</h2>
                    <h2>{{ detailProps.hsPercent }}</h2>
                </div>
            </div>
            <!-- Damage -->
            <div class="flex justify-between">
                <div>
                    <h2 class="text-xl font-bold">Damage Made</h2>
                    <p>{{ detailProps.damage_made }}</p>
                </div>
                <div>
                    <h2 class="text-xl font-bold">Damage Received</h2>
                    <p>{{ detailProps.damage_received }}</p>
                </div>
            </div>
            <!-- Skills used stat -->
            <div class="flex flex-col">
                <h1 class="text-xl font-bold">Skills Used</h1>
                <div class="flex justify-between">
                    <p>C : {{ detailProps.ability_casts.c_cast }}</p>
                    <p>Q : {{ detailProps.ability_casts.q_cast }}</p>
                    <p>E : {{ detailProps.ability_casts.e_cast }}</p>
                    <p>Ultimate : {{ detailProps.ability_casts.x_cast }}</p>
                </div>
            </div>
        </div>
    </div>
</div>
</template>