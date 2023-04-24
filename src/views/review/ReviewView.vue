<template>
  <div>
    {{ sortedFlashcards }}
    <br />
    <v-card>
      <v-card-text v-if="!showAnswer">{{ currentCard.card }}</v-card-text>
      <v-card-text v-else>{{ currentCard.translation }}</v-card-text>
    </v-card>

    <div v-if="!showAnswer">
      <v-btn color="primary" @click="showAnswer = true">Show Answer</v-btn>
    </div>
    <div v-else>
      <v-btn color="primary" @click="answer0">0</v-btn>
      <v-btn color="primary" @click="answer1">1</v-btn>
      <v-btn color="primary" @click="answer2">2</v-btn>
      <v-btn color="primary" @click="answer3">3</v-btn>
      <v-btn color="primary" @click="answer4">4</v-btn>
      <v-btn color="primary" @click="answer5">5</v-btn>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { checkAuthStatus } from "@/utils/auth";

export default {
  name: "ReviewView",
  data() {
    return {
      user: {},
      currentCard: {},
      grammar: [],
      flashcards: [],
      sortedFlashcards: [],
      showAnswer: false,
    };
  },
  async mounted() {
    const info = await checkAuthStatus();
    if (info) {
      this.user = info.user;
      this.updateFlashcards();
    }
  },
  components: {},
  methods: {
    updateFlashcards() {
      axios
        .get("http://localhost:3000/api/dueFlashcards/" + this.user._id)
        .then((res) => {
          this.flashcards = res.data.flashcards;
          this.sortedFlashcards = this.sortByLastReviewed(this.flashcards);
          this.setCurrentCard();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //reorder the flashcards array based on lastReviewed : the oldest date will be at the front of the array
    sortByLastReviewed(flashcards) {
      return flashcards.sort((flashcard1, flashcard2) => {
        const date1 = new Date(flashcard1.lastReviewed);
        const date2 = new Date(flashcard2.lastReviewed);
        return date1 - date2;
      });
    },

    setCurrentCard() {
      this.currentCard = this.sortedFlashcards[1];
    },
  },
};
</script>
