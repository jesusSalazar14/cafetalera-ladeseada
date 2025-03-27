<template>
  <div id="app">
    <Menu />
    <div class="main-content">
      <div class="title-container">
        <h1 class="Titulov2">CAFETELERA
          <br>
          LA DESEADA
        </h1>
        <h2 class="Titulov3">EXPORTACIÓN</h2>
      </div>
      <button @click="abrirFormularioAgregar" class="btn agregar"><img src="../assets/Simbolos/añadir.png">AGREGAR</button>
      <div class="formulario">
        <form v-if="mostrarFormulario" @submit.prevent="agregarExportacion">
          <div class="inputs">
          <div class="form-group">
            <label for="lote_id">Lote ID</label>
            <input type="number" id="lote_id" v-model="lote_id" required>
          </div>
          <div class="form-group">
            <label for="fecha">FECHA</label>
            <input type="date" id="fecha" v-model="fecha" required>
          </div>
          <div class="form-group">
            <label for="cantidad">CANTIDAD</label>
            <input type="number" id="cantidad" v-model="cantidad" required>
          </div>
          <div class="form-group">
            <label for="destinatario">DESTINATARIO</label>
            <input type="text" id="destinatario" v-model="destinatario" required>
          </div>
          <div class="form-group">
            <label for="precio">PRECIO</label>
            <input type="number" id="precio" v-model="precio" required>
          </div>
        </div>
          <div class="botones-formulario">
          <div>
          <button type="submit" class="btn agregar"><img src="../assets/Simbolos/añadir.png">AÑADIR</button>
          <button @click="cerrarFormularioAgregar" class="btn cerrar">Cerrar</button>
          </div>
        </div>
        </form>

        <form v-if="mostrarFormularioEditar" @submit.prevent="guardarExportacion">
          <div class="inputs">
          <div class="form-group">
            <label for="lote_id">Lote ID</label>
            <input type="number" id="lote_id" v-model="lote_id" required>
          </div>
          <div class="form-group">
            <label for="fecha">FECHA</label>
            <input type="date" id="fecha" v-model="fecha" required>
          </div>
          <div class="form-group">
            <label for="cantidad">CANTIDAD</label>
            <input type="number" id="cantidad" v-model="cantidad" required>
          </div>
          <div class="form-group">
            <label for="destinatario">DESTINATARIO</label>
            <input type="text" id="destinatario" v-model="destinatario" required>
          </div>
          <div class="form-group">
            <label for="precio">PRECIO</label>
            <input type="number" id="precio" v-model="precio" required>
          </div>
        </div>
          <div class="botones-formulario">
          <div>
          <button type="submit" class="btn guardar">Guardar</button>
          <button @click="cerrarFormularioEditar" class="btn cerrar">Cerrar</button>
        </div>
        </div>
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
            <td>{{ item.cantidad }}</td>
            <td>{{ item.destinatario }}</td>
            <td>{{ item.precio }}</td>
            <td>
              <button @click="editarExportacion(item.id)">Editar</button>
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
  name: 'exportacion',
  components: {
    Menu
  },
  data() {
    return {
      nuevaExportacion: {
        lote_id: '',
        fecha: '',
        cantidad: '',
        destinatario: '',
        precio: ''
      },
      data: [],
      mostrarFormulario: false,
      mostrarFormularioEditar: false,
      lote_id: '',
      fecha: '',
      cantidad: '',
      destinatario: '',
      precio: ''
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
          this.nuevaExportacion = {
            id: '',
            lote_id: '',
            fecha: '',
            cantidad: '',
            destinatario: '',
            precio: ''
          }
          this.mostrarFormulario = false
          this.getData()
        })
        .catch(err => {
          console.error('Error al agregar exportacion:', err)
        })
    },
    editarExportacion(id) {
      const exportacion = this.data.find((item) => item.id === id);
      this.nuevaExportacion = { ...exportacion };
      this.lote_id = exportacion.lote_id;
      this.fecha = new Date(exportacion.fecha).toISOString().split('T')[0];
      this.cantidad = exportacion.cantidad;
      this.destinatario = exportacion.destinatario;
      this.precio = exportacion.precio;
      this.mostrarFormulario = false;
      this.mostrarFormularioEditar = false;
      this.mostrarFormularioEditar = true;
    },
    guardarExportacion() {
      const id = this.nuevaExportacion.id;
      const data = {
        lote_id: this.lote_id,
        fecha: this.fecha,
        cantidad: this.cantidad,
        destinatario: this.destinatario,
        precio: this.precio
      };
      axios.put(`http://localhost:3000/api/exportacion/${id}`, data)
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
      this.cantidad = '';
      this.destinatario = '';
      this.precio = '';
    },
    abrirFormularioAgregar() {
      this.vaciarFormularioAgregar();
      this.mostrarFormularioEditar = false;
      this.mostrarFormulario = true;
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

.inputs{
  justify-items: center;
  font-family: 'Maven Pro', sans-serif;
  font-weight: bold;
  column-count: 5;
}

.inputs .form-group input, select{
  display: flex;
  width: 100%;
}

.inputs .form-group label, input, select{
  justify-content: center;
  text-align: center;
}


.inputs .form-group label{
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

form div .btn{ 
  margin-top: 2rem;
  display: inline-flex;
}

form .botones-formulario{
  justify-items: center;
}

</style>