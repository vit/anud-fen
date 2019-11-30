<template>

    <div cclass="width-container">
        <WfGuiWorkflow
            v-if="$store.state.user.jwt"
            :wf_id="wf_id"
            :wwf_id="contextId"
            :user_id="myId"
            user_role="user"
            :external_resources="external_resources"
            :jwt_token="$store.state.user.jwt"
        ></WfGuiWorkflow>

    </div>

</template>

<script>

//import WfGuiEvent from '~/lib/comsep/components/WfGuiEvent'
import WfGuiWorkflow from '~/lib/comsep/components/WfGuiWorkflow'

export default {
    components: {
//        WfGuiEvent
      WfGuiWorkflow
    },
    data () {
        return {
//            schema: null,
//            formData: {
//            },
            external_resources: ((that) => {
                return {
                createPrepareEventUrl({event_name}) {
                    //console.log("createPrepareEventUrl()/that.contextId:", that.contextId);
                    return that.url_base+'author/new?event='+event_name;
                },
                createWorkflowUrl({wf_id}) {
                    return that.url_base+'author/wf?wf='+wf_id;
                }
                }
            })(this)
        };
    },
    computed: {
        contextId() { return this.$store.state.workflow.currentContext.id; },
        myId() { return this.$store.getters['user/id']; },
        wf_id() { return this.$route.query.wf },
        url_base() { return "/journal/" }
    },
}
</script>

