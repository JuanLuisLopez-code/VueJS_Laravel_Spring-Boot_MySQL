import axios from 'axios'

export default (URL) => {

    const api = axios.create({
        baseURL: URL
    })

    return api
}