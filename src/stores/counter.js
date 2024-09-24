import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';

export const useFetchStore = defineStore('fetchStore', () => {
  const allMatchData = ref([]);
  const allPlayer = [];

  const resultAcs = ref([]);
  const resultHs = ref([])
  function getAcsResult() {
    return resultAcs.value
  }
  function getHsResult() {
    return resultHs.value
  }

  async function getData(url) {
    resultAcs.value = [];
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

      // Clear allPlayer before processing new data
      allPlayer.length = 0;

      allMatchData.value.map((x) => {
        x.players.all_players.map((y) => {
          console.log(x, y)
          if (['Clara', 'lotte D angelo', 'Chunchunmaru', 'Karn5656', 'perle', 'Eighty Six', 'Saint Laurent', 'Shukaku'].includes(y.name)) {
            allPlayer.push({
              name: y.name,
              acs: Math.ceil(y.stats.score / x.metadata.rounds_played),
              kda: {kills: y.stats.kills, deaths: y.stats.deaths, assists: y.stats.assists},
              map: x.metadata.map,
              character: y.character,
              hsPercent: Math.ceil((y.stats.headshots / (y.stats.bodyshots + y.stats.headshots + y.stats.legshots)) * 100),
              date: x.metadata.game_start_patched
            });
          }
        });
      });

      let mostAcsByPlayer = {};
      allPlayer.forEach(player => {
        // If player is not yet in the object or the current ACS is more than the stored one, update it
        if (!mostAcsByPlayer[player.name] || player.acs > mostAcsByPlayer[player.name].acs) {
          mostAcsByPlayer[player.name] = {
            acs: player.acs,
            map: player.map,
            character: player.character,
            kda: player.kda,
            hsPercent: player.hsPercent,
            date: player.date
          };
        }
      });

      let mostHsByPlayer = {}
      allPlayer.forEach(player => {
        // If player is not yet in the object or the current ACS is more than the stored one, update it
        if (!mostHsByPlayer[player.name] || player.hsPercent > mostHsByPlayer[player.name].hsPercent) {
          mostHsByPlayer[player.name] = {
            acs: player.acs,
            map: player.map,
            character: player.character,
            kda: player.kda,
            hsPercent: player.hsPercent,
            date: player.date
          };
        }
      });

      for (const player in mostAcsByPlayer) {
        resultAcs.value.push({
          name: player,
          lacs: mostAcsByPlayer[player].acs,
          date: mostAcsByPlayer[player].date,
          map: mostAcsByPlayer[player].map,
          character: mostAcsByPlayer[player].character,
          kda: mostAcsByPlayer[player].kda,
          hsPercent: mostAcsByPlayer[player].hsPercent,
          date: mostAcsByPlayer[player].date
        });
      }

      for (const player in mostHsByPlayer) {
        resultHs.value.push({
          name: player,
          lacs: mostHsByPlayer[player].acs,
          date: mostHsByPlayer[player].date,
          map: mostHsByPlayer[player].map,
          character: mostHsByPlayer[player].character,
          kda: mostHsByPlayer[player].kda,
          hsPercent: mostHsByPlayer[player].hsPercent,
          date: mostHsByPlayer[player].date
        });
      }
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

  return { getData, resultAcs, getAcsResult, getHsResult, fetchData, normalFetchData }
})
