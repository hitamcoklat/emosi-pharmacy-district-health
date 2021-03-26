<template>
    <div>
        <SubMenu />
        <v-content class="pl-0">
          <v-container>
              <p style="font-weight: bold; font-size: 1.3em;" class="mt-n12 mx-auto">Data Rekap Apotek</p>
              <v-alert dense v-show="showWarning" type="warning">
                Bulan dan Tahun belum dipilih.
              </v-alert> 
                <v-row no-gutters>
                  <v-col md="3" sm="3">
                    <v-select
                      dense
                      :items="itemTahun"
                      v-model="pilihTahun"
                      outlined
                      label="Pilih Tahun"
                      style="z-index: 9999;"
                    ></v-select>
                  </v-col>
                  <v-col md="2" sm="2">
                    <v-btn style="margin-left: 2em;" v-on:click="fetchData" color="default">Cek Data</v-btn>
                  </v-col>
                  <v-col v-if="jenisLogin !== 'provinsi'" md="2" sm="2">
                    <v-btn v-if="showWarning == false" v-on:click="updateData" color="primary">{{textButton}}</v-btn>
                  </v-col>
                </v-row>  
                <v-row v-if="jenisLogin !== 'provinsi'" no-gutters>
                  <v-col sm="3" md="3">
                    <v-btn @click="downloadTemplate" v-if="showWarning == false" style="margin-right: 1em;" color="success" >Download Template</v-btn>
                  </v-col>
                  <v-col sm="3" md="3">
                    <v-file-input dense v-if="showWarning == false" id="templateExcell" @change="uploadTemplate()"  outlined="" label="Upload Template"></v-file-input>
                  </v-col>
                </v-row>
                <v-row no-gutters v-if="jenisLogin == 'provinsi'">
                  <v-col cols="3">
                    <FilterKabkot @fetchDataFilter="fetchDataFilterEvent" />
                  </v-col>
                </v-row>                             
              <div>
                <vue-excel-editor v-model="itemData">
                    <vue-excel-column field="no"   label="No" />
                    <vue-excel-column field="nama_kota"   label="Nama Kab/Kota" />
                    <vue-excel-column field="namaapotek"  label="Nama Apotek" />
                    <vue-excel-column field="nosuratizinapotek" label="No. Surat Izin Apotek" />
                    <vue-excel-column field="tanggal_no_izin"    label="Tanggal No Izin" />
                    <vue-excel-column field="alamatapotek"  label="Alamat Apotek" />
                    <vue-excel-column field="notelp"  label="No Telp." />
                    <vue-excel-column field="apa"  label="apa" />
                    <vue-excel-column field="jk"  label="jk" />
                    <vue-excel-column field="surat_tanda_registrasi_apoteker"  label="Surat Tanda Registrasi Apoteker" />
                    <vue-excel-column field="nosuratizinkerja"  label="No. Surat Izin Kerja" />
                    <vue-excel-column field="namapemilik"  label="Nama Pemilik" />
                    <vue-excel-column field="nik"  label="NIK" />
                    <vue-excel-column field="apotekerpendamping"  label="Apotek Pendamping" />
                    <vue-excel-column field="nosuratizinkerjapendamping"  label="No. Surat Izin Kerja Pendamping" />
                    <vue-excel-column field="status"  label="Status Verifikasi" />
                </vue-excel-editor>                         
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
import SubMenu from '../SubMenu'
import readXlsxFile from 'read-excel-file'
import FilterKabkot from '../component/Filter'

export default {
  name: 'Oblik',
    data () {
      return {
        itemData: [],
        right: null,
        itemTahun: ListTahun,
        itemBulan: ListBulan,
        pilihJenis: 'apotek',
        pilihTahun: '',
        pilihBulan: '',
        isUpdate: false,
        dialogLoading: false,
        showWarning: true,
        idDaerah: '',
        textButton: 'Insert Data',
        id: '',
        jenisLogin: ''      
      }
    },
    components: {
      SubMenu,
      FilterKabkot
    },
    computed: {

    },
    methods: {

      updateData: function() {

        let data = {
            content: this.itemData,
            idDaerah: this.idDaerah,
            thn: this.pilihTahun,
            bln: 12,
        }

        let url = (this.isUpdate == false) ? this.$apiUrl + '/apotek/insert?jenis=' + this.pilihJenis : this.$apiUrl + '/apotek/update?jenis=' + this.pilihJenis + '&id=' + this.id
        
        this.dialogLoading = true
        this.$http.post(url, data)
            .then((response) => {
              this.dialogLoading = false
              if(response.data.status == true) {
                this.$swal(
                  'Success!',
                  'Data Berhasil di Input!',
                  'success'        
                );
                this.isUpdate = true                  
              }else{
              }
            })    

      },

      downloadTemplate: function() {
        console.log(this.pilihJenis)
          window.location.href='http://maubikin.web.id/e-mosi/public-assets/upload/template_upload_apotek(kabkota).xlsx'
      },
      
      fetchDataFilterEvent: function(value) {
        console.log(value)
        this.idDaerah = value
        this.fetchData()
      },

      uploadTemplate: function() {
        
        this.dialogLoading = true
        this.itemData = []
        const input = document.getElementById('templateExcell')

        readXlsxFile(input.files[0]).then((rows) => {
          
          let dataItem = []
          let no = 1
          for(var i=2; i<=rows.length; i++) {
            try {
              console.log(rows[i])
              dataItem = { no: no, nama_kota: rows[i][2], namaapotek: rows[i][3], nosuratizinapotek: rows[i][4], tanggal_no_izin: rows[i][5], alamatapotek: rows[i][6], notelp: rows[i][7], apa: rows[i][8], jk: rows[i][9], surat_tanda_registrasi_apoteker: rows[i][10], nosuratizinkerja: rows[i][11], namapemilik: rows[i][12], apotekerpendamping: rows[i][13], nosuratizinkerjapendamping: rows[i][14], status: rows[i][15] }
              this.itemData.push(dataItem)
            } catch (error) {
              console.log('ada error: ' + error)
            }
            no++
          }

          this.dialogLoading = false

        })  
        
      },
      
      fetchData: function () {

        if(this.pilihTahun != '') {
          this.showWarning = false
        }
        
        let indexBulan = 12;
        let linkSegment = (this.idDaerah == 32) ? 'getAllDataRekap' : 'getAllData'

        this.dialogLoading = true
        this.$http.get(this.$apiUrl + '/sarkes/'+linkSegment+'?jenis=apotek&thn=' + this.pilihTahun + '&bln='+indexBulan+'&id_daerah=' + this.idDaerah)
            .then(res => JSON.parse(JSON.stringify(res)))
            .then(response => {
              
              this.dialogLoading = false

              if(response.data.status == true) {
                
                this.isUpdate = true
                this.textButton = 'Update Data'
                if(this.idDaerah == 32) {
                    this.itemData = response.data.data
                } else {
                    this.itemData = response.data.data.CONTENT
                }
                this.id = response.data.data.id  
              
              } else {
                this.isUpdate = false
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
