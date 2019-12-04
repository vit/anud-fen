<template>

    <div cclass="width-container">
        <WfGuiEvent
            vv-if="$store.state.user.jwt"
            v-if="myId"
            :wf_id="contextId"
            :user_id="myId"
            role_name="user"
            :external_resources="external_resources"
            :jwt_token="$store.state.user.jwt"

            :event_name='event_name'
            form_name="gn_paper"

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
        'external_resources',
        'contextId',
        'myId'
    ],
    data () {
        return {
/*
            external_resources: {
            //    createPrepareEventUrl({event_name}) {
            //        return 'author/new?event='+event_name;
            //    }
            }
*/
        };
    },
    computed: {
//        contextId() { return this.$store.state.workflow.currentContext.id; },
//        myId() { return this.$store.getters['user/id']; },
        event_name() { return this.$route.query.event }
    },
}
</script>

