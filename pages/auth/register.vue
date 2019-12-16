<template>
    <Page only_not_logged=true>
        <FormCard
            :formDescr="formDescr"
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
                email: '',
                password: '',
                repeat_password: '',
                rememberMe: true,
            }
        };
    },
    computed: {
        ...mapGetters('user', {
            userId: 'id',
//            userInitials: 'initials',
        }),
        after_path() { return this.$route.query.after_path },

        formDescr() {
            return {
                title: 'Регистрация',
                onSubmit: this.onSubmit, 
                data: this.formData,
                fields: [
                    {name: 'lname', type: 'text', label: 'Фамилия', placeholder: 'Ваша фамилия'},
                    {name: 'fname', type: 'text', label: 'Имя', placeholder: 'Ваше имя'},
                    {name: 'mname', type: 'text', label: 'Отчество', placeholder: 'Ваше отчество'},
                    {name: 'email', type: 'email', label: 'Email', placeholder: 'Ваш email'},
                    {name: 'password', type: 'password', label: 'Пароль', placeholder: 'Задайте пароль'},
                    {name: 'repeat_password', type: 'password', label: 'Повторить пароль', placeholder: 'Повторите пароль'},
        //            {name: 'rememberMe', type: 'checkbox', label: 'Запомнить меня'},
                ],
                buttons: [
                    {
                        name: 'submit',
                        type: 'submit',
                        style: 'default',
                        label: 'Зарегистрироваться',
                        //action: this.onSubmit
                    }
                ],
                links: [
                    {
                        url: 'login' + (this.after_path ? '?after_path='+this.after_path : ''),
                        label: 'Уже есть аккаунт!',
                    }
                ]
            }
        }
    },
    methods: {
        onSubmit() {
//            console.log("onSubmit()", this.formData);
            this.$store.dispatch('user/register', this.formData);
        }
    },
    watch: {
        userId(newValue, oldValue) {
//            console.log(`userId: Updating from ${oldValue} to ${newValue}`);
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
