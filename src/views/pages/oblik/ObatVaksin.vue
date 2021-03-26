<template>
    <div>
        <SubMenu />
        <v-content class="pl-0">
          <v-container>
              <p style="font-weight: bold; font-size: 1.3em;" class="mt-n12 mx-auto">Ketersediaan Obat dan Vaksin Esensial 40 Item Obat</p>
              <v-alert dense v-show="showWarning" type="warning">
                Jenis atau Tahun belum dipilih.
              </v-alert> 
              <div class="my-2">
                <v-col class="d-flex" cols="12" sm="12">
                  <v-select
                    dense
                    style="margin-right: 1em; width: 30px;"
                    :items="itemJenis"
                    v-model="pilihJenis"
                    outlined
                    label="Jenis"
                  ></v-select>
                  <v-select
                    dense
                    style="margin-right: 1em; width: 30px;"
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
                  <v-btn depressed outlined style="margin-right: 1em;" v-on:click="fetchData" color="default">Cek Data</v-btn>
                  <v-btn depressed v-if="showWarning == false" v-on:click="updateData" color="primary">{{textButton}}</v-btn>
                </v-col> 
                <v-row
                  style="padding-left: 0.7em; padding-right: 0.7em;"
                  class="mb-6"
                  no-gutters
                >
                  <v-col
                    sm="3"
                    md="3"
                  >
                    <v-btn @click="downloadTemplate" v-if="showWarning == false" style="margin-right: 1em;" color="success">Download Template</v-btn>
                  </v-col>
                  <v-col
                  style="margin-left: 1em;"
                    sm="3"
                    md="3"
                  >
                    <v-file-input dense v-if="showWarning == false" id="templateExcell" @change="uploadTemplate()"  outlined="" label="Upload Template"></v-file-input>
                  </v-col>
                </v-row>                               
              </div>              
              <v-simple-table height="600px">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">No</th>
                      <th class="text-left">Nama Obat</th>
                      <th class="text-left">Jumlah Obat</th>
                      <th class="text-left">Satuan</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in itemObat" :key="item.index">
                      <td>{{ item.NO + 1 }}</td>
                      <td>{{ item.NAMA_OBAT }}</td>
                      <td>
                        <v-col cols="12" sm="4" md="4">
                          <v-text-field
                            v-model="jmlObat[item.NO + 1]"
                            :value="jmlObat[item.NO + 1]"
                            solo
                            dense
                          ></v-text-field>
                        </v-col>                       
                      </td>
                      <td>{{ item.SATUAN }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>                
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
import readXlsxFile from 'read-excel-file'
import SubMenu from './SubMenu'

export default {
  name: 'Oblik',
    data () {
      return {
        itemObat: [],
        jmlObat: [],
        right: null,
        itemTahun: ListTahun,
        itemBulan: ListBulan,
        itemJenis: ['Obat', 'Vaksin'],
        pilihJenis: '',
        pilihTahun: '',
        pilihBulan: '',
        isUpdate: false,
        dialogLoading: false,
        showWarning: true,
        idDaerah: '',
        textButton: 'Insert Data',
        dataUser: [],
        id: ''
      }
    },
    computed: {

    },
    components: {
      SubMenu
    },
    methods: {

      updateData: function() {

        let dataInput = (this.pilihJenis == 'Obat') ? obat40item : itemVaksin

        dataInput.forEach((index, item) => {
          this.jmlObat[item] = this.jmlObat[item]
        })

        let data = {
            itemObat: this.itemObat,
            jmlObat: this.jmlObat,
            idDaerah: this.idDaerah,
            thn: this.pilihTahun,
            bln: ListBulan.indexOf(this.pilihBulan) + 1,
            jenis: this.pilihJenis
        }

        let url = (this.isUpdate == false) ? this.$apiUrl + '/obat/insert?jenis=' + this.pilihJenis : this.$apiUrl + '/obat/update?jenis=' + this.pilihJenis + '&id=' + this.id
        
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
        if(this.pilihJenis == 'Obat') {
          window.location.href='http://app.diskes.jabarprov.go.id/e-mosi/upload/template-obat.xlsx'
        }
        if(this.pilihJenis == 'Vaksin') {
          window.location.href='http://app.diskes.jabarprov.go.id/e-mosi/upload/template-vaksin.xlsx'
        }
      },

      uploadTemplate: function() {
        
        const input = document.getElementById('templateExcell')

        readXlsxFile(input.files[0]).then((rows) => {
          console.log(rows)
          // `rows` is an array of rows
          // each row being an array of cells.
          if(this.pilihJenis == 'Obat') {
            var jmlObat = [];
            for(var i=0; i<=41; i++) {
              console.log(rows[i][1])
              if(i > 0) {
                jmlObat[i] = rows[i][3]
              }
            }
            this.jmlObat = jmlObat;
          }else if(this.pilihJenis == 'Vaksin') {
            var jmlObat = [];
            for(var i=1; i<=5; i++) {
              console.log(rows[i][1])
              jmlObat[i] = rows[i][3]
            }
            this.jmlObat = jmlObat;
          }

        })        
      },
      
      fetchData: function () {

        if(this.pilihJenis != '' && this.pilihTahun != '') {
          this.showWarning = false
          this.itemObat = (this.pilihJenis == 'Obat') ? obat40item : itemVaksin
        }
        
        let indexBulan = ListBulan.indexOf(this.pilihBulan) + 1;

        this.dialogLoading = true
        this.$http.get(this.$apiUrl + '/obat?jenis=' + this.pilihJenis + '&thn=' + this.pilihTahun + '&bln='+indexBulan+'&id_daerah=' + this.idDaerah)
            .then(res => JSON.parse(JSON.stringify(res)))
            .then(response => {
              
              this.dialogLoading = false

              if(response.data.status == true) {
                console.log('masuk kesini')
                
                this.isUpdate = true
                this.textButton = 'Update Data'
                this.id = response.data.data.id

                let dataObat = response.data.data.CONTENT.ITEM_OBAT;
                var jmlObat = [];
              
                dataObat.forEach((index, item) => {
                  jmlObat[item] = response.data.data.CONTENT.JML_OBAT[item]
                })
                
                this.jmlObat = jmlObat;                
              
              } else {
                this.isUpdate = false
                this.jmlObat = []
              }
            })
      }
    },
    created() {
      this.idDaerah = this.$store.getters.userData.KODE_DAERAH
      this.dataUser = this.$store.getters.userData    
    }
}
</script>
