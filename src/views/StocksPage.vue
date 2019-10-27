<template>
  <v-container>
    <v-skeleton-loader :loading="getLoading" transition="scale-transition" type="card">
      <v-row>
        <app-stock :stock="stock" :type="'buy'" v-for="stock in getStocks" :key="stock.id"></app-stock>
      </v-row>
    </v-skeleton-loader>
  </v-container>
</template>
<script>
import StockVue from "../components/Stock.vue";
import {mapGetters} from 'vuex';
export default {
  components: {
      appStock: StockVue
  },
  computed: {
    ...mapGetters(["getStocks", "getLoading"])
  }
};
</script>
<style scoped>
</style>