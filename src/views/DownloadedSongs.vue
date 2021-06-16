<template>
  <downloadedfile
    v-for="(file, index) in downloadedResults"
    :key="index"
    :file="file"
    :playAudio="false"
  ></downloadedfile>
</template>

<script>
import Downloadedfile from "../components/Downloadedfile.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: { Downloadedfile },
  name: "DownloadedSongs",
  created() {
    this.availableSongs();
  },
  computed: {
    ...mapGetters("music", ["downloadedResults"]),
  },
  methods: {
    ...mapActions("music", ["availableSongs"]),
  },
};
</script>
