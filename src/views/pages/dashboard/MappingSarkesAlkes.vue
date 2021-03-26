<template>
  <v-row>
    <v-col sm="6" md="6" cols="6">
      <v-row no-gutters>
        <v-btn elevation="0" outlined
          >II. Mapping/Sebaran Sarana Kefarmasian dan Alkes Provinsi</v-btn
        >
      </v-row>
      <v-row no-gutters>
        <v-col cols="6" sm="6" md="6" lg="6">
          <v-row no-gutters>
            <v-col style="padding-top: 1em" sm="3" md="3" lg="3">
              <v-btn @click="refreshMap" color="primary" dark
                ><v-icon>mdi-refresh</v-icon></v-btn
              >
            </v-col>
            <v-col sm="9" md="9" lg="9">
              <v-select
                v-model="selectKodeKabkot"
                :items="listKabkot"
                item-text="namaKabkot"
                item-value="kodeKabkot"
                label="Pilih Kabupaten/Kota"
                @change="changeKabkot"
              ></v-select>
            </v-col>
          </v-row>
        </v-col>
        <v-col
          style="padding-left: 10px; padding-right: 10px"
          cols="6"
          sm="6"
          md="6"
          lg="6"
        >
          <v-select
            v-model="selectGrafikSarana"
            :items="listGrafikSarana"
            label="Pilih Persentase dan Grafik Sarana"
            @change="changeGrafikSarana"
          ></v-select>
        </v-col>
      </v-row>
      <v-row style="padding: 0.5em; border: 1px solid #ccc" no-gutters>
        <l-map
          ref="map"
          v-resize="onResize"
          :zoom="zoom"
          :center="center"
          :options="mapOptions"
          style="
            height: 530px;
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
          <l-geo-json :geojson="geojson"></l-geo-json>
          <l-marker
            :visible="fileJson == 'jabar'"
            v-for="(item, index) in arrayMarker"
            :key="'marker-' + index"
            :lat-lng="item.lokasiTempat"
          >
            <l-popup>
              <div @click="innerClick">
                {{ item.namaTempat }}
              </div>
            </l-popup>
          </l-marker>
          -->
        </l-map>
      </v-row>
    </v-col>
    <v-col sm="6" md="6" cols="6">
      <v-row no-gutters>
        <v-col sm="10" md="10" cols="10">
          <v-alert style="font-size: 1.2em; font-weight: bold">{{
            selectGrafikSarana
          }}</v-alert>
        </v-col>
      </v-row>
      <v-row v-if="selectGrafikSarana == ''" no-gutters>
        <p style="text-align: center !important; width: 100%">
          Silahkan pilih Jenis Persentase dan Grafik Sarana terlebih dahulu
        </p>
      </v-row>
      <v-row v-if="selectGrafikSarana !== ''" no-gutters>
        <v-progress-linear
          v-show="loadingChart"
          indeterminate
          color="teal"
        ></v-progress-linear>
        <v-row no-gutters>
          <v-col v-if="showJenisData" class="pr-5" md="4" lg="4">
            <v-select
              dense
              outlined
              v-model="selectListSelectedChart"
              :items="listSelectedChart"
              label="Jenis Data"
              @change="changeGrafikSarana"
            ></v-select>
          </v-col>
          <v-col class="pr-5" md="4" lg="4">
            <v-select
              dense
              outlined
              :items="typeChart"
              v-model="selectedChart"
              label="Tipe Chart"
              @change="changeJenisChart"
            ></v-select>
          </v-col>
          <v-col md="4" lg="4">
            <v-select
              dense
              outlined
              :items="sumberDataChart"
              v-model="selectedSumberDataChart"
              label="Sumber Data"
              @change="changeJenisChart"
            ></v-select>
          </v-col>
        </v-row>
        <v-alert
          style="width: 100%"
          dense
          type="warning"
          v-if="jmlKabkotChart > 29 && namaKabkot == ''"
          >Ops! Sepertinya data belum rapi atau belum ada data</v-alert
        >
        <v-btn
          @click="sheet = true"
          style="margin-bottom: 1em"
          elevation="2"
          small
          color="green"
          dark
          >FullScreen</v-btn
        >
        <zingchart v-if="showChart" :data="dataChart"></zingchart>
      </v-row>
    </v-col>
    <v-bottom-sheet :fullscreen="true" persistent v-model="sheet">
      <v-sheet class="text-center" height="100%">
        <v-btn class="mt-6" text color="red" @click="sheet = !sheet">
          Tutup
        </v-btn>
        <div class="py-3 px-20" style="padding-left: 2em; padding-right: 2em">
          <zingchart
            :fullscreen="true"
            v-if="sheet"
            :data="dataChart"
          ></zingchart>
          <p class="mt-10">
            Data berasal dari server Dinas Kesehatan Provinsi Jawa Barat. Dengan
            sumber data yang di kompilasi dari data
            {{ `${selectedSumberDataChart}` }} dan dicetak pada tahun
            {{
              `${new Date(
                new Date().setDate(new Date().getDate() + 5)
              ).getFullYear()}`
            }}
          </p>
        </div>
      </v-sheet>
    </v-bottom-sheet>
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
      sheet: false,
      longlat: "",
      typeChart: ["bar", "area", "pie"],
      selectListSelectedChart: "",
      selectedChart: "bar",
      selectedSumberDataChart: "Cabang",
      selectKodeKabkot: "",
      listGrafikSarana: [
        "Sarana Kefarmasian dan Alkes yang sesuai standar",
        "Sarana yang telah di Monev berdasarkan temuan",
        "Sarana yang telah memperbaiki dan menyampaikan CAPA",
        "Sarana kefarmasian dan alkes",
        "Sarana kefarmasian dan alkes yang telah tutup/beralih fungsi",
      ],
      listSelectedChart: [
        "Data PBF",
        "Data PAK",
        "Data UKOT",
        "Sertifikat Produksi PKRT",
        "Sertifikat Produksi Alkes",
      ],
      selectGrafikSarana: "",
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
      arrayMarker: kordinatKabkot,
      dataChart: [],
      geojson: null,
      fileJson: "jabar",
      loadingChart: true,
      showDeskripsiPersentase: false,
      deskripsiPersentase: "",
      jmlKabkotChart: 0,
      showChart: false,
      showJenisData: true,
      namaKabkot: "",
      sumberDataChart: ["Cabang", "Pusat"],
    };
  },
  methods: {
    changeJenisChart: function () {
      // this.fetchData()
      // this.generateChart();
      this.changeGrafikSarana();
    },
    fetchMap: async function () {
      const response = await fetch(
        `${this.$apiUrl}/assets/map/${this.fileJson}.json`
      );
      this.geojson = await response.json();
    },
    changeKabkot: function () {
      this.fileJson = this.selectKodeKabkot;
      this.namaKabkot = this.kabkotByKode[this.selectKodeKabkot];

      this.currentLatLng = latLng({
        lat: this.latLongByKode[this.fileJson].lat,
        lng: this.latLongByKode[this.fileJson].lng,
      });
      this.currentCenter = latLng({
        lat: this.latLongByKode[this.fileJson].lat,
        lng: this.latLongByKode[this.fileJson].lng,
      });
      this.fetchMap();
      this.changeGrafikSarana();
    },
    refreshMap: function () {
      this.namaKabkot = "";
      this.selectKodeKabkot = "";
      this.fileJson = "jabar";
      this.fetchMap();
      this.changeGrafikSarana();
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
    innerClick() {
      alert("Click!");
    },
    getTableName: function (nameString) {
      let tblName = "";
      switch (nameString) {
        case "Data PBF":
          tblName = "verifpbf";
          break;
        case "Data PAK":
          tblName = "verifpak";
          break;
        case "Data UKOT":
          tblName = "verifukot";
          break;
        case "Sertifikat Produksi PKRT":
          tblName = "verif_ser_prod_pkrt";
          break;
        case "Sertifikat Produksi Alkes":
          tblName = "verif_ser_prod_alkes";
          break;
        default:
          tblName = "verifpbf";
      }
      return tblName;
    },
    changeGrafikSarana: function () {
      console.log("selectListSelectedChart", this.selectListSelectedChart);
      let tblName = this.getTableName(this.selectListSelectedChart);
      /* 
              'Sarana Kefarmasian dan Alkes yang sesuai standar', 
              'Sarana yang telah di Monev berdasarkan temuan', 
              'Sarana yang telah memperbaiki dan menyampaikan CAPA', 
              'Sarana kefarmasian dan alkes', 
              'Sarana kefarmasian dan alkes yang telah tutup/beralih fungsi'        
        */
      if (
        this.selectGrafikSarana ==
        "Sarana Kefarmasian dan Alkes yang sesuai standar"
      ) {
        this.hitungGrafikSatu(tblName);
      } else if (
        this.selectGrafikSarana ==
        "Sarana yang telah di Monev berdasarkan temuan"
      ) {
        this.hitungGrafikDua(tblName);
      } else if (
        this.selectGrafikSarana ==
        "Sarana yang telah memperbaiki dan menyampaikan CAPA"
      ) {
        this.hitungGrafikTiga(tblName);
      } else if (this.selectGrafikSarana == "Sarana kefarmasian dan alkes") {
        this.hitungGrafikEmpat(tblName);
      } else if (
        this.selectGrafikSarana ==
        "Sarana kefarmasian dan alkes yang telah tutup/beralih fungsi"
      ) {
        this.hitungGrafikLima(tblName);
      } else {
        return false;
      }
    },
    filterByKabkot: function (name, data) {
      if (!data) return [];
      else {
        return data.filter((item) => {
          if (name === item.text) {
            return item;
          }
        });
      }
    },
    hitungGrafikSatu: async function (tipe) {
      this.loadingChart = true;
      this.showJenisData = true;
      let dataAlkes = await fetch(
        this.$apiUrl + "/sarkes/get-sesuai-standar?t_name=" + tipe
      );
      dataAlkes = await dataAlkes.json();
      dataAlkes = dataAlkes.data;

      if (dataAlkes.length == 0) {
        this.loadingChart = false;
        this.deskripsiPersentase = "";
        return;
      }

      var groupBy = (xs, key) => {
        return xs.reduce((rv, x) => {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      };
      if (this.selectGrafikSarana == "Sarana kefarmasian dan alkes") {
        var groubedByTeam = groupBy(dataAlkes, "KabKota");
      } else {
        var groubedByTeam = groupBy(dataAlkes, "Kab_Kota_Gudang");
      }
      var groubedByTeamObject = Object.keys(groubedByTeam);

      let dataGroupCabang = [];
      groubedByTeamObject.map((item, index) => {
        dataGroupCabang.push({
          namaKabkot: item,
          jml: groubedByTeam[item].length,
        });
      });

      let results = dataGroupCabang;
      let dataSet = [];
      let label = [];
      let dataSeries = [];
      console.log("selectedChart", this.selectedChart);
      results.map((item, index) => {
        label.push(item.namaKabkot);
        dataSet.push(item.jml);
        dataSeries.push({
          text: item.namaKabkot,
          values: [item.jml],
          backgroundColor: this.getRandomColor(),
        });
      });
      if (this.namaKabkot != "") {
        dataSeries = this.filterByKabkot(this.namaKabkot, dataSeries);
        label = [];
        dataSet = [];
        dataSeries.map((item, index) => {
          label.push(item.text);
          dataSet.push(item.values[0]);
        });
        console.log("filterKabkot", dataSet);
      }
      // if (this.selectedChart == "pie") {
      await this.renderChartPie(label, dataSeries);
      // }
      // if (this.selectedChart == "bar" || this.selectedChart == "area") {
      //   await this.renderChartBar(label, dataSet);
      // }
      this.showDeskripsiPersentase = true;
      let jmlDataAll = dataSet.reduce((total, num) => total + num);
      this.jmlKabkotChart = label.length;
      this.deskripsiPersentase = `Menampilkan data dari Kabupaten Kota yang berjumlah ${label.length} dengan jumlah keseluruhan adalah ${jmlDataAll} sarana`;
      this.loadingChart = false;
      this.showChart = true;
    },
    hitungGrafikDua: async function (tipe) {
      tipe = "monev_inspeksi_pak_pkrt";
      let dataAlkes = await fetch(
        this.$apiUrl + "/sarkes/read-all-temuan?t_name=" + tipe
      );
      dataAlkes = await dataAlkes.json();
      dataAlkes = dataAlkes.data;

      if (dataAlkes.length == 0) {
        this.loadingChart = false;
        this.deskripsiPersentase = "";
        alert("Data tidak ditemukan");
        this.showChart = false;
        return;
      }

      var groupBy = (xs, key) => {
        return xs.reduce((rv, x) => {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      };
      var groubedByTeam = groupBy(dataAlkes, "Kab_Kota_Gudang");
      var groubedByTeamObject = Object.keys(groubedByTeam);

      let dataGroupCabang = [];
      groubedByTeamObject.map((item, index) => {
        dataGroupCabang.push({
          namaKabkot: item,
          jml: groubedByTeam[item].length,
        });
      });

      let results = dataGroupCabang;
      const dataSet = [];
      const label = [];
      let dataSeries = [];
      results.map((item, index) => {
        label.push(item.namaKabkot);
        dataSet.push(item.jml);
        dataSeries.push({
          text: item.namaKabkot,
          values: [item.jml],
          backgroundColor: this.getRandomColor(),
        });
      });
      if (this.namaKabkot != "") {
        dataSeries = this.filterByKabkot(this.namaKabkot, dataSeries);
      }
      await this.renderChartPie(label, dataSeries);
      console.log(label);
      this.showDeskripsiPersentase = true;
      let jmlDataAll = dataSet.reduce((total, num) => total + num);
      this.deskripsiPersentase = `Menampilkan data dari Kabupaten Kota yang berjumlah ${label.length} dengan jumlah keseluruhan adalah ${jmlDataAll} sarana`;
      this.loadingChart = false;
      this.showChart = true;
    },
    hitungGrafikTiga: async function (tipe) {
      let dataAlkes = await fetch(
        this.$apiUrl + "/sarkes/read-all-capa?t_name=" + tipe
      );
      dataAlkes = await dataAlkes.json();
      dataAlkes = dataAlkes.data;

      if (dataAlkes.length == 0) {
        this.loadingChart = false;
        this.deskripsiPersentase = "";
        alert("Data tidak ditemukan");
        this.showChart = false;
        return;
      }

      var groupBy = (xs, key) => {
        return xs.reduce((rv, x) => {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      };
      var groubedByTeam = groupBy(dataAlkes, "Kab_Kota_Gudang");
      var groubedByTeamObject = Object.keys(groubedByTeam);

      let dataGroupCabang = [];
      groubedByTeamObject.map((item, index) => {
        dataGroupCabang.push({
          namaKabkot: item,
          jml: groubedByTeam[item].length,
        });
      });

      let results = dataGroupCabang;
      const dataSet = [];
      const label = [];
      let dataSeries = [];
      results.map((item, index) => {
        label.push(item.namaKabkot);
        dataSet.push(item.jml);
        dataSeries.push({
          text: item.namaKabkot,
          values: [item.jml],
          backgroundColor: this.getRandomColor(),
        });
      });
      if (this.namaKabkot != "") {
        dataSeries = this.filterByKabkot(this.namaKabkot, dataSeries);
      }
      await this.renderChartPie(label, dataSeries);
      console.log(label);
      this.showDeskripsiPersentase = true;
      let jmlDataAll = dataSet.reduce((total, num) => total + num);
      this.deskripsiPersentase = `Menampilkan data dari Kabupaten Kota yang berjumlah ${label.length} dengan jumlah keseluruhan adalah ${jmlDataAll} sarana`;
      this.loadingChart = false;
      this.showChart = true;
    },
    hitungGrafikEmpat: async function (tipe) {
      let dataAlkes = await fetch(
        this.$apiUrl + "/sarkes/get-sarana-farmasi-alkes?t_name=" + tipe
      );
      dataAlkes = await dataAlkes.json();
      dataAlkes = dataAlkes.data;

      if (dataAlkes.length == 0) {
        this.loadingChart = false;
        this.deskripsiPersentase = "";
        alert("Data tidak ditemukan");
        this.showChart = false;
        return;
      }

      var groupBy = (xs, key) => {
        return xs.reduce((rv, x) => {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      };
      var groubedByTeam = groupBy(dataAlkes, "Kab_Kota_Gudang");
      var groubedByTeamObject = Object.keys(groubedByTeam);

      let dataGroupCabang = [];
      groubedByTeamObject.map((item, index) => {
        dataGroupCabang.push({
          namaKabkot: item,
          jml: groubedByTeam[item].length,
        });
      });

      let results = dataGroupCabang;
      const dataSet = [];
      const label = [];
      let dataSeries = [];
      results.map((item, index) => {
        label.push(item.namaKabkot);
        dataSet.push(item.jml);
        dataSeries.push({
          text: item.namaKabkot,
          values: [item.jml],
          backgroundColor: this.getRandomColor(),
        });
      });
      if (this.namaKabkot != "") {
        dataSeries = this.filterByKabkot(this.namaKabkot, dataSeries);
      }
      await this.renderChartPie(label, dataSeries);
      this.showJenisData = true;
      this.showChart = true;
      this.loadingChart = false;
    },
    hitungGrafikLima: async function (tipe) {
      let dataAlkes = await fetch(
        this.$apiUrl + "/sarkes/read-tutup-sarana?t_name=" + tipe
      );
      dataAlkes = await dataAlkes.json();
      dataAlkes = dataAlkes.data;

      if (dataAlkes.length == 0) {
        this.loadingChart = false;
        this.deskripsiPersentase = "";
        alert("Data tidak ditemukan");
        this.showChart = false;
        return;
      }

      var groupBy = (xs, key) => {
        return xs.reduce((rv, x) => {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      };
      var groubedByTeam = groupBy(dataAlkes, "Kab_Kota_Gudang");
      var groubedByTeamObject = Object.keys(groubedByTeam);

      let dataGroupCabang = [];
      groubedByTeamObject.map((item, index) => {
        dataGroupCabang.push({
          namaKabkot: item,
          jml: groubedByTeam[item].length,
        });
      });

      let results = dataGroupCabang;
      const dataSet = [];
      const label = [];
      let dataSeries = [];
      results.map((item, index) => {
        label.push(item.namaKabkot);
        dataSet.push(item.jml);
        dataSeries.push({
          text: item.namaKabkot,
          values: [item.jml],
          backgroundColor: this.getRandomColor(),
        });
      });
      if (this.namaKabkot != "") {
        dataSeries = this.filterByKabkot(this.namaKabkot, dataSeries);
      }
      await this.renderChartPie(label, dataSeries);
      this.showJenisData = true;
      this.showChart = true;
      this.loadingChart = false;
    },
    renderChartBar: function (label, dataSet) {
      console.log("label", label);
      console.log("dataSet", dataSet);
      this.dataChart = {
        type: this.selectedChart,
        // preview: { live: true },
        // legend: { draggable: true },
        backgroundColor: "#292F3D",
        plotarea: {
          margin: "100px",
        },
        plot: {
          //global changes to all series
          alpha: 0.7,
          "border-width": 2,
          "border-color": "black",
          "border-radius-top-left": 5,
          "border-radius-top-right": 5,
          hoverState: {
            backgroundColor: "#909090",
          },
          "bar-max-width": 50,
          "line-width": 1,
          "bar-width": 30,
          stacked: true,
          "stack-type": "normal" /* Optional specification */,
          animation: {
            effect: "ANIMATION_SLIDE_BOTTOM",
            speed: "2000",
          },
          text: "%vt ",
        },
        scaleX: {
          autoFit: true,
          itemsOverlap: true,
          labels: label,
          zooming: true,
          item: {
            "font-size": 12,
            "font-family": "Tahoma",
            "font-color": "black",
            "border-width": 1,
            "background-color": "#ffffff",
            padding: "5%",
            angle: -10,
            "wrap-text": true,
          },
        },
        series: [
          {
            values: dataSet,
          },
        ],
      };
    },
    renderChartPie: function (label, dataSet) {
      console.log("dataSet2", dataSet);
      this.dataChart = {
        type: this.selectedChart,
        height: "100%",
        width: "100%",
        title: {
          text: this.selectGrafikSarana,
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
        // height: "292px",
        // stacked: true,
        series: dataSet,
      };
    },
    getRandomColor: function () {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
  },
  watch: {
    property: {
      immediate: true,
      handler: function () {
        this.fetchMap();
      },
    },
  },
  created() {
    // this.generateChart();
    // this.fetchMap();
    console.log(this.listKabkot);
  },
};
</script>