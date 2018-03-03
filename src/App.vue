<template>
  <div id="app">
    <v-header >
    </v-header>
    <div class="tab border-1px">
      <div class="tab-item"><router-link to="/goods">商品</router-link></div>
      <div class="tab-item"><router-link to="/ratings">评论</router-link></div>
      <div class="tab-item"><router-link to="/seller">商家</router-link></div>
    </div>
    <router-view :foodCont="foodCont"></router-view>
  </div>
</template>
<script>
import store from './store.js';
import header from './components/header.vue';
export default{
  data(){
    return{
      foodCont:''
    }
  },
  name:'app',
  components:{
    'v-header':header
  },
  mounted(){
      this.$store.dispatch("newJson");
      this.$http.get('../data.json', {}).then(response=> {
        this.foodCont=response.body;
        });
  }
}
</script>

<style lang="scss">
@import "./css/reset.css";
@import "./css/base.scss";
  #app{
    .tab{
      display:flex;
      width: 100%;
      height:40px;
      line-height: 40px;
      @include border-1px(rgba(7,17,27,0.1));
      .tab-item{
        flex:1;
        text-align: center;
        >a{
          display: block;
          font-size: 14px;
          color:rgb(77,85,93);
        }
        .active{
            color:rgb(240,20,20);
          }
      }
    }
  }
</style>
