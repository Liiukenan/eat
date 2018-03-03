<template>
    <div class="star" :class="starType">
    	<span v-for="itemClass in itemClasses" :class="itemClasses" class="star-item">
    		
    	</span>
    	<span class="on"></span>
    </div>
</template>

<script type="ecmascript-6">
	const LENGTH=5;
	const CLS_ON='on';
	const CLS_HALF='half';
	const CLS_OFF='off';
    export default{
    	name:'star',
    	props:{
    		size:{
    			type:Number
    		},
    		score:{
    			type:Number
    		}
    	},
    	computed:{
    		starType(){
    			return 'star-'+this.size;
    		},
    		itemClasses(){
    			let result=[];
    			let score=Math.floor(this.score*2)/2;
    			let hasDecimal=scoe % 1 !==0;
    			let integer=Math.floor(score);
    			for(let i=0;i<integer;i++){
    				retult.push(CLS_ON);
    			}
    			if(hasDecimal){
    				result.push(CLS_HALF);
    			}
    			while(result.lengt<LENGTH){
    				result.push(CLS_OFF);
    			}
    			return result;
    		}
    	}
    }
</script>

<style rel="stylesheet" lang="scss" scoped>
	@import "../css/base.scss";
    .star{
    	font-size:0;
    	.star-item{
    		display:inline-block;
    		background-repeat:no-repeat;
    	}
    	&.star-48{
			.star-item{
				width: 10px;
				height: 10px;
				margin-right:3px;
				background-size:10px 10px;
				&:last-child{
					margin-right:0;
				}
				// &.on{
				// 	@include bg-images(star,star36_on)
				// }
				// &.half{
				// 	@include bg-images(star,star36_half)
				// }
				// &.off{
				// 	@include bg-images(star,star36_off)
				// }

			}
    	}
    }
</style>