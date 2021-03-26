<template>
    <div>
        <SubMenu />
        <v-content class="pl-0">
          <p style="font-weight: bold; font-size: 1.3em; margin-left: 10px;" class="mt-n12">Instrumen Pedagang Besar Farmasi</p>
          <v-col cols="12" sm="12" md="12">
            
              <v-card
                  style="padding: 10px;"
                  class="mx-auto"
                  outlined
              >
              <date-range-picker
                  v-model="dateRange"></date-range-picker>
                  <v-btn style="margin-left: 10px;" @click="btnPilihTanggal" color="primary" medium>
                    <v-icon style="margin-right: 10px;" size="16">mdi-calendar-range</v-icon> Pilih Tanggal
                  </v-btn>
                  <v-btn style="margin-left: 10px;" @click="dialogFilterTahun = true;" color="success" medium>
                    <v-icon style="margin-right: 10px;" size="16">mdi-calendar-range</v-icon> Tampilkan Per Tahun</v-btn>
                  <p style="margin-top: 10px;">Filter: {{ convertDateIndo(dateRange.startDate) }} <i>sampai</i> {{ convertDateIndo(dateRange.startDate) }} <span style="font-weight: bold;" v-if="pilihFilterThn !== ''">| Thn: {{pilihFilterThn}}</span></p>
              </v-card>
            
          </v-col>                    
          <v-card style="margin: 10px;">
            <v-tabs
              background-color="white"
              color="deep-purple accent-4"
              left
            >
              <v-tab>Tampilan Map</v-tab>
              <v-tab>Tampilan Tabel</v-tab>
              <v-tab @click="dialog = true">Input Monev</v-tab>

              <v-tab-item>
                <v-container style="margin: 10px;">
                  <v-row>
                    <v-col
                      cols="12"
                      md="4"
                    >
                    </v-col>
                    <MapMonev v-bind:dataMap="dataMap" style="z-index: 1;" />
                  </v-row>
                </v-container>
              </v-tab-item>
              <v-tab-item>
                <v-container style="margin: 10px;">
                  <v-row>
                    <v-col
                      cols="12"
                    >
                    <v-alert
                      v-if="pilihFilterThn == ''"
                      text
                      prominent
                      type="error"
                      icon="mdi-cloud-alert"
                    >
                      Anda belum milih Tanggal. Silahkan "Pilih Tanggal" atau Klik "Tampilkan Semua"
                    </v-alert>                    
                      <v-btn style="margin-bottom: 10px;" small color="primary" @click="dialogExcell = true">Lihat Detail</v-btn>
                      <v-card>
                        <v-card-title>
                          List Monev
                          <v-spacer></v-spacer>
                          <v-text-field
                            outlined
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Search"
                            single-line
                            hide-details
                          ></v-text-field>
                        </v-card-title>
                        <v-data-table
                          :headers="headers"
                          :items="dataMap"
                          :items-per-page="10"
                          :search="search"
                          class="elevation-1"
                        >
                          <template v-slot:item.actionCapa="{ item }">
                            <v-icon
                              small
                              class="mr-2"
                              @click="popUpCapa(item)"
                            >
                              mdi-book-edit
                            </v-icon>
                          </template>                        
                          <template v-slot:item.actionMap="{ item }">
                            <v-icon
                              small
                              class="mr-2"
                              @click="lihatMap(item)"
                            >
                              mdi-map
                            </v-icon>
                          </template>                        
                          <template v-slot:item.actionFile="{ item }">
                            <v-btn style="margin: 5px;" v-if="item.CONTENT.data_file.length > 0" v-for="(i, index) in item.CONTENT.data_file" @click="lihatFile(i)" small elevation="2">{{i.response.data.namaFile}}</v-btn>                            
                          </template>                        
                          <template v-slot:item.actions="{ item }">
                            <v-icon
                              small
                              class="mr-2"
                              @click="editItem(item)"
                            >
                              mdi-pencil
                            </v-icon>
                            <v-icon
                              small
                              @click="deleteItem(item)"
                            >
                              mdi-delete
                            </v-icon>
                          </template>
                        </v-data-table>
                      </v-card>                      
                    </v-col>
                  </v-row>
                </v-container>
              </v-tab-item>
              <v-tab-item>
                <v-container style="margin: 10px;">
                  <v-row>
                    <v-col
                      cols="12"
                    >
                      <iframe style="width: 100%; height: 500px; border: 0 !important; background-color: grey;" :src="`${this.$linkMonev}/#/monev/input-pbf/32/${longlat}`" />
                    </v-col>
                  </v-row>
                </v-container>
              </v-tab-item>
            </v-tabs>
          </v-card>          
        </v-content>
      <v-dialog
        @click:outside="popDetail = false; lihatGoogleMap = false"
        v-model="dialog"
        max-width="690"
      >
        <v-card>
          <div style="padding: 20px;">
            <div v-if="popDetail !== true">
            <p style="font-weight: bold; font-size: 1.4em;">Pilih Lokasi. <span @click="inputManual" style="color: blue; cursor: pointer;">[ Input Kordinat Manual ]</span></p>
              <v-col cols="12" sm="12" md="12" style="padding: 0 !important; margin: 0 !important;">
                <v-text-field
                  v-on:keyup.enter="cariLokasi"
                  v-model="mCariText"
                  label="Masukan nama kota lalu klik [Enter]..."
                  outlined
                ></v-text-field> 
                <p>
                  Silahkan klik pada map untuk membuat marker<br />
                  Kordinat: {{ longlat }}
                </p>
              </v-col> 
            </div>
              <br />
              <l-map
                ref="map" 
                v-resize="onResize"
                :zoom="zoom"
                :center="center"
                :options="mapOptions"
                style="height: 300px; width: 100%;"
                @click="mapClick"
                @update:center="centerUpdate"
                @update:zoom="zoomUpdate"                
              >
                <l-tile-layer
                  :url="url"
                /> 
                <l-marker
                  :lat-lng="clickLokasiTempat"
                >      
                </l-marker>                             
              </l-map>
              <br />
              <v-btn v-if="lihatGoogleMap" @click="toGoogleMap()" depressed block color="primary">Lihat di Google Map</v-btn>
          </div>
          <v-card-actions v-if="popDetail !== true">
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">PILIH LOKASI</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog> 
      <v-dialog v-model="dialogLokasi" scrollable max-width="300px">
        <v-card>
          <v-card-title>Pilih Lokasi</v-card-title>
          <v-divider></v-divider>
          <v-card-text style="height: 390px;">
            <v-radio-group v-model="pilihLongLat" column>
              <v-radio v-for="(item, i) in dataLokasi" :label="item.display_name" :value="`${item.lat},${item.lon}`" :key="'itemPilihLonglat-' + i"></v-radio>
            </v-radio-group>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="blue darken-1" text @click="dialogLokasi = false">Tutup</v-btn>
            <v-btn color="blue darken-1" text @click="dialogLokasi = false; btnPilihLongLat()">Pilih</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogFilterTahun" scrollable max-width="300px">
        <v-card>
          <v-card-title>Pilih Tahun</v-card-title>
          <v-divider></v-divider>
          <v-card-text style="height: 390px;">
            <v-radio-group v-model="pilihFilterThn" column>
              <v-radio label="Tahun 2019" value="2019"></v-radio>
              <v-radio label="Tahun 2020" value="2020"></v-radio>
              <v-radio label="Tahun 2021" value="2021"></v-radio>
              <v-radio label="Tahun 2022" value="2022"></v-radio>
            </v-radio-group>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="blue darken-1" text @click="dialogFilterTahun = false">Tutup</v-btn>
            <v-btn color="blue darken-1" text @click="dialogFilterTahun = false; btnShowAll()">Pilih</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>      
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
      <PopPbfExcell :dialogExcell=dialogExcell @dialog="tutupDialog" :dataMap="dataMap" />
      <v-dialog
        v-model="dialogEdit"
        persistent
        width="500">

        <v-card>
          <v-card-title class="headline grey lighten-2">
            Edit Monev
          </v-card-title>          
            
            <iframe ref="iframeEdit" style="width: 100%; height: 500px; border: 0 !important; background-color: grey;" :src="paramEdit" :key="'web-monev-'+paramEdit + '-' + Math.floor(Math.random() * 99999)"></iframe>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="dialogEdit = false; btnShowAll();">
              Tutup
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>    
    </div>
</template>

<script>

import SubMenu from './SubMenu'
import MapMonev from './map/pbf'
import PopPbfExcell from './popExcell/pbf'
import DateRangePicker from 'vue2-daterange-picker'
//you need to import the CSS manually (in case you want to override it)
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import "leaflet/dist/leaflet.css";
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup, LTooltip } from "vue2-leaflet";
import { Icon } from 'leaflet';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default {
    name: 'FormPOR',
    components: {
      MapMonev,
      PopPbfExcell,
      DateRangePicker,
      LMap,
      LTileLayer,
      LMarker,
      LPopup,
      LTooltip,
      SubMenu     
    },
    data () {
      return {
        search: '',
        lihatGoogleMap: false,
        linkGoogleMap: '',
        dialogEdit: false,
        zoom: 15,
        dialogLokasi: false,
        dialogFilterTahun: false,
        pilihLongLat: '',
        dialogExcell: false,
        dataLokasi: [],
        pilihFilterThn: '',
        dialogLoading: false,
        center: latLng(-6.9005281, 107.5985346),        
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        dateRange: {
          startDate: '2019-12-26',
          endDate: '2019-12-28',
        },    
        dialog: false,    
        longlat: '',
        right: null,
        idDaerah: '',
        id: '',
        mCariText: '',
        currentZoom: 11.5,
        currentCenter: latLng(-6.9005281, 107.5985346),
        clickLokasiTempat: latLng(-6.9005281, 107.5985346),
        mapOptions: {
          zoomSnap: 0.5
        },
        dataMap: [],
        paramEdit: '', 
        headers: [
          {
            text: 'Nama PBF',
            align: 'start',
            sortable: false,
            value: 'CONTENT.content.nama_pbf',
          },
          { text: 'Tgl. Periksa', value: 'CONTENT.content.tgl_periksa' },
          { text: 'Alamat', value: 'CONTENT.content.alamat_pbf' },
          { text: 'Kab/Kota', value: 'CONTENT.content.kab_kota' },
          { text: 'Status PBF', value: 'CONTENT.content.status_pbf' },
          { text: 'Jenis PBF', value: 'CONTENT.content.jenis_pbf' },
          { text: 'CAPA', value: 'actionCapa' },
          { text: 'Lihat Map', value: 'actionMap' },
          { text: 'File', value: 'actionFile' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        popDetail: false
      }
    },
    methods: {
      onResize() {
        this.$refs.map.mapObject._onResize();
      },
      popUpCapa: function(item) {
        
      },
      tutupDialog: function() {
        this.dialogExcell = false
      },    
      btnPilihTanggal: function() {
        this.$http.get(this.$apiUrl + '/filterDataMonev?jenis=monevpbf&from=' + this.convertDate(this.dateRange.startDate) + '&to=' + this.convertDate(this.dateRange.endDate))
          .then((response) => {
            this.dataMap = response.data.data
          })         
      },
      lihatFile: function(item) {
        window.open(item.response.data.img, '_blank');
      },
      lihatMap: function(item) {
        let kordinat = item.LONGLAT
        let res = kordinat.split(",")
        this.dialog = true
        this.longlat = kordinat
        this.center = latLng({ lat: res[0], lng: res[1] })
        this.clickLokasiTempat = latLng({ lat: res[0], lng: res[1] })    
        // this.linkGoogleMap = `https://www.google.com/maps/@${res[0]},${res[1]},15z`
        this.linkGoogleMap = `https://www.google.com/maps/search/?api=1&query=${res[0]},${res[1]}`
        this.popDetail = true    
        this.lihatGoogleMap = true    
        console.log(item)
      },
      editItem: function(item) {
        // this.paramEdit = `${this.$linkMonev}/#/monev/input-pbf/32/${item.LONGLAT}?edit=true&id=${item.id}`;
        this.paramEdit = this.$linkMonev + '/#/monev/input-pbf/32/' + item.LONGLAT + '?edit=true&id=' + item.id;
        // this.refs.iframeEdit.contentWindow.location.reload(true);
        this.dialogEdit = true
      },
      onLoadIframe: function() {
        console.log('onLoad iframe')
      },
      deleteItem: function(item) {
        console.log(item)
        if(confirm('Apakah anda yakin ingin menghapus data ini?')) {
          this.$http.get(this.$apiUrl + '/remove-monev?id=' + item.id + '&jenis=monevpbf')
            .then((response) => {
              if(response.data.status == '1') {
                this.btnShowAll();
              }
            })
        }  
      },
      mapClick: function(e) {
        this.longlat = e.latlng.lat + ',' + e.latlng.lng
        this.clickLokasiTempat = latLng({
          lat: e.latlng.lat, lng: e.latlng.lng
        })        
      },
      zoomUpdate(zoom) {
        this.currentZoom = zoom;
      },
      centerUpdate(center) {
        console.log(center)
        this.currentCenter = center;
      },
      btnPilihLongLat: function() {
        let str = this.pilihLongLat
        let res = str.split(",")
        this.center = latLng({
          lat: res[0], lng: res[1]
        })
      },
      toGoogleMap: function() {
        window.open(
          this.linkGoogleMap,
          '_blank'
        )
      },
      cariLokasi: function() {
        this.dialogLoading = true
        let text = this.mCariText
        this.$http.get('https://nominatim.openstreetmap.org/search?city=' + text + '&country=indonesia&format=json')
          .then((response) => {
            this.dialogLoading = false
            this.dialogLokasi = true
            this.dataLokasi = response.data
          })
      },
      convertDate: function(str) {
        var date = new Date(str),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
      },      
      convertDateIndo: function(str) {
        var monthNames = ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];        
        var date  = new Date(str),
            mnth  = ("0" + (date.getMonth() + 1)).slice(-2),
            day   = ("0" + date.getDate()).slice(-2);
        return monthNames[mnth - 1] + ' ' + date.getFullYear();
      },      
      fetchMapData: function() {
        this.$http.get(this.$apiUrl + '/getDataMonev')
          .then((response) => {
            this.dialogLoading = false
            this.dialogLokasi = true
            this.dataLokasi = response.data
          })        
      },
      btnShowAll: function() {
        if(this.pilihFilterThn == '2019') {
          console.log('Thn 2019 dipilih')
          this.$http.get('http://app.diskes.jabarprov.go.id/e-mosi/public-assets/data-json/data-pbf-2019.json')
            .then((response) => {
              let newArray = []
              response.data.forEach(function(item, index) {
                newArray.push({
                  CONTENT: {
                    content: {
                      nama_pbf: item.NAMA_PBF,
                      tgl_periksa: item.TIMESTAMP,
                      alamat_pbf: item.ALAMAT_PBF,
                      kab_kota: item.KAB_KOTA,
                      status_pbf: item.STATUS_PBF,
                      jenis_pbf: item.JENIS_PBF,
                      no_izin_pbf: item.NOMOR_IZIN_PBF,
                      tgl_terbit_izin: item.TANGGAL_TERBIT_IZIN_PBF,
                      hasil_tinjauan: item.HASIL_TINJAUAN,
                      sertifikat_codb: item.SERTIFIKAT_CDOB_DARI_BPOM_DAN_ATAU_REKOMENDASI_PEMENUHAN_ASPEK_CDOB,
                      nib: item.NIB,
                      izin_oss: item.IZIN_OSS,
                      nama_apoteker: item.NAMA_APOTEKER_PENANGGUNG_JAWAB,
                      pemeriksaan_apj_ada_ditempat: item.PADA_SAAT_PEMERIKSAAN_APJ_ADA_DITEMPAT,
                      lainnya: '',
                      no_stra: item.NOMOR_STRA,
                      masa_berlaku_stra: item.MASA_BERLAKU_STRA,
                      no_sipa: item.NOMOR_SIPA,
                      masa_berlaku_sipa: item.MASA_BERLAKU_SIPA,
                      gudang_penyimpanan_obat: item.GUDANG_TEMPAT_PENYIMPANAN_OBAT,
                      dokumentasi: item.DOKUMENTASI,
                      job_description: item.JOB_DESCRIPTION_APJ,
                      alur_proses: item.ALUR_PROSES_PEROLEHAN_SEDIAAN_FARMASI_DAN_DISTRIBUSI,
                      lapor_ereport: '',
                      hasil_tinjauan_asal_obat: item.HASIL_TINJAUAN_ASAL_PEROLEHAN_OBAT,
                      hasil_tinjauan_distribusi_obat: item.HASIL_TINJAUAN_PENDISTRIBUSIAN_OBAT,
                      teguran_bpom: item.TEGURAN_BPOM,
                      progres_capa: item.PROGRESS_CAPA_CORRECTIVE_ACTION_PREVENTIVE_ACTION,
                      komitment_penyelesaian_capa: item.KOMITMEN_PENYELESAIAN_CAPA                      
                    }
                  }
                })
              })
              this.dataMap = newArray
              console.log(this.dataMap)
            })           
          return false;
        }
        this.$http.get(this.$apiUrl + '/getDataMonev?jenis=monevpbf&thn=' + this.pilihFilterThn)
          .then((response) => {
            this.dataMap = response.data.data
          }) 
      },
      inputManual: function() {
        let korManual = prompt("Masukan Kordinat (Longitude, Latitude Misal: -6.899968,107.597415)", "");
        if (korManual != null) {
          let res = korManual.split(",")
          this.longlat = korManual
          this.center = latLng({ lat: res[0], lng: res[1] })
          this.clickLokasiTempat = latLng({ lat: res[0], lng: res[1] })
        }         
      }
    },
    created() {
      this.idDaerah = this.$store.getters.userData.KODE_DAERAH
    },
    mounted() {
      // this.$refs.map[0].mapObject._onResize()
    }    
}
</script>
<style scoped>
  .vueIframe {
    width: 100%; 
    height: 500px; 
    border: 0 !important;    
  }
</style>
