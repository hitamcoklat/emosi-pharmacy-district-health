<template>
  <div style="padding-bottom: 2em; background-color: '#FFF';">
      <v-row no-gutters>
        <v-col style="padding: 1em;" md="3" sm="3">
          <v-card class="mt-4">
            <v-sheet
              class="v-sheet--offset mx-auto"
              color="cyan"
              elevation="12"
              max-width="calc(100% - 32px)">
              <v-sparkline
                :labels="labels"
                :value="value"
                color="white"
                line-width="2"
                padding="16"
              ></v-sparkline>
            </v-sheet>

            <v-card-text class="pt-10">
              <div class="title font-weight-light mb-2">
                Obat Publik
              </div>
              <div class="subheading font-weight-light grey--text">
                Data Detail Obat Publik
              </div>
              <v-divider class="my-2"></v-divider>
              <v-btn @click="openObatPublik" depressed block color="primary" dark>Lihat</v-btn>
            </v-card-text>
          </v-card>        
        </v-col>        
        <v-col style="padding: 1em;" md="3" sm="3">
          <v-card class="mt-4">
            <v-sheet
              class="v-sheet--offset mx-auto"
              color="cyan"
              elevation="12"
              max-width="calc(100% - 32px)">
              <v-sparkline
                :labels="labels"
                :value="value"              
                color="white"
                line-width="2"
                padding="16"
              ></v-sparkline>
            </v-sheet>

            <v-card-text class="pt-10">
              <div class="title font-weight-light mb-2">
                Sarana Kefarmasian
              </div>
              <div class="subheading font-weight-light grey--text">
                Data Detail Sarana Kefarmasian
              </div>
              <v-divider class="my-2"></v-divider>
              <v-btn @click="openSaranaFarmasi" depressed block color="primary" dark>Lihat</v-btn>
            </v-card-text>
          </v-card>        
        </v-col>        
        <v-col style="padding: 1em;" md="3" sm="3">
          <v-card class="mt-4">
            <v-sheet
              class="v-sheet--offset mx-auto"
              color="cyan"
              elevation="12"
              max-width="calc(100% - 32px)">
              <v-sparkline
                :labels="labels"
                :value="value"              
                color="white"
                line-width="2"
                padding="16"
              ></v-sparkline>
            </v-sheet>

            <v-card-text class="pt-10">
              <div class="title font-weight-light mb-2">
                Tenaga Apoteker & TKK
              </div>
              <div class="subheading font-weight-light grey--text">
                Data Tenaga Apoteker dan TKK
              </div>
              <v-divider class="my-2"></v-divider>
              <v-btn @click="openTenagaApoteker" depressed block color="primary" dark>Lihat</v-btn>
            </v-card-text>
          </v-card>        
        </v-col>
        <v-col style="padding: 1em;" md="3" sm="3">
          <v-card class="mt-4">
            <v-sheet
              class="v-sheet--offset mx-auto"
              color="cyan"
              elevation="12"
              max-width="calc(100% - 32px)">
              <v-sparkline
                :labels="labels"
                :value="value"              
                color="white"
                line-width="2"
                padding="16"
              ></v-sparkline>
            </v-sheet>

            <v-card-text class="pt-10">
              <div class="title font-weight-light mb-2">
                Pelayanan Kefarmasian
              </div>
              <div class="subheading font-weight-light grey--text">
                Data Pelayanan Kefarmasian
              </div>
              <v-divider class="my-2"></v-divider>
              <v-btn @click="openYanfar" depressed block color="primary" dark>Lihat</v-btn>
            </v-card-text>
          </v-card>        
        </v-col>
                
      </v-row>

      <v-row>
        <v-col sm="12" md="12" style="background-color: #F3F3F3;">
          <v-card
              style="padding: 1em;"
              class="mx-auto"
              outlined
          >
          <date-range-picker v-model="dateRange"></date-range-picker>
              <v-btn style="margin-left: 10px;" @click="btnPilihTanggal" color="primary" medium>
                <v-icon style="margin-right: 10px;" size="16">mdi-calendar-range</v-icon> Pilih Tanggal
              </v-btn>
              <p style="margin-top: 10px;">Filter: {{ convertDateIndo(dateRange.startDate) }} <i>sampai</i> {{ convertDateIndo(dateRange.startDate) }} <span style="font-weight: bold;" v-if="pilihFilterThn !== ''">| Thn: {{pilihFilterThn}}</span></p>
          </v-card>          
        </v-col>
      </v-row>
      <v-row>
        <v-col style="padding: 2em; white-space: nowrap;" sm="12" md="12">
          <div id="listChip" style="overflow: auto;">
              <router-link to="/dashboard/detail">
                <v-chip
                    style="margin-left: 1em; margin-top: 1em; margin-bottom: 1em; cursor: pointer; padding: 1.3em;"
                    v-for="(item, index) in itemDashboard" :key="index"
                    close-icon="mdi-delete"
                    color="primary"
                >{{item}}</v-chip>
              </router-link> 
          </div>        
        </v-col>
      </v-row>
      <v-row>
        <v-col style="padding: 2em;" sm="12" md="12">
          <v-row>
            <v-col class="md-6 lg-6 sm-6">                            
                <h2 style="text-align: center; font-size: 1.1em;"> Mapping/Sebaran Sarana Kefarmasian dan Alkes Provinsi ( Bentuk Map JBR & Detail Katagori Sarana)</h2>
                <l-map
                  ref="map" 
                  v-resize="onResize"
                  :zoom="zoom"
                  :center="center"
                  :options="mapOptions"
                  style="height: 300px; width: 100%; margin-top: 20px; margin-bottom: 20px; z-index: 1 !important;"
                  @click="mapClick"
                  @update:center="centerUpdate"
                  @update:zoom="zoomUpdate"                
                >
                  <l-tile-layer :url="url"/> 
                  <l-geo-json :geojson="geojson"></l-geo-json>                                
                  <l-marker
                    v-for="(item, index) in arrayMarker"
                    :key="'marker-' + index"
                    :lat-lng="item.lokasiTempat"
                  >
                    <l-popup>
                      <div @click="innerClick">
                        {{item.namaTempat}}
                      </div>
                    </l-popup>      
                  </l-marker>
                </l-map>        
            </v-col>
            <v-col class="md-5 lg-5 sm-5">
                <h2 style="text-align: center; font-size: 1.1em;"> Persentase Jumlah Puskesmas Yang Memiliki 80% Vaksin Esensial</h2>
                <br />
                <highcharts :options="chartOptions"></highcharts>    
            </v-col>            
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="md-6 lg-6 sm-6">
            <h2 style="text-align: center; font-size: 1.1em;">Persentase Ketersediaan</h2>
            <br />
            <highcharts :options="chartOptions2"></highcharts>    
        </v-col>
        <v-col class="md-5 lg-5 sm-5">
            <h2 style="text-align: center; font-size: 1.1em;"> Mapping/Sebaran Sarana Kefarmasian dan Alkes Provinsi ( Bentuk Map JBR & Detail Katagori Sarana)</h2>
            <l-map
              ref="map" 
              v-resize="onResize"
              :zoom="zoom"
              :center="center"
              :options="mapOptions"
              style="height: 300px; width: 97%; margin-top: 20px; margin-bottom: 20px; z-index: 1 !important;"
              @click="mapClick"
              @update:center="centerUpdate"
              @update:zoom="zoomUpdate"                
            >
              <l-tile-layer :url="url"/>
              <l-geo-json :geojson="geojson"></l-geo-json>    
              <l-marker
                v-for="(item, index) in arrayMarker"
                :key="'marker-' + index"
                :lat-lng="item.lokasiTempat"
              >
                <l-popup>
                  <div @click="innerClick">
                    {{item.namaTempat}}
                  </div>
                </l-popup>      
              </l-marker>                                    
            </l-map>        
        </v-col>
      </v-row>           
    <ObatPublik v-if="popUpOblik" @closeObatPublik="closeObatPublik" />
    <SaranaFarmasi v-if="popUpSaranaFarmasi" @closeSaranaFarmasi="closeSaranaFarmasi" />
    <TenagaApoteker v-if="popUpTenagaApoteker" @closeTenagaApoteker="closeTenagaApoteker" />
    <Yanfar v-if="popUpYanfar" @closeYanfar="closeYanfar" />
  </div>
</template>

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

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default {
    name: 'Dashboard',
    components: { 
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
        itemDashboard: ['I. Ketersediaan Obat Provinsi (sesuai indikator )', 'II. Mapping/Sebaran Sarana Kefarmasian dan Alkes Provinsi ( Bentuk Map JBR & Detail Katagori Sarana)', 'III. Capaian POR', 'IV. Statistik Perizinan yang masuk dari PTSP ( % adalah perizinan yang terbit dibagi dengan ppermohonan yg masuk, dibuat perjenis perizinan PBF cabang, PAK Cabang dan UKOT)', 'V. Hasil Pembinaan dan Pengawasan Sarana ( Tiap Tahun ) jumlahnya yg dilaksanakan pemeriksaan', 'VI. Grafik total tenaga Apoteker dan TTK ( Dinkes,RSUD, Puskesmas)'],
        dateRange: {
          startDate: '2019-12-26',
          endDate: '2019-12-28',
        },   
        geojson: null,     
        chartOptions: getData(),   
        chartOptions2: getData(),
        pilihFilterThn: '',
        longlat: '',
        currentZoom: 11.5,
        currentCenter: latLng(-6.9005281, 107.5985346),
        clickLokasiTempat: latLng(-6.9005281, 107.5985346),
        popUpOblik: false,
        popUpSaranaFarmasi: false,
        popUpTenagaApoteker: false,
        popUpYanfar: false,
        mapOptions: {
          zoomSnap: 0.5
        },
        zoom: 8.5,
        dataMap: [],
        center: latLng(-6.9005281, 107.5985346),        
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        arrayMarker: kordinatKabkot, 
        chartOptions2: getData(),
        labels: [
          '12am',
          '3am',
          '6am',
          '9am',
          '12pm',
          '3pm',
          '6pm',
          '9pm',
        ],
        value: [
          200,
          675,
          410,
          390,
          310,
          460,
          250,
          240,
        ],              
      }
      
    },
    methods: {
      convertDateIndo: function(str) {
        var monthNames = ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];        
        var date  = new Date(str),
            mnth  = ("0" + (date.getMonth() + 1)).slice(-2),
            day   = ("0" + date.getDate()).slice(-2);
        return monthNames[mnth - 1] + ' ' + date.getFullYear();
      },      
      btnPilihTanggal: function() {

      },
      openObatPublik: function() {
        this.popUpOblik = true
      },
      closeObatPublik: function() {
        this.popUpOblik = false
      },
      openSaranaFarmasi: function() {
        this.popUpSaranaFarmasi = true
      },
      closeSaranaFarmasi: function() {
        this.popUpSaranaFarmasi = false
      },
      openTenagaApoteker: function() {
        this.popUpTenagaApoteker = true
      },
      closeTenagaApoteker: function() {
        this.popUpTenagaApoteker = false
      },
      openYanfar: function() {
        this.popUpYanfar = true
      },
      closeYanfar: function() {
        this.popUpYanfar = false
      },
      onResize() {
        this.$refs.map.mapObject._onResize();
      }, 
      mapClick: function(e) {
        console.log(e)
      }, 
      centerUpdate(center) {
        console.log(center)
      }, 
      zoomUpdate(zoom) {
        console.log(zoom)
      },
      innerClick() {
        alert("Click!");
      },                        
    }, 
    async created () {
      const response = await fetch('http://103.147.222.234/e-mosi/public-assets/map/jabar.json');
      // const response = await fetch('https://nominatim.openstreetmap.org/search.php?q=bandung&polygon_geojson=1&format=json');
      this.geojson = await response.json();
      console.log(this.geojson)
    },       
    beforeCreate () {
        if (this.$store.getters.isLogged) {
          this.isLoggedIn = this.$store.getters.isLogged
          this.$router.push('/dashboard')            
        }else {
          this.$router.push('/')            
        }
    }      
}
</script>