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
                    <button class="btn btn-primary" v-on:click="runForm()">Agregar</button>
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
                    <template v-for="column in columns">
                      <th>{{ column.label }}</th>
                    </template>
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
                          <button class="btn btn-danger ml-1" v-on:click="deleteProduct(row.id)"><b-icon icon="trash"></b-icon></button>
                          <button class="btn btn-success ml-1" v-on:click="addBodegas(row.id)"><b-icon icon="archive"></b-icon></button>
                        </div>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <modal v-if="productModal" @close="productModal = false">
            <h4 slot="header">{{ productModalHeader }}</h4>
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
            <div slot="btnName" v-on:click="cerrarModal">Cerrar</div>
            <button slot="btnForm" class="btn btn-primary" v-on:click="sendForm()">Guardar</button>
        </modal>
        <modal v-if="bodegasModal" @close="bodegasModal = false">
            <h4 slot="header">Bodegas Asignadas</h4>
            <div class="row" slot="body">
                <div class="panel w-100">
                    <div class="panel-heading pt-2 pb-2 pl-2 pr-2">
                    </div>
                    <div class="panel-body">
                      <div class="row">
                        <div class="col-md-6">
                          <b-form-group>
                            <b-form-select v-model="bodegas" :options="aBodegas"></b-form-select>
                          </b-form-group>
                        </div>
                        <div class="col-md-6 text-left">
                          <button class="btn btn-primary" v-on:click="assignBodega()"><b-icon icon="plus"></b-icon></button>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12">
                          <table class="table">
                            <thead>
                              <tr>
                                <th>Nombre Bodeha</th>
                                <th>Stock</th>
                              </tr>
                            </thead>
                            <tbody>
                              <template v-for="bodega in bodegasStock">
                                <tr>
                                  <td>{{ bodega.nombre }}</td>
                                  <td>{{ bodega.stock }}</td>
                                </tr>
                              </template>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
            <div class="row" slot="footer"></div>
            <div slot="btnName" v-on:click="cerrarModal">Cerrar</div>
            <div slot="btnForm"></div>
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
        tipoForm: 1,
        productModal: false,
        bodegasModal: false,
        productModalHeader: "Agregar Producto",
        codigoProducto: "",
        nombreProducto: "",
        descripcionProducto: "",
        medicionProducto: "",
        precioProducto: 0,
        idProducto: 0,
        aMediciones: [
          {
            value: "",
            text: "Seleccione una Medición"
          }
        ],
        buscar: "",
        columns: [
            {label: 'Código', field: 'codigo'},
            {label: 'Nombre', field: 'nombre', headerClass: 'class-in-header second-class'},
            {label: 'Descripción', field: 'descripcion'},
            {label: 'Medicion', field: 'medicion'},
            {label: 'Precio', field: 'precio'},
            {label: 'Acciones', representedAs: ({id}) => "<div class='text-center'><button class='btn btn-success editProduct' onclick='editProduct'>"+this.editIcon+"</button><button class='btn btn-danger ml-1'>"+this.deleteIcon+"</button></div>", interpolate: true}
        ],
        rows: [],
        bodegasStock: [],
        bodegas: "",
        aBodegas: [],
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
      ...mapActions(['addProducto', 'getMedicionesProductos', 'getProductos','getProducto','updateProducto','deleteProducto','getBodegas','asignarBodega','getStockFromProducto']),
      editProduct: function(iIdProducto){
        let vue = this

        this.getProducto(iIdProducto)
        .then(response => {
          const aProducto = response.data.data
          if(aProducto.length > 0){

            vue.idProducto = iIdProducto

            vue.codigoProducto = aProducto[0].productos_codigo
            vue.nombreProducto = aProducto[0].productos_nombre
            vue.descripcionProducto = aProducto[0].productos_descripcion
            vue.medicionProducto = aProducto[0].productos_medicion
            vue.precioProducto = aProducto[0].productos_precio

            vue.productModal = true
            vue.tipoForm = 2
            vue.productModalHeader = "Modificar Producto"
          }
        })
      },
      deleteProduct: function(iIdProducto){
        this.$swal({ icon: 'warning', text: "¿Está seguro de eliminar el producto?", showCancelButton: true, confirmButtonText: "SI", cancelButtonText: "NO" })
        .then(result => {
          if(result.value){
            this.deleteProducto(iIdProducto)
            .then(response => {
              const result = response.data.result
              if(result){
                this.$swal({ icon: 'success', text: "Producto Eliminado correctamente" })
              }else{
                this.$swal({ icon: 'danger', text: "Hubo un error al eliminar el producto" })
                console.log(response)
              }
            })
          }
        })
      },
      addBodegas: function(iIdProducto){
        this.idProducto = iIdProducto
        this.renderBodegas()
        this.bodegasModal = true;
      },
      renderBodegas: function(){
        this.aBodegas = []
        const iIdProducto = this.idProducto
        this.getBodegas(iIdProducto)
        .then(response => {
          const aData = response.data.data;
          for(let i=0; i<aData.length; i++){

            const aBodega = aData[i];
            const sValue = aBodega.id;
            const sText = aBodega.bodegas_nombre;

            let aBodegaTmp = {
              value: sValue,
              text: sText
            }
            this.aBodegas.push(aBodegaTmp);
          }

          this.renderBodegasStock();
          this.renderBodegasStock(iIdProducto);
        })
      },
      renderBodegasStock: function(iIdProducto){
        this.bodegasStock = []
        this.getStockFromProducto(iIdProducto)
        .then(response => {
          const aData = response.data.data;
          for(let i=0; i<aData.length; i++){

            const aBodega = aData[i];
            const iIdBodega = aBodega.id;
            const sNombre = aBodega.bodegas_nombre;
            const iStock = Number(aBodega.stock);

            let aBodegaTmp = {
              nombre: sNombre,
              stock: iStock
            }
            this.bodegasStock.push(aBodegaTmp);
          }
        })
      },
      assignBodega: function(){
        const bodega = this.bodegas
        const idProducto = this.idProducto
        
        if(bodega == ""){
          this.$swal({ icon: 'error', title: 'Ops...', text: "Debe seleccionar una bodega" })
          return false;
        }

        const aData = {
          iIdProducto: idProducto,
          iIdBodega: bodega
        }
        this.asignarBodega(aData)
        .then(response => {
          console.log(response)
          const result = response.data.result
          if(result){
            this.renderBodegas();
          }
        })

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
      runForm: function(){
          this.productModal = true
      },
      cerrarModal: function(){
        this.idProducto = 0
        this.productModal = false
        this.bodegasModal = false
        this.tipoForm = 1
        this.productModalHeader = "Agregar Producto"
        this.codigoProducto = "";
        this.nombreProducto = "";
        this.descripcionProducto = "";
        this.medicionProducto = "";
        this.precioProducto = 0;
        this.renderProducts()
      },
      sendForm: function(){
        switch(this.tipoForm){
          case 1:
            this.guardarProducto();
            break;
          case 2:
            this.modificarProducto()
            break;
        }
      },
      modificarProducto: function(){
        const aData = {
          iIdUpdate: this.idProducto,
          sNombreProducto: this.nombreProducto,
          sDescripcionProducto: this.descripcionProducto,
          iMedicionProducto: this.medicionProducto,
          dPrecioProducto: this.precioProducto,
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

        this.updateProducto(aData)
        .then(response =>{
          console.log(response)
          response = response.data;
          if(response.result){
            this.$swal({ icon: 'success', title: 'Enhorabuena...', text: 'Producto agregado actualizado correctamente!' })
            .then(response => {
              this.cerrarModal()
            })
          }else{
            this.$swal({ icon: 'error', title: 'Ops...', text: JSON.stringify(response.error) })
          }
        })

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
              this.cerrarModal()
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
