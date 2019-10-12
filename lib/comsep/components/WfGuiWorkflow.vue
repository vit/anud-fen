<template>
    <div style="border: thin solid green;">
        <h1>Workflow GUI</h1>
        <div v-for="(qa, ind) in query_answer" v-if="qa && qa.name" :key="ind">

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

            <div v-if="qa.name=='_my_workflows'" style="border: thin solid red; padding: 10px;">
                <h3>My workflows</h3>
            </div>

        </div>
    </div>
</template>

<script>

//import API from '~/lib/comsep/api'
import API from '../api'
const api = API();

export default {
    components: {
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
            query_answer: []
        };
    },
    computed: {
    },
    mounted() {
        api.workflow.query({
            jwt_token: this.jwt_token,
            meta: {
                wf_id: this.wf_id,
//                user_id: this.user_id,
                user_role: this.user_role
            },
            event: null,
            query: [
                '_what_can_i_do',
                '_my_workflows'
            ],
        }, (answer) => {
//            console.log("mounted()/getWorkflow", answer);
            this.query_answer = answer.reply || [];
        })
    }
}
</script>

