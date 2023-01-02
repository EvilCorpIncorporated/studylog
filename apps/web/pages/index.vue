<script setup lang="ts">
import { useRouteQuery } from '@vueuse/router';
const { $client } = useNuxtApp();
const idRaw = $(useRouteQuery('id', '1'));
const id = $computed(() => Number(idRaw));

// const { data: name } = await useAsyncData(
//   'name',
//   async () => {
//     const { name } = await $client.getUser.query({ id });
//     return name;
//   },
//   { watch: [$$(id)] },
// );

async function addEvents() {
  const events = await $client.addEvents.mutate({
    events: [
      {
        tab: {
          url: 'https://www.google.com',
          title: 'Google',
          active: true,
        },
        enter_time: new Date(),
      },
    ],
    user_id: 'foobar',
  });
  console.log(events);
}
</script>

<template>
  <main>
    <button @click="addEvents()">Add events</button>
    <!-- <label>
      User ID:
      <input v-model="idRaw" type="number" />
    </label>
    <p v-if="name != null">
      Hello {{ name.first }}
      <span v-if="name.middle != null"> {{ name.middle }} </span>
      {{ name.last }}!
    </p>
    <p v-else> No user exists with ID {{ id }}. </p>
    <NuxtLink to="/register">
      <button> Register </button>
    </NuxtLink> -->
  </main>
</template>
