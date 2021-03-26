<template>
    <div>
        <SubMenu />
        <v-content class="pl-0">
            <div style="margin: 20px;">
                <p style="font-weight: bold; font-size: 1.3em; margin-top: 2em; margin: 10px;" class="mt-n12 mx-auto">IFK. FORM MONEV Daftar 150 Item Obat & Vaksin</p>
                <v-col style="margin: 0 !important; padding: 0 !important;" class="d-flex" cols="12" sm="12">
                  <v-select
                    dense
                    style="margin-right: 1em; width: 30px; z-index: 9999;"
                    :items="itemBulan"
                    v-model="pilihBulan"
                    outlined
                    label="Pilih Bulan"
                  ></v-select>
                  <v-select
                    dense
                    style="margin-right: 1em; width: 30px;"
                    :items="itemTahun"
                    v-model="pilihTahun"
                    outlined
                    label="Pilih Tahun"
                  ></v-select>
                  <v-btn style="margin-right: 1em;" v-on:click="fetchData" color="default">Cek Data</v-btn>
                  <v-btn v-if="this.showWarning == false" style="margin-right: 10px;" v-on:click="updateData" :color="(this.textButton == 'UPDATE DATA') ? 'warning' : 'primary'">{{textButton}}</v-btn>
                  <v-btn v-if="dataExist" style="margin-right: 1em;" v-on:click="hapusData" color="error">Hapus Data</v-btn>
                </v-col>
                <v-row
                  no-gutters
                  v-if="showWarning == false"
                >
                  <v-col
                    sm="2"
                    md="2"
                  >
                    <v-btn color="success">Download Template</v-btn>
                  </v-col>
                  <v-col
                  style="margin-left: 4em;"
                    sm="3"
                    md="3"
                    no-gutters
                  >
                    <v-file-input dense id="templateExcell" @change="uploadTemplate()"  outlined="" label="Upload Template"></v-file-input>
                  </v-col>
                </v-row>                                                
            </div>
          <v-simple-table v-if="showTable" height="600px">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">No</th>
                  <th class="text-left">NAMA OBAT</th>
                  <th class="text-left">SATUAN</th>
                  <th class="text-left">SISA STOK</th>
                  <th class="text-left">PEMAKAIAN RATA-RATA</th>
                  <th class="text-left">TINGKAT KETERSEDIAAN (BULAN)</th>
                </tr>
              </thead>
              <tbody>
                  <tr v-for="(item, index) in jmlObat" :key="item.index">
                    <td>{{index + 1}}</td>
                    <td>{{item.namaObat}}</td>
                    <td>{{item.satuanObat}}</td>
                    <td>{{item.sisaStok}}</td>
                    <td>{{item.rataRata}}</td>
                    <td>{{item.tingkatKetersediaan}}</td>
                  </tr>
              </tbody>
            </template>
          </v-simple-table>   
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

import obatVaksinObat from '@/config/formVaksinObat150'
import {ListBulan, ListTahun} from '@/config'
import readXlsxFile from 'read-excel-file'
import SubMenu from './SubMenu'

export default {
  name: 'FormMonevObatVaksinExcell',
    data () {
      return {
        right: null,
        jsondata: obatVaksinObat,
        itemTahun: ListTahun,
        itemBulan: ListBulan,
        pilihTahun: '',
        pilihBulan: '',
        dataExist: false,
        jmlObat: [],
        dialogLoading: false,
        showTable: false,
        textButton: 'Insert Data',
        showWarning: true,
        isUpdate: false,  
        idDaerah: '',
        id: ''
      }
    },
    components: {
      SubMenu
    },
    methods: {
        fetchData: function() {
            console.log('fetch data')
            this.showWarning = false
            let indexBulan = ListBulan.indexOf(this.pilihBulan) + 1;

            this.dialogLoading = true
            this.$http.get(this.$apiUrl + '/read-ifk?thn=' + this.pilihTahun + '&bln='+indexBulan+'&id_daerah=' + this.idDaerah)
              .then(response => {
                console.log(response)
                this.dialogLoading = false
                this.showTable = true
                if(response.data.status == true) {
                  this.jmlObat = response.data.data.CONTENT
                  this.id = response.data.data.id
                  this.textButton = 'UPDATE DATA'
                  this.isUpdate = true
                  this.dataExist = true
                } else {
                  this.textButton = 'INSERT DATA'
                  this.jmlObat = []
                }
            })            
        },
        uploadTemplate: function() {
          const input = document.getElementById('templateExcell')
          console.log(input.files[0])

          try {
            if(input.files[0].size > 10000 && input.files[0].name == '3._IFK._FORM_MONEV_Daftar_150_Item_Obat_&_Vaksin.xlsx') {
              this.dialogLoading = true
              readXlsxFile(input.files[0]).then((rows) => {
                // console.log(rows)
                  var jmlObat = [];
                  var newVal = 0;
                  for(var i=0; i<=154; i++) {
                    if(i > 4) {
                      jmlObat[newVal] = {
                        namaObat: rows[i][1],
                        satuanObat: rows[i][2],
                        sisaStok: rows[i][3],
                        rataRata: rows[i][4],
                        tingkatKetersediaan: rows[i][5],
                      }
                      newVal++;
                    }
                  }
                  this.jmlObat = jmlObat;
                  this.dialogLoading = false
                  this.showTable = true
                })
            }
            
            else if (input.files[0].size < 10000 || input.files[0].name != '3._IFK._FORM_MONEV_Daftar_150_Item_Obat_&_Vaksin.xlsx'){
              console.log('file salah')
              this.$swal({
                icon: 'error',
                title: 'File yang anda pilih tidak sesuai format! :('
              });              
            }

            else if(input.files[0] == 'undefined') {
              console.log('nothing to do')
            }
          } catch (error) {
            console.log('tidak ada file')
          }
          
        
        }, 
        updateData: function() {

          console.log('Update Data')

          let data = {
              content: this.jmlObat,
              idDaerah: this.idDaerah,
              thn: this.pilihTahun,
              bln: ListBulan.indexOf(this.pilihBulan) + 1
          }

          let url = (this.isUpdate == false) ? this.$apiUrl + '/input-ifk?' : this.$apiUrl + '/update-ifk?id=' + this.id
          
          // this.dialogLoading = true
          this.$http.post(url, data)
              .then((response) => { 
                if(response.data.data == true) {
                  this.$swal({
                    icon: 'success',
                    title: 'Data berhasil disimpan'
                  });                  
                } else {
                  this.$swal({
                    icon: 'error',
                    title: 'Terjadi kesalahan! :('
                  });                  
                }
              })    

        },
        hapusData: function() {
          if(confirm('Apakah anda yakin ingin menghapus data ini?')) {
            this.$http.get(this.$apiUrl + '/remove-ifk?id=' + this.id + '&id_daerah=' + this.idDaerah)
                .then((response) => { 
                  if(response.data.status == true) {
                    this.$swal({
                      icon: 'success',
                      title: 'Data berhasil dihapus'
                    });                  
                  } else {
                    this.$swal({
                      icon: 'error',
                      title: 'Terjadi kesalahan! :('
                    });                  
                  }
                }) 
          }         
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
