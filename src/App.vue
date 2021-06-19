<template>
  <div id="nav">
    <router-link :to="{ name: 'downloaded' }">Home</router-link> |
    <router-link to="/search">Search</router-link>|
    <router-link :to="{ name: 'playlist' }">Currently Playing</router-link>
  </div>
  <router-view></router-view>
  <play-audio></play-audio>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
import PlayAudio from "./components/PlayAudio.vue";
export default {
  components: { PlayAudio },
};
</script>
