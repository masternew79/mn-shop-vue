<script>
export default {
    props: {
        product: Object,
        url: String
    }
}
</script>

<template>
    <social-sharing
        :url="url"
        :title="`${product.name} - This is the example project for vuejs`"
        description="This is the example project for vuejs"
        :quote="`${product.name} - This is the example project for vuejs`"
        hashtags="MasterNew, vuejs"
        inline-template>
        <network network="facebook">
            <v-btn small color="light-blue darken-3" dark>
                facebook
            </v-btn>
        </network>
    </social-sharing>
</template>

<style>
</style>
