<template>
    <div class="goods">
    	<div class="menu-wrapper" ref="menuWrapper">
    		<ul>
                <li v-for="(item,index) in goods" class="menu-item" :class="{'current':index==active}" @click="selectMenu(index,$event)" ref="menuList">
                    <span class="text border-1px">
                        <span class="icon"  v-show="item.type>0" :class="classMap[item.type]">
                        </span>
                        {{item.name}}
                    </span>
                </li>
            </ul>
    	</div>
    	<div class="foods-wrapper" ref="foodsWrapper">
            <ul>
                <li v-for="item in goods" class="food-list food-list-hook" ref="foodList">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item border-1px">
                            <div class="icon">
                                <img :src="food.icon" alt="" width="57" height="57">
                            </div>
                            <div class="content">
                                <h2 class="name">
                                    {{food.name}}
                                </h2>
                                <p class="desc">
                                    {{food.description}}
                                </p>
                                <div class="extra">
                                    <span class="count">
                                        月售{{food.sellCount}}份
                                    </span>
                                    <span>
                                        好评率{{food.rating}}%
                                    </span>
                                    
                                </div>
                                <div class="price">
                                    <span class="now">￥{{food.price}}</span>
                                    <span class="old" v-if="food.oldPrice">
                                        ￥{{food.oldPrice}}
                                    </span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <cartcontol :food="food" @cartAdd="getAdd"></cartcontol>
                                </div>
                                
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>   
        </div>
        <shopcart ref="shopcart" :select-foods="selectfoods" :seller="seller" v-if="seller" :min-price="seller.minPrice"></shopcart>
        <food :food="selectedFood" ref="food" @cartAdd="getAdd"></food>
    </div>
</template>

<script type="ecmascript-6">
import store from "../store.js";
import shopcart from './shopcart.vue';
import cartcontol from './cartcontol.vue';
import food from './food.vue';
import BScroll from "better-scroll";
import {mapState} from 'vuex';
const ERR_OK = 0;
const debug = process.env.NODE_ENV !== 'production';
    export default{
    	name:'goods',
        data(){
            return{
                listHeight:[],
                scrollY:0,
                active:'',
                selectedFood:{}
            }
        },
        computed:{
            ...mapState({
                goods:state=>state.newslist.goods,
                seller:state=>state.newslist.seller,
                classMap:state=>state.classMap
            }),
            selectfoods(){
                let foods=[];
                this.goods.forEach((good)=>{
                    good.foods.forEach((food)=>{
                        if(food.count){
                            foods.push(food);
                        }
                    })
                })
                return foods;
            }
        },
       mounted() {
          this.$nextTick(() => {
                this.initScroll();
                this.calculateHeight();
              });
          
        },
        methods:{
            selectFood(food,event){
                if(!event._constructed){
                    return;
                }
                this.selectedFood=food;
                this.$refs.food.show();
            },
            initScroll(){
                this.menuScroll=new BScroll(this.$refs.menuWrapper,{
                    click:true
                });
                this.foodsScroll=new BScroll(this.$refs.foodsWrapper,{
                    click:true,
                    probeType:3
                });
                this.foodsScroll.on('scroll',pos=>{
                    this.scrollY=Math.abs(Math.round(pos.y));
                })
            },
            drop(target){
                // 体验优化,异步执行下落动画
                this.$nextTick(() => {
                  this.$refs.shopcart.drop(target);
                });
            },
            getAdd(target){
                this.drop(target);
            },
            calculateHeight(){
                let foodList=this.$refs.foodsWrapper;
                let height=0;
                this.listHeight.push(height);
                for (var i = 0; i < foodList.length; i++) {
                    let item=foodList[i];
                    height+=item.clientHeight;
                    this.listHeight.push(height);
                }
            },
            selectMenu(index,event){
                if(!event._constructed){
                    return;
                };
                let foodList=this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
                let el=foodList[index];
                this.foodsScroll.scrollToElement(el,300);
                this.active=index;
            }
        },
        components:{
            shopcart,
            cartcontol,
            food
        }
    }
</script>

<style rel="stylesheet" lang="scss">
@import "../css/base.scss";
    .goods{
    	position:absolute;
    	top:174px;
    	bottom:46px;
    	width:100%;
    	display:flex;
    	overflow:hidden;
    	.menu-wrapper{
    		flex:0 0 80px;
    		width:80px;
    		background:#f3f5f7;
            .menu-item{
                display:table;
                height:54px;
                width:56px;
                line-height:14px;
                padding:0 12px;
                &.current{
                    position:relative;
                    margin-top:-1px;
                    z-index:10;
                    background:#fff;
                    font-weight:700;
                    .text{
                        @include border-none;
                    }
                }
                .icon{
                    display:inline-block;
                    vertical-align:top;
                    width:12px;
                    height:12px;
                    margin-right:2px;
                    background-size:12px 12px;
                    background-repeat:no-repeat;
                    &.decrease{
                        @include bg-images(goods,decrease_3);
                    }
                    &.discount{
                        @include bg-images(goods,discount_3);
                    }
                    &.guarantee{
                        @include bg-images(goods,guarantee_3);
                    }
                    &.invoice{
                        @include bg-images(goods,invoice_3);
                    }
                    &.special{
                        @include bg-images(goods,special_3);
                    }
                }
                .text{
                    display:table-cell;
                    width:56px;
                    vertical-align:middle;
                    font-size:12px;
                    @include border-1px(rgba(7,17,27,0.1));
                }
            }
        }
        .foods-wrapper{
            flex:1;
            .title{
                padding-left:14px;
                height:26px;
                line-height:26px;
                border-left:2px solid #d9dde1;
                font-size:12px;
                color:rgb(147,153,159);
                background:#f3f5f7;
            }
            .food-item{
                display:flex;
                margin:18px;
                padding-bottom:18px;
                @include border-1px(rgba(7,17,27,0.1));
                &:last-child{
                    @include border-none;
                    margin-bottom:0;
                }
                .icon{
                    flex:0 0 57px;
                    margin-right:10px;
                }
                .content{
                    flex:1;
                    .name{
                        margin:2px 0 8px  0;
                        height:14px;
                        line-height:14px;
                        font-size:14px;
                        color:rgb(7,17,27);
                    }
                    .desc,.extra{
                        line-height:10px;
                        font-size:10px;
                        color:rgb(147,153,159);
                    }
                    .desc{
                            line-height:12px;
                            margin-bottom:8px;
                        }
                    .extra{
                        .count{
                            margin-right:12px;
                        }
                    }
                    .price{
                        font-weight:700;
                        line-height:24px;
                        .now{
                            margin-right:8px;
                            font-size:14px;
                            color:rgb(240,20,20);
                        }
                        .old{
                            text-decoration:line-through;
                            font-size:10px;
                            color:rgb(147,153,159);
                        }
                    }
                    .cartcontrol-wrapper{
                        position:absolute;
                        right:0;
                        bottom:12px;
                    }
                }
            }
        }
    	
    }
</style>