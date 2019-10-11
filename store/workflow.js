
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
}

export const actions = {

    async loadCurrentContextData ({ commit, dispatch, getters, rootState, rootGetters, state }, {route}) {
        const context_name = rootGetters['wp/getCurrentComsepContextName'];
        await axios.post(process.env.COMSEP_API_URL+'/wf/getContextData', {context_name}).then(async (response) => {
            const data = response.data;
            commit('setCurrentContext', data.reply);
            if( state.currentContext && state.currentContext.workflow && state.currentContext.workflow.app=='__LIBRARY__' ) {
                const id = route.query.id;
                await axios.get(process.env.COMSEP_API_URL+'/wf/getLibItem?id='+(id ? id : '')).then((response) => {
                    const data = response.data;
                    commit('setCurrentLibItem', data.reply);
                });
            }
        });
    },


    getWfData(context, {id, rememberMe}) {
        return axios.post(process.env.COMSEP_API_URL+'/wf/get', {id}).then((response) => {
            const data = response.data;
            context.commit('setCurrentWfData', data);
        });
    },

    sendEvent(context, {id, role, name, payload}) {
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
        return axios.post(process.env.COMSEP_API_URL+'/wf/getList', {}).then((response) => {
            const data = response.data;
            context.commit('setWfList', data.reply);
        });
    },

    getSchema(context, {id}) {
        return axios.post(process.env.COMSEP_API_URL+'/wf/getSchema', {id}).then((response) => {
            const data = response.data;
            context.commit('setWfSchema', data.reply);
        });
    },

}