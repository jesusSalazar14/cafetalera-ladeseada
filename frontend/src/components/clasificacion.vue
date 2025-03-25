<template>
  <div id="app">
    <Menu />
    <div class="main-content">
      <div class="title-container">
        <h1 class="Titulov2">CAFETELERA
          <br>
          LA DESEADA
        </h1>
        <h2 class="Titulov3">CLASIFICACIÓN</h2>
      </div>
      <button @click="mostrarFormulario = !mostrarFormulario" class="btn agregar"><img src="../assets/Simbolos/añadir.png">AGREGAR</button>
      <div class="formulario">
      <form v-if="mostrarFormulario" @submit.prevent="agregarClasificacion">
        <div class="form-group">
          <label for="lote_id">Lote ID</label>
          <input type="number" id="lote_id" v-model="lote_id" required>
        </div>
        <div class="form-group">
          <label for="fecha">FECHA</label>
          <input type="date" id="fecha" v-model="fecha" required>
        </div>
        <div class="form-group">
          <label for="calidad">CALIDAD</label>
          <select type="text" id="calidad" v-model="calidad" required>
            <option value="C">C</option> 
            <option value="B">B</option> 
            <option value="A">A</option>
            <option value="A+">A+</option> 
          </select>
        </div>
        <button type="submit" class="btn agregar"><img src="../assets/Simbolos/añadir.png">AÑADIR</button>
      </form>
    </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>LOTE ID</th>
            <th>FECHA</th>
            <th>CALIDAD</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) of data" :key="index">
            <td>{{ item.id }}</td>
            <td>{{ item.lote_id }}</td>
            <td>{{ item.fecha }}</td>
            <td>{{ item.calidad }}</td>
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
  name: 'clasificacion',
  components: {
    Menu
  },
  data() {
    return {
      nuevoClasificacion: {
        lote_id: '',
        fecha: '',
        calidad: ''
      },
      data: [],
      mostrarFormulario: false
    }
  },
  created() {
    this.getData()
  },
  methods: {
    agregarClasificacion() {
  const clasificacion = {
    lote_id: this.lote_id,
    fecha: this.fecha,
    calidad: this.calidad,
  };
  axios.post('http://localhost:3000/api/clasificacion', clasificacion)
    .then(res => {
      console.log('Clasificacion agregada:', res.data)
      clasificacion.id = res.data.id;
      this.data.push(clasificacion)
      this.nuevoClasificacion = {
        id: '',
        lote_id: '',
        fecha: '',
        calidad: ''
      }
      this.mostrarFormulario = false
    })
    .catch(err => {
      console.error('Error al agregar clasificacion:', err)
    })
},
    getData() {
      axios.get('http://localhost:3000/api/clasificacion')
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

.sidebar {
  background-color: #302814;
  width: 18.75rem;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  color: white;
  justify-content: center;
  align-items: center;
  background-blur: 10%;
}

.CuentaSimbolo {
  max-width: 50%;
  padding: 2%;

}

.sidebar h3 {
  margin: 20px 0;
}

.logo {
    display: flex; 
    justify-content: center; 
    align-items: center; 
    width: 100%; 
}

.logo img {
    width: 90%; 
    height: auto; 
}

.username {
  margin-bottom: 1.25rem;
  font-size: 1.3rem;
  font-weight: bold;
}

nav{
  width:100%;

}


nav ul {
  list-style: none;
}

nav ul li {
  padding: 5px 0px 5px 30px;
  color: #FFD569;
  margin: 10px 0;
  cursor: pointer;
  font-size: 15px;
  font-weight: bold;
}

nav ul li:hover{
  display: block;

  background: #FFD569;
  color: #814A13;
}

.logout {
  background-color: #e76e2e;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
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


table, .form-group {
  width: 100%;
  border-collapse: collapse;
}

.formulario{
  justify-items: center;
  font-family: 'Maven Pro', sans-serif;
  font-weight: bold;
  column-count: 3;
}

.formulario .form-group label, select, date{
  justify-content: center;
}



.formulario .form-group label{
  display: flex;
  padding: 1rem;
  font-size: 1rem;
  font-family: 'Maven Pro', sans-serif; 
  font-weight: bold;
}

.form-group input{
  margin-left: 5px;
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


</style>