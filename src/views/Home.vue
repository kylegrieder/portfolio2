<script setup lang="ts">
const dlResume = 'https://drive.google.com/uc?export=download&id=1abpItLZDAZSdYC4hJNvwT9BXQ_VIyC7d'

const skills = [
    'Go', 'Vue.js', 'TypeScript', 'MySQL', 'Docker', 'AWS',
    'Claude Code', 'GitHub Copilot', 'OpenCode', 'Gemini CLI'
]
</script>

<template>
    <div class="flex flex-col items-center space-y-8 max-w-3xl mx-auto">
        <img class="rounded-2xl max-h-[40vh]" src="../assets/images/kyle.grieder.png" alt="me">

        <p class="text-center text-neutral-200 leading-relaxed">
            Engineering leader at Arivo Acceptance, where I lead a team of 7 engineers plus a dedicated PM and
            QA, owning architecture and delivery for the applications supporting a $600M+ loan portfolio.
            Outside of work I contribute to open-source projects and build side projects end-to-end.
        </p>

        <div class="flex flex-wrap justify-center gap-2">
            <span v-for="skill in skills" :key="skill" class="pill">{{ skill }}</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            <router-link to="/projects" class="card items-center text-center hover:border-neutral-500 transition-colors">
                <div class="text-xl font-semibold">Projects</div>
                <div class="text-sm text-neutral-400 mt-1">BWC Companies, Homarr, Dracula Pro</div>
            </router-link>
            <router-link to="/case-studies" class="card items-center text-center hover:border-neutral-500 transition-colors">
                <div class="text-xl font-semibold">Case Studies</div>
                <div class="text-sm text-neutral-400 mt-1">Six systems built at Arivo Acceptance</div>
            </router-link>
            <router-link to="/leadership" class="card items-center text-center hover:border-neutral-500 transition-colors">
                <div class="text-xl font-semibold">Leadership</div>
                <div class="text-sm text-neutral-400 mt-1">Team growth and delivery impact</div>
            </router-link>
        </div>

        <a :href="dlResume" class="underline hover:text-neutral-300">download resume</a>
    </div>
</template>
