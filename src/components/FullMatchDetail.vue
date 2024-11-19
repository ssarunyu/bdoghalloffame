<script setup>
const props = defineProps({
    details: {
        require: true
    }
})

console.log(props.details)
</script>

<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black/80 z-50" v-if="props.details">
        <div class="bg-white text-black">

        </div>
        <div class="flex flex-col w-full p-10">
            <div class="flex flex-col justify-center items-center space-y-1">
                <div class="flex flex-col justify-center items-center">
                    <p>Match Result</p>
                    <p>{{ props.details.teams.red.has_won ? 'Red Team Won' : 'Blue Team Won' }}</p>
                    <p class="font-bold text-2xl" v-if="props.details.teams.red.has_won === true">{{ props.details.teams.red.rounds_won }}-{{ props.details.teams.red.rounds_lost }}</p>
                    <p class="font-bold text-2xl" v-if="props.details.teams.blue.has_won === true">{{ props.details.teams.blue.rounds_won }}-{{ props.details.teams.blue.rounds_lost }}</p>
                </div>
                <p>Round Record</p>
                <div class="flex justify-center items-center">
                    <p v-for="(round, index) in props.details.rounds"
                    class="mx-1 items-center rounded-md flex justify-center h-8 w-8"
                    :class="round.winning_team === 'Blue' ? 'bg-blue-400' : 'bg-red-400'">
                        {{ index + 1 }}
                    </p>
                </div>
            </div>
            <!-- Team Section -->
            <div class="mt-5">
                <div>
                    <p class="bg-red-400">Red Team</p>
                    <div class="flex justify-between p-2" v-for="name in props.details.players.red">
                        <p>{{ name.name }}</p>
                        <p>{{ name.stats.kills }}/{{ name.stats.deaths }}/{{ name.stats.assists }}</p>
                        <p>{{ name.stats.kills - name.stats.deaths }}</p>
                    </div>
                </div>
                <div>
                    <p class="bg-blue-400">Blue Team</p>
                    <div class="flex justify-between p-2" v-for="name in props.details.players.blue">
                        <p>{{ name.name }}</p>
                        <p>{{ name.stats.kills }}/{{ name.stats.deaths }}/{{ name.stats.assists }}</p>
                        <p>{{ name.stats.kills - name.stats.deaths }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>