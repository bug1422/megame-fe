<template>
    <div>
        <div
            class="absolute shadow-md px-5 z-10 w-1/2 h-fit inset-0 m-auto mt-[30vh] rounded-md bg-white bg-opacity-70 text-gray-700">
            <FormKit type="form" submit-label="Login" @submit="submitHandler" :form-class="submitted ? 'hide' : 'show'"
                message-class="text-red-700 font-bold" :actions="false">
                <div class="text-2xl mb-4">Sign In</div>
                <div class="text-md mb-4">Use email and password to login</div>
                <FormKit type="text" name="email" placeholder="Email" validation="required|*email" outer-class="mb-4"
                    label-class="block text-sm font-bold mb-2"
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
            <div class="absolute" v-show="message.length != 0">
                <h2 class="text-xl" :class="success ? 'text-green-500' : 'text-red-500'">{{message}}</h2>
            </div>
        </div>
        <img class="fixed w-full h-[85vh] md:h-screen" src='@/assets/darksoul.gif' />
    </div>
</template>


<script lang="ts">
import API, { Response } from '@/helpers/api'
import { AuthModel } from '@/models/AuthModel';
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: "SignIn",
    setup() {
        const message = ref('')
        const success = ref(false)
        const submitHandler = async (creds: any) => {
            message.value = ''
            const res = await API.post<AuthModel>("auth/login", creds)
            console.log(res)
            if (res) {
                if (res.status >= 400) {
                    message.value = res.data.message
                    success.value = false
                }
                else {
                    const token = (res.data as AuthModel).accessToken
                    API.authorize(token)
                    message.value = "Logged in"
                    success.value = true
                }
            }
        }
        return {
            message,
            success,
            submitHandler
        }
    }
})
</script>