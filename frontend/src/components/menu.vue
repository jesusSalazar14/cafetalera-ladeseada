<template>
    <div class="sidebar">
      <div class="logo">
        <img src="../assets/logo.png" alt="Cafetería Logo">
      </div>
      
      <nav>
        <ul>
          <a href="/lotes"><li><img id="img1" src="../assets/Simbolos/seleccion-amarillo.png">Lote de recolección</li></a>
          <a href="/clasificacion"><li><img id="img1" src="../assets/Simbolos/clasificacion-amarillo.png">Clasificación</li></a>
          <a href="/despulpado"><li><img id="img1" src="../assets/Simbolos/despulpado-amarillo.png">Despulpado</li></a>
          <a href="/fermentacion"><li><img id="img1" src="../assets/Simbolos/fermentacion-amarillo.png">Fermentación</li></a>
          <a href="/lavado"><li><img id="img1" src="../assets/Simbolos/lavado-amarillo.png">Lavado</li></a>
          <a href="/secado"><li><img id="img1" src="../assets/Simbolos/secado-amarillo.png">Secado</li></a>
          <a href="/exportacion"><li><img id="img1" src="../assets/Simbolos/recoleccion-amarillo.png">Exportación</li></a>
        </ul>
      </nav>
      <div class="cerrarsesion">
        <button class="logout" @click="cerrarSesion"> <img src="../assets/Simbolos/logout.png">Cerrar sesión</button>
      </div>
    </div>
  </template>
  
  <script>
  import router from '../router';
  
  export default {
    name: 'Menu',
    methods: {
      cerrarSesion() {
        localStorage.removeItem('token');
        router.push({ name: 'login' });
      }
    }
  }
  </script>
  
  <style scoped>
.sidebar {
  background-color: #302814;
  width: 18.75rem; 
  max-width: 100%; 
  height: 100%; 
  z-index: 1;
  position: fixed;
  top: 0; 
  overflow: hidden; 
  display: flex;
  flex-direction: column;
  color: white;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(10px);
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

nav {
  width: 100%;
}

nav ul {
  list-style: none;
}

nav ul a {
  text-decoration: none;
}

nav ul li {
  padding: 5px 0px 5px 30px;
  color: #FFD569;
  margin: 10px 0;
  cursor: pointer;
  font-size: 15px;
  font-weight: bold;
}

nav ul a li img {
  margin-right: 20px;
}

nav ul a li:hover {
  display: block;
  background: #FFD569;
  color: #814A13;
}

.logout {
  color: #FFD569;
  background: none;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 15px;
  margin-right: 135px;
  padding-top: 12px;
  display: flex; 
  align-items: center;
}

.logout img {
  margin-right: 5px; 
  width: auto; 
}

</style>