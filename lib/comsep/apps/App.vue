<template>
    <!--Page-->
    <div>
        <WfGuiWorkflow
            v-if="page_type=='workflow'"
            vvv-if="wf_id"
            :wf_id="wf_id"
            :user_role="role_name"
            :office_config="office_config"
            :queries="queries"
            :jwt_token="jwt_token"
        />
        <WfGuiEvent
            v-else-if="page_type=='event'"
            :wf_id="wf_id"
            :return_wf_id="wf_id"
            :role_name="role_name"
            :office_config="office_config"
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

import WfGuiWorkflow from '~/lib/comsep/components/WfGuiWorkflow'
import WfGuiEvent from '~/lib/comsep/components/WfGuiEvent'


export default {
    components: {
//    Page,
        WfGuiWorkflow,
        WfGuiEvent
    },
    props: [
        'name'
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
            queries: [
                '_workflow_data',
                '_what_can_i_do',
                '_my_workflows'
            ],
            pages_map: {
                '': {type: 'workflow'},
                '/prepare': {type: 'event'},
            }
        };
    },
    computed: {
        jwt_token() { return this.$store.state.user.jwt },
        contextId() { return this.$store.getters['workflow/currentContextId']; },
        wf_id() { return this.$route.query.wf || this.contextId },
//        myId() { return this.$store.getters['user/id']; },
        event_name() { return this.$route.query.event },
        role_name() { return 'user' },
        role_path() { return 'my' },
        url_base() { return this.$store.getters['wp/getCurrentComsepContextPath']+this.role_path },
        rest_path() {
            const current_path = this.$route.path;
            return current_path.startsWith(this.url_base) ? current_path.slice(this.url_base.length) : '???'
        },
        page_type() {
            return this.pages_map[this.rest_path] ? this.pages_map[this.rest_path].type : '-'
        }
    },
}

</script>
