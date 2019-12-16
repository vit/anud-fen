<template>
  <nav class="navbar">
    <div class="width-container">
      <div class="logo-container" sstyle="display: flex;"><router-link class="" to="/" exact
            ><img src="https://nc.bigbrowser.ru/wp-content/themes/anud-publisho/img/logo-full.svg.php?l=ru" width="240" height="60"
        ></router-link></div>
      <div class="menu-container">
        <ul class="menu menu-1">
          <li class="menu-item" v-for="(item, index) in menu_data_1" :key="index">
            <!--nuxt-link class="" :to="url_to_link(item.url)" :exact="['/', ''].indexOf( url_to_link(item.url) )>=0"-->
            <nuxt-link class="" :to="item.url" :exact="['/', ''].indexOf( item.url )>=0">
              {{item.title}} <fa-icon icon="chevron-down" v-if="item.children.length>0" />
            </nuxt-link>
            <ul class="submenu" v-if="item.children.length>0">
              <li class="submenu-item" v-for="(subitem, subindex) in item.children" :key="subindex">
                <!--nuxt-link class="" :to="url_to_link(subitem.url)" :exact="['/', ''].indexOf( url_to_link(subitem.url) )>=0"-->
                <nuxt-link class="" :to="subitem.url" :exact="['/', ''].indexOf( subitem.url )>=0">
                  {{subitem.title}}
                </nuxt-link>
              </li>
            </ul>
          </li>
        </ul>
        <ul class="menu menu-2">
          <li class="menu-item" v-for="(item, index) in menu_data_2" :key="index">
            <!--nuxt-link class="" :to="url_to_link(item.url)" :exact="['/', ''].indexOf( url_to_link(item.url) )>=0"-->
            <nuxt-link class="" :to="item.url" :exact="['/', ''].indexOf( item.url )>=0">
              {{item.title}} <fa-icon icon="chevron-down" v-if="item.children.length>0" />
            </nuxt-link>
            <ul class="submenu" v-if="item.children.length>0">
              <li class="submenu-item" v-for="(subitem, subindex) in item.children" :key="subindex">
                <!--nuxt-link class="" :to="url_to_link(subitem.url)" :exact="['/', ''].indexOf( url_to_link(subitem.url) )>=0"-->
                <nuxt-link class="" :to="subitem.url" :exact="['/', ''].indexOf( subitem.url )>=0">
                  {{subitem.title}}
                </nuxt-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="profile-container">
        <ul class="menu menu-2 menu-my" v-if="!!userData">
          <li class="menu-item">
            <nuxt-link class="" to="/my">
              <fa-icon icon="user" /> {{userInitials}} <fa-icon icon="chevron-down" />
            </nuxt-link>
            <div class="submenu submenu-right">
              <div class="submenu-header">
                <div class="submenu-title">
                  {{userFullName}}
                </div>
              </div>
              <ul cclass="submenu submenu-right">
                <li class="submenu-item">
                  <nuxt-link class="" to="/my">
                    Мои дела
                  </nuxt-link>
                </li>
                <li class="submenu-item">
                  <nuxt-link class="" to="/my/profile">
                    Мой профиль
                  </nuxt-link>
                </li>
                <li class="submenu-item">
                  <nuxt-link class="" to="/my/favorites">
                    Мои закладки
                  </nuxt-link>
                </li>
                <li class="submenu-item">
                  <a class="" @click="$store.dispatch('user/logout', {})">
                    Выйти
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <!--div v-else-->
          <!--b-button tag="router-link" type="is-primary" ooutlined to="/auth/login" icon-left="user" style="margin: 5px;">Войти</b-button-->
          <!--fa-icon icon="user" /><nuxt-link to="/auth/login" icon-left="user" style="margin: 5px;">Войти</nuxt-link>
        </div-->
        <ul class="menu menu-2 menu-my" v-else>
          <li class="menu-item">
            <nuxt-link :to="logon_link" icon-left="user" sstyle="margin: 5px;"><fa-icon icon="sign-in-alt" /> Войти</nuxt-link>
          </li>
        </ul>


      </div>

      <div class="button-container">
        <button class="menu-button"  v-on:click.stop.prevent="toggleMenu" :class="{pressed: $store.state.interface.mobileMenuOn}">
          <fa-icon icon="times" size="2x" v-if="$store.state.interface.mobileMenuOn" />
          <fa-icon icon="bars" size="2x" v-else />
        </button>
      </div>

      <!--div class="clearfix"></div-->
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
//import LoginModal from './LoginModal.vue';

import axios from 'axios';
import https from 'https'

// At instance level
const axios1 = axios.create({
  httpsAgent: new https.Agent({  
    rejectUnauthorized: false
  })
})


export default {
  name: 'PrimaryMenu',
  props: {
    msg: String
  },
  components: {
//    LoginModal
  },
  data() {
    return {
//      menu_data_1: [],
//      menu_data_2: [],
      url_prefix: 'https://acanud.ru'
    };
  },
  computed: {
    ...mapGetters('user', {
      userFullName: 'fullName',
      userInitials: 'initials',
      jwtData: 'jwtData',
      jwtHeader: 'jwtHeader',
    }),
    userData: function() {
      return this.$store.getters['user/data'];
    },
    menu_data_1() {
      return this.$store.state.wp.menu_data_1;
    },
    menu_data_2() {
      return this.$store.state.wp.menu_data_2;
    },
    logon_link() {
//      return '/auth/login?after_path='+this.$route.fullPath;
      return '/auth/login?after_path='+encodeURIComponent(this.$route.fullPath);
    }
  },
  methods: {
    toggleMenu() {
      this.$store.commit('interface/toggleMobileMenu');
      //console.log("toggleMenu");
    },
    url_to_link(url) {
      return url ? url.replace(this.url_prefix, '') : "";
    },
    parse_menu_response( response ) {
      const menu_data = [];
      const menu_map = {};
      response.data.forEach( (item) => {
        const data = item;
        data.children = [];
        if(item.menu_item_parent > 0) {
          menu_map[item.menu_item_parent].children.push(data);
        } else {
          menu_data.push(data);
          menu_map[item.ID] = data;
        }
      });
      return menu_data;
    },
  },
  created() {
  },

}
</script>

<style lang="scss" scoped>

//@import "~@fortawesome/vue-fontawesome";

$thetransition: all .4s cubic-bezier(1,.25,0,.75) 0s;

@import "~/assets/variables.scss";

//$main-color: #07345b;
$main-color: $primary;

.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: rgba(255,255,255,0.9);
  box-shadow: 0px 1px 3px $main-color;
  box-sizing: border-box;
  z-index: 9999;

  .menu-container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .logo-container {
    margin: 5px 0;
    a {
        img {
          display: block;
        }
    }
  }

  .profile-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
//    justify-content: center;
  }
  .button-container {
//    display: flex;
    flex-direction: column;
//    justify-content: flex-end;
    justify-content: center;
    display: none;
    .menu-button {
//      color: #000077;
      color: #07345b;
      margin: 0px;
      padding: 5px;
      background-color: transparent;
      //border: none;
      &:focus {outline:0;}
      &.pressed {
        //border: none;
      }
    }
  }
  .width-container {
    padding: 5px none;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  @media only screen and (max-width : 1024px) {
    .menu-container {
      display: none;
    }
    .profile-container {
      display: none;
    }
    .button-container {
      display: flex;
    }
  }



  .menu {
    margin: 0;
    padding: 0;
    text-align: right;
//    text-align: left;
    .menu-item {
      display: inline-block;
        &:last-child {
            margin-right: 0;
        }
        &:first-child {
            margin-left: 0;
        }
      a {
        padding-bottom: 4px;
//        text-transform: uppercase;
//        font-size: 80%;
//        font-weight: 100;
        font-weight: 400;
        -letter-spacing: 1px;

        display: inline-block;
        color: $main-color;
        text-decoration: none;

        position: relative;


        &:before {
          content: "";
          position: absolute;
          width: 100%;
          height: 2px;
          -bottom: -2px;
          -bottom: 0px;
          bottom: 3px;
          left: 0;
          -background-color: #f00;
          -background-color: $main-color;
          -background-color: #ff9900;
          background-color: $danger;
          -background-color: #d2691e;
          -background-color: #cc7722;
          visibility: hidden;
          -webkit-transform: scaleX(0);
          transform: scaleX(0);
          -webkit-transition: $thetransition;
          transition: $thetransition;
        }
        &:hover:before {
          visibility: visible;
          -webkit-transform: scaleX(1);
          transform: scaleX(1);
        }

//        &::before {
//          font-family: 'Font Awesome 5 Free';
//          font-weight: 900;
//          content: '\f06d';
//        }


      }
    }
  }


.menu {
  >.menu-item {
        >.nuxt-link-active:before,
        >.router-link-active:before {
          visibility: visible;
          -transition: none;
          -webkit-transform: scaleX(1);
          transform: scaleX(1);
        }
  }
}
.submenu {
//      min-width: 15em;
  >.submenu-item {
        >.nuxt-link-exact-active:before,
        >.router-link-exact-active:before {
          visibility: visible;
          -transition: none;
          -webkit-transform: scaleX(1);
          transform: scaleX(1);
        }
  }
}



  .menu-1 {
    margin: 5px 0 0 0;
    .menu-item {
//      margin: 2px 10px;
//      margin: 2px 8px;
      margin: 3px 10px;
//      font-size: 75%;
      font-size: 80%;
//      font-size: 60%;
      a {
//        letter-spacing: 0.1em;
      }
    }
  }

  .menu-2 {
//    margin: 10px 0 0 0;
    -border: thin solid red;
    .menu-item {
//      margin: 3px 12px;
      margin: 3px 10px;
      font-size: 100%;
//      font-size: 80%;
      a {
//        font-size: 100%;
//        letter-spacing: 0.1em;
      }
    }
  }

  .menu-my {
//    margin: 18px 0 0 10px;
    .menu-item {
      margin: 3px 12px;
//      font-size: 80%;
      font-size: 100%;
      a {
//        font-size: 100%;
//        letter-spacing: 0.1em;
      }
    }
  }


  .submenu {
    display: none;
    box-shadow: 1px 1px 4px $main-color;
    margin: 0;
//    padding: 0;
        padding: 5px 15px;
    background-color: #fff;
    position: absolute;
    z-index: 100;
    .submenu-item {
      display: block;
//      display: inline-block;
      a {
//        font-weight: 100;
        font-weight: 400;
//        letter-spacing: 1px;
        display: block;
//        padding: 5px 15px;
        color: $main-color;
        text-decoration: none;
        white-space: nowrap;
      }
    }
    .submenu-header {
      display: block;
      .submenu-title {
        margin: 10px 0;
        font-weight: 700;
        white-space: nowrap;
      }
    }
  }

  .menu-item:hover > .submenu {
    display: block;
  }
  .menu-item {
    position: relative;
    .submenu.submenu-right {
      left: inherit;
      right: -15px;
      text-align: right;
    }
    .submenu {
      text-align: left;
      left: -15px;
      right: inherit;
      top: 100%;
    }
    &:last-child {
      .submenu {
        left: inherit;
        right: -15px;
        text-align: right;
      }
    }
  }

}


</style>
