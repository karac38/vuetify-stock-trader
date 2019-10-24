<template>
  <v-app-bar app class="grey lighten-3">
    <router-link
      to="/"
      tag="v-toolbar-title"
      :style="{ cursor: 'pointer'}"
      class="headline text-uppercase"
    >Stock Trader</router-link>
    <v-btn text tile class="mx-3" router >Portfolio</v-btn>
    <v-btn text tile router to="/stocks">Stocks</v-btn>
    <v-spacer></v-spacer>
    <v-btn text>End Day</v-btn>
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn text v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in menuDropDown" :key="index">
          <v-list-item-title>{{ item }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-chip class="ma-2" label outlined large>Funds: {{currentFunds}}</v-chip>
  </v-app-bar>
</template>
<script>
import { mapGetters } from "vuex";
import * as types from "../store/types.js";
export default {
  data() {
    return {
      menuDropDown: ["Save Data", "Load Data"]
    };
  },
  computed: {
    ...mapGetters({
      currentFunds: types.GET_FUNDS
    })
  }
};
</script>