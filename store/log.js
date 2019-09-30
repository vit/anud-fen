
const limit = 20;

export const state = () => ({
    items: [
    ],
})

export const mutations = {
    addLog (state, {title, data}) {
        state.items.unshift( title + ': ' + JSON.stringify(data) );
        state.items = state.items.slice(0, limit);
    },
    clearLog (state) {
        state.items = [];
    },
}

export const getters = {
//    jwtHeader: state => {
//        return state.jwt? JSON.parse(atob(state.jwt.split('.')[0])) : null;
//    },
}

export const actions = {

}