<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router';
const route = useRoute();
</script>

<template>
  <div class="flex flex-col justify-center items-center p-5 bg-slate-800">
    <h1 class="text-3xl font-bold text-white">Black Dog Hall Of Fame</h1>
    <p class="text-lg text-white">บุคคลทำบาปประจำ 5 เกมท้าย</p>
    <p class="text-xs text-center text-white">In this website Black Dog includes 'Clara', 'lotte D angelo', 'Chunchunmaru', 'Karn5656', 'perle', 'Eighty Six', 'Saint Laurent', 'Shukaku'</p>
  </div>
  <nav class="flex w-full justify-center items-center space-x-5 bg-slate-900 text-white">
    <div :class="['p-2', route.name === 'acs' ? 'border-b-2 border-white' : '']">
      <RouterLink :to="{name: 'acs'}">Best ACS</RouterLink>
    </div>
    <div :class="['p-2', route.name === 'headshot' ? 'border-b-2 border-white' : '']">
      <RouterLink :to="{name: 'headshot'}">Best HS%</RouterLink>
    </div>
    <div :class="['p-2', route.name === 'stats' ? 'border-b-2 border-white' : '']">
      <RouterLink :to="{name: 'stats'}">Stats</RouterLink>
    </div>
    <div :class="['p-2', route.name === 'about' ? 'border-b-2 border-white' : '']">
      <RouterLink :to="{name: 'about'}">About</RouterLink>
    </div>
  </nav>
  <RouterView />
</template>