<template>

    <div cclass="width-container">
        <WfGuiWorkflow
            v-if="wf_id"
            :wf_id="wf_id"
            :user_id="myId"
            user_role="user"
            :external_resources="external_resources"
            :jwt_token="$store.state.user.jwt"
        ></WfGuiWorkflow>
    </div>

</template>

<script>

import WfGuiWorkflow from '~/lib/comsep/components/WfGuiWorkflow'

export default {
    components: {
      WfGuiWorkflow
    },
    props: [
        'external_resources',
        'contextId',
        'myId'
    ],
    data () {
        return {
            /*
            external_resources: ((that) => {
                return {
                    createPrepareEventUrl({event_name}) {
                        return that.url_base+'author/new?event='+event_name;
                    },
                    createWorkflowUrl({wf_id}) {
                        return that.url_base + (that.contextId==wf_id ? 'author' : 'author?wf='+wf_id);
                    }
                }
            })(this)
            */
        };
    },
    computed: {
//        contextId() { return this.$store.state.workflow.currentContext.id; },
//        wf_id() { return this.$route.query.wf || this.$store.state.workflow.currentContext.id; },
        wf_id() { return this.$route.query.wf || this.contextId; },
//        myId() { return this.$store.getters['user/id']; },
//        url_base() { return "/journal/" }
    },
}

</script>

