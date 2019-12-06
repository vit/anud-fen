<template>
    <div sstyle="border: thin solid green;">
        <h1>Workflow Prepare Event</h1>

            <EditEventForm
                dddocMeta="docMeta"
                :form_meta="form_meta"
                :form_name="form_name"
                :jwt_token="jwt_token"
                :context="$store.state.workflow.currentContext"
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
/*
        docMeta() {
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
*/
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
//                form_name: this.form_name
            };
        },
    },
    mounted() {
    }
}
</script>

