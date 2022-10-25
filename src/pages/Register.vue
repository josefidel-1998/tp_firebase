<script>
import {register} from "../services/auth.js";


export default {
    name: "Register",
    
    data: () => ({
        form: {
            email: '',
            password: '',
        },
        status: {
            text: '',
            type: 'success',
        }
    }),
    methods: {
        handleRegister() {
            
            register({...this.form})
                .then(() => {
                    this.status = {
                        text: 'Cuenta creada',
                        type: 'success',
                    }
                })
                .catch(err => {
                    this.status = {
                        type: 'danger',
                        
                    }
                });
        }
    }
};
</script>

<template>
    <section>
        <h2 class="mb-3">Crear una cuenta </h2>
        <p v-if="status.text !== ''" :class="['alert', `alert-${status.type || 'info'}`]">
            {{ status.text }}
        </p>
        <form action="#" method="post"  @submit.prevent="handleRegister">
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input 
                type="email" 
                name="email" 
                id="email" 
                class="form-control" 
                placeholder="minimo 6 caracteres"  
                v-model="form.email">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" name="password" id="password" class="form-control" v-model="form.password" >
            </div>
            <button type="submit" class="btn btn-primary w-100">Crear</button>
        </form>
    </section>
</template>
