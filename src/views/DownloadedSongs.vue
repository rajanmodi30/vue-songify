<template>
  Welcome
  <downloadedfile
    v-for="file in downloadedResults"
    :key="file._id"
    :file="file"
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
