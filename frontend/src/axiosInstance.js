import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "/api",
    headers: { 'content-type': 'application/json' }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("task_management_token");;
        config.headers.Authorization = token
            ? `${token}`
            : "";
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


axiosInstance.interceptors.response.use(
    (response) => Promise.resolve(response?.data),
    async (error) => {
        if (!error.response) {
            return Promise.reject(error);
        } else if (error.response.status === 401) {
            return new Promise(function (resolve, reject) {
                const newConfig = error.config;
                const token = localStorage.getItem("task_management_token");
                newConfig.headers.Authorization = token
                    ? `${token}`
                    : "";
                axios(newConfig)
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        } else {
            return Promise.reject(error?.response?.data);
        }
    }
);

export default axiosInstance;
