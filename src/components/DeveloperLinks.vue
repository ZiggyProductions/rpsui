<template>

    <div class="developer-links">
        <ul>
            <li><a @click="devCall({action:'intro'})">INTRO</a></li>
            <li><a @click="devCall({action:'lobby'})">LOBBY</a></li>
            <li><a @click="devCall({action:'table'})">TABLE</a></li>
            <li><a @click="devCall({action:'help'})">HELP</a></li>
            <li><a @click="devCall({action:'noconn'})">NOCONN</a></li>
        </ul>
    </div>

</template>

<script>
    export default {name: 'DeveloperLinks',
        methods:{
          devCall: function(param){this.$store.commit('devcall',param)}
        }
    }
</script>

<style scoped>
    /*DEVLINKS*/
    .developer-links{position: absolute;top:10px;right:10px;text-align: right;width: 100px;z-index: 2000}
    .developer-links ul {-webkit-padding-start:0;}
    .developer-links ul li {list-style-type: none;display: inline-block;vertical-align: middle;margin:0 10px;}
    .developer-links ul li a{color: #3d556e;text-decoration: none}
    .developer-links ul li:hover a{color: #8eb82c;text-decoration: none}
</style>
