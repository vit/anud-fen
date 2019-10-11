<template>
    <!--Page-->
    <div cclass="width-container">
        <WfGui
            v-if="$store.state.user.jwt"
            :wf_id="contextId"
            :user_id="myId"
            user_role="user"
            :jwt_token="$store.state.user.jwt"
        ></WfGui>

        <h1>Journal Author Submissions</h1>
        <div v-for="s in submissions" :key="s._id" style="margin-top: 10px; padding: 10px; background-color: #f7f7f7;">
            <h3>{{s.doc.title}}</h3>
            <p>
                {{s.doc.abstract}}
            </p>
        </div>
    </div>
    <!--/Page-->
</template>

<script>
import axios from 'axios';
import Page from '~/components/Page'
import WfGui from '~/lib/comsep/components/WfGui'

export default {
  //name: 'LoginForm',
  components: {
      Page,
      WfGui
  },
    data () {
        return {
            submissions: [],
        };
    },
    computed: {
        contextId() { return this.$store.state.workflow.currentContext.id; },
        myId() { return this.$store.getters['user/id']; }
    },
    mounted() {
        const contextId = this.$store.state.workflow.currentContext.id;
        const ownerId = this.$store.getters['user/id'];
/*
        axios.post(process.env.COMSEP_API_URL+'/wf/listDocs', {docMeta: {contextId, ownerId}}).then((response) => {
            if(response && response.data && response.data.reply && response.data.reply)
                this.submissions = response.data.reply;
        })
*/
    }
}
</script>

