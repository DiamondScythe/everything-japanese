<template>
  <div>
    <!-- { "_id": "6444e6259f57a76141c02d81", "lessonNumber": 1, "title": "State of being with だ
    and です", "details": "In this lesson, you'll learn how だ and です work. Good luck!"} -->

    <v-container>
      <v-row
        v-for="(grammar, difficulty) in lessonsByDifficulty"
        :key="difficulty"
      >
        <v-col class="mt-2" cols="12">
          <strong>{{ difficulty }} lessons</strong>
        </v-col>

        <v-col
          v-for="lesson in grammar"
          :key="lesson.lessonNumber"
          :to="'/grammar/learn/' + lesson.lessonNumber"
          cols="6"
          md="2"
        >
          <v-sheet height="150">
            <v-card style="height: 100%">
              <v-card-text style="color: black">
                <router-link
                  :to="'/grammar/learn/' + lesson.lessonNumber"
                  tag="a"
                  style="color: inherit; text-decoration: none"
                >
                  Lesson {{ lesson.lessonNumber }}:
                  {{ lesson.title }}
                </router-link>
              </v-card-text>
            </v-card>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "GrammarView",
  data() {
    return {
      grammar: [],
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000/allGrammar")
      .then((response) => {
        this.grammar = response.data.grammarList;
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  computed: {
    lessonsByDifficulty() {
      return this.grammar.reduce((acc, lesson) => {
        if (acc[lesson.difficulty]) {
          acc[lesson.difficulty].push(lesson);
        } else {
          acc[lesson.difficulty] = [lesson];
        }
        return acc;
      }, {});
    },
  },
  components: {},
  methods: {},
};
</script>
