<template>
  <div class="home">
    This is lesson
    <br />
    Id: {{ id }}
    <br />
    Lessons: {{ lessons }}

    <router-link :to="{ name: 'LessonDetails', params: { id: id } }">
      Lesson Details
    </router-link>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LessonView",
  components: {},
  data() {
    return {
      id: 1,
      lessons: [],
    };
  },
  mounted() {
    axios
      .get(`http://localhost:8081/lessons`)
      .then((res) => {
        this.lessons = res.data.lessons;
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
