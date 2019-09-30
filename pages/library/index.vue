<template>
    <Page>

        <div>
            <template v-for="item in chain">
                <nuxt-link :to="'?id=' + (item._id ? item._id : '')" :key="item._id ? item._id : '-'">
                    {{item.title}}
                </nuxt-link> &gt;
            </template>
        </div>

        <h1>Библиотека</h1>
        <div v-if="$store.state.workflow.currentLibItem">
            <div v-if="$store.state.workflow.currentLibItem.doc">
                <h2>{{$store.state.workflow.currentLibItem.doc.title}}</h2>
                <div>
                    {{$store.state.workflow.currentLibItem.doc.abstract}}
                </div>
            </div>
            <div v-else>
                <h2>Корень библиотеки</h2>
            </div>
            <template v-if="$store.state.workflow.currentLibItem.children && $store.state.workflow.currentLibItem.children.length>0">
                <h3>Дочерние элементы</h3>
                <ul class="papers-list">
                    <li v-for="doc in $store.state.workflow.currentLibItem.children" :key="doc.id">
                        <nuxt-link :to="'?id='+doc._id">
                            {{doc.title}}
                        </nuxt-link>
                    </li>
                </ul>
            </template>
        </div>
        <!--hr>
        {{$store.state.workflow.currentLibItem}} -->
    </Page>
</template>

<script>
//import { mapGetters } from 'vuex'
import Page from '~/components/Page'
export default {
  name: 'Library',
  components: {
      Page,
  },
  computed: {
      chain() {
          let result = [{title: 'Библиотека', _id: null}];
          const currentItem = this.$store.state.workflow.currentLibItem;
          if(currentItem && currentItem.ancestors) {
            result = result.concat( currentItem.ancestors );
              if(currentItem.doc)
                result = result.concat( [currentItem.doc]);
          }
          return result;
      }
  }
}

</script>

<style lang="scss" scoped>
    ul.papers-list {
        list-style-type: disc;
        li {
            margin: 5px 0;
        }
    }
</style>
