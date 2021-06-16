import searchManager from "../../services/searchManager.js";

/**
 * the state
 * @returns
 */
const state = () => ({
  searchResults: [],
  downloadedResults: [],
  currentSong: null,
});

const getters = {
  searchResults: (state) => state.searchResults,
  downloadedResults: (state) => state.downloadedResults,
  defaultSong: (state) => state.currentSong,
};
/**
 * actions for the state
 */
const actions = {
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
  playSong({ commit }, params) {
    commit("updateCurrentSong", {
      name: params.name,
      path: `http://localhost:3000/${params.path}`,
    });
  },
};

const mutations = {
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
  updateCurrentSong(state, payload) {
    state.currentSong = {
      name: payload.name,
      path: payload.path,
    };
  },
};

const music = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

export default music;
