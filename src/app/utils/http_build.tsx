import axios from "axios"


const base_url = process.env.NEXT_PUBLIC_PRODUCT_APP
const user = process.env.NEXT_PUBLIC_PRODUCT_APP_USER
const password = process.env.NEXT_PUBLIC_PRODUCT_APP_PASS


export const request = axios.create({
    baseURL: base_url,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    auth: {
        username: user!,
        password: password!
    }
})

