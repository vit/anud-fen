<template>
    <Page>
    <div cclass="width-container">
        <nuxt-child
            :office_config="office_config"
            :ccontextId="contextId"
            :wf_id="wf_id"
            mmyId="myId"
            :jwt_token="jwt_token"

            :event_name="event_name"
            :role_name="role_name"
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
                    url_base: that.$store.getters['wp/getCurrentComsepContextPath']+'my',
                    lang: 'ru',
                    office_context: that.$store.state.workflow.currentContext
                }
                return me;
            })(this)
        };
    },
    computed: {
        jwt_token() { return this.$store.state.user.jwt },
        contextId() { return this.$store.getters['workflow/currentContextId']; },
        wf_id() { return this.$route.query.wf || this.contextId },
//        myId() { return this.$store.getters['user/id']; },
        event_name() { return this.$route.query.event },
        role_name() { return 'user' },
    },
}

</script>
