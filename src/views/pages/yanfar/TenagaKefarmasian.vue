<template>
    <div>
        <SubMenu />
        <v-content class="pl-0">
          <v-container>
            <div style="margin: 20px;">
                <p style="font-weight: bold; font-size: 1.3em; margin-top: 2em; margin: 10px;" class="mt-n12 mx-auto">Tenaga Kefarmasian</p>
                <v-col style="margin: 0 !important; padding: 0 !important;" class="d-flex" cols="12" sm="12">
                  <v-select
                    dense
                    style="margin-right: 1em; width: 30px;"
                    :items="itemJenis"
                    v-model="pilihItemJenis"
                    outlined
                    label="Pilih Jenis"
                  ></v-select>
                  <v-select
                  dense
                    v-if="pilihItemFaskes == 'Puskesmas'"
                    style="margin-right: 1em; width: 30px;"
                    :items="itemFilterPuskesmas"
                    v-model="pilihFilterPuskesmas"
                    outlined
                    label="Jenis Filter Jenis Puskesmas"
                  ></v-select>                  
                  <v-select
                  dense
                    style="margin-right: 1em; width: 30px;"
                    :items="itemFilter"
                    v-model="pilihFilter"
                    outlined
                    label="Jenis Filter"
                  ></v-select>
                  <v-select
                    dense
                    style="margin-right: 1em; width: 30px;"
                    :items="itemFilterRange"
                    v-model="pilihFilterRange"
                    outlined
                    label="Jenis Filter Range"
                  ></v-select>
                  <v-btn style="margin-right: 1em;" v-on:click="fetchData" color="default">Cek Data</v-btn>
                  <v-btn v-if="dataExist" style="margin-right: 1em;" v-on:click="fetchData" color="primary">Update Data</v-btn>
                  <v-btn v-if="dataExist" style="margin-right: 1em;" v-on:click="fetchData" color="error">Hapus Data</v-btn>
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
        itemJenis: ['Apotek', 'TTK'],
        pilihItemJenis: '',
        itemApotek: ['Rumah Sakit', 'Puskesmas'],
        pilihItemApotek: '',
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
      if(this.$store.getters.userData.JENIS_LOGIN == 'provinsi') {
        this.idDaerah = 32
      } else {
        this.idDaerah = this.$store.getters.userData.KODE_DAERAH
      }
      this.jenisLogin = this.$store.getters.userData.JENIS_LOGIN
    }
}
</script>