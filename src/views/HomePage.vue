<template>
  <v-container>
    <v-skeleton-loader :loading="getLoading" transition="scale-transition" type="card">
      <v-row align="center" justify="center" class="grey lighten-5">
        <v-col cols="12">
          <v-card class="ma-10 pa-10" outlined tile>
            <v-card-title class="display-1 overlap">Trade of View your Portfolio</v-card-title>
            <v-card-subtitle>
              <div>
                You may Save & Load your Data
                <br />Click on 'End Day' to begin a new Day!
              </div>
            </v-card-subtitle>
            <hr />
            <v-card-text>
              <div class="headline font-weight-bold">Your Funds: {{getFunds}}</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-skeleton-loader>
  </v-container>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from "vuex";

export default {
  name: "home",
  computed: {
    ...mapGetters(["getFunds", "getLoading"])
  }
};
</script>

<style scoped>
div.overlap {
  word-break: break-word;
}
</style>