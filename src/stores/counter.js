import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';

export const useFetchStore = defineStore('fetchStore', () => {
  // For details
  const selectedPlayer = ref(null)

  const allMatchData = ref([]);
  const allPlayer = ref([])
  const agentData = ref({})

  function getAllPlayer() {
    return allPlayer.value
  }

  async function getData(url) {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${url}?api_key=HDEV-17316141-9e15-451f-8260-fe73f9e6165b`,
    };
    try {
      const response = await axios.request(config);
      const raw = JSON.stringify(response.data);
      const result = JSON.parse(raw);
      allMatchData.value = result.data;

      // Clear allPlayer.value before processing new data
      allPlayer.value.length = 0;

      allMatchData.value.map((x) => {
        x.players.all_players.map((y) => {
          console.log(y)
          if (['Clara', 'perfume', 'Chunchunmaru', 'Karn5656', 'perle', 'Eighty Six', 'Saint Laurent', 'Shukaku'].includes(y.name)) {
            allPlayer.value.push({
              name: y.name,
              acs: Math.ceil(y.stats.score / x.metadata.rounds_played),
              kda: {kills: y.stats.kills, deaths: y.stats.deaths, assists: y.stats.assists},
              map: x.metadata.map,
              character: y.character,
              hsPercent: Math.ceil((y.stats.headshots / (y.stats.bodyshots + y.stats.headshots + y.stats.legshots)) * 100),
              date: x.metadata.game_start_patched,
              userPlayedTeam: y.team,
              allRound: x.rounds,
              ability_casts: y.ability_casts,
              damage_made: y.damage_made,
              damage_received: y.damage_received,
              characterIcon: y.assets.agent.small,
              shotStat: y.stats
            });
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchData(url) {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${url}?api_key=HDEV-17316141-9e15-451f-8260-fe73f9e6165b`,
    }
    try {
      const response = await axios.request(config);
      const raw = JSON.stringify(response.data);
      const result = JSON.parse(raw);
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async function normalFetchData(url) {
    try {
      const response = await axios.request(url)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  return { getData, fetchData, normalFetchData, getAllPlayer }
})
