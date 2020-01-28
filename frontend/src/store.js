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
          textHeader: "Movimientos",
          url: "/stock"
        },
        {
          id: 4,
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
    getProducto: function(state, sValue){
      const aData = {
        sValue: sValue
      }
      let response = axios.post('http://'+window.location.hostname+':3000/api/products/getProduct',aData);
      return response;
    },
    updateProducto: function(state,aData){
      let response = axios.post('http://'+window.location.hostname+':3000/api/products/updateProduct',aData);
      return response;
    },
    deleteProducto: function(state,iIdProducto){
      const aData = {
        sValue: iIdProducto
      }
      let response = axios.post('http://'+window.location.hostname+':3000/api/products/deleteProduct',aData);
      return response;
    },
    getBodegas: function(state,iIdProducto){
      const aData = {
        iIdProducto: iIdProducto
      }
      let response = axios.post('http://'+window.location.hostname+':3000/api/bodegas/getBodegas',aData);
      return response;
    },
    asignarBodega: function(state,aData){
      let response = axios.post('http://'+window.location.hostname+':3000/api/bodegas/asignarBodega',aData);
      return response;
    },
    getStockFromProducto: function(state,iIdProducto){
      const aData = {
        iIdProducto: iIdProducto
      }
      let response = axios.post('http://'+window.location.hostname+':3000/api/products/getStockFromProducto',aData);
      return response;
    },
    addMovimiento: function(state,aData){
      let response = axios.post('http://'+window.location.hostname+':3000/api/bodegas/addMovimiento',aData);
      return response;
    }
  }
})
