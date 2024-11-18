<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
    data: {
        type: Object,
        required: true
    },
    player_name: {
        type: String,
        required: true
    },
    rank_img: {
        type: String
    }
})

const formatPlayerData = props.data.players.all_players.find(a => a.name === props.player_name)

const totalShot = formatPlayerData.stats.headshots + formatPlayerData.stats.bodyshots + formatPlayerData.stats.legshots
const headshotPer = ((formatPlayerData.stats.headshots / totalShot) * 100).toFixed(2)

const findWin = () => {
    if(formatPlayerData.team === 'Red') {
        return props.data.teams.red.has_won
    } else {
        return props.data.teams.blue.has_won
    }
}

const acsStats = Math.round(formatPlayerData.stats.score / props.data.metadata.rounds_played)

const mapImg = ref('') // Reactive property to hold the map image URL

const findMapImg = async () => {
    if (!props.data) return
    const response = await fetch('https://valorant-api.com/v1/maps')
    const result = await response.json()
    const img = result.data.find(x => x.displayName === props.data.metadata.map)
    mapImg.value = img?.splash || '' // Safely assign the image URL or empty string
}

// Fetch the map image when the component is mounted or props.data is available
onMounted(() => {
    if (props.data) {
        findMapImg()
        findWin()
    }
})


</script>

<template>
    <div v-if="props.data" class="p-4 bg-slate-700 rounded-lg shadow flex items-center justify-around relative" 
         :style="{ backgroundImage: `url(${mapImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }">
        
        <!-- Black Fade Overlay -->
        <div class="absolute inset-0 bg-black opacity-60 rounded-lg"></div>

        <div class="relative z-10">
            <!-- Win/Loss badge -->
            <div class="w-20 h-20 flex justify-center items-center rounded-full font-bold text-3xl" :class="findWin() ? 'bg-green-400' : 'bg-red-400'">
                {{ findWin() ? 'W' : 'L' }}
            </div>
        </div>
        <div class="flex items-center space-x-5 relative z-10">
            <img :src="formatPlayerData.assets.agent.small" class="w-12" alt="">
            <div class="flex flex-col">
                <div class="flex justify-center items-center">
                    <p class="font-bold">{{ props.data.metadata.mode }}</p>
                    <img v-show="props.data.metadata.mode === 'Competitive'" :src="props.rank_img" class="w-5 ml-1">
                </div>
                <p class="font-bold text-2xl">{{ formatPlayerData.character }}</p>
                <p>in {{ props.data.metadata.map }}</p>
            </div>
        </div>
        <div class="flex space-x-5 items-center relative z-10 text-xl">
            <div>
                <p class="text-xs">KDA</p>
                <p class="font-bold">{{ formatPlayerData.stats.kills }}/{{ formatPlayerData.stats.deaths }}/{{ formatPlayerData.stats.assists }}</p>
            </div>
            <div>
                <p class="text-xs">HS%</p>
                <p class="font-bold">{{ headshotPer }}</p>
            </div>
            <div>
                <p class="text-xs">ACS</p>
                <p class="font-bold">{{ acsStats }}</p>
            </div>
        </div>
    </div>

</template>