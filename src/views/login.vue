<template>
  <div>
    <button v-on="login">Login With Spotify</button>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return { stateKey: "spotify_auth_state" };
  },
  methods: {
    login() {
      var client_id = "CLIENT_ID"; // Your client id
      var redirect_uri = "REDIRECT_URI"; // Your redirect uri

      var state = this.generateRandomString(16);

      localStorage.setItem(this.stateKey, state);
      var scope = "user-read-private user-read-email";

      var url = "https://accounts.spotify.com/authorize";
      url += "?response_type=token";
      url += "&client_id=" + encodeURIComponent(client_id);
      url += "&scope=" + encodeURIComponent(scope);
      url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
      url += "&state=" + encodeURIComponent(state);

      window.location = url;
    },
    /**
     * Generates a random string containing numbers and letters
     * @param  {number} length The length of the string
     * @return {string} The generated string
     */
    generateRandomString(length) {
      var text = "";
      var possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    },

    /**
     * Obtains parameters from the hash of the URL
     * @return Object
     */
    getHashParams() {
      var hashParams = {};
      var e,
        r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
      while ((e = r.exec(q))) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
      }
      return hashParams;
    },
  },
};
</script>
