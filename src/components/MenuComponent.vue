<template>
<div>
<v-list dense>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            <v-icon>mdi-account-circle-outline</v-icon>
            <span style="margin-top: 10px; margin-left: 10px;">{{textHeader}}</span>
          </v-list-item-title>
          <v-list-item-subtitle>
            {{dataUser.NAMA_KABKOT}}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>  

      <router-link tag="span" to="/dashboard">
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-chart-line-stacked</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>      
      <router-link tag="span" to="/oblik">
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-database-check</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Obat Publik</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>
      <router-link tag="span" to="/yanfar">
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-pharmacy</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Pelayanan Kefarmasian</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>
      <router-link tag="span" to="/sarkes">
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-robot-vacuum</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Sarana Kefarmasian</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>
      <router-link tag="span" to="/tenaga-apoteker-ttk">
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-script-text</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Tenaga Apoteker dan TKK</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>
      <router-link v-if="dataUser.JENIS_LOGIN == 'provinsi'" tag="span" to="/monev">
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-bag-personal</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Monev Sarana</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>
      <router-link v-if="dataUser.JENIS_LOGIN == 'provinsi'" tag="span" to="/keg-pertemuan">
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-ballot-recount-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Keg. Pert. Seksi Farmalkes</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>
      <router-link v-if="dataUser.JENIS_LOGIN == 'provinsi'" tag="span" to="/sampling/data-sampling">
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-apple-keyboard-command</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Data Sampling</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>      
      <v-list-item style="color: red !important; font-weight: bold !important;" link>
        <v-list-item-action>
          <v-icon>mdi-logout-variant</v-icon>
        </v-list-item-action>
        <v-list-item-content @click="logout">
          <v-list-item-title>Log Out</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <!-- Loading Login -->
    <v-dialog
      v-model="dialogLoading"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="primary"
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
    <!-- Loading Login -->    
</div>     
</template>
<style scoped>
  .activeLink {
    background-color: #EEEEEE; 
    opacity: 0.6; 
    color: black !important;    
  }
</style>
<script>
export default {
  data: () => ({
    dialogLoading: false,
    dataUser: [],
    parentMenu: '',
    textHeader: ''
  }),   
  methods: {
    logout: function() {
      this.dialogLoading = true
      setTimeout(() => {
        this.dialogLoading = false
        this.$router.push('/logout')
      }, 2000);
    }
  },
  created() {
    this.parentMenu = this.$store.getters.activeLink.parent
    this.dataUser = this.$store.getters.userData
    if(this.dataUser.JENIS_LOGIN == 'provinsi') {
      this.textHeader = 'Prov. Jawa Barat'
    } else {
      this.textHeader = 'ID Daerah: ' + this.dataUser.KODE_DAERAH
    }
  }  
}
</script>