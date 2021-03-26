<template>
  <v-app id="inspire">

    <v-app-bar
      app
      clipped-right
      color="dark"
      dark
      style="z-index: 2;"
    >
      <v-app-bar-nav-icon @click.stop="mini = !mini" />
      <v-toolbar-title>e - MOSI &#xb7; {{dataUser.NAMA_KABKOT}}</v-toolbar-title>
      <v-spacer />
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      src="https://ik.imagekit.io/igtoko/Frame_3__1__WU6R9QOSjIS.png"
      permanent
      app
      dark
    >
      <MenuComponent />
    </v-navigation-drawer>

    <v-navigation-drawer
      fixed
      temporary
    />

    <v-content>
      <!-- <v-container> -->
        <router-view></router-view>
      <!-- </v-container> -->
    </v-content>

<!--     <v-footer
      app
      dark
      color="blue-dark"
      class="white--text"
      style="z-index: 4;"
    >
      <span></span>
      <v-spacer />
      <span>&copy; 2019</span>
    </v-footer> -->
    <v-dialog
      v-model="dialog"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="dark"
        dark
      >
        <v-card-text>
          Please wait...
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>    
  </v-app>
</template>

<script>
  import MenuComponent from '@/components/MenuComponent.vue'

  export default {
    props: {
      source: String,
    },

    components: {
      MenuComponent
    },    

    data: () => ({
      dialog: false,
      drawer: null,
      drawerRight: null,
      permanent: true,
      miniVariant: false,
      expandOnHover: true,
      background: false,
      dataUser: [],
      mini: true
    }),

    watch: {
      // drawer: function() {
      //   // this.drawer = this.$store.getters.statusDrawer;
      //   this.drawerClick();
      // }
    },
    
    methods: {
      drawerClick: function() {
        this.drawer = !this.drawer;
        // this.$store.commit('STATUS_DRAWER', !this.$store.getters.statusDrawer)
        // this.drawer = this.$store.getters.statusDrawer;
      },
      checkDrawer: function() {
        // this.drawer = this.$store.getters.statusDrawer;
      }
    },
    
    created() {
      this.dataUser = this.$store.getters.userData
      this.drawer = this.$store.getters.statusDrawer
    },

  }
</script>
