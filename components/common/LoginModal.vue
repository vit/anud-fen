<template>

  <!--b-modal :active.sync="isActive" has-modal-card-->
    <!--modal-form vv-bind="formProps"-->
      <form action="" v-on:submit.prevent="login" v-on:keyup.enter="login">
        <div class="modal-card" style="width: auto">
            <header class="modal-card-head">
                <p class="modal-card-title">Login</p>
            </header>
            <section class="modal-card-body">
                <b-field label="Email">
                    <b-input
                        type="email"
                        :value="email"
                        placeholder="Your email"
                        ref="email"
                        autofocus
                        required>
                    </b-input>
                </b-field>

                <b-field label="Password">
                    <b-input
                        type="password"
                        :value="password"
                        password-reveal
                        placeholder="Your password"
                        required>
                    </b-input>
                </b-field>

                <b-checkbox>Remember me</b-checkbox>
            </section>
            <footer class="modal-card-foot">
                <button class="button" type="button" @click="$parent.close()" cclick="isActive = false">Close</button>
                <button class="button is-primary" type="button" @click="login">Login</button>
            </footer>
        </div>
      </form>  
    <!--/modal-form-->
  <!--/b-modal-->

</template>

<script>
import { mapGetters } from 'vuex'

/*
import axios from 'axios';
import https from 'https'

// At instance level
const axios1 = axios.create({
  httpsAgent: new https.Agent({  
    rejectUnauthorized: false
  })
})
*/

export default {
  name: 'LoginModal',
  props: {
  },
  data() {
    return {
      email: '',
      password: '',
    };
  },
  computed: {
    ...mapGetters('user', {
      userFullName: 'fullName',
      userInitials: 'initials',
    }),
    isActive: {
        get() {
            return this.$store.state.user.loginFormActive
        },
        set(value) {
            this.$store.commit('user/setLoginFormActive', value)
        }
    },
    userData () {
      return this.$store.state.user.data;
    }
  },
  watch: {
    userData (newData, oldData) {
      if( newData )
        this.$parent.close();
    }
  },
  methods: {
    login() {
      this.$store.dispatch('user/login', {});
    }
  },
  created() {
//    this.$refs.email.focus();
  },
  mounted() {
  },
  beforeUpdate() {
//    this.$refs.email.focus();
  },
  updated() {
//    this.$refs.email.focus();
  }

}
</script>

<style lang="scss" scoped>


</style>
