<template>
    <div sstyle="border: thin solid green;">
        <h1>Workflow Prepare Event</h1>

            <EditEventForm
                :form_meta="form_meta"
                :form_name="form_name"
                :form_descr="form_descr"
                :event_descr="event_descr"
                :jwt_token="jwt_token"
                :context="context"
                :lang='lang'
                @submitted="onExit"
                @dropped="onExit"
                @exited="onExit"
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
//        'user_id',
        'role_name',
        'office_config',

        'event_name',
//        'form_name',
//        'lang'
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
        lang() {
          return this.office_config.lang;  
        },
        event_descr() {
            const roles = this.office_config.office_context.schema.roles;
            const role_data = roles[this.role_name];
            return role_data && role_data.events ? role_data.events[this.event_name] : null;
        },
        form_name() {
            return this.event_descr && this.event_descr.accepts ? this.event_descr.accepts.form : null;
        },
        form_descr() {
            const context = this.context;
            return context && context.forms && this.form_name ? context.forms[this.form_name] : null;
        },
    },
    methods: {
        onExit(data) {
            const path_to = this.office_config.helpers.createWorkflowUrl({wf_id: this.wf_id})
            this.$router.push(path_to);
        }
    },
    mounted() {
    }
}
</script>

