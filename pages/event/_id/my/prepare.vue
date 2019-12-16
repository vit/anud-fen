<template>

    <div cclass="width-container">
        <WfGuiEvent
            v-if="myId"
            :wf_id="wf_id"
            :return_wf_id="wf_id"
            :user_id="myId"
            :role_name="role_name"
            :office_config="office_config"
            :jwt_token="jwt_token"

            :event_name='event_name'
        ></WfGuiEvent>
            <div v-else>
                Вы не можете работать с этой формой, поскольку не вошли в систему
            </div>
    </div>

</template>

<script>

import WfGuiEvent from '~/lib/comsep/components/WfGuiEvent'

export default {
    components: {
        WfGuiEvent
    },
    props: [
        'office_config',
//        'contextId',
        'wf_id',
        'return_wf_id',
        'event_name',
        'role_name',
        'myId',
        'jwt_token'
    ],
    data () {
        return {
        };
    },
    computed: {
//        wf_id() { return this.$route.query.wf || this.contextId },
//        event_name() { return this.$route.query.event },
//        role_name() { return 'user' },
    },
}
</script>

