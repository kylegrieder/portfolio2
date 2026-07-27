<script setup lang="ts">
import NavBar from './components/NavBar.vue'
</script>

<template>
    <div class="flex flex-col bg-neutral-800 text-neutral-50 min-h-screen space-y-6 p-4 font-qs cursor-default">
        <header class="flex flex-col text-center space-y-4">
            <div class="flex space-x-2 justify-center">
                <a href="https://twitter.com/kylegrieder_" target="_blank">
                    <img class="h-6" src="./assets/images/icons/twitter.svg" alt="twitter">
                </a>
                <a href="https://instagram.com/kylegrieder" target="_blank">
                    <img class="h-6" src="./assets/images/icons/instagram.svg" alt="instagram">
                </a>
                <a href="https://github.com/kylegrieder" target="_blank">
                    <img class="h-6" src="./assets/images/icons/github.svg" alt="github">
                </a>
                <a href="mailto:kyle.grieder@gmail.com" target="_blank">
                    <img class="h-6" src="./assets/images/icons/envelope.svg" alt="email">
                </a>
            </div>
            <span class="text-6xl/relaxed">kyle grieder</span>
            <NavBar />
        </header>
        <main class="flex-1 w-full">
            <router-view />
        </main>
        <footer class="flex justify-center whitespace-pre-wrap">
            <div class="align-middle text-center">kyle grieder&trade;</div>
            <div class="align-middle text-center">All rights reserved</div>
        </footer>
    </div>
</template>
