<template>
  <v-col cols="12" md="6">
    <v-card>
      <v-card-title :class="mainColor + ' white--text'">
        <div>{{stock.name}}</div>
      </v-card-title>
      <v-card-subtitle class="font-weight-bold white--text">Price: {{stock.price}}</v-card-subtitle>
      <v-card-actions>
        <v-container>
          <v-row>
            <v-col cols="12" md="10" class="my-n3">
              <v-text-field label="Quantity" :color="mainColor" type="number"></v-text-field>
            </v-col>
            <v-col cols="12" md="2" class="px-1">
              <v-btn :color="mainColor + ' white--text'">{{isBuyType ? "Buy" : "Sell"}}</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-col>
</template>
<script>
export default {
  props: ["stock", "type"],
  computed: {
    isBuyType() {
      return this.type === "buy";
    },
    isSellType() {
      return this.type === "sell";
    },
    mainColor() {
        console.log(`Type: ${this.type}`)
      let color = "light-green";
      if (this.isSellType) {
        color = "primary";
      }
      return color;
    }
  }
};
</script>