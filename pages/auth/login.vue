<template>
    <Page only_not_logged=true>
        <FormCard
            :formDescr="{
                title: 'Вход',
                fields: fields,
                buttons,
                links: links,
                onSubmit, 
                data: formData,
            }"
        >
        </FormCard>
    </Page>
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
    };
  },
    computed: {
        ...mapGetters('user', {
            userId: 'id',
//            userInitials: 'initials',
        }),
        after_path() { return this.$route.query.after_path },
        links() {
            return [
                {
//                    url: 'register',
                    url: 'register' + (this.after_path ? '?after_path='+this.after_path : ''),
                    label: 'Еще нет аккаунта?',
                }
            ]
        },
    },
    methods: {
        onSubmit() {
            this.$store.dispatch('user/login', this.formData);
        },
    },

    watch: {
        userId(newValue, oldValue) {
            console.log(`userId: Updating from ${oldValue} to ${newValue}`);
            if(newValue) {
                if(this.after_path)
                    this.$router.push(this.after_path);
                else
                    this.$router.push('/');
            }
        },
    }

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
