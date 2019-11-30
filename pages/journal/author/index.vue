<template>
    <div cclass="width-container">
        <WfGuiWorkflow
            v-if="$store.state.user.jwt"
            :wf_id="contextId"
            :user_id="myId"
            user_role="user"
            :external_resources="external_resources"
            :jwt_token="$store.state.user.jwt"
        ></WfGuiWorkflow>

        <!--h1>Journal Author Submissions</h1>
        <div v-for="s in submissions" :key="s._id" style="margin-top: 10px; padding: 10px; background-color: #f7f7f7;">
            <h3>{{s.doc.title}}</h3>
            <p>
                {{s.doc.abstract}}
            </p>
        </div-->
    </div>
</template>

<script>
import WfGuiWorkflow from '~/lib/comsep/components/WfGuiWorkflow'

export default {
  //name: 'LoginForm',
  components: {
      WfGuiWorkflow
  },
    data () {
        return {
//            submissions: [],
            external_resources: {
                createPrepareEventUrl({event_name}) {
                    return 'author/new?event='+event_name;
                },
                createWorkflowUrl({wf_id}) {
                    return 'author/wf?wf_id='+wf_id;
                }
            }
        };
    },
    computed: {
        contextId() { return this.$store.state.workflow.currentContext.id; },
        myId() { return this.$store.getters['user/id']; }
    },
    mounted() {
    }
}
</script>

