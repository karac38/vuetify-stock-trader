<template>
  <v-container>
    <v-row  v-if="$store.state.stock.userStocks.length > 0">
      <app-stock :stock="stock" :type="'sell'" v-for="stock in $store.state.stock.userStocks" :key="stock.id"></app-stock>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <v-card class="ma-10 pa-10" outlined tile>
          <v-card-title class="display-1 overlap">No stocks purchased</v-card-title>
          <hr>
          <v-card-text>
            <div class="headline font-weight-bold">
              Your Funds: {{getFunds}}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import StockVue from '../components/Stock.vue';

export default {
  computed:{
    ...mapGetters(["getFunds"])
  },
  components:{
    appStock: StockVue
  }
};
</script>