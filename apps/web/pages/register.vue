<script setup lang="ts">
const { $client } = useNuxtApp();
interface Name {
  first: string;
  middle?: string;
  last: string;
}

const name = reactive<Name>({ first: '', middle: undefined, last: '' });
watchEffect(() => {
  for (const [key, value] of Object.entries(name)) {
    name[key as keyof typeof name] = value?.trim();
  }
});
watchEffect(() => {
  if (name.middle != null && name.middle.length <= 0) {
    name.middle = undefined;
  }
});

async function onSubmit() {
  const { id } = await $client.addUser.mutate({ name });
  await navigateTo({ path: '/', query: { id } });
}
</script>

<template>
  <main>
    <form @submit.prevent="onSubmit()">
      <div>
        <label>
          First name:
          <input v-model="name.first" type="text" />
        </label>
      </div>

      <div>
        <label>
          Middle name:
          <input v-model="name.middle" type="text" />
        </label>
      </div>

      <div>
        <label>
          Last name:
          <input v-model="name.last" type="text" />
        </label>
      </div>
      <br />
      <button type="submit">Submit</button>
    </form>
  </main>
</template>
