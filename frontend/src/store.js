import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menus: [
        {
            id: 1,
            textHeader: "Home",
            url: "/"
        },
        {
            id: 2,
            textHeader: "Productos",
            url: "/productos"
        },
        {
            id: 3,
            textHeader: "Acerca De",
            url: "/about"
        }
    ],
    isLogged: false
  },
  mutations: {
    
  },
  actions: {
    getMedicionesProductos: function(state){
      let response = axios.get('http://'+window.location.hostname+':3000/api/products/getMediciones');
      return response;
    },
    addProducto: function(state,aData){
      let response = axios.post('http://'+window.location.hostname+':3000/api/products/addProduct',aData);
      return response;
    },
    getProductos: function(state, sValue){
      const aData = {
        sValue: sValue
      }
      let response = axios.post('http://'+window.location.hostname+':3000/api/products/getProducts',aData);
      return response;
    },
  }
})
