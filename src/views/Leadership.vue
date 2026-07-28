<script setup lang="ts">
interface Stat {
    label: string
    value: string
}

const turnaroundStats: Stat[] = [
    { label: 'Cycle time', value: '−35%' },
    { label: 'Defect intake', value: '−51%' },
    { label: 'Planned delivery', value: '+77%' },
    { label: 'Tech-debt remediation', value: '~9x' },
    { label: 'Team growth', value: '4 → 7 reports' }
]
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
                Results from rebuilding process and culture on the COFI team.
            </p>
            <div class="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div v-for="stat in turnaroundStats" :key="stat.label" class="stat-card">
                    <div class="text-2xl font-semibold">{{ stat.value }}</div>
                    <div class="text-xs text-neutral-400 mt-1">{{ stat.label }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
