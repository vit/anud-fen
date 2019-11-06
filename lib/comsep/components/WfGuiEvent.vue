<template>
    <div sstyle="border: thin solid green;">
        <h1>Workflow Prepare Event</h1>

            <EditEventForm
                :docMeta="docMeta"
                :form_meta="form_meta"
                :jwt_token="jwt_token"
            ></EditEventForm>

    </div>
</template>

<script>

import EditEventForm from './EditEventForm'

export default {
    components: {
        EditEventForm,
    },
    props: [
        'jwt_token',
        'wf_id',
        'user_id',
        'role_name',
        'external_resources',

        'event_name',
        'form_name'
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
//            const contextId = this.$store.state.workflow.currentContext.id;
//            const ownerId = this.$store.getters['user/id'];
            const contextId = this.wf_id;
            const ownerId = this.user_id;
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
        form_meta() {
            //const workflow_id = this.wf_id;
            return {
            // who writes
                //ownerId,
                role_name: this.role_name,
            // where writes
                workflow_id: this.wf_id,
                event_name: this.event_name,
            // what writes
                form_name: this.form_name
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

