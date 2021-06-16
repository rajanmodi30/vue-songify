<template>
  <div>
    {{ file.name }}
    <button @click="openPlayer">Play</button>
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
    ...mapActions("music", ["playSong"]),
  },
};
</script>
