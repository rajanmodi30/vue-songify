<template>
  <div class="fixed" v-if="defaultSong">
    <button @click="goToPreviousSong" ref="previous">Previous</button>
    <audio controls ref="audio" v-on:ended="songEnded">
      <source :src="getUrlWithServer" />
      Your browser does not support the audio tag.
    </audio>
    <button @click="goToNextSong" ref="next">Next</button>
    <select v-model="selectedShuffleTye">
      <option
        v-for="(shuffleType, index) in shuffleTypes"
        :key="index"
        :value="shuffleType"
        selected
      >
        {{ shuffleType }}
      </option>
    </select>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  name: "PlayAudio",
  data() {
    return {
      selectedShuffleTye: "repeat",
    };
  },
  computed: {
    getUrlWithServer() {
      return `${this.getServerUrl}/${this.defaultSong.path}`;
    },
    ...mapGetters("music", ["defaultSong", "getServerUrl"]),
    ...mapState("music", ["shuffleTypes"]),
  },
  methods: {
    /**
     *  on song end
     */

    ...mapActions("music", [
      "goToNextSong",
      "goToPreviousSong",
      "changeShuffle",
    ]),
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
    /**
     *  whenever a shuffle type is changed
     */
    selectedShuffleTye(newValue) {
      this.changeShuffle(newValue);
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
