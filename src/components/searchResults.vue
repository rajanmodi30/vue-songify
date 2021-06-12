<template>
  <img src="result.thumbnails.default.url" />
  {{ result }}
</template>
<script>
export default {
  props: {
    result: Object,
  },
  name: "searchResults",
};
</script>
