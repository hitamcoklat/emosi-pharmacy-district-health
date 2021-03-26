<template>
  <v-row>
    <v-col sm="6" md="6" cols="6">
      <v-row no-gutters>
        <v-btn
          @click="showData = !showData"
          class="mr-5"
          elevation="0"
          depressed
          dark
          color="teal lighten-1"
          >{{ showData ? "Tutup" : "Buka Data Puskesmas" }}</v-btn
        >
        <v-btn elevation="0" outlined>Daftar Puskesmas</v-btn>
      </v-row>
      <v-row
        v-if="showData"
        style="border: 1px solid #ccc; margin-top: 1em"
        no-gutters
      >
        <v-text-field
          style="padding-left: 1em; padding-right: 1em"
          v-model="searchPuskesmas"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-data-table
          style="height: 400px; width: 100%; overflow: auto"
          :headers="headerPuskesmas"
          :items="listPuskesmas"
          :search="searchPuskesmas"
        ></v-data-table>
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
      <v-row v-if="showData" style="padding-top: 1em" no-gutters>
        <zingchart :data="chartKabkotPuskesmas"></zingchart>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import listKabkot from "../../../config/listKabkot";
import kabkotByKode from "../../../config/kabkotByKode";
export default {
  data() {
    return {
      searchPuskesmas: "",
      typeChart: ["bar", "area", "pie", "scatter"],
      selectedChart: "bar",
      chartKabkotPuskesmas: null,
      headerPuskesmas: [
        { text: "Nama Puskesmas", value: "NAMA_PUSKESMAS" },
        { text: "Alamat Puskesmas", value: "ALAMAT" },
        { text: "Kode Daerah", value: "namaDaerah" },
        { text: "Apoteker", value: "apoteker" },
        { text: "TKK", value: "tkk" },
      ],
      listPuskesmas: [],
      jmlPuskesmas: 0,
      showData: true,
    };
  },
  methods: {
    changeJenisChart: function () {
      this.fetchDataPuskesmas();
    },
    getRandomColor: function () {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    renderChartBar: function (label, dataSet, colorPlot) {
      this.chartKabkotPuskesmas = {
        title: {
          text: "Jumlah Puskesmas di Jawa Barat",
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
            text: "Jml Puskesmas",
            values: dataSet,
          },
        ],
      };
    },
    renderChartPie: function (dataSet) {
      this.chartKabkotPuskesmas = {
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
    fetchDataPuskesmas: async function () {
      const response = await fetch(
        `${this.$apiUrl}/static/list-puskesmas.json`
      );
      let dataPuskesmas = await response.json();
      dataPuskesmas.data.map((item, index) => {
        dataPuskesmas.data[index]["namaDaerah"] =
          kabkotByKode[item.KODE_DAERAH];
      });
      this.jmlPuskesmas = dataPuskesmas.data.length;
      this.listPuskesmas = dataPuskesmas.data;

      var groupBy = (xs, key) => {
        return xs.reduce((rv, x) => {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      };
      var groubedByTeam = groupBy(dataPuskesmas.data, "namaDaerah");
      let dataGroupCabang = [];
      Object.keys(groubedByTeam).forEach((category, index) => {
        // console.log(`${index} = ${category} = ${groubedByTeam[category].length}`)
        dataGroupCabang.push({
          namaKabkot: category,
          jml: groubedByTeam[category].length,
        });
      });
      let results = JSON.parse(JSON.stringify(dataGroupCabang));
      // this.groupCabang = JSON.parse(JSON.stringify(dataGroupCabang))
      const dataSet = [];
      const label = [];
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
      console.log("dataSeriesPuskesmas", dataSeries);
    },
  },
  created() {
    this.fetchDataPuskesmas();
    setTimeout(() => {
      this.$emit("getJmlPuskesmas", this.jmlPuskesmas);
    }, 2000);
  },
};
</script>