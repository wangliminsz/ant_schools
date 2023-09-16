<template>
    <nav class="navbar navbar-dark bg-success navbar-expand-sm">
        <div class="container">
            <router-link to="/" class="navbar-brand"><i class="fa fa-mobile"></i><span class="ms-2">Ant
                    Notify</span></router-link>

            <!-- <pre> --- {{ formattedWhichUser }} </pre> -->
            <!-- <pre> --- {{ isLoggedIn }} </pre> -->
            <button v-if="isLoggedIn" class="btn btn-light" @click="submitLogout">Logout</button>
            <!-- Added a Logout button -->
        </div>
    </nav>
</template>
  
<script>

import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
    name: 'NavBar',

    data() {
        return {
            whichUserAbbr: ''
        }
    },

    mounted() {
        this.loadStateFromLocalStorage();
    },

    methods: {
        ...mapActions(["loadStateFromLocalStorage"]),

        // logout({ router: this.$router }) {
        //     // Call the logout action
        //     this.$store.dispatch("logout");
        // },

        submitLogout() {
            // const email = this.email
            // const password = this.password
            // Pass email and password as payload to the login action
            this.logout({ router: this.$router })
        },

        ...mapActions(['logout'])
    },

    computed: {
        ...mapGetters([
            'isLoggedIn',
            'whichUser'
        ]),

        formattedWhichUser() {
            let userAbbr = this.whichUser.substring(0, this.whichUser.indexOf('@'));
            return userAbbr.charAt(0);
        }
    }
}
</script>

<style scoped></style>