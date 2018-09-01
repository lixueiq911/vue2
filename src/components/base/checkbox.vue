<template>
    <div class="chooser-component">
        <ul class="chooser-list">
         	<li v-for='item in selections'  
           :class='{active: item.checked  }'
            @click='toggle(item)' >
         		{{ item.label }}
         	</li>
        </ul>
      </div>
    </div>
</template>

<script>
export default {
  props: {
  	selections:{
      type:Array,
      default:{ 
        value:0
        }
      }
    
  },
  data(){
    
  	return {
      //nowIndex:0
      selectArr:[],
  	}
  },
  methods:{

  	toggle(item){
      
      item.checked = !item.checked;
      console.log(this.selections );
      if(item.checked){
        this.selectArr.push(item.value);
      }else{
        var index = this.selectArr.indexOf(item.value);
        this.selectArr.splice(index, 1)
      }
      this.$emit('checkBoxChange',this.selectArr);
  	}
  },
  mouted:function(){
    selections.forEach(item => {
        if(item.checked){
          this.selectArr.push(item.value);
        }
    });
    this.$emit('checkBoxChange',this.selectArr);
  }
}
</script>

<style scoped>
.chooser-component {
  position: relative;
  display: inline-block;
}
.chooser-list li{
  display: inline-block;
  border: 1px solid #e3e3e3;
  height: 25px;
  line-height: 25px;
  padding: 0 8px;
  margin-right: 5px;
  border-radius: 3px;
  text-align: center;
  cursor: pointer;
}
.chooser-list li.active {
  border-color: #4fc08d;
  background: #4fc08d;
  color: #fff;
}
</style>
