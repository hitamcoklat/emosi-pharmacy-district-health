<template>
    <div>
        <SubMenu />
        <v-content class="pl-0">
          <v-container>
            <v-row>
              <v-col cols="12" lg="12" sm="12" md="12">
                <v-btn depressed color="teal" @click="$router.push('/oblik/persentasi-farmasi-vaksin-sesuai-standar/list')" dark elevation="2">Lihat Data</v-btn>                
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                  <iframe style="width: 100%; height: 680px; border: 0 !important; background-color: grey;" :src="`http://localhost/project/farmasi/form/indikator-instalasi-farmasi.php?id_daerah=${idDaerah}`" />
                  <!-- <iframe style="width: 100%; height: 680px; border: 0 !important; background-color: grey;" src="http://103.147.222.234/e-mosi/form/indikator-instalasi-farmasi.php" /> -->
              </v-col>
            </v-row>              
          </v-container>
        </v-content>
    </div>
</template>

<script>

import obat40item from '@/config/obat40item'
import pdf from 'vue-pdf'
import routeList from '@/views/pages/oblik/routeList';
import SubMenu from './SubMenu'

export default {
  name: 'Oblik',
    components: {
        pdf,
        SubMenu
    },
    data () {
      return {
        currentPage: 0,
        pageCount: 0,          
        items: routeList,
        itemObat: obat40item,
        right: null,
        idDaerah: ''
      }
    },
    created() {
      this.idDaerah = this.$store.getters.userData.KODE_DAERAH
      console.log(this.itemObat);
    }
}
</script>
