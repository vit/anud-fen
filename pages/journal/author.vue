<template>
    <Page>
    <div cclass="width-container">
        <nuxt-child
            :external_resources="external_resources"
            :contextId="contextId"
            :myId="myId"
        />
    </div>
    </Page>
</template>

<script>
import Page from '~/components/Page'

export default {
    components: {
    Page,
    },
    data () {
        return {
            external_resources: ((that) => {
                return {
                    createPrepareEventUrl({event_name}) {
                        return that.url_base+'author/new?event='+event_name;
                    },
                    createWorkflowUrl({wf_id}) {
                        return that.url_base + (that.contextId==wf_id ? 'author' : 'author?wf='+wf_id);
                    }
                }
            })(this)
        };
    },
    computed: {
        contextId() { return this.$store.state.workflow.currentContext.id; },
//        wf_id() { return this.$route.query.wf || this.$store.state.workflow.currentContext.id; },
        myId() { return this.$store.getters['user/id']; },
        url_base() { return "/journal/" }
    },
}

</script>
