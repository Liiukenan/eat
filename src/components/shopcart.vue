<template>
    <div class="shopcart-box">
    <div class="shopcart">
    	<div class="content" @click="toggleList">
    		<div class="content-left">
    			<div class="logo-wrapper">
    				<div class="logo" :class="{'hightlight':totalCount>0}">
    					<i class="icon-shopping_cart" :class="{'hightlight':totalCount>0}">
    						
    					</i>
    					<div class="num" v-show="totalCount>0">
    						{{totalCount}}
    					</div>
    				</div>
    			</div>
    			<div class="price" :class="{'hightlight':totalPrice>0}">
    				{{totalPrice}}元
    			</div>
    			<div class="desc">
    				另需配送费￥ {{seller.deliveryPrice}}元
    			</div>
    		</div>
    		<div class="content-right" @click.stop.prevent="pay">
    			<div class="pay" :class="payClass">
    				{{payDesc}}
    			</div>
    		</div>
    	</div>
        <div class="ball-container">
            <transition name="fade" v-for="(ball,index) in balls" :key="index" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
              <div class="ball" v-show="ball.show">
                <div class="inner inner-hook"></div>
              </div>
            </transition>
        </div>
        <transition name="fold">
            <div class="shopcart-list" v-show="listShow">
                <div class="list-header">
                   <h1 class="title">购物车</h1>
                   <span class="empty" @click="empty">清空</span>
                </div>
                <div class="list-content" ref="listContent">
                    <ul>
                        <li class="food" v-for="food in selectFoods">
                            <span class="name">{{food.name}}</span>
                            <div class="price">
                                <span>￥{{food. price*food.count}}</span>
                            </div>
                            <div class="cartcontrol-wrapper">
                                <cartcontrol :food="food"></cartcontrol>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </transition>
        
    </div>
    <div class="list-mask" v-show="listShow" @click="hideList">
        
    </div>
    </div>
    
</template>

<script type="ecmascript-6">
import cartcontrol from './cartcontol.vue';
import BScroll from "better-scroll";
    export default{
    	data(){
    		return{
    			balls:[
                    {
                        show:false
                    },
                    {
                        show:false
                    },
                    {
                        show:false
                    },
                    {
                        show:false
                    },
                    {
                        show:false
                    }
                ],
                dropBalls:[],
               
                fold:true
    		}
    	},
    	props:['seller','selectFoods','minPrice'],
    	computed:{
            totalPrice(){
            	let total=0;
            	this.selectFoods.forEach((food)=>{
            		total+=food.price*food.count;
            	})
            	return total;
            },
            listShow(){
                if(!this.totalCount){
                    this.fold=true;
                    return false;
                }
                let show=!this.fold;
                if(!this.scroll){
                    this.$nextTick(()=>{
                        this.scroll=new BScroll(this.$refs.listContent,{
                            click:true
                        })
                    })
                }else{
                    this.scroll.refresh();
                }
                return show;
            },

            totalCount(){
            	let count=0;
            	this.selectFoods.forEach(food=>{
            		count += food.count;
            	})
            	return count;
            },
            payDesc(){
            	if(this.totalPrice===0){
            		return `￥${this.minPrice}元起送`;
            	}else if(this.totalPrice<this.minPrice){
            		let diff=this.minPrice-this.totalPrice;
            		return `还差￥${diff}元起送`;
            	}else{
            		return '去结算';
            	}
            },
            payClass(){
                if(this.totalPrice<this.minPrice){
                    return 'not-enough';
                }else{
                    return 'enough';
                }
            }
    	},
        methods:{
            toggleList(){
                if (!this.totalCount) {
                    return;
                }
                this.fold=!this.fold;
            },
            pay(){
                if(this.totalPrice<this.minPrice){
                    return;
                }
                alert(`支付${this.totalPrice}元`);
            },
            hideList(){
                this.fold=true;
            },
            empty(){
                this.selectFoods.forEach((food)=>{
                    food.count=0;
                })
            },
            drop(el){
                for(let i=0;i<this.balls.length;i++){
                    let ball=this.balls[i];
                    if(!ball.show){
                        ball.show=true;
                        ball.el=el;
                        this.dropBalls.push(ball);
                        return;
                    }
                }
            },
            beforeEnter(el){
                let count = this.balls.length;
                while (count--) {
                  let ball = this.balls[count];
                  if (ball.show) {
                    let rect = ball.el.getBoundingClientRect(); //获取小球的相对于视口的位移(小球高度)
                    let x = rect.left - 32;
                    let y = -(window.innerHeight - rect.top - 22); //负数,因为是从左上角往下的的方向
                    el.style.display = ''; //清空display
                    el.style.webkitTransform = `translate3d(0,${y}px,0)`; 
                    el.style.transform = `translate3d(0,${y}px,0)`;
                    //处理内层动画
                    let inner = el.getElementsByClassName('inner-hook')[0]; //使用inner-hook类来单纯被js操作
                    inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
                    inner.style.transform = `translate3d(${x}px,0,0)`;
                  }
                }
            },
            enter(el,done){
                let rf = el.offsetHeight; //触发重绘html
                this.$nextTick(() => { //让动画效果异步执行,提高性能
                  el.style.webkitTransform = 'translate3d(0,0,0)';
                  el.style.transform = 'translate3d(0,0,0)';
                  //处理内层动画
                  let inner = el.getElementsByClassName('inner-hook')[0]; //使用inner-hook类来单纯被js操作
                  inner.style.webkitTransform = 'translate3d(0,0,0)';
                  inner.style.transform = 'translate3d(0,0,0)';
                  el.addEventListener('transitionend', done); //Vue为了知道过渡的完成，必须设置相应的事件监听器。
                });

            },
            afterEnter(el){
               let ball = this.dropBalls.shift(); //完成一次动画就删除一个dropBalls的小球
                if (ball) {
                  ball.show = false;
                  el.style.display = 'none'; //隐藏小球
                }
            }

        },
        components:{
            cartcontrol
        }
 		         			
    }
</script>

<style rel="stylesheet" lang="scss">
@import "../css/base.scss";
    .shopcart{
    	position:fixed;
    	left:0;
    	bottom:0;
    	z-index:50;
    	width:100%;
    	height:48px;
    	.content{
    		display:flex;
    		background:#141d27;
    		color:rgba(255,255,255,0.4);
    		.content-left{
    			flex:1;
    			.logo-wrapper{
    				display:inline-block;
    				position:relative;
    				top:-10px;
    				margin:0 12px;
    				padding:6px;
    				width:56px;
    				height:56px;
    				box-sizing:border-box;
    				vertical-align:top;
    				border-radius:50%;
    				background:#141d27;
    				.num{
    					position:absolute;
    					top:0;
    					right:0;
    					width:24px;
    					height:16px;
    					line-height:16px;
    					text-align:center;
    					border-radius:16px;
    					font-size:9px;
    					font-weight:700;
    					color:#fff;
    					background:rgb(244,20,20);
    					box-shadow:0 4px 8px rgba(0,0,0,0.4);
    				}
    				.logo{
    					width:100%;
    					height:100%;
    					border-radius:50%;
    					background:#2b343c;
    					text-align:center;
    					&.hightlight{
    						background:rgb(0, 160, 220);

    					}
    					.icon-shopping_cart{
    						font-size:24px;
    						color:#80858a;
    						line-height:44px;
    						&.hightlight{
    							color:#fff;
    						}
    					}

    				}
    			}
    			.price{
    				display:inline-block;
    				vertical-align:top;
    				line-height:24px;
    				margin-top:12px;
    				box-sizing:border-box;
    				padding-right:12px;
    				border-right:1px solid rgba(255,255,255,0.1);
    				font-size:16px;
    				font-weight:700;
    				&.hightlight{
						color:#fff;
    				}
    				
					
    			}
    			.desc{
    				display:inline-block;
    				vertical-align:top;
    				line-height:24px;
    				margin:12px 0 0 12px;
    				line-height:24px;
    				
    			}
    		}
    		.content-right{
    			flex:0 0 105px;
    			width:105px;
    			.pay{
    				height:48px;
    				line-height:48px;
    				text-align:center;
    				font-size:12px;
    				font-weight:700;
                    &.not-enough{
                        background:#2b333b;
                    }
                    &.enough{
                        background:#00b43c;
                        color:#fff;
                    }

    			}
    		}
    	}
        .ball-container{
            .ball{
                position:fixed;
                left:32px;
                bottom:22px;
                z-index:200;
                transition: all .6s cubic-bezier(0.49, -0.29, 0.75, 0.41);
                .inner{
                    width:16px;
                    height:16px;
                    border-radius:50%;
                    background:rgb(0,160,220);
                    transition:all 0.6s linear;
                }

            }
        }
        .fold-enter,.fold-leave{
                transform:translate3d(0,0,0);
            }
        .shopcart-list{
            position:absolute;
            top:0;
            left:0;
            z-index:-1;
            width:100%;
            transform: translate3d(0, -100%, 0);
            transition: all 0.5s;
            &.fold-enter,&.fold-leave-to{
                transform:translate3d(0,0,0);
            }
            .list-header{
                height:40px;
                line-height:40px;
                padding:0 18px;
                background:#f3f5f7;
                border-bottom:1px solid rgba(7,17,27,0.1);
                .title{
                    float:left;
                    font-size:14px;
                    color:rgb(7,17,27)

                }
                .empty{
                    float:right;
                    font-size:12px;
                    color:rgb(0,160,220);
                }
            }
            .list-content{
                padding:0 18px;
                max-height:217px;
                background:#fff;
                overflow:hidden;
                background:#fff;
                .food{
                    position:relative;
                    padding:12px 0;
                    box-sizing:border-box;
                    @include border-1px(rgba(7,17,27,0.1));
                    .name{
                        line-height:24px;
                        font-size:14px;
                        color:rgb(7,17,27);

                    }
                    .price{
                        position:absolute;
                        right:90px;
                        bottom:12px;
                        line-height:24px;
                        font-size:14px;
                        font-weight:700;
                        color:rgb(240,20,20);
                    }
                    .cartcontrol-wrapper{
                        position:absolute;
                        right:0;
                        bottom:6px;
                    }

                }
            }
        }
    }
     .list-mask{
            position:fixed;
            top:0;
            left:0;
            width:100%;
            height:100%;
            z-index:40;
            opacity:1;
            backdrop-filter:blur(10px);
            background:rgba(7,17,27,0.6);
            transition:all 0.5s;
            &.fade-enter,&.fade-leave{
                opacity:0;
                background:rgba(7,17,27,0);

            }

        }
</style>