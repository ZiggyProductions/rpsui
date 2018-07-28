<template>
    <div v-if="winner_top" class="winner-top-wrapper">
        <div class="winner">WINNER</div>
    </div>

    <div v-else-if="winner_bottom" class="winner-bottom-wrapper">
        <div class="winner">WINNER</div>
    </div>
</template>

<script>
    export default {
        name: 'Winner',
        computed: {
            winner : function(){return this.$store.state.game.winner},
            winner_top : function(){return this.$store.state.game.winner == this.$store.state.opponent.id},
            winner_bottom : function(){return this.$store.state.game.winner == this.$store.state.me.id},
        },
    }
</script>

<style scoped>
    .winner-bottom-wrapper{
        position:absolute;
        bottom:40px;
        text-align: center;
        width: 100%;
    }
    .winner-top-wrapper{
        position:absolute;
        top:40px;
        text-align: center;
        width: 100%;
    }
    .winner {font-size:24px;color:#fff;font-weight: 600;width:360px;display: inline-block}
</style>
