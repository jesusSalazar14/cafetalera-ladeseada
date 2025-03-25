<template>
  <div id="app">
    <Menu />
    <div class="main-content">
      <div class="title-container">
        <h1 class="Titulov2">CAFETELERA
          <br>
          LA DESEADA
        </h1>
        <h2 class="Titulov3">EXPORTACION</h2>
      </div>
      <button @click="mostrarFormulario = !mostrarFormulario" class="btn agregar"><img src="../assets/Simbolos/añadir.png">AGREGAR</button>
      <div class="formulario">
      <form v-if="mostrarFormulario" @submit.prevent="agregarExportacion">
        <div class="form-group">
          <label for="lote_id">Lote ID</label>
          <input type="number" id="lote_id" v-model="lote_id" required>
        </div>
        <div class="form-group">
          <label for="fecha">FECHA</label>
          <input type="date" id="fecha" v-model="fecha" required>
        </div>
        <div class="form-group">
          <label for="cantidad">Cantidad</label>
          <input type="number" id="cantidad" v-model="cantidad" required>
        </div>
        <div class="form-group">
          <label for="destinatario">Destinatario</label>
          <input type="text" id="destinatario" v-model="destinatario" required>
        </div>
        <div class="form-group">
          <label for="precio">Precio</label>
          <input type="number" id="precio" v-model="precio" required>
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
            <th>CANTIDAD</th>
            <th>DESTINATARIO</th>
            <th>PRECIO</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) of data" :key="index">
            <td>{{ item.id }}</td>
            <td>{{ item.lote_id }}</td>
            <td>{{ item.fecha }}</td>
            <td>{{ item.destinatario }}</td>
            <td>{{ item.precio }}</td>
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
  name: 'exportacion',
  components: {
    Menu
  },
  data() {
    return {
      nuevoExportacion: {
        lote_id: '',
        fecha: '',
        cantidad: '',
        destinatario: '',
        precio: ''
      },
      data: [],
      mostrarFormulario: false
    }
  },
  created() {
    this.getData()
  },
  methods: {
    agregarExportacion() {
  const exportacion = {
    lote_id: this.lote_id,
    fecha: this.fecha,
    cantidad: this.cantidad,
    destinatario: this.destinatario,
    precio: this.precio
  };
  axios.post('http://localhost:3000/api/exportacion', exportacion)
    .then(res => {
      console.log('Exportacion agregada:', res.data)
      exportacion.id = res.data.id;
      this.data.push(exportacion)
      this.nuevoExportacion = {
        id: '',
        lote_id: '',
        fecha: '',
        cantidad: '',
        destinatario: '',
        precio: ''
      }
      this.mostrarFormulario = false
    })
    .catch(err => {
      console.error('Error al agregar exportacion:', err)
    })
},
    getData() {
      axios.get('http://localhost:3000/api/exportacion')
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
  column-count: 4;
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