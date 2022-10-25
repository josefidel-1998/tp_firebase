<script>
import {AUTH_ERROR_MESSAGES, login} from "../services/auth.js";

export default {
    name: "Login",
    data: () => ({
        user: {
            email: '',
            password: '',
        },
        status: {
            type: 'info',
            text: '',
        }
    }),
    methods: {
        handleSubmit() {
            login({...this.user})
                .then(() => {
                    this.status = {
                        type: 'success',
                        text: 'Sesión iniciada',
                    }
                    this.$router.push('/perfil');
                })
                .catch(err => {
                    
                    this.status = {
                        type: 'danger',
                        text: AUTH_ERROR_MESSAGES[err.code] || err.code,
                    };
                });
        }
    }
};
</script>

<template>
    <section>
        <h1 class="mb-3">Iniciar Sesión </h1>
        <div
            v-if="status.text !== ''"
            :class="['alert', `alert-${status.type || 'info'}`]"
        >{{ status.text }}</div>

        <form action="#" method="post" @submit.prevent="handleSubmit">
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" name="email" id="email" class="form-control" v-model="user.email">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" name="password" id="password" class="form-control" v-model="user.password">
            </div>
            <button type="submit" class="btn btn-primary w-100">Ingresar</button>
        </form>
    </section>
</template>
