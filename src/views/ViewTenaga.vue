<template>
<div>
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
  <v-content style="padding: 10px !important;" md="12" sm="12">

  </v-content>
</div>
  
</template>
<script>
  import routeList from '@/views/pages/tenaga/routeList';
  import routeListProvinsi from '@/views/pages/tenaga/routeListProvinsi';
  
  export default {
    name: 'SubMenu',
      data () {
        return {
          items: (this.$store.getters.userData.JENIS_LOGIN !== 'provinsi') ? routeList : routeListProvinsi,        
        }
      },
      components: {
      },
      methods: {
        toPage: function(link) {
          this.$store.commit('ACTIVE_LINK', {
            parent: 'tenaga',
            child: link
          })
          this.$router.push(link)
          // console.log(link)
        }
      },
      created() {
      }
  }
</script>