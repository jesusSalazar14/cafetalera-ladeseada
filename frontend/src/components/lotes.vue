<template>
  <div id="app">
    <Menu />
    <div class="main-content">
      <div class="title-container">
        <h1 class="Titulov2">CAFETELERA
          <br>
          LA DESEADA
        </h1>
        <h2 class="Titulov3">LOTE DE RECOLECCION</h2>
      </div>
      <button @click="mostrarFormulario = !mostrarFormulario" class="btn agregar"><img src="../assets/Simbolos/añadir.png">AGREGAR</button>
      <div class="formulario">
      <form v-if="mostrarFormulario" @submit.prevent="agregarLote">
        <div class="form-group">
          <label for="fecha_inicio">Fecha Inicio</label>
          <input type="date" id="fecha_inicio" v-model="fecha_inicio" required>
        </div>
        <div class="form-group">
          <label for="fecha_fin">Fecha Fin</label>
          <input type="date" id="fecha_fin" v-model="fecha_fin" required>
        </div>
        <div class="form-group">
          <label for="kilogramos_cereza">Kilos Cereza</label>
          <input type="number" id="kilogramos_cereza" v-model="kilogramos_cereza" required>
        </div>
        <div class="form-group">
          <label for="estado">Estado</label>
          <select type="text" id="estado" v-model="estado" required>
            <option value="Despulpado">Despulpado</option> 
            <option value="Secado">Secado</option> 
            <option value="Fermentanción">Fermentanción</option>
            <option value="Lavado">Lavado</option> 
            <option value="Exportado">Exportado</option>
          </select>
        </div>
        <button type="submit" class="btn agregar"><img src="../assets/Simbolos/añadir.png">AÑADIR</button>
      </form>
    </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>FECHA INICIO</th>
            <th>FECHA FIN</th>
            <th>KILOS CEREZA</th>
            <th>ESTADO</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) of data" :key="index">
            <td>{{ item.id }}</td>
            <td>{{ item.fecha_inicio }}</td>
            <td>{{ item.fecha_fin }}</td>
            <td>{{ item.kilogramos_cereza }}</td>
            <td>{{ item.estado }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Menu from '../components/menu.vue'

export default {
  name: 'lote',
  components: {
    Menu
  },
  data() {
    return {
      nuevoLote: {
        fecha_inicio: '',
        fecha_fin: '',
        kilogramos_cereza: '',
        estado: ''
      },
      data: [],
      mostrarFormulario: false
    }
  },
  created() {
    this.getData()
  },
  methods: {
    agregarLote() {
  const lote = {
    fecha_inicio: this.fecha_inicio,
    fecha_fin: this.fecha_fin,
    kilogramos_cereza: this.kilogramos_cereza,
    estado: this.estado
  };
  axios.post('http://localhost:3000/api/lote', lote)
    .then(res => {
      console.log('Lote agregado:', res.data)
      lote.id = res.data.id;
      this.data.push(lote)
      this.nuevoLote = {
        id: '',
        fecha_inicio: '',
        fecha_fin: '',
        kilogramos_cereza: '',
        estado: ''
      }
      this.mostrarFormulario = false
    })
    .catch(err => {
      console.error('Error al agregar lote:', err)
    })
},
    getData() {
      axios.get('http://localhost:3000/api/lote')
        .then(res => {
          this.data = res.data
          console.log(this.data)
        })
        .catch(err => {
          console.error('Error:', err)
        })
    }
  }
}
</script>


<style scoped>

* {

  margin: 0px;
  padding: 0px;
}


body { 
  margin: 0;
  height: 100%;
}

#app {
  display: flex;
  height: 100vh;
}


.main-content {
  background: #FFF5E2;
  flex-grow: 1;
  padding: 20px;
}

.title-container {
  display: flex;
  align-items: center; 
  justify-content: space-between; 
  margin-bottom: 3.125rem;
}

.Titulov2 {
  font-family: "Caudex", serif;
  color: #814A13; 
}

.Titulov3 {
  color: #000000; 
}

.button-group {
  display: flex;
  justify-content: flex-end; 
  margin-bottom: 0.625rem; 
}

.button-group img{
  margin-right: 3px;
}

.btn {
  display: flex; 
  align-items: center; 
  border-radius: 1.125rem; 
  font-size: 0.9375rem; 
  font-weight: bold;
  margin-right: 0.625rem; 
  padding: 0.5rem 1.875rem; 
  background-color: #302814;
  color: #FFFFFF;
  margin-bottom: 15px;
}

.btn img{
  margin-right: 5px; 
  width: 17px; 
  height: auto; 
}

#img1{

  margin-right: 10px; 
  width: 1.25rem; 
  height: auto; 

}

table{
  margin-top: 1rem;
}

table, .form-group {
  width: 100%;
  border-collapse: collapse;
}

.formulario{
  justify-items: center;
  font-family: 'Maven Pro', sans-serif;
  font-weight: bold;
  column-count: 4;
}

.formulario .form-group label{
  display: flex;
  padding: 1rem;
  font-size: 1rem;
  font-family: 'Maven Pro', sans-serif; 
  font-weight: bold;
}

.formulario .form-group input, select{
  display: flex;
  width: 100%;
}

.formulario .form-group label, input, select{
  justify-content: center;
  text-align: center;
}

.form-group input{
  font-size: 1.25rem;
}

.form-group select{
  background: #FFFFFA;
  color: #302814;
  font-size: 1.25rem;
}


thead, .form-group label{
  background: #302814;
  color: #FFF5E2;

}

tbody, .form-group {
  background: #FFFFFA;
  color: #302814;
  font-weight: bold;
}

th, td, .form-group{
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.formulario .btn{ 
  margin-top: 1rem;
}

</style>