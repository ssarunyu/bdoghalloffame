import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';

export const useFetchStore = defineStore('fetchStore', () => {
  const allMatchData = ref([]);
  const last5Acs = [];
  const resultToShow = ref([]);
  function getResult() {
    return resultToShow.value
  }

  async function getData(url) {
    resultToShow.value = [];
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

      // Clear last5Acs before processing new data
      last5Acs.length = 0;

      allMatchData.value.map((x) => {
        x.players.all_players.map((y) => {
          console.log(x, y)
          if (['Desmoul', 'lotte D angelo', 'Chunchunmaru', 'Karn5656', 'perle', 'Eighty Six', 'Saint Laurent', 'Shukaku'].includes(y.name)) {
            last5Acs.push({
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

      let leastAcsByPlayer = {};
      last5Acs.forEach(player => {
        // If player is not yet in the object or the current ACS is less than the stored one, update it
        if (!leastAcsByPlayer[player.name] || player.acs < leastAcsByPlayer[player.name].acs) {
          leastAcsByPlayer[player.name] = {
            acs: player.acs,
            map: player.map,
            character: player.character,
            kda: player.kda,
            hsPercent: player.hsPercent,
            date: player.date
          };
        }
      });

      for (const player in leastAcsByPlayer) {
        resultToShow.value.push({
          name: player,
          lacs: leastAcsByPlayer[player].acs,
          date: leastAcsByPlayer[player].date,
          map: leastAcsByPlayer[player].map,
          character: leastAcsByPlayer[player].character,
          kda: leastAcsByPlayer[player].kda,
          hsPercent: leastAcsByPlayer[player].hsPercent,
          date: leastAcsByPlayer[player].date
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return { getData, resultToShow, getResult }
})
