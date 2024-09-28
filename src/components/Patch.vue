<script setup>
</script>

<template>
    <div class="flex flex-col items-center w-full h-screen bg-slate-800 text-white">
        <!-- Parent of all div -->
        <div class="flex flex-col items-center my-5">
            <!-- Child element -->
            <div class="w-3/4">
                <h1 class="font-bold text-2xl">Patch 1.0</h1>
                <hr class="h-px my-2 bg-gray-500 border-0">
                <!-- Core update -->
                <div>
                    <h1 class="text-lg font-semibold">Core update</h1>
                    <p>• Now data not only show your best in last 5 games but show last 5 games you played with 'Clara'</p>
                    <p>• Now you can click the element to see more details of that game</p>
                    <p>• Remove HS% page</p>
                </div>
                <div class="mt-3">
                    <!-- Minimal update -->
                    <h1 class="text-lg font-semibold">Minimal/Optimize update</h1>
                    <p>• Stats page now fix bug about time of that matched played to show correctly</p>
                    <p>• Both ACS and HS% page now have data of K/D ratio</p>
                    <p>• Add developer notes page to track what updated of website</p>
                </div>
                <!-- Signature -->
                <div class="mt-3">
                    <p class="text-xs">Developer : <a class="underline" target="_blank" href="https://github.com/ssarunyu">ssarunyu</a></p>
                </div>
            </div>
        </div>
    </div>
</template>