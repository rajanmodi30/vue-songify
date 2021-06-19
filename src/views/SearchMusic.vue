<template>
  <div>
    <form @keyup.enter="searchSong" v-on:submit.prevent="searchSong">
      <input v-model="name" />
      <button type="submit">Search</button>
    </form>
  </div>
  <div v-for="(result, index) in searchResults" :key="index">
    <img :src="result.thumbnails.default.url" />
    {{ result.title }}
    <button @click="download({ link: result.link, name: result.title })">
      Download
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "SearchMusic",
  data() {
    return {
      name,
    };
  },
  computed: {
    ...mapGetters("music", ["searchResults"]),
  },
  methods: {
    searchSong() {
      this.search(this.name);
    },
    ...mapActions("music", ["search", "download"]),
  },
};
</script>
