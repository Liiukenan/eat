<template>
    <div class="header" v-if="seller">
    	<div class="content-wrapper">
    		<div class="avatar">
    			<img :src="seller.avatar" alt="" width="64" height="64">
    		</div>
    		<div class="content">
    			<div class="title">
    				<span class="brand">
    				</span>
    				<span class="name">
    					{{seller.name}}
    				</span>
    			</div>
    			<div class="description">
    				{{seller.description}}/{{seller.deliveryTime}}分钟送达
    			</div>
    			<div v-if="seller.supports" class="support">
    				<span class="icon" :class="classMap[seller.supports[0].type]">
    				
    				</span>
    				<span class="text">
    					{{seller.supports[0].description}}
    				</span>
    			</div>
    		</div>
            <div class="support-count" v-if="seller.supports" @click="showDetail">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
    	</div>
        <div class="bulletin-wrapper" @click="showDetail">
            <span class="bulletin-title">
                
            </span>
            <span class="bulletin-text">
                {{seller.bulletin}}
            </span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="background">
            <img :src="seller.avatar" alt="" width="100%" height="100%">
        </div>
        <transition name="fade">
            <div class="detail" v-if="detailShow">
            <div class="detail-wrapper clearfix">
                <div class="detail-main">
                    <h1 class="name">
                        {{seller.name}}
                    </h1>
                    <div class="star-wrapper">
                        <star :size="48" :score="seller.score"></star>
                    </div>    
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">优惠信息</div>
                        <div class="line"></div>
                    </div>
                    <ul class="supports" v-if="seller.supports">
                        <li class="support-item" v-for="(item,index) in seller.supports">
                            <span class="icon" :class="classMap[seller.supports[index].type]">
                            </span>
                            <span class="text">
                                {{seller.supports[index].description}}
                            </span>
                        </li>
                    </ul>
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">商家公告</div>
                        <div class="line"></div>
                    </div>
                    <div class="bulletin">
                        <p class="content">{{seller.bulletin}}</p>
                    </div>
                    
                </div>
            </div>
             <div class="detail-close" @click="hideDetail">
                <i class="icon-close"></i>
            </div>
        </div>
        </transition>
    </div>
</template>
<script type="ecmascript-6">
import store from "../store.js";
import star from "./star.vue";
import {mapState} from 'vuex';
    export default{
	  name:'v-header',
	  data(){
	  	return{
            detailShow:false
	  	}
	  },
      methods:{
        showDetail(){
            this.detailShow=true;
        },
        hideDetail(){
            this.detailShow=false;
        }
      },
      computed:mapState({
        seller:state=>state.newslist.seller,
        classMap:state=>state.classMap
      }),
      components:{
        star
      }
	}
</script>

<style lang="scss" scoped>
@import "../css/base.scss";
.header{
        position:relative;
    	color:#fff;
    	background:rgba(7,17,27,0.5);
        overflow:hidden;
    	.content-wrapper{
    		padding:24px 12px 18px 24px;
            position:relative;
    		font-size:0;
    		.avatar,.content{
    			display:inline-block;
    		}
    		.avatar{
				display:inline-block;
				vertical-align:top;
				img{
					border-radius:2px;
				}
    		}
    		.content{
    			display:inline-block;
    			margin-left:16px;
    			.title{
    				margin:2px 0 8px 0;
    				.brand{
    					width:30px;
    					height:18px;
    					display:inline-block;
    					@include bg-images(header,brand);
    					background-size:30px 18px;
    					background-repeat:no-repeat;
    					vertical-align:top;
    				}
    				.name{
    					margin-left:6px;
    					font-size:16px;
    					line-height:18px;
    					font-weight:bold;
    				}
    			}
    			.description{
    				margin-bottom:10px;
    				line-height:12px;
    				font-size:12px;
    			}
    			.support{
    				.icon{
    					display:inline-block;
                        vertical-align:top;
    					width:12px;
    					height:12px;
    					margin-right:4px;
    					background-size:12px 12px;
    					background-repeat:no-repeat;
    					&.decrease{
    						@include bg-images(header,decrease_1);
    					}
    					&.discount{
    						@include bg-images(header,discount_1);
    					}
    					&.guarantee{
    						@include bg-images(header,guarantee_1);
    					}
    					&.invoice{
    						@include bg-images(header,invoice_1);
    					}
    					&.special{
    						@include bg-images(header,special_1);
    					}
    				}
    				.text{
    					font-size:12px;
    					line-height:12px;
    				}
    			}
    		}
            .support-count{
                position:absolute;
                right:12px;
                bottom:14px;
                padding:0 8px;
                height:24px;
                line-height:24px;
                border-radius:14px;
                background:rgba(0,0,0,0.2);
                text-align:center;
                .count{
                    font-size:10px;
                    vertical-align:top;
                }
                .icon-keyboard_arrow_right{
                    line-height:24px;
                    margin-left:2px;
                    font-size:10px;
                }
            }
    	}
        .bulletin-wrapper{
            height:28px;
            line-height:28px;
            padding:0 22px 0 12px;
            white-space:nowrap;
            overflow:hidden;
            text-overflow:ellipsis;
            background:rgba(7,17,27,0.2);
            position:relative;
            .bulletin-title{
                display:inline-block;
                width:22px;
                height:12px;
                vertical-align:top;
                margin-top:8px;
                @include bg-images(header,bulletin);
                background-size:22px 12px;
                background-repeat:no-repeat;
            }
            .bulletin-text{
                margin:0 4px;
                font-size:10px;
                vertical-align:top;
            }
            .icon-keyboard_arrow_right{
                position:absolute;
                font-size:10px;
                right:12px;
                top:8px;
            }
        }
        .background{
            position:absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            filter:blur(10px);
        }
        .detail{
            position:fixed;
            z-index:100;
            width: 100%;
            height: 100%;
            overflow: auto;
            left:0;
            top:0;
            background:rgba(7,17,27,0.8);
            backdrop-filter: blur(10px);
            &.fade-enter-active, &.fade-leave-active{
                transition:opacity 0.5s;
            }
            &.fade-enter,&.fade-leave-to{
                opacity:0;
            }
            .detail-wrapper{
                width: 100%;
                min-height:100%;
                .detail-main{
                    margin-top:64px;
                    padding-bottom:64px;
                    .name{
                        line-height:16px;
                        text-align:center;
                        font-size:16px;
                        font-weight:700;
                    }
                    .star-wrapper{
                        margin-top:18px;
                        padding:2px 0;
                        text-align: center;
                    }
                    .title{
                        width:80%;
                        margin:28px auto 24px auto;
                        display:flex;
                        .line{
                            flex:1;
                            position:relative;
                            top: -6px;
                            border-bottom:1px solid rgba(255,255,255,0.2);
                        }
                        .text{
                            padding:0 12px;
                            font-size:14px;
                            font-weight:700;
                        }
                    }
                    .supports{
                            width: 80%;
                            margin:0 auto;
                            .support-item{
                                padding:0 12px;
                                margin-bottom:12px;
                                font-size:0;
                                &:last-child{
                                    margin-ottom:0;
                                }
                                .icon{
                                    display:inline-block;
                                    width: 16px;
                                    height: 16px;
                                    vertical-align:top;
                                    margin-right:6px;
                                    background-size:16px 16px;
                                    background-repeat:no-repeat;
                                    &.decrease{
                                        @include bg-images(header,decrease_2);
                                    }
                                    &.discount{
                                        @include bg-images(header,discount_2);
                                    }
                                    &.guarantee{
                                        @include bg-images(header,guarantee_2);
                                    }
                                    &.invoice{
                                        @include bg-images(header,invoice_2);
                                    }
                                    &.special{
                                        @include bg-images(header,special_2);
                                    }
                                }
                                .text{
                                    line-height:12px;
                                    font-size:12px;
                                }
                            }
                        }
                    .bulletin{
                        width:80%;
                        margin:0 auto;
                        .content{
                            padding:0 12px;
                            line-height:24px;
                            font-size:12px;
                        }
                    }
                }
            }
            .detail-close{
                    position:relative;
                    width:32px;
                    height:32px;
                    margin:-64px auto 0 auto;
                    font-size:32px;
                    clear:both;
                }
        }
    }
</style>