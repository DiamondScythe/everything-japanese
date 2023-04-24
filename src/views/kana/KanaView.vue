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
            <v-card-title class="justify-center">{{
              currentKana
            }}</v-card-title>
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="12" lg="6" offset-lg="3">
            <v-text-field v-model="currentInput"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="12" lg="6" offset-lg="3">
            <v-card-text v-if="showAnswer">{{ answer }}</v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import hiragana from "@/data/hiragana.js";
import katakana from "@/data/katakana.js";

export default {
  name: "KanaView",
  components: {},
  props: [],
  data() {
    return {
      hiragana: hiragana,
      katakana: katakana,
      currentArray: null,
      currentKana: null,
      currentRomaji: null,
      currentInput: "",
      currentIndex: 0,
      answer: "",
      showAnswer: true,
    };
  },
  watch: {
    currentInput(newValue, oldValue) {
      this.checkInput(newValue);
    },
  },
  computed: {},
  mounted() {
    this.currentArray = this.hiragana;
    this.shuffleCurrentArray();
    this.currentKana = this.currentArray[this.currentIndex].kana;
    this.currentRomaji = this.currentArray[this.currentIndex].romaji;
  },
  methods: {
    checkInput(newValue) {
      //checks if newValue is equal to currentRomaji or currentKana
      if (this.checkAnswer(newValue) === "correct") {
        this.nextKana();
        // setTimeout(() => {
        //   this.currentInput = "";
        //   this.answer = "";
        // }, 100);
      }
      if (this.checkAnswer(newValue) === "incorrect") {
        this.displayAnswer();
      }
    },
    checkAnswer(newValue) {
      if (newValue === this.currentKana) {
        return "correct";
      } else {
        if (newValue.length < this.currentRomaji.length) {
          for (let i = 0; i < newValue.length; i++) {
            if (newValue[i] !== this.currentRomaji[i]) {
              return "incorrect";
            }
          }
          return "wait";
        } else {
          if (newValue === this.currentRomaji) {
            return "correct";
          } else {
            return "incorrect";
          }
        }
      }
    },
    //// Define a shuffle function using the Fisher-Yates algorithm
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    },
    shuffleCurrentArray() {
      this.shuffleArray(this.currentArray);
    },
    nextKana() {
      //checks if currentIndex is equal to currentArray.length
      //if true, shuffle currentArray and set currentIndex to 0
      if (this.currentIndex === this.currentArray.length - 1) {
        this.shuffleCurrentArray();
        this.currentIndex = 0;
        this.updateFields();
      } else {
        this.currentIndex++;
        this.updateFields();
      }
    },
    displayAnswer() {
      this.answer = this.currentKana + " is " + this.currentRomaji;
    },
    updateFields() {
      //hide answer because there's a split second where the currentInput differs from the currentRomaji/currentKana for some reason
      this.hideAnswer();
      this.currentKana = this.currentArray[this.currentIndex].kana;
      this.currentRomaji = this.currentArray[this.currentIndex].romaji;
      setTimeout(() => {
        this.currentInput = "";
        this.answer = "";
      }, 20);
    },
    hideAnswer() {
      this.showAnswer = false;
      setTimeout(() => {
        this.showAnswer = true;
      }, 100); // hide for 100 miliseconds
    },
  },
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
