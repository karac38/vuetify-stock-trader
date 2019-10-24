<template>
  <v-container>
    <v-row>
      <app-stock :stock="stock" :type="'buy'" v-for="stock in $store.state.stocks" :key="stock.id"></app-stock>
    </v-row>
  </v-container>
</template>
<script>
import StockVue from "../components/Stock.vue";
export default {
  components: {
    appStock: StockVue
  }
};
</script>
<style scoped>
</style>