<template>
  <div>
    <YouGlishWidget :word="word"></YouGlishWidget>
  </div>
</template>

<script>
import YouGlishWidget from "@/components/YouGlishWidget.vue";

export default {
  props: ["word"],
  name: "WatchView",
  data() {
    return {};
  },
  components: {
    YouGlishWidget,
  },
};
</script>
