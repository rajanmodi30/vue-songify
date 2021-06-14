import { createStore } from "vuex";
import searchManager from "../services/searchManager.js";

export default createStore({
  state: {
    searchResults: [],
    downloadedResults: [],
  },
  mutations: {
    updateSearchResult(state, payload) {
      state.searchResults = payload.results;
    },
    updateDownloadedResults(state, payload) {
      state.downloadedResults.push({
        path: payload.result,
        name: payload.name,
      });
      console.log("updated", state.downloadedResults);
    },
    updateAvailableSongsList(state, payload) {
      state.downloadedResults = payload.response;
    },
  },
  actions: {
    search({ commit }, name) {
      searchManager.searchSongResults(name).then((response) => {
        commit("updateSearchResult", {
          results: response.data,
        });
      });
    },
    download({ commit }, params) {
      let url = params.link;
      let name = params.name;
      searchManager
        .download(url, name)
        .then((response) => {
          commit("updateDownloadedResults", {
            result: response.data.response,
            name: name,
          });
          alert("downloaded song");
        })
        .catch((err) => console.log(err));
    },
    availableSongs({ commit }) {
      searchManager
        .mySongsList()
        .then((response) => {
          commit("updateAvailableSongsList", {
            response: response.data.songs,
          });
        })
        .catch((err) => console.log(err));
    },
  },
  modules: {},
});
