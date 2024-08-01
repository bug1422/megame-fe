<template>
    <div class="bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-row flex-nowrap py-3 place-items-center h-[10vh]">
        <div class="basis-1/3 ps-[1%] sm:ps-[10%] flex flex-nowrap" 
        v-on:click="() => {
            router.push({ path: '/' })
        }">
            <img :src="imgSrc" class="object-fit w-10 sm:w-14 me-2" />
            <div class="md:text-3xl place-self-center text-white">
                MeGame
            </div>
        </div>
        <div class="basis-2/3 flex flex-row-reverse pe-[8%]">
            <div v-if="test">
                <ul
                    class="py-2 text-sm md:text-xl text-gray-700 dark:text-gray-200 grid grid-flow-col grid-rows-1 gap-12">
                    <li>
                        <div v-on:click="() => {
                            router.push({ path: '/auth/signin' })
                        }" class="block px-4 py-2 hover:text-rose-900 hover:bg-yellow-300 text-white rounded-md">
                            Sign In
                        </div>
                    </li>
                    <li>
                        <div v-on:click="() => {
                            router.push({ path: '/auth/signup' })
                        }" class="block px-4 py-2 hover:text-rose-900 hover:bg-yellow-300 text-white rounded-md">
                            Sign Up
                        </div>
                    </li>
                </ul>
            </div>
            <div v-else>
                <Dropdown />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import imgSrc from '@/assets/logo.png'

</script>

<script lang="ts">
import { defineComponent } from 'vue';
import Dropdown from './Dropdown.vue';
import router from '@/router';
export default defineComponent({
    name: "PageHeader",
    data() {
        return {
            test: true
        }
    },
    components: {
        Dropdown
    }
})
</script>