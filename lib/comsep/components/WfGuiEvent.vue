<template>
    <div style="border: thin solid green;">
        <h1>Workflow Prepare Event</h1>

            <EditForm :docMeta="docMeta" ></EditForm>

        <!--div v-for="(qa, ind) in query_answer" v-if="qa && qa.name" :key="ind">

            <div v-if="qa.name=='_what_can_i_do'" style="border: thin solid red; padding: 10px;">
                <h3>What can I do now</h3>
                <ul>
                    <li v-for="[event_name, v] in Object.entries(qa.result.events)" :key="event_name">
                        <span v-if="v.available">
                            <nuxt-link :to="external_resources.createPrepareEventUrl({event_name})">{{event_name}}</nuxt-link>
                        </span>
                        <span v-else>
                            <strike>{{k}}</strike>
                        </span>
                    </li>
                </ul>
            </div>

        </div-->
    </div>
</template>

<script>

//import API from '~/lib/comsep/api'
import API from '../api'
const api = API();

import EditForm from '~/components/comsep/common/EditForm'


export default {
    components: {
        EditForm,
    },
    props: [
        'jwt_token',
        'wf_id',
        'user_id',
        'user_role',
        'external_resources'
    ],
    data () {
        return {
//            query_answer: []
            schema: null,
            formData: {
            },
        };
    },
    computed: {
        docMeta() {
            const contextId = this.$store.state.workflow.currentContext.id;
            const ownerId = this.$store.getters['user/id'];
            return {
            // who writes
                ownerId,
                roleName: 'user',
            // where writes
                contextId,
                eventName: 'new_submission',
            // what writes
                formName: 'gn_paper'
            };
        },
    },
    mounted() {
/*
        api.workflow.query({
            jwt_token: this.jwt_token,
            meta: {
                wf_id: this.wf_id,
//                user_id: this.user_id,
                user_role: this.user_role
            },
            event: null,
            query: [
                '_what_can_i_do'
            ],
        }, (answer) => {
//            console.log("mounted()/getWorkflow", answer);
            this.query_answer = answer.reply || [];
        })
*/
    }
}
</script>

