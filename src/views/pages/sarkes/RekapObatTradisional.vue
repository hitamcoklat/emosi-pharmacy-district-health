<template>
    <div>
        <SubMenu />
        <v-content class="pl-0">
          <v-container>
              <p style="font-weight: bold; font-size: 1.3em;" class="mt-n12 mx-auto">Data Industri Obat Tradisional</p>
              <div>
                <v-card v-if="tampilanTablePusat">
                    <v-card-title>
                    Tampilan Tabel
                    <v-spacer></v-spacer>
                    <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                    ></v-text-field>
                    </v-card-title>
                    <v-data-table
                    dense
                    :headers="headersPusat"
                    :items="itemPusat"
                    :search="search"
                    >
                    <template v-slot:item.actions="{ item }">
                        <span style="color: #0E5491; cursor: pointer;" @click="lihatIzin(item.link_naskahizin)">
                        Lihat Izin
                        </span>
                    </template>                              
                    </v-data-table>
                </v-card>
              </div>
          </v-container>
        </v-content>
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

<script>

import obat40item from '@/config/obat40item'
import {ListBulan, ListTahun} from '@/config'
import itemVaksin from '@/config/vaksin5item'
import routeList from '@/views/pages/sarkes/routeList';
import readXlsxFile from 'read-excel-file'
import SubMenu from './SubMenu'

export default {
  name: 'Oblik',
    data () {
      return {
        items: routeList,
        right: null,
        dialogLoading: false,
        showWarning: true,
        idDaerah: '',
        tampilanTablePusat: true,
        id: '',
        headersPusat: [
          {
            text: 'Nama PT',
            align: 'start',
            sortable: false,
            value: '',
          },
          { text: 'NIB', value: '' },
          { text: 'Alamat Perusahaan', value: '' },
          { text: 'Alamat Pabrik', value: '' },
          { text: 'Alamat Gudang', value: '' },
          { text: 'Kab/Kota', value: '' },
          { text: 'No. Telp', value: '' },
          { text: 'Nama Pimpinan', value: '' },
          { text: 'No. Izin Terbit', value: '' },
          { text: 'Tgl. Terbit Izin', value: '' },
          { text: 'No. Addendum & Tgl. (Scan Izin)', value: '' },
          { text: 'Golongan Kosmetika', value: '' },
          { text: 'Nama PJT', value: '' },
          { text: 'No STR', value: '' },
          { text: 'Bentuk Sediaan', value: '' },
          { text: 'Scan Izin (Download)', value: 'actions' },
        ],
        itemPusat: [],          
      }
    },
    components: {
      SubMenu
    },     
    computed: {

    },
    methods: {
      
    },
    created() {
      this.idDaerah = this.$store.getters.userData.KODE_DAERAH
    }
}
</script>
