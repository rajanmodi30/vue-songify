<template>
  <div>
    {{ file.name }}
    <button @click="openPlayer">Play</button>
    <button @click="addToPlayList(file)">Add To Playlist</button>
    <button @click="deleteSong(file)" style="color: red">Delete</button>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "Downloadedfile",
  props: {
    file: Object,
  },

  methods: {
    openPlayer() {
      this.playSong(this.file);
    },
    ...mapActions("music", ["playSong", "addToPlayList", "deleteSong"]),
  },
};
</script>
