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
//                            return me.url_base+'/new?event='+event_name;
                            return me.url_base+'/prepare?event='+event_name;
                        },
                        createWorkflowUrl({wf_id}) {
                            return me.url_base + (that.contextId==wf_id ? '' : '?wf='+wf_id);
//                            return me.url_base + (me.contextId==wf_id ? '' : '?wf='+wf_id);
                        }
                    },
//                    url_base: '/event/icins-2020/my',
                    url_base: that.$store.getters['wp/getCurrentComsepContextPath']+'my',
                    lang: 'ru',
                    office_context: that.$store.state.workflow.currentContext
                }
                return me;
            })(this)
        };
    },
    computed: {
        contextId() { return this.$store.state.workflow.currentContext.id; },
//        wf_id() { return this.$route.query.wf || this.$store.state.workflow.currentContext.id; },
        myId() { return this.$store.getters['user/id']; },
//        url_base() { return "/journal/" }
    },
}

</script>
