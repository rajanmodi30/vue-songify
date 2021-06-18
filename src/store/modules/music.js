import searchManager from "../../services/searchManager.js";

/**
 * the state
 * @returns
 */
const state = () => ({
  searchResults: [],
  downloadedResults: [],
  currentSong: null,
  currentPlayingList: [],
});

const getters = {
  searchResults: (state) => state.searchResults,
  downloadedResults: (state) => state.downloadedResults,
  defaultSong: (state) => state.currentSong,
  nextSongInTheList: (state) => state.currentPlayingList[0],
  currentPlayList: (state) => state.currentPlayingList,
  downloadResultsExcept: (state) => (id) => {
    return state.downloadedResults.filter((song) => song._id != id);
  },
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
    commit("emptyCurrentPlayList");
    console.log(params);
    commit("updateCurrentSong", {
      name: params.name,
      path: `http://localhost:3000/${params.path}`,
      _id: params._id,
    });
  },
  goToNextSong({ commit, getters }) {
    let currentlyEndedSong = getters.defaultSong;
    commit("shiftFirstSongFromCurrentPlaylist", currentlyEndedSong);

    if (getters.currentPlayList.length == 0) {
      let toAddSongs = getters.downloadResultsExcept(currentlyEndedSong._id);
      //updating the list
      toAddSongs.forEach((song) => {
        commit("addNewSongToCurrentPlaylist", {
          song: song,
        });
      });
    }

    let nextSong = getters.nextSongInTheList;

    commit("updateCurrentSong", {
      name: nextSong.name,
      path: `http://localhost:3000/${nextSong.path}`,
      _id: nextSong._id,
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
      _id: payload._id,
    };
  },
  shiftFirstSongFromCurrentPlaylist(state) {
    //dropping first song
    state.currentPlayingList.shift();
  },
  addNewSongToCurrentPlaylist(state, payload) {
    //adds a new song
    state.currentPlayingList.push(payload.song);
    console.log(state.currentPlayingList);
  },
  emptyCurrentPlayList(state) {
    state.currentPlayingList = [];
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
