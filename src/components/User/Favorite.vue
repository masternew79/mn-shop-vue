<script>
import Product from "../Product/Product";
import DrawerCart from "../Utils/Drawers/DrawerCart";
import { mapGetters } from "vuex";

export default {
  components: {
    "app-product": Product,
    "app-drawer-cart": DrawerCart
  },
  created() {
    this.getFavoriteItems();
  },
  methods: {
    getFavoriteItems() {
      this.$store.dispatch("product/getFavoriteItems");
    }
  },
  computed: {
    ...mapGetters({
      favoriteItems: "product/favoriteItems",
      favorites: "product/favorites"
    })
  },
  watch: {
    favorites: "getFavoriteItems"
  }
};
</script>

<template>
    <v-layout row wrap class="favorite">
        <v-flex xs12 class="mt-3 justify-center">
            <h2 class="related text-xs-center">FAVORITES PRODUCTS</h2>
            <v-layout row wrap>
                <v-flex
                    xs12 sm3
                    v-for="product in favoriteItems"
                    :key="product._id"
                    class="pa-1"
                    >
                    <app-product :product="product"></app-product>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex xs12 class="align-center">
            <v-card-actions class="justify-center">
                <v-btn
                router
                to="/"
                dark
                large
                style="margin-bottom: -110px"
                color="teal">
                    Continue shopping
                </v-btn>
            </v-card-actions>
        </v-flex>
        <!-- Cart drawer moblie -->
        <app-drawer-cart></app-drawer-cart>
        <!-- Cart drawer moblie -->
    </v-layout>
</template>

<style scoped>
</style>
