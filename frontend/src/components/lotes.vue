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
          <li>Lotes</li>
          <li>Recolección</li>
          <li>Clasificación</li>
          <li>Despalpado</li>
          <li>Fermentación</li>
          <li>Lavado</li>
          <li>Secado</li>
        </ul>
      </nav>

      <div class="cerrarsesion"> 

        <button class="logout">Cerrar sesión</button>

      </div>
      
    </div>
    
    <div class="main-content">
      <h1 class="Titulov2">CAFETELERA<br>LA DESEADA</h1>
      <h2 >LOTES</h2>
      <div class="button-group">
        <button class="btn vaciar">VACIAR</button>
        <button class="btn anadir">AÑADIR</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>LOTE</th>
            <th>ENERO</th>
            <th>PROCESO</th>
          </tr>
        </thead>
        <tbody>

          <tr>
            <td>2409</td>
            <td>FECHA DE RECOLECCIÓN</td>
            <td>07/01/25</td>
          </tr>
          <tr>
            <td>2409</td>
            <td>LOTE DE RECOLECCIÓN</td>
            <td>150 Kgs (85)</td>
          </tr>
          <tr>
            <td>2409</td>
            <td>LOTE DE FIN</td>
            <td>ALTA / MEDIA / BAJA</td>
          </tr>
          <tr>
            <td>2409</td>
            <td>KILOS DE CEREZA</td>
            <td>3,750 Kg</td>
          </tr>
        </tbody>

      </table>

    </div>

  </div>
</template>

<script>



export default {
  name: 'App',
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
    width: 90%; /* Set the desired width for the logo */
    height: auto; /* Maintain aspect ratio */
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

.Titulov2{
  font-family: "Caudex", serif;
  width: 22.688rem;
  height: 6.125rem;
}
.button-group {

  margin: 20px 0px;

}

.btn {
  border-radius: 18px;
  font-size: 15px;
  font-weight: bold;
  margin-right: 10px;
  padding: 8px 30px;
  background-color: #302814;
  color:  #FFFFFF;
}

.btn:hover {
  
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