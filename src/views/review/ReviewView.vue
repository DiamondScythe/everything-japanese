<template>
  <div>
    <br />
    <div v-if="showReview">
      <v-container class="card-container">
        <v-card
          elevation="3"
          outlined
          shaped
          tile
          height="420px"
          width="1000px"
        >
          <div v-if="currentCard.type === 'Grammar'">
            <v-row>
              <v-col sm="12" lg="6" offset-lg="3">
                <v-card-title class="justify-center"></v-card-title>
              </v-col>
            </v-row>
            <v-row>
              <v-col sm="12" lg="6" offset-lg="3">
                <v-card-title class="justify-center">{{
                  currentCard.card
                }}</v-card-title>
              </v-col>
            </v-row>
            <v-row>
              <v-col sm="12" lg="6" offset-lg="3">
                <div class="audio-button">
                  <v-btn
                    text
                    color="primary"
                    @click="playAudio(currentCard.exampleAudioFileName)"
                    >Play audio</v-btn
                  >
                </div>
              </v-col>
            </v-row>
            <v-row v-if="showAnswer">
              <v-col sm="12" lg="6" offset-lg="3">
                <v-card-title class="justify-center">{{
                  currentCard.translation
                }}</v-card-title>
              </v-col>
            </v-row>
          </div>
          <!--if type = vocab, show vocab type card-->
          <div v-else>
            <v-row>
              <v-col sm="12" lg="6" offset-lg="3">
                <v-card-title class="justify-center"></v-card-title>
              </v-col>
            </v-row>
            <v-row>
              <v-col sm="12" lg="6" offset-lg="3">
                <v-card-title class="main-word">{{
                  currentCard.word
                }}</v-card-title>
              </v-col>
            </v-row>
            <v-row>
              <v-col sm="12" lg="6" offset-lg="3">
                <v-card-title class="justify-center">{{
                  currentCard.card
                }}</v-card-title>
              </v-col>
            </v-row>
            <v-row>
              <v-col sm="12" lg="6" offset-lg="3">
                <div class="audio-button">
                  <v-btn
                    text
                    color="primary"
                    @click="playAudio(currentCard.wordAudioFileName)"
                    >Play word</v-btn
                  >
                  <v-btn
                    text
                    color="primary"
                    @click="playAudio(currentCard.exampleAudioFileName)"
                    >Play sentence</v-btn
                  >
                </div>
              </v-col>
            </v-row>
            <v-row v-if="showAnswer">
              <v-col sm="12" lg="6" offset-lg="3">
                <v-card-title class="justify-center">{{
                  currentCard.translation
                }}</v-card-title>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-container>
      <div v-if="!showAnswer" class="answer-container">
        <v-row>
          <v-col sm="12" lg="6" offset-lg="3">
            <v-card-actions class="navigate-buttons">
              <v-btn color="primary" @click="showAnswer = true"
                >Show Answer</v-btn
              >
            </v-card-actions>
          </v-col>
        </v-row>
        <v-btn text color="primary" @click="dialog = true">
          How to use the review feature
        </v-btn>
      </div>
      <div v-else class="answer-container">
        <v-row>
          <v-col sm="12" lg="6" offset-lg="3">
            <v-card-actions class="navigate-buttons">
              <v-btn color="primary" @click="answer(0)">0</v-btn>
              <v-btn color="primary" @click="answer(1)">1</v-btn>
              <v-btn color="primary" @click="answer(2)">2</v-btn>
              <v-btn color="primary" @click="answer(3)">3</v-btn>
              <v-btn color="primary" @click="answer(4)">4</v-btn>
              <v-btn color="primary" @click="answer(5)">5</v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
        <v-btn text color="primary" @click="dialog = true">
          How to use the review feature
        </v-btn>
      </div>
    </div>

    <!-- if there are no due cards -->
    <div v-else class="card-container">
      <div class="notify-message">
        {{ noFlashcardsMessage }}
      </div>
    </div>

    <!--for dialog-->
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2"> How to use </v-card-title>
        <v-card-text></v-card-text>
        <v-card-text>
          <ul>
            <li>
              The review feature will show you flashcards that are due for
              review. New flashcards can be acquired by completing lessons.
            </li>
            <li>
              You will be shown the front of the flashcard, and you can click
              "Show Answer" to see the back of the flashcard.
            </li>
            <li>
              After you see the back of the flashcard, you can rate how well you
              knew the answer by clicking the number of points that corresponds
              to your confidence level. 0 points means you did not know the
              answer at all, while 5 points means you knew the answer perfectly.
            </li>
            <li>
              The more points you choose, the more confident you are in your
              answer.
            </li>
            <li>
              The application will use your confidence level to determine how to
              schedule the next review of the flashcard. The application uses
              the well-known SuperMemo's SM-2 algorithm to schedule the reviews
              of your cards. You can read more about it
              <a
                href="https://www.supermemo.com/en/blog/application-of-a-computer-to-improve-the-results-obtained-in-working-with-the-supermemo-method"
                target="_blank"
                >here</a
              >.
            </li>
          </ul>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false"> Got it </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      showGuide: false,
      currentCard: {},
      grammar: [],
      flashcards: [],
      sortedFlashcards: [],
      showAnswer: false,
      showReview: true,
      dialog: false,
      noFlashcardsMessage:
        "You have no flashcards to review right now. Check back later, or add some flashcards to your deck by finishing new lessons!",
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
    playAudio(audioFileName) {
      const audio = new Audio(`http://localhost:3000/audio/${audioFileName}`);
      audio.play();
    },
  },
};
</script>

<style scoped>
.main-word {
  font-size: 30px;
  display: flex;
  justify-content: center;
}
.card-container {
  padding-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.audio-button {
  display: flex;
  justify-content: center;
  align-items: center;
}

.notify-message {
  padding-left: 30px;
  padding-right: 30px;
  font-size: 16px;
  text-align: center;
}

.navigate-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
}

.answer-container {
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.labels {
  padding-left: 10px;
  padding-right: 10px;
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
