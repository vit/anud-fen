<template>
    <div style="border: thin solid green;">
        <h1>Workflow GUI</h1>
        <div v-for="(qa, ind) in query_answer" v-if="qa && qa.name" :key="ind">

            <div v-if="qa.name=='_what_can_i_do'" style="border: thin solid red; padding: 10px;">
                <h3>What can I do now</h3>
                <ul>
                    <li v-for="[k,v] in Object.entries(qa.result.events)" :key="k">
                        <span v-if="v.available">
                            <nuxt-link :to="'author/new?event='+k">{{k}}</nuxt-link>
                        </span>
                        <span v-else>
                            <strike>{{k}}</strike>
                        </span>
                    </li>
                </ul>
            </div>

        </div>
        
        <!--p>wf_id: {{wf_id}}</p>
        <p>user_id: {{user_id}}</p>
        <p>user_role: {{user_role}}</p-->
        <!--p>jwt_token: {{jwt_token}}</p-->
    </div>
</template>

<script>

import API from '~/lib/comsep/api'
const api = API();

export default {
    components: {
    },
    props: [
        'jwt_token',
        'wf_id',
        'user_id',
        'user_role',
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
                '_what_can_i_do'
            ],
        }, (answer) => {
//            console.log("mounted()/getWorkflow", answer);
            this.query_answer = answer.reply || [];
        })
    }
}
</script>

