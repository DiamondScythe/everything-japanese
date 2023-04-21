<template>
  <v-app id="EJ">
    <v-navigation-drawer
      v-if="showDrawer"
      v-model="drawer"
      disable-resize-watcher
      app
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Everything Japanese
          </v-list-item-title>
          <v-list-item-subtitle>
            <!-- subtext -->
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          link
          @click="drawer = false"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <div dense nav class="bottom-items">
        <v-list-item to="/profile" link>
          <v-list-item-icon>
            <v-icon>mdi-account-circle</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-navigation-drawer>

    <v-app-bar app src="japan3.jpg" v-if="showAppBar">
      <v-app-bar-nav-icon
        v-if="showDrawer"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>{{ $route.name }}</v-toolbar-title>
    </v-app-bar>

    <!-- Add the v-overlay component here -->
    <v-overlay v-if="drawer" @click="drawer = false"></v-overlay>

    <!-- main content goes here-->
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { checkAuthStatus } from "@/utils/auth";

export default {
  data: () => ({
    isAuthenticated: false,
    drawer: false,
    items: [
      { title: "Home", icon: "mdi-home", to: "/home" },
      { title: "Levels", icon: "mdi-view-grid", to: "/levels" },
      { title: "Grammar", icon: "mdi-help-box", to: "/grammar" },
      { title: "Lessons", icon: "mdi-help-box", to: "/lesson" },
      { title: "Watch", icon: "mdi-help-box", to: "/watch" },
    ],
    user: null,
  }),
  components: {},
  async created() {
    const info = await checkAuthStatus();
    if (info.isAuthenticated) {
      //get user data here
      this.isAuthenticated = info.isAuthenticated;
      this.user = info.user;
      console.log(this.isAuthenticated);
      console.log(this.user);
    } else {
      this.isAuthenticated = false;
    }
  },
  computed: {
    showDrawer() {
      // Hide the drawer on the login and welcome pages
      return this.$route.path !== "/login" && this.$route.path !== "/welcome";
    },
    showAppBar() {
      return this.$route.path !== "/";
    },
  },
  methods: {},
};
</script>

<style>
.bottom-items {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
