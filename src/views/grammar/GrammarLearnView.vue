<template>
  <div class="home">
    This is lessondetails
    <br />
    Id: {{ id }}
    <br />
    Lesson: {{ lesson }}
    <v-container>
      <v-slide-x-transition mode="out-in">
        <v-card
          v-for="(card, index) in cards"
          :key="card.id"
          v-if="index === activeCardIndex"
        >
          <v-card-title>{{ card.content }}</v-card-title>
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
import axios from "axios";

export default {
  name: "LessonDetailsView",
  components: {},
  props: ["id"],
  data() {
    return {
      lesson: [],
      cards: [
        { id: 1, content: "Card 1" },
        { id: 2, content: "Card 2" },
        { id: 3, content: "Card 3" },
      ],
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
          // ...
        }
        this.transition = false;
      }, 0); // adjust the duration of the animation as needed
    },
  },
  mounted() {
    axios
      .get(`http://localhost:3000/api/oneGrammar/` + this.id)
      .then((res) => {
        this.lesson = res.data.grammar;
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
