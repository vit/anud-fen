<template>
    <!--Page-->
    <div cclass="width-container">
        <h1>Journal Author New Submission</h1>
            <EditForm v-if="!!$store.getters['user/id']" :docMeta="docMeta" ></EditForm>
            <div v-else>
                Вы не можете работать с этой формой, поскольку не вошли в систему
            </div>

    </div>
    <!--/Page-->
</template>

<script>
import Page from '~/components/Page'
import EditForm from '~/components/comsep/common/EditForm'

export default {
    components: {
        Page,
        EditForm
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
        }
//        context_name() { return this.$store.getters['wp/getCurrentComsepContextName']; },
    },
}
</script>

