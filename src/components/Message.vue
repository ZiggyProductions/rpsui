<template>
    <div class="message-wrapper">
        <div class="message-content">
            <div>{{ heading }}</div>
            <div>{{ body }}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'Message',
        computed: {
            heading : function(){return this.$store.state.message.heading},
            body : function(){return this.$store.state.message.body}
        }
    }
</script>

<style scoped>
    .message-wrapper{
        position: absolute;
        top:0px;
        width:100%;
        height:650px;
        text-align: center;
        background-color: rgba(0,0,0,0.8);
    }
    .message-content{
        background-image:url('../assets/bghome.png');
        width:330px;
        height:140px;
        padding:40px;
        margin:200px 0 0 350px;
        color:#fff;
        font-size:2rem;
        border: solid 2px rgb(35, 41, 48);
        border-radius: 5px;
        -webkit-box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
        -moz-box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
        box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
        -webkit-background-clip: padding-box;
        -moz-background-clip: padding-box;
        background-clip: padding-box;
    }
</style>