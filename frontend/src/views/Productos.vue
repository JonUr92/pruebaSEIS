<template>
    <b-container>
        <div class="row">
          <div class="col-md-12">
            <div class="row">
              <h3>Productos</h3>
            </div>
            <div class="row">
              <div class="col-md-12 mb-2">
                <div class="row">
                  <div class="col-md-6">
                    <button class="btn btn-primary" v-on:click="addProduct()">Agregar</button>
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-10 p-0">
                        <b-form-group class="text-right" label-cols="4" label-cols-lg="2" label="Buscar" label-for="input-default">
                          <b-form-input v-model="buscar" @keyup.enter.native="renderProducts"></b-form-input>
                        </b-form-group>
                      </div>
                      <div class="col-md-2 text-left p-0">
                        <button class="btn btn-primary" v-on:click="renderProducts"><b-icon icon="search"></b-icon></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <datatable class="table" :columns="columns" :data="rows"></datatable> -->
              <table class="table">
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Medicion</th>
                    <th>Precio</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="row in rows">
                    <tr v-on:click="">
                      <td>{{ row.codigo }}</td>
                      <td>{{ row.nombre }}</td>
                      <td>{{ row.descripcion }}</td>
                      <td>{{ row.medicion }}</td>
                      <td>{{ row.precio }}</td>
                      <td>
                        <div class="text-center">
                          <button class="btn btn-primary" v-on:click="editProduct(row.id)"><b-icon icon="pencil"></b-icon></button>
                          <button class="btn btn-danger ml-1"><b-icon icon="trash"></b-icon></button>
                        </div>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <modal v-if="addProductModal" @close="addProductModal = false">
            <h4 slot="header">Agregar Producto</h4>
            <div class="row" slot="body">
                <div class="panel w-100">
                    <div class="panel-heading pt-2 pb-2 pl-2 pr-2">
                    </div>
                    <div class="panel-body">
                        <b-form-group label="Código del Producto:" label-for="codigoProducto">
                          <b-form-input id="codigoProducto" v-model="codigoProducto" type="text" required placeholder="Ingrese Código del Producto"></b-form-input>
                        </b-form-group>
                        <b-form-group label="Nombre del Producto:" label-for="nombreProducto">
                          <b-form-input id="nombreProducto" v-model="nombreProducto" type="text" required placeholder="Ingrese Nombre del Producto"></b-form-input>
                        </b-form-group>
                        <b-form-group label="Descripcion del Producto:" label-for="descripcionProducto">
                          <b-form-input id="descripcionProducto" v-model="descripcionProducto" type="text" required placeholder="Ingrese Descripcion del Producto"></b-form-input>
                        </b-form-group>
                        <b-form-group label="Medicion del Producto:" label-for="medicionProducto">
                          <b-form-select v-model="medicionProducto" :options="aMediciones"></b-form-select>
                        </b-form-group>
                        <b-form-group label="Precio del Producto:" label-for="precioProducto">
                          <b-form-input id="precioProducto" v-model="precioProducto" type="number" required placeholder="Ingrese Precio del Producto"></b-form-input>
                        </b-form-group>
                    </div>
                </div>
            </div>
            <div class="row" slot="footer"></div>
            <div slot="btnName">Cerrar</div>
            <button slot="btnForm" class="btn btn-primary" v-on:click="guardarProducto()">Guardar</button>
        </modal>
    </b-container>
</template>

<script>
  import Modal from '@/components/Modal'
  import { mapActions, mapMutations } from 'vuex'

  export default {
    name: 'productos',
    data(){
      return{
        addProductModal: false,
        codigoProducto: "",
        nombreProducto: "",
        descripcionProducto: "",
        medicionProducto: "",
        precioProducto: 0,
        editIcon: '<svg width="1em" height="1em" viewBox="0 0 20 20" focusable="false" role="img" alt="icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi-pencil b-icon bi"><g><path fill-rule="evenodd" d="M13.293 3.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM14 4l2 2-9 9-3 1 1-3 9-9z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M14.146 8.354l-2.5-2.5.708-.708 2.5 2.5-.708.708zM5 12v.5a.5.5 0 00.5.5H6v.5a.5.5 0 00.5.5H7v.5a.5.5 0 00.5.5H8v-1.5a.5.5 0 00-.5-.5H7v-.5a.5.5 0 00-.5-.5H5z" clip-rule="evenodd"></path></g></svg>',
        deleteIcon: '<svg width="1em" height="1em" viewBox="0 0 20 20" focusable="false" role="img" alt="icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi-trash b-icon bi"><g><path d="M7.5 7.5A.5.5 0 018 8v6a.5.5 0 01-1 0V8a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V8a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V8z"></path><path fill-rule="evenodd" d="M16.5 5a1 1 0 01-1 1H15v9a2 2 0 01-2 2H7a2 2 0 01-2-2V6h-.5a1 1 0 01-1-1V4a1 1 0 011-1H8a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM6.118 6L6 6.059V15a1 1 0 001 1h6a1 1 0 001-1V6.059L13.882 6H6.118zM4.5 5V4h11v1h-11z" clip-rule="evenodd"></path></g></svg>',
        aMediciones: [
          {
            value: "",
            text: "Seleccione una Medición"
          }
        ],
        buscar: "000001",
        columns: [
            {label: 'Código', field: 'codigo'},
            {label: 'Nombre', field: 'nombre', headerClass: 'class-in-header second-class'},
            {label: 'Descripción', field: 'descripcion'},
            {label: 'Medicion', field: 'medicion'},
            {label: 'Precio', field: 'precio'},
            {label: 'Acciones', representedAs: ({id}) => "<div class='text-center'><button class='btn btn-success editProduct' onclick='editProduct'>"+this.editIcon+"</button><button class='btn btn-danger ml-1'>"+this.deleteIcon+"</button></div>", interpolate: true}
        ],
        rows: []
      }
    },
    mounted(){

      this.getMedicionesProductos()
      .then(response => {
        const aData = response.data.data;
        for(let i=0; i<aData.length; i++){

          const aMedicion = aData[i];
          const sValue = aMedicion.id;
          const sText = aMedicion.productos_mediciones_nombre;

          let aMedicionTmp = {
            value: sValue,
            text: sText
          }
          this.aMediciones.push(aMedicionTmp);
        }
      })
      this.renderProducts();
    },
    methods: {
      ...mapMutations([]),
      ...mapActions(['addProducto', 'getMedicionesProductos', 'getProductos']),
      editProduct: function(){
        alert("kejdfnjsnf")
      },
      renderProducts: function(){
        this.rows = []
        this.getProductos(this.buscar)
        .then(response => {
          const aData = response.data.data;
          for(let i=0; i<aData.length; i++){

            const aProducto = aData[i];
            const sCodigoProducto = aProducto.productos_codigo;
            const sNombreProducto = aProducto.productos_nombre;
            const sDescripcionProducto = aProducto.productos_descripcion;
            const iMedicionProducto = aProducto.productos_medicion;
            const dPrecioProducto = aProducto.productos_precio;
            const iIdProducto = aProducto.id;

            let aRow = {
              codigo: sCodigoProducto,
              nombre: sNombreProducto,
              descripcion: sDescripcionProducto,
              medicion: iMedicionProducto,
              precio: dPrecioProducto,
              id: iIdProducto
            }

            this.rows.push(aRow);

          }
        })
      },
      addProduct: function(){
          this.addProductModal = true
      },
      guardarProducto: function(e){

        const aData = {
          sCodigoProducto: this.codigoProducto,
          sNombreProducto: this.nombreProducto,
          sDescripcionProducto: this.descripcionProducto,
          iMedicionProducto: this.medicionProducto,
          dPrecioProducto: this.precioProducto,
        }
        
        if(this.codigoProducto == ""){
          this.$swal({ icon: 'error', title: 'Ops...', text: "Debe ingresar un Código de Producto" })
          return false;
        }
        if(this.nombreProducto == ""){
          this.$swal({ icon: 'error', title: 'Ops...', text: "Debe ingresar un Nombre de Producto" })
          return false;
        }
        if(this.medicionProducto == ""){
          this.$swal({ icon: 'error', title: 'Ops...', text: "Debe ingresar una Medición del Producto" })
          return false;
        }
        if(this.precioProducto == 0){
          this.$swal({ icon: 'error', title: 'Ops...', text: "Debe ingresar el Precio del Producto" })
          return false;
        }else{
          console.log(Number(this.precioProducto))
          if(isNaN(Number(this.precioProducto))){
            this.$swal({ icon: 'error', title: 'Ops...', text: "Debe ingresar monto Valido" })
            return false;
          }
        }

        this.addProducto(aData)
        .then(response =>{
          response = response.data;
          if(response.result){
            this.$swal({ icon: 'success', title: 'Enhorabuena...', text: 'Producto agregado correctamente!' })
            .then(response => {
              this.codigoProducto = "";
              this.nombreProducto = "";
              this.descripcionProducto = "";
              this.medicionProducto = "";
              this.precioProducto = 0;
              this.addProductModal = false;
            })
          }else{
            this.$swal({ icon: 'error', title: 'Ops...', text: JSON.stringify(response.error) })
          }
        })
      }
    },
    filters: {
      dPrecioProducto: function(value){
        console.log(value)
      }
    },
    components: {
      Modal
    }
  }
</script>
