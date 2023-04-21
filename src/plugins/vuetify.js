import Vue from "vue";
import Vuetify from "vuetify";
import "../../node_modules/vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

const opts = {
  theme: {
    themes: {
      light: {
        primary: "#ee67cf", // change this to your desired color
        secondary: "#424242",
        accent: "#ff82ec",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
      },
    },
  },
};

export default new Vuetify(opts);
