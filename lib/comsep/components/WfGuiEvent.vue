<template>
    <div sstyle="border: thin solid green;">
        <h1>Workflow Prepare Event</h1>

            <EditEventForm
                :form_meta="form_meta"
                :form_name="form_name"
                :form_descr="form_descr"
                :jwt_token="jwt_token"
                :context="context"
                :lang='office_config.lang'
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
        'office_config',

        'event_name',
//        'form_name',
        'lang'
    ],
    data () {
        return {
            schema: null,
            formData: {
            },
        };
    },
    computed: {
        form_meta() {
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
        context() {
            return this.$store.state.workflow.currentContext
        },
        form_name() {
//            let result = null;
            const roles = this.office_config.office_context.schema.roles;
            const role_data = roles[this.role_name];
            const event = role_data && role_data.events ? role_data.events[this.event_name] : null;
            return event && event.accepts ? event.accepts.form : null;
            
//            return 'gn_paper';
        },
        form_descr() {
            const context = this.context;
            return context && context.forms && this.form_name ? context.forms[this.form_name] : null;
        }
    },
    mounted() {
    }
}
</script>

