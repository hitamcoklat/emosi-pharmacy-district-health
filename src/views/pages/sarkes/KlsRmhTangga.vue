<template>
    <div>
        <SubMenu />
        <v-content class="pl-0">
            <v-container>
              <p style="font-weight: bold; font-size: 1.3em;" class="mt-n12 mx-auto">PKRT / ALKES (KELAS RUMAH TANGGA)</p>
            </v-container>
        </v-content>
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
        itemData: [],
        right: null,
        isUpdate: false,
        dialogLoading: false,
        showWarning: true,
        idDaerah: '',
        id: '',
        search: '',
        tab: null,
        tampilanTableCabang: true,
        tampilanExcellCabang: false,
        headersCabang: [
          {
            text: 'Nama Perusahaan',
            align: 'start',
            sortable: false,
            value: 'n_perusahaan',
          },
          { text: 'Alamat Perusahaan', value: 'a_perusahaan' },
          { text: 'Alamat Gudang', value: 'Alamat_Gudang' },
          { text: 'Kab/Kota Gudang', value: 'Kab_Kota_Gudang' },
          { text: 'Telp. Pemohon', value: 'telp_pemohon' },
          { text: 'Nama Pimpinan', value: 'nama_pimpinan' },
          { text: 'No. Izin', value: 'no_izin' },
          { text: 'Tgl. Terbit Izin', value: 'tgl_terbit_izin' },
          { text: 'Nama Perizinan', value: 'n_perizinan' },
          { text: 'Nama PJT', value: 'Nama_PJT' },
          { text: 'NIB', value: 'nib' },
          { text: 'Link Naskah Izin', value: 'actions' },
        ],
        itemCabang: [],                       
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
      if(this.$store.getters.userData.JENIS_LOGIN == 'provinsi') {
        this.idDaerah = 32
      } else {
        this.idDaerah = this.$store.getters.userData.KODE_DAERAH
      }
      this.$store.commit('STATUS_DRAWER', false)
    }
}
</script>
