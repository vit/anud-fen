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

                    <!--button
                        type="button"
                        class="button is-primary c-card-footer-item iis-outlined"
                        @click="saveForm"
                    >
                        Сохранить черновик
                    </button-->
                    <button
                        :disabled="!isSaved"
                        type="button"
                        class="button is-danger c-card-footer-item iis-outlined"
                        @click="deleteForm"
                    >
                        Удалить черновик
                    </button>
                    <button
                        :disabled="!isSaved"
                        type="button"
                        class="button is-success c-card-footer-item iis-outlined"
                        @click="submitForm"
                    >
                        Подать документ
                    </button>
                    <span v-if="isSaved">The draft is saved</span>
                    <span v-if="waitSaving">Saving the draft...</span>
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
        'form_meta',
        'jwt_token',
    ],
    data () {
        return {
            formData: {
//                title: '',
//                abstract: '',
            },
            formDataSaved: {
            },
            waitTimer: false,
            waitSaving: false,
//            isSaved: false
            isSaved: true
        };
    },

    watch: {
        'formData': {
            handler: function(v) {
                console.log("watch -- change");
                this.saveDelayed();
//                return this.clearAlertBox();
            },
            deep: true
        }
    },

    computed: {
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
        fieldNames() {
            return this.fields.map(f => f.name);
        },
        formName() {
            return this.docMeta ? this.docMeta.formName : null;
        },
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
        saveDelayed() {
            this.isSaved = false;
            if (!this.waitTimer) {
                this.waitTimer = true;
                const that = this;
                setTimeout(function () {
                    that.waitTimer = false;
                    that.saveChangedFields();
                }, 1000);
            }
        },
        saveChangedFields() {
            let hasDifferences = false;
            this.fieldNames.forEach(fn => {
                console.log("EQ?", this.formDataSaved[fn], this.formData[fn]);
                if( this.formDataSaved[fn] !== this.formData[fn] )
                    hasDifferences = true;
            });

            console.log("hasDifferences: ", hasDifferences);
///*
            if(hasDifferences) {
                this.waitSaving = true;
                api.rpc({
                    jwt_token: this.jwt_token,
                    model: 'EventForm',
                    proc: 'set_my_event_form_fields',
                    args: {form_meta: this.form_meta, form_fields: this.formData}
                }, (data) => {
                    console.log("set_my_event_form_fields()", data);
                    this.formDataSaved = this.copyFieldsFromHash(data.answer.form_fields);
                    this.isSaved = true;
                    this.waitSaving = false;
                })
            } else {
                this.isSaved = true;
            }
//*/
        },
        copyFieldsFromHash(h) {
            const rez = {};
            this.fieldNames.forEach(fn => {
                rez[fn] = h[fn];
            });
            return rez;
        },
        onSubmit() {
        },
        saveForm() {
/*
            console.log("saveForm()", this.formData);
            const {docMeta, formData} = this;
            axios.post(process.env.COMSEP_API_URL+'/wf/saveDoc', {docMeta, formData}).then((response) => {
                console.log("saveForm()/response", response);
            })
*/
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
        },
        submitForm() {
            //console.log("submitForm()", this.formData);
        },
    },
    mounted() {

        api.rpc({
            jwt_token: this.jwt_token,
            model: 'EventForm',
            proc: 'get_my_event_form',
            args: {form_meta: this.form_meta}
        }, (data) => {
            console.log("get_my_event_form()", data);
            console.log("data.answer.form_fields", data.answer.form_fields);
            console.log("data.answer.form_fields copied", this.copyFieldsFromHash(data.answer.form_fields) );
//            this.formDataSaved = data.answer.form_fields;
//            this.formData = data.answer.form_fields;
            this.formDataSaved = this.copyFieldsFromHash(data.answer.form_fields);
            this.formData = this.copyFieldsFromHash(data.answer.form_fields);
        })

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

