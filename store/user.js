
import axios from 'axios';

export const state = () => ({
    jwt: null,
//    jwt: (process.browser && localStorage && localStorage.getItem) ? localStorage.getItem("jwt-token") : null,
    serverLog: []
})

const Cookie = process.client ? require('js-cookie') : undefined
const cookieparser = process.server ? require('cookieparser') : undefined

const atob = require('atob');

export const mutations = {
    addServerLog (state, s) {
        state.serverLog.push(s);
    },

    setLoggedUserJWT (state, {jwt, rememberMe}) {
        //localStorage.removeItem("jwt-token");
        state.jwt = !!jwt ? jwt : null;
        if( Cookie ) {
            Cookie.remove('jwt-token');
            if( jwt && rememberMe )
                //localStorage.setItem("jwt-token", jwt);
                Cookie.set('jwt-token', jwt)
        }
    },
    dropLoggedUserJWT (state) {
        state.jwt = null;
        //localStorage.removeItem("jwt-token");
        Cookie.remove('jwt-token');
    },
/*
    loadFromStorageLoggedUserJWT (state) {
        const jwt = localStorage.getItem("jwt-token");
        if(jwt)
            state.jwt = jwt;
    },
*/
}

export const getters = {
    jwtHeader: state => {
        return state.jwt? JSON.parse(atob(state.jwt.split('.')[0])) : null;
    },
    jwtData: state => {
        return state.jwt? JSON.parse(atob(state.jwt.split('.')[1])) : null;
    },
    data: (state, getters) => {
        return getters.jwtData ? getters.jwtData.user : null;
    },
    fullName: (state, getters) => {
        const data = getters.data;
//        return data && data.name ?
//            (data.name.fname ? data.name.fname + ' ' : '') + 
//            (data.name.mname ? data.name.mname + ' ' : '') + 
//            (data.name.lname ? data.name.lname + ' ' : '')
        return data ?
            (data.fname ? data.fname + ' ' : '') + 
            (data.mname ? data.mname + ' ' : '') + 
            (data.lname ? data.lname + ' ' : '')
            : '';
    },
    id: (state, getters) => {
        const data = getters.data;
        return data ? data.id : null;
    },
    initials: (state, getters) => {
        const data = getters.data;
//        return data && data.name ?
//            (data.name.fname ? data.name.fname[0] + '.' : '') + 
//            (data.name.lname ? data.name.lname[0] + '.' : '')
        return data ?
            (data.fname ? data.fname[0] + '.' : '') + 
            (data.lname ? data.lname[0] + '.' : '')
            : '';
    }
}

export const actions = {
    login(context, {email, password, rememberMe}) {
        return axios.post(process.env.COMSEP_API_URL+'/auth/login', {email, password}).then((response) => {
            const jwt = response.data ? response.data.token : null;
            context.commit('setLoggedUserJWT', {jwt, rememberMe});
            context.commit('log/addLog', {title: "login", data: response.data}, { root: true })
        });
    },
//    register(context, {email, password, repeat_password, rememberMe}) {
//        console.log("register()", {email, password, repeat_password, rememberMe});
//        return axios.post(process.env.COMSEP_API_URL+'/auth/register', {email, password, repeat_password}).then((response) => {
    register(context, userData) {
        console.log("register()", userData);
        const {rememberMe} = userData;
        return axios.post(process.env.COMSEP_API_URL+'/auth/register', userData).then((response) => {
            const jwt = response.data ? response.data.token : null;
            console.log("jwt", jwt);
            context.commit('setLoggedUserJWT', {jwt, rememberMe});
            context.commit('log/addLog', {title: "register", data: response.data}, { root: true })
        });
    },
    logout(context, data) {
        context.commit('dropLoggedUserJWT')
    },



    async loadInitialData({ commit }, { req }) {
        let jwt = null
        commit('addServerLog', "cookie: "+req.headers.cookie);
        if (req.headers.cookie) {
            const parsed = cookieparser.parse(req.headers.cookie)
            try {
//                jwt = JSON.parse( parsed['jwt-token'] )
                jwt = parsed['jwt-token'];
            } catch (err) {
                // No valid cookie found
            }
        }
        commit('setLoggedUserJWT', {jwt});
//        commit('addServerLog', "jwt: "+jwt);
    },



    helloClientInit(context) {
//        context.commit('loadFromStorageLoggedUserJWT')
    }
/*
    initOnClient(context, data) {
        try {
            if(!process.server && !!window) {
                context.commit('loadFromStorageLoggedUserJWT')
            }
        }
        catch(e) {
            //console.log(e)
        }
    }
*/

}