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
              <select type="text" id="lote_id" v-model="lote_id" required>
                <option value="">Seleccione un lote</option>
                <option v-for="(lote, index) in lotes" :key="index" :value="lote.id">{{ lote.id }}</option>
              </select>
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
              <button @click="cerrarFormularioAgregar" class="btn cerrar"><img src="../assets/Simbolos/salir.png">CERRAR</button>
            </div>
          </div>
        </form>

        <form v-if="mostrarFormularioEditar" @submit.prevent="guardarExportacion">
          <div class="inputs">
            <div class="form-group">
              <label for="lote_id">Lote ID</label>
              <select type="text" id="lote_id" v-model="lote_id" required>
                <option value="">Seleccione un lote</option>
                <option v-for="(lote, index) in lotes" :key="index" :value="lote.id">{{ lote.id }}</option>
              </select>
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
              <button type="submit" class="btn guardar"><img src="../assets/Simbolos/Save.png">GUARDAR</button>
              <button @click="cerrarFormularioEditar" class="btn cerrar"><img src="../assets/Simbolos/salir.png">CERRAR</button>
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
            <th>ACCIONES</th>

          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) of data" :key="index">
            <td>{{ item.id }}</td>
            <td>{{ item.lote_id }}</td>
            <td>{{ item.fecha.slice(0, 10) }}</td>
            <td>{{ item.cantidad }}</td>
            <td>{{ item.destinatario }}</td>
            <td>{{ item.precio }}</td>
            <td>
              <button @click="editarLote(item.id)" class="Editar"><img src="../assets/Simbolos/editar.png"></button>
              <button @click="confirmarEliminacion(item.id)" class="borrar"><img src="../assets/Simbolos/borrar.png"></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="mostrarConfirmacion" class="confirmacion">
      <div class="confirmacion-contenido">
        <p>¿Estás seguro de querer eliminar esta exportación?</p>
        <button class="confirmacion2" @click="eliminarExportacion(id)">Aceptar</button>
        <button @click="cerrarConfirmacion">Cancelar</button>
      </div>
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
      precio: '',
      lotes: [],
      mostrarConfirmacion: false,
      id: null
    }
  },
  created() {
    this.getData()
    this.getLotes()
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
          this.$toast.success('Exportación agregada con éxito!');
          this.mostrarFormulario = false
          this.getData()
        })
        .catch(err => {
          console.error('Error al agregar exportacion:', err)
          this.$toast.error('Error al agregar exportación. Por favor, inténtelo de nuevo más tarde.');
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
          this.$toast.success('Exportación editada con éxito!');
          this.getData();
          this.mostrarFormularioEditar = false;
        })
        .catch((error) => {
          console.error(error);
          this.$toast.error('Error al editar exportación. Por favor, inténtelo de nuevo más tarde.');
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
    },
    getLotes() {
      axios.get('http://localhost:3000/api/lote')
        .then(res => {
          this.lotes = res.data
          console.log(this.lotes)
        })
        .catch(err => {
          console.error('Error:', err)
        })
    },
    confirmarEliminacion(id) {
      this.mostrarConfirmacion = true;
      this.id = id;
    },
    eliminarExportacion(id) {
      axios.delete(`http://localhost:3000/api/exportacion/${id}`)
        .then((response) => {
          console.log(response);
          this.$toast.success('Exportación eliminada con éxito!');
          this.getData();
        })
        .catch((error) => {
          console.error(error);
          this.$toast.error('Error al eliminar exportación. Por favor, inténtelo de nuevo más tarde.');
        });
      this.cerrarConfirmacion();
    },
    cerrarConfirmacion() {
      this.mostrarConfirmacion = false;
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
  margin-left: 300px;
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
  font-size: 50px;
  font-style: italic;
  margin-right: 100px;
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

.Editar{
  background: inherit;
  border: inherit
}

.confirmacion {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.confirmacion-contenido {
  background-color: #FFF5E2;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: 300px;
  text-align: center;
}

.confirmacion-contenido p {
  margin-bottom: 20px;
  font-family: 'Maven Pro', sans-serif;
  font-weight: bold;
  color: #302814;
}

.confirmacion-contenido button {
  margin-right: 10px;
  background-color: #302814;
  color: #FFF5E2;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 15px; 
}

.confirmacion2  {
  margin-right: 10px;
  background-color: rgb(205, 0, 0) !important;
  color: #FFF5E2;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 15px; 
}

.confirmacion-contenido button:hover {
  background-color: #4c3a2b;
  border-radius: 15px; 
}

.confirmacion-contenido .aceptar {
  background-color: #302814;
}

.confirmacion-contenido .cancelar {
  background-color: #4c3a2b;
}

.borrar{
  margin-left: 5px;
  background: inherit;
  border: inherit
}
</style>