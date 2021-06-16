<template>
  <div>
    <audio controls v-if="defaultSong" ref="audio">
      <source :src="defaultSong.path" />
      Your browser does not support the audio tag.
    </audio>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "PlayAudio",
  computed: {
    ...mapGetters("music", ["defaultSong"]),
  },
  watch: {
    defaultSong(newValue, oldValue) {
      console.log(oldValue, newValue, this.$refs.audio);
      if (oldValue) {
        this.$refs.audio.pause();
        this.$refs.audio.load();
        this.$refs.audio.play();
      }
    },
  },
};
</script>
