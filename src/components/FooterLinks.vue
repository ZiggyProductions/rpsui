<template>

    <div class="footer-menu-links">
        <ul>
            <li><a @click="popup({kind:'help',action:true})">HOW TO PLAY</a></li>
        </ul>
    </div>

</template>

<script>
    export default {name: 'FooterLinks',
        methods:{
            popup: function(param){this.$store.commit('popup',param)}
        }
    }
</script>

<style scoped>
    /*FOOTER*/
    .footer-menu-links{position: absolute;top:600px;text-align: center;width: 100%;}
    .footer-menu-links ul {-webkit-padding-start:0;}
    .footer-menu-links ul li {list-style-type: none;display: inline-block;vertical-align: middle;margin:0 10px;}
    .footer-menu-links ul li a{color: #3d556e;text-decoration: none}
    .footer-menu-links ul li:hover a{color: #8eb82c;text-decoration: none}
</style>