<template>

    <div cclass="width-container">
        <WfGuiWorkflow
            v-if="wf_id"
            :wf_id="wf_id"
            :user_id="myId"
            uuser_role="user"
            user_role="editor"
            :office_config="office_config"
            :queries="queries"
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
            queries: [
                '_workflow_data',
                '_what_can_i_do',
//                '_my_workflows'
                '_editor_workflows'
            ],
        };
    },
    computed: {
        wf_id() { return this.$route.query.wf || this.contextId; },
    },
}

</script>

