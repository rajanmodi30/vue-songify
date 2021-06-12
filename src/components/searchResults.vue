<template>
  <div>
    <img :src="result.thumbnails.default.url" />
    {{ result.title }}
    <button @click="download(result.link)">Download</button>
  </div>
</template>
<script>
export default {
  props: {
    result: Object,
  },
  name: "searchResults",
};
</script>
