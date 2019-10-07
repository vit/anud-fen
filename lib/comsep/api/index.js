
import axios from 'axios';


const API = function({base_url}) {
    if( !base_url )
        base_url = process.env.COMSEP_API_URL;
    return {
        user: {
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
            },

        }
    };
};

export default API;
