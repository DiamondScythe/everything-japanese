<template>
  <v-app>
    <!-- Top Navigation -->
    <NavigationBar />

    <!-- Hero Section -->
    <v-container fluid class="hero-section">
      <v-row align="center">
        <v-col cols="12" md="6">
          <h1 class="headline mb-3">Welcome to Everything Japanese</h1>
          <p class="subtitle">Your Japanese learning journey starts here</p>
          <v-btn class="mt-5" color="primary" large>Get Started</v-btn>
        </v-col>
        <v-col cols="12" md="6">
          <v-img src="japan2.jpg" aspect-ratio="1.5"></v-img>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import NavigationBar from "@/components/ui/NavigationBar.vue";

export default {
  name: "LandingView",
  components: { NavigationBar },
};
</script>

<style>
/* Hero Section Styles */
.hero-section {
  height: 80vh;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
}

.headline {
  font-size: 4rem;
  font-weight: 500;
}

.subtitle {
  font-size: 1.5rem;
  line-height: 1.75rem;
  color: #6c757d;
}
</style>
