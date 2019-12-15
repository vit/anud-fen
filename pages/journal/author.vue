<template>
    <Page>
    <div cclass="width-container">
        <nuxt-child
            :office_config="office_config"
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
            office_config: ((that) => {
                const me = {
                    helpers: {
                        createPrepareEventUrl({event_name}) {
                            return me.url_base+'/new?event='+event_name;
                        },
                        createWorkflowUrl({wf_id}) {
                            return me.url_base + (me.contextId==wf_id ? '' : '?wf='+wf_id);
                        }
                    },
                    url_base: '/journal/author',
                    lang: 'ru',
                    office_context: that.$store.state.workflow.currentContext
                }
                return me;
            })(this)
        };
    },
    computed: {
        contextId() { return this.$store.getters['workflow/currentContextId']; },
        myId() { return this.$store.getters['user/id']; },
    },
}

</script>
