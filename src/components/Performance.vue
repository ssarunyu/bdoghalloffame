<script setup>
import { onMounted, ref } from 'vue';
import Skeleton from './Skeleton.vue';

const username = ref('')
const userTag = ref('')


const last5Games = ref([])
const statResult = ref()
const isLoading = ref(false)
async function fetchData() {
    isLoading.value = true
    // clear data when click again
    statResult.value = []

    const response = await fetch(`https://api.henrikdev.xyz/valorant/v3/matches/ap/${encodeURIComponent(username.value)}/${userTag.value}?api_key=HDEV-17316141-9e15-451f-8260-fe73f9e6165b`)
    const result = await response.json()
    last5Games.value = result.data

    const claraStats = last5Games.value.reduce((totals, game) => {
        
    game.players.all_players.forEach(player => {
        if (player.name === username.value) {
            if(player.team === "Red") {
                totals.wins_arr.push(game.teams.red.has_won)
            } else {
                totals.wins_arr.push(game.teams.blue.has_won)
            }
            
            totals.name = player.name
            totals.currenttier_patched = player.currenttier_patched
            // Accumulate stats for Clara
            totals.damage_made += player.damage_made || 0;
            totals.damage_received += player.damage_received || 0
            totals.kills += player.stats.kills
            totals.deaths += player.stats.deaths
            totals.assists += player.stats.assists
            totals.headshots += player.stats.headshots
            totals.bodyshots += player.stats.bodyshots
            totals.legshots += player.stats.legshots
            totals.character_arr.push(player.character)
            totals.currenttier = player.currenttier
            totals.kills_arr.push(player.stats.kills)
            totals.assets = player.assets
            totals.agents_arr.push(player.assets.agent)
        }
    });
    return totals;
}, { name: '', wins_arr: [], assets: [], agents_arr: [], currenttier_patched: '', damage_made: 0, damage_received: 0, kills: 0, deaths: 0, assists: 0, headshots: 0, bodyshots: 0, legshots: 0, character_arr: [], currenttier: 0, kills_arr: [] })
    // Calculate average headshot percentage
    const totalShots = claraStats.headshots + claraStats.bodyshots + claraStats.legshots
    claraStats.avgHs = ((claraStats.headshots / totalShots) * 100).toFixed(2)

    const diffKda = claraStats.kills - claraStats.deaths
    claraStats.diffKda = diffKda

    const findImg = async () => {
        const response = await fetch('https://valorant-api.com/v1/competitivetiers')
        const resultTier = await response.json()
        resultTier.data[4].tiers.map(x => {
            if(x.tier === claraStats.currenttier) {
                claraStats.rank_img = x.largeIcon
            }
        })
    }

    // Fetch Image
    await findImg()

    statResult.value = claraStats
    isLoading.value = false
    console.log(statResult.value)

    createChart()
}
const series = ref([])
const options = ref({})
function createChart() {
    series.value = [
    {
        name: 'Kills',
        data: statResult.value.kills_arr
    }
    ]

    options.value = {
    chart: {
        type: 'line',
        toolbar: {
        show: false  // Hides the toolbar (exporting and other tools)
        },
        background: '#1e293b'
    },
    colors: ['#FF5733'], // Customize line color
    stroke: {
        curve: 'smooth', // Smoothes the line
        width: 3,        // Thickness of the line
    },
    xaxis: {
        categories: [1, 2, 3, 4, 5], // Corrected to 'categories' instead of 'games'
        title: {
        text: 'Game Number',
        style: {
            color: '#fff',      // Axis title color
            fontSize: '14px',
            fontWeight: 'bold'
        }
        },
        labels: {
        style: {
            colors: '#777',     // X-axis labels color
            fontSize: '12px'
        }
        },
    },
    yaxis: {
        min: 0,
        title: {
        text: 'Kills',
        style: {
            color: '#fff',      // Y-axis title color
            fontSize: '14px',
            fontWeight: 'bold'
        }
        },
        labels: {
        style: {
            colors: '#fff',     // Y-axis labels color
            fontSize: '12px'
        }
        }
    },
    markers: {
        size: 5,              // Size of the data point markers
        colors: ['#FF5733'],  // Color of markers
        strokeColors: '#fff',
        strokeWidth: 2
    },
    grid: {
        show: true,           // Show grid lines
        borderColor: '#e7e7e7',
        strokeDashArray: 5
    },
    tooltip: {
        theme: 'dark'         // Dark tooltip theme
    }
    }
}
</script>

<template>
    <div class="w-full min-h-screen bg-slate-800 text-white p-4">
        <!-- Input Fields and Search Button -->
        <div class="mb-6 flex flex-col justify-center md:flex-row gap-4 items-center">
            <input type="text" v-model="username" placeholder="Username" required
            class="p-3 bg-slate-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-1/3">
            <input type="text" v-model="userTag" placeholder="User Tag" required
            class="p-3 bg-slate-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-1/3">
            <button @click="fetchData()"
            class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-md transition duration-200 w-full md:w-auto">
            Search
            </button>
        </div>
    
    
    <p class="text-xs flex justify-center items-center my-3">*This page show your performance in last 5 matches</p>
    <Skeleton v-show="isLoading" />
    
    <!-- Stats Display -->
    <div v-if="statResult && statResult.assets && statResult.assets.card" class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div class="flex justify-between items-center bg-slate-700 p-6 rounded-lg shadow-md col-span-3">
                <div class="flex">
                    <div class="flex">
                        <img class="w-20 h-20" :src="statResult.assets.card.small" alt="">
                    </div>
                    <div class="flex flex-col justify-center mx-5">
                        <!-- Name section -->
                        <div>
                            <h3 class="text-lg font-semibold text-blue-400">Name</h3>
                            <p class="text-3xl font-bold">{{ statResult.name }}</p>
                        </div>
                        <!-- Last 5 games stat -->
                        <div class="flex mt-2 space-x-2">
                            <p v-for="win in statResult.wins_arr"
                            :class="win ? 'rounded-full bg-green-400 w-10 h-6 flex items-center justify-center font-bold'
                            : 'rounded-full bg-red-400 w-10 h-6 flex items-center justify-center font-bold'">
                                {{ win ? 'W' : 'L' }}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="flex">
                    <img class="w-20" :src="statResult.rank_img" alt="">
                </div>
            </div>
            
            <div class="bg-slate-700 p-6 rounded-lg shadow-md">
                <h3 class="text-lg font-semibold text-blue-400 mb-2">Headshot Percentage</h3>
                <p class="text-3xl font-bold">{{ statResult.avgHs }}</p>
            </div>

            <div class="bg-slate-700 p-6 rounded-lg shadow-md">
                <h3 class="text-lg font-semibold text-blue-400 mb-2">Kills</h3>
                <p class="text-3xl font-bold">{{ statResult.kills }}</p>
            </div>

            <div class="bg-slate-700 p-6 rounded-lg shadow-md">
                <h3 class="text-lg font-semibold text-blue-400 mb-2">Deaths</h3>
                <p class="text-3xl font-bold">{{ statResult.deaths }}</p>
            </div>
            
            <div class="bg-slate-700 p-6 rounded-lg shadow-md">
                <h3 class="text-lg font-semibold text-blue-400 mb-2">Assists</h3>
                <p class="text-3xl font-bold">{{ statResult.assists }}</p>
            </div>

            <div class="bg-slate-700 p-6 rounded-lg shadow-md">
                <h3 class="text-lg font-semibold text-blue-400 mb-2">+/-</h3>
                <p :class="statResult.diffKda >= 0 ? 'text-green-400' : 'text-red-400'" class="text-3xl font-bold">{{ statResult.diffKda >= 0 ? '+'+statResult.diffKda : statResult.diffKda }}</p>
            </div>


            <div class="bg-slate-700 p-6 rounded-lg shadow-md">
                <h3 class="text-lg font-semibold text-blue-400 mb-2">Damage Made</h3>
                <p class="text-3xl font-bold">{{ statResult.damage_made }}</p>
            </div>
            
            <div class="bg-slate-700 p-6 rounded-lg shadow-md col-span-2">
                <h3 class="text-lg font-semibold text-blue-400 mb-2">Agent Played</h3>
                <div class="flex">
                    <img class="w-14 mx-3" v-for="url in statResult.agents_arr" :src="url.small" alt="">
                </div>
            </div>

            <div class="bg-slate-700 p-6 rounded-lg shadow-md">
                <h3 class="text-lg font-semibold text-blue-400 mb-2">Damage Received</h3>
                <p class="text-3xl font-bold">{{ statResult.damage_received }}</p>
            </div>
        </div>
        <!-- Chart Section -->
        <div>
            <apexchart
            class="flex justify-center items-center bg-slate-800 my-5 w-full"
            v-if="statResult"
            height="300"
            type="line"
            :options="options"
            :series="series"
            />
        </div>
    </div>
</template>