<template>
  <v-app id="inspire">
    <!-- <v-navigation-drawer
      v-if="showDrawer"
      v-model="drawer"
      app
    >
    </v-navigation-drawer> -->

    <v-navigation-drawer
      v-if="showDrawer"
      v-model="drawer"
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

      <v-list
        dense
        nav
      >
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
    </v-navigation-drawer>

    <v-app-bar
    app
    src="japan3.jpg"
    >
      <v-app-bar-nav-icon v-if="showDrawer" @click="drawer = !drawer"></v-app-bar-nav-icon>

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
  export default {
    data: () => (
      { drawer: false,
        items: [
          { title: 'Home', icon: 'mdi-home', to:"/home" },
          { title: 'Levels', icon: 'mdi-view-grid', to:"/levels" },
          { title: 'Grammar', icon: 'mdi-help-box', to:"/grammar" },
        ], }
      ),
    computed: {
      showDrawer() {
        // Hide the drawer on the login and welcome pages
        return this.$route.path !== '/login' && this.$route.path !== '/welcome'
      },
    },
  }
</script>