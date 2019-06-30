<template>
    <v-layout>
        <v-flex xs12 sm6 offset-sm3>
            <v-card class="elevation-12">
                <form class="login" @submit.prevent="login">
                    <v-card-title primary-title class="justify-center">
                        <div>
                            <h1>Connexion à votre compte</h1>
                            <v-text-field
                                v-model="email"
                                label="E-mail"
                                required
                            ></v-text-field>

                            <v-text-field
                                v-model="password"
                                :type="'password'"
                                name="input-10-1"
                                label="Mot de passe"
                                required
                            ></v-text-field>
                        </div>
                    </v-card-title>

                    <v-card-actions class="justify-center layout column">
                        <v-btn small :type="'submit'" color="primary">Connexion</v-btn>
                        Vous n'avez pas encore de compte ? <router-link to="/register">Inscrivez-vous</router-link>

                    </v-card-actions>
                </form>

            </v-card>
        </v-flex>
    </v-layout>

</template>

<script>
import {AUTH_REQUEST} from '../../store/actions/auth'
export default {
    name: 'login',
    data () {
        return {
            email: 'abou.chahine.nael@gmail.com',
            password: '123456',
        }
    },
    methods: {
        login: function () {
            const { email, password } = this;
            this.$store.dispatch(AUTH_REQUEST, { email, password }).then(() => {
                this.$router.push('/')
            })
        }
    },
}
</script>

<style scoped></style>
