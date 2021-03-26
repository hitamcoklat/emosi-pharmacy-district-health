<template>
  <v-card
    flat
    height="auto"
    width="256"
    class="mx-auto float-left"
  >
    <v-navigation-drawer permanent>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Sub Menu
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        style="padding: 0 !important; margin: 10px !important;"
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          style="border: 1px solid #CCC;"
          :style="[submenu == item.toLink ? {'background-color': '#C1CCCF'} : {'background': '#FFF'}]"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content @click="toPage(item.toLink)">
            <p>{{ item.title }}</p>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>    
</template>

<script>

import routeList from './routeList';
import routeListKabkot from './routeListKabkot';

export default {
  name: 'SubMenu',
    data () {
      return {
        items: (this.$store.getters.userData.JENIS_LOGIN == 'provinsi') ? routeList : routeListKabkot,
        submenu: ''
      }
    },
    methods: {
      toPage: function(link) {
        this.$store.commit('ACTIVE_LINK', {
          parent: 'sarkes',
          child: link
        })
        this.$router.push(link)
        // console.log(link)
      }
    },
    created() {
      console.log(this.$store.getters.userData.JENIS_LOGIN)
      this.submenu = this.$store.getters.activeLink.child
      if(this.$store.getters.userData.JENIS_LOGIN == 'kabkot') {
        this.items = routeListKabkot
      }
      console.log(this.submenu)
    }
}
</script>