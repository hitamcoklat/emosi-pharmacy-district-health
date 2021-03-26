<template>
    <div>
        <SubMenu />
        <v-content class="pl-0">
          <v-container>
              <v-row no-gutters>
                <v-col sm="12" md="12">
                    <p style="font-weight: bold; font-size: 1.3em;" class="mt-n12">Apoteker AoC</p>
                </v-col>
              </v-row>
              <v-row no-gutters>
                  <!-- Input Form -->
                  <v-col sm="12" md="12" cols="12">
                      <v-card outlined style="padding: 1em; width: 50%;">
                        <v-text-field
                            dense
                            outlined
                            v-model="content.NAMA"
                            :value="content.NAMA"
                            label="Nama (Tanpa Gelar)"
                            required></v-text-field>                          
                        <v-text-field
                            dense
                            outlined
                            v-model="content.INSTANSI"
                            :value="content.INSTANSI"
                            label="Instansi"
                            required></v-text-field>    
                        <v-select
                            dense
                            :items="listKabkot"
                            item-text="namaKabkot"
                            item-value="namaKabkot"
                            v-model="content.KABKOTA"
                            :value="content.KABKOTA"
                            outlined
                            label="Pilih Kabupaten / Kota"
                        ></v-select>                                                  
                        <v-select
                            dense
                            :items="listTahun"
                            v-model="content.TAHUN"
                            :value="content.TAHUN"
                            outlined
                            label="Tahun Pembekalan"
                        ></v-select>  
                        <v-text-field
                            dense
                            outlined
                            v-model="content.PELAKSANAAN_PEMBEKALAN"
                            :value="content.PELAKSANAAN_PEMBEKALAN"
                            label="Pelaksana Pembekalan"
                            required></v-text-field>  
                        <v-btn
                            color="success"
                            class="mr-4"
                            @click="submit">
                            Submit
                        </v-btn>
                        <v-btn
                            color="error"
                            class="mr-4"
                            @click="$router.go(-1)">
                            Kembali
                        </v-btn>
                      </v-card>
                  </v-col>
              </v-row>        
          </v-container>
        </v-content>
    </div>
</template>

<script>

import routeList from '@/views/pages/yanfar/routeList';
import readXlsxFile from 'read-excel-file'
import listKabkot from '../../../../config/listKabkot'
import listTahun from '../../../../config/listTahun'
import SubMenu from '../SubMenu'
import qs from "qs";

export default {
  props: ['content'],
    data () {
      return {
        search: '',
        items: routeList,
        right: null,
        pilihItemJenis: '',
        listKabkot: listKabkot,
        listTahun: listTahun,
        itemApotek: ['Rumah Sakit', 'Puskesmas'],
        pilihItemApotek: '',
        isUpdate: false,
        dialogLoading: false,
        showWarning: true,
        idDaerah: '',
        textButton: 'Insert Data',
        id: '',
        selectedMenu: '',
        form: [],
        dataRekapProvinsi: [],
        dataRekapKabkot: [],
      }
    },
    components: {
        SubMenu
    },    
    methods: {        
        resetForm: function() {
            this.form = []
        },
        submit: function () {
            let data = {
                content: this.content,
            }
            let urlPost = this.$apiUrl + '/apoteker/aoc/update';
            this.$http.post(urlPost, qs.stringify(data))
                .then((res) => {          
                    if(res.data.status == true) {
                        this.$swal(
                            'Success!',
                            'Data Berhasil di Input!',
                            'success'        
                        );
                        this.form = []                      
                    } else {
                        alert('Terjadi kesalahan')
                    }
                }) 
        }
    },
    created() {
      this.isUpdate = true
      if(this.$store.getters.userData.JENIS_LOGIN == 'provinsi') {
        this.idDaerah = 32
      } else {
        this.idDaerah = this.$store.getters.userData.KODE_DAERAH
      }
      this.jenisLogin = this.$store.getters.userData.JENIS_LOGIN
      console.log(this.content)
    }
}
</script>