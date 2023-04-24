<template>
  <div>
    <br />
    <div v-if="showReview">
      <v-card>
        <v-card-text v-if="!showAnswer">{{ currentCard.card }}</v-card-text>
        <v-card-text v-else>{{ currentCard.translation }}</v-card-text>
      </v-card>

      <div v-if="!showAnswer">
        <v-btn color="primary" @click="showAnswer = true">Show Answer</v-btn>
      </div>
      <div v-else>
        <v-btn color="primary" @click="answer(0)">0</v-btn>
        <v-btn color="primary" @click="answer(1)">1</v-btn>
        <v-btn color="primary" @click="answer(2)">2</v-btn>
        <v-btn color="primary" @click="answer(3)">3</v-btn>
        <v-btn color="primary" @click="answer(4)">4</v-btn>
        <v-btn color="primary" @click="answer(5)">5</v-btn>
      </div>
    </div>
    <div v-else>
      <h1>There are no flashcards to review right now.</h1>
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
      showReview: true,
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
          if (this.flashcards.length > 0) {
            this.sortedFlashcards = this.sortByLastReviewed(this.flashcards);
            this.setCurrentCard();
          } else {
            this.showReview = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    answer(score) {
      this.gradeCard(score);
    },

    //reorder the flashcards array based on lastReviewed : the oldest date will be at the front of the array
    sortByLastReviewed(flashcards) {
      //check if flashcards has more than one object
      if (flashcards.length > 1) {
        return flashcards.sort((flashcard1, flashcard2) => {
          const date1 = new Date(flashcard1.lastReviewed);
          const date2 = new Date(flashcard2.lastReviewed);
          return date1 - date2;
        });
      } else {
        return flashcards;
      }
    },

    setCurrentCard() {
      this.currentCard = this.sortedFlashcards[0];
    },

    gradeCard(score) {
      axios
        .post("http://localhost:3000/api/gradeFlashcard", {
          id: this.currentCard._id,
          score: score,
        })
        .then((res) => {
          this.updateFlashcards();
        })
        .then((res) => {
          this.showAnswer = false;
          this.setCurrentCard();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
