<template>

    <div cclass="width-container">
        <WfGuiWorkflow
            v-if="wf_id"
            :wf_id="wf_id"
            :user_id="myId"
            user_role="user"
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
        wf_id() { return this.$route.query.wf || this.contextId; },
    },
}

</script>

