
import axios from 'axios';

const user = function({base_url}) {
    return {
        login({email, password}, cb) {
            return axios.post(base_url+'/auth/login', {email, password}).then((response) => {
                if(cb)
                    cb(response);
            });
        },
        register(userData, cb) {
            return axios.post(base_url+'/auth/register', userData).then((response) => {
                if(cb)
                    cb(response);
            });
        }
    }
}

const workflow = function({base_url}) {
    return {
        query({jwt_token, meta, event, query}, cb) {
            const config = {
                headers: {}
            };
            if(jwt_token) {
                config.headers['authorization'] = "Bearer "+jwt_token
            }
            return axios.post(base_url+'/wf/query', {event, query, meta}, config).then((response) => {
                if(cb && response)
                    cb(response.data);
            });
        },
    }
}


const API = function({base_url} = {}) {
    if( !base_url )
        base_url = process.env.COMSEP_API_URL;
    return {
        user: user({base_url}),
        workflow: workflow({base_url})
    };
};

export default API;
