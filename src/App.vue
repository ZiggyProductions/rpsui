<template>
  <div id="app">
    <img src="./assets/logo.png">

    {{ message }}
    {{ count }}
    <p>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
      <button @click="addIcon">add</button>
    </p>
    <hello-world/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  data: function(){
    return {
      message: '123'
    }
  },
  computed: {
      count : function(){return this.$store.state.count}
  },
  methods:{
    increment: function(){this.$store.commit('increment')},
    decrement: function(){this.$store.commit('decrement')},
    addIcon: function(){this.$store.commit('addIcon')}
  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
