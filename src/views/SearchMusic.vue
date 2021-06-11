<template>
  <div>
    <label>Search Music</label>
    <input v-model="name" />
    <button @click="search">Search</button>
  </div>
</template>

<script>
export default {
  name: "SearchMusic",
  data() {
    return {
      name,
    };
  },
  methods: {
    search() {
      console.log("name", this.name);
    },
  },
};
</script>
