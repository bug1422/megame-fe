<template>
    <div>
        <div
            class="absolute shadow-md px-5 z-10 w-1/2 h-fit inset-0 left-1/4 top-1/4 rounded-md bg-white bg-opacity-70 text-gray-700">
            <div v-show="loading" class="absolute w-1/2  text-center grid place-items-center left-1/4 top-1/3">
                <div>Logging in...</div>
                <div>
                    <LoadingCircle />
                </div>
            </div>
            <div :class="loading ? 'invisible' : 'visible'" class="undertale">
                <FormKit type="form" submit-label="Login" @submit="submitHandler"
                    :form-class="message.length != 0 ? 'hide' : 'show'" message-class="text-red-700 font-bold"
                    :actions="false">
                    <div class="text-2xl my-4 font-medium">Sign Up</div>
                    <div class="text-md mb-4">Fill in the form to sign up</div>

                    <FormKit type="text" name="userName" placeholder="UserName" validation="required|length:5"
                        value="Nguyen Van A" outer-class="mb-4" label-class="block text-sm font-bold mb-2"
                        input-class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        message-class="text-red-700 font-bold" />

                    <FormKit type="text" name="email" placeholder="Email" validation="required|*email"
                        outer-class="mb-4" value="abc@gmail.com" label-class="block text-sm font-bold mb-2"
                        input-class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        message-class="text-red-700 font-bold" />

                    <div class="formkit-outer mb-4" data-family="text" data-type="text" data-empty="true"
                        data-invalid="true">
                        <div class=" ">
                            <div class="formkit-inner">
                                <select placeholder="Gender" :value="gender" @change="(e: any) => {
                                    gender = e.target.value
                                }" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm sm:max-w-xs sm:text-sm sm:leading-6"
                                    name="Gender" autocomplete="sex" id="input_49">
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <FormKit type="password" name="password" placeholder="Password" validation="required|length:3"
                        value="123" outer-class="mb-4" label-class="block text-sm font-bold mb-2"
                        input-class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        message-class="text-red-700 font-bold" validation-visibility="live" />

                    <FormKit type="password" name="password_confirm" placeholder="Confirm Password" value="123"
                        validation="required|confirm" outer-class="mb-4" label-class="block text-sm font-bold mb-2"
                        input-class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        message-class="text-red-700 font-bold" validation-visibility="live" />

                    <div class="flex items-center justify-between mb-4">
                        <FormKit type="submit" label="Sign In"
                            input-class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 hover:bg-sky-300 rounded-sm bg-sky-800 p-3" />
                    </div>
                </FormKit>
            </div>

            <div class="absolute" v-show="message.length != 0">
                <h2 class="text-xl" :class="success ? 'text-green-500' : 'text-red-500'">{{ message }}</h2>
            </div>
        </div>
        <img class="fixed w-full h-[85vh] md:h-screen" src='@/assets/darksoul.gif' />
    </div>
</template>

<script lang="ts">
import API from '@/helpers/api'
import UserSession from '@/helpers/userSession'
import router from '@/router';
import { AuthModel } from '@/models/AuthModel';
import { defineComponent, ref, shallowRef } from 'vue';
export default defineComponent({
    name: "SignUp",
    setup() {
        const message = ref('')
        const success = ref(false)
        const gender = shallowRef('Male')
        const loading = ref(false)
        const submitHandler = async (creds: any) => {
            loading.value = true
            console.log(creds)
            console.log(gender.value)
            message.value = ''
            const res = await API.post<AuthModel>("auth/signup", {
                email: creds.email,
                userName: creds.userName,
                gender: gender.value,
                password: creds.password
            })
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
                    router.push({ path: '/' })
                }
            }
        }

        return {
            message,
            success,
            gender,
            loading,
            submitHandler
        }
    }
})
</script>