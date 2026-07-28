<script setup lang="ts">
import TeamCultureCharts from '../components/TeamCultureCharts.vue'
</script>

<template>
    <div class="max-w-3xl mx-auto space-y-8">
        <h1 class="section-title">Leadership &amp; Impact</h1>

        <div class="card space-y-2">
            <div class="text-xl font-semibold">Current scope</div>
            <p class="text-neutral-200 leading-relaxed">
                Lead a team of 7 engineers plus a dedicated PM and QA, owning architecture and delivery for
                the applications supporting
                <a href="https://arivo.com" target="_blank" class="underline hover:text-neutral-50">Arivo Acceptance</a>'s
                loan portfolio — <span class="font-semibold">$600M+</span>
                and fluctuating (<span class="text-neutral-400">$619M as of July 2026</span>).
            </p>
        </div>

        <div class="space-y-4">
            <div class="text-xl font-semibold text-center">Team Culture Turnaround</div>
            <p class="text-neutral-400 text-center -mt-2">
                COFI team · H1 2025 vs H1 2026 · 802 delivered issues from Jira project CO.
            </p>
            <TeamCultureCharts />
        </div>
    </div>
</template>
