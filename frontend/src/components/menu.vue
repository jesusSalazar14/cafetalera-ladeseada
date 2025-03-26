<template>
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
          <li><img id="img1" src="../assets/Simbolos/despulpado-amarillo.png"><a href="/despulpado">Despulpado</a></li>
          <li><img id="img1" src="../assets/Simbolos/fermentacion-amarillo.png"><a href="/fermentacion">Fermentación</a></li>
          <li><img id="img1" src="../assets/Simbolos/lavado-amarillo.png"><a href="/lavado">Lavado</a></li>
          <li><img id="img1" src="../assets/Simbolos/secado-amarillo.png"><a href="/secado">Secado</a></li>
          <li><img id="img1" src="../assets/Simbolos/recoleccion-amarillo.png"><a href="/exportacion">Exportación</a></li>
        </ul>
      </nav>
      <div class="cerrarsesion">
        <button class="logout" @click="cerrarSesion">Cerrar sesión</button>
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
    /* Estilos para el menú */
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
  </style>