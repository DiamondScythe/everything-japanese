<template>
  <div>
    <v-container class="main-container">
      <div class="lesson-title">
        Lesson {{ vocab.lessonNumber }}: {{ vocab.title }}
      </div>
      <div class="details-card">
        <v-card height="100%" width="100%" elevation="3" outlined shaped tile>
          <v-row>
            <v-card-text></v-card-text>
          </v-row>
          <v-row>
            <v-col sm="12" lg="10" offset-lg="1">
              <v-card-text style="color: black; white-space: pre-line">
                {{ vocab.details }}
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
          <v-btn color="primary" @click="$router.push(`/vocab/learn/${id}`)"
            >Start lesson</v-btn
          >
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "VocabDetailsView",
  props: ["id"],
  data() {
    return {
      vocab: {},
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/oneVocab/" + this.id)
      .then((response) => {
        this.vocab = response.data.vocab;
        console.log(response.data);
      });
  },
  computed: {
    exampleCount() {
      let count = 0;
      if (this.vocab && this.vocab.parts) {
        this.vocab.parts.forEach((part) => {
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
