<template>
  <div>
    <v-container class="main-container">
      <div class="lesson-title">
        Lesson {{ grammar.lessonNumber }}: {{ grammar.title }}
      </div>
      <div class="details-card">
        <v-card height="100%" width="100%" elevation="3" outlined shaped tile>
          <v-row>
            <v-card-text></v-card-text>
          </v-row>
          <v-row>
            <v-col sm="12" lg="10" offset-lg="1">
              <v-card-text style="color: black; white-space: pre-line">
                {{ grammar.details }}
              </v-card-text>
            </v-col>
          </v-row>
          <v-row>
            <v-col sm="12" lg="10" offset-lg="1">
              <v-card-text style="color: black; white-space: pre-line">
                Flashcards available for this lesson: <b>{{ exampleCount }}</b>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
        <div class="enter-div">
          <v-btn color="primary" @click="$router.push(`/grammar/learn/${id}`)"
            >Start lesson</v-btn
          >
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import { checkAuthStatus } from "../../utils/auth.js";

export default {
  name: "grammarDetailsView",
  props: ["id"],
  data() {
    return {
      grammar: {},
    };
  },
  async mounted() {
    axios
      .get("http://localhost:3000/api/onegrammar/" + this.id)
      .then((response) => {
        this.grammar = response.data.grammar;
        console.log(response.data);
      });

    //get user info
    const info = await checkAuthStatus();
    if (info) {
      this.user = info.user;
      console.log(this.user);
    }
  },
  computed: {
    exampleCount() {
      let count = 0;
      if (this.grammar && this.grammar.parts) {
        this.grammar.parts.forEach((part) => {
          if (part.examples) {
            count += part.examples.length;
          }
        });
      }
      return count;
    },
  },

  components: {},
  methods: {},
};
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.grow {
  flex-grow: 1;
}

.lesson-title {
  font-size: 2rem;
  font-weight: bold;
}

.enter-div {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
}

.details-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 500px;
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
