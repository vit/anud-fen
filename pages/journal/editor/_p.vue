<template>
    <Page>
        <App
            v-if="jwt_token"
            app_name='journal.editor'
            role_path='editor'
        />
        <div v-else>
            Пожалуйста войдите в систему, чтобы начать работу
        </div>
    </Page>
</template>

<script>

import Page from '~/components/Page'
import App from '~/lib/comsep/gui/App.vue'

export default {
    components: {
        App,
        Page
    },
    computed: {
        jwt_token() { return this.$store.state.user.jwt },
    },
}

</script>

