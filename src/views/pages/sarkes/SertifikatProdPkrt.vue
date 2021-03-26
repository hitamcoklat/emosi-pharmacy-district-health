<template>
    <div>
        <SubMenu />
        <v-content class="pl-0">
          <v-container style="max-height: 600px !important;">
              <p style="font-weight: bold; font-size: 1.3em;" class="mt-n12 mx-auto">Sertifikat Produksi PKRT</p>
              <v-card color="basil">
                  <v-tabs
                    v-model="tab"
                    background-color="transparent"
                    color="basil"
                    grow>
                    <v-tab>Pusat</v-tab>
                  </v-tabs>

                  <v-tabs-items v-model="tab">
                    <v-tab-item>
                      <DataPusat />
                    </v-tab-item>
                  </v-tabs-items>
                </v-card>              
          </v-container>
        </v-content>

        <!-- Loading Login -->        
    </div>
</template>

<style scoped>
  table tbody tr td {
    font-size: 0.4em !important;
  }
</style>

<script>

import DataCabang from './dataCabang/PenyalurAlkes'
import DataPusat from './dataPusat/SertifikatProdPkrt'
import routeList from '@/views/pages/sarkes/routeList';
import SubMenu from './SubMenu'

export default {
    data () {
      return {
        tab: null,
      }
    },
    components: {
      SubMenu,
      DataCabang,
      DataPusat
    },
    computed: {

    },
    methods: {

    },
    created() {
      if(this.$store.getters.userData.JENIS_LOGIN == 'provinsi') {
        this.idDaerah = 32
      } else {
        this.idDaerah = this.$store.getters.userData.KODE_DAERAH
      }
      this.$store.commit('STATUS_DRAWER', false)
    }
}
</script>
