<template>
    <v-container>
        <v-layout
            wrap
        >
            <v-flex>
                <h3 class="headline mb-2">Mes finances</h3>

                <v-card class="card-round">
                    <v-card-title primary-title>
                        <div class="layout column">
                            <div class="icon"><v-icon>attach_money</v-icon></div>
                            <div class="price">589,31€ <span class="recurrence">/ mois</span></div>
                            <div class="subtitle">Bénéfices</div>
                        </div>
                        <div class="layout column">
                            <div class="icon"><v-icon>add</v-icon></div>
                            <div class="price">1567,43€ <span class="recurrence">/ mois</span></div>
                            <div class="subtitle">Chiffre d'affaire</div>
                        </div>
                        <div class="layout column">
                            <div class="icon"><v-icon>remove</v-icon></div>
                            <div class="price">978,12€ <span class="recurrence">/ mois</span></div>
                            <div class="subtitle">Coûts</div>
                        </div>
                    </v-card-title>
                </v-card>
                <h3 class="headline mb-2">Mes biens</h3>

                <v-card class="card-round">
                    <v-card-title primary-title>
                        <div class="layout column">
                            <div class="icon"><v-icon>fa-building</v-icon></div>
                            <div class="price">34</div>
                            <div class="subtitle">Appartements occupés</div>
                        </div>
                        <div class="layout column">
                            <div class="icon"><v-icon>fa-hotel</v-icon></div>
                            <div class="price">41</div>
                            <div class="subtitle">Appartements totaux</div>
                        </div>
                        <div class="layout column">
                            <div class="icon"><v-icon>fa-city</v-icon></div>
                            <div class="price">3</div>
                            <div class="subtitle">Immeubles</div>
                        </div>
                    </v-card-title>
                </v-card>
            </v-flex>
            <v-flex xs12><building-line v-for="building in buildings" v-bind:key="building.id" v-bind:building="building"></building-line></v-flex>
        </v-layout>
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

<style scoped>

    .card-round {
        border-radius: 7px !important;
    }

    .price {
        font-size: 24px;
    }

    .recurrence {
        font-size: 12px;
        color: #819ca9;
    }

</style>
