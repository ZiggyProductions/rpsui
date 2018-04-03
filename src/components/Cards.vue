<template>
    <div class="rps-buttons" v-bind:class="{enabled: enabled}">
        <div class="rps-button rock" v-bind:class="{active: choice=='rock'}" @click="make_choice('rock')"></div>
        <div class="rps-button scissors" v-bind:class="{active: choice=='scissors'}" @click="make_choice('scissors')"></div>
        <div class="rps-button paper" v-bind:class="{active: choice=='paper'}" @click="make_choice('paper')"></div>
    </div>
</template>

<script>
    export default {
        name: 'Cards',
        computed: {
            enabled: function(){return this.$store.state.me.cards.enabled},
            choice: function(){return this.$store.state.me.cards.choice}
        },
        methods:{
            make_choice: function(param){this.$store.commit('choice',param)}
        }
    }
</script>

<style scoped>
    .rps-buttons{
        position: absolute;
        bottom:100px;
        width:100%;
    }

    .rps-buttons .rps-button{
        background-size: 60%;
        background-position: center;
        background-repeat: no-repeat;
        position: relative;
        display:inline-block;
        width:100px;
        height:100px;
        border: solid 2px #252525;
        background-color: #0b0d12;
        border-radius: 5px;
        cursor: no-drop;
    }

    .rps-buttons .rps-button.active, .rps-buttons.enabled .rps-button.active{
        margin-bottom:10px;
        background-color: rgba(155, 201, 48, 0.81);
        border: solid 2px #9bc930;
    }

    .rps-buttons.enabled .rps-button{
        background-size: 60%;
        background-position: center;
        background-repeat: no-repeat;
        position: relative;
        display:inline-block;
        width:100px;
        height:100px;
        border: solid 2px #20262d;
        background-color: #0b0d12;
        border-radius: 5px;
        cursor: pointer;
    }
    .rps-buttons.enabled .rps-button:hover{
        position: relative;
        display:inline-block;
        border: solid 2px #9bc930;
        transition: border 0.5s ease-in;
    }

    .rps-button.rock{background-image: url('../assets/r.svg');}
    .rps-button.scissors{background-image: url('../assets/s.svg');margin-left: 30px;margin-right: 30px;}
    .rps-button.paper{background-image: url('../assets/p.svg');}
    .rps-button.rock.active{background-image: url('../assets/r-a.svg');}
    .rps-button.scissors.active{background-image: url('../assets/s-a.svg');margin-left: 30px;margin-right: 30px;}
    .rps-button.paper.active{background-image: url('../assets/p-a.svg');}
</style>