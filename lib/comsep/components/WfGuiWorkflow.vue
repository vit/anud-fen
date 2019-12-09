<template>
    <div style="border: thin solid green;">
        <h1>Workflow GUI</h1>
        <div v-for="(qa, ind) in query_answer" v-if="qa && qa.name" :key="ind">
            <div v-if="qa.name=='_workflow_data'" style="border: thin solid red; padding: 10px;">
                <b>This workflow ancestors</b>:
                    <span v-for="id in (qa.result.ancestors || [])" :key="id">
                        <nuxt-link :to="office_config.helpers.createWorkflowUrl({wf_id: id})">{{id}}</nuxt-link> &gt;
                    </span>

                <h3>This workflow data</h3>
                {{qa.result}}
            </div>

            <div v-if="qa.name=='_what_can_i_do'" style="border: thin solid red; padding: 10px;">
                <h3>What can I do now</h3>
                <ul style="margin-left: 20px; list-style-type: disc;">
                    <li v-for="[event_name, v] in Object.entries(qa.result.events || {})" :key="event_name" style="margin-bottom: 10px;">
                        <span v-if="v.available">
                            <nuxt-link :to="office_config.helpers.createPrepareEventUrl({event_name})">{{event_title(v, event_name)}}</nuxt-link>
                            <template v-if="my_drafts_by_event[event_name]">
                                <br/>
                                <span>Есть черновик: {{my_drafts_by_event[event_name].form_fields}}</span>
                            </template>
                        </span>
                        <span v-else style="color: #aaaaaa;">
                            <strike>{{event_title(v, event_name)}}</strike>
                            <template v-if="my_drafts_by_event[event_name]">
                                <br/>
                                <span>Есть черновик: {{my_drafts_by_event[event_name].form_fields}}</span>
                            </template>
                        </span>
                    </li>
                </ul>
            </div>

            <div v-if="qa.name=='_my_workflows'" style="border: thin solid red; padding: 10px;">
                <h3>My workflows</h3>
                <ul>
                    <li v-for="[ind, wf] in Object.entries(qa.result.items)" :key="wf._id" style="margin-bottom: 10px;">
                        <span>
                            <nuxt-link :to="office_config.helpers.createWorkflowUrl({wf_id: wf._id})">{{wf}}</nuxt-link>
                        </span>
                    </li>
                </ul>
            </div>

        </div>
    </div>
</template>

<script>

import API from '../api'
const api = API();

export default {
    components: {
    },
    props: [
        'jwt_token',
        'wf_id',
        'user_id',
        'user_role',
        'office_config'
    ],
    data () {
        return {
            query_answer: [],
            my_drafts: [],
            my_drafts_by_event: []
        };
    },
    computed: {
        lang() {
          return this.office_config.lang;  
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
                        role_name: this.user_role,
                        workflow_id: this.wf_id
                    },
                    query: [
                        '_workflow_data',
                        '_what_can_i_do',
                        '_my_workflows'
                    ],
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
                        role_name: this.user_role,
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

