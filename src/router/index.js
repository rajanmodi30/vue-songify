import { createRouter } from "vue-router";
import SearchMusic from "../views/SearchMusic.vue";
import DownloadedSongs from "../views/DownloadedSongs.vue";
import CurrentPlayingSongsList from "../views/CurrentPlayingSongsList.vue";

const routes = [
  {
    path: "/",
    name: "downloaded",
    component: DownloadedSongs,
  },
  {
    path: "/search",
    name: "Search",
    component: SearchMusic,
  },

  {
    path: "/playlist",
    name: "playlist",
    component: CurrentPlayingSongsList,
  },
];

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  mode: "history",

  routes,
});

export default router;
