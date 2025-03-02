<template>
  <div class="login-container">
    <!-- Barra lateral izquierda -->
    <div class="sidebar">
      <div class="logo-container">
        <img src="../assets/logo.png" alt="Logo" class="logo" />
      </div>
      <p class="footer-text">Cafetalera la Deseada 2025.<br>Todos los derechos reservados.</p>
    </div>
    <!-- Contenido principal -->
    <div class="main-content">
      
      
      <!-- Formulario de login -->
      <div class="login-box">
        <h1 class="titulolog">LOGIN</h1>
        <form @submit.prevent="handleLogin">
          <div class="input-group">
            <label for="email">USUARIO/EMAIL</label>
            <input type="email" id="email" placeholder="Usuario o Email" v-model="correo" required />
          </div>
          <div class="input-group">
            <label for="password">CONTRASEÑA</label>
            <input type="password" id="password" placeholder="Contraseña" v-model="password" required />
          </div>
          <div>
          <button type="submit" class="login-button">INICIAR SESIÓN</button>
          </div>
          <!-- Botón de registro -->
          <div class="Registro">
          <label class="labelregistro" for="Registrate">No posees una cuenta?</label>
          <router-link class="a-registro" to="/registro">Registrate</router-link>
          </div>
        </form>
     </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      correo: '',
      clave: '',
    };
  },
  methods: {
    handleLogin() {
      axios.post('http://localhost:3000/api/login', {
        correo: this.correo,
        clave: this.clave,
      })
        .then((response) => {
          console.log(response);
          alert('Inicio de sesion exitoso!');
        })
        .catch((error) => {
          console.error(error);
          if (error.response.status === 500) {
            alert('Error al iniciar sesion');
          } else {
            alert('Error desconocido');
          }
        });
    },
  },
};
</script>

<style scoped>

* {

  margin: 0;
  padding: 0;
}


body {
  margin: 0;
  padding: 0;

}

.titulolog{
  font-size: 40px;
}

.login-container {
  display: flex;
  height: 100vh;
  width: 100vw;
  background: url(../assets/fondo_imagen.png) no-repeat center center/cover;
  position: relative;
  margin: 0;
  padding: 0;
  overflow: hidden; 
}

.sidebar {
  background-color: #302814E5; /* Color de fondo de la barra lateral */
  background-blurr: 10%;
  width: 400px; /* Ancho de la barra lateral */
  height:100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.logo-container {
  margin-bottom: 20px;
}

.logo {
  width: 100%; /* Ajusta según el tamaño de tu logo */
  height: 100%; /* Ajusta según el tamaño de tu logo */
  object-fit: cover;
  border: none;
  overflow: hidden;
}



.footer-text {
  font-family: "Caudex", serif;
  font-weight: 400;
  margin-top: 20px;
  color: #FB901D;
  font-size: 16px;
  font-style: italic;
}

.main-content {
  flex: 1; /* Ocupa el resto del espacio */
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}


.login-box {

  background:linear-gradient(to right, #302814, #814A13); /* Color de fondo del cuadro de login */
  background-blurr: 10%;
  padding: 35px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 400px; /* Ancho del cuadro de login */
  margin: 0 auto;
}

h1 {
  color: #ffffff;
  margin-bottom: 20px;
  font-size: 24px;
}

.input-group {

  font-size: 30px;
  margin-bottom: 15px;
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;

}

.input-group label {
  margin-bottom: 5px;
}

input {
  width: 80%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
}

input:focus {
  outline: none;
  box-shadow: 0 0 5px #ff9a00;
}


#password, #email{
  Color: #474747;
  font-size: 15px

}

.login-button{

  background-color: #FB901DB2; /* Color del botón */
  background-blurr: 30%;
  color: #ffffff;
  width: 250px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  
}

.Registro{
  padding-top:15px;

}

.labelregistro{

  padding-right: 5px;
  color: #FFFFFF;
}

.a-registro{

  color: #FFD569;
}


.login-button:hover {
  background-color: #e68a00; /* Color del botón al pasar el mouse */
}
</style>