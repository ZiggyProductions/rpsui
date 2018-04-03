<template>
    <div class="players-nest">
        <div class="players-wrapper">
            <div class="player-top">
                <div class="player-face" v-bind:class="{ waiting: !player_top.active }"></div>
                <div class="player-name">{{ player_top.name }}</div>
            </div>
            <div class="player-bottom">
                <div class="player-name">{{ player_bottom.name }}</div>
                <div class="player-face"></div>
            </div>
            <div class="btn-wrapper">
                <button class="btn btn-leave" @click="leave">EXIT</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'PlayersNest',
        /*data () {
            return {
                msg: 'Welcome to Your Vue.js App',
                list: ['kuku','muku']
            }
        },*/
        computed: {
            player_top : function(){return this.$store.state.opponent},
            player_bottom: function(){return this.$store.state.me}
        },
        methods:{
            leave: function(){
                bus.$emit('leave')
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .players-nest{
        position: absolute;
        top:0px;
        width:180px;
        height:650px;
        text-align: left;
        background-image: url('../assets/vs-min.png');
        background-repeat: no-repeat;
        background-position-x: 75px;
        background-position-y: 180px;
    }
    .players-wrapper{
        width:100%;
        height:650px;
        text-align: center;
    }
    .player-top{
        position:absolute;
        top:50px;
        height:100px;
        width:100%;
    }
    .player-bottom{
        position:absolute;
        bottom:50px;
        height:100px;
        width:100%;
    }
    .player-face {
        width:80px;height:80px;border:solid 2px #fff;
        -webkit-border-radius:50%;
        -moz-border-radius:50%;
        border-radius:50%;
        background-color: #223145;
        display: inline-block;
    }
    .player-name{
        color:#fff;
        text-align: center;
        width:100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    /*AVATAR LOADER*/
    .player-face.waiting {
        border:none;
        background: none;
        position: relative;
        display: inline-block;
        margin: 0 auto;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
    }
    .player-face.waiting:before, .player-face.waiting:after {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        border-radius: 50%;
        color: rgba(74, 104, 133, 0.25);
        background-color: currentColor;
        -webkit-animation: scaleCircles 2s infinite cubic-bezier(0.55, 0.15, 0.45, 0.85) alternate;
        animation: scaleCircles 2s infinite cubic-bezier(0.55, 0.15, 0.45, 0.85) alternate;
    }
    .player-face.waiting:after {
        -webkit-animation-delay: -1s;
        animation-delay: -1s;
    }
    @-webkit-keyframes scaleCircles {
        0% {
            z-index: 1;
            -webkit-transform: scale3d(0, 0, 0);
            transform: scale3d(0, 0, 0);
        }
        100% {
            z-index: 2;
            -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
        }
    }
    @keyframes scaleCircles {
        0% {
            z-index: 1;
            -webkit-transform: scale3d(0, 0, 0);
            transform: scale3d(0, 0, 0);
        }
        100% {
            z-index: 2;
            -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
        }
    }

    .btn-wrapper{
        position: absolute;
        bottom:10px;
        width:100%;
        text-align: center;
    }
    .btn-leave{
        color: #fff;
        background-color: #4a6885;
        border-color: #4a6885;

    }
    .btn-leave:hover , .btn-leave:focus{
        color: #fff;
        background-color: #405b78;
        border-color: #4a6885;
        outline: 0;
    }
</style>
