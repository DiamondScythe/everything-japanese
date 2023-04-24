<template>
  <div>
    <v-container class="card-container">
      <v-card elevation="3" outlined shaped tile height="400px" width="1000px">
        <v-row>
          <v-col sm="12" lg="6" offset-lg="3">
            <v-card-title class="justify-center"></v-card-title>
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="12" lg="6" offset-lg="3">
            <v-card-title class="justify-center">Kana practice</v-card-title>
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="12" lg="6" offset-lg="3">
            <v-card-title class="justify-center">あ</v-card-title>
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="12" lg="6" offset-lg="3">
            <v-text-field></v-text-field>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import hiragana from "@/data/kana.js";
import katakana from "@/data/kana.js";

export default {
  name: "KanaView",
  components: {},
  props: [],
  data() {
    return {
      hiragana: hiragana,
      katakana: katakana,
    };
  },
  computed: {},
  mounted() {},
  methods: {},
};
</script>

<style>
.input {
  text-align: center;
}
.text-center {
  text-align: center;
}
.card-container {
  padding-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* .container {
  border: 1px solid green;
}
.row {
  border: 1px solid red;
}
.col {
  border: 1px solid blue;
} */
</style>
