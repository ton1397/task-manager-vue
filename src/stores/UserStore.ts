import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        nome: '',
        email: ''
    }),
    actions: {
        setNome(nome: string) {
            this.nome = nome
        },

        setEmail(email: string) {
            this.email = email
        }
    }
})
