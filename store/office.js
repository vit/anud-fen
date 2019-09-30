
//import axios from 'axios';
//import https from 'https'

export const state = () => ({
//const state = () => ({
    test_data: 'test_data unchanged',
})

export const mutations = {
//const mutations = {
    setTestData (state, data) {
        state.test_data = data;
    },
}

//export const getters = {
//}

export const actions = {
//const actions = {
/*
    async loadInitialData ({ commit, dispatch }) {
        await axios1.get('https://v2.acanud.ru/wp-json/anud/v1/menu/'+'fe_top_menu_1').then((response) => {
            commit('setMenu1', parse_menu_response( response ));
        });
        await axios1.get('https://v2.acanud.ru/wp-json/anud/v1/menu/'+'fe_top_menu_2').then((response) => {
            commit('setMenu2', parse_menu_response( response ));
        });
    },
    async loadPageData ({ commit }, { slug }) {
        await axios1.get('https://v2.acanud.ru/wp-json/wp/v2/pages/?slug='+slug).then((response) => {
          const json_text = response.data[0];
          const raw_page_content = json_text ? json_text.content.rendered : '';
          const raw_page_title = json_text ? json_text.title.rendered : '';

          commit('setPageData', {
            json_text,
            raw_page_content,
            raw_page_title
          })

      });
    },

    initOnClient(context, data) {
    }
*/
}

