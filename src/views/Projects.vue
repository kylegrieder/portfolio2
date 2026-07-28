<script setup lang="ts">
import DraculaThemeViewer from '../components/DraculaThemeViewer.vue'

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

        <div class="card space-y-3">
            <div>
                <div class="text-xl font-semibold">Dracula Pro (JetBrains)</div>
                <div class="text-sm text-neutral-400">Contributor, Dracula Team · JetBrains Theming API</div>
            </div>
            <p class="text-neutral-200 leading-relaxed">
                Theme design and original Dracula palette are by the Dracula Team — my contribution was
                porting all 7 official variants (Pro, Blade, Buffy, Lincoln, Morbius, Van Helsing, and
                Alucard) to JetBrains' theming API and building support for JetBrains' new Islands UI style.
                The free edition of Dracula has 23k+ GitHub stars.
            </p>
            <p class="text-sm text-neutral-500 italic">
                The Pro repo is private/commercial, so it isn't linkable here. Screenshots below are real
                captures of the port running in JetBrains IDEs.
            </p>
            <DraculaThemeViewer />
            <div class="flex flex-wrap gap-2">
                <a href="https://draculatheme.com/pro" target="_blank" class="link-pill">Dracula Pro</a>
            </div>
        </div>
    </div>
</template>
