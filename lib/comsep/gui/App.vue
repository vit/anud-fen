<template>
    <!--Page-->
    <div>
        <WfGuiWorkflow
            v-if="page_type=='workflow'"
            :wf_id="wf_id"
            rrole_name="role_name"
            :office_config="office_config"
            :app_config="app_config"
            qqueries="queries"
            :jwt_token="jwt_token"
        />
        <WfGuiEvent
            v-else-if="page_type=='event'"
            :wf_id="wf_id"
            rrole_name="role_name"
            :office_config="office_config"
            :app_config="app_config"
            :jwt_token="jwt_token"

            :event_name='event_name'
        ></WfGuiEvent>
        <div v-else>
            Unknown Page
        </div>

    </div>
    <!--/Page-->
</template>


<script>
//import Page from '~/components/Page'

import WfGuiWorkflow from './components/WfGuiWorkflow'
import WfGuiEvent from './components/WfGuiEvent'


export default {
    components: {
//    Page,
        WfGuiWorkflow,
        WfGuiEvent
    },
    props: [
        'app_name',
        'role_path'
    ],
    data () {
        return {
            office_config: ((that) => {
                const me = {
                    helpers: {
                        createPrepareEventUrl({event_name, wf_id}) {
                            return that.url_base+'/prepare?event='+event_name+'&wf='+wf_id;
                        },
                        createWorkflowUrl({wf_id}) {
                            return that.url_base + (that.contextId==wf_id ? '' : '?wf='+wf_id);
                        }
                    },
                    lang: 'ru',
                    office_context: that.$store.state.workflow.currentContext
                }
                return me;
            })(this),
            pages_map: {
                '': {type: 'workflow'},
                '/prepare': {type: 'event'},
            },
            apps_map: {
                'journal.my': {
                    office_title: 'Мой офис',
                    role_name: 'user',
                    queries: [
                        '_workflow_data',
                        '_what_can_i_do',
                        '_my_workflows'
                    ],
                },
                'journal.editor': {
                    office_title: 'Офис редактора',
                    role_name: 'editor',
                    queries: [
                        '_workflow_data',
                        '_what_can_i_do',
                        '_editor_workflows'
                    ],
                },
                'conf.my': {
                    office_title: 'Мой офис',
                    role_name: 'user',
                    queries: [
                        '_workflow_data',
                        '_what_can_i_do',
                        '_my_workflows'
                    ],
                },
                'conf.editor': {
                    office_title: 'Офис редактора',
                    role_name: 'editor',
                    queries: [
                        '_workflow_data',
                        '_what_can_i_do',
                        '_editor_workflows'
                    ],
                },
            }
        };
    },
    computed: {
        jwt_token() { return this.$store.state.user.jwt },
        contextId() { return this.$store.getters['workflow/currentContextId']; },
        wf_id() { return this.$route.query.wf || this.contextId },
//        myId() { return this.$store.getters['user/id']; },
        event_name() { return this.$route.query.event },
        url_base() { return this.$store.getters['wp/getCurrentComsepContextPath']+this.role_path },
        rest_path() {
            const current_path = this.$route.path;
            return current_path.startsWith(this.url_base) ? current_path.slice(this.url_base.length) : '???'
        },
        page_type() {
            return this.pages_map[this.rest_path] ? this.pages_map[this.rest_path].type : '-'
        },
//        role_name() {
//            return this.apps_map[this.app_name] ? this.apps_map[this.app_name].role_name : null
//        },
//        queries() {
//            return this.apps_map[this.app_name] ? this.apps_map[this.app_name].queries : null
//        },
        app_config() {
            return this.apps_map[this.app_name]
        }
    },
}

</script>
