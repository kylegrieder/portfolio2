<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const screenshots = import.meta.glob('../assets/images/jetbrains_theme_screenshots/*.png', {
    eager: true,
    import: 'default'
}) as Record<string, string>

function screenshotUrl(language: string, variant: string): string {
    const entry = Object.entries(screenshots).find(([path]) => path.endsWith(`/${language}_${variant}.png`))
    return entry ? entry[1] : ''
}

const variants = [
    { key: 'blade', label: 'Blade' },
    { key: 'buffy', label: 'Buffy' },
    { key: 'lincoln', label: 'Lincoln' },
    { key: 'morbius', label: 'Morbius' },
    { key: 'van-helsing', label: 'Van Helsing' },
    { key: 'alucard', label: 'Alucard' }
]

const languages = [
    { key: 'vue', label: 'Vue' },
    { key: 'ts', label: 'TypeScript' },
    { key: 'go', label: 'Go' },
    { key: 'sql', label: 'SQL' },
    { key: 'dockerfile', label: 'Dockerfile' }
]

const selectedVariant = ref(variants[0].key)
const selectedLanguage = ref(languages[0].key)

const currentScreenshot = computed(() => screenshotUrl(selectedLanguage.value, selectedVariant.value))

const lightboxOpen = ref(false)

function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') lightboxOpen.value = false
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<template>
    <div class="space-y-3">
        <div class="flex flex-wrap gap-2">
            <button
                v-for="variant in variants"
                :key="variant.key"
                type="button"
                class="pill transition-colors"
                :class="selectedVariant === variant.key ? 'bg-neutral-500' : 'hover:bg-neutral-600'"
                @click="selectedVariant = variant.key"
            >{{ variant.label }}</button>
        </div>
        <div class="flex flex-wrap gap-2">
            <button
                v-for="language in languages"
                :key="language.key"
                type="button"
                class="link-pill"
                :class="selectedLanguage === language.key ? 'bg-neutral-500' : ''"
                @click="selectedLanguage = language.key"
            >{{ language.label }}</button>
        </div>
        <img
            :src="currentScreenshot"
            :alt="`${selectedVariant} theme in JetBrains, showing ${selectedLanguage} code`"
            class="rounded-lg border border-neutral-700 w-full cursor-zoom-in"
            @click="lightboxOpen = true"
        >

        <div
            v-if="lightboxOpen"
            class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 cursor-zoom-out"
            @click="lightboxOpen = false"
        >
            <button
                type="button"
                class="absolute top-4 right-4 text-neutral-200 hover:text-white text-3xl leading-none"
                @click="lightboxOpen = false"
            >&times;</button>
            <img
                :src="currentScreenshot"
                :alt="`${selectedVariant} theme in JetBrains, showing ${selectedLanguage} code`"
                class="max-w-full max-h-full rounded-lg cursor-auto"
                @click.stop
            >
        </div>
    </div>
</template>
