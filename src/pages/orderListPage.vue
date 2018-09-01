<template>
  <div class="order-wrap">
    <h3>您的产品</h3>
    <div class="order-list-choose">
      <div class="order-list-option">
        选择产品：
        <v-selection :selections="productLists" @on-change='selectChange'></v-selection>
      </div>

      <div class="order-list-option">
        开始日期：<input type="text" @focus='startDateFocus' v-model="startDate">
        <transition name="calendar-fade">
            <date-picker @close="startShow = false"
                v-if="startShow"
                v-model="startDate">
            </date-picker>
        </transition>
      </div>

      <div class="order-list-option">
        结束日期：
        <input type="text" @focus='endDateFocus' v-model="endDate">
        <transition name="calendar-fade">
            <date-picker @close="endShow = false"
                v-if="endShow"
                v-model="endDate">
            </date-picker>
        </transition>
      </div>

      <div class="order-list-option">
        关键词：
            <input type="text" v-model.lazy='query' class='order-query'>
      </div>
    </div>
    <div class="order-list-table">
      <table>
          <tr>
              <th v-for='item in tableHeads' 
              :key='item.key' 
              :class='{active:item.active }' 
              @click='headChecked(item)'>
                  {{item.label}}
              </th>
          </tr>
          <tr v-for='item in tableData'>
              <td v-for='headKey in tableHeads'>
                  {{ item[headKey.key] }}
              </td>
          </tr>
      </table>
    </div>
  </div>
</template>

<script>
import VSelection from '../components/base/selection'
import DatePicker from 'vue-md-date-picker'

import _ from 'lodash'
export default {
  components: {
    VSelection,
    DatePicker
   
  },
  data(){
      return {
          startDate:'',
          endDate:'',
          query:'',
          startShow:false,
          endShow:false,
          productId:0,
          productLists: [
            {
                label: '数据统计',
                value: 0,
                checked:true
            },
            {
                label: '数据预测',
                value: 1
            },
            {
                label: '流量分析',
                value: 2
            },
            {
                label: '广告发布',
                value: 3
            }
        ],
        tableHeads: [
            {
                label: '订单号',
                key: 'orderId',
                active:false
                
            },
            {
                label: '购买产品',
                key: 'product',
                active:false
            },
            {
                label: '版本类型',
                key: 'version',
                active:false
            },
            {
                label: '有效时间',
                key: 'period',
                active:false
            },
            {
                label: '购买日期',
                key: 'date',
                active:false
            },
            {
                label: '数量',
                key: 'buyNum',
                active:false
            },
            {
                label: '总价',
                key: 'amount',
                active:false
            }
        ],
        tableData:[]
      }
  },
  methods:{

      selectChange(val){
          this.productId = val;
          this.getTableData()
      },
      startDateFocus(){
          this.startShow = true
      },
      endDateFocus(){
          this.endShow = true
          
      },
      getTableData(){
          let params ={
              query:this.query,
              productId:this.productId,
              startDate:this.startDate,
              endDate:this.endDate
          }
          console.log(params )
          this.$http.post('/api/getOrderList',params).then((data)=>{
             this.tableData = JSON.parse(data.bodyText).list;
             console.log(this.tableData);
          },(err)=>{
             console.log(err);
          })


      },
      headChecked(item){
          
          this.tableHeads.forEach((e)=>{
               e.active = false;

          });
          item.active = true;
          
      }
  },
  watch:{
      query:function(){
           this.getTableData()
      },
      startDate(){
           this.getTableData()
      },
      endDate(){
           this.getTableData()
      }

  },
  mounted(){
      this.getTableData()
  }
 
}
</script>

<style scoped>
.order-wrap {
  width: 1200px;
  min-height: 800px;
  margin: 20px auto;
  overflow: hidden;
}
.order-wrap h3 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
.order-query {
  height: 25px;
  line-height: 25px;
  border: 1px solid #e3e3e3;
  outline: none;
  text-indent: 10px;
}
.order-list-option {
  display: inline-block;
  padding-left: 15px;
}
.order-list-option:first-child {
  padding-left: 0;
}
.order-list-table {
  margin-top: 20px;
}
.order-list-table table {
  width: 100%;
  background: #fff;
}
.order-list-table td,
.order-list-table th {
  border: 1px solid #e3e3e3;
  text-align: center;
  padding: 10px 0;
}
.order-list-table th {
  background: #4fc08d;
  color: #fff;
  border: 1px solid #4fc08d;
  cursor: pointer;
}
.order-list-table th.active {
  background: #35495e;
}
</style>
