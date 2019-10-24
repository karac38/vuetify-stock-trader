<template>
  <v-container>
    <v-row>
      <app-stock :stock="stock" :type="'sell'" v-for="stock in $store.state.userStocks" :key="stock.id"></app-stock>
    </v-row>
  </v-container>
</template>
<script>
export default {};
</script>