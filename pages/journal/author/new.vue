<template>

    <div cclass="width-container">
        <WfGuiEvent
            vv-if="$store.state.user.jwt"
            v-if="myId"
            :wf_id="contextId"
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

<hr>
{{office_config.office_context.schema}}
<hr>
{{office_config.office_context.forms}}

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
        'myId'
    ],
    data () {
        return {
        };
    },
    computed: {
//        contextId() { return this.$store.state.workflow.currentContext.id; },
//        myId() { return this.$store.getters['user/id']; },
        event_name() { return this.$route.query.event },
        role_name() { return 'user' },


    },
}
</script>

