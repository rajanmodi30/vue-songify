<template>
  <audio controls>
    <source :src="url" type="audio/mp3" />
    Your browser does not support the video tag.
  </audio>
</template>
<script>
export default {
  name: "PlayAudio",
  props: {
    url: String,
  },
};
</script>
