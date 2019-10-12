<template>
    <div cclass="width-container">

        <h2>Edit Form</h2>



    <div class="form-container">
      <form
        action=""
        vv-on:submit.prevent="login"
        vv-on:keyup.enter="login"
        @submit.stop.prevent="onSubmit"
        novalidate
        >
        <div class="c-card" style="width: auto">
            <header class="c-card-header">
                <h3 class="c-card-header-title">{{formTitle}}</h3>
            </header>
            <section class="c-card-content">
                <template v-for="field of fields">
                    <b-field v-if="['email', 'password', 'text'].includes(field.type)" :label="field.label" :key="field.name">
                        <b-input
                            :useHtml5Validation="false"
                            :type="field.type"
                            :name="field.name"
                            v-model="formData[field.name]"
                            :password-reveal="field.type=='password'"
                            :placeholder="field.placeholder || field.label"
                            :ref="field.type"
                            autofocus
                            rrequired
                        >
                        </b-input>
                    </b-field>
                    <div v-if="['textarea'].includes(field.type)" :key="field.name">
                    <b-field vv-if="['textarea'].includes(field.type)" :label="field.label">
                        <b-input style="width: 100%;"
                            :useHtml5Validation="false"
                            :type="field.type"
                            :name="field.name"
                            v-model="formData[field.name]"
                            :password-reveal="field.type=='password'"
                            :placeholder="field.placeholder || field.label"
                            :ref="field.type"
                            autofocus
                            rrequired
                            contenteditable
                            @change.native="textareaChange"
                            @keyup.native="textareaChange"
                            vv-autosize="formData[field.name]"
                            v-my-autosize
                        >
                        </b-input>
                    </b-field>
                        </div>
                    <b-checkbox
                        v-if="['checkbox'].includes(field.type)"
                        :name="field.name"
                        v-model="formData[field.name]"
                        :key="field.name"
                    >{{field.label}}</b-checkbox>
                </template>

            </section>
            <footer class="c-card-footer">
                <button
                    v-for="button of buttons"
                    :key="button.name"
                    :type="button.type"
                    class="button is-primary c-card-footer-item is-outlined"
                >
                    {{button.label}}
                </button>
                <hr>
                <nuxt-link
                    v-for="link of links"
                    :key="link.url"
                    :to="link.url"
                >
                    {{link.label}}
                </nuxt-link>
            </footer>
        </div>
      </form>  
    </div>





        <!--FormCard
            :formDescr="formDescr"
        >
        </FormCard-->
    </div>
</template>

<script>
//import Page from '~/components/Page'
import axios from 'axios';
//import FormCard from '~/components/uniform/FormCard'

//var Vue = require('vue')
//var VueAutosize = require('vue-autosize')

//Vue.use(VueAutosize)

const autosize = require('autosize')


export default {
    components: {
//        FormCard
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
/*
        fields() {
            return this.formDescr ? this.formDescr.fields : [];
        },
*/
        buttons() {
            return this.formDescr ? this.formDescr.buttons : [];
        },
        links() {
            return this.formDescr ? this.formDescr.links : [];
        },
/*
        formData() {
            return this.formDescr ? this.formDescr.data : [];
        },
        formTitle() {
            return this.formDescr ? this.formDescr.title : '';
        },
*/
        formTitle() {
            const form = this.form(this.formName);
            return form && form.title ? form.title : null;
        },
        fields() {
            const form = this.form(this.formName);
            return form && form.fields ? form.fields : [];
        },



//        context_name() { return this.$store.getters['wp/getCurrentComsepContextName']; },
//        user_id() { return this.$store.getters['user/id']; },
        formName() {
            return this.docMeta ? this.docMeta.formName : null;
        },
        formDescr() {
            return {
//              title: this.formTitle(),
              onSubmit: this.onSubmit, 
//              data: this.formData,
//              fields: this.fields(),

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
        textareaChange(evt) {
//            console.log('change!!!');
//            console.log('change!!!', evt);
        },
        context() {
            return this.$store.state.workflow.currentContext;
        },
        form() {
            const context = this.context();
            return context && context.forms && this.formName ? context.forms[this.formName] : null;
        },
/*
        fields() {
            const form = this.form(this.formName);
            return form && form.fields ? form.fields : [];
        },
        formTitle() {
            const form = this.form(this.formName);
            return form && form.title ? form.title : null;
        },
*/
        onSubmit() {
            console.log("onSubmit()", this.formData);
            const {docMeta, formData} = this;
            axios.post(process.env.COMSEP_API_URL+'/wf/saveDoc', {docMeta, formData}).then((response) => {
                //this.schema = response && response.data ? response.data.reply : null;
                console.log("onSubmit()/response", response);
            })
        },

//        onSubmit2() {
//            return this.formDescr && this.formDescr.onSubmit ? this.formDescr.onSubmit() : null;
//        },

    },
    mounted() {
///*
        const {docMeta} = this;
        axios.post(process.env.COMSEP_API_URL+'/wf/getDoc', {docMeta}).then((response) => {
            if(response && response.data && response.data.reply && response.data.reply.doc)
                this.formData = response.data.reply.doc;
//            console.log("mounted()/getDoc", response);
        })
//*/
    },
    directives: {
/*
        focus: {
            inserted: function (el) {
                el.focus()
            }
        },
*/
        'my-autosize': {
            update: function (el) {
                if("TEXTAREA"!=el.tagName)
                    el = el.getElementsByTagName("TEXTAREA");
                autosize(el);
            }
        }
    }
}
</script>

