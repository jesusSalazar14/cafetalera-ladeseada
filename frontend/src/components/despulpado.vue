<template>

  <div id="app">

    <div class="sidebar">

      <div class="logo">

        <img src="../assets/logo.png" alt="Cafetería Logo">

      </div>

      <h3>Cafetalera La Deseada</h3>
      <div class="username">USERNAME</div>
      <nav>
        <ul>
          <li><img id="img1" src="../assets/Simbolos/recoleccion-amarillo.png">Recolección</li>
          <li><img id="img1" src="../assets/Simbolos/clasificacion-amarillo.png">Clasificación</li>
          <li><img id="img1" src="../assets/Simbolos/despulpado-amarillo.png">Despalpado</li>
          <li><img id="img1" src="../assets/Simbolos/fermentacion-amarillo.png">Fermentación</li>
          <li><img id="img1" src="../assets/Simbolos/lavado-amarillo.png">Lavado</li>
          <li><img id="img1" src="../assets/Simbolos/secado-amarillo.png">Secado</li>
          <li><img id="img1" src="../assets/Simbolos/seleccion-amarillo.png">Selección de lote de recolección</li>
        </ul>
      </nav>

      <div class="cerrarsesion"> 

        <button class="logout">Cerrar sesión</button>

      </div>
      
    </div>
    
    <div class="main-content">
      <h1>LOTE DE RECOLECCIÓN</h1>
      <div class="button-group">
        <button class="btn vaciar"><img src="../assets/Simbolos/eliminar.png">VACIAR</button>
        <button class="btn anadir"><img src="../assets/Simbolos/añadir.png">AÑADIR</button>
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
  background-color: #40311e;
  width: 300px;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  color: white;
  justify-content: center;
  align-items: center;

}

.sidebar img {
  max-width: 50%;

}



.sidebar h3 {
  margin: 20px 0;
}

.username {
  margin-bottom: 20px;
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

.button-group {

  margin: 20px 0px;

}

.button-group img{
  margin-right: 5px;
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


#img1{

  margin-right: 10px;

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