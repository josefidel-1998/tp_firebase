<script>
import {onSnapshot, collection} from "firebase/firestore";
import {db} from '../services/firestore.js';
export default {
    name: "Descargas",
    data: () => ({
        datos: []
    }),
    mounted(){
        const coleccion = collection(db, 'servicios');
        onSnapshot(coleccion, data => data.docs.map(servicios =>{
            this.datos = servicios.data()
            console.table(this.datos)
        }))
    }
};

</script>

<template>
    <section>
        <h2 class="mb-3">Descargas</h2>

        <p>Aqui podrás descargar nuestro juego en sus tres versiones y comprar mejoras.</p>
        <ul>
            <li v-for="dato in datos" :key="dato">{{dato}}</li>
        </ul>
    </section>
</template>

<style scoped>

</style>