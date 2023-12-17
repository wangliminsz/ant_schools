/* eslint-disable */

<script setup>

import { defineProps } from 'vue';

const props = defineProps({
  id: Number,
})

</script>

<template>
  <!-- <a :href="`/schooltable/${id}/edit`" class="text-indigo-600 hover:text-indigo-500">Edit</a> -->
  <router-link :to="`/schooltable_pattaya/edit/${id}`" class="btn btn-primary my-1 me-2">
    <i class="fa fa-pen"></i>
  </router-link>
</template>


<!-- <router-link :to="`/contacts/edit/${contact.fields.id}`"
                                        class="btn btn-primary my-1 me-2">
                                        <i class="fa fa-pen"></i>
                                    </router-link> -->
