import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
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
  download(url) {
    return apiClient.get(`downloads?url=${url}`);
  },
  mySongsList(page) {
    return apiClient.get(`listings?page=${page}`);
  },
};
