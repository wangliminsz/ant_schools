<template>
    <!-- <div class="px-4 sm:px-6 lg:px-8">
        <div class="mt-8 flow-root"> -->
    <div :key="data">
        <div class="flow-root">

            <!-- Table -->

            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">

                    <!-- Search -->

                    <div class="flex justify-start mb-3">
                        <input type="text" class="border border-gray-400 rounded px-2 py-2" placeholder="Search"
                            v-model="filter" />
                    </div>

                    <!-- Search -->

                    <!-- Table Part -->

                    <table class="min-w-full divide-y divide-gray-300">

                        <!-- Table Head -->

                        <thead>
                            <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                                <th v-for="header in headerGroup.headers" :key="header.id" scope="col"
                                    class="border border-solid px-3 py-3.5 text-center text-base font-semibold text-gray-900"
                                    :class="{
                                        'cursor-pointer select-none': header.column.getCanSort(),
                                    }" @click="header.column.getToggleSortingHandler()?.($event)">
                                    <FlexRender :render="header.column.columnDef.header" :props="header.getContext()" />
                                    {{ { asc: ' ↑', desc: '↓' }[header.column.getIsSorted()] }}
                                </th>
                            </tr>
                        </thead>

                        <!-- Table Head -->

                        <!-- Table Body -->

                        <tbody class="divide-y divide-gray-200">
                            <tr class="border border-solid" v-for="row in table.getRowModel().rows" :key="row.id">
                                <td v-for="cell in row.getVisibleCells()" :key="cell.id"
                                    class="border border-solid whitespace-nowrap px-3 py-4 text-base text-gray-700">
                                    <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                                </td>
                            </tr>
                        </tbody>

                        <!-- Table Body -->
                    </table>

                    <!-- Table Part -->
                </div>
            </div>

            <!-- Table -->

            <!-- Page Number -- Total Pages Results -->

            <div class="mt-2">
                Page {{ table.getState().pagination.pageIndex + 1 }} of
                {{ table.getPageCount() }} -
                {{ table.getFilteredRowModel().rows.length }} results
            </div>

            <!-- Page Number -- Total Pages Results -->

            <!-- Button -- Page Size 20 50 100 -->

            <div class="mt-8 space-x-4">
                <button class="border border-gray-300 rounded px-2 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    @click="table.setPageSize(26)">
                    Page Size 26
                </button>
                <!-- <button class="border border-gray-300 rounded px-2 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    @click="table.setPageSize(50)">
                    Page Size 50
                </button> -->
                <button class="border border-gray-300 rounded px-2 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    @click="table.setPageSize(100)">
                    Page Size 100
                </button>
            </div>

            <!-- Button -- Page Size 20 50 100 -->

            <!-- Button -- First Last Prev Next page -->

            <div class="space-x-4 mt-8">
                <button class="border border-gray-300 rounded px-2 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    @click="table.setPageIndex(0)">
                    First page
                </button>
                <button class="border border-gray-300 rounded px-2 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    @click="table.setPageIndex(table.getPageCount() - 1)">
                    Last page
                </button>
                <button class="border border-gray-300 rounded px-2 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    :disabled="!table.getCanPreviousPage()" @click="table.previousPage()">
                    Prev page
                </button>
                <button class="border border-gray-300 rounded px-2 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    :disabled="!table.getCanNextPage()" @click="table.nextPage()">
                    Next page
                </button>
            </div>

            <!-- Button -- First Last Prev Next page -->

        </div>
    </div>
</template>
  

<script setup>

import { defineProps, ref, watch } from 'vue'

const props = defineProps({
    data: Array,
    columns: Array,
})

import {
    useVueTable,
    FlexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
} from '@tanstack/vue-table'

let data = ref(props.data)

// Watch for changes in the data prop
watch(() => props.data, (newData) => {
    data.value = newData
})

console.log('inside table -->', data)
// console.log('inside table raw-->', data._rawValue)

// const data = ref(people)

// const sorting = ref([])
// const sorting = ref([{ id: 'id', desc: true }])
const sorting = ref([{ id: 'id' }])
const filter = ref('')

const table = useVueTable({
    data: data.value,
    columns: props.columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
        get sorting() {
            return sorting.value
        },
        get globalFilter() {
            return filter.value
        },
    },
    onSortingChange: updaterOrValue => {
        sorting.value =
            typeof updaterOrValue === 'function'
                ? updaterOrValue(sorting.value)
                : updaterOrValue
    },
    initialState: {
        pagination: {
            pageSize: 26,
        },
    },
})

// You can perform additional actions here when the data prop changes

</script>