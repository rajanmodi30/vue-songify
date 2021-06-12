<template>
  <div>
    <label>Search Music</label>
    <input v-model="name" @keyup.enter="searchSong" />
  </div>
  <div v-for="(result, index) in this.$store.state.searchResults" :key="index">
    <img :src="result.thumbnails.default.url" />
    {{ result.title }}
    <button @click="download({ link: result.link, name: result.title })">
      Download
    </button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "SearchMusic",
  data() {
    return {
      name,
    };
  },
  methods: {
    searchSong() {
      this.search(this.name);
    },
    ...mapActions(["search", "download"]),
  },
};
</script>
