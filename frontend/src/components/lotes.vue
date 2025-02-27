<template>
  <div id="app">
    <div class="sidebar">
      <div class="logo">
        <img src="./logo.png" alt="Cafetería Logo" />
      </div>
      <h3>Cafetalera La Deseada</h3>
      <div class="username">USERNAME</div>
      <nav>
        <ul>
          <li>Recolección</li>
          <li>Clasificación</li>
          <li>Despalpado</li>
          <li>Fermentación</li>
          <li>Lavado</li>
          <li>Secado</li>
          <li>Selección de lote de recolección</li>
        </ul>
      </nav>
      <button class="logout">Cerrar sesión</button>
    </div>
    
    <div class="main-content">
      <h1>LOTE DE RECOLECCIÓN</h1>
      <div class="button-group">
        <button class="btn vaciar">Vaciar</button>
        <button class="btn anadir">Añadir</button>
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
#app {
  display: flex;
}

.sidebar {
  width: 250px;
  background-color: #40311e;
  color: white;
  padding: 20px;
}

.sidebar .logo img {
  max-width: 100%;
}

.sidebar h3 {
  margin: 20px 0;
}

.username {
  margin-bottom: 20px;
}

nav ul {
  list-style: none;
  padding: 0;
}

nav ul li {
  margin: 10px 0;
  cursor: pointer;
}

.logout {
  background-color: #e76e2e;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
}

.button-group {
  margin-bottom: 20px;
}

.btn {
  margin-right: 10px;
  padding: 10px 15px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f4e8d6;
}
</style>