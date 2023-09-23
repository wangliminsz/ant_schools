/* eslint-disable */

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  id_1: Number,
})
</script>

<template>

  <a :href="`michelinhtml/${id_1}`" class="text-indigo-600 hover:text-indigo-500">Html</a>
</template>
