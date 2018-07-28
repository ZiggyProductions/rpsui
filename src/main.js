// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import _ from 'underscore';
//import ds from 'deepstream.io-client-js'
import VueResource from 'vue-resource';
//import Client from '@gamefast/ching-sdk';
import Client from '../static/lib/ching-sdk/src/index';

Vue.use(VueResource);
Vue.config.productionTip = false

window.bus = new Vue();
/* eslint-disable no-new */
window.rpsapp = new Vue({
  el: '#rpsapp',
  template: '<App/>',
  components: { App },
  store,
  created: function(){
    //console.log('TOKEN:',window.rps_token)
    var _this = this;
    _this.figures = {rock:0,scissors:1,paper:2};
    _this.testplayers = function(id){
      var tp = {
        1: {
          id: 1,
          name: 'Eminem',
          avatar: '',
          wins_today: 15,
          wins_total: 515,
          cards: {enabled: false, choice: undefined}
        },
        2: {
          id: 2,
          name: '2pac',
          avatar: '',
          wins_today: 25,
          wins_total: 535,
          cards: {enabled: false, choice: undefined}
        },
        3: {
          id: 3,
          name: 'Snoop Dogg',
          avatar: '',
          wins_today: 5,
          wins_total: 45,
          cards: {enabled: false, choice: undefined}
        },
        4: {
          id: 4,
          name: 'Dr. Dre',
          avatar: '',
          wins_today: 75,
          wins_total: 495,
          cards: {enabled: false, choice: undefined}
        },
      }

      if(tp.hasOwnProperty(id)){
        return tp[id];
      }else{
        return {
          id: id,
          name: 'Anonymous',
          avatar: '',
          wins_today: 0,
          wins_total: 0,
          cards: {enabled: false, choice: undefined}}
      }
    }
    this.init();
    bus.$on('play',function(figure){
      _this.play(figure);
    })
    bus.$on('sit',function(kind){
      _this.sit(kind);
    })
    bus.$on('leave',function(){
      _this.leave();
    })
  },
  methods: {
    onConnecting: function()
    {
      trace("Connecting");
      this.$store.commit('connecting',{show:true})
    },
    onConnect: function()
    {
      trace("Connected");
      this.$store.commit('connecting',{show:false});
    },
    onDisconnect: function()
    {
      trace("You have been disconnected;");
      this.$store.commit('connection_status',{show:true})
    },
    onLogin:function(player_id)
    {
      if(null != player_id){
        trace("Login successful!");
        this.$store.commit('connecting',{show:false});
        //this.$store.commit('connection_status',{show:false})

        // Временное решение для теста, в дальнейшем надо все получать из Центра Управления Полетами
        this.$store.commit('me',_.clone(this.testplayers(player_id)));
        this.$store.commit('leave'); // to lobby
      }else{
        this.$store.commit('connection_status',{show:true,heading:'Session expired',body:'please login'})
      }
    },
    onSocketError:function(event)
    {
      this.$store.commit('connection_status',{show:true,heading:'Network error',body:"Reload the page, please"})
    },
    onResponse: function(event)
    {
      trace('onResponse',event);
      switch(event.cmd){
        case 'lobby':
          this.$store.commit('leave');
          break;
        case 'begin':
          console.log('Ring..')
          break;
        case 'g.init':
          var sfsplayers = event.params.get('pl');
          var players = [];
            try {
              players.push(JSON.parse(sfsplayers.get(0)));
              players.push(JSON.parse(sfsplayers.get(1)));
              if(players[0].id == this.$store.state.me.id)
                this.$store.commit('op',players[1]);
              else
                this.$store.commit('op',players[0]);
            }catch(e){
              console.error(e);
            }
          console.log(players);
          break;
        case 'g.opleft':
          this.$store.commit('opleft');
          break;

      }

    },
    init:function (binding) {
      trace('init')
      var _this = this;
      this.$http.options.crossOrigin = true;

      // todo: In better life we have to get client config from some orchestrator
      //this.$http.post('http://localhost:9008/api/get-cell-endpoint').then(function (response) {
      //  console.log(response.data);
      //  if(response.data && response.data.error == false) {
          setTimeout(function () {
            // todo: Create config for Play.io client and provide some handlers
            // var config = {
            //   host: response.data.data.ip,
            //   port: response.data.data.port,
            //   zone: "rps",
            //   debug: true,
            //   onResponse: _this.onResponse,
            //   onConnectionLost: _this.onConnectionLost,
            //   onLogin: _this.onLogin,
            //   onSocketError: _this.onSocketError
            // }


            // todo: Create Play.io client and start connecting
            //_this.client = new ZiggyClient(config,ds);
            //_this.client.init();
            //_this.client.token = window.rps_token;
            //_this.client.connect();

            _this.client = new Client({
              host: '212.47.245.185',
              port: 5555,
              secure: false
            });

            _this.client.onPlayerSubscribe(data => {
              console.log('======SUBSCRIBE========')
              console.log(data,_this.client);
              console.log('=======================');
              _this.client.ready(true);
            });

            _this.client.onGameStart((data) => {
              console.log("===========Game Start============");
              console.log(data)
              _this.$store.commit('prepare');
            });

            _this.client.onGameFinish(data => {
              console.log("===========Game Finish============");
              console.log(data)
              _this.$store.commit('result',data);
            });

            _this.client.onPlayerLeave(player => {
              console.log('===========ROOM PLAYER LEAVE========');
              console.log(player);
            });

            _this.client.onPlayerReady(player => {
              console.log('===========ROOM PLAYER READY========');
              console.log(player);
              if(player.playerId != _this.$store.state.me.id) {
                var oponent = _.clone(_this.testplayers(player.playerId));
                oponent.active = true;
                _this.$store.commit('op', oponent);
              }
            });

            _this.client.onPlayerJoinRoom(({ status }) => {
              console.log('============PLAYER JOIN ROOM==========');
              console.log(status);
              // todo: ask to provide room kind
              _this.$store.commit('sit',/*kind*/ 'fast');
            });

            _this.client.onMatchFinish(() => {
              console.log('============ROOM MATCH FINISH==========');
              _this.$store.commit('leave'); // to lobby
            });

            _this.client.onConnect(() => _this.onConnect());
            _this.client.onDisconnect(() => _this.onDisconnect());


            _this.$store.commit('connecting',{show:true});
            async function login() {
              await _this.client.login({ playerId: _this.getParameterByName('uid') || window.rps_uid , token: _this.getParameterByName('token') || window.rps_token });
              _this.onLogin(_this.getParameterByName('uid') || window.rps_uid);
            }
            login();



          }, 2000);
      //   }
      // }).catch(function(err){
      //   console.log(err);
      // });


    },

    play:function(figure){
      try{
        this.$store.commit('choice',figure)
        trace(figure,this.figures[figure])
        this.client.play({figure:this.figures[figure]});
      }catch(err){console.log(err)}
    },
    sit:function(kind){
      try{this.client.joinRoom(kind);}catch(err){console.log(err)}
    },
    leave:function(){
      try{this.client.leaveRoom();}catch(err){console.log(err)}
      this.$store.commit('leave');
    },
    getParameterByName:function (name, url) {
      try {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
          results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
      } catch (err) {
        return '';
      }
    }

  }
})


