<script setup lang="ts">
const users = await $fetch('/api/example');
</script>

<template>
  <div>
    <NuxtWelcome />
    <ul>
      <li v-for="user of users" :key="user.id">
        {{ user?.name ?? 'unnamed' }}
      </li>
    </ul>
  </div>
</template>
