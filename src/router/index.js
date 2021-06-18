import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import SearchMusic from "../views/SearchMusic.vue";
import DownloadedSongs from "../views/DownloadedSongs.vue";
import CurrentPlayingSongsList from "../views/CurrentPlayingSongsList.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/search",
    name: "Search",
    component: SearchMusic,
  },
  {
    path: "/downloaded",
    name: "downloaded",
    component: DownloadedSongs,
  },
  {
    path: "/playlist",
    name: "playlist",
    component: CurrentPlayingSongsList,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
