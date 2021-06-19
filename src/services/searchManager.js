import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://192.168.0.102:3000",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  searchSongResults(searchParam) {
    return apiClient.get("/search/" + searchParam);
  },
  download(url, name) {
    return apiClient.get(`downloads?url=${url}&name=${name}`);
  },
  mySongsList() {
    return apiClient.get(`available/songs`);
  },
  deleteSong(id) {
    return apiClient.get(`delete/${id}`);
  },
};
