<script setup>
</script>

<template>
    <div class="flex flex-col w-full h-screen bg-slate-800 text-white">
      <div class="text-center mt-10">
        <h1 class="text-2xl font-bold mb-4">About this website</h1>
        <img class="rounded-full w-[250px] h-[250px] mx-auto mb-4 shadow-xl shadow-indigo-500/50" src="/avatar.jpg" alt="Avatar">
        <div class="flex flex-col justify-center items-center space-y-3">
            <p class="font-xl font-semibold">Technology Stack</p>
            <div class="p-2 flex justify-around items-center w-3/4 rounded-md bg-white text-slate-800">
                <div class="flex flex-col justify-center items-center">
                    <img class="w-[50px] h-[50px]" src="/vuejs.png" alt="">
                    <p>Vue.js</p>
                </div>
                <div class="flex flex-col justify-center items-center">
                    <img class="w-[50px] h-[50px]" src="/pinia.svg" alt="">
                    <p>Pinia</p>
                </div>
                <div class="flex flex-col justify-center items-center">
                    <img class="w-[180px] h-[50px]" src="/axios.png" alt="">
                    <p>Axios</p>
                </div>
                <div class="flex flex-col justify-center items-center">
                    <img class="w-[70px] h-[50px]" src="/tailwind.png" alt="">
                    <p>Tailwind CSS</p>
                </div>
                <div class="flex flex-col justify-center items-center">
                    <img class="w-[120px] h-[50px]" src="/vercel.png" alt="">
                    <p>Vercel</p>
                </div>
                <div class="flex flex-col justify-center items-center">
                    <img class="w-[50px] h-[50px]" src="/github.png" alt="">
                    <a class="underline" target="_blank" href="https://github.com/Henrik-3/unofficial-valorant-api">unofficial-valorant-api by Henrik-3</a>
                </div>
            </div>
        </div>
        <!-- Description -->
        <div class="mt-5">
            <p>Made with &lt;3 from <a class="underline" target="_blank" href="https://github.com/ssarunyu">ssarunyu</a> to bully friends</p>
        </div>
      </div>
    </div>
  </template>
  