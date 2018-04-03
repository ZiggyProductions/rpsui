<template>
<div class="score-wrapper">
    <div class="score current-score"><div class="head">Current Score</div><div class="wbody">{{ score }}</div></div>
    <div class="score today-score"><div class="head">Today Wins</div><div class="body">{{ wins_today }}</div></div>
    <div class="score total-score"><div class="head">Total Wins</div><div class="body">{{ wins_total }}</div></div>
</div>
</template>

<script>
    export default {
        name: 'Score',
        computed: {
            score : function(){return this.$store.state.game.score},
            wins_today: function(){return this.$store.state.me.wins_today},
            wins_total: function(){return this.$store.state.me.wins_total}
        },
    }
</script>

<style scoped>
    /*SCORE*/
    .score-wrapper{
        position:absolute;
        width:185px;
        right:0;
        top:0;
        text-align: center;
    }
    .current-score{
        margin-top:75px;
        width: 150px;
    }
    .today-score{margin-top:50px;width: 150px;}
    .total-score{margin-top:40px;width: 150px;}

    .score .head {color:#fff;border-bottom: solid 2px #20262d;padding-bottom: 10px;}
    .score .body {color:#445f7a;font-size: 18px;padding-top: 10px;}
    .score .wbody {color:#fff;font-size: 26px;font-weight: 600;padding-top: 10px;}
</style>
