import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_NODE_SERVER_URL,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export default {
  searchSongResults(searchParam) {
    return apiClient.get("/search/" + searchParam);
  },
  download(url, name) {
    return apiClient.get(`/downloads?url=${url}&name=${name}`);
  },
  mySongsList() {
    return apiClient.get(`/available/songs`);
  },
  deleteSong(id) {
    return apiClient.get(`/delete/${id}`);
  },
};
