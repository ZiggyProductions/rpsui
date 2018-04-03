<template>
    <div class="middle-buttons">
        <div class="message" v-if="message">{{ message }}</div>
        <div v-if="!both_played && !message" id="countdown">
            <svg id="countdown-circles">
                <circle r="32" cx="35" cy="35"></circle>
            </svg>
            <div id="countdown-number"></div>
        </div>
        <div v-if="both_played" class="middle-button top" v-bind:class="[last_played_opponent, { winner: winner == 2 }]"></div>
        <div v-if="both_played" class="middle-button bottom" v-bind:class="[last_played_me, { winner: winner == 1 }]"></div>
    </div>
</template>

<script>
    export default {
        name: 'Field',
        computed: {
            message : function(){return this.$store.state.game.message},
            winner : function(){return this.$store.state.game.winner},
            both_played : function(){return this.$store.state.game.last},
            last_played_opponent : function(){return this.$store.state.game.last.opponent},
            last_played_me : function(){return this.$store.state.game.last.me}
        },
    }
</script>

<style scoped>
    .middle-buttons{
        position: absolute;
        bottom:300px;
        width:100%;
    }
    .middle-button{
        background-size: 60%;
        background-position: center;
        background-repeat: no-repeat;
        position: relative;
        display:block;
        width:80px;
        height:80px;
        border: solid 2px #20262d;
        background-color: #0b0d12;
        border-radius: 5px;
    }
    .middle-buttons .message{
        color: #fff;
        text-align: center;
        width: 290px;
        padding: 20px;
        border: solid 2px #20262e;
        border-radius: 5px;
        font-size: 1.5rem;
        background-color: rgba(0, 0, 0, 0.5);
    }
    .middle-button.winner{
        background-color: rgba(155, 201, 48, 0.81);
        border: solid 2px #9bc930;
        width:110px;
        height:110px;
    }
    .middle-button.top{margin-bottom:5px;}
    .middle-button.bottom{}
    .middle-button.rock{background-image: url('../assets/r.svg');}
    .middle-button.scissors{background-image: url('../assets/s.svg');}
    .middle-button.paper{background-image: url('../assets/p.svg');}
    .middle-button.rock.winner{background-image: url('../assets/r-a.svg');}
    .middle-button.scissors.winner{background-image: url('../assets/s-a.svg');}
    .middle-button.paper.winner{background-image: url('../assets/p-a.svg');}


    /*COUNTDOWN*/
    #countdown {
        position: relative;
        margin: auto;
        height: 70px;
        width: 70px;
        text-align: center;
    }

    #countdown-number {
        color: white;
        display: inline-block;
        line-height: 70px;
        font-weight: 400;
        font-size: 16px;
        width: 70px;
        height: 70px;
        background-color: #0d1016;
        border-radius: 50%;
    }

    #countdown-circles {
        z-index: 1;
        position: absolute;
        top: 0;
        right: 0;
        width: 70px;
        height: 70px;
        transform: rotateY(-180deg) rotateZ(-90deg);
    }

    #countdown-circles circle {
        stroke-dasharray: 201px;
        stroke-dashoffset: 0px;
        stroke-linecap: round;
        stroke-width: 2px;
        stroke: #094f34;
        fill: none;
        animation: countdown 10s linear infinite forwards;
    }

    @keyframes countdown {
        from {
            stroke-dashoffset: 0px;
        }
        to {
            stroke-dashoffset: 201px;
        }
    }

</style>
