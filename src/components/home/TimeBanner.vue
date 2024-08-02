<template>
    <div class="absolute z-10 w-full">
        <div class="mt-4 ms-4 text-xl font-medium undertale flex flex-col">
            <div class="">
                {{ date }}
            </div>
            <div class="">
                {{ time }}
            </div>
        </div>
        <div class="flex flex-col text-center undertale mt-4">
            <div
                class="text-5xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400">
                MeGame</div>
            <div class="text-2xl text-amber-500">
                Don't know what to put in yet
            </div>
        </div>
    </div>
    <div class="w-[100vw] min-h-[80vh]">
        <!-- <Background :isDay="isDay"/> -->
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
// import Background from './Background.vue';
export default defineComponent({
    name: "TimeBanner",
    setup() {
        const date = ref<string>(new Date().toLocaleDateString());
        const time = ref<string>(new Date().toLocaleTimeString());
        const isDay = ref<boolean>(false);
        return {
            date,
            time,
            isDay
        }
    },
    components: {
        // Background
    },
    created() {
        setInterval(() => {
            this.getTime()
        }, 1000)
    },
    methods: {
        getTime() {
            var date = new Date()
            this.date = date.toLocaleDateString()
            this.time = date.toLocaleTimeString()
            this.isDay = date.getHours() < 18
        },
        setDayNight() {
            this.isDay = !this.isDay
            console.log(this.isDay)
        }
    }
})
</script>
