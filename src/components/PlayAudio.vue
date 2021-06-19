<template>
  <div class="fixed" v-if="defaultSong">
    <audio controls ref="audio" v-on:ended="songEnded">
      <source :src="defaultSong.path" />
      Your browser does not support the audio tag.
    </audio>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "PlayAudio",
  computed: {
    ...mapGetters("music", ["defaultSong"]),
  },
  methods: {
    /**
     *  on song end
     */
    ...mapActions("music", ["goToNextSong"]),
    songEnded() {
      this.goToNextSong();
    },
  },
  watch: {
    /**
     * whenever a new song arrives load and play it
     */
    defaultSong(newValue, oldValue) {
      if (oldValue) {
        this.$refs.audio.pause();
        this.$refs.audio.load();
      }
      setTimeout(() => {
        this.$refs.audio.play();
      }, 500);
    },
  },
};
</script>
<style scoped>
div.fixed {
  border-radius: 25px;
  border: 5px solid #42b983;
  position: absolute;
  height: 50px;
  bottom: 200px;
  left: 50%;
  margin-left: -150px;
}
</style>
