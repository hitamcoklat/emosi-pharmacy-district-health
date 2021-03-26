<template>
<v-dialog
      v-model="dialog"
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
            @click="closeObatPublik"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{dataKabkot.namaKabkot}}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-row>
          <v-col style="background-color: #CFD8DC;">
              <h2 style="text-align: left; font-size: 1.1em; padding: 1em;"> Mapping/Sebaran Sarana Kefarmasian dan Alkes Provinsi ( Bentuk Map JBR & Detail Katagori Sarana)</h2>
              <l-map
                ref="map" 
                v-resize="onResize"
                :zoom="zoom"
                :center="center"
                :options="mapOptions"
                style="height: 500px; width: 100%; margin-top: 20px; margin-bottom: 20px; z-index: 1 !important;"
                @click="mapClick"
                @update:center="centerUpdate"
                @update:zoom="zoomUpdate"                
              >
                <l-tile-layer
                  :url="url"
                /> 
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
          <v-col style="background-color: #EEEEEE;">
              <h2 style="text-align: center;"> Persentase Jumlah Puskesmas Yang Memiliki 80% Vaksin Esensial</h2>
              <highcharts :options="chartOptions"></highcharts>    
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-data-table
              :headers="headers"
              :items="desserts"
              :items-per-page="5"
              class="elevation-1"
            ></v-data-table>            
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>    
</template>
<script>

import getData from '../../../../data/chart/bar'
import "leaflet/dist/leaflet.css";
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup, LTooltip } from "vue2-leaflet";
import { Icon } from 'leaflet';
import kordinatKabkot from '../../../../../config/kordinatKabkot'

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default {
    name: 'ObatPublik',
    props: ['namaKabkot', 'kodeKabkot', 'dataKabkot'],
    components: { 
      LMap,
      LTileLayer,
      LMarker,
      LPopup,
      LTooltip,
    },    
    data () {
      return {
        dialog: true,
        dateRange: {
          startDate: '2019-12-26',
          endDate: '2019-12-28',
        },        
        chartOptions: getData(),   
        chartOptions2: getData(),
        longlat: '',
        currentZoom: 11.5,
        currentCenter: latLng(-6.9005281, 107.5985346),
        clickLokasiTempat: latLng(-6.9005281, 107.5985346),
        mapOptions: {
          zoomSnap: 0.5
        },
        zoom: 8.5,
        dataMap: [],
        center: latLng(-6.9005281, 107.5985346),        
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        arrayMarker: kordinatKabkot,
headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' },
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%',
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%',
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%',
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%',
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16%',
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0%',
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2%',
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45%',
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22%',
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%',
          },
        ],         
      }
    },
    methods: {
      closeObatPublik() {
          this.$emit('closeObatKab')
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

}
</script>