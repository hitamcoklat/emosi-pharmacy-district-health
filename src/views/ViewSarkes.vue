<template>
  <v-card    
    flat
    height="auto"
    width="256"
    class="mx-auto float-left"
  >
    <v-navigation-drawer>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Sub Menu
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          link
          style="border: 1px solid #CCC;"
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
  import routeList from '@/views/pages/sarkes/routeList';
  import routeListKabkot from '@/views/pages/sarkes/routeListKabkot';
  export default {
    name: 'SubMenu',
      data () {
        return {
          items: routeList,
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
        if(this.$store.getters.userData.JENIS_LOGIN == 'kabkot') {
          this.items = routeListKabkot
        }        
      }
  }
</script>