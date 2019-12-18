
import Page from '~/components/Page'

export const Comp = {}

export const Body = {
    components: {
    Page,
    },
    data () {
        return {
            office_config: ((that) => {
                const me = {
                    helpers: {
                        createPrepareEventUrl({event_name, wf_id}) {
//                            return me.url_base+'/prepare?event='+event_name+'&wf='+wf_id;
                            return that.url_base+'/prepare?event='+event_name+'&wf='+wf_id;
                        },
                        createWorkflowUrl({wf_id}) {
//                            return me.url_base + (that.contextId==wf_id ? '' : '?wf='+wf_id);
                            return that.url_base + (that.contextId==wf_id ? '' : '?wf='+wf_id);
                        }
                    },
//                    url_base: that.$store.getters['wp/getCurrentComsepContextPath']+'my',
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
        role_path() { return 'my' },
        url_base() { return this.$store.getters['wp/getCurrentComsepContextPath']+this.role_path },
        rest_path() {
            const current_path = this.$route.path;
            return current_path.startsWith(this.url_base) ? current_path.slice(this.url_base.length) : '???'
        }
    },
}

//module.exports={

/*
export default {
    Body,
    Comp: {}
}
*/

export default Body

