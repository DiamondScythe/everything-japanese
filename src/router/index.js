import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import GrammarView from "../views/grammar/GrammarView.vue";
import GrammarLearnView from "../views/grammar/GrammarLearnView.vue";
import GrammarDetailsView from "../views/grammar/GrammarDetailsView.vue";
import LoginView from "../views/auth/LoginView.vue";
import SignupView from "../views/auth/SignupView.vue";
import WatchView from "../views/WatchView.vue";
import LandingView from "../views/LandingView.vue";
import ReviewView from "../views/review/ReviewView.vue";
import KanaView from "../views/kana/KanaView.vue";
import VocabView from "../views/vocab/VocabView.vue";
import VocabDetailsView from "../views/vocab/VocabDetailsView.vue";
import VocabLearnView from "../views/vocab/VocabLearnView.vue";

import { getJwtToken } from "@/utils/auth";
import axios from "axios";
import Cookies from "js-cookie";

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "LandingView", component: LandingView },
  {
    path: "/home",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/grammar",
    name: "Grammar",
    component: GrammarView,
    meta: { requiresAuth: true },
  },
  {
    path: "/grammar/learn/:id",
    name: "Grammar learn",
    component: GrammarLearnView,
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: "/grammar/details/:id",
    name: "Grammar details",
    component: GrammarDetailsView,
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/signup",
    name: "Signup",
    component: SignupView,
  },
  {
    path: "/watch/:word",
    name: "Watch",
    component: WatchView,
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: "/review",
    name: "Review",
    component: ReviewView,
    meta: { requiresAuth: true },
  },
  {
    path: "/kana",
    name: "Kana",
    component: KanaView,
    meta: { requiresAuth: true },
  },
  {
    path: "/vocab",
    name: "Vocab",
    component: VocabView,
    meta: { requiresAuth: true },
  },
  {
    path: "/vocab/details/:id",
    name: "Vocab details",
    component: VocabDetailsView,
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: "/vocab/learn/:id",
    name: "Vocab learn",
    component: VocabLearnView,
    meta: { requiresAuth: true },
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const token = getJwtToken();

  if (requiresAuth) {
    if (token) {
      axios
        .get("http://localhost:3000/userAuth", {
          headers: {
            Authorization: "Bearer " + Cookies.get("jwt"), // get JWT token from browser's cookies
          },
        })
        .then((response) => {
          if (response.data.isAuthenticated) {
            next();
          } else {
            next("/login");
          }
        })
        .catch((error) => {
          console.log(error);
          next("/login");
        });
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
