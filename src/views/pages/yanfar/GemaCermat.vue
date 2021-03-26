<template>
    <div>
        <SubMenu />
        <v-content class="pl-0">
          <v-container>
            <div style="margin: 20px;">
                <p style="font-weight: bold; font-size: 1.3em; margin-top: 2em; margin: 10px;" class="mt-n12 mx-auto">Gema Cermat</p>
                <v-col style="margin: 0 !important; padding: 0 !important;" class="d-flex" cols="12" sm="12">
                  <v-select
                    style="margin-right: 1em; width: 30px;"
                    :items="itemFilter"
                    v-model="pilihItemFilter"
                    outlined
                    label="Pilih Laporan"
                  ></v-select>
                  <v-btn style="margin-right: 1em;" v-on:click="fetchData" color="default" x-large>Cek Data</v-btn>
                  <v-btn v-if="dataExist" style="margin-right: 1em;" v-on:click="fetchData" color="primary" x-large>Update Data</v-btn>
                  <v-btn v-if="dataExist" style="margin-right: 1em;" v-on:click="fetchData" color="error" x-large>Hapus Data</v-btn>
                </v-col> 
            </div>            
          </v-container>
        </v-content>
    </div>
</template>

<script>

import obat40item from '@/config/obat40item'
import itemVaksin from '@/config/vaksin5item'
import routeList from '@/views/pages/yanfar/routeList';
import readXlsxFile from 'read-excel-file'
import SubMenu from './SubMenu'

export default {
  name: 'FormPOR',
    data () {
      return {
        items: routeList,
        right: null,
        msg: 'This is a button.',
        itemFilter: ['laporan Kabupaten/Kota', 'Laporan Master AOC', 'Laporan Rekap Provinsi', 'Rekap Provinsi'],
        pilihItemFilter: '',
        isUpdate: false,
        dialogLoading: false,
        showWarning: true,
        idDaerah: '',
        textButton: 'Insert Data',
        id: ''
      }
    },
    components: {
        SubMenu
    },    
    methods: {

    },
    created() {
      this.idDaerah = this.$store.getters.userData.KODE_DAERAH
    }
}
</script>