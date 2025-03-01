<template>
  <div id="app">
    <Login />
    <Registro />
    <Lotes />
    <Clasificacion />
    <Recoleccion />
    <Despulpado />
    <Fermentacion />
    <Lavado />
    <Secado/> 
  </div>
</template>

<script setup>
import Login from './components/login.vue';
import Lotes from './components/lotes.vue'; 
import Registro from './components/registro.vue';
import Recoleccion from './components/recoleccion.vue';
import Clasificacion from './components/clasificacion.vue';
import Despulpado from './components/despulpado.vue';
import Fermentacion from './components/fermentacion.vue';
import Lavado from './components/lavado.vue';
</script>

<style scoped>
</style>