<template>
  <div class="home">
    {{ examples }}
    <br />
    <v-container>
      <v-slide-x-transition mode="out-in">
        <v-card
          v-for="(card, index) in cards"
          :key="card.id"
          v-if="index === activeCardIndex"
        >
          <v-card-title>{{ card.type }}</v-card-title>
          <v-card-text style="color: black">{{ card.text }}</v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="previousCard">Previous</v-btn>
            <v-btn color="primary" @click="discardCard">Next</v-btn>
          </v-card-actions>
        </v-card>
      </v-slide-x-transition>
    </v-container>
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
  methods: {
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
          axios
            .post(`http://localhost:3000/api/addFlashcards/`, {
              examples: this.examples,
              userId: this.user._id,
              lessonNumber: this.lessons.lessonNumber,
            })
            .then((res) => {
              console.log(res);
            });
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
          type: "explanation",
          text: part.explanation,
        };

        cards.push(explanationCard);

        if (part.examples.length > 0) {
          part.examples.forEach((example) => {
            const exampleCard = {
              id: id++,
              type: "example",
              text: `${example.example} - ${example.translation}`,
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
  },
  async mounted() {
    axios
      .get(`http://localhost:3000/api/oneGrammar/` + this.id)
      .then((res) => {
        this.lessons = res.data.grammar;
        this.parts = res.data.grammar.parts;
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

<style></style>
