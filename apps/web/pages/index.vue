<script setup lang="ts">
const { $client } = useNuxtApp();

const { name } = await $client.getUser.query({ id: 2 });
</script>

<template>
  <p>
    Hello {{ name.first }}
    <span v-if="name.middle != null">{{ name.middle }}</span>
    {{ name.last }}!
  </p>
</template>
