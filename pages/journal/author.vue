<template>
    <Page>
    <div cclass="width-container">
        <!--h1>Journal Author Submissions</h1-->
        <nuxt-child/>
    </div>
    </Page>
</template>

<script>
import Page from '~/components/Page'

export default {
  //name: 'LoginForm',
  components: {
      Page,
  },
}
</script>

