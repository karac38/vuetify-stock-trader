<template>
  <v-container>
    <!-- <v-skeleton-loader :loading="loading" transition="scale-transition" type="card">
          <app-stock :stock="stock" :type="'buy'" v-for="stock in stocks" :key="stock.id"></app-stock>
    </v-skeleton-loader>-->

    <v-skeleton-loader :loading="loading" transition="scale-transition" type="card">
      <v-row>
        <app-stock :stock="stock" :type="'buy'" v-for="stock in stocks" :key="stock.id"></app-stock>
      </v-row>
    </v-skeleton-loader>
  </v-container>
</template>
<script>
import StockVue from "../components/Stock.vue";
export default {
  components: {
      appStock: StockVue
  },
  data() {
    return {
      transition: "scale-transition"
    };
  },
  computed: {
    loading() {
      return this.$store.state.stock.loading;
    },
    stocks() {
      return this.$store.state.stock.stocks;
    }
  }
};
</script>
<style scoped>
</style>