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
  .swal2-container.swal2-center.swal2-backdrop-show{
    z-index: 9999999;
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
    methods: {

    },
    mounted(){

    },
    components: {
      Header,
      Footer
    }
  }
</script>
