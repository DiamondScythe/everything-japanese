<template>
  <div>
    <v-container>
      <a
        id="yg-widget-0"
        class="youglish-widget"
        :data-query="word"
        data-lang="japanese"
        data-zones="all"
        data-components="8415"
        data-bkg-color="theme_light"
        rel="nofollow"
        href="https://youglish.com"
        >Visit YouGlish.com</a
      >
    </v-container>
  </div>
</template>

<script>
export default {
  name: "YouGlishWidget",
  props: ["word"],
  data() {
    return {};
  },
  mounted() {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://youglish.com/public/emb/widget.js";
    script.charset = "utf-8";
    document.body.appendChild(script);
  },
};
</script>

<style scoped>
.v-container {
  max-width: 400px; /* Replace with your desired width */
  margin: auto;
}
</style>
