<template>
    <div>
        <div
            class="absolute shadow-md px-5 z-10 w-1/2 h-fit inset-0 left-1/4 top-1/3 rounded-md bg-white bg-opacity-70 text-gray-700">
            <div v-show="loading" class="absolute w-1/2  text-center grid place-items-center left-1/4 top-1/3">
                <div>Logging in...</div>
                <div>
                    <LoadingCircle />
                </div>
            </div>
            <div :class="loading ? 'invisible' : 'visible'" class="undertale">
                <FormKit type="form" submit-label="Login" @submit="submitHandler" message-class="text-red-700 font-bold"
                    :actions="false">
                    <div class="text-2xl my-4 font-medium">Sign In</div>
                    <div class="text-md mb-4">Use email and password to login</div>
                    <FormKit type="text" name="email" placeholder="Email" validation="required|*email"
                        outer-class="mb-4" label-class="block text-sm font-bold mb-2"
                        input-class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        message-class="text-red-700 font-bold" />
                    <FormKit type="password" name="password" placeholder="Password" validation="required|length:3"
                        outer-class="mb-4" label-class="block text-sm font-bold mb-2"
                        input-class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        message-class="text-red-700 font-bold" />

                    <div class="flex items-center justify-between mb-4">
                        <FormKit type="submit" label="Sign In"
                            input-class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 hover:bg-sky-300 rounded-sm bg-sky-800 p-3" />
                    </div>
                </FormKit>
            </div>
            <div class="absolute" v-show="message.length != 0">
                <h2 class="text-xl text-red-500">{{ message }}</h2>
            </div>
        </div>
        <img class="fixed w-full h-[85vh] md:h-screen" src='@/assets/darksoul.gif' />
    </div>
</template>


<script lang="ts">
import API from '@/helpers/api'
import UserSession from '@/helpers/userSession'
import { AuthModel } from '@/models/AuthModel';
import { defineComponent, ref } from 'vue';
import router from '@/router';
import LoadingCircle from '@/components/LoadingCircle/index.vue'
export default defineComponent({
    name: "SignIn",
    components: {
        LoadingCircle
    },
    setup() {
        const message = ref('')
        const loading = ref(false)

        const submitHandler = async (creds: any) => {
            loading.value = true
            const res = await API.post<AuthModel>("auth/login", creds)
            console.log(res)
            if (res) {
                loading.value = false
                if (res.status >= 400) {
                    message.value = res.data.message
                }
                else {
                    const token = (res.data as AuthModel).accessToken
                    API.authorize(token)
                    UserSession.createSession(token)
                    router.push({ path: '/'})
                }
            }
        }
        return {
            loading,
            message,
            submitHandler
        }
    }
})
</script>