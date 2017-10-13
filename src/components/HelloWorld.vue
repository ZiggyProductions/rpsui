<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{ count }}</h2>
    <ul>
      <li v-for="l in list">{{ l }}</li>
    </ul>
    <ul>
      <li v-for="l in listx">{{ l }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      list: ['kuku','muku']
    }
  },
  computed: {
    count : function(){return this.$store.state.count},
    listx: function(){return this.$store.state.icons}
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
