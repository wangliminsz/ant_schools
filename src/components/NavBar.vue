<template>
    <nav class="bg-green-700 pt-3 pb-3 w-screen">
        <div class="mx-auto flex justify-between items-center">

            <div class="ml-10">

                <router-link to="/" class="flex items-center text-white font-bold no-underline">
                    <i class="fa fa-mobile fa-lg mr-1"></i>
                    <span class="ml-2 text-xl myfont">Ant Bangkok antbkk.info</span>
                </router-link>

            </div>

            <!-- <pre> --- {{ formattedWhichUser }} </pre> -->
            <!-- <pre> --- {{ isLoggedIn }} </pre> -->
            <button v-if="isLoggedIn" class="bg-white text-black text-lg py-2 px-4 rounded-lg mr-5"
                @click="submitLogout">Logout</button>
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

<style scoped>

.myfont{
  font-family: 'Ubuntu', sans-serif;
  /* background-color: #f0fdf0; */
}

</style>