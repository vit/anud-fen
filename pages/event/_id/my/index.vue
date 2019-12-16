<template>

    <div cclass="width-container">
        <WfGuiWorkflow
            v-if="wf_id"
            :wf_id="wf_id"
            uuser_id="myId"
            uuser_role="user"
            :user_role="role_name"
            :office_config="office_config"
            :queries="queries"
            :jwt_token="jwt_token"
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
//        'contextId',
        'wf_id',
//        'event_name',
        'role_name',
//        'myId',
        'jwt_token'
    ],
    data () {
        return {
            queries: [
                '_workflow_data',
                '_what_can_i_do',
                '_my_workflows'
            ],
        };
    },
//    computed: {
//        wf_id() { return this.$route.query.wf || this.contextId; },
//    },
}

</script>

