
import axios from 'axios';

export const state = () => ({
    data: null,
    id: null,
    wfList: null,
    wfSchema: null,
    currentContext: null,
    currentLibItem: null
})

export const mutations = {
    setCurrentWfData (state, data) {
        state.data = data;
//        state.id = data.id;
    },
    setWfList (state, data) {
        state.wfList = data;
    },
    setWfSchema (state, data) {
        state.wfSchema = data;
    },
    setCurrentContext (state, data) {
        state.currentContext = data;
    },
    setCurrentLibItem (state, data) {
        state.currentLibItem = data;
    },
}

export const getters = {
/*
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
        return data && data.name ?
            (data.name.fname ? data.name.fname + ' ' : '') + 
            (data.name.mname ? data.name.mname + ' ' : '') + 
            (data.name.lname ? data.name.lname + ' ' : '')
            : '';
    },
    initials: (state, getters) => {
        const data = getters.data;
        return data && data.name ?
            (data.name.fname ? data.name.fname[0] + '.' : '') + 
            (data.name.lname ? data.name.lname[0] + '.' : '')
            : '';
    }
*/
}

export const actions = {

    async loadCurrentContextData ({ commit, dispatch, getters, rootState, rootGetters, state }, {route}) {
        const context_name = rootGetters['wp/getCurrentComsepContextName'];
        await axios.post(process.env.COMSEP_API_URL+'/wf/getContextData', {context_name}).then(async (response) => {
            const data = response.data;
            commit('setCurrentContext', data.reply);
            if( state.currentContext && state.currentContext.workflow && state.currentContext.workflow.app=='__LIBRARY__' ) {
//            if( data.reply && data.reply.workflow && data.reply.workflow.app=='__LIBRARY__' ) {
                const id = route.query.id;
//                const id = '5d87f28caa2d242505585229';
//                await axios.get(process.env.COMSEP_API_URL+'/wf/getLibItem', {id: null}).then((response) => {
                await axios.get(process.env.COMSEP_API_URL+'/wf/getLibItem?id='+(id ? id : '')).then((response) => {
                    const data = response.data;
                    commit('setCurrentLibItem', data.reply);
//                    commit('setCurrentLibItem', {qqq: 'www'});
                });
            }
        });
    },


    getWfData(context, {id, rememberMe}) {
//        return axios.post('https://nc-beff.bigbrowser.ru/wf/get', {id}).then((response) => {
        return axios.post(process.env.COMSEP_API_URL+'/wf/get', {id}).then((response) => {
            const data = response.data;
            context.commit('setCurrentWfData', data);
        });
    },

    sendEvent(context, {id, role, name, payload}) {
//        return axios.post('https://nc-beff.bigbrowser.ru/wf/send', {
        return axios.post(process.env.COMSEP_API_URL+'/wf/send', {
            id,
            role,
            name,
            payload
        }).then((response) => {
                const data = response.data;
                context.commit('setCurrentWfData', data);
                context.dispatch('getList', data);
//                context.dispatch('getSchema', data);
                context.dispatch('getSchema', {id});
        });
    },

    sendPing(context, {id, payload}) {
//        return axios.post('https://nc-beff.bigbrowser.ru/wf/send', {
        return axios.post(process.env.COMSEP_API_URL+'/wf/send', {
            id,
            role: 'admin',
            name: 'toggle',
            payload
        }).then((response) => {
                const data = response.data;
                context.commit('setCurrentWfData', data);
                context.dispatch('getList', data);
//                context.dispatch('getSchema', data);
                context.dispatch('getSchema', {id});
        });
    },

    getList(context, {}) {
//        return axios.post('https://nc-beff.bigbrowser.ru/wf/getList', {}).then((response) => {
        return axios.post(process.env.COMSEP_API_URL+'/wf/getList', {}).then((response) => {
            const data = response.data;
            context.commit('setWfList', data.reply);
        });
    },

    getSchema(context, {id}) {
//        return axios.post('https://nc-beff.bigbrowser.ru/wf/getSchema', {id}).then((response) => {
        return axios.post(process.env.COMSEP_API_URL+'/wf/getSchema', {id}).then((response) => {
            const data = response.data;
            context.commit('setWfSchema', data.reply);
        });
    },

}