<template>
  <audio controls>
    <source :src="actualUrl" />
    Your browser does not support the video tag.
  </audio>
</template>
<script>
export default {
  name: "PlayAudio",
  data() {
    return {
      actualUrl: `http://localhost:3000/${this.url}`,
    };
  },
  props: {
    url: String,
  },
};
</script>
