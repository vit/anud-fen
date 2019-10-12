<template>
    <!--Page-->
    <div cclass="width-container">

        <WfGuiEvent
            v-if="$store.state.user.jwt"
            :wf_id="contextId"
            :user_id="myId"
            user_role="user"
            :external_resources="external_resources"
            :jwt_token="$store.state.user.jwt"
        ></WfGuiEvent>
            <div v-else>
                Вы не можете работать с этой формой, поскольку не вошли в систему
            </div>


        <h1>Journal Author New Submission</h1>
            <!--EditForm v-if="!!$store.getters['user/id']" :docMeta="docMeta" ></EditForm>
            <div v-else>
                Вы не можете работать с этой формой, поскольку не вошли в систему
            </div-->

    </div>
    <!--/Page-->
</template>

<script>
//import Page from '~/components/Page'
//import EditForm from '~/components/comsep/common/EditForm'

import WfGuiEvent from '~/lib/comsep/components/WfGuiEvent'

export default {
    components: {
//        Page,
//        EditForm,
        WfGuiEvent
    },
    data () {
        return {
//            schema: null,
//            formData: {
//            },
            external_resources: {
            //    createPrepareEventUrl({event_name}) {
            //        return 'author/new?event='+event_name;
            //    }
            }
        };
    },
    computed: {
        contextId() { return this.$store.state.workflow.currentContext.id; },
        myId() { return this.$store.getters['user/id']; }
    },
}
</script>

