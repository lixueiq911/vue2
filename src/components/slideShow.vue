<template>
	
	<div class="slide-show" @mouseenter="clearInv()" @mouseleave="runInv()">
		<div class="slide-img">
		   <a :href="slides[nowIndex].href">
		   	<transition name='slide-trans'>
		   		<img v-if='isShow' :src="slides[nowIndex].src" alt="" />
		   	</transition>
		   	<transition name='slide-trans-old'>
		   		<img v-if='!isShow' :src="slides[nowIndex].src" alt="" />
		   	</transition>
		   </a>
		
		</div>
		<h2>title</h2>
		<ul class="slide-pages">
			<li @click='goto(prev)'>&lt;</li>
			<li v-for='(item,index) in slides' @click='goto(index)'>
				<a :class='{on:index === nowIndex }'>{{index}}</a>
				
			</li>
			<li @click='goto(next)'>&gt;</li>
			
			
			
			
		</ul>
	
	
	</div>
</template>

<script>
	export default {
		//父子组件通信，需在子组建中创建属性，否则子组建不能接受到信息
		props:{
			slides:{
				type:Array,
				default:[]
			},
			inv:{
				type:Number,
				default:1000
			}
		},
		
		data(){
			return {
				nowIndex:0,
				isShow:true
			}
		},
		computed:{
			//上一张
			prev(){
				if( this.nowIndex === 0){
					return this.slides.length -1;
				}else{
					return this.nowIndex-1;
				}
				
			},
			//下一张
			next(){
				
				if( this.nowIndex === this.slides.length -1){
					return 0;
				}else{
					return this.nowIndex+1;
				}
			}
			
		},
		methods:{
			//轮播
			goto(index){
				this.isShow=false;
				
				setTimeout(()=>{
					this.isShow=true;
					this.nowIndex = index;
					this.$emit('onchange',index );//触发父组建 的onchange事件,只能在再调用的组建上除非也就是<slide-show>组建上触发
					
				},10)
				
			},
			//自动轮播
			runInv(){
				
				this.invId = setInterval(()=>{
					this.goto( this.next );
				},this.inv)
				
			},
			//清除定时器
			clearInv(){
				clearInterval( this.invId );
				
			}
			
		},
		mounted(){//渲染完毕
			this.runInv();
			//console.log( this.slides );
			
			
		}
		
	}
</script>

<style scoped>
.slide-trans-enter-active {
  transition: all .5s;
}
.slide-trans-enter {
  transform: translateX(900px);
}
.slide-trans-old-leave-active {
  transition: all .5s;
  transform: translateX(-900px);
}
.slide-show {
  position: relative;
  margin: 15px 15px 15px 0;
  width: 900px;
  height: 500px;
  overflow: hidden;
}
.slide-show h2 {
  position: absolute;
  width: 100%;
  height: 100%;
  color: #fff;
  background: #000;
  opacity: .5;
  bottom: 0;
  height: 30px;
  text-align: left;
  padding-left: 15px;
}
.slide-img {
  width: 100%;
}
.slide-img img {
  width: 100%;
  position: absolute;
  top: 0;
}
.slide-pages {
  position: absolute;
  bottom: 10px;
  right: 15px;
}
.slide-pages li {
  display: inline-block;
  padding: 0 10px;
  cursor: pointer;
  color: #fff;
}
.slide-pages li .on {
  text-decoration: underline;
}
	
	
</style>