<script>
import {saveChatMessage, subscribeToChatMessages} from "../chat/chat.js";
import {subscribeToAuthChanges} from '../services/auth'
import {dateToString} from "../helpers/date.js";
import Loader from "../components/Loader.vue";
import LoadingContext from "../components/LoadingContext.vue";


export default {
    name: "Chat",
    components: {LoadingContext, Loader},

    
    data: () => ({
        messages: [],
        newMessage: {
            //name: '',
            text: '',
        },
        user: {
            id: null,
            email: null,
            displayName: null
        },
        messagesLoaded: false,
        unsubscribeFunction: () => {},
        unsubscribeAuthFunction: () => {},
        
    }),
    methods: {
        
        dateToString,
        
        save() {
            
            saveChatMessage({
                ...this.newMessage,
                name: this.user.displayName || this.user.email
            });
            this.newMessage.text = "";
        },
    },
    mounted() {
        
        this.unsubscribeFunction = subscribeToChatMessages(newMessages => {
            
            this.messages = newMessages;
            this.messagesLoaded = true;
        });
        this.unsubscribeAuthFunction = subscribeToAuthChanges(newUserData => this.user = newUserData);
    },
    unmounted() {
        this.unsubscribeFunction();
        this.unsubscribeAuthFunction();
    }
};
</script>

<template>
    <section>
        <h1 class="mb-3">Chateá con nosotros</h1>

        <div class="row">
            <div class="col-8">
                <h2>Sala de Chat</h2>
                <div id="messages">
                    <LoadingContext :loading="!messagesLoaded">
                        <ul>
                            <li
                                v-for="message in messages"
                                :key="message.id"
                            >
                                <b>({{ dateToString(message.created_at) }}) {{ message.name }} dijo</b>: {{ message.text }}
                            </li>
                        </ul>
                    </LoadingContext>
                  
                </div>
            </div>
            <div class="col-4">
                <h2>Enviá un mensaje</h2>
                <form
                    action="#"
                    method="post"
                    id="form-chat"
                    @submit.prevent="save"
                >
                    <div class="mb-3">
                        <h3>Nombre</h3>
                        <p>{{user.displayName || user.email}}</p>
                    </div>
                    <div class="mb-3">
                        <label for="text" class="form-label">Mensaje</label>
                        <textarea
                            id="text"
                            class="form-control"
                            v-model="newMessage.text"
                        ></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Enviar</button>
                </form>
            </div>
        </div>
    </section>
</template>
