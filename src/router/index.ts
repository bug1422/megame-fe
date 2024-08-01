import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

// Authentication
import SignInView from "../views/authentication/SignIn.vue";
import SignUpView from "../views/authentication/SignUp.vue";

//Layout
import DefaultLayout from "../views/DefaultLayout.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: HomeView,
      },
      {
        path: "about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
      },
    ]
  },
  {
    path: '/auth/',
    component: DefaultLayout,
    children: [
      {
        path: "signin",
        name: "SignIn",
        component: SignInView
      },
      {
        path: "signup",
        name: "SignUp",
        component: SignUpView
      },
    ]
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
