import axios from 'axios';

const api = axios.create({
    baseURL: `${process.env.VUE_APP_BACKEND_BASE_URL}`,

    withCredentials: true,
})

const Devices = {
    resource: 'devices',

    get_all_devices(){
        
        return api.get(`/${this.resource}`);
    },

    get_device_by_id(id){
        return api.get(`/${this.resource}/${id}`)
    },

    add_device(json){
        return api.post(`/${this.resource}`, json);
    }
}

const Authentication = {
    login(data){
        return api.post(`/login`, data)
    },
    register(data){
        return api.post(`/register`, data)
    },
    secure(data){
        return api.get(`/secure`, data)
    },
    logout(){
        return api.get('/logout')
    }
}

export { api, Devices, Authentication}