<template>
    <v-container>
        <v-layout
            text-xs-center
            wrap
        >
            <v-flex xs12><building-line v-for="building in buildings" v-bind:key="building.id" v-bind:building="building"></building-line></v-flex>
        </v-layout>
        <button v-on:click="fetchBuildings">FETCH BUILDINGS</button>
    </v-container>
</template>

<script>
import {FETCH_ALL_BUILDINGS_REQUEST} from '../store/actions/buildings';
import BuildingLine from '../ui/BuildingLine';
export default {
    data: () => ({}),
    methods: {
        fetchBuildings: async function () {
        }
    },
    created: async function () {
        // `this` est une référence à l'instance de vm
        await this.$store.dispatch(FETCH_ALL_BUILDINGS_REQUEST);
    },
    components: {
        'building-line': BuildingLine,
    },
    computed: {
        buildings () {
            return this.$store.state.buildings.buildings
        }
    }
}
</script>

<style>

</style>
