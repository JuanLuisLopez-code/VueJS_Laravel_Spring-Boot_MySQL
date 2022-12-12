import axios from 'axios'

export default (URL) => {

    const api = axios.create({
        baseURL: URL
    })

    const token = localStorage.getItem('token');
    if (token) {
        api.defaults.headers.common.Authorization = `Bearer ${token}`
    }//add token to header


    api.interceptors.response.use(
        (response) => response,
        (error) => {
            console.log(error)
            if (error.response.status === 401) {
                localStorage.removeItem('token')
                // localStorage.removeItem('user')
                // store.dispatch("user/" + Constant.USER_REMOVE, {
                //     succes: true,
                // });
                // router.push({ name: "signin" });
            }
            return Promise.reject(error)
        }//end if
    );//response interceptor remove token and user when unauthorized

    return api
}