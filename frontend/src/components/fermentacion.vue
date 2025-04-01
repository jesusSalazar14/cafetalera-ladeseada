<template>
  <div id="app">
    <Menu />
    <div class="main-content">
      <div class="title-container">
        <h1 class="Titulov2">CAFETELERA
          <br>
          LA DESEADA
        </h1>
        <h2 class="Titulov3">FERMENTACIÓN</h2>
      </div>
      <button @click="abrirFormularioAgregar" class="btn agregar"><img src="../assets/Simbolos/añadir.png">AGREGAR</button>
      <div class="formulario">
        <form v-if="mostrarFormulario" @submit.prevent="agregarFermentacion">
          <div class="inputs">
            <div class="form-group">
              <label for="lote_id">Lote ID</label>
              <select type="text" id="lote_id" v-model="lote_id" required>
                <option value="">Seleccione un lote</option>
                <option v-for="(lote, index) in lotes" :key="index" :value="lote.id">{{ lote.id }}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="fecha_inicio">FECHA INICIO</label>
              <input type="date" id="fecha_inicio" v-model="fecha_inicio" required>
            </div>
            <div class="form-group">
              <label for="fecha_fin">FECHA FIN</label>
              <input type="date" id="fecha_fin" v-model="fecha_fin" required>
            </div>
            <div class="form-group">
              <label for="tipo">TIPO</label>
              <select type="text" id="tipo" v-model="tipo" required>
                <option value="anaeróbico">Anaeróbico</option> 
                <option value="aeróbico">Aeróbico</option> 
              </select>
            </div>
          </div>

          <div class="botones-formulario">
            <div>
              <button type="submit" class="btn agregar"><img src="../assets/Simbolos/añadir.png">AÑADIR</button>
              <button @click="cerrarFormularioAgregar" class="btn cerrar"><img src="../assets/Simbolos/eliminar.png">Cerrar</button>
            </div>
          </div>
        </form>

        <form v-if="mostrarFormularioEditar" @submit.prevent="guardarFermentacion">
          <div class="inputs">
            <div class="form-group">
              <label for="lote_id">Lote ID</label>
              <select type="text" id="lote_id" v-model="lote_id" required>
                <option value="">Seleccione un lote</option>
                <option v-for="(lote, index) in lotes" :key="index" :value="lote.id">{{ lote.id }}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="fecha_inicio">FECHA INICIO</label>
              <input type="date" id="fecha_inicio" v-model="fecha_inicio" required>
            </div>
            <div class="form-group">
              <label for="fecha_fin">FECHA FIN</label>
              <input type="date" id="fecha_fin" v-model="fecha_fin" required>
            </div>
            <div class="form-group">
              <label for="tipo">TIPO</label>
              <select type="text" id="tipo" v-model="tipo" required>
                <option value="anaeróbico">Anaeróbico</option> 
                <option value="aeróbico">Aeróbico</option> 
              </select>
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
            <th>FECHA INICIO</th>
            <th>FECHA FIN</th>
            <th>TIPO</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) of data" :key="index">
            <td>{{ item.id }}</td>
            <td>{{ item.lote_id }}</td>
            <td>{{ item.fecha_inicio }}</td>
            <td>{{ item.fecha_fin }}</td>
            <td>{{ item.tipo }}</td>
            <td>
              <button @click="editarFermentacion(item.id)"><img src="../assets/Simbolos/editar.png"></button>
              <button @click="confirmarEliminacion(item.id)"><img src="../assets/Simbolos/eliminar.png"></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="mostrarConfirmacion" class="confirmacion">
      <div class="confirmacion-contenido">
        <p>¿Estás seguro de querer eliminar esta fermentación?</p>
        <button @click="eliminarFermentacion(id)">Aceptar</button>
        <button @click="cerrarConfirmacion">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Menu from '../components/menu.vue'

export default {
  name: 'fermentacion',
  components: {
    Menu
  },
  data() {
    return {
      nuevaFermentacion: {
        lote_id: '',
        fecha_inicio: '',
        fecha_fin: '',
        tipo: ''
      },
      data: [],
      mostrarFormulario: false,
      mostrarFormularioEditar: false,
      lote_id: '',
      fecha_inicio: '',
      fecha_fin: '',
      tipo: '',
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
    agregarFermentacion() {
      const fermentacion = {
        lote_id: this.lote_id,
        fecha_inicio: this.fecha_inicio,
        fecha_fin: this.fecha_fin,
        tipo: this.tipo
      };
      axios.post('http://localhost:3000/api/fermentacion', fermentacion)
        .then(res => {
          console.log('Fermentacion agregada:', res.data)
          fermentacion.id = res.data.id;
          this.data.push(fermentacion)
          this.nuevaFermentacion = {
            id: '',
            lote_id: '',
            fecha_inicio: '',
            fecha_fin: '',
            tipo: ''
          }
          this.$toast.success('Fermentación agregada con éxito!');
          this.mostrarFormulario = false
          this.getData()
        })
        .catch(err => {
          console.error('Error al agregar fermentacion:', err)
          this.$toast.error('Error al agregar fermentación. Por favor, inténtelo de nuevo más tarde.');
        })
    },
    editarFermentacion(id) {
      const fermentacion = this.data.find((item) => item.id === id);
      this.nuevaFermentacion = { ...fermentacion };
      this.lote_id = fermentacion.lote_id;
      this.fecha_inicio = new Date(fermentacion.fecha_inicio).toISOString().split('T')[0];
      this.fecha_fin = new Date(fermentacion.fecha_fin).toISOString().split('T')[0];
      this.tipo = fermentacion.tipo;
      this.mostrarFormulario = false;
      this.mostrarFormularioEditar = false;
      this.mostrarFormularioEditar = true;
    },
    guardarFermentacion() {
      const id = this.nuevaFermentacion.id;
      const data = {
        lote_id: this.lote_id,
        fecha_inicio: this.fecha_inicio,
        fecha_fin: this.fecha_fin,
        tipo: this.tipo
      };
      axios.put(`http://localhost:3000/api/fermentacion/${id}`, data)
        .then((response) => {
          console.log(response);
          this.$toast.success('Fermentación editada con éxito!');
          this.getData();
          this.mostrarFormularioEditar = false;
        })
        .catch((error) => {
          console.error(error);
          this.$toast.error('Error al editar fermentación. Por favor, inténtelo de nuevo más tarde.');
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
      this.fecha_inicio = '';
      this.fecha_fin = '';
      this.tipo = '';
    },
    abrirFormularioAgregar() {
      this.vaciarFormularioAgregar();
      this.mostrarFormularioEditar = false;
      this.mostrarFormulario = true;
    },
    getData() {
      axios.get('http://localhost:3000/api/fermentacion')
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
    eliminarFermentacion(id) {
      axios.delete(`http://localhost:3000/api/fermentacion/${id}`)
        .then((response) => {
          console.log(response);
          this.$toast.success('Fermentación eliminada con éxito!');
          this.getData();
        })
        .catch((error) => {
          console.error(error);
          this.$toast.error('Error al eliminar fermentación. Por favor, inténtelo de nuevo más tarde.');
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
  column-count: 4;
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
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.confirmacion-contenido p {
  margin-bottom: 20px;
}

.confirmacion-contenido button {
  margin-right: 10px;
}
</style>