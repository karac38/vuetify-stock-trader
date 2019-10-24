<template>
  <v-app>
<app-nav-bar></app-nav-bar>

    <v-content>
      <router-view class="mx-8 mb-4"></router-view>
    </v-content>
  </v-app>
</template>

<script>
import AppNavBar from './components/AppNavBar'
export default {
  name: 'App',
  components: {
    appNavBar: AppNavBar
  },
  data: () => ({
    //
  }),
};
</script>
