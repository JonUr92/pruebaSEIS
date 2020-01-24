<template>
  <div id="structure">
    <Header></Header>
    <div id="app"></div>
    <Footer></Footer>
  </div>
</template>
<style>
  body{
    background-color: #e4e8e8;
  }
    body .container{
      min-height: 83vh;
    }
      body .container h3{
        padding: 20px 0px;
        margin: 0px;
      }
</style>
<script>
  // @ is an alias to /src
  import Header from '@/components/header/Header.vue'
  import Footer from '@/components/footer/Footer.vue'

  export default {
    name: 'home',
    data(){
      return{
        vue: this
      }
    },
    beforeCreate(){
      console.log(this.$session.exists())
      if (!this.$session.exists()) {
        this.$router.push('/productos')
      } 
    },
    methods: {
      /* verificarSession: () =>{
        console.log(this.$session.exists())
        if (!this.$session.exists()) {
          this.$router.push('/productos')
        } 
      } */
    },
    computed:{
      verificarSession: () =>{
        console.log(this.$session.exists())
        if (!this.$session.exists()) {
          this.$router.push('/productos')
        } 
      }
    },
    components: {
      Header,
      Footer
    }
  }
</script>
