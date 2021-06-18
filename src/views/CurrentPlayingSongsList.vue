<template>
  <playlist-song
    v-for="song in currentPlayList"
    :key="song._id"
    :song="song"
  ></playlist-song>
</template>
<script>
import { mapGetters } from "vuex";
import playlistSong from "../components/playlistSong.vue";
export default {
  components: { playlistSong },
  name: "CurrentPlayingSongsList",
  computed: {
    ...mapGetters("music", ["currentPlayList"]),
  },
};
</script>
