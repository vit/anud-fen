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
                        createPrepareEventUrl({event_name, wf_id}) {
                            return me.url_base+'/prepare?event='+event_name+'&wf='+wf_id;
                        },
                        createWorkflowUrl({wf_id}) {
                            return me.url_base + (that.contextId==wf_id ? '' : '?wf='+wf_id);
                        }
                    },
                    url_base: that.$store.getters['wp/getCurrentComsepContextPath']+'editor',
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
