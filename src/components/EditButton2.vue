/* eslint-disable */

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  id_2: Number,
});

</script>

<template>
  <!-- <a :href="`/schoolimgs`" class="text-indigo-600 hover:text-indigo-500">Imgs</a> -->
  <router-link :to="`/schoolimgs/add/${id_2}`" class="btn btn-primary my-1 me-2">
    <i class="fa fa-image"></i>
  </router-link>

</template>