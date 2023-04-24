<template>
  <div>
    {{ flashcards }}
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
      grammar: [],
      flashcards: [],
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
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
