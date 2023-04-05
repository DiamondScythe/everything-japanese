<template>
    <v-container>
      <v-card class="mx-auto" max-width="500" outlined>
        <v-card-title class="text-center">Login</v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="email"
              label="Email"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="login">Login</v-btn>
          <v-btn color="secondary" @click="reset">Reset</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </template>
  
<script>
import axios from 'axios';

export default {
data() {
    return {
    email: 'example@example.com',
    password: 'examplepassword',
    };
},
methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:8081/login', {
          email: this.email,
          password: this.password,
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    },
    reset() {
    this.email = '';
    this.password = '';
    },
},
};
</script>