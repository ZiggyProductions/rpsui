<template>
    <div id="table">
        <div>
            <PlayersNest />

            <Score/>

            <Winner/>

            <Field/>

            <Cards/>
        </div>
    </div>
</template>

<script>
    import Field from './Field'
    import Cards from './Cards'
    import PlayersNest from './PlayersNest'
    import Score from './Score'
    import Winner from './Winner'

    export default {name: 'GameTable',
        components: {
            PlayersNest, Score, Winner, Field, Cards
        }
    }
</script>

<style scoped>
    #table{
        width: 1030px;
        height: 654px;
        position: absolute;
    }
</style>