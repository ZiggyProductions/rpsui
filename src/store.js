import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const figuremap = {
    0: 'rock',
    1: 'scissors',
    2: 'paper'
}
export default new Vuex.Store({
    state: {
        me:{id:0,name:'Eminem',avatar:'',wins_today:15,wins_total:515,cards:{enabled:false,choice:undefined}},
        opponent:{id:0,name:'waiting for opponent',active:false,avatar:''},
        game:{score:'0:0',winner:'nobody',last:{opponent:'',me:''},message:'waiting for opponent'},
        game_state:'intro',
        popup_help: false,
        message: {show:true,heading:'CONNECTING',body:'please wait'}
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
            state.me = param;
        },
        prepare(state,first_round){
          state.me.cards.choice = undefined;
        },
        op(state,param){
            state.opponent.name = param.name;
            state.opponent.id = param.id;
            state.opponent.avatar = param.avatar;
            state.opponent.active = param.active;
            if(param.active) {
                state.game.message = '';
                state.game.winner='nobody';
                state.game.last=undefined;
                state.me.cards.enabled = true;
            }
        },
        opleft(state){
            state.opponent = {id:0,name:'waiting for opponent',active:false,avatar:''}
            state.game.winner='nobody';
            state.game.last=undefined;
            state.game.message='opponent has left the game, waiting for next opponent';
            state.me.cards.enabled = false;
            state.me.cards.choice = undefined;
        },
        sit(state,param){
            state.game_state = 'inplay';
            state.opponent = {id:0,name:'waiting for opponent',active:false,avatar:''}
            state.game.winner='nobody';
            state.game.last=undefined;
            state.game.message = 'waiting for opponent';
            state.me.cards.enabled = false;
            state.me.cards.choice = undefined;
        },
        leave(state){
            state.game_state = 'inlobby';
            state.opponent = {id:0,name:'waiting for opponent',active:false,avatar:''}
            state.game.winner='nobody';
            state.game.last=undefined;
            state.game.message = '';
            state.me.cards.enabled = false;
        },
        popup(state,param){
            switch(param.kind) {
                case 'help':
                    state.popup_help = param.action;
                    break;
            }
        },
        choice(state,param){
            if(state.me.cards.enabled) {
              state.me.cards.choice = param;
              state.me.cards.enabled = false;
            }
        },
        result(state,param){
          state.me.cards.enabled = false;
          state.game.winner = param.winnerID;
          state.game.last = {
            me: figuremap[param[state.me.id]],
            opponent: figuremap[param[state.opponent.id]]
          }

          // preparing for next battle
          setTimeout(()=>{
            state.game.last = undefined;
            state.me.cards.choice = undefined;
            state.game.winner = 'nobody';
            state.me.cards.enabled = true;
          },2000)
        },
        toggle_cards(state,param){
            state.me.cards.enabled = param;
        },
        connection_status(state,param){
            console.log(param);
            if(param.show === true)
                state.message = {show:true, heading:param.heading || 'CONNECTION LOST',body: param.body || 'Reconnecting..'}
            else
                state.message = param;

        },
        connecting(state,param){
            if(param.show === true)
                state.message = {show:true, heading:param.heading || 'CONNECTING',body: param.body || 'please wait'}
            else
                state.message = param;

        }

    }
})
