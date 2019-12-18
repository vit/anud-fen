
import axios from 'axios';
//import API from '../api';
//const api = API();

export const state = () => ({
    currentContext: null,
    currentLibItem: null
})

export const mutations = {
    setCurrentContext (state, data) {
        state.currentContext = data;
    },
    setCurrentLibItem (state, data) {
        state.currentLibItem = data;
    },
}

export const getters = {
    currentContextId: state => {
        return state.currentContext ? state.currentContext.id : null;
    },
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

}