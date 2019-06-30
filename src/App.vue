<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-app>
        <v-toolbar app>
            <v-toolbar-title class="headline text-uppercase">
                <span>SciManager</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu>
                <template v-slot:activator="{ on }">
                    <v-btn
                        outline small fab
                        color="primary"
                        v-on="on"
                        v-if="isAuthenticated">
                        <v-icon>account_circle</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-tile
                        v-for="(item, index) in items"
                        :key="index"
                        @click="item.action"
                    >
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>
        </v-toolbar>

        <v-content>
            <router-view/>
        </v-content>
    </v-app>
</template>

<script>
import { AUTH_LOGOUT } from './store/actions/auth'

export default {
    name: 'App',
    data: ({ $store, $router }) => ({
        items: [
            {title: 'Déconnexion', action: () => $store.dispatch(AUTH_LOGOUT).then(() => $router.replace('/login'))},

        ]
    }),
    computed: {
        isAuthenticated() {
            return this.$store.getters.isAuthenticated
        }
    }
}
</script>
