<template>
  <section class="width-container">
    <T>
      <div v-if="only_not_logged && $store.getters['user/data']">Вы вошли в систему</div>
      <slot v-else></slot>
    </T>
  </section>
</template>

<script>

//import WpPage from '~/components/wp/WpPage'
//import T from '~/components/templates/WithRightSidebar'
const T = () => import('~/components/templates/WithRightSidebar')

export default {
  components: {
//    WpPage,
    T
  },
  props: [
    'only_not_logged'
  ]
}

</script>

<style lang="scss" scoped>
</style>

