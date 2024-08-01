<template>
  <div class="home">
    <Suspense>
      <TimeBanner />
    </Suspense>
    <Suspense>
      <AllGame />
    </Suspense>
  </div>
</template>

<script lang="ts">
import TimeBanner from "@/components/home/TimeBanner.vue";
import AllGame from "@/components/home/AllGame.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
  components: {
    TimeBanner,
    AllGame
  }
});
</script>
