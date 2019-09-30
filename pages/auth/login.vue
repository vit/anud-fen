<template>
    <!--div class="width-container"-->
    <Page only_not_logged=true>
        <FormCard
            :formDescr="{
                title: 'Вход',
                fields: fields,
                buttons,
                links,
                onSubmit, 
                data: formData,
            }"
        >
        </FormCard>
        <!--hr>
    <div class="form-container">
      <form
        action=""
        @submit.stop.prevent="onSubmit"
        novalidate
        >
        <div class="c-card" style="width: auto">
            <header class="c-card-header">
                <p class="c-card-header-title">Вход</p>
            </header>
            <section class="c-card-content">
                <template v-for="field of fields">
                    <b-field v-if="['email', 'password'].includes(field.type)" :label="field.label" :key="field.name">
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
                    <b-checkbox
                        v-if="['checkbox'].includes(field.type)"
                        :name="field.name"
                        v-model="formData[field.name]"
                        :key="field.name"
                    >{{field.label}}</b-checkbox>
                </template>
            </section>
            <footer class="c-card-footer">
                <button type="submit" class="button is-primary c-card-footer-item is-outlined" ttype="button" cclick="login">Войти</button>
            </footer>
        </div>
      </form>  
    </div-->
    </Page>
    <!--/div-->
</template>

<script>
import { mapGetters } from 'vuex'
import Page from '~/components/Page'
import FormCard from '~/components/uniform/FormCard'

export default {
  name: 'LoginForm',
  components: {
      Page,
      FormCard
  },
  props: {
  },
  data() {
    return {
        formData: {
            rememberMe: true,
        },
        fields: [
            {name: 'email', type: 'email', label: 'Email', placeholder: 'Ваш email'},
            {name: 'password', type: 'password', label: 'Пароль', placeholder: 'Ваш пароль'},
            {name: 'rememberMe', type: 'checkbox', label: 'Запомнить меня'},
        ],
        buttons: [
            {
                name: 'submit',
                type: 'submit',
                style: 'default',
                label: 'Войти',
                //action: this.onSubmit
            }
        ],
        links: [
            {
                url: 'register',
//                label: 'Зарегистрироваться',
                label: 'Еще нет аккаунта?',
            }
        ]
    };
  },
  computed: {
    ...mapGetters('user', {
//      userFullName: 'fullName',
//      userInitials: 'initials',
    }),
  },
    methods: {
        onSubmit() {
            this.$store.dispatch('user/login', this.formData);
        }
    },

}
</script>


<style lang="scss" scoped>

//@import "~assets/variables";
/*
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
*/

</style>
