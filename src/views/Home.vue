<script setup lang="ts">
    const dlResume = 'https://drive.google.com/uc?export=download&id=1abpItLZDAZSdYC4hJNvwT9BXQ_VIyC7d'
</script>

<template>
    <div class="flex justify-center">
        <img class="rounded-2xl max-h-[50vh]" src="../assets/images/kyle.grieder.png" alt="me">
    </div>
    <div class="flex justify-center mt-4">
        <a :href="dlResume">download resume</a>
    </div>
</template>
