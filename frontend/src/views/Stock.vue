<template>
    <b-container>
        <b-row>
            <div class="col-md-12">
                <div class="row">
                    <h3>Movimiento de Artículo</h3>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <b-form-group label="Tipo de Movimiento:" label-for="medicionProducto">
                          <b-form-select v-model="tipoMovimiento" :options="aMovimientos" @change="changeCantidad"></b-form-select>
                        </b-form-group>
                    </div>
                    <div class="col-md-4">
                        <label class="d-block">Producto:</label>
                        <autocomplete
                            anchor="name"
                            label="codigo"
                            url=""
                            id="buscar"
                            :classes="{ input: 'form-control' }"
                            @keyup.native="buscarProductos"
                            :options="productos"
                            :on-select="getProducto"
                            :filterByAnchor="false"
                        >
                        </autocomplete>
                    </div>
                </div>
                <div class="row" v-if="productSelected">
                    <div class="col-md-4">
                        <label class="d-block">Bodega:</label>
                        <autocomplete
                            anchor="nombre"
                            label="nombre"
                            url=""
                            id="buscarBodega"
                            :classes="{ input: 'form-control' }"
                            @keyup.native="renderBodegasStock"
                            :options="bodegasStock"
                            :on-select="getBodega"
                            :filterByAnchor="false"
                        >
                        </autocomplete>
                    </div>
                </div>
                <hr>
                <div v-if="bodegaSelected">
                    <div class="row">
                        <div class="col-md-4">
                            <label class="d-block">Disponible: {{ bodega.stock }}</label>
                        </div>
                        <div class="col-md-4">
                            <label class="d-block">Resultante: {{ stockResultante }}</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <b-form-group label="Cantidad:">
                                <b-form-input v-model="cantidad" type="number" required placeholder="Ingrese Cantidad:" @change="changeCantidad"></b-form-input>
                            </b-form-group>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <button class="btn btn-primary" @click="guardarMovimiento">Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        </b-row>
    </b-container>
</template>
<script>
    import Modal from '@/components/Modal'
    import Autocomplete from 'vue2-autocomplete-js'
    
    import { mapActions, mapMutations } from 'vuex'
    export default {
        name: 'stock',
        data(){
            return {
                stockResultante: 0,
                cantidad: 0,
                buscar: "",
                buscarBodega: "",
                producto: [],
                productos: [],
                productSelected: false,
                tipoMovimiento: "",
                aMovimientos: [
                    {
                        value: "",
                        text: "Seleccione un movimiento"
                    },
                    {
                        value: 1,
                        text: "Ingresar Stock"
                    },
                    {
                        value: 2,
                        text: "Eliminar Stock"
                    }
                ],
                bodegasStock: [],
                bodega: [],
                bodegaSelected: false,
            }
        },
        mounted(){
            
        },
        methods: {
            ...mapMutations([]),
            ...mapActions(['getProductos','getStockFromProducto','addMovimiento']),
            changeCantidad: function(){
                const cantidad = Number(this.cantidad)
                const tipoMovimiento = this.tipoMovimiento;
                switch(tipoMovimiento){
                    case 1:
                        this.stockResultante = this.bodega.stock + cantidad
                        break;
                    case 2:
                        this.stockResultante = this.bodega.stock - cantidad
                        break;
                    default:
                        this.$swal({ icon: 'warning', text: "Debe seleccionar un tipo de movimiento" })
                        break;
                }
            },
            guardarMovimiento: function(){
                if(this.stockResultante < 0){
                    this.$swal({ icon: 'danger', text: "El Stock resultante no puede ser menor a 0" })
                    return false
                }

                const iCantidad = this.tipoMovimiento == 1 ? iCantidad : "-"+this.cantidad
                const aData = {
                    iIdProducto: this.producto.id,
                    iIdBodega: this.bodega.id,
                    iTipoMovimiento: this.tipoMovimiento,
                    iCantidad: iCantidad
                }
                console.log(aData);
                this.addMovimiento(aData)
                .then(response => {
                    console.log(response)
                    const result = response.data.result
                    if(result){
                        this.cantidad = 0
                        this.bodegas = []
                        this.bodega = []
                        document.getElementById("buscarBodega").value = ""
                        this.$swal({ icon: 'success', text: "EL movimiento ha sido agregado correctamente" })
                    }
                });
            },
            getProducto: function(obj){
                this.producto = obj
                this.productSelected = true
            },
            getBodega: function(obj){
                this.bodega = obj
                this.bodegaSelected = true
                this.changeCantidad()
            },
            buscarProductos: function(){
                this.productos = []
                this.productSelected = false
                this.producto = []
                this.buscar = document.getElementById("buscar").value
                if(this.buscar.length >= 3){
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
                                name: sNombreProducto,
                                descripcion: sDescripcionProducto,
                                id: iIdProducto
                            }

                            this.productos.push(aRow);

                        }
                    })
                }
            },
            renderBodegasStock: function(){
        
                this.bodegasStock = []

                const iIdProducto = this.producto.id;
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
                        stock: iStock,
                        id: iIdBodega
                        }
                        this.bodegasStock.push(aBodegaTmp);
                    }
                })
            }
        },
        components: {
            Modal,
            Autocomplete 
            //AutocompleteVue
        }
    }
</script>