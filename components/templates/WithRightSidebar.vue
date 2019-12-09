
<template>
    <div class="container">
        <div class="main">
            <slot></slot>
        </div>
        <div class="sidebar">
            <div>
              <ul class="sidebar-menu">
                <li class="menu-item" v-for="(item, index) in $store.getters['wp/getCurrentSidebarMenu']" :key="index">
                  <nuxt-link class="" :to="item.url" :exact="['/', ''].indexOf( item.url )>=0">
                    {{item.title}} <fa-icon icon="chevron-down" v-if="item.children.length>0" />
                  </nuxt-link>
                  <ul class="submenu" v-if="item.children.length>0">
                    <li class="submenu-item" v-for="(subitem, subindex) in item.children" :key="subindex">
                      <nuxt-link class="" :to="subitem.url" :exact="['/', ''].indexOf( subitem.url )>=0">
                        {{subitem.title}}
                      </nuxt-link>
                    </li>
                  </ul>
                </li>

                <template v-if="!!$store.getters['wp/getEventData']">
                  <h3 class='menu-subheader'>Даты</h3>
                  <li class="menu-item-incut">
                    <span class="menu-text">
                      <b style="color: red;" v-if="$store.getters['wp/getEventData'].startDateString==$store.getters['wp/getEventData'].endDateString">
                          {{ $store.getters['wp/getEventData'].startDateString }}
                      </b>
                      <b style="color: red;" v-else>
                          {{ $store.getters['wp/getEventData'].startDateString }}&mdash;{{ $store.getters['wp/getEventData'].endDateString }}
                      </b>
                      (проведение)
                    </span>
                  </li>
                </template>


              </ul>
            </div>

            <template v-if="$store.getters['wp/getCurrentComsepContextName']">
              <JournalSidebar v-if="$store.getters['wp/getCurrentComsepContextName']=='gn'" />
              <LibrarySidebar v-else-if="$store.getters['wp/getCurrentComsepContextName']=='lib'" />
              <ConferenceSidebar v-else />
            </template>

            <hr>
            <div>
              {{$store.getters['wp/getCurrentComsepContextName']}} | {{$store.getters['wp/getCurrentComsepContextPath']}}
            </div>
            <hr>
            <div>
              %%{{$store.state.workflow.currentContext}}%%
            </div>

            <hr>
            <div style="border: thin solid red; height: 150px; overflow-y: scroll; overflow-x: wrap; overflow-wrap: break-word; margin-bottom: 15px; padding: 5px;">
              <b>Логи</b>
              <p v-for="(item, index) in $store.state.log.items" :key="index">
                {{item}}
              </p>
              <hr>
              <!--p v-for="(log, index) in $store.state.user.serverLog" :key="index">
                {{log}}
              </p-->
            </div>

            <!--div
              v-if="$store.state.wp.page_data && $store.state.wp.page_data.path_meta && $store.state.wp.page_data.path_meta.sidebar_rendered"
              v-html="$store.state.wp.page_data.path_meta.sidebar_rendered"
            ></div-->
        </div>
    </div>
</template>

<script>
//import { mapGetters } from 'vuex'
import JournalSidebar from '~/components/comsep/JournalSidebar'
import LibrarySidebar from '~/components/comsep/LibrarySidebar'
import ConferenceSidebar from '~/components/comsep/ConferenceSidebar'

export default {
    name: 'TemplateWithLeftSidebar',
    components: {
      JournalSidebar,
      LibrarySidebar,
      ConferenceSidebar
    },
}
</script>


<style lang="scss" -scoped>

.container {
    display: flex;
    //align-items: stretch;
}
.main {
    //margin-right: 200px;
    flex: 1;
}
.sidebar {
    width: 300px;
    background-color: #f5f5f5;
    //float: right;
}

.sidebar-menu {
  .menu-item {
    a {
//      display: inline-block;
      display: block;
      padding: 8px 16px;
    }
    a.nuxt-link-exact-active, a.not-exact.nuxt-link-active, a:hover {
      background-color: #000077;
      color: white;
    }
  }
  .menu-item-incut {
      display: block;
      padding: 2px 16px;
      //text-align: center;
  }
  .menu-text {
//      text-align: center;
  }
  .menu-subheader {
    padding: 0px 16px 0px 16px;
    //text-align: center;
  }
}


</style>