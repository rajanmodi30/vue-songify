import searchManager from "../../services/searchManager.js";
const serverUrl = process.env.VUE_APP_NODE_SERVER_URL;
/**
 * the state
 * @returns
 */
const state = () => ({
  searchResults: [],
  downloadedResults: [],
  currentSong: null,
  currentPlayingList: [],
  previousSongsList: [],
});

const getters = {
  searchResults: (state) => state.searchResults,
  downloadedResults: (state) => state.downloadedResults,
  defaultSong: (state) => state.currentSong,
  nextSongInTheList: (state) => state.currentPlayingList[0],
  currentPlayList: (state) => state.currentPlayingList,
  downloadResultsExcept: (state) => (id) => {
    let songIndex = state.downloadedResults.findIndex((song) => song._id == id);
    let firstPart = state.downloadedResults.filter(
      (song, index) => index > songIndex
    );
    let secondPart = state.downloadedResults.filter(
      (song, index) => index < songIndex
    );
    return firstPart.concat(secondPart);
  },
  removeSongFromCurrentPlaylist: (state) => (id) => {
    return state.currentPlayingList.filter((song) => song._id != id);
  },
  getSongIndexInCurrentArray: (state) => (id) => {
    return state.currentPlayingList.findIndex((song) => song._id == id);
  },
  getSongIndexInPreviousSongArray: (state) => (id) => {
    return state.previousSongsList.findIndex((song) => (song._id = id));
  },
  getLastSongInPreviousSong: (state) => {
    return state.previousSongsList[state.previousSongsList.length - 1];
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
    let song = {
      name: params.name,
      path: params.path,
      _id: params._id,
    };
    commit("updateCurrentSong", {
      name: params.name,
      path: `${serverUrl}/${params.path}`,
      _id: params._id,
    });
    commit("addNewSongToCurrentPlaylist", {
      song: song,
    });
  },
  goToNextSong({ commit, getters }) {
    let currentlyEndedSong = getters.defaultSong;
    commit("shiftFirstSongFromCurrentPlaylist");
    commit("addSongToPrevious", { song: currentlyEndedSong });

    if (getters.currentPlayList.length == 0) {
      let toAddSongs = getters.downloadResultsExcept(currentlyEndedSong._id);
      //updating the list
      console.log(toAddSongs);
      toAddSongs.forEach((song) => {
        commit("addNewSongToCurrentPlaylist", {
          song: song,
        });
      });
    }

    let nextSong = getters.nextSongInTheList;

    commit("updateCurrentSong", {
      name: nextSong.name,
      path: `${serverUrl}/${nextSong.path}`,
      _id: nextSong._id,
    });
  },
  goToPreviousSong({ commit, getters }) {
    let lastSong = getters.getLastSongInPreviousSong;
    console.log("lastSong", lastSong, lastSong.name);
    commit("addSongAtStartOfCurrentPlayingList", {
      song: lastSong,
    });

    commit("updateCurrentSong", {
      name: lastSong.name,
      path: lastSong.path,
      _id: lastSong._id,
    });
    commit("popSongFromPrevious");
  },
  removeSongFromPlaylist({ commit, getters }, song) {
    let updatedPlaylist = getters.removeSongFromCurrentPlaylist(song._id);
    console.log("updated list", updatedPlaylist);
    commit("updateCurrentPlayList", {
      updatedPlaylist: updatedPlaylist,
    });
  },
  addToPlayList({ commit }, song) {
    commit("addNewSongToCurrentPlaylist", {
      song: song,
    });
  },
  skipTo({ commit, getters }, song) {
    let id = song._id;
    let songIndex = getters.getSongIndexInCurrentArray(id);
    let newPlaylist = getters.currentPlayList.slice(songIndex);
    console.log("newPlaylist", newPlaylist, song);
    commit("updateCurrentPlayList", { updatedPlaylist: newPlaylist });
    commit("updateCurrentSong", {
      name: song.name,
      path: `${serverUrl}/${song.path}`,
      _id: song._id,
    });
  },
  deleteSong({ commit, getters }, song) {
    let id = song._id;
    let updatedDownloadedSongs = getters.downloadResultsExcept(id);
    searchManager
      .deleteSong(id)
      .then((response) => {
        console.log("delete response", response);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("updatedDownloadedSongs", updatedDownloadedSongs);
    commit("updateAvailableSongsList", {
      response: updatedDownloadedSongs,
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
  },
  emptyCurrentPlayList(state) {
    state.currentPlayingList = [];
  },
  updateCurrentPlayList(state, payload) {
    state.currentPlayingList = payload.updatedPlaylist;
  },
  popSongFromPrevious(state) {
    state.previousSongsList.pop();
  },
  addSongToPrevious(state, payload) {
    state.previousSongsList.push(payload.song);
    console.log("previous list", state.previousSongsList);
  },
  addSongAtStartOfCurrentPlayingList(state, payload) {
    state.currentPlayingList.unshift(payload.song);
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
