<template>
    <div class="lobby-buttons">
        <div class="panel-s">
            <div class="coin-wrapper">
                <img style="width:100px;height:100px;" src="../assets/coin-100.svg" @click="sit('mini')"/>
            </div>
            <div class="descr-wrapper">
                <div class="descr-bet">Bet 100 tzs - Win 190 tzs</div>
                <div class="descr-rake">Rake: 10 tzs</div>
            </div>
            <div class="btn-wrapper">
                <button class="btn btn-play" @click="sit('mini')">NEXT</button>
            </div>
        </div>
        <div class="panel-s m30">
            <div class="coin-wrapper">
                <img style="width:100px;height:100px;" src="../assets/coin-300.svg" @click="sit('regular')"/>
            </div>
            <div class="descr-wrapper">
                <div class="descr-bet">Bet 300 tzs - Win 580 tzs</div>
                <div class="descr-rake">Rake: 20 tzs</div>
            </div>
            <div class="btn-wrapper">
                <button class="btn btn-play" @click="sit('regular')">NEXT</button>
            </div>
        </div>
        <div class="panel-s">
            <div class="coin-wrapper">
                <img style="width:100px;height:100px;" src="../assets/coin-500.svg" @click="sit('super')"/>
            </div>
            <div class="descr-wrapper">
                <div class="descr-bet">Bet 500 tzs - Win 950 tzs</div>
                <div class="descr-rake">Rake: 50 tzs</div>
            </div>
            <div class="btn-wrapper">
                <button class="btn btn-play" @click="sit('super')">NEXT</button>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: 'Lobby',
        methods:{
            sit: function(bet){
                bus.$emit('sit', bet)
            }
            //sit: function(bet){this.$store.commit('sit',bet)},
        }
    }
</script>

<style scoped>
    /*LOBBY*/
    .lobby-buttons{
        position: absolute;
        top:182px;
        width:100%;
        height:265px;
    }
    .panel-s{
        position: relative;
        display:inline-block;
        background-image: url('../assets/panel-s-min.png');
        background-repeat: no-repeat;
        width:180px;
        height:222px;
        border: solid 2px rgba(13,17,22,1);
        border-radius: 5px;
        margin-top: 10px;
        margin-bottom: 30px;
        opacity: 0.8;
    }
    .panel-s:hover{
        position: relative;
        display:inline-block;
        margin-top:0px;
        margin-bottom: 0px;
        background-image: url('../assets/panel-m-min.png');
        background-repeat: no-repeat;
        width:180px;
        height:262px;
        border: solid 2px rgba(66,79,91,.4);
        border-radius: 5px;
        transition: border 0.5s ease-in;
        opacity: 1;

    }

    .btn-wrapper{
        position: absolute;
        top:215px;
        width:100%;
        text-align: center;
    }
    .descr-wrapper{
        position: absolute;
        top:162px;
        width:100%;
        text-align: center;
    }
    .coin-wrapper{
        position: absolute;
        top:10px;
        width:100%;
        text-align: center;
    }
    .panel-s:hover .coin-wrapper {top:20px;}
    .panel-s:hover .coin-wrapper img {cursor:pointer}
    .panel-s:hover .descr-wrapper {top:172px;}
    .btn-play{
        color: #fff;
        background-color: #4a6885;
        border-color: #4a6885;

    }
    .btn-play:hover , .btn-play:focus{
        color: #fff;
        background-color: #405b78;
        border-color: #4a6885;
        outline: 0;
    }
    .descr-bet{
        color:#fff;
    }
    .descr-rake{
        color:#424f5b;
    }

    .panel-s:hover .btn-wrapper{
        visibility:visible;
        opacity:1;
        transition-delay: 1s;
        transition:visibility 1s linear,opacity 1s linear;
    }
    .panel-s .btn-wrapper{
        visibility:hidden;
        opacity:0;
        transition-delay: 0s;
    }
    .panel-s.m30 {margin-left:30px;margin-right: 30px}
</style>
