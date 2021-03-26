<template>
  <v-row>
    <v-col sm="6" md="6" cols="6">
      <v-row no-gutters>
        <v-btn elevation="0" outlined>Data Rumah Sakit Umum/Daerah</v-btn>
      </v-row>
      <v-row no-gutters>
        <v-col cols="6" sm="6" md="6" lg="6">
          <v-select
            v-model="kodeKabkot"
            :items="listKabkot"
            item-text="namaKabkot"
            item-value="kodeKabkot"
            label="Pilih Kabupaten/Kota"
            @change="changeKabkot"
          ></v-select>
        </v-col>
        <v-col class="mt-3 pl-5" cols="3" sm="3" md="3" lg="3">
          <v-btn @click="showMap = !showMap" dark color="light-blue accent-4"
            >Tampilkan {{ showMap == true ? "TABEL" : "MAP" }}</v-btn
          >
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-progress-linear
          v-if="loadingTable"
          indeterminate
          color="teal darken-2"
        ></v-progress-linear>
      </v-row>
      <v-row v-if="showMap == false" style="border: 1px solid #ccc" no-gutters>
        <v-text-field
          style="padding-left: 1em; padding-right: 1em"
          v-model="searchRS"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-data-table
          style="height: 400px; width: 100%; overflow: auto"
          :headers="headerRS"
          :items="listRS"
          :search="searchRS"
        ></v-data-table>
      </v-row>
      <v-row
        v-if="showMap"
        style="padding: 0.5em; border: 1px solid #ccc"
        no-gutters
      >
        <l-map
          ref="map"
          v-resize="onResize"
          :zoom="zoom"
          :center="center"
          :options="mapOptions"
          style="
            height: 432px;
            width: 100%;
            margin-top: 10px;
            margin-bottom: 10px;
            z-index: 1 !important;
          "
          @click="mapClick"
          @update:center="centerUpdate"
          @update:zoom="zoomUpdate"
        >
          <l-tile-layer :url="url" />
          <l-marker
            v-for="(item, index) in arrayMarker"
            :key="'marker-' + index"
            :lat-lng="item.lokasiTempat"
          >
            <l-popup>
              <div @click="innerClick(item)">
                {{ item.namaTempat }}
              </div>
            </l-popup>
          </l-marker>
        </l-map>
      </v-row>
    </v-col>
    <v-col sm="6" md="6" cols="6">
      <v-row no-gutters>
        <v-col sm="6" md="6" cols="6">
          <v-btn elevation="0">Chart</v-btn>
        </v-col>
        <v-col sm="6" md="6" cols="6">
          <v-select
            dense
            :items="typeChart"
            v-model="selectedChart"
            label="Tipe Chart"
            @change="changeJenisChart"
          ></v-select>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <zingchart :data="chartKabkotRS"></zingchart>
      </v-row>
    </v-col>
    <v-row justify="center">
      <v-dialog v-model="popUpDetailRS" max-width="400" scrollable>
        <v-card>
          <v-card-title>Detail Rumah Sakit</v-card-title>
          <v-divider></v-divider>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Detail</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in detailRS" :key="index">
                  <td>{{ item[0] }}</td>
                  <td>{{ item[1] }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-dialog>
    </v-row>
  </v-row>
</template>
<script>
import "leaflet/dist/leaflet.css";
import { latLng } from "leaflet";
import {
  LMap,
  LTileLayer,
  LMarker,
  LPopup,
  LTooltip,
  LGeoJson,
} from "vue2-leaflet";
import { Icon } from "leaflet";
import kordinatKabkot from "../../../config/kordinatKabkot";
import listKabkot from "../../../config/listKabkot";
import latlongByKode from "../../../config/latlongByKode";
import kabkotByKode from "../../../config/kabkotByKode";
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});
export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LGeoJson,
    LTooltip,
  },
  data() {
    return {
      popUpDetailRS: false,
      showMap: false,
      typeChart: ["bar", "area", "pie", "scatter"],
      selectedChart: "bar",
      loadingTable: false,
      searchRS: "",
      listKabkot: listKabkot,
      chartKabkotRS: null,
      headerRS: [
        { text: "Nama Rumah Sakit", value: "nama_faskes" },
        { text: "Kode Faskes", value: "kode_faskes" },
        { text: "Daerah", value: "namaDaerah" },
      ],
      listRS: [],
      jmlRS: 0,
      kodeKabkot: null,
      latLongByKode: JSON.parse(JSON.stringify(latlongByKode)),
      listKabkot: listKabkot,
      kabkotByKode: kabkotByKode,
      currentLatLng: null,
      currentZoom: 11.5,
      currentCenter: latLng(-6.9005281, 107.5985346),
      clickLokasiTempat: latLng(-6.9005281, 107.5985346),
      mapOptions: {
        zoomSnap: 0.5,
      },
      zoom: 8.5,
      dataMap: [],
      center: latLng(-6.9005281, 107.5985346),
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      arrayMarker: null,
      detailRS: [],
    };
  },
  methods: {
    changeJenisChart: function () {
      this.fetchDataRS();
    },
    renderChartBar: function (label, dataSet, colorPlot) {
      this.chartKabkotRS = {
        title: {
          text: "Jumlah RS di Jawa Barat",
          position: "0% 0%",
          "margin-top": 10,
          "margin-right": 0,
          "margin-left": 0,
          "margin-bottom": 10,
          color: "white",
          fontWeight: "normal",
        },
        type: this.selectedChart,
        crosshairX: {},
        plot: {
          aspect: "spline",
          styles: colorPlot,
        },
        // preview: { live: true },
        legend: { draggable: true },
        backgroundColor: "#FFFFFF",
        height: "432px",
        stacked: true,
        scaleX: {
          label: { text: "Berdasarkan Kabupaten/Kota" },
          labels: label,
          zooming: true,
          item: {
            fontAngle: -48,
            fontColor: "#9a9cab",
            fontFamily: "Arial",
            fontSize: "10px",
            offsetX: "5px",
          },
          itemsOverlap: true,
        },
        series: [
          {
            text: "Jumlah",
            values: dataSet,
          },
        ],
      };
    },
    renderChartPie: function (dataSet) {
      this.chartKabkotRS = {
        type: this.selectedChart,
        height: "100%",
        width: "100%",
        title: {
          text: "Jumlah RS di Jawa Barat",
          backgroundColor: "none",
          fontColor: "#444",
          height: "12%",
        },
        legend: {
          draggable: true, //automatically adds header
          minimize: true,
          "drag-handler": "icon", //"header" (default) or "icon"
          icon: {
            "line-color": "red",
          },
          header: {
            "background-color": "#ffe6e6",
            "border-left": "1px solid red",
            "border-right": "1px solid red",
            "border-top": "1px solid red",
            "border-bottom": "1px solid red",
          },
          "max-items": 5,
        },
        overflow: "page",
        plot: {
          borderColor: "#2B313B",
          borderWidth: 2,
          // slice: 90,
          valueBox: {
            placement: "out",
            text: "%t\n%npv",
            fontFamily: "Open Sans",
          },
          tooltip: {
            fontSize: "18",
            fontFamily: "Open Sans",
            padding: "5 10",
            text: "Jumlah Data: %v",
            // visible: false
          },
          animation: {
            effect: 2,
            method: 5,
            speed: 900,
            sequence: 1,
            delay: 1000,
          },
        },
        source: {
          text: "Sumber: eMosiJabar",
          fontColor: "#8e99a9",
          fontFamily: "Open Sans",
        },
        backgroundColor: "#FFFFFF",
        series: dataSet,
      };
    },
    changeKabkot: async function () {
      this.loadingTable = true;
      this.searchRS = kabkotByKode[this.kodeKabkot];
      this.arrayMarker = [];
      const response = await fetch(
        `https://node-api-liart.vercel.app/api/faskes/kode?jenis=rs&kode_daerah=${this.kodeKabkot}`
      );
      let dataRS = await response.json();
      let mapRS = [];
      dataRS.data.map((item, index) => {
        dataRS.data[index]["namaDaerah"] = kabkotByKode[item.kode_daerah];
        mapRS[index] = {
          lokasiTempat: latLng({
            lat: item.lat,
            lng: item.long,
          }),
          namaTempat: item.nama_faskes,
          kode_daerah: item.kode_daerah,
          kode_faskes: item.kode_faskes,
        };
      });
      this.loadingTable = false;
      this.arrayMarker = mapRS;
    },
    onResize() {
      this.$refs.map.mapObject._onResize();
    },
    mapClick: function (e) {
      console.log(e);
    },
    centerUpdate(center) {
      console.log(center);
    },
    zoomUpdate(zoom) {
      console.log(zoom);
    },
    getRandomColor: function () {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },    
    innerClick: async function (item) {
      this.loadingTable = true;
      const response = await fetch(
        `https://node-api-liart.vercel.app/api/faskes/detail?id_rs=${item.kode_faskes}`
      );
      let dataRS = await response.json();
      dataRS = dataRS.data;
      let results = Object.keys(dataRS).map((key) => [key, dataRS[key]]);
      this.detailRS = results;
      this.loadingTable = false;
      this.popUpDetailRS = true;
    },
    fetchDataRS: async function () {
      this.loadingTable = true;
      const response = await fetch(
        `https://node-api-liart.vercel.app/api/faskes?jenis=rs`
      );
      let dataRS = await response.json();
      let mapRS = [];
      dataRS.data.map((item, index) => {
        dataRS.data[index]["namaDaerah"] = kabkotByKode[item.kode_daerah];
        dataRS[index] = {
          lokasiTempat: latLng({
            lat: item.lat,
            lng: item.long,
          }),
          namaTempat: item.nama_faskes,
          kode_daerah: item.kode_daerah,
          kode_faskes: item.kode_faskes,
        };
      });
      this.listRS = dataRS.data;
      this.jmlRS = dataRS.count;
      this.arrayMarker = dataRS;
      var groupBy = (xs, key) => {
        return xs.reduce((rv, x) => {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      };
      var groubedByTeam = groupBy(dataRS.data, "namaDaerah");
      let dataGroupCabang = [];
      Object.keys(groubedByTeam).forEach((category, index) => {
        dataGroupCabang.push({
          namaKabkot: category,
          jml: groubedByTeam[category].length,
        });
      });
      let results = JSON.parse(JSON.stringify(dataGroupCabang));
      let dataSet = [];
      let label = [];
      let colorPlot = [];
      let dataSeries = [];      
      results.map((item, index) => {
        label.push(item.namaKabkot);
        dataSet.push(item.jml);
        colorPlot.push(this.getRandomColor())
        dataSeries.push({
          text: item.namaKabkot,
          values: [item.jml],
          backgroundColor: this.getRandomColor(),
        });        
      });
      if(this.selectedChart == 'pie') {
          this.renderChartPie(dataSeries);
      } else {
          this.renderChartBar(label, dataSet, colorPlot)
      }        
      this.loadingTable = false;
    },
  },
  created() {
    this.fetchDataRS();
    setTimeout(() => {
      this.$emit("getJmlPuskesmas", this.jmlRS);
    }, 2000);
  },
};
</script>