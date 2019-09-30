<template>
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
                <p class="c-card-header-title">{{formTitle}}</p>
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
                    <b-field v-if="['textarea'].includes(field.type)" :label="field.label" :key="field.name">
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
                        >
                        </b-input>
                    </b-field>
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
                <!--button type="submit" class="button is-primary c-card-footer-item is-outlined" ttype="button" cclick="login">Войти</button-->
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
</template>

<script>
//import { mapGetters } from 'vuex'
//import Page from '~/components/Page'

export default {
    name: 'FormCard',
    components: {
    //      Page
    },
    props: {
        formDescr: Object
    },
    data() {
        return {
//            formData: {
//            },
//            formDescr: {
//            }
        };
    },
    computed: {
        fields() {
            return this.formDescr ? this.formDescr.fields : [];
        },
        buttons() {
            return this.formDescr ? this.formDescr.buttons : [];
        },
        links() {
            return this.formDescr ? this.formDescr.links : [];
        },
        formData() {
            return this.formDescr ? this.formDescr.data : [];
        },
        formTitle() {
            return this.formDescr ? this.formDescr.title : '';
        },
    },
    methods: {
        onSubmit() {
            return this.formDescr && this.formDescr.onSubmit ? this.formDescr.onSubmit() : null;
        },
    },

}
</script>


<style lang="scss" scoped>

//@import "~assets/variables";


//.width-container {
//    max-width: 30em;
//}
.form-container {
    max-width: 30em;
    margin: auto;
}

.c-card {
//    box-shadow: 1px 1px 5px black;
    border: 1px solid;
//    color: $primary;
    .c-card-header {
        padding: 10px;
        .c-card-header-title {
            margin: 0px;
            font-size: 150%;
            font-weight: 200;
        }
    }
    .c-card-content {
        padding: 10px;
    }
    .c-card-footer {
        padding: 10px;
    }
}

</style>
