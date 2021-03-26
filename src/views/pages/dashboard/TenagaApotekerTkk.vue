<template>
  <v-row>
    <v-col sm="6" md="6" cols="6">
      <v-row no-gutters>
        <v-btn elevation="0" outlined
          >VI. Grafik total tenaga Apoteker dan TTK</v-btn
        >
      </v-row>
      <v-row
        style="padding: 1em; border: 1px solid #ccc; margin-top: 1em"
        no-gutters
      >
        <v-simple-table style="width: 100%; max-height: 400px; overflow: auto">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Jenis</th>
                <th class="text-left">Jumlah</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in dataItem" :key="`key-${index}`">
                <td>{{ item.text }}</td>
                <td>{{ item.values[0] }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
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
        <zingchart :data="chartTenagaApotekerTKK"></zingchart>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      dataTenaga: [],
      typeChart: ["bar", "area", "pie", "scatter"],
      selectedChart: "bar",      
      chartTenagaApotekerTKK: [],
      dataItem: [],
      dataSet: [],
    };
  },
  watch: {
    property: {
      immediate: true,
      handler: function () {
        this.generateChartTenagaApotekerTKK();
      },
    },
  },
  methods: {
    changeJenisChart: function () {
      this.generateChartTenagaApotekerTKK();
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
      this.chartTenagaApotekerTKK = {
        title: {
          text: "Grafik Total Tenaga Apoteker dan Tenaga Lainnya",
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
          label: { text: "Berdasarkan Jenis/Kategori" },
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
      this.chartTenagaApotekerTKK = {
        type: this.selectedChart,
        height: "100%",
        width: "100%",
        title: {
          text: "Grafik Total Tenaga Apoteker dan Tenaga Lainnya",
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
    generateChartTenagaApotekerTKK: async function () {
      let res = await fetch(
        this.$apiUrl + "/read-tenaga?sub_menu=tenaga_apoteker"
      );
      res = await res.json();
      res = res.data;

      let res1 = await fetch(
        this.$apiUrl + "/read-tenaga?sub_menu=tenaga_teknis"
      );
      res1 = await res1.json();
      res1 = res1.data;

      let combineRes = [...res, ...res1]
      this.dataItem = combineRes

      var groupBy = (xs, key) => {
        return xs.reduce((rv, x) => {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      };

      var groubedByTeam = groupBy(combineRes, "TEMPAT_KERJA");
      let dataGroup = [];
      Object.keys(groubedByTeam).forEach((category, index) => {
        if (category == "-") return;
        dataGroup.push({
          namaKabkot: category,
          jml: groubedByTeam[category].length,
        });
      });
      let results = JSON.parse(JSON.stringify(dataGroup));
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
      this.dataSet = dataSet;
      this.dataItem = JSON.parse(JSON.stringify(dataSeries));
      if(this.selectedChart == 'pie') {
          this.renderChartPie(dataSeries);
      } else {
          this.renderChartBar(label, dataSet, colorPlot)
      }

    },
  },
  created() {},
};
</script>