<template>
    <!--Page-->
    <div cclass="width-container">
        <h1>Journal Editor Submissions</h1>
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

export default {
  //name: 'LoginForm',
  components: {
      Page,
  },
    data () {
        return {
            submissions: [],
        };
    },
    mounted() {
        const contextId = this.$store.state.workflow.currentContext.id;
        const ownerId = this.$store.getters['user/id'];
        axios.post(process.env.COMSEP_API_URL+'/wf/listDocs', {docMeta: {contextId}}).then((response) => {
            if(response && response.data && response.data.reply && response.data.reply)
                this.submissions = response.data.reply;
//            console.log("mounted()/getDoc", response);
        })
    }
}
</script>

