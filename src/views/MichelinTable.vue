/* eslint-disable */

<template>
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

    <div v-if="!loading" class="mt-2 px-5 flex flex-col">
        <div class="flex flex-row justify-between">
            <p class="text-green-500 font-bold mt-2 mb-2"><span style="font-size: 28px;">Ant Global - Michelin</span>
            </p>
            <router-link to="/schooltable" class="mt-2 mb-2 mr-5">
                Schools Link
            </router-link>
        </div>

        <p class="italic mt-3 text-base">
            Welcome {{ whichUser }}
        </p>

    </div>

    <div v-if="!loading" class="mx-3 w-60% text-lg">
        <TableTanstack class="text-lg" :data="people" :columns="columnsPeople" :options="{ perPage: 26 }" />
    </div>
</template>
  

<script setup>
/* eslint-disable */

import { h } from 'vue'

import { ref } from 'vue'
import { onMounted } from '@vue/runtime-core'
import { computed } from 'vue'

// import { defineExpose, withDefaults } from 'vue'

// import { onMounted } from 'vue'
// import { mapActions } from 'vuex'
import { useStore } from 'vuex'

const store = useStore()

// Example of accessing getters
// const isLoggedIn = computed(() => store.getters.isLoggedIn);
const whichUser = computed(() => store.getters.whichUser);

// import { format } from 'date-fns'
// import { h } from 'vue'
import TableTanstack from '@/components/TableTanstack.vue'
// import EditButton from '@/components/EditButton.vue'
// import EditButton1 from '@/components/EditButton1.vue'
// import EditButton2 from '@/components/EditButton2.vue'
import EditMichelin1 from '@/components/EditMichelin1.vue'
import EditMichelin2 from '@/components/EditMichelin2.vue'

import { ContactService } from "@/services/ContactService";

import mySpinner from '@/components/Spinner.vue'
import { supabase } from '@/clients/supabase'

const columnsPeople = [
    {
        accessorKey: 'id',
        header: 'ID',
        enableSorting: true,
    },
    // {
    //     accessorKey: 'edit',
    //     header: 'Edit',
    //     cell: ({ row }) => h(EditButton, { id: row.original.id }),
    //     enableSorting: false,
    // },
    {
        accessorKey: 'html',
        header: 'Html',
        cell: ({ row }) => h(EditMichelin1, { id_1: row.original.id }),
        enableSorting: false,
    },
    {
        accessorKey: 'imgs',
        header: 'Imgs',
        cell: ({ row }) => h(EditMichelin2, { id_2: row.original.id }),
        enableSorting: false,
    },
    {
        accessorKey: 'name',
        header: 'Michelin Name',
        enableSorting: true,
    },
]

// Fetch data when the component is mounted
onMounted(async () => {

    // store.dispatch('loadStateFromLocalStorage')

    // const currentUserId = await fetchCurrentUser()
    await fetchCurrentUser()

    // console.log('currentUser.Value Value Value --->', currentUser.value)

    if (currentUser.value) {

        // console.log('Inside if Value Value Value --->', currentUser.value)

        try {
            loading.value = true
            const response = await ContactService.getMichelin()
            
            const contacts = response
            // console.log('vue3 Michelin - data', contacts)

            schools.value = contacts.map(item => item.fields)
            // console.log('vue 3________>>', schools.value)

            people = schools.value

            loading.value = false

        } catch (error) {
            console.log('vue 3 error?', error)
            errorMessage.value = error
            loading.value = false
        }
    }
})

// Helper function

const currentUser = ref(null)

const fetchCurrentUser = async () => {
    const localUser = await supabase.auth.getSession()
    if (localUser.data.session) {
        // User is authenticated
        currentUser.value = localUser.data.session.user.id
    } else {
        console.log('not signed in')
    }
}

// Reactive data
let people = ref([])
let schools = ref([])
const loading = ref(false)
let errorMessage = ref('')

// Expose variables and functions
// return {
//   people,
//   columnsPeople,
//   loading,
//   errorMessage,
// }

</script>