<template>
    <b-container>
        <div class="row">
          <h3>Productos</h3>
        </div>
        <div class="row">
          <div class="row">
            <button class="btn btn-primary">Agregar</button>
          </div>
          <datatable class="table" :columns="columns" :data="rows"></datatable>
        </div>
    </b-container>
</template>

<script>

  export default {
    name: 'productos',
    data(){
      return{
        columns: [
            {label: 'Nombre', field: 'nombre', headerClass: 'class-in-header second-class'},
            {label: 'Descripción', field: 'descripcion'},
            {label: 'Unidad', field: 'medicion'},
            {label: 'Precio', field: 'precio'},
            //{label: 'Address', representedAs: ({address, city, state}) => `${address}<br />${city}, ${state}`, interpolate: true}
        ],
        rows: [
            {
              nombre: 'Paracetamol',
              descripcion: 'Medicamento para tráta demalestar general y dolores de cabeza',
              medicion: 'gr',
              precio: 100
            },
            {
              nombre: 'Paracetamol',
              descripcion: 'Medicamento para tráta demalestar general y dolores de cabeza',
              medicion: 'gr',
              precio: 100
            }
        ]
      }
    },
    components: {
      
    }
  }
</script>
