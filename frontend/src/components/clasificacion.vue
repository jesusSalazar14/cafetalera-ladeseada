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
      <button @click="abrirFormularioAgregar" class="btn agregar"><img src="../assets/Simbolos/añadir.png">AGREGAR</button>
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
          <button @click="cerrarFormularioAgregar" class="btn cerrar">Cerrar</button>
        </form>
        <form v-if="mostrarFormularioEditar" @submit.prevent="guardarClasificacion">
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
          <button type="submit">Guardar</button>
          <button @click="cerrarFormularioEditar">Cerrar</button>
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
            <td>
              <button @click="editarClasificacion(item.id)">Editar</button>
            </td>
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
      nuevaClasificacion: {
        lote_id: '',
        fecha: '',
        calidad: ''
      },
      data: [],
      mostrarFormulario: false,
      mostrarFormularioEditar: false,
      lote_id: '',
      fecha: '',
      calidad: ''
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
          this.nuevaClasificacion = {
            id: '',
            lote_id: '',
            fecha: '',
            calidad: ''
          }
          this.mostrarFormulario = false
          this.getData()
        })
        .catch(err => {
          console.error('Error al agregar clasificacion:', err)
        })
    },
    editarClasificacion(id) {
      const clasificacion = this.data.find((item) => item.id === id);
      this.nuevaClasificacion = { ...clasificacion };
      this.lote_id = clasificacion.lote_id;
      this.fecha = new Date(clasificacion.fecha).toISOString().split('T')[0];
      this.calidad = clasificacion.calidad;
      this.mostrarFormulario = false;
      this.mostrarFormularioEditar = false;
      this.mostrarFormularioEditar = true;
    },
    guardarClasificacion() {
      const id = this.nuevaClasificacion.id;
      const data = {
        lote_id: this.lote_id,
        fecha: this.fecha,
        calidad: this.calidad,
      };
      axios.put(`http://localhost:3000/api/clasificacion/${id}`, data)
        .then((response) => {
          console.log(response);
          this.getData();
          this.mostrarFormularioEditar = false;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    cerrarFormularioEditar() {
      this.mostrarFormularioEditar = false;
    },
    cerrarFormularioAgregar() {
      this.mostrarFormulario = false;
      this.vaciarFormularioAgregar();
    },
    vaciarFormularioAgregar() {
      this.lote_id = '';
      this.fecha = '';
      this.calidad = '';
    },
    abrirFormularioAgregar() {
      this.vaciarFormularioAgregar();
      this.mostrarFormularioEditar = false;
      this.mostrarFormulario = true;
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
  column-count: 3;
}

.formulario .form-group input, select{
  display: flex;
  width: 100%;
}

.formulario .form-group label, input, select{
  justify-content: center;
  text-align: center;
}



.formulario .form-group label{
  display: flex;
  padding: 1rem;
  font-size: 1rem;
  font-family: 'Maven Pro', sans-serif; 
  font-weight: bold;
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