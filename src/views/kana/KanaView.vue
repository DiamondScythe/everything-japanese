<template>
  <div>
    <v-container class="card-container">
      <v-card elevation="3" outlined shaped tile height="420px" width="1000px">
        <v-row>
          <v-col sm="12" lg="6" offset-lg="3">
            <v-card-title class="justify-center"></v-card-title>
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="12" lg="6" offset-lg="3">
            <v-card-title class="justify-center"
              >Score: {{ score }}</v-card-title
            >
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
            <v-text-field
              v-model="currentInput"
              class="centered-input"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="12" lg="6" offset-lg="3">
            <v-card-text v-if="showAnswer" class="answer">{{
              answer
            }}</v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </v-container>

    <v-container class="card-container">
      <v-card elevation="3" outlined shaped tile height="auto" width="1000px">
        <v-row>
          <v-col sm="12" lg="12">
            <v-btn text @click="show = !show" block tile="true">
              Toggle settings</v-btn
            >
          </v-col>
        </v-row>
        <v-expand-transition>
          <div v-show="show" class="radio-group-container">
            <v-radio-group v-model="selectedOption" row class="radio-group">
              <v-radio
                v-for="(option, index) in options"
                :key="index"
                :label="option.text"
                :value="option.value"
                color="primary"
              />
            </v-radio-group>
          </div>
        </v-expand-transition>
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
      show: false,
      options: [
        { text: "Hiragana", value: "hiragana" },
        { text: "Katakana", value: "katakana" },
      ],
      selectedOption: "hiragana",
      score: 0,
    };
  },
  watch: {
    currentInput(newValue, oldValue) {
      this.checkInput(newValue);
    },
    selectedOption() {
      this.initializeKana();
    },
  },
  computed: {},
  mounted() {
    this.initializeKana();
  },
  methods: {
    checkInput(newValue) {
      //checks if newValue is equal to currentRomaji or currentKana
      if (this.checkAnswer(newValue) === "correct") {
        this.nextKana();
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
      this.increaseScore();
      //hide answer because there's a split second where the currentInput differs from the currentRomaji/currentKana for some reason
      this.hideAnswer();
      this.currentKana = this.currentArray[this.currentIndex].kana;
      this.currentRomaji = this.currentArray[this.currentIndex].romaji;
      setTimeout(() => {
        this.currentInput = "";
        this.answer = "";
      }, 20);
    },
    increaseScore() {
      this.score++;
    },
    resetScore() {
      this.score = 0;
    },
    hideAnswer() {
      this.showAnswer = false;
      setTimeout(() => {
        this.showAnswer = true;
      }, 100); // hide for 100 miliseconds
    },

    initializeKana() {
      this.currentIndex = 0;
      this.resetScore();
      if (this.selectedOption === "hiragana") {
        this.currentArray = this.hiragana;
      } else {
        this.currentArray = this.katakana;
      }
      this.shuffleCurrentArray();
      this.currentKana = this.currentArray[this.currentIndex].kana;
      this.currentRomaji = this.currentArray[this.currentIndex].romaji;
    },
  },
};
</script>

<style scoped>
.radio-group-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.answer {
  text-align: center;
  font-size: 1.1rem;
}
.centered-input >>> input {
  text-align: center;
}
.card-container {
  padding-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  border: 1px solid green;
}
.row {
  border: 1px solid red;
}
.col {
  border: 1px solid blue;
}
</style>
