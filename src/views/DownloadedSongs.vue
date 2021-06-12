<template>
  <downloadedfile
    v-for="(file, index) in this.$store.state.downloadedResults"
    :key="index"
    :file="file"
    :playAudio="false"
  ></downloadedfile>
</template>

<script>
import Downloadedfile from "../components/Downloadedfile.vue";
export default {
  components: { Downloadedfile },
  name: "DownloadedSongs",
};
</script>
