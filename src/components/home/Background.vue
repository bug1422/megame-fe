<template>
        <TresCanvas ref="canvasRef" clear-color='#9be8ff'>
            <TresPerspectiveCamera ref="cameraRef" :position="[-7, 10, 0]" :look-at="[5, 5, 0]" />
            <TresGroup ref="groupRef" :position="[5, 1, 0]">
                <Suspense>
                    <primitive :object="model" />
                    <!-- <GLTFModel ref="objectRef" :path="url" draco=""/> -->
                </Suspense>
            </TresGroup>
            <TresAmbientLight color="#FFFFFF" :intensity="1" />
            <TresBoxGeometry :args="[1.5, 1.5, 1.5]" />
            <TresDirectionalLight color="#fffeb5" :position="[1, 1, 0]" :intensity="5" />
        </TresCanvas>
</template>
<script setup lang="ts">
import { shallowRef } from 'vue';
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { useGLTF } from '@tresjs/cientos'
const { scene: model, animations } = await useGLTF('/models/scenery.glb')

const { onLoop } = useRenderLoop()
const cameraRef = shallowRef()
const groupRef = shallowRef()
const canvasRef = shallowRef()



onLoop(({ delta, elapsed }) => {
    if (cameraRef.value) {
        // cameraRef.value.rotation.y += 30 * delta * delta
    }
    if (groupRef.value) {
        groupRef.value.rotation.y += 30 * delta * delta
    }
})
</script>
<script lang="ts">

export default {
    name: 'Background',
    props: {
        isDay: Boolean
    },
    components: {

    },
    methods: {

    }
}
</script>
