import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: {
      name: "Recommend"
    }
  },
  {
    path: "/recommend",
    name: "Recommend",
    component: () =>
      import(/* webpackChunkName: "recommend" */ "../views/recommend/recommend")
  },
  {
    path: "/singer",
    name: "Singer",
    component: () =>
      import(/* webpackChunkName: "singer" */ "../views/singer/singer")
  },
  {
    path: "/rank",
    name: "Rank",
    component: () => import(/* webpackChunkName: "rank" */ "../views/rank/rank")
  },
  {
    path: "/search",
    name: "Search",
    component: () =>
      import(/* webpackChunkName: "search" */ "../views/search/search")
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
