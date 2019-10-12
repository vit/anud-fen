<template>
    <div cclass="width-container">

        <h2>Edit Form</h2>
{{docMeta}}
        <FormCard
            :formDescr="formDescr"
        >
        </FormCard>

    <hr>
    {{form(formName)}}
    <hr>
    {{context_name}}
    <hr>
    {{user_id}}

    </div>
</template>

<script>
//import Page from '~/components/Page'
import axios from 'axios';
import FormCard from '~/components/uniform/FormCard'

export default {
    components: {
//        Page,
        FormCard
    },
    props: [
        'docMeta'
    ],
    data () {
        return {
//            formName: 'gn_paper',
            schema: null,
            formData: {
//                title: '',
//                abstract: '',
            },
        };
    },

    computed: {
        context_name() { return this.$store.getters['wp/getCurrentComsepContextName']; },
        user_id() { return this.$store.getters['user/id']; },
        formName() {
            return this.docMeta ? this.docMeta.formName : null;
        },
        formDescr() {
            return {
              title: this.formTitle(),
              onSubmit: this.onSubmit, 
              data: this.formData,
              fields: this.fields(),

              buttons: [
                  {
                      name: 'submit',
                      type: 'submit',
                      style: 'default',
                      label: 'Подать',
                  }
              ],
            }
        },
    },
    methods: {
        context() {
            return this.$store.state.workflow.currentContext;
        },
        form() {
            const context = this.context();
            return context && context.forms && this.formName ? context.forms[this.formName] : null;
        },
        fields() {
            const form = this.form(this.formName);
            return form && form.fields ? form.fields : [];
        },
        formTitle() {
            const form = this.form(this.formName);
            return form && form.title ? form.title : null;
        },
        onSubmit() {
            console.log("onSubmit()", this.formData);
            const {docMeta, formData} = this;
            axios.post(process.env.COMSEP_API_URL+'/wf/saveDoc', {docMeta, formData}).then((response) => {
                //this.schema = response && response.data ? response.data.reply : null;
                console.log("onSubmit()/response", response);
            })
        }
    },
    mounted() {
        const {docMeta} = this;
        axios.post(process.env.COMSEP_API_URL+'/wf/getDoc', {docMeta}).then((response) => {
            if(response && response.data && response.data.reply && response.data.reply.doc)
                this.formData = response.data.reply.doc;
//            console.log("mounted()/getDoc", response);
        })
//        const id = '__ROOT__';
//        axios.post(process.env.COMSEP_API_URL+'/wf/getSchema', {id}).then((response) => {
//            this.schema = response && response.data ? response.data.reply : null;
//        })
    }
}
</script>

