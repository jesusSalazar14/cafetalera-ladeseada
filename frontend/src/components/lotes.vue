<template>
  <div id="app">
    <Menu />
    <div class="main-content">
      <div class="title-container">
        <h1 class="Titulov2">CAFETELERA
          <br>
          LA DESEADA
        </h1>
        <h2 class="Titulov3">LOTES</h2>
      </div>
      <button @click="abrirFormularioAgregar" class="btn agregar"><img src="../assets/Simbolos/añadir.png">AGREGAR</button>
      <div class="formulario">
        <form v-if="mostrarFormulario" @submit.prevent="agregarLote">
          <div class="inputs">
            <div class="form-group">
              <label for="fecha_inicio">FECHA INICIO</label>
              <input type="date" id="fecha_inicio" v-model="fecha_inicio" required>
            </div>
            <div class="form-group">
              <label for="fecha_fin">FECHA FIN</label>
              <input type="date" id="fecha_fin" v-model="fecha_fin" required>
            </div>
            <div class="form-group">
              <label for="kilogramos_cereza">KILOS CEREZA</label>
              <input type="number" id="kilogramos_cereza" v-model="kilogramos_cereza" required>
            </div>
            <div class="form-group">
              <label for="metodo">METODO</label>
              <select type="text" id="metodo" v-model="metodo" required>
                <option value="Manual">Manual</option> 
                <option value="Mecanico">Mecanico</option> 
                <option value="Selectivo">Selectivo</option>
                <option value="Masivo">Masivo</option> 
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

        <form v-if="mostrarFormularioEditar" @submit.prevent="guardarLote">
          <div class="inputs">
            <div class="form-group">
              <label for="fecha_inicio">FECHA INICIO</label>
              <input type="date" id="fecha_inicio" v-model="fecha_inicio" required>
            </div>
            <div class="form-group">
              <label for="fecha_fin">FECHA FIN</label>
              <input type="date" id="fecha_fin" v-model="fecha_fin" required>
            </div>
            <div class="form-group">
              <label for="kilogramos_cereza">KILOS CEREZA</label>
              <input type="number" id="kilogramos_cereza" v-model="kilogramos_cereza" required>
            </div>
            <div class="form-group">
              <label for="metodo">METODO</label>
              <select type="text" id="metodo" v-model="metodo" required>
                <option value="Manual">Manual</option> 
                <option value="Mecanico">Mecanico</option> 
                <option value="Selectivo">Selectivo</option>
                <option value="Masivo">Masivo</option> 
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
            <th>FECHA INICIO</th>
            <th>FECHA FIN</th>
            <th>KILOS CEREZA</th>
            <th>METODO</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) of data" :key="index">
            <td>{{ item.id }}</td>
            <td>{{ item.fecha_inicio }}</td>
            <td>{{ item.fecha_fin }}</td>
            <td>{{ item.kilogramos_cereza }}</td>
            <td>{{ item.metodo }}</td>
            <td>
              <button @click="editarLote(item.id)"><img src="../assets/Simbolos/editar.png"></button>
              <button @click="confirmarEliminacion(item.id)"><img src="../assets/Simbolos/eliminar.png"></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="mostrarConfirmacion" class="confirmacion">
      <div class="confirmacion-contenido">
        <p>¿Estás seguro de querer eliminar este lote?</p>
        <button @click="eliminarLote(id)">Aceptar</button>
        <button @click="cerrarConfirmacion">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Menu from '../components/menu.vue'

export default {
  name: 'lotes',
  components: {
    Menu
  },
  data() {
    return {
      nuevoLote: {
        fecha_inicio: '',
        fecha_fin: '',
        kilogramos_cereza: '',
        metodo: ''
      },
      data: [],
      mostrarFormulario: false,
      mostrarFormularioEditar: false,
      fecha_inicio: '',
      fecha_fin: '',
      kilogramos_cereza: '',
      metodo: '',
      mostrarConfirmacion: false,
      id: null
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
        metodo: this.metodo
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
            metodo: ''
          }
          this.$toast.success('Lote agregado con éxito!');
          this.mostrarFormulario = false
          this.getData()
        })
        .catch(err => {
          console.error('Error al agregar lote:', err)
          this.$toast.error('Error al agregar lote. Por favor, inténtelo de nuevo más tarde.');
        })
    },
    editarLote(id) {
      const lote = this.data.find((item) => item.id === id);
      this.nuevoLote = { ...lote };
      this.fecha_inicio = new Date(lote.fecha_inicio).toISOString().split('T')[0];
      this.fecha_fin = new Date(lote.fecha_fin).toISOString().split('T')[0];
      this.kilogramos_cereza = lote.kilogramos_cereza;
      this.metodo = lote.metodo;
      this.mostrarFormulario = false;
      this.mostrarFormularioEditar = false;
      this.mostrarFormularioEditar = true;
    },
    guardarLote() {
      const id = this.nuevoLote.id;
      const data = {
        fecha_inicio: this.fecha_inicio,
        fecha_fin: this.fecha_fin,
        kilogramos_cereza: this.kilogramos_cereza,
        metodo: this.metodo
      };
      axios.put(`http://localhost:3000/api/lote/${id}`, data)
        .then((response) => {
          console.log(response);
          this.$toast.success('Lote editado con éxito!');
          this.getData();
          this.mostrarFormularioEditar = false;
        })
        .catch((error) => {
          console.error(error);
          this.$toast.error('Error al editar lote. Por favor, inténtelo de nuevo más tarde.');
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
      this.fecha_inicio = '';
      this.fecha_fin = '';
      this.kilogramos_cereza = '';
      this.metodo = '';
    },
    abrirFormularioAgregar() {
      this.vaciarFormularioAgregar();
      this.mostrarFormularioEditar = false;
      this.mostrarFormulario = true;
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
    },
    confirmarEliminacion(id) {
      this.mostrarConfirmacion = true;
      this.id = id;
    },
    eliminarLote(id) {
      axios.delete(`http://localhost:3000/api/lote/${id}`)
        .then((response) => {
          console.log(response);
          this.$toast.success('Lote eliminado con éxito!');
          this.getData();
        })
        .catch((error) => {
          console.error(error);
          this.$toast.error('Este lote ya se encuentra procesado, no es posible eliminarlo.');
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