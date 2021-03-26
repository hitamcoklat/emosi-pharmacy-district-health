<template>
    <div>
        <SubMenu />
        <v-content class="pl-0">
          <v-container>
              <p style="font-weight: bold; font-size: 1.3em;" class="mt-n12 mx-auto">Jumlah Tenaga Teknis</p>
            <v-btn :style="[btnPuskesmas == true ? {'background-color': '#E1ECF4'} : {'background-color': 'white'}]" @click="btnPuskesmas = true; btnRsud = false; btnDinkes = false; dialogForm = true; pilihJenis = 'puskesmas'" depressed>
                <v-icon style="margin-right: 10px;" size="16">mdi-file-table-box-multiple-outline</v-icon>
                A. INPUT PUSKESMAS (ASN & NON ASN)
            </v-btn>                
            <v-btn :style="[btnRsud == true ? {'background-color': '#E1ECF4'} : {'background-color': 'white'}]" @click="btnRsud = true; btnPuskesmas = false; btnDinkes = false; dialogForm = true; pilihJenis = 'rsud'" depressed>
                <v-icon style="margin-right: 10px;" size="16">mdi-file-table-box-multiple-outline</v-icon>
                B. INPUT RSUD (ASN & NON ASN)
            </v-btn>                       
            <v-btn :style="[btnDinkes == true ? {'background-color': '#E1ECF4'} : {'background-color': 'white'}]" @click="btnDinkes = true; btnPuskesmas = false; btnRsud = false; dialogForm = true; pilihJenis = 'dinkes'" depressed>
                <v-icon style="margin-right: 10px;" size="16">mdi-file-table-box-multiple-outline</v-icon>
                C. INPUT DINAS KESEHATAN
            </v-btn> 

            <v-btn v-if="tampilanExcellCabang" style="margin-left: 10px;" depressed color="success"><v-icon size="16">mdi-file-check</v-icon>Export Excell</v-btn>
            <br />
            <br />
            <v-card v-if="tampilanTableCabang">
                <v-col class="d-flex" cols="12" sm="12">
                    <v-btn @click="dialogFullscreen = true;" color="success" style="margin: 10px;">
                        <v-icon style="margin-right: 10px;" size="16">mdi-file-delimited</v-icon>
                        Upload Template
                    </v-btn>                       
                    <v-btn @click="checkDatabase()" color="primary" style="margin: 10px;">
                        <v-icon style="margin-right: 10px;" size="16">mdi-database-refresh</v-icon>
                        Cek Data Terbaru
                    </v-btn>                    
                    <v-select
                        @change="onChangeFilterPilihan()"
                        style="margin: 10px;"
                        :items="itemPilihan"
                        label="Pilih Jenis"
                        outlined
                        dense
                        v-model="filterPilihan"
                    ></v-select>
                </v-col>                             
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
                :headers="headersCabang"
                :items="itemCabang"
                :search="search"
                >
                <template v-slot:item.actions="{ item }">
                    <span style="color: #0E5491; cursor: pointer;" @click="lihatIzin(item.link_naskahizin)">
                    Lihat Izin
                    </span>
                </template>                              
                </v-data-table>
            </v-card>                                  
                 
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
    <v-dialog v-model="dialogForm" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Input Tenaga {{pilihJenis}}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="namaLengkap" label="Nama Lengkap" hint="Masukan nama lengkap"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="pendidikan" label="Pendidikan" hint="Masukan pendidikan"></v-text-field>
              </v-col>              
              <v-col cols="12">
                <v-text-field v-model="noSTR" label="No. STR" hint="Masukan nomor STR"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="tmpKerja" label="Tempat Kerja" hint="Masukan nama lengkap"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="tmpBekerja" label="Tempat Bekerja" hint="( Dinas Kesehatan/Puskesmas/RSUD/Instalasi Farmasi Kabkota/Sarana Pelayanan Pemerintah Lainnnya)"></v-text-field>
              </v-col>    
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="thnVerifikasi" label="Tahun Verifikasi" hint="Masukan tahun verifikasi"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogForm = false">
            Tutup
          </v-btn>
          <v-btn color="blue darken-1" text @click="dialogForm = false; insertData()">
            Simpan
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>  
    <v-dialog
      v-model="dialogFullscreen"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="dialogFullscreen = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Upload Template dari Excell</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              dark
              text
              @click="dialogFullscreen = false"
            >
              Simpan
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-row class="mt-5" no-gutters>
          <v-col sm="2" md="2">
            <v-btn @click="downloadTemplate" style="margin-left: 1em;" color="success">Download Template</v-btn>
          </v-col>
          <v-col sm="3" md="3">
            <v-file-input dense id="templateExcell" @change="uploadTemplate()"  outlined="" label="Upload Template"></v-file-input>
          </v-col>
        </v-row>  
        <v-row no-gutters v-if="showTableExcell == true" style="padding: 1.5em;">           
          <vue-excel-editor v-model="itemData">
              <vue-excel-column field="namaLengkap"   label="Nama Lengkap" />
              <vue-excel-column field="noSTR"   label="No STR" />
              <vue-excel-column field="pendidikan"  label="Pendidikan" />
              <vue-excel-column field="tempatKerja" label="Tempat Kerja" />
              <vue-excel-column field="tempatBekerja"    label="Tempat Bekerja" />
              <vue-excel-column field="statusPegawai"  label="Status Pegawai" />
              <vue-excel-column field="thnVerifikasi"  label="Tahun Verifikasi" />
          </vue-excel-editor>            
        </v-row>
      </v-card>
    </v-dialog>          
    </div>
</template>

<script>

import {ListBulan, ListTahun} from '@/config'
import readXlsxFile from 'read-excel-file'
import SubMenu from './SubMenu'
import TemplateTenaga from './template_tenaga'

export default {
  name: 'InputTenagaApoteker',
    data () {
      return {
        btnPuskesmas: false,
        btnRsud: false,
        btnDinkes: false,
        dialogLoading: false,
        id: '',
        dialogForm: false,
        search: '',
        tampilanTableCabang: true,
        tampilanExcellCabang: false,
        itemPilihan: ['Puskesmas', 'RSUD', 'DINKES'],        
        headersCabang: [
          {
            text: 'Nama Kota',
            align: 'start',
            sortable: false,
            value: 'nama_kota',
          },
          { text: 'Nama Lengkap', value: 'nama' },
          { text: 'No STR', value: 'No_STR' },
          { text: 'Pendidikan', value: 'pendidikan' },
          { text: 'Tempat Kerja', value: 'tempat_kerja' },
          { text: 'Tempat Bekerja ( Dinas Kesehatan/Puskesmas/RSUD/Instalasi Farmasi Kabkota/Sarana Pelayanan Pemerintah Lainnnya', value: 'tempat_bekerja' },
          { text: 'Status Pegawai (ASN/Non ASN)', value: 'status_pegawai' },
          { text: 'Tahun Verifikasi', value: 'tahun_verifikasi' },
          { text: 'Jenis', value: 'jenis' }
        ],
        itemCabang: TemplateTenaga,
        namaLengkap: '',
        noSTR: '',
        pendidikan: '',
        tmpKerja: '',
        tmpBekerja: '',
        thnVerifikasi: '',
        isUpdate: false,
        pilihJenis: '',
        idDaerah: '',
        namaDaerah: '',
        filterPilihan: '',
        dialogFullscreen: false,
        itemData: [],
        showTableExcell: false,
        loadingExcell: false
      }
    },
    computed: {

    },
    components: {
      SubMenu
    },
    methods: {

        uploadTemplate: function() {
          const input = document.getElementById('templateExcell')

          readXlsxFile(input.files[0]).then((rows) => {
            let dataItem = []
            let no = 1
            for(var i=0; i<=rows.length; i++) {
              if(i > 1) {
                try {
                  console.log(rows[i])
                  dataItem = { 
                    no: no, 
                    namaLengkap: rows[i][3], 
                    noSTR: rows[i][4], 
                    pendidikan: rows[i][5], 
                    tempatKerja: rows[i][6], 
                    tempatBekerja: rows[i][7], 
                    statusPegawai: rows[i][8], 
                    thnVerifikasi: rows[i][9]
                  }
                  this.itemData.push(dataItem)
                } catch (error) {
                  console.log('ada error: ' + error)
                }
                no++
              }
            }
          })
          this.showTableExcell = true        
        },

        downloadTemplate: function() {
          window.location.href='http://app.diskes.jabarprov.go.id/e-mosi/upload/template-tenaga.xlsx'
        },

        checkDatabase: function() {
            console.log('check database')
            this.$http.get(this.$apiUrl + '/read-tenaga?jenis=' + this.pilihJenis + '&sub_menu=tenaga_apoteker')
                .then(response => {
                    if(response.data.status == true) {
                        this.itemCabang = response.data.data
                    }
                })
        },

        onChangeFilterPilihan: function() {
            console.log(this.filterPilihan)
            this.search = this.filterPilihan
        },

        insertData: function() {

            let data = {
                NAMA_LENGKAP: this.namaLengkap,
                NO_STR: this.noSTR,
                PENDIDIKAN: this.pendidikan,
                TEMPAT_KERJA: this.tmpKerja,
                TEMPAT_BEKERJA: this.tmpBekerja,
                THN_VERIFIKASI: this.thnVerifikasi,
                JENIS: this.pilihJenis,
                KODE_DAERAH: this.idDaerah,
                NAMA_DAERAH: this.namaDaerah
            }

            let url = (this.isUpdate == false) ? this.$apiUrl + '/input-apoteker?jenis=' + this.pilihJenis : this.$apiUrl + '/update-apoteker?jenis=' + this.pilihJenis + '&id=' + this.id

            this.$http.post(url, data)
                .then((response) => {
                    console.log(response)
                })              
        }

    },
    created() {
      this.idDaerah = this.$store.getters.userData.KODE_DAERAH
      this.namaDaerah = this.$store.getters.userData.NAMA_KABKOT
    }
}
</script>
