<template>
  <div>
    <span>{{ song.name }}</span>
    <span
      v-show="currentSong && currentSong._id == song._id"
      style="color: #42b983"
    >
      (currently playing)
    </span>
    <button
      v-show="currentSong && currentSong._id != song._id"
      @click="removeSongFromPlaylist(song)"
    >
      Remove
    </button>
    <button
      v-show="currentSong && currentSong._id != song._id"
      @click="skipTo(song)"
    >
      Skip To This
    </button>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "playlistSong",
  props: {
    song: Object,
  },
  computed: mapState("music", ["currentSong"]),
  methods: {
    ...mapActions("music", ["removeSongFromPlaylist", "skipTo"]),
  },
};
</script>
