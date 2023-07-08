import axios from 'axios';
import Toastify from "toastify-js";


const http = axios.create({
    baseURL: '/', // Replace with your API base URL
    timeout: 30000,
});


// Request interceptor
http.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        Toastify({
            text: 'خطا در برقراری ارتباط با سرور',
            className: "font-extrabold text-md",
            duration: 5000,
            newWindow: true,
            gravity: "top", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "red",
                borderRadius: "1rem",
                padding: "1rem",
            },
        }).showToast();
        return Promise.reject(error);
    }
);
// End of Request interceptor



// Response interceptor
http.interceptors.response.use(
    (response) => {
        if (response?.data?.code) {
            let errorText = '';
            switch (response.data.code) {
                case "P2002":
                    errorText = 'این رکورد قبلا ثبت شده است'
                    break;
                case "P2023":
                    errorText = 'اطلاعاتی یافت نشد'
                    break;
                    default:
                    errorText = 'اطلاعاتی یافت نشد'
                    break;
            }
            Toastify({
                text: errorText,
                className: "font-extrabold text-md",
                duration: 5000,
                newWindow: true,
                gravity: "top", // `top` or `bottom`
                position: "left", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "red",
                    borderRadius: "1rem",
                    padding: "1rem",
                },
            }).showToast();
            return Promise.reject(response?.data);
        }
        return response?.data;
    },
    ((error) => {
        Toastify({
            text: error.response?.statusText + '-' + error.response?.status || 'خطا در ارتباط با سرور',
            className: "font-extrabold text-md",
            duration: 5000,
            newWindow: true,
            gravity: "top", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "red",
                borderRadius: "1rem",
                padding: "1rem",
            },
        }).showToast();
        return Promise.reject(error);
    })
)
// End of Response interceptor

export default http;
