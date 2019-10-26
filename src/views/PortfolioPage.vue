<template>
  <v-container>
    <v-row v-if="!hasStocks">
      <v-col cols="12">
        <v-card class="ma-8 pa-10" outlined tile>
          <v-card-title class="display-1 overlap">No stocks purchased</v-card-title>
          <hr />
          <v-card-text>
            <div class="headline font-weight-bold">Your Funds: {{getFunds}}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else>
      <app-stock :stock="stock" :type="'sell'" v-for="stock in userStocks" :key="stock.id"></app-stock>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import StockVue from "../components/Stock.vue";

export default {
  computed: {
    ...mapGetters(["getFunds"]),
    hasStocks() {
      if (this.$store.state.stock.userDataLoading) return false;
      return this.$store.state.stock.userData.stocks.length > 0;
    },
    userStocks() {
      return this.$store.state.stock.userData.stocks;
    }
  },
  components: {
    appStock: StockVue
  }
};
</script>
<style scoped>
div.overlap {
  word-break: break-word;
}
</style>