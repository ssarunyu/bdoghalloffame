<script setup>
    import { useFetchStore } from '@/stores/counter'
    import { onMounted, ref } from 'vue';
    // access the `store` variable anywhere in the component ✨
    const store = useFetchStore()
    const arr = ref([])

    // Valorant Image data
    const mapData = ref({})
    const agentData = ref({})
    const rankData = ref({})

    // User input
    const userName = ref('')
    const userTag = ref('')

    // Fetch Data
    async function getThatUser() {
        arr.value = []
        const a = await store.fetchData(`https://api.henrikdev.xyz/valorant/v1/stored-matches/ap/${userName.value}/${userTag.value}`)
        arr.value.push(a)
    }
    const findWinsTeam = (teams, userTeam) => {
      // Get team names in lowercase to match 'red' or 'blue'
      const userTeamLower = userTeam.toLowerCase();
      const opposingTeam = userTeamLower === 'red' ? 'blue' : 'red';
      // Compare scores
      if (teams[userTeamLower] > teams[opposingTeam]) {
        return 'Win';
      } else if (teams[userTeamLower] < teams[opposingTeam]) {
        return 'Lose';
      }
      return 'Draw'; // In case of a tie
    }

    // Get Image
    const findMapImage = (mapName) => {
        const a = mapData.value.data.find((mx) => mx.displayName === mapName)
        return a.splash
    }
    const findCharacterImage = (characterName) => {
      const result = agentData.value.data.find((cha) => cha.displayName === characterName)
      return result.displayIcon
    }
    const findRankImage = (rankTier) => {
      const result = rankData.value.data[4].tiers.find((r) => r.tier === rankTier)
      return result.smallIcon
    }
    const formatDate = (date) => {
      const toDate = new Date(date)
      const options = { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false // 24-hour clock
      }
      const gmtPlus7Date = new Date(toDate.getTime() + (7 * 60 * 60 * 1000))
      const gmtPlus7String = gmtPlus7Date.toLocaleString('en-GB', options)
      return gmtPlus7String
    }

    onMounted(async () => {
        const maps = await store.normalFetchData('https://valorant-api.com/v1/maps')
        mapData.value = maps
        const agents = await store.normalFetchData('https://valorant-api.com/v1/agents?isPlayableCharacter=true')
        agentData.value = agents
        const rank = await store.normalFetchData('https://valorant-api.com/v1/competitivetiers')
        rankData.value = rank
    })
</script>

<template>
    <div class="flex flex-col items-center w-full min-h-screen bg-slate-800">
      <div class="my-5 flex justify-center items-center space-x-4">
        <input
          v-model="userName"
          type="text"
          placeholder="Username"
          class="p-2 bg-slate-800 text-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          v-model="userTag"
          type="text"
          placeholder="Tag (without #)"
          class="p-2 bg-slate-800 text-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          @click="getThatUser"
          class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Search
        </button>
      </div>
      <div class="w-3/4 max-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-slate-500 scrollbar-track-slate-800">
        <div v-if="arr.length !== 0">
          <div class="flex flex-col justify-center items-center text-white p-2 bg-slate-700">
            <p>Total Match Found : {{ arr[0].results.total }}</p>
            <p>*If data skips blame API Endpoint not me :3</p>
          </div>
        </div>
        <div v-if="arr.length !== 0" v-for="item in arr[0].data" :key="item.meta.mode" class="w-full p-4">
            <div class="relative flex justify-between items-center bg-white p-4 rounded-lg shadow-md bg-cover"
            :style="{ backgroundImage: `url(${findMapImage(item.meta.map.name)})` }">
            <!-- Line that show win or lose -->
            <div class="absolute inset-y-0 left-0 w-2"
            :class="findWinsTeam(item.teams, item.stats.team) === 'Win' ? 'bg-emerald-500' : 'bg-rose-500'">
            </div>
              <div>
                <!-- Image -->
                <div class="flex">
                  <img :src="findRankImage(item.stats.tier)" alt="rank image" class="w-14 h-14">
                  <img :src="findCharacterImage(item.stats.character.name)" alt="Character image" class="w-14 h-14">
                </div>
                <p class="text-white">{{ formatDate(item.meta.started_at) }}</p>
                <p class="text-lg font-bold text-white">{{ item.meta.mode }}</p>
                <div class="text-white">
                  <span class="font-semibold">{{ item.stats.character.name }}</span> in <span class="font-semibold">{{ item.meta.map.name }}</span>
                </div>
              </div>
              <div class="flex flex-col text-white justify-center items-center">
                  <p class="font-bold text-2xl">
                  {{ item.stats.kills }}/{{ item.stats.deaths }}/{{ item.stats.assists }}
                  </p>
                  <p>
                  HS
                  {{ Math.ceil((item.stats.shots.head / (item.stats.shots.head + item.stats.shots.body + item.stats.shots.leg)) * 100) }}%
                  </p>
                  <p>{{ findWinsTeam(item.teams, item.stats.team) }}</p>
              </div>
            </div>
        </div>
      </div>
    </div>
</template>  