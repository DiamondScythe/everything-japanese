import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import LevelsView from "../views/LevelsView.vue";
import GrammarView from "../views/GrammarView.vue";
import LoginView from "../views/auth/LoginView.vue";
import LessonView from "../views/lesson/Lesson.vue";
import LessonDetailsView from "../views/lesson/LessonDetails.vue";
import WatchView from "../views/WatchView.vue";
import LandingView from "../views/LandingView.vue";

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
    path: "/levels",
    name: "Levels",
    component: LevelsView,
  },
  {
    path: "/grammar",
    name: "Grammar",
    component: GrammarView,
    meta: { requiresAuth: true },
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
    path: "/lesson",
    name: "Lesson",
    component: LessonView,
    props: true,
  },
  {
    path: "/lesson/:id",
    name: "LessonDetails",
    component: LessonDetailsView,
    props: true,
  },
  {
    path: "/watch",
    name: "Watch",
    component: WatchView,
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
        .get("http://localhost:8081/userAuth", {
          headers: {
            Authorization: "Bearer " + Cookies.get("jwt"), // get JWT token from browser's cookies
          },
        })
        .then((response) => {
          if (response.data.isAuthenticated) {
            console.log("User info:", response.data.user);
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
