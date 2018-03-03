<template>
    <transition name="move" >
        <div v-show="showFlag" class="food" ref="food">
            <div class="food-content">
                <div class="image-header">
                    <img :src="food.image">
                    <div class="back" @click="hide">
                        <i class="icon-arrow_lift"></i>
                    </div>
                </div>
                <div class="content">
                    <h1 class="title">
                        {{food.name}}
                    </h1>
                    <div class="details">
                        <span class="sell-count">月售{{food.sellCount}}份</span>
                        <span class="rating">好评率{{food.rating}}</span>
                    </div>
                    <div class="price">
                        <span class="now">
                            ￥{{food.price}}
                        </span>
                        <span class="old" v-show="food.oldPrice">
                            ￥{{food.oldPrice}}
                        </span>
                    </div>
                    <div class="cartcontrol-wrapper">
                      <cartcontrol :food="food" @cartAdd="add"></cartcontrol>
                    </div>
                    <transition name="fade">
                        <div class="buy " v-show="!food.count || food.count===0" @click.stop.prevent="addFirst">
                            加入购物车
                        </div>
                     </transition>
                </div>
                <split v-if="food.info"></split>
                <div class="info" v-if="food.info">
                    <h1 class="title">商品介绍</h1>
                    <p class="text">{{food.info}}</p>
                </div>
                <split></split>
                <div class="rating">
                    <h1 class="title">商品评价</h1>
                    <ratingSelect :selectType="selectType" @ratingtype="selectRating" @countToggle="countToggle" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings"></ratingSelect>
                    <div class="rating-wrapper">
                        <ul v-show="food.ratings && food.ratings.length">
                            <li v-for="rating in food.ratings" class="rating-item" v-show="needShow(rating.rateType,rating.text)">
                                <div class="user">
                                   <span class="name">
                                        {{rating.username}}
                                    </span>
                                    <img :src="rating.avatar" alt="" class="avatar" width="12" height="12">
                                </div>
                                <div class="time">{{rating.rateTime | formatDate}}</div>
                                <p class="text">
                                    <span :class="{'icon-thumb_up':rating.rateType==0,'icon-thumb_down':rating.rateType==1}">
                                        {{rating.text}}
                                    </span>
                                </p>
                            </li>
                        </ul>
                        <div class="no-rating" v-show="!food.ratings || !food.ratings.length">
                            暂无评价
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script type="ecmascript-6">
    import store from "../store.js";
    import {formatDate} from "../js/date.js";
    import {mapState} from 'vuex';
    import BScroll from "better-scroll";
    import Vue from "vue";
    import cartcontrol from './cartcontol.vue';
    import ratingSelect from './ratingSelect.vue';
    import split from './split.vue';
    export default{
        props:['food'],
        data(){
            return{
                showFlag:false,
                selectType:2,
                onlyContent:true,
                desc:['全部','推荐','吐槽']
            }
        },
        methods:{
            countToggle(msg){
                this.onlyContent=!msg;
            },
            selectRating(type){
                this.selectType=type;
                this.$nextTick(() => {
                  this.scroll.refresh();
                });
            },
            show(){
                this.showFlag=true;
                this.$nextTick(() => {
                  if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.food, {
                      click: true
                    });
                  } else {
                    this.scroll.refresh();
                  }
                })
            },
            hide(){
                this.showFlag=false;
            },
            needShow(type,text){
                if(this.onlyContent && !text){
                    return false;
                }
                if(this.selectType ==2){
                    return true;
                }else{
                    if(type==this.selectType){
                        return true;
                    }else{
                        return false;
                    }
                }
            },
            addFirst(event){
                if(!event._constructed){
                    return;
                }
                this.$emit('cartAdd',event.target);
                Vue.set(this.food,'count',1);
            },
            add(target) {
               this.$emit('cartAdd',target);
            }
        },
        filters:{
            formatDate(dateTimeStamp){
               return formatDate(dateTimeStamp);
            }
        },
        components:{
            cartcontrol,
            split,
            ratingSelect
        }
    }
</script>

<style rel="stylesheet" lang="scss">
@import "../css/base.scss";
    .food{
        position:fixed;
        left:0;
        top:0;
        bottom:48px;
        z-index:30;
        width:100%;
        background:#fff;
        transform:translate3d(0,0,0);
        transition:all 0.2s linear;
        &.move-enter,&.move-leave{
            transform:translate3d(100%,0,0);
        }
        .image-header{
            position:relative;
            width:100%;
            height:0;
            padding-top:100%;
            img{
                position:absolute;
                top:0;
                left:0;
                width:100%;
                height:100%;
            }
            .back{
                position:absolute;
                top:10px;
                left:0;
                .icon-arrow_lift{
                    display:block;
                    padding:10px;
                    font-size:20px;
                    color:#fff;
                }
            }
        }
        .content{
            padding:18px;
            position:relative;
            .title{
                line-height:14px;
                margin-bottom:8px;
                font-size:14px;
                font-weight:700;
                color:rgb(7,17,27);
            }
            .details{
                margin-bottom:18px;
                line-height:10px;
                font-size:0;
                height:10px;
                .sell-count,.rating{
                    font-size:10px;
                    color:rgb(147,153,159);
                }
                .sell-count{
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
                right:12px;
                bottom:12px;
            }
            .buy{
                position:absolute;
                right:18px;
                bottom:18px;
                z-index:10;
                height:24px;
                line-height:24px;
                padding:0 12px;
                box-sizing:border-box;
                font-size:10px;
                border-radius:12px;
                color:#fff;
                background:rgb(0,160,220);
                opacity:1;
                transition:all 0.2s;
                &.fade-enter,&.fade-leave{
                    opacity:0;
                }
            }
        }
        .info{
            padding:18px;
            .title{
                line-height:14px;
                margin-bottom:6px;
                font-size:14px;
                color:rgb(7,17,27);
            }
            .text{
                line-height:24px;
                padding:0 8px;
                font-size:12px;
                color:rgb(77,85,93);
            }
            
        }
        .rating{
            padding-top:18px;
            .title{
                line-height:14px;
                margin-left:18px;
                font-size:14px;
                color:rgb(7,17,27);
            }
            .rating-wrapper{
                padding:0 18px;
                .rating-item{
                    position:relative;
                    padding:16px 0;
                    @include border-1px(rgba(7,17,27,0.1));
                    .user{
                        position:absolute;
                        right:0;
                        top:16px;
                        font-size:0;
                        line-height:12px;
                        .name{
                              display: inline-block;
                              margin-right: 6px;
                              vertical-align: top;
                              font-size: 10px;
                              color: rgb(147, 153, 159);
                        }
                        .avatar{
                            border-radius:50%;
                        }
                        
                    }
                    .time{
                            line-height:12px;
                            font-size:10px;
                            color:rgb(147,153,159);

                        }
                        .text{
                            line-height:16px;
                            font-size:12px;
                            color:rgb(7,17,27);
                            .icon-thumb_down,.icon-thumb_up{
                                line-height:24px;
                                margin-right:4px;
                                font-size:12px;
                            }
                            .icon-thumb_up{
                                color:rgb(0,160,220);
                            }
                            .icon-thumb_down{
                                
                            }
                        } 
                }
                .no-rating{
                    padding:16px 0;
                    font-size:12px;
                    color:rgb(147,153,159);

                }
            }
        }

    }
</style>