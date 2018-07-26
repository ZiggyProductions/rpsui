import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        me:{id:0,name:'Eminem',avatar:'',wins_today:15,wins_total:515,cards:{enabled:false,choice:undefined}},
        opponent:{id:0,name:'waiting for opponent',active:false,avatar:''},
        game:{score:'3:8',winner:1,last:{opponent:'paper',me:'scissors'},message:'waiting for opponent'},
        game_state:'inplay',
        popup_help: false,
        message: {show:false}
    },
    mutations: {
        devcall(state,param){
          // убираем попапы чтобы не мешали
          state.popup_help = false;
          state.message.show = false;

          switch(param.action){
            case 'noconn':
              state.message = {show:true, heading:param.heading || 'Connection lost',body: param.body || 'Reconnecting..'}
              break;
            case 'help':
              state.popup_help = true;
              break;
            case 'table':
              state.game_state = 'inplay';
              break;
            case 'lobby':
              state.game_state = 'inlobby';
              break;
            case 'intro':
              state.game_state = 'intro';
              break;
          }
        },
        me(state,param){
            state.me.name = param.get('username');
            state.me.id = param.get('id');
            state.me.avatar = param.get('avatar');
        },
        op(state,param){
            state.opponent.name = param.name;
            state.opponent.id = param.id;
            state.opponent.avatar = param.avatar;
            state.opponent.active = param.active;
            if(param.active) {
                state.game.message = '';
                state.game.winner=0;
                state.game.last=undefined;
            }
        },
        opleft(state){
            state.opponent = {id:0,name:'waiting for opponent',active:false,avatar:''}
            state.game.winner=0;
            state.game.last=undefined;
            state.game.message='opponent has left the game, waiting for next opponent';
        },
        sit(state,param){
            state.game_state = 'inplay';
            state.opponent = {id:0,name:'waiting for opponent',active:false,avatar:''}
            state.game.winner=0;
            state.game.last=undefined;
            state.game.message = 'waiting for opponent';
        },
        leave(state){
            state.game_state = 'inlobby';
            state.opponent = {id:0,name:'waiting for opponent',active:false,avatar:''}
            state.game.winner=0;
            state.game.last=undefined;
            state.game.message = '';
        },
        popup(state,param){
            switch(param.kind) {
                case 'help':
                    state.popup_help = param.action;
                    break;
            }
        },
        choice(state,param){
            if(state.me.cards.enabled)
                state.me.cards.choice = param;
        },
        connection_status(state,param){
            console.log(param);
            if(param.show === true)
                state.message = {show:true, heading:param.heading || 'Connection lost',body: param.body || 'Reconnecting..'}
            else
                state.message = param;

        }

    }
})
