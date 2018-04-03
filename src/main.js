// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'

Vue.config.productionTip = false

window.bus = new Vue();
/* eslint-disable no-new */
window.rpsapp = new Vue({
  el: '#rpsapp',
  template: '<App/>',
  components: { App },
  store,
  created: function(){
    // console.log('TOKEN:',window.rps_token)
    var _this = this;
    // _this.init();
    bus.$on('sit',function(bet){
      _this.sit(bet);
    })
    bus.$on('leave',function(bet){
      _this.leave(bet);
    })
  },
  methods: {
    onConnectionLost: function(event)
    {
      trace("You have been disconnected; reason is: " + event.reason);
      this.$store.commit('connection_status',{show:true})
      setTimeout(this.init,2000);
    },
    onLogin:function(event)
    {
      if(null != event.data){
        trace("Login successful!" +
            "\n\tZone: " + event.zone +
            "\n\tUser: " + event.user +
            "\n\tData: " + JSON.stringify(event.data));

        this.$store.commit('connection_status',{show:false})
        this.$store.commit('me',event.data.get('custom'));
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
      var _this = this;
      setTimeout(function(){
        var config = {
          host: '127.0.0.1',
          port: 8080,
          zone: "rps",
          debug: true,
          onResponse: _this.onResponse,
          onConnectionLost: _this.onConnectionLost,
          onLogin: _this.onLogin,
          onSocketError: _this.onSocketError
        }


        _this.client = new ZiggyClient(config);
        _this.client.init();
        _this.client.token = window.rps_token;
        _this.client.connect();
        },2000);
    },
    sit:function(bet){
      this.client.sit(bet);
      this.$store.commit('sit',bet);
    },
    leave:function(bet){
      this.client.leave();
      this.$store.commit('leave');
    }

  }
})


