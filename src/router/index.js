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
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
