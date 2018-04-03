<template>
  <div align="center">
    <div id="rps-inner-app">
      <Lobby v-if="inlobby"/>
      <GameTable v-if="inplay" />
      <FooterLinks v-if="inlobby || intro"/>
      <Help v-if="popup_help"/>
      <Message v-if="message"/>
    </div>
  </div>
</template>

<script>
import Lobby from './components/Lobby'
import GameTable from './components/GameTable'
import FooterLinks from './components/FooterLinks'
import Help from './components/Help'
import Message from './components/Message'

export default {
  name: 'rps-inner-app',
  components: {
    Lobby, GameTable, FooterLinks, Help, Message
  },
  computed: {
      count : function(){return this.$store.state.count},
      inplay : function(){return this.$store.state.game_state == 'inplay'},
      inlobby : function(){return this.$store.state.game_state == 'inlobby'},
      intro : function(){return this.$store.state.game_state == 'intro'},
      inhelp : function(){return this.$store.state.game_state == 'inhelp'},
      message : function(){return this.$store.state.message.show},
      popup_help : function(){return this.$store.state.popup_help}
  },

}
</script>

<style>
  body {padding-top: 20px;}
  #rps-inner-app{
    margin-top:60px;
    background-image: url('assets/bg-min.png');
    background-repeat: no-repeat;
    width: 1030px;
    height: 654px;
    border: solid 2px rgba(74,104,133,.2);
    border-radius: 5px;
    position: relative;
  }
  a {cursor:pointer;}
</style>
