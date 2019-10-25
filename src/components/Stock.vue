<template>
  <v-col cols="12" md="6">
    <v-card>
      <v-card-title :class="mainColor + ' white--text headline'">
        <div>{{stock.name}}</div>
      </v-card-title>
      <v-card-subtitle :class="mainColor + ' font-weight-bold subtitle-2 white--text'">
        <template v-if="isBuyType">Price: {{stock.price}}</template>
        <template v-else-if="isSellType">Price: {{getStockPrice()}} | Quantity {{stock.count}}</template>
      </v-card-subtitle>
      <v-card-actions>
        <v-container>
          <v-row>
            <v-col cols="8" sm="10" class="my-n3">
              <v-text-field v-model="count" label="Quantity" :color="mainColor" type="number"></v-text-field>
            </v-col>
            <v-col cols="4" sm="2" class="px-1" align="center">
              <v-btn
                v-if="isBuyType"
                @click="buyStocks(userStock)"
                :color="mainColor + ' white--text'"
              >Buy</v-btn>
              <v-btn
                v-else-if="isSellType"
                @click="sellStocks(userStock)"
                :color="mainColor + ' white--text'"
              >Sell</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-col>
</template>
<script>
import { mapActions } from "vuex";
import { EventBus } from "../eventbus";

export default {
  props: ["stock", "type"],
  data() {
    return {
      count: "",
      currectStockPrice: ""
    };
  },
  computed: {
    isBuyType() {
      return this.type === "buy";
    },
    isSellType() {
      return this.type === "sell";
    },
    mainColor() {
      let color = "green";
      if (this.isSellType) {
        color = "primary";
      }
      return color;
    },
    userStock() {
      return { ...this.stock, count: this.count };
    }
  },
  methods: {
    ...mapActions(["buyStocksAsync", "sellStocksAsync", "getStockPriceAsync"]),
    buyStocks() {
      this.buyStocksAsync(this.userStock)
        .then(() => {
          EventBus.$emit(
            "success",
            `You successfully bought some ${this.stock.name} stocks!`
          );
        })
        .catch(reason => {
          EventBus.$emit("error", `${reason}!`);
        });
    },
    sellStocks() {
      this.sellStocksAsync(this.userStock)
        .then(() => {
          EventBus.$emit(
            "success",
            `You successfully sold some ${this.stock.name} stocks!`
          );
        })
        .catch(reason => {
          EventBus.$emit("error", `${reason}!`);
        });
    },
    getStockPrice() {
      this.getStockPriceAsync(this.userStock)
        .then(result => {
          this.currectStockPrice = result;
        })
        .catch(reason => {
          EventBus.$emit("error", `${reason}!`);
        });

      return this.currectStockPrice;
    }
  }
};
</script>