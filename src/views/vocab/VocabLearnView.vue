<template>
  <div class="home">
    <v-container class="card-container">
      <v-slide-x-transition mode="out-in">
        <v-card
          v-for="(card, index) in cards"
          :key="card.id"
          v-if="index === activeCardIndex"
          elevation="3"
          outlined
          shaped
          tile
          height="600px"
          width="1000px"
        >
          <v-row>
            <v-col sm="12" lg="6" offset-lg="3">
              <v-card-title class="justify-center"></v-card-title>
            </v-col>
          </v-row>
          <v-row>
            <v-col sm="12" lg="10" offset-lg="1">
              <v-card-title>{{ card.type }}</v-card-title></v-col
            >
          </v-row>
          <v-row>
            <v-col sm="12" lg="10" offset-lg="1">
              <v-card-text style="color: black; white-space: pre-line">{{
                card.text
              }}</v-card-text></v-col
            >
          </v-row>
          <v-row v-if="card.type === 'Example'">
            <v-col sm="12" lg="10" offset-lg="1">
              <v-btn
                text
                color="primary"
                @click="playAudio(card.exampleAudioFileName)"
                >Play audio</v-btn
              >
            </v-col>
          </v-row>
          <v-row v-if="card.type === 'Example'">
            <v-col sm="12" lg="10" offset-lg="1">
              <v-img
                :src="imageUrl"
                alt="Illustration"
                style="width: 250px; height: 250px; object-fit: contain"
                class="mx-auto"
              >
              </v-img>
            </v-col>
          </v-row>
        </v-card>
      </v-slide-x-transition>
    </v-container>

    <div>
      <v-row>
        <v-col sm="12" lg="6" offset-lg="3">
          <v-card-actions class="navigate-buttons">
            <v-btn color="primary" @click="previousCard">Previous</v-btn>
            <v-btn color="primary" @click="discardCard">{{ nextText }}</v-btn>
          </v-card-actions>
          <div class="navigate-buttons">
            Current page: {{ activeCardIndex + 1 }} / {{ cards.length }}
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { checkAuthStatus } from "@/utils/auth";
import axios from "axios";

export default {
  name: "LessonDetailsView",
  components: {},
  props: ["id"],
  data() {
    return {
      parts: [],
      lessons: [],
      cards: [],
      examples: [],
      user: {},
      activeCardIndex: 0,
      transition: false,
    };
  },
  computed: {
    isFinalCard() {
      return this.activeCardIndex === this.cards.length - 1;
    },
    nextText() {
      if (this.isFinalCard) {
        return "Finish lesson and add flashcards to your deck";
      } else {
        return "Next";
      }
    },
    imageUrl() {
      return (
        "http://localhost:3000/images/" +
        this.cards[this.activeCardIndex].imageFileName
      );
    },
  },
  methods: {
    addFlashcards() {
      axios
        .post(`http://localhost:3000/api/addFlashcards/`, {
          examples: this.examples,
          userId: this.user._id,
          lessonNumber: this.lessons.lessonNumber,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    previousCard() {
      // Perform any necessary actions based on the discarded card
      // ...

      // Advance to the next card in the stack with animation
      this.transition = true;
      setTimeout(() => {
        if (this.activeCardIndex > 0) {
          this.activeCardIndex--;
        } else {
          // Handle end of stack
          // ...
        }
        this.transition = false;
      }, 0);
    },
    discardCard() {
      // Perform any necessary actions based on the discarded card
      // ...

      // Advance to the next card in the stack with animation
      this.transition = true;
      setTimeout(() => {
        if (this.activeCardIndex < this.cards.length - 1) {
          this.activeCardIndex++;
        } else {
          // Handle end of stack
          //post the array of examples to the api so the server can save the examples to flashcards
          this.finishLesson();
        }
        this.transition = false;
      }, 0); // adjust the duration of the animation as needed
    },
    convertToCardsArray(data) {
      const cards = [];
      let id = 1;

      data.parts.forEach((part) => {
        const explanationCard = {
          id: id++,
          type: "Explanation",
          text: part.explanation,
        };

        cards.push(explanationCard);

        if (part.examples.length > 0) {
          part.examples.forEach((example) => {
            const exampleCard = {
              id: id++,
              type: "Example",
              text: `${example.example} - ${example.translation}`,
              exampleAudioFileName: example.exampleAudioFileName,
              wordAudioFileName: example.wordAudioFileName,
              imageFileName: example.imageFileName,
            };

            cards.push(exampleCard);
          });
        }
      });

      return cards;
    },
    convertPartsToExamplesArray(parts) {
      const examples = [];

      parts.forEach((part) => {
        if (part.examples.length > 0) {
          part.examples.forEach((example) => {
            examples.push(example);
          });
        }
      });

      const examplesButWithRemovedIds = this.removeIdFromObjects(examples);

      return examplesButWithRemovedIds;
    },
    removeIdFromObjects(array) {
      return array.map((obj) => {
        delete obj["_id"];
        return obj;
      });
    },
    finishLesson() {
      this.addFlashcards();
      this.$router.push({ name: "Home" });
    },
    playAudio(audioFileName) {
      const audio = new Audio(`http://localhost:3000/audio/${audioFileName}`);
      audio.play();
    },
  },
  async mounted() {
    axios
      .get(`http://localhost:3000/api/oneVocab/` + this.id)
      .then((res) => {
        this.lessons = res.data.vocab;
        this.parts = res.data.vocab.parts;
        this.cards = this.convertToCardsArray(this.lessons);
        this.examples = this.convertPartsToExamplesArray(this.parts);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    const info = await checkAuthStatus();
    if (info) {
      this.user = info.user;
    }
  },
};
</script>

<style scoped>
.card-container {
  padding-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.navigate-buttons {
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
