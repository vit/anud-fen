
<template>
    <div class="container">
        <div class="main">
            <slot></slot>
        </div>
        <div class="sidebar" v-if="show_sidebar">
            <div>
              <ul class="sidebar-menu">
                <li class="menu-item" v-for="(item, index) in sidebar_menu" :key="index">
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

                <template v-if="event_data">
                  <h3 class='menu-subheader'>Даты</h3>
                  <li class="menu-item-incut">
                    <span class="menu-text">
                      <b style="color: red;" v-if="event_data.startDateString==event_data.endDateString">
                          {{ event_data.startDateString }}
                      </b>
                      <b style="color: red;" v-else>
                          {{ event_data.startDateString }}&mdash;{{ event_data.endDateString }}
                      </b>
                      (проведение)
                    </span>
                  </li>
                </template>


              </ul>
            </div>

            <template v-if="context_name">
              <JournalSidebar v-if="$store.getters['wp/getCurrentComsepContextName']=='gn'" />
              <LibrarySidebar v-else-if="$store.getters['wp/getCurrentComsepContextName']=='lib'" />
              <ConferenceSidebar v-else />
            </template>

            <!--hr>
            <div style="border: thin solid red; height: 150px; overflow-y: scroll; overflow-x: wrap; overflow-wrap: break-word; margin-bottom: 15px; padding: 5px;">
              <b>Логи</b>
              <p v-for="(item, index) in $store.state.log.items" :key="index">
                {{item}}
              </p>
              <hr>
            </div-->

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
    computed: {
      sidebar_menu() {
        const menu = this.$store.getters['wp/getCurrentSidebarMenu'];
        return menu && Array.isArray(menu) && menu.length>0 ? menu : null;
      },
      event_data() {
        return this.$store.getters['wp/getEventData']
      },
      context_name() {
        return this.$store.getters['wp/getCurrentComsepContextName']
      },
      show_sidebar() {
        return this.sidebar_menu || this.event_data || this.context_name;
      }
    }
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