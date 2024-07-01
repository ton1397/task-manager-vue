import { defineStore } from 'pinia';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

export const useHttpStore = defineStore('http', {
  actions: {
    httpRequest(
      method = 'GET',
      url: string,
      headers: Record<string, string> = {},
      data: Record<string, any> = {},
      authRoute = false
    ): Promise<any> {
      return new Promise((resolve, reject) => {
        let config: AxiosRequestConfig = {
          method: method,
          url: url,
        };

        if (Object.keys(headers).length > 0) {
          config.headers = headers;
        }

        if (Object.keys(data).length > 0) {
          config.data = data;
        }

        axios(config)
          .then((response: AxiosResponse) => {
            resolve(response.data);
          })
          .catch((error) => {
            if (error.response.status == 401 && authRoute) {
              localStorage.clear();
              location.reload();
              return;
            }
            reject(error);
          });
      });
    },
  },
})