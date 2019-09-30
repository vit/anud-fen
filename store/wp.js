
import axios from 'axios';
import https from 'https'

const axios1 = axios.create({
  httpsAgent: new https.Agent({  
    rejectUnauthorized: false
  })
})

export const state = () => ({
    menu_data_1: [],
    menu_data_2: [],
    page_data: null,

    path_info: { items_before: [], items_after: [] },

    menus: {
        journal: [
        ]
    }
})

export const mutations = {
    setMenu1 (state, data) {
        state.menu_data_1 = data;
    },
    setMenu2 (state, data) {
        state.menu_data_2 = data;
    },
    setPageData (state, data) {
        state.page_data = data;
    },
    setPathInfo (state, data) {
        state.path_info = data;
    },
}

export const getters = {
    getCurrentSidebarMenu(state) {
//        return parse_menu_data( [...state.page_data.post.sidebar_menu] );
        return parse_menu_data(
            state.page_data && state.page_data.path_meta && state.page_data.path_meta.sidebar_menu ?
            JSON.parse(
                JSON.stringify( state.page_data.path_meta.sidebar_menu )
            ) : []
        );
//        return state.page_data.post.sidebar_menu;
    },
    getCurrentComsepContextName(state) {
//        return state.page_data && state.page_data.path_meta ? state.page_data.path_meta.comsep_context_name : null;
        return state.page_data && state.page_data.path_meta ? state.page_data.path_meta.comsep_context_name : 123;
    },
    getCurrentComsepContextPath(state) {
        return state.page_data && state.page_data.path_meta ? state.page_data.path_meta.comsep_context_path : null;
    },
    getPageTitle(state) {
//        return state.page_data && state.page_data.post && state.page_data.post.title ? state.page_data.post.title.rendered : '';
        return state.page_data && state.page_data.post && state.page_data.post.title && state.page_data.post.title.raw ? state.page_data.post.title.raw : '';
    },
    getEventData(state) {
        let result = null;
        if( state.page_data && state.page_data.post && state.page_data.post.meta ) {
            const meta = state.page_data.post.meta;
            const startDate = meta._EventStartDate && meta._EventStartDate instanceof Array  && meta._EventStartDate[0] ? new Date(meta._EventStartDate[0]) : null;
            const endDate = meta._EventEndDate && meta._EventEndDate instanceof Array  && meta._EventEndDate[0] ? new Date(meta._EventEndDate[0]) : null;
            const startDateString = startDate ? startDate.toLocaleDateString() : null;
            const endDateString = endDate ? endDate.toLocaleDateString() : null;
            if( startDate || startDateString || endDate || endDateString )
                result = {startDate, startDateString, endDate, endDateString};
        }
        return result;
    },

//    getPageData(state) {
//        return state.page_data;
//    },
//    getPathSidebarMenu(state) {
//      return state.page_data && state.page_data.path_meta ? state.page_data.path_meta.sidebar_menu : null;
//    }


}

export const actions = {

    async loadInitialData ({ commit, dispatch }) {
//        const base_url = 'https://v2.acanud.ru/wp-json/anud/v1/menu/';
        const menu_base_url = process.env.ANUD_BASE_URL+'/wp-json/anud/v1/menu/';
//        await axios1.get(menu_base_url + 'fe_top_menu_1').then((response) => {
        await axios1.get(menu_base_url + process.env.ANUD_WP_TOP_MENU_1).then((response) => {
            commit('setMenu1', parse_menu_data( response.data ));
        });
//        await axios1.get(menu_base_url + 'fe_top_menu_2').then((response) => {
        await axios1.get(menu_base_url + process.env.ANUD_WP_TOP_MENU_2).then((response) => {
            commit('setMenu2', parse_menu_data( response.data ));
        });
    },
    async loadPageData ({ commit }, { slug }) {
        await axios1.get(process.env.ANUD_BASE_URL+'/wp-json/wp/v2/pages/?slug='+slug).then((response) => {
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
    async loadPageDataByPath ({ commit }, { path }) {
        const route_base_url = process.env.ANUD_BASE_URL+"/wp-json/anud/v1/route/";
//        const route_base_url = process.env.ANUD_BASE_URL+"/wp-json/anud/v1/route_raw/";
//        console.log("route_base_url", route_base_url);
        await axios1.get(route_base_url+'?path='+path).then((response) => {
            commit('setPageData', response.data ? response.data : null);
        });
    },

    initOnClient(context, data) {
    }

}

function parse_menu_data( menu_items ) {
    const menu_data = [];
    const menu_map = {};
    if(menu_items) {
        menu_items.forEach( (item) => {
            const data = item;
            data.children = [];
            data.url = url_to_link(data.url);
            if(item.menu_item_parent > 0) {
                menu_map[item.menu_item_parent].children.push(data);
            } else {
                menu_data.push(data);
                menu_map[item.ID] = data;
            }
        });
    }
    return menu_data;
};

//const url_prefix = 'https://acanud.ru';
const url_prefix = process.env.ANUD_BASE_URL;
function url_to_link(url) {
    return url ? url.replace(url_prefix, '') : "";
}


