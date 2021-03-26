<template>
    <div>
        <SubMenu />
        <v-content class="pl-0">
          <v-container>
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
                  <v-btn v-if="dataExist" style="margin-right: 1em;" v-on:click="fetchData" color="error">Hapus Data</v-btn>
                </v-col>
                <v-row
                  no-gutters
                  v-if="showWarning == false"
                >
                  <v-col
                    sm="2"
                    md="2"
                  >
                    <v-btn color="success" x-large>Download Template</v-btn>
                  </v-col>
                  <v-col
                  style="margin-left: 4em;"
                    sm="3"
                    md="3"
                    no-gutters
                  >
                    <v-file-input id="templateExcell" @change="uploadTemplate()"  outlined="" label="Upload Template"></v-file-input>
                  </v-col>
                </v-row>                                                
            </div>                       
                 
              <v-simple-table height="600px">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">No</th>
                      <th class="text-left">Kabupaten Kota</th>
                      <th class="text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in listKabkot" :key="item.index">
                      <td>{{ index + 1 }}</td>
                      <td>{{ item.namaKabkot }}</td>
                      <td>
                          <span style="color: green;" v-if="dataAbsen.includes(item.kodeKabkot) == true && dataAbsen.length > 0">
                              SUDAH
                          </span>
                          <span style="color: red;" v-if="dataAbsen.includes(item.kodeKabkot) == false && dataAbsen.length > 0">
                              BELUM
                          </span>
                          <span style="color: grey;" v-if="dataAbsen.length == 0">
                              MASIH KOSONG
                          </span>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>   
              <v-simple-table v-if="showRekap == true" height="600px">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">No</th>
                      <th class="text-left">Kabupaten Kota</th>
                      <th class="text-left">Vaksin Hepatitis B</th>
                      <th class="text-left">Vaksin BCG</th>
                      <th class="text-left">Vaksin DPT-HB-HIB</th>
                      <th class="text-left">Vaksin Polio</th>
                      <th class="text-left">Vaksin Campak/Vaksin Rubella</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in dataAbsen" :key="item.index">
                      <td>{{index + 1}}</td>
                      <td>{{kabkotByKode[item]}}</td>
                      <td v-for="(itemObat, indexObat) in obatRekap[index].CONTENT.JML_OBAT" :key="itemObat.indexObat">
                        {{itemObat}}
                      </td>
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
import kabkotByKode from '@/config/kabkotByKode'
import listKabkot from '@/config/listKabkot'
import {ListBulan, ListTahun} from '@/config'
import itemVaksin from '@/config/vaksin5item'
import routeList from '@/views/pages/oblik/routeList';
import readXlsxFile from 'read-excel-file'
import SubMenu from '../oblik/SubMenu'

export default {
  name: 'Oblik',
    data () {
      return {
        items: routeList,
        listKabkot: listKabkot,
        dataAbsen: [],
        obatRekap: [],
        valueObatRekap: [],
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
        showTable: false,
        showRekap: false,
        showAbsen: false,
        kabkotByKode: kabkotByKode,
        id: ''
      }
    },
    computed: {

    },
    components: {
      SubMenu
    },
    methods: {

      fetchData: function () {

        if(this.pilihJenis != '' && this.pilihTahun != '') {
          this.showWarning = false
          this.itemObat = (this.pilihJenis == 'Obat') ? obat40item : itemVaksin
        }
        
        let indexBulan = ListBulan.indexOf(this.pilihBulan) + 1;
        this.dataAbsen = []
        this.showTable = false

        // this.dialogLoading = true
        this.$http.get(this.$apiUrl + '/oblik/obat/get-rekap?jenis=' + this.pilihJenis + '&thn=' + this.pilihTahun + '&bln='+indexBulan)
            .then(response => {
                this.dialogLoading = false
                this.showTable = true
                this.dataAbsen = response.data.absen
                this.obatRekap = response.data.data
                console.log(this.dataAbsen)
                console.log(response)
            })
      }
    },
    created() {
      this.idDaerah = this.$store.getters.userData.KODE_DAERAH
    }
}
</script>
