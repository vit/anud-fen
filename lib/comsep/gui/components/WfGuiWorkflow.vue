<template>
    <div style="border: thin solid green;">
        <h1 v-if="app_config">{{app_config.office_title}}</h1>

        <div v-for="(qa, ind) in query_answer" v-if="qa && qa.name" :key="ind">
            <div v-if="qa.name=='_workflow_data' && qa.result.ancestors.length > 0" style="-border: thin solid red; padding: 10px;">
                <b>Иерархия</b>:
                    <span v-for="id in (qa.result.ancestors || [])" :key="id">
                        <nuxt-link :to="office_config.helpers.createWorkflowUrl({wf_id: id})">{{id}}</nuxt-link> &gt;
                    </span>
            </div>

            <div v-if="qa.name=='_what_can_i_do'" style="-border: thin solid red; padding: 10px;">
                <h3>Что тут можно сделать</h3>
                <ul style="-margin-left: 20px; -list-style-type: disc;" class="wf-events-list">
                    <li v-for="[event_name, v] in Object.entries(qa.result.events || {})" :key="event_name" sstyle="margin-bottom: 10px;" class="wf-event-item">
                        <span v-if="v.available">
                            <div style="text-align: center;">
                                <nuxt-link class="button is-success iis-info iis-primary" :to="office_config.helpers.createPrepareEventUrl({event_name, wf_id})">{{event_title(v, event_name)}}</nuxt-link>
                            </div>
                            <template v-if="my_drafts_by_event[event_name]">
                                <!--br/-->
                                <span>Есть черновик: {{my_drafts_by_event[event_name].form_fields}}</span>
                            </template>
                        </span>
                        <span v-else style="color: #aaaaaa;">
                            <div style="text-align: center;">
                                <strike class="button iis-info iis-primary" disabled>{{event_title(v, event_name)}}</strike>
                            </div>
                            <template v-if="my_drafts_by_event[event_name]">
                                <!--br/-->
                                <span>Есть черновик: {{my_drafts_by_event[event_name].form_fields}}</span>
                            </template>
                        </span>
                    </li>
                </ul>
            </div>

            <div v-if="qa.name=='_my_workflows' && qa.result.items.length>0" style="-border: thin solid red; padding: 10px;">
                <h3>Мои текущие дела</h3>
                <ul class="wf-events-list">
                    <li v-for="[ind, wf] in Object.entries(qa.result.items)" :key="wf._id" style="margin-bottom: 10px;" class="wf-event-item">
                        <span>
                            <h4>{{wf_type(wf)}}</h4>
                            <p>Название: <b>{{wf.title}}</b></p>
                            <p>Состояние: <b>{{wf.state}}</b></p>
                            <!--p><small>{{wf}}</small></p-->
                            <nuxt-link class="button is-info" :to="office_config.helpers.createWorkflowUrl({wf_id: wf._id})">Перейти</nuxt-link>
                        </span>
                    </li>
                </ul>
            </div>

            <div v-if="qa.name=='_editor_workflows' && qa.result.items.length>0" style="-border: thin solid red; padding: 10px;">
                <h3>Дела редактора</h3>
                <ul class="wf-events-list">
                    <li v-for="[ind, wf] in Object.entries(qa.result.items)" :key="wf._id" style="margin-bottom: 10px;" class="wf-event-item">
                        <span>
                            <h4>{{wf_type(wf)}}</h4>
                            <p>Название: <b>{{wf.title}}</b></p>
                            <p>Состояние: <b>{{wf.state}}</b></p>
                            <p><small>{{wf}}</small></p>
                            <nuxt-link class="button is-info" :to="office_config.helpers.createWorkflowUrl({wf_id: wf._id})">Перейти</nuxt-link>
                        </span>
                    </li>
                </ul>
            </div>

        </div>
    </div>
</template>

<script>

//import API from '../api'
import API from '../../api'
const api = API();

export default {
    components: {
    },
    props: [
        'jwt_token',
        'wf_id',
//        'role_name',
        'office_config',
        'app_config',
//        'queries'
    ],
    data () {
        return {
            query_answer: [],
            my_drafts: [],
            my_drafts_by_event: [],
            schemas_map: {
                "__CONFERENCE_000__:submission": {
                    title: "Поданная статья"
                },
                "__CONFERENCE_000__:registration": {
                    title: "Поданная заявка на участие"
                },
            },
        };
    },
    computed: {
        lang() {
          return this.office_config.lang;  
        },
        role_name() {
            return this.app_config ? this.app_config.role_name : null
        },
        queries() {
            return this.app_config ? this.app_config.queries : null
        },
    },
    methods: {
        loadData() {

            api.rpc({
                jwt_token: this.jwt_token,
                model: 'Workflow',
                proc: 'query',
                args: {
                    meta: {
                        role_name: this.role_name,
                        workflow_id: this.wf_id
                    },
                    query: this.queries,
//                    query: [
//                        '_workflow_data',
//                        '_what_can_i_do',
//                        '_my_workflows'
//                    ],
                }
            }, (data) => {
                console.log("mounted()/getWorkflow", data);
                this.query_answer = data.answer || [];
            })

            api.rpc({
                jwt_token: this.jwt_token,
                model: 'EventForm',
                proc: 'list_my_event_forms',
                args: {form_meta: {
                        role_name: this.role_name,
                    // where writes
                        workflow_id: this.wf_id,
                //        event_name: this.event_name,
                    // what writes
                //        form_name: this.form_name
                }}
            }, (data) => {
                console.log("list_my_event_forms()", data);
                this.my_drafts = data && data.answer ? data.answer : [];
                this.my_drafts_by_event = this.my_drafts.reduce(
                    (acc, item)=>{
                        acc[item.form_key.event_name] = item;
                        return acc;
                    },
                    {}
                );
            })
        },
        event_title(v, name) {
            return v && v.title ? v.title[this.lang] : name;
        },
        wf_type(wf) {
            return wf && wf.app && this.schemas_map && this.schemas_map[wf.app] ? this.schemas_map[wf.app].title : ''
        }
    },
    mounted() {
        this.loadData();
    },
    watch: {
        'wf_id'() {
            this.loadData();
        }
    },

}
</script>

<style lang="scss" scoped>
.wf-events-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
//    align-items: stretch;
//    align-items: flex-start;
}
.wf-event-item {
    flex-grow: 1;
    flex-shrink: 1;
//    margin-bottom: 10px;
    margin: 10px;
//    margin: 2%;
    padding: 10px;
    -max-width: 50%;
    -border: thin solid green;
    background-color: #eeeeee;
    -text-align: center;
}
</style>