<template>
  <div>
    <span>{{ song.name }}</span>
  </div>
</template>
<script>
export default {
  name: "playlistSong",
  props: {
    song: Object,
  },
};
</script>
