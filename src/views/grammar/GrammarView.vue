<template>
  <div class="home">
    <v-list>
      <v-list-item
        v-for="lesson in grammar"
        :key="lesson.lessonNumber"
        :to="'/grammar/learn/' + lesson.lessonNumber"
      >
        <v-list-item-title
          >Lesson No.{{ lesson.lessonNumber }}:
          {{ lesson.title }}</v-list-item-title
        >
      </v-list-item>
    </v-list>
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
  components: {},
  methods: {},
};
</script>
