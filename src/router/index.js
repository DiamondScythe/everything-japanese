import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import LevelsView from "../views/LevelsView.vue";
import GrammarView from "../views/GrammarView.vue";
import LoginView from "../views/auth/LoginView.vue"

Vue.use(VueRouter);

const routes = [
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
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
