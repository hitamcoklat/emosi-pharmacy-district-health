<template>
  <div style="padding-bottom: 2em; background-color: '#FFF';">
      <v-row>
        <v-col style="padding: 2em; white-space: nowrap;" sm="12" md="12">
          <div id="listChip" style="overflow: auto;">
              <router-link to="/dashboard/detail">
                <v-chip
                    style="margin-left: 1em; margin-top: 1em; margin-bottom: 1em; cursor: pointer; padding: 1.5em;"
                    v-for="(item, index) in itemDashboard" :key="index"
                    close-icon="mdi-delete"
                    color="primary"
                >{{item}}</v-chip>
              </router-link> 
          </div>        
        </v-col>
      </v-row>
      <v-row no-gutters>
          <v-col sm="12" md="12">
              <h2 class="pl-5">Dashboard E Logistik</h2>
                
              <v-btn @click="fetchDataLogistik()" class="ml-5 pl-5 pr-5" color="primary" large>
                <v-icon color="white">
                mdi-refresh
                </v-icon>Refresh
              </v-btn>
              <v-row class="pa-5">
                  <v-col sm="6" md="6">
                    <v-card color="green" elevation="2">
                        <v-card-title style="margin-bottom: 1em; color: white;">Total Penerimaan Tahun 2020</v-card-title>
                        <v-card-text>
                            <span style="font-size: 4em; color: white;">602.192.648.107</span>
                        </v-card-text>
                    </v-card>                         
                  </v-col>
                  <v-col sm="6" md="6">
                    <v-card color="#FE686A" elevation="2">
                       <v-card-title style="margin-bottom: 1em; color: white;">Total Penerimaan Tahun 2020</v-card-title>
                        <v-card-text>
                            <span style="font-size: 4em; color: white;">602.192.648.107</span>
                        </v-card-text>
                    </v-card>                         
                  </v-col>
              </v-row>
          </v-col>
      </v-row>
      <v-row no-gutters>
          <v-col style="padding: 1em;" sm="12" md="12">
            <line-chart :chart-data="datacollection" :options="options"></line-chart>              
          </v-col>
      </v-row>
      <v-row no-gutters>
          <v-col sm="12" md="12">
              <h2 class="pl-5">Distribusi Barang</h2>
                <v-simple-table style="border: 1px solid #CCC;" class="pa-5 ma-5">
                    <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-center">No.</th>
                            <th class="text-center">Kode</th>
                            <th class="text-center">Nama Barang</th>
                            <th class="text-center">Satuan</th>
                            <th class="text-center">Jumlah</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in dataDistribusiBarang" :key="item.kodeObatRes">
                            <td style="width: 3%;" class="text-center">{{ index + 1 }}</td>
                            <td style="width: 12%;" class="text-center">{{ item.kodeObatRes }}</td>
                            <td style="width: 55%;" class="text-center">{{ item.objectName }}</td>
                            <td style="width: 15%;" class="text-center">{{ item.deskripsi }}</td>
                            <td style="width: 15%;" class="text-center">{{ item.jumlah }}</td>
                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>
          </v-col>
      </v-row>
      <v-row no-gutters>
          <v-col sm="12" md="12">
              <h2 class="pl-5">Indikator Kadaluarsa</h2>
                <v-simple-table style="border: 1px solid #CCC;" class="pa-5 ma-5">
                    <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-center">No.</th>
                            <th class="text-center">Kode Obat</th>
                            <th class="text-center">No. Batch</th>
                            <th class="text-center">Nama Barang</th>
                            <th class="text-center">Sediaan</th>
                            <th class="text-center">Sisa Stok</th>
                            <th class="text-center">Tgl. Kadaluarsa</th>
                            <th class="text-center">Berlaku (Bln)</th>
                            <th class="text-center">Sumber Dana</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in dataIndikatorKadaluarsa" :key="`indik-${index}`">
                            <td :style="{ backgroundColor: item.warna_bg, width: '3%' }" class="text-center">{{ index + 1 }}</td>
                            <td :style="{ backgroundColor: item.warna_bg, width: '12%' }" class="text-center">{{ item.kode_obat }}</td>
                            <td :style="{ backgroundColor: item.warna_bg, width: '55%' }" class="text-center">{{ item.no_batch }}</td>
                            <td :style="{ backgroundColor: item.warna_bg, width: '15%' }" class="text-center">{{ item.nama_obj }}</td>
                            <td :style="{ backgroundColor: item.warna_bg, width: '15%' }" class="text-center">{{ item.deskripsi }}</td>
                            <td :style="{ backgroundColor: item.warna_bg, width: '15%' }" class="text-center">{{ item.stok }}</td>
                            <td :style="{ backgroundColor: item.warna_bg, width: '15%' }" class="text-center">{{ item.expired }}</td>
                            <td :style="{ backgroundColor: item.warna_bg, width: '15%' }" class="text-center">{{ item.berlaku }}</td>
                            <td :style="{ backgroundColor: item.warna_bg, width: '15%' }" class="text-center">{{ item.sumber_dana }}</td>
                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>
                <div class="text-center">
                  <v-pagination
                    @input="changePage"
                    total-visible="6"
                    v-model="page"
                    :length="lengthPage"
                  ></v-pagination>
                </div>                
          </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col style="padding-left: 1em; padding-right: 1em; margin-top: 2em;" sm="12" md="12">
          <v-alert prominent color="teal">
            <div class="title">
              Keterangan
            </div>
            <div>
                <pre>
Kuning : Mendekati expire estimasi waktu (> 6 Bulan sd 1 Tahun)
Pink : Mendekati expire estimasi waktu (< 6 Bulan)
Red : Sudah expire                   
                </pre>
            </div>
          </v-alert>
        </v-col>
      </v-row>      
         
  </div>
</template>
<style>
  .small {
    width: 900px;
    margin:  150px auto;
  }
</style>
<script>
import DateRangePicker from 'vue2-daterange-picker'
//you need to import the CSS manually (in case you want to override it)
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import getData from './data/chart/bar'
import "leaflet/dist/leaflet.css";
import { latLng, geoJSON } from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup, LTooltip, LGeoJson } from "vue2-leaflet";
import { Icon } from 'leaflet';
import kordinatKabkot from '../config/kordinatKabkot'
import ObatPublik from './pages/provinsi/dashboard/ObatPublik'
import SaranaFarmasi from './pages/provinsi/dashboard/SaranaFarmasi'
import TenagaApoteker from './pages/provinsi/dashboard/TenagaApoteker'
import Yanfar from './pages/provinsi/dashboard/Yanfar'
import LineChart from './chart/LineChart'

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default {
    name: 'Dashboard',
    components: { 
      LineChart,
      DateRangePicker,
      LMap,
      LGeoJson,
      LTileLayer,
      LMarker,
      LPopup,
      LTooltip,
      ObatPublik,
      SaranaFarmasi,
      TenagaApoteker,
      Yanfar
    },
    data() {
    
      return {
        height: 400,
        itemDashboard: ['I. Ketersediaan Obat Provinsi (sesuai indikator )', 'II. Mapping/Sebaran Sarana Kefarmasian dan Alkes Provinsi ( Bentuk Map JBR & Detail Katagori Sarana)', 'III. Capaian POR', 'IV. Statistik Perizinan yang masuk dari PTSP ( % adalah perizinan yang terbit dibagi dengan ppermohonan yg masuk, dibuat perjenis perizinan PBF cabang, PAK Cabang dan UKOT)', 'V. Hasil Pembinaan dan Pengawasan Sarana ( Tiap Tahun ) jumlahnya yg dilaksanakan pemeriksaan', 'VI. Grafik total tenaga Apoteker dan TTK ( Dinkes,RSUD, Puskesmas)'],
        dateRange: {
          startDate: '2019-12-26',
          endDate: '2019-12-28',
        },   
        page: 1,
        lengthPage: 1,
        pilihFilterThn: '',
        datacollection: null,
        dataDistribusiBarang: [],
        dataIndikatorKadaluarsa: [],
        url: 'http://elogisticsdinkesjabar.com/api-dashboard.php',
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutoutPercentage: 80,
            legend: {
                display: true,
                position: 'bottom'
            },
            tooltips: {
                enabled: true
            },
            hover: {
                mode: true
            }
        },
      }
      
    },
    methods: {
        changePage: function() {
          this.url = 'http://elogisticsdinkesjabar.com/api-dashboard.php?page=dashboard&tahunkdl=2021&bulankdl=11&h=' + this.page
          this.fetchDataLogistik()
        },
        fetchDataLogistik: async function() {
            const response = await fetch(this.url);
            let dataLogistik = await response.json();
            let dataSet = []
            this.dataDistribusiBarang = dataLogistik.data.distribusiObat
            this.dataIndikatorKadaluarsa = dataLogistik.data.indikatorKadaluarsa
            this.lengthPage = dataLogistik.data.jmlIndikatorKadaluarsaPerPage
            dataLogistik.data.distribusiObat.map((item, index) => {
                dataSet.push({
                    label: item.kodeObatRes,
                    backgroundColor: '#f87979',
                    data: [item.jumlah]
                })
            })
            this.datacollection = {
                labels: ["Distribusi Barang"],
                datasets: dataSet
            }
        },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      },             
      btnPilihTanggal: function() {

      },
      innerClick() {
        alert("Click!");
      },                        
    },
    computed: {
        myStyles () {
            return {
                height: `${this.height}px`,
                position: 'relative'
            }
        }
    },    
    created () {
      this.fetchDataLogistik()
    },       
    beforeCreate () {
        // if (this.$store.getters.isLogged) {
        //   this.isLoggedIn = this.$store.getters.isLogged
        //   this.$router.push('/dashboard')            
        // }else {
        //   this.$router.push('/')            
        // }
    }      
}
</script>