<script setup lang="ts">
interface ProjectLink {
    label: string
    href: string
}

interface Project {
    name: string
    role: string
    stack: string
    description: string
    links: ProjectLink[]
    note?: string
}

const projects: Project[] = [
    {
        name: 'BWC Companies',
        role: 'Sole developer',
        stack: 'Webflow, custom JavaScript',
        description: 'Full marketing site build from Figma handoff to launch, including custom interactions ' +
            'beyond Webflow\'s stock components.',
        links: [
            { label: 'Visit site', href: 'https://bwccompanies.com' }
        ]
    },
    {
        name: 'Homarr',
        role: 'Open-source contributor',
        stack: 'TypeScript, Next.js, tRPC',
        description: 'Contributed to Homarr, a self-hosted dashboard with 4.4k+ GitHub stars: added a ' +
            'Speedtest Tracker integration and an OS-level auto theme mode, including a dark-mode fix for ' +
            'the system resource charts.',
        links: [
            { label: 'Repo', href: 'https://github.com/homarr-labs/homarr' },
            { label: 'PR #5363 — Speedtest Tracker', href: 'https://github.com/homarr-labs/homarr/pull/5363' },
            { label: 'PR #5492 — Auto theme mode', href: 'https://github.com/homarr-labs/homarr/pull/5492' }
        ]
    },
    {
        name: 'Dracula Pro (JetBrains)',
        role: 'Contributor, Dracula Team',
        stack: 'JetBrains Theming API',
        description: 'Ported all 7 official Dracula variants — Pro, Blade, Buffy, Lincoln, Morbius, Van ' +
            'Helsing, and Alucard — to JetBrains\' theming API. The free edition of Dracula has 23k+ GitHub ' +
            'stars.',
        note: 'The Pro repo is private/commercial, so it isn\'t linkable here.',
        links: [
            { label: 'Dracula Pro', href: 'https://draculatheme.com/pro' }
        ]
    }
]
</script>

<template>
    <div class="max-w-3xl mx-auto space-y-6">
        <h1 class="section-title">Projects</h1>

        <div v-for="project in projects" :key="project.name" class="card space-y-3">
            <div>
                <div class="text-xl font-semibold">{{ project.name }}</div>
                <div class="text-sm text-neutral-400">{{ project.role }} · {{ project.stack }}</div>
            </div>
            <p class="text-neutral-200 leading-relaxed">{{ project.description }}</p>
            <p v-if="project.note" class="text-sm text-neutral-500 italic">{{ project.note }}</p>
            <div class="flex flex-wrap gap-2">
                <a
                    v-for="link in project.links"
                    :key="link.href"
                    :href="link.href"
                    target="_blank"
                    class="link-pill"
                >{{ link.label }}</a>
            </div>
        </div>
    </div>
</template>
