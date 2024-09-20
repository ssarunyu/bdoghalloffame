<script setup>
</script>

<template>
    <div class="flex flex-col items-center w-full h-screen bg-slate-800 text-white">
      <div class="flex flex-col items-center text-center mt-10">
        <h1 class="text-2xl font-bold mb-4">About this website</h1>
        <img class="rounded-full w-[150px] h-[150px] mx-auto mb-4 shadow-xl shadow-indigo-500/50" src="/avatar.jpg" alt="Avatar">
        <h1 class="text-2xl font-semi bold">SSARUNYU</h1>
        <p class="w-1/2 text-slate-100">"Inspiration for create this website is WHY NOT?"</p>
        <div class="flex flex-col justify-center items-center my-10">
            <h1 class="text-xl font-semibold">Technology Stack</h1>
            <div class="p-2 flex justify-around items-center rounded-md text-white space-x-7">
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
                    <a class="underline" target="_blank" href="https://github.com/Henrik-3/unofficial-valorant-api">unofficial-valorant-api<br>by Henrik-3</a>
                </div>
                <div class="flex flex-col justify-center items-center">
                    <img class="w-[50px] h-[50px]" src="/valorant-api.png" alt="">
                    <a class="underline" target="_blank" href="https://github.com/Valorant-API">Valorant-API<br>(for image)</a>
                </div>
            </div>
        </div>
        <!-- Description -->
        <div>
            <p>Made with &lt;3 from <a class="underline" target="_blank" href="https://github.com/ssarunyu">ssarunyu</a> to bully friends</p>
        </div>
      </div>
    </div>
  </template>
  