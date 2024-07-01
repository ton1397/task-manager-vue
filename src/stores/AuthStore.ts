import { defineStore } from 'pinia'
import { useHttpStore } from './HttpStore'
import { AxiosError } from 'axios'



export const useAuthStore = defineStore('auth', {
    actions: {
        logout(): Promise<void | AxiosError> {
            return new Promise((resolve, reject) => {
                let http = useHttpStore()

                http.httpRequest(
                    'POST',
					`${import.meta.env.VITE_API_URL}/logout`,
                    {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    },
                    {},
                    true
                ).then(() => {
                    resolve()
                }).catch((error: AxiosError) => {
                    reject(error)
                })
            })
        }
    }
})
