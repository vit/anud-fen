<template>
    <div class="width-container">
        <h1>Workflow frontend</h1>
        <div>
            <button v-on:click="$store.dispatch('workflow/getList', {})">Load List</button>
            List: {{$store.state.workflow.wfList}}
        </div>
        <hr />
        <div>
            <button v-on:click="$store.dispatch('workflow/getSchema', {id: '__ROOT__'})">Load Schema</button>
            Schema:
            <div class="schema">
                <table v-if="$store.state.workflow.wfSchema && $store.state.workflow.wfSchema.roles" border="1" width="100%">
                    <thead>
                        <tr>
                            <th v-for="(role, role_name) in $store.state.workflow.wfSchema.roles" :key="role_name" align="center">
                                {{role_name}}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td v-for="(role, role_name) in $store.state.workflow.wfSchema.roles" :key="role_name">
                                <div v-for="(event, event_name) in role.events" :key="event_name" class="event">
                                    <button v-on:click=
                                        "$store.dispatch('workflow/sendEvent', {id: '__ROOT__', role: role_name, name: event_name, payload: 'payload data'})"
                                        :disabled="!event.available"
                                        :class="{active: event.available}"
                                    >
                                        {{event_name}}
                                    </button>
                                    <div v-for="(transition, transition_name) in event.transitions" :key="transition_name" :class="{ active: transition.available, inactive: !transition.available }">
                                        {{transition}}
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="state" v-if="$store.state.workflow.data && $store.state.workflow.data.reply && $store.state.workflow.data.reply.state">
                State: <b>{{$store.state.workflow.data.reply.state}}</b>
            </div>
        </div>
        <hr />
        <!--button v-on:click="$store.dispatch('workflow/sendPing', {id: '__ROOT__', payload: 'ping data'})">Ping</button-->
        <div>
            {{$store.state.workflow.data}}
        </div>
    </div>
</template>


<script>
import { mapGetters } from 'vuex'

export default {
  name: 'wf-frontend',
/*
  props: {
  },
  data() {
    return {
        loginFormData1: {
            email: '',
            password: '',
        },
        email: '',
        password: '',
        rememberMe: true
    };
  },
  computed: {
    ...mapGetters('user', {
      userFullName: 'fullName',
      userInitials: 'initials',
    }),
    loginFormData2: {
        get() {
            return this.$store.state.user.loginFormData
        },
        set(value) {
            this.$store.commit('user/setLoginFormData', value)
        }
    },
  },
    methods: {
        onSubmit() {
            this.login();
        },
        login() {
            this.$store.dispatch('user/login', {
                email: this.email,
                password: this.password,
                rememberMe: this.rememberMe
            });
        }
    },
*/
}

</script>

<style lang="scss" scoped>
    .schema {
        border: thin solid black;
//        padding: 5px;
        margin: 10px;
        .event {
            margin: 10px;
        }
        .active {
//            color: green;
            color: #22aa33;
        }
        .inactive {
            text-decoration: line-through;
//            color: red;
        }
    }
</style>
