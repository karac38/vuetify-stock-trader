<template>
  <v-col cols="12" md="6">
    <v-card>
      <v-card-title :class="mainColor + ' font-weight-bold white--text headline'">
        <div>{{stock.name}}</div>
      </v-card-title>
      <v-card-subtitle :class="mainColor + ' font-weight-bold subtitle-2 white--text'">
        <template v-if="isBuyType">Price: {{stock.price}}</template>
        <template v-else-if="isSellType">Price: {{getStockPrice()}} | Quantity {{stock.count}}</template>
      </v-card-subtitle>
      <v-card-actions>
        <v-container>
          <v-form v-model="valid" lazy-validation ref="stockForm">
            <v-row>
              <v-col cols="8" sm="10" class="my-n3">
                <v-text-field
                  v-model="count"
                  label="Quantity"
                  color="grey darken-3"
                  type="number"
                  :rules="isSellType ? [rules.required, rules.amount, rules.isInteger] : [rules.required, rules.isInteger]"
                ></v-text-field>
              </v-col>
              <v-col cols="4" sm="2" class="px-1" align="center">
                <v-btn
                  v-if="isBuyType"
                  @click.stop="buyStocks(userStock)"
                  :color="mainColor + ' white--text'"
                  :disabled="!valid"
                >Buy</v-btn>
                <v-btn
                  v-else-if="isSellType"
                  @click.stop="sellStocks(userStock)"
                  :color="mainColor + ' white--text'"
                  :disabled="!valid"
                >Sell</v-btn>
              </v-col>
            </v-row>
          </v-form>
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
      currectStockPrice: "",
      rules: {
        required: v => !!v || "Required.",
        amount: v => (v && Number(v) <= Number(this.stock.count) ) || "You can not sell more than you have",
        isInteger: v => (v && Number.isInteger(Number(v)) && Number(v) > 0) || "The value must be a positive integer number"
      },
      valid: true
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
      let color = "green accent-1 green--text";
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
      if (!this.isValid()) return;
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
      if (!this.isValid()) return;
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
    isValid() {
      return this.$refs.stockForm.validate();
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