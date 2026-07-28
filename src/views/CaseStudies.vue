<script setup lang="ts">
interface CaseStudy {
    name: string
    problem: string
    approach: string
    outcome: string
}

const caseStudies: CaseStudy[] = [
    {
        name: 'Original Loan Origination System',
        problem: 'Arivo had no system to originate loans — the process depended on manual workflows with no ' +
            'centralized platform or bureau connectivity.',
        approach: 'Designed and built the origination system from the ground up, including direct TransUnion ' +
            'and Experian bureau integrations and dealer-management tooling for partner dealerships.',
        outcome: 'Delivered the foundational platform that Arivo\'s lending operations still run on today.'
    },
    {
        name: 'Loan Risk Calculation Engine',
        problem: 'Risk decisions were manual and slow, creating a bottleneck between application and approval.',
        approach: 'Built a config-driven risk calculation engine so underwriting rules could be tuned without ' +
            'code changes.',
        outcome: 'Cut decision time from roughly an hour to about 11 minutes.'
    },
    {
        name: 'Dealer Loan Structuring Portal',
        problem: 'Dealers had no self-serve way to structure loan terms, adding friction and manual ' +
            'back-and-forth to every deal.',
        approach: 'Architected and led development of a dedicated portal for dealers to structure loans ' +
            'directly.',
        outcome: 'Increased loan volume and processing efficiency for the dealer channel.'
    },
    {
        name: 'Titles Management Application',
        problem: 'Title tracking lived in spreadsheets, making status hard to track and error-prone at scale.',
        approach: 'Replaced the spreadsheet process with a purpose-built titles management application.',
        outcome: 'Processed titles about 20% faster with a clear audit trail.'
    },
    {
        name: 'Partner Integration API',
        problem: 'A lending partner\'s data model didn\'t match Arivo\'s, blocking clean integration.',
        approach: 'Built a normalization API layer to translate between the two data models.',
        outcome: 'Unblocked the partnership without forcing either side to restructure their core systems.'
    },
    {
        name: 'Shared Vue.js Component Library',
        problem: 'Each app in the team\'s suite implemented its own UI components, causing visual drift and ' +
            'duplicated work.',
        approach: 'Designed and built a shared Vue.js component library adopted across the team\'s ' +
            'application suite.',
        outcome: 'Standardized UI/UX and cut duplicate component work across projects.'
    }
]
</script>

<template>
    <div class="max-w-3xl mx-auto space-y-6">
        <h1 class="section-title">Case Studies</h1>
        <p class="text-center text-neutral-400 -mt-4">Systems built while leading engineering at Arivo Acceptance.</p>

        <div v-for="study in caseStudies" :key="study.name" class="card space-y-3">
            <div class="text-xl font-semibold">{{ study.name }}</div>
            <div>
                <div class="text-sm font-semibold text-neutral-400 uppercase tracking-wide">Problem</div>
                <p class="text-neutral-200 leading-relaxed">{{ study.problem }}</p>
            </div>
            <div>
                <div class="text-sm font-semibold text-neutral-400 uppercase tracking-wide">Approach</div>
                <p class="text-neutral-200 leading-relaxed">{{ study.approach }}</p>
            </div>
            <div>
                <div class="text-sm font-semibold text-neutral-400 uppercase tracking-wide">Outcome</div>
                <p class="text-neutral-200 leading-relaxed">{{ study.outcome }}</p>
            </div>
        </div>
    </div>
</template>
