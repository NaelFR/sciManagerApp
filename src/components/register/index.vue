<template>
    <v-layout>
        <v-flex xs12 sm6 offset-sm3>
            <v-card class="elevation-12">
                <form class="login" @submit.prevent="register">
                    <v-card-title primary-title class="justify-center">
                        <div>
                            <h1>Création de votre compte</h1>
                            <v-text-field
                                v-model="firstName"
                                label="Prénom"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="lastName"
                                label="Nom"
                                required
                            ></v-text-field>
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
                            <v-text-field
                                v-model="password_confirmation"
                                :type="'password'"
                                name="input-10-1"
                                label="Confirmation du mot de passe"
                                required
                            ></v-text-field>
                        </div>
                    </v-card-title>

                    <v-card-actions class="justify-center layout column">
                        <v-btn small :type="'submit'" color="primary">Connexion</v-btn>
                        Vous avez déjà un compte ? <router-link to="/login">Connectez-vous</router-link>
                    </v-card-actions>
                </form>

            </v-card>
        </v-flex>
    </v-layout>

</template>

<script>
import { REGISTER_REQUEST } from '../../store/actions/auth'
export default {
    name: 'login',
    data () {
        return {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            password_confirmation: '',
        }
    },
    methods: {
        register: function () {
            const { email, firstName, lastName, password, password_confirmation } = this;
            this.$store.dispatch(REGISTER_REQUEST, { email, password, firstName, lastName, password_confirmation }).then(() => {
                this.$router.push('/')
            })
        }
    },
}
</script>

<style scoped></style>
