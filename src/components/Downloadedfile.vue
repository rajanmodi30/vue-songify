<template>
  <div>
    {{ file.name }}
    <button @click="openPlayer">Play</button>
    <button @click="addToPlayList(file)">Add To Playlist</button>
    <button @click="confirmSongDelete(file)" style="color: red">Delete</button>
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
    confirmSongDelete(file) {
      let answer = confirm("are you sure you want to delete ?");
      console.log(answer);
      if (answer) {
        this.deleteSong(file);
      }
    },
    ...mapActions("music", ["playSong", "addToPlayList", "deleteSong"]),
  },
};
</script>
