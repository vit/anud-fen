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
                    <FormField v-for="field of fields" :field="field" :formData="formData" :key="field.name"></FormField>
                </section>

                <footer class="c-card-footer">
                    <!--button
                        v-for="button of buttons"
                        :key="button.name"
                        :type="button.type"
                        ccclass="button is-primary c-card-footer-item is-outlined"
                        :class="'button ' + (button.class || '')"
                        @click="button.click"
                    >
                        {{button.label}}
                    </button-->

                    <button
                        type="button"
                        class="button is-primary c-card-footer-item iis-outlined"
                        @click="saveForm"
                    >
                        Сохранить черновик
                    </button>
                    <button
                        type="button"
                        class="button is-danger c-card-footer-item iis-outlined"
                        @click="deleteForm"
                    >
                        Удалить черновик
                    </button>
                    <button
                        type="button"
                        class="button is-success c-card-footer-item iis-outlined"
                        @click="submitForm"
                    >
                        Подать документ
                    </button>

                    <!--hr>
                    <nuxt-link
                        v-for="link of links"
                        :key="link.url"
                        :to="link.url"
                    >
                        {{link.label}}
                    </nuxt-link-->
                </footer>

            </div>
          </form>
        </div>

    </div>
</template>

<script>
import axios from 'axios';
import FormField from './form/FormField'

import API from '../api'
const api = API();


export default {
    components: {
        FormField
    },
    props: [
        'docMeta',
        'jwt_token',
//        'wf_id',
//        'user_id',
//        'user_role',
//        'external_resources'
    ],
    data () {
        return {
            formData: {
//                title: '',
//                abstract: '',
            },
/*
              buttons: [
                {
                    name: 'save',
                    type: 'button',
                    'class': 'is-primary c-card-footer-item iis-outlined',
                    label: 'Сохранить',
                    click: function() {
                        console.log("click() 1");
                        const {docMeta, formData} = this;
                        axios.post(process.env.COMSEP_API_URL+'/wf/saveDoc', {docMeta, formData}).then((response) => {
                            //this.schema = response && response.data ? response.data.reply : null;
                            console.log("onSubmit()/response", response);
                        })
                    }
                },
                {
                    name: 'submit',
                    type: 'button',
                    'class': 'is-success c-card-footer-item iis-outlined',
                    label: 'Подать',
                    click() {
                        console.log("click() 2");
                    }
                }
              ],
*/
        };
    },

    computed: {
//        buttons() {
//            return this.formDescr ? this.formDescr.buttons : [];
//        },
//        links() {
//            return this.formDescr ? this.formDescr.links : [];
//        },
        formTitle() {
//            const form = this.form(this.formName);
            const form = this.form;
            return form && form.title ? form.title : null;
        },
        fields() {
//            const form = this.form(this.formName);
            const form = this.form;
            return form && form.fields ? form.fields : [];
        },
        formName() {
            return this.docMeta ? this.docMeta.formName : null;
        },
/*
        formDescr() {
            return {
//              title: this.formTitle(),
              onSubmit: this.onSubmit, 
//              data: this.formData,
//              fields: this.fields(),

            }
        },
*/
        context() {
            return this.$store.state.workflow.currentContext;
        },
        form() {
//            const context = this.context();
            const context = this.context;
            return context && context.forms && this.formName ? context.forms[this.formName] : null;
        },
    },
    methods: {
        onSubmit() {
//            console.log("onSubmit()", this.formData);
//            const {docMeta, formData} = this;
//            axios.post(process.env.COMSEP_API_URL+'/wf/saveDoc', {docMeta, formData}).then((response) => {
//                //this.schema = response && response.data ? response.data.reply : null;
//                console.log("onSubmit()/response", response);
//            })
        },
        saveForm() {
            console.log("saveForm()", this.formData);
            const {docMeta, formData} = this;
            axios.post(process.env.COMSEP_API_URL+'/wf/saveDoc', {docMeta, formData}).then((response) => {
                console.log("saveForm()/response", response);
            })
        },
        deleteForm() {
            console.log("deleteForm()/clicked");
            console.log("deleteForm()/docMeta", this.docMeta);
            console.log("deleteForm()/docMeta.contextId", this.docMeta.contextId);
            api.rpc({
                jwt_token: this.jwt_token,
                model: 'EventForm',
                proc: 'drop_my_event_form',
                args: {rpc_data: 'rpc data'}
            }, (answer) => {
                console.log("deleteForm()", answer);
            })
            /*
            console.log("deleteForm()/clicked");
            console.log("deleteForm()/docMeta", this.docMeta);
            console.log("deleteForm()/docMeta.contextId", this.docMeta.contextId);
            api.workflow.query({
                jwt_token: this.jwt_token,
                meta: {
                    wf_id: this.docMeta.contextId,
    //                user_id: this.user_id,
                    user_role: this.docMeta.roleName
                },
                event: null,
                query: [
                    '_what_can_i_do'
                ],
            }, (answer) => {
                console.log("deleteForm()/_what_can_i_do", answer);
//                this.query_answer = answer.reply || [];
            })
            */

        },
        submitForm() {
            //console.log("submitForm()", this.formData);
        },
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
        'my-autosize': {
            update: function (el) {
                if("TEXTAREA"!=el.tagName)
                    el = el.getElementsByTagName("TEXTAREA");
                autosize(el);
            }
        }
*/
    }
}
</script>

