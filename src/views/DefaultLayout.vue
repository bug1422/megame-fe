<template>
    <div>
        <Header />
        <main>
            <router-view />
        </main>
    </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import router from '../router';

onMounted(() => {
  document.title = `MeGame - ${String(router.currentRoute.value.name)} | bug1422`
})
</script>

<script lang="ts">
import Header from '@/components/header/Header.vue';

export default {
    name: 'DefaultLayout',
    components: {
        Header,
    }
}
</script>
