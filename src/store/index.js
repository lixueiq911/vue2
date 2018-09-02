import Vue from 'vue'
import VueX from 'vuex'
import orderList from './modules/orderList'
Vue.use(VueX);
export default new VueX.Store({
    modules:{
        orderList

    }

})