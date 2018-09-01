<template>
    <div class="counter-component">
        <div class="counter-btn" @click='reduce'>-</div>
        <div class="counter-show" >
        	<input type="text" v-model='number' @keyup='calNumber' />
        	
        </div>
        <div class="counter-btn" @click='add'>+</div>
     
    </div>
</template>

<script>
export default {
  props: {
  	selections:{
  		type:Number,
  		default:0
  	},	
    max:{
      type:Number,
      default:5
    },
    min:{
      type:Number,
      default:1
    }
	
  },
  data(){
  	return {
  		number:this.selections
  	}
  },
  watch:{
//	number(){
//		console.log( typeof this.val  );
//		
//		
//	}
  	
  },
  watch:{
  	number(){
  		this.$emit('on-change',this.number);
  		
  	}
  },
  methods:{
  	
  	calNumber(){
  		
  		let result;
  		if(typeof this.number === 'string'){
  			
  			result = Number( this.number.replace(/\D/g,'' ) )
  		}else{
  			result = this.number
  		}
  		
  		result = Math.max( result,this.min  );
  		console.log( result )
  		result = Math.min( result,this.max  );
  		this.number = result;
  	    this.$emit('countChange',this.number);
  		//this.selections
  	},
  	add(){
  		this.number+=1;
  		this.calNumber()
  	},
  	reduce(){
  		this.number-=1;
  		this.calNumber()
  	}
  },
  mounted(){
  	
  }
}
</script>

<style scoped>
.counter-component {
  position: relative;
  display: inline-block;
  overflow: hidden;
  vertical-align: middle;
}
.counter-show {
  float: left;
}
.counter-show input {
  border: none;
  border-top: 1px solid #e3e3e3;
  border-bottom: 1px solid #e3e3e3;
  height: 23px;
  line-height: 23px;
  width: 30px;
  outline: none;
   text-align: center;
  text-indent: 4px;
}
.counter-btn {
  border: 1px solid #e3e3e3;
  float: left;
  height: 25px;
  line-height: 25px;
  width: 25px;
  text-align: center;
  cursor: pointer;
}
.counter-btn:hover {
  border-color: #4fc08d;
  background: #4fc08d;
  color: #fff;
}
</style>
