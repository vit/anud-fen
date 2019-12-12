<template>

    <div cclass="width-container">

        <WfGuiEvent
            vv-if="$store.state.user.jwt"
            v-if="myId"
            :wwf_id="contextId"
            :wf_id="wf_id"
            :rreturn_wf_id="contextId"
            :return_wf_id="wf_id"
            :user_id="myId"
            :role_name="role_name"
            :office_config="office_config"
            :jwt_token="$store.state.user.jwt"

            :event_name='event_name'
            fform_name="form_name"

            llang='ru'

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
        'contextId',
        'return_wf_id',
        'myId'
    ],
    data () {
        return {
        };
    },
    computed: {
        wf_id() { return this.$route.query.wf || this.contextId },
        event_name() { return this.$route.query.event },
//        role_name() { return 'user' },
        role_name() { return 'editor' },


    },
}
</script>

