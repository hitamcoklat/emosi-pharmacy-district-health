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
                  <v-col sm="3" md="3">
                    <v-select
                        dense
                        style="margin-right: 1em;"
                        :items="itemJenis"
                        v-model="pilihItemJenis"
                        @change="gantiMenu"
                        label="Pilih Menu"
                    ></v-select>                      
                  </v-col>
              </v-row>  
              <v-row no-gutters>
                  <!-- Input Form -->
                  <v-col v-if="selectedMenu == 'Input' || selectedMenu == ''" sm="12" md="12" cols="12">
                      <v-card outlined style="padding: 1em; width: 50%;">
                        <v-text-field
                            dense
                            outlined
                            v-model="form.namaLengkap"
                            label="Nama (Tanpa Gelar)"
                            required></v-text-field>                          
                        <v-text-field
                            dense
                            outlined
                            v-model="form.instansi"
                            label="Instansi"
                            required></v-text-field>    
                        <v-select
                            dense
                            :items="listKabkot"
                            item-text="namaKabkot"
                            item-value="namaKabkot"
                            v-model="form.listKabkot"
                            outlined
                            label="Pilih Kabupaten / Kota"
                        ></v-select>                                                  
                        <v-select
                            dense
                            :items="listTahun"
                            v-model="form.tahun"
                            outlined
                            label="Tahun Pembekalan"
                        ></v-select>  
                        <v-text-field
                            dense
                            outlined
                            v-model="form.pelaksanaPembekalan"
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
                            @click="resetForm">
                            Reset Form
                        </v-btn>
                      </v-card>
                  </v-col>
                  <v-col v-if="selectedMenu == 'Rekap Provinsi'" sm="12" md="12" cols="12">
                    <v-card>
                        <v-card-title>
                        Rekap Kabupaten / Kota
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
                        :headers="headers"
                        :items="dataRekapProvinsi"
                        :search="search"
                        ></v-data-table>
                    </v-card>
                  </v-col>
                  <v-col v-if="selectedMenu == 'Lihat Data Per Kab/Kota'" sm="12" md="12" cols="12">
                    <v-card>
                        <v-card-title>
                        REKAP DATA APOTEKER AGENT OF CHANGE
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
                        :headers="headerKabkot"
                        :items="dataRekapKabkot"
                        :search="search">
                            <template v-slot:item.actEdit="{ item }">
                                <v-btn small color="primary" @click="editItem(item)">
                                <v-icon small>
                                    mdi-pencil-box-multiple
                                </v-icon>                                    
                                </v-btn>  
                            </template>                         
                            <template v-slot:item.actRemove="{ item }">
                                <v-btn small color="primary" @click="removeItem(item)">
                                <v-icon small>
                                    mdi-close-box-multiple
                                </v-icon>                                    
                                </v-btn>  
                            </template>                         
                        </v-data-table>
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
import listKabkot from '../../../config/listKabkot'
import listTahun from '../../../config/listTahun'
import SubMenu from './SubMenu'
import qs from "qs";

export default {
  name: 'FormPOR',
    data () {
      return {
        search: '',
        items: routeList,
        right: null,
        msg: 'This is a button.',
        itemJenis: ['Input', 'Rekap Provinsi', 'Lihat Data Per Kab/Kota'],
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
        headers: [
          { text: 'KAB / KOTA', value: 'KABKOTA' },
          { text: 'JUMLAH APOTEKER AOC', value: 'total' },
          { text: 'TAHUN PELAKSANAAN PEMBEKALAN', value: 'TAHUN_PEMBEKALAN' },
          { text: 'SUMBER ANGGARAN PELAKSANAAN', value: 'SUMBER_ANGGARAN' }
        ],
        headerKabkot: [
          { text: 'NAMA', value: 'NAMA' },
          { text: 'INSTANSI', value: 'INSTANSI' },
          { text: 'KAB / KOTA', value: 'KABKOTA' },
          { text: 'TAHUN PEMBEKALAN', value: 'TAHUN_PEMBEKALAN' },
          { text: 'PELAKSANA PEMBEKALAN', value: 'PELAKSANAAN_PEMBEKALAN' },
          { text: 'Edit', value: 'actEdit' },  
          { text: 'Remove', value: 'actRemove' },  
        ],
        dataRekapProvinsi: [],
        dataRekapKabkot: []        
      }
    },
    components: {
        SubMenu
    },    
    methods: {
        gantiMenu: function() {
            this.selectedMenu = this.pilihItemJenis 
            if(this.selectedMenu == 'Rekap Provinsi') {
                this.$http.get(this.$apiUrl + '/apoteker/aoc/get-rekap-provinsi')
                    .then((res) => {
                        this.dataRekapProvinsi = res.data.data
                    })
            }
            if(this.selectedMenu == 'Lihat Data Per Kab/Kota') {
                this.$http.get(this.$apiUrl + '/apoteker/aoc/get-rekap-kabkot')
                    .then((res) => {
                        this.dataRekapKabkot = res.data.data
                    })
            }
        },
        editItem: function(item) {
            this.$router.push({
                name: 'ApotekerAOCEdit',
                params: { content: item }
            })
        },
        removeItem: function(item) {
            if(!confirm('Apakah anda yakin ingin menghapus?')) {
                return 
            }
            this.$http.get(this.$apiUrl + '/apoteker/aoc/remove?id=' + item.id)
                .then((res) => {
                    if(res.data.status == true) {
                        this.$swal(
                            'Success!',
                            'Data Berhasil di hapus!',
                            'success'        
                        );
                        this.gantiMenu()                      
                    } else {
                        alert('Terjadi kesalahan')
                    }
                })
        },
        resetForm: function() {
            this.form = []
        },
        submit: function () {

            let data = {
                content: this.form,
            }

            let urlPost = (this.isUpdate == true) ? this.$apiUrl + '/apoteker/aoc/update' : this.$apiUrl + '/apoteker/aoc/insert';

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
      if(this.$store.getters.userData.JENIS_LOGIN == 'provinsi') {
        this.idDaerah = 32
      } else {
        this.idDaerah = this.$store.getters.userData.KODE_DAERAH
      }
      this.jenisLogin = this.$store.getters.userData.JENIS_LOGIN
    }
}
</script>