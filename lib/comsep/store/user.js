
//import API from '~/lib/comsep/api';
import API from '../api';
const api = API();

export const state = () => ({
    jwt: null,
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
        state.jwt = !!jwt ? jwt : null;
        if( Cookie ) {
            Cookie.remove('jwt-token');
            if( jwt && rememberMe )
                Cookie.set('jwt-token', jwt)
        }
    },
    dropLoggedUserJWT (state) {
        state.jwt = null;
        Cookie.remove('jwt-token');
    },
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
        return data ?
            (data.fname ? data.fname[0] + '.' : '') + 
            (data.lname ? data.lname[0] + '.' : '')
            : '';
    }
}

export const actions = {
    login(context, {email, password, rememberMe}) {
        return api.user.login({email, password}, (response) => {
            const jwt = response.data ? response.data.token : null;
            context.commit('setLoggedUserJWT', {jwt, rememberMe});
            context.commit('log/addLog', {title: "login", data: response.data}, { root: true })
        });
    },
    register(context, userData) {
        const {rememberMe} = userData;
        return api.user.register(userData, (response) => {
            const jwt = response.data ? response.data.token : null;
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
                jwt = parsed['jwt-token'];
            } catch (err) {
                // No valid cookie found
            }
        }
        commit('setLoggedUserJWT', {jwt});
//        commit('addServerLog', "jwt: "+jwt);
    },


    helloClientInit(context) {
    }

}