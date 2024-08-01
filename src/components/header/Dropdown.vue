<template>
    <button @click="toggleDropdown" id="dropdownDefaultButton"
        class="md:hidden text-white font-medium text-sm px-5 py-2.5 text-center inline-flex items-center" type="button">
        <DropdownIcon />
    </button>
    <div id="dropdown" :class="{ 'hidden': isOpened }"
        class="absolute md:relative place-items-center md:flex md:flex-row-reverse text-center left-0 z-10 divide-y divide-dashed divide-gray-500 md:divide-none">
        <div class="px-4 py-3 justify-center text-center text-sm text-gray-900 dark:text-white flex">
            <div @click="toggleProfileDropdown">
                <img :src="profileSrc" class="rounded-full w-[80px]" />
                <div v-if="width >= 756" id="dropdown" :class="{ 'hidden': isProfileOpened }"
                    class="absolute place-items-center text-center right-0 z-10">
                    <ul 
                        class="py-2 flex flex-col text-sm md:text-xl text-gray-700 bg-gray-500 dark:text-gray-200 rounded">
                        <li>
                            <a href="#"
                                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Profile</a>
                        </li>
                        <li>
                            <a @click="signOut"
                                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign
                                out</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="place-self-center md:hidden">
                <div>Bonnie Green</div>
                <div class="font-medium truncate">name@flowbite.com</div>
            </div>
        </div>
        <ul
            class="py-2 w-[100vw] md:w-[100%] text-sm md:text-xl text-gray-700 dark:text-gray-200 md:grid md:grid-flow-col md:grid-rows-1 md:gap-12">
            <li v-if="width < 756">
                <a @click="signOut" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Profile</a>
            </li>
            <li>
                <a href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">My Games</a>
            </li>
            <li>
                <a href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">About me</a>
            </li>
            <li v-if="width < 756">
                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign
                    out</a>
            </li>
        </ul>
    </div>
</template>
<script setup lang="ts">
import profileSrc from '../../../src/assets/profile.jpg'
</script>
<script lang="ts">
import { defineComponent } from 'vue';
import DropdownIcon from '@/components/svg/DropdownIcon.vue';

export default defineComponent({
    name: "Dropdown",
    components: {
        DropdownIcon,
    },
    data() {
        return {
            isOpened: false,
            isProfileOpened: false,
            width: window.innerWidth
        }
    },
    methods: {
        toggleDropdown() {
            this.isOpened = !this.isOpened
        },
        toggleProfileDropdown() {
            if (this.width > 756) {
                this.isProfileOpened = !this.isProfileOpened
            }
        },
        signOut(){
            return 0
        }

    }
})
</script>