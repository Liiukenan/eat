import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
// 这里定义初始值
export default new Vuex.Store({
    state:{
        newslist:[],
        classMap:['decrease','discount','special','invoice','guarantee']
    },
    actions:{
    	newJson(obj){
    		obj.commit('getJson');
    	}
    },
    mutations:{
    	getJson(){
    		Vue.http.get('./data.json',{
              },{
                headers:{},
                emulateJSON:true
              }).then(response=>{
                this.state.newslist=response.data;
              },response=>{
                  
              })
    	}
    }
})

