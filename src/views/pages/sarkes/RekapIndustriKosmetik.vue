<template>
    <div>
        <SubMenu />
        <v-content class="pl-0">
          <v-container>
            <p style="font-weight: bold; font-size: 1.3em;" class="mt-n12 mx-auto">Data Industri Kosmetik</p>
              <v-row no-gutters>
                <v-col style="margin-bottom: 1em;" md="12" sm="12">
                  <v-btn @click="dialogFormInput = true" color="primary" depressed>
                    Input Data
                  </v-btn>                  
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-row style="overflow: auto;" md="12" sm="12">
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
                        <v-btn style="margin: 5px;" v-if="item.CONTENT.file.length > 0" v-for="(i, index) in item.CONTENT.file" @click="lihatFile(i)" small elevation="2">{{i.response.data.namaFile}}</v-btn>
                      </template>                              
                      </v-data-table>
                  </v-card>                  
                </v-row>
              </v-row>
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
      <v-dialog
        v-model="dialogFormInput"
        persistent
        max-width="600px"
      >
        <v-card tile>
          <v-card-title>
            <span class="headline">Form Input</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row no-gutters>
                <v-col cols="12">
                 <v-text-field v-model="form.namaPT" dense filled label="Nama PT"></v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12">
                 <v-text-field v-model="form.nib" dense filled label="N I B"></v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12">
                 <v-text-field v-model="form.alamatPerusahaan" dense filled label="Alamat Perusahaan"></v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12">
                 <v-text-field v-model="form.alamatPabrik" dense filled label="Alamat Pabrik"></v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12">
                 <v-text-field v-model="form.alamatGudang" dense filled label="Alamat Gudang"></v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12">
                  <v-select
                    v-model="form.kabKot"
                    :items="listKabkot"
                    item-text="namaKabkot"
                    item-value="namaKabkot"
                    label="Kabupaten/Kota"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12">
                 <v-text-field v-model="form.telp" dense filled label="No. Telp"></v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12">
                 <v-text-field v-model="form.namaPimpinan" dense filled label="Nama Pimpinan"></v-text-field>
                </v-col>
              </v-row>              
              <v-row no-gutters>
                <v-col cols="12">
                 <v-text-field v-model="form.noIzinTerbit" dense filled label="No. Izin Terbit"></v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12">
                  <v-menu
                    v-model="menu1"
                    :close-on-content-click="false"
                    max-width="290"
                  >             
                  <template v-slot:activator="{ on, attrs }">    
                    <v-text-field v-model="form.tglTerbitIzin" v-on="on" @click:clear="date = null" dense filled label="Tgl. Terbit Izin"></v-text-field>
                  </template>
                  <v-date-picker @change="menu1 = false" v-model="form.tglTerbitIzin"></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12">
                 <v-text-field v-model="form.noAdendum" dense filled label="No. Addendum & Tgl. (Scan Izin)"></v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12">
                 <v-text-field v-model="form.golonganKosmetika" dense filled label="Golongan Kosmetika"></v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12">
                 <v-text-field v-model="form.namaPJT" dense filled label="Nama PJT"></v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12">
                 <v-text-field v-model="form.noSTR" dense filled label="No STR"></v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12">
                 <v-text-field v-model="form.bentukSediaan" dense filled label="Bentuk Sediaan"></v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col v-if="files.length > 0" v-for="(item, index) in files" cols="12">
                  <v-card
                    class="mx-auto"
                    outlined
                    style="margin-bottom: 1em;"
                  >
                    <v-list-item three-line>
                      <v-list-item-content>
                        <v-list-item-title class="headline mb-1">
                          {{namaFiles[index]}} Berhasil di Upload
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>

                    <v-card-actions>
                      <v-btn @click="clickFile()" outlined rounded text>
                        Hapus
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>                           
              </v-row>              
              <v-row no-gutters>
                <v-col cols="2">
                  <file-upload
                      ref="upload"
                      v-model="files"
                      :multiple="true"
                      :post-action="`${this.$apiUrl}/upload`"
                      @input="onChangeFile"
                  >
                    <v-btn
                      style="margin-bottom: 1em;"
                      color="info"
                      elevation="2"
                    >Tambahkan File</v-btn>
                  </file-upload>                  
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="dialogFormInput = false"
            >
              Tutup
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="insertData()"
            >
              Simpan
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>              
    </div>
</template>

<script>

import obat40item from '@/config/obat40item'
import {ListBulan, ListTahun} from '@/config'
import listKabkot from '@/config/listKabkot'
import itemVaksin from '@/config/vaksin5item'
import routeList from '@/views/pages/sarkes/routeList';
import readXlsxFile from 'read-excel-file'
import SubMenu from './SubMenu'
import qs from 'qs'

export default {
  name: 'Oblik',
    data () {
      return {
        menu1: false,
        picker: new Date().toISOString().substr(0, 10),
        items: routeList,
        right: null,
        dialogLoading: false,
        showWarning: true,
        idDaerah: '',
        tampilanTablePusat: true,
        id: '',
        form: [{
          tglTerbitIzin: new Date().toISOString().substr(0, 10)
        }],
        search: '',
        headersPusat: [
          {
            text: 'Nama PT',
            align: 'start',
            sortable: false,
            value: 'CONTENT.content.namaPT',
          },
          { text: 'NIB', value: 'CONTENT.content.nib' },
          { text: 'Alamat Perusahaan', value: 'CONTENT.content.alamatPerusahaan' },
          { text: 'Alamat Pabrik', value: 'CONTENT.content.alamatPabrik' },
          { text: 'Alamat Gudang', value: 'CONTENT.content.alamatGudang' },
          { text: 'Kab/Kota', value: 'CONTENT.content.kabKot' },
          { text: 'No. Telp', value: 'CONTENT.content.telp' },
          { text: 'Nama Pimpinan', value: 'CONTENT.content.namaPimpinan' },
          { text: 'No. Izin Terbit', value: 'CONTENT.content.noIzinTerbit' },
          { text: 'Tgl. Terbit Izin', value: 'CONTENT.content.tglTerbitIzin' },
          { text: 'No. Addendum & Tgl. (Scan Izin)', value: 'CONTENT.content.noAdendum' },
          { text: 'Golongan Kosmetika', value: 'CONTENT.content.golonganKosmetika' },
          { text: 'Nama PJT', value: 'CONTENT.content.namaPJT' },
          { text: 'No STR', value: 'CONTENT.content.noSTR' },
          { text: 'Bentuk Sediaan', value: 'CONTENT.content.bentukSediaan' },
          { text: 'Scan Izin (Download)', value: 'actions' },
        ],
        itemPusat: [],
        files: [],
        namaFiles: [],
        listKabkot: listKabkot,
        dialogFormInput: false   
      }
    },
    components: {
      SubMenu
    },     
    computed: {

    },
    methods: {

      lihatFile: function(item) {
        window.open(item.response.data.img, '_blank');
      },      

      clickFile: function(id) {
          const index = this.files.indexOf(id);
          const indexName = this.namaFiles.indexOf(id);
          if(confirm('Apakah anda yakin ingin menghapus file ini?')) {
            this.files.splice(index)
            this.namaFiles.splice(indexName)
          }
      }, 
      
      onChangeFile: function(e) {
        if (this.$refs.upload.active) {
            return false
        }
        
        let countFiles = (this.namaFiles.length == 0) ? 0 : this.namaFiles.length
        let namaFile = prompt('Masukan nama file');

        this.namaFiles[countFiles] = namaFile
        this.$refs.upload.active = true
      },       

      updateData: function() {

        let data = {
            content: this.itemData,
            idDaerah: this.idDaerah,
            thn: this.pilihTahun,
            bln: ListBulan.indexOf(this.pilihBulan) + 1,
        }

        let url = (this.isUpdate == false) ? this.$apiUrl + '/toko-obat/insert?jenis=' + this.pilihJenis : this.$apiUrl + '/toko-obat/update?jenis=' + this.pilihJenis + '&id=' + this.id
        
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

      insertData: function() {

        if(this.files.length > 0) {
            this.files.map((item, index) => {
                this.files[index].response.data.namaFile = this.namaFiles[index]
            })
        }          

        let olahData = {
          content: this.form,
          file: this.files
        }        

        let data = {
            content: olahData,
            idDaerah: this.idDaerah
        }

        let url = this.$apiUrl + '/industri-kosmetika'
        
        this.dialogLoading = true
        this.$http.post(url, qs.stringify(data))
            .then((response) => {
              this.dialogLoading = false
              if(response.data.status == true) {
                this.$swal(
                  'Success!',
                  'Data Berhasil di Input!',
                  'success'        
                );
                this.dialogFormInput = false
                this.fetchData()             
              } else {
                alert('Terjadi kesalahan!')
              }
            })         
      },
      
      fetchData: function () {

        this.dialogLoading = true
        this.$http.get(this.$apiUrl + '/industri-kosmetika/get-all')
            .then(response => {
              this.itemPusat = response.data.data
              this.dialogLoading = false
            })
      }
    },
    created() {
      this.idDaerah = this.$store.getters.userData.KODE_DAERAH
      this.fetchData()
    }
}
</script>
