import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
        state: {
            count: 0,
            icons:['zizi','bizi']
        },
        mutations: {
            increment (state, param) {
                state.count += param || 1
            },
            decrement (state) {
                state.count--
            },
            addIcon(state){
                state.icons.push('icon'+new Date())
            }
        }
    })