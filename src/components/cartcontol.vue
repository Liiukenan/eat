<template>
    <div class="cartcontrol">
	    <transition name="move">
	    	<div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click.stop.prevent="decreaseCart">
	    		<span class="inner icon-remove_circle_outline"></span>
	    	</div>
	    </transition>
    	<div class="cart-count" v-show="food.count>0">
    		{{food.count}}
    	</div>
    	<div class="cart-add icon-add_circle" @click.stop.prevent="addCart">
    		
    	</div>
    </div>
</template>

<script type="ecmascript-6">
    import Vue from 'vue';  
    export default{
    	props:['food'],
    	mounted(){
    		// console.log(this.food);
    	},
    	methods:{
    		addCart(event){
    			if (!event._constructed) {
    				return;
    			}
    			if (!this.food.count) {
    				Vue.set(this.food,'count',1);
    				this.food.count=1;
    			}else{
    				this.food.count++;
    			}
    			this.$emit('cartAdd',event.target);
    		},
    		decreaseCart(event){
    			if(!event._constructed){
    				return;
    			}
    			if(this.food.count){
    				this.food.count--;
    			}
    		}
    	}
    }
</script>

<style rel="stylesheet" lang="scss">
    .cartcontrol{
    	font-size:0;
    	.cart-decrease{
    		display:inline-block;
    		padding:6px;
    		opacity:1;
    		transform:translate3d(0, 0,0) rotate(0deg);
    		transition: all .4s;
    		.inner{
    			display:inline-block;
				line-height:24px;
	    		font-size:24px;
	    		color:rgb(0,160,220);
	    		width:24px;
	    		height:24px;
    		}
    		&.move-enter,&.move-leave-to{
    			opacity:0;
    			transform:translate3d(24px, 0,0) rotate(360deg);
    		}
    	}
    	.cart-count{
    		display:inline-block;
    		vertical-align:top;
    		width:12px;
    		padding-top:6px;
    		line-height:24px;
    		text-align:center;
    		font-size:10px;
    		color:rgb(147,153,159);
    	}
    	.cart-add{
    		display:inline-block;
    		padding:6px;
    		line-height:24px;
    		font-size:24px;
    		color:rgb(0,160,220);
    	}
    }
</style>