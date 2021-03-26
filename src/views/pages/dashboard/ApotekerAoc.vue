<template>
  <v-row>
    <v-col sm="6" md="6" cols="6">
      <v-row no-gutters>
        <v-btn elevation="0" outlined>Laporan Apoteker AOC</v-btn>
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
          <v-btn
            @click="
              showRekap = true;
              kodeKabkot = null;
            "
            dark
            color="teal"
            >Tampilkan Rekap</v-btn
          >
        </v-col>
      </v-row>
      <v-row style="border: 1px solid #ccc" no-gutters>
        <v-simple-table
          v-if="showRekap"
          style="width: 100%; max-height: 400px; overflow: auto"
        >
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">No</th>
                <th class="text-left">Nama Kabupaten/Kota</th>
                <th class="text-left">Jml Apoteker</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in listRekapApoteker" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ item.KABKOTA }}</td>
                <td>{{ item.JUMLAH_APOTEKER_AOC }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-row
          v-if="showRekap == false"
          style="border: 1px solid #ccc"
          no-gutters
        >
          <v-text-field
            style="padding-left: 1em; padding-right: 1em"
            v-model="searchApoteker"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-data-table
            style="height: 400px; width: 100%; overflow: auto"
            :headers="headersApoteker"
            :items="listApoteker"
            :search="searchApoteker"
          ></v-data-table>
        </v-row>
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
      <v-row style="padding-top: 1em" no-gutters>
        <zingchart :data="chartApotekerRekap"></zingchart>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import listKabkot from "../../../config/listKabkot";
export default {
  data() {
    return {
      searchPuskesmas: "",
      listKabkot: listKabkot,
      searchApoteker: "",
      listApoteker: [],
      typeChart: ["bar", "area", "pie", "scatter"],
      selectedChart: "bar",      
      chartKabkotPuskesmas: null,
      headersApoteker: [
        { text: "NAMA LENGKAP", value: "NAMA" },
        { text: "INSTANSI", value: "INSTANSI" },
        { text: "KAB/KOTA", value: "KABKOTA" },
      ],
      listPuskesmas: [],
      listRekapApoteker: [],
      jmlPuskesmas: 0,
      showRekap: true,
      chartApotekerRekap: null,
      kodeKabkot: null,
    };
  },
  methods: {
    changeJenisChart: function () {
      this.fetchDataApoteker();
    },    
    fetchApotekerByKabkot: async function (kodeKabkot) {
      const response = await fetch(
        `${this.$apiUrl}/assets/apoteker-aoc/${kodeKabkot}.json`
      );
      let dataApoteker = await response.json();
      this.listApoteker = dataApoteker;
      console.log(this.listApoteker);
    },
    renderChartBar: function (label, dataSet, colorPlot) {
      this.chartApotekerRekap = {
        title: {
          text: "Jumlah Apoteker AOC di Jawa Barat",
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
          styles: colorPlot
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
      this.chartApotekerRekap = {
        type: this.selectedChart,
        height: "100%",
        width: "100%",
        title: {
          text: "Jumlah Puskesmas di Jawa Barat",
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
    changeKabkot: function () {
      this.fetchApotekerByKabkot(this.kodeKabkot);
      this.showRekap = false;
    },
    getRandomColor: function () {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    fetchDataApoteker: async function () {
      const response = await fetch(
        `${this.$apiUrl}/assets/apoteker-aoc/rekap.json`
      );
      let dataApoteker = await response.json();
      this.listRekapApoteker = dataApoteker;
      let label = [];
      let jml = [];
      let dataSet = [];
      let colorPlot = [];
      let dataSeries = [];      
      dataApoteker.map((item, index) => {
        label.push(item.KABKOTA);
        jml.push(item.JUMLAH_APOTEKER_AOC);
        dataSet.push(item.JUMLAH_APOTEKER_AOC);
        colorPlot.push(this.getRandomColor())
        dataSeries.push({
          text: item.KABKOTA,
          values: [item.JUMLAH_APOTEKER_AOC],
          backgroundColor: this.getRandomColor(),
        });        
      });
      console.log(label);
      console.log(jml);
      if(this.selectedChart == 'pie') {
          this.renderChartPie(dataSeries);
      } else {
          this.renderChartBar(label, dataSet, colorPlot)
      }
    },
  },
  created() {
    this.fetchDataApoteker();
  },
};
</script>