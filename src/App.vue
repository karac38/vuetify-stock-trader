<template>
  <v-app>
    <app-nav-bar></app-nav-bar>
    <v-content>
      <v-fade-transition mode="out-in">
        <router-view></router-view>
      </v-fade-transition>
    </v-content>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
import AppNavBar from "./components/AppNavBar";
import { mapActions, mapMutations, mapGetters } from "vuex";
import * as types from "./store/types";
import { EventBus } from "./eventbus";

export default {
  name: "App",
  components: {
    appNavBar: AppNavBar
  },
  computed:{
    ...mapGetters(["getStocks", "userStocks"])
  },
  methods: {
    ...mapActions(["getStocksAsync", "getUserStocks"]),
    ...mapMutations({
      finishLoading: types.SET_LOADING,
      finishUserLoading: types.FINISH_USER_LOADING
    })
  },
  data: () => ({
    overlay: false
  }),
  watch: {
    overlay(val) {
      this.overlay = val;
    }
  },
  created() {
    if (
      !this.getStocks ||
      this.getStocks.length == 0
    ) {
      this.getStocksAsync().then(() => {
        this.finishLoading();
      });
    }
    if (
      !this.userStocks ||
      this.userStocks.length == 0
    ){
      this.getUserStocks().then(()=>{
        this.finishUserLoading();
      })
    }

    EventBus.$on("showOverlay", () => {
      this.overlay = true;
    });
    EventBus.$on("hideOverlay", () => {
      this.overlay = false;
    });
  },
  beforeDestroy() {
    EventBus.$off("showOverlay");
    EventBus.$off("hideOverlay");
  }
};
</script>
