<template>
    <div>

        <div class="mt-2 p-5 flex flex-col">
            <p class="text-green-500 font-bold mb-2"><span class="text-xl">Ant Global</span>
                <!-- <router-link to="/contacts/add"
                    class="bg-green-700 hover:bg-green-600 text-white py-1 px-2 rounded-md ml-2"><i
                        class="fa fa-plus-circle mr-1"></i>New</router-link> -->
            </p>

            <p class="italic mt-3 text-base">
                Welcome {{ whichUser }}
            </p>

        </div>

        <!-- Spinner -->
        <div v-if="loading">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <mySpinner />
                    </div>
                </div>
            </div>
        </div>

        <!-- Error Message -->
        <div v-if="!loading && errorMessage">
            <div class="container mt-3">
                <div class="row">
                    <div class="col">
                        <p class="text-red-500 text-xl font-bold"> {{ errorMessage }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- TanTable  -->

        <div class="mx-5 px-5 w-100%">
            <TableTanstack :data="schools" :columns="columnsPeople" :options="{ perPage: 26 }" />
        </div>

        <!-- TanTable  -->

        <pre> {{ schools }} </pre>

    </div>
</template>

<script>

import { nextTick } from 'vue'

// import { defineComponent } from "vue";
import { h } from 'vue'
import TableTanstack from '@/components/TableTanstack.vue'
import EditButton from '@/components/EditButton.vue'
import EditButton1 from '@/components/EditButton1.vue'

import { ContactService } from '@/services/ContactService'
import mySpinner from '@/components/Spinner.vue'
import { supabase } from '@/clients/supabase'

import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
    // name: 'ContactManager',

    components: {
        mySpinner,
        TableTanstack,
    },

    data() {
        return {

            // ~~~~~~~~~~~~~~~~~~~~~~~

            columnsPeople: [
                {
                    accessorKey: 'id',
                    header: 'ID',
                    enableSorting: true,
                },
                {
                    accessorKey: 'school_name',
                    header: 'School Name',
                    enableSorting: true,
                },
                {
                    accessorKey: 'edit',
                    header: 'Edit',
                    cell: ({ row }) => h(EditButton, { id: row.original.id }),
                    enableSorting: false,
                },
                {
                    accessorKey: 'edit1',
                    header: 'Edit1',
                    cell: ({ row }) => h(EditButton1, { id: row.original.id }),
                    enableSorting: false,
                },
            ],
            // ~~~~~~~~
            people: [],

            // ~~~~~~~~~~~~~~~~~~~~~~~
            searchName: null,

            loading: false,
            contacts: [],
            schools: [],
            errorMessage: null,

            timer: "",
            value: 0,

            currentUserId: ''

        }
    },

    computed: {
        ...mapGetters([
            'isLoggedIn',
            'whichUser'
        ]),

        sortedContacts() {
            return this.contacts.slice().sort((a, b) => {
                return new Date(b.fields.updated_at) - new Date(a.fields.updated_at);
            });
        },

        truncatedToken() {
            const maxLength = 10 // Change this to whatever maximum length you want to display
            if (this.contact.notify_token) {
                const truncated = this.contact.notify_token.substring(0, maxLength)
                return truncated.length < this.contact.notify_token.length ? truncated + "..." : truncated
            } else {
                return this.contact.notify_token
            }
        }
    },

    created: async function () {

        this.currentUserId = await this.currentUser();

        if (this.currentUserId) {
            try {
                this.loading = true
                // let response = await ContactService.getAllContacts(this.currentUserId)
                // let response = await ContactService.getAllCondos(this.currentUserId)
                let response = await ContactService.getSchool(this.currentUserId)
                this.contacts = response.data.records
                // console.log('air school contacts------>', this.contacts)

                this.schools = this.contacts.map((item) => item.fields);
                // this.people = this.schools

                nextTick(() => {
                    this.people = this.schools;
                })

                // console.log('schools array --->>>', this.schools);

                this.loading = false
            }
            catch (error) {
                this.errorMessage = error
                this.loading = false
            }
        }
    },

    mounted() {
        this.loadStateFromLocalStorage();
    },

    methods: {

        ...mapActions(["loadStateFromLocalStorage"]),

        async currentUser() {
            const localUser = await supabase.auth.getSession();
            if (localUser.data.session) {
                // it'ok
                // console.log(localUser)
                // console.log('user-id----------->', localUser.data.session.user.id)
                // it'ok
                return localUser.data.session.user.id
            } else {
                console.log('not signin')
            }
        },

    },
}

</script>

<style scoped>
.token {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 150px;
    /* adjust this value to change the maximum width */
}

.token_long {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 200px;
    /* adjust this value to change the maximum width */
}
</style>