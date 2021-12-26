<template>
  <button @click="openPick()">Open Picker</button>
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
    console.log("okkk");
  },

  computed: {
    ...mapGetters("music", ["downloadedResults"]),
  },
  methods: {
    ...mapActions("music", ["availableSongs"]),
    async openPick() {
      let [fileHandle] = await window.showOpenFilePicker();
      alert(fileHandle);
    },
  },
};
</script>
