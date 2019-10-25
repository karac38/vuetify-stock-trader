<template>
  <v-app-bar app class="grey lighten-3">
    <v-snackbar v-model="snackbar" :timeout="2000" :color="color" top>
      {{ snackBarText }}
      <v-btn color="white" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <router-link
      to="/"
      tag="span"
      :style="{ cursor: 'pointer'}"
      class="headline text-uppercase"
    >Stock Trader</router-link>
    <v-btn text tile class="mx-3" router to="/portfolio">Portfolio</v-btn>
    <v-btn text tile router to="/stocks">Stocks</v-btn>
    <v-spacer></v-spacer>
    <v-btn text @click="endDay" :disabled="loading">End Day</v-btn>
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn text v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in menuDropDown" :key="index" @click="doAction(item)">
          <v-list-item-title>{{ item }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-chip class="ma-2" label outlined large>Funds: {{getFunds}}</v-chip>
  </v-app-bar>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { EventBus } from "../eventbus";
export default {
  data() {
    return {
      menuDropDown: ["Save Data", "Load Data"],
      snackbar: false,
      snackBarText: "",
      color: ""
    };
  },
  computed: {
    ...mapGetters(["getFunds"]),
    loading() {
      return this.$store.state.stock.loading;
    }
  },
  methods: {
    ...mapActions(["endDayAsync"]),
    endDay() {
      EventBus.$emit("showOverlay");
      this.endDayAsync().then(() => {
        EventBus.$emit("hideOverlay");
      });
    },
    doAction(item) {
      if (item == "Save Data") {
        this.snackbar = true;
        this.snackBarText = "Save Data called";
        this.color = "warning";
      } else if (item == "Load Data") {
        this.snackbar = true;
        this.snackBarText = "Load Data called";
        this.color = "warning";
      }
    }
  },
  mounted() {
    EventBus.$on("success", text => {
      this.snackbar = true;
      this.snackBarText = text;
      this.color = "success";
    });
    EventBus.$on("error", text => {
      this.snackbar = true;
      this.snackBarText = text;
      this.color = "error";
    });
  },
  beforeDestroy() {
    EventBus.$off("success");
    EventBus.$off("error");
  }
};
</script>