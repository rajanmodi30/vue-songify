<template>
  <div>
    {{ file.name }}
    <button @click="openPlayer">Play</button>
    <play-audio v-if="allowPlayerOpen" :url="file.path"></play-audio>
  </div>
</template>
<script>
import PlayAudio from "./PlayAudio.vue";
export default {
  components: { PlayAudio },
  name: "Downloadedfile",
  props: {
    file: Object,
    playAudio: Boolean,
  },
  data: function () {
    return {
      allowPlayerOpen: this.playAudio,
    };
  },
  methods: {
    openPlayer() {
      this.allowPlayerOpen = true;
    },
  },
};
</script>
