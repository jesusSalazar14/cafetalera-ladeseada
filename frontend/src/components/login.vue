<template>
  <div class="login-container">
    <!-- Barra lateral izquierda -->
    <div class="sidebar">
      <div class="logo-container">
        <img src="../assets/logo.jpg" alt="Logo" class="logo" />
      </div>
      <p class="footer-text">Cafetalera la Deseada 2025. Todos los derechos reservados.</p>
    </div>
    <!-- Contenido principal -->
    <div class="main-content">
      <!-- Botón de registro -->
      <button class="register-button" @click="handleRegister">REGISTRARSE</button>
      <!-- Formulario de login -->
      <div class="login-box">
        <h1>LOGIN</h1>
        <form @submit.prevent="handleLogin">
          <div class="input-group">
            <label for="email">USUARIO/EMAIL</label>
            <input type="email" id="email" v-model="email" required />
          </div>
          <div class="input-group">
            <label for="password">CONTRASEÑA</label>
            <input type="password" id="password" v-model="password" required />
          </div>
          <button type="submit" class="login-button">INICIAR SESIÓN</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    handleLogin() {
      // Lógica de autenticación aquí
      console.log('Iniciando sesión con:', this.email, this.password);
    },
    handleRegister() {
      // Lógica de registro aquí
      console.log('Registro');
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(to right, #3b3b3b, #ff9a00);
  position: relative;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.sidebar {
  background-color: #4b3d36; /* Color de fondo de la barra lateral */
  width: 400px; /* Ancho de la barra lateral */
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
  width: 300px; /* Ajusta según el tamaño de tu logo */
  height: 300px; /* Ajusta según el tamaño de tu logo */
  object-fit: cover;
  border-radius: 50%;
  border: none;
  overflow: hidden;
}

.footer-text {
  margin-top: 20px;
  color: #ffffff;
  font-size: 14px;
}

.main-content {
  flex: 1; /* Ocupa el resto del espacio */
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.register-button {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: #ff9a00; /* Color del botón */
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.login-box {
  background-color: #4b3d36; /* Color de fondo del cuadro de login */
  padding: 20px;
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
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
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

.login-button {
  background-color: #ff9a00; /* Color del botón */
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
}

.login-button:hover {
  background-color: #e68a00; /* Color del botón al pasar el mouse */
}
</style>