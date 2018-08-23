import Api from "@/services/Api";
import store from "@/store";

export default {
    getProducts() {
        console.log(store);
        return Api.get(`/products`);
    }
};
