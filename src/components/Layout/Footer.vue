<script>
    export default {
        computed: {
            widthIframe() {
                return this.$vuetify.breakpoint.xs ? '300' : '360'
            }
        }
    }
</script>

<template>
    <v-footer
        dark
        inset
        class="mt-4">
        <v-card
        class="flex"
        flat
        tile>
        <v-card-actions class="teal justify-center">
            <v-layout row wrap>
                <v-layout row wrap>
                    <v-flex xs12 sm6 order-xs2 order-sm1 class="pa-2 text-xs-center">
                        <v-layout row wrap>
                            <v-flex xs12 class="text-uppercase">
                                <v-btn icon>
                                    <v-icon>my_location</v-icon>
                                </v-btn>
                                7/4, Duong So 10, Tan Chanh Hiep, Thu Duc, Ho Chi Minh city.
                            </v-flex>
                            <v-flex xs12 class="text-uppercase">
                                <v-btn icon>
                                    <v-icon>local_phone</v-icon>
                                </v-btn>
                                Phone: 0168.323.0464
                            </v-flex>
                            <v-flex xs12>
                                <v-btn
                                    flat
                                    href="https://www.facebook.com/masternew966"
                                    target="_blank">
                                    <v-icon left>fab fa-facebook-square</v-icon>
                                    FacebooK: Lê Hoàng Tân
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex xs12 sm6 order-xs1 order-sm2 class="text-xs-center">
                        <iframe :src="'https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FMN-SHOP-1752492928169561&tabs&width=' + widthIframe + '&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&appId=309427086295592'" :width="widthIframe" height="130" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>
                    </v-flex>
                </v-layout>
                <v-flex xs12>
                    &copy;2018 — <strong>MN SHOP</strong>
                </v-flex>
            </v-layout>
        </v-card-actions>
        </v-card>
    </v-footer>
</template>

<style>

</style>
