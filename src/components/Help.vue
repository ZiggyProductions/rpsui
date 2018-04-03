<template>
    <div class="help-wrapper" align="center">
        <div class="help-popup">
            <h4>HOW TO PLAY</h4>
            <div class="help-content">
                <p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?</p>
                <p>On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.</p>
            </div>
            <div class="close-wrapper">
                <a @click="popup({kind:'help',action:false})">CLOSE</a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'Help',
        methods:{
            popup: function(param){this.$store.commit('popup',param)}
        }
    }
</script>


<style scoped>
    /*HELP*/
    .help-wrapper{
        position: absolute;
        top:0px;
        width:100%;
        height:650px;
        text-align: center;
        background-color: rgba(0,0,0,0.8);
    }
    .help-popup{
        background-image:url('../assets/bghome.png');
        width:630px;
        height:500px;
        padding:40px;
        margin: 60px 0 0 200px;
        color: #3c4853;
        -webkit-box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
        -moz-box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
        box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
        -webkit-background-clip: padding-box;
        -moz-background-clip: padding-box;
        background-clip: padding-box;
    }
    .help-popup h4{color:#fff;}
    .help-popup .help-content{width:100%;height:360px;overflow:scroll;}
    .help-popup .help-content p{text-align: left;color: #3c4853;}
    .help-popup .close-wrapper {margin-top:20px}
    .help-popup .close-wrapper a {color: #3d556e;text-decoration: none}
    .help-popup .close-wrapper a:hover {color: #8eb82c;text-decoration: none}
</style>