<template>
    <div>
        <SubMenu />
        <v-content class="pl-0">
          <v-container>
            <p style="font-weight: bold; font-size: 1.3em;" class="mt-n12 mx-auto">Laporan Pelayanan Kefarmasian dan POR di Puskesmas</p>
              <v-card color="basil">

                  <v-tabs
                    background-color="transparent"
                    color="basil"
                    grow>
                    <v-tab @click="clickLaporan">
                      Laporan POR dari Kab/Kota
                    </v-tab>
                    <v-tab @click="clickRekap">
                      Rekap POR dari Kab/Kota
                    </v-tab>
                  </v-tabs>

                  <v-tabs-items>
                    <v-tab-item>
                      <v-card
                        color="basil"                        
                        flat>
                        <v-card-text>Data Rekap POR dari Kab/Kota</v-card-text>
                      </v-card>
                    </v-tab-item>
                    <v-tab-item>
                      <v-card
                        color="basil"                        
                        flat>
                        <v-card-text>Data Rekap POR dari Kab/Kota</v-card-text>
                      </v-card>
                    </v-tab-item>
                  </v-tabs-items>
                  
                </v-card>

                <v-card style="padding: 1em;">
                    <p style="font-weight: bold; font-size: 1.2em;">{{subjudul}}</p>
                    <vue-excel-editor style="z-index: 2; width: 100%;" :page=20 v-model="jsondata" autocomplete filter-row ref="grid">
                        <vue-excel-column width="300px" field="NAMA_OBAT"   label="NAMA OBAT" />
                        <vue-excel-column field="SATUAN"  label="SATUAN" />
                        <vue-excel-column field="SISA_STOK" label="SISA STOK" />
                        <vue-excel-column field="PEMAKAIAN_RATA_RATA"    label="PEMAKAIAN RATA-RATA" />
                        <vue-excel-column width="200px" field="TINGKAT_KETERSEDIAAN_PER_BULAN"  label="TINGKAT KETERSEDIAAN (BULAN)" />
                    </vue-excel-editor>
                </v-card>
          </v-container>
        </v-content>
    </div>
</template>

<script>

import obatVaksinObat from '@/config/formVaksinObat150';
import SubMenu from './SubMenu'

export default {
  name: 'POR',
    data () {
      return {
        jsondata: obatVaksinObat,
        subjudul: ''
      }
    },
    components: {
        SubMenu
    },
    methods: {
      clickLaporan: function() {
          console.log('testing')
          this.subjudul = "Laporan Data"
      },
      clickRekap: function() {
          this.subjudul = "Rekap Data"
      }
    },
    created() {
      this.idDaerah = this.$store.getters.userData.KODE_DAERAH
    }
}
</script>
