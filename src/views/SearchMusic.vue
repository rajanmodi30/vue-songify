<template>
  <div>
    <label>Search Music</label>
    <input v-model="name" @keyup.enter="search" />
  </div>
  <div v-for="(result, index) in results" :key="index">
    <img :src="result.thumbnails.default.url" />
    {{ result.title }}
    <button @click="download(result.link)">Download</button>
  </div>
  <div v-if="resultsLength">Empty Results Search Something</div>
</template>

<script>
import searchManager from "../services/searchManager.js";
// import searchResults from "../components/searchResults.vue";
export default {
  name: "SearchMusic",
  data() {
    return {
      name,
      results: [],
    };
  },
  // components: { searchResults },
  methods: {
    search() {
      searchManager
        .searchSongResults(this.name)
        .then((response) => {
          this.results.splice(0, this.results.length);
          response.data.forEach((data) => {
            this.results.push(data);
            console.log(data);
          });
          console.log(this.results);
        })

        .catch((erro) => console.log(erro));
    },
    download(url) {
      console.log("oading ", url);
      searchManager
        .download(url)
        .then((response) => alert(response.response))
        .catch((err) => console.log(err));
    },
  },
  computed: {
    resultsLength() {
      return this.results.length;
    },
  },
};
</script>
