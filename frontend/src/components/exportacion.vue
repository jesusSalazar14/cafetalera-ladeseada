<template>

  <div id="app">

    <div class="sidebar">

      <div class="logo">

        <img src="../assets/logo.png" alt="Cafetería Logo">

      </div>

      <img class="CuentaSimbolo" src="../assets/Simbolos/account_circle.png" alt="">
      <div class="username">USERNAME</div>
      <nav>
        <ul>
          <li><img id="img1" src="../assets/Simbolos/seleccion-amarillo.png"><a href="/lotes">Lote de recolección</a></li>
          <li><img id="img1" src="../assets/Simbolos/clasificacion-amarillo.png"><a href="/clasificacion">Clasificación</a></li>
          <li><img id="img1" src="../assets/Simbolos/despulpado-amarillo.png"><a href="/despulpado">Despalpado</a></li>
          <li><img id="img1" src="../assets/Simbolos/fermentacion-amarillo.png"><a href="/fermentacion">Fermentación</a></li>
          <li><img id="img1" src="../assets/Simbolos/lavado-amarillo.png"><a href="/lavado">Lavado</a></li>
          <li><img id="img1" src="../assets/Simbolos/secado-amarillo.png"><a href="/secado">Secado</a></li>
          <li><img id="img1" src="../assets/Simbolos/recoleccion-amarillo.png"><a href="/recoleccion">Exportación</a></li>
        </ul>
      </nav>

      <div class="cerrarsesion"> 

        <button class="logout">Cerrar sesión</button>

      </div>
      
    </div>
    
    <div class="main-content">
      <div class="title-container">
        <h1 class="Titulov2">CAFETELERA
          <br>
          LA DESEADA
        </h1>
        <h2 class="Titulov3">CLASIFICACIÓN</h2>
      </div>
      <button @click="mostrarFormulario = !mostrarFormulario" class="btn agregar">AÑADIR</button>
      <form v-if="mostrarFormulario" @submit.prevent="agregarClasificacion">
        <div class="form-group">
          <label for="lote_id">lote_id</label>
          <input type="text" id="lote_id" v-model="lote_id" required>
        </div>
        <div class="form-group">
          <label for="fecha">Fecha</label>
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
        <button type="submit" class="btn agregar">AÑADIR</button>
      </form>
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
            <td>{{ item.cantidad }}</td>
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

export default {
  name: 'clasificacion',
  data() {
    return {
      nuevoClasificacion: {
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
    agregarClasificacion() {
      const clasificacion = {
        lote_id: this.lote_id,
        fecha: this.fecha,
        cantidad: this.cantidad,
        destinatario: this.destinatario,
        precio: this.precio,
      };
      axios.post('http://localhost:3000/api/clasificacion', clasificacion)
        .then(res => {
          console.log('Clasificación agregada:', res.data)
          clasificacion.id = res.data.id;
          this.data.push(clasificacion)
          this.nuevoClasificacion = {
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
          console.error('Error al agregar clasificación:', err)
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
}

#app {
  display: flex;

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
}

.bth img{
  margin-right: 0.625rem; /* Aumentar el margen a 10px en rem */
  width: 1.25rem; /* 20px en rem */
  height: auto; /* Mantener la proporción de la imagen */
}

#img1{

  margin-right: 10px; /* Aumentar el margen a 10px en rem */
  width: 1.25rem; /* 20px en rem */
  height: auto; /* Mantener la proporción de la imagen */

}


table {
  width: 100%;
  border-collapse: collapse;
}

thead{
  background: #302814;
  color: #FFF5E2;
  
}

tbody{
  background: #FFFFFA;
  color: #302814;
  font-weight: bold;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}



</style>