import Vue from 'vue';

let state = {
    orderList:[],
    params:{}
}
let getters = {
    getOrderList:state => state.orderList
}
let mutations = {
    updateOrderList(state,preload){
        state.orderList = preload;
    },
    updateParams(state,{key,val}){
        state.params[key] = val;
    },
    sortTable(state,arr){
        state.orderList = arr;
    }
   
}
let actions = {
    fetchOrderList({state,commit}){
        Vue.http.post('/api/getOrderList',state.params)
        .then((res)=>{
            commit('updateOrderList',res.data.list)
        },(err)=>{
            
        })
    }
}


export default {
    state,
    getters,
    mutations,
    actions

}