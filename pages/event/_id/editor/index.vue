<template>

    <div cclass="width-container">
        <WfGuiWorkflow
            v-if="wf_id"
            :wf_id="wf_id"
            :user_id="myId"
            uuser_role="user"
            user_role="editor"
            :office_config="office_config"
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
        'office_config',
        'contextId',
        'myId'
    ],
    data () {
        return {
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

