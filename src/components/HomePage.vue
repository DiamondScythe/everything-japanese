<template>
  <div class="hello">
    <v-container>
      <v-card class="main-card">
        <v-card-title> Welcome! </v-card-title>
        <v-card-text>
          Your awesome Japanese learning journey starts here... Good luck!
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>

<style scoped>
.main-card {
  margin-top: 40px;
  margin-bottom: 40px;
  text-align: center;
}
</style>
