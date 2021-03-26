<template>
  <v-row>
    <v-col sm="6" md="6" cols="6">
      <v-row no-gutters>
        <v-col lg="6" md="12" sm="12">
          <v-btn elevation="0" outlined
            >IV. Statistik Perizinan yang masuk dari PTSP</v-btn
          >
        </v-col>
        <v-col lg="5" md="12" sm="12">
          <v-select
            style="margin-left: 2em; margin-right: 1em"
            dense
            :items="itemThn"
            v-model="selectedThn"
            label="Pilih Tahun"
            @change="changeTahun"
          ></v-select>
        </v-col>
        <v-col lg="1" md="12" sm="12">
          <v-btn @click="refreshMap" color="primary" dark
            ><v-icon>mdi-refresh</v-icon></v-btn
          >
        </v-col>
      </v-row>
      <v-row style="margin-top: 1em" no-gutters>
        <v-progress-linear
          v-show="loadingChart"
          indeterminate
          color="teal"
        ></v-progress-linear>
        <v-text-field
          v-if="!statusFetch"
          style="padding-left: 1em; padding-right: 1em"
          v-model="searchDataCabang"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-data-table
          v-if="statusFetch"
          style="height: 400px; width: 100%; overflow: auto"
          :headers="headersCabang"
          :items="itemCabang"
          :search="searchDataCabang"
        ></v-data-table>
        <v-alert v-if="!statusFetch" style="width: 100%;" type="warning">Server Error! Gagal mendapatkan data dari PTSP &#128542;</v-alert>
      </v-row>
    </v-col>
    <v-col sm="6" md="6" cols="6">
      <v-row no-gutters>
        <v-btn elevation="0">Chart</v-btn>
      </v-row>
      <v-row style="margin-top: 1em" no-gutters>
        <v-progress-linear
          v-show="loadingChart"
          indeterminate
          color="teal"
        ></v-progress-linear>
        <v-card
          v-if="loadingChart == false"
          style="width: 100%"
          color="#84C4F4"
          elevation="0"
          outlined
        >
          <v-list-item-title
            style="
              text-align: center;
              color: white;
              padding-bottom: 0.5em;
              padding-top: 0.5em;
              background-color: #78b8e7;
            "
            class="headline mb-1"
          >
            PBF
          </v-list-item-title>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-content>
                <font
                  style="font-size: 1.7em; color: white; text-align: center"
                >
                  <animated-number :value="dataPbf" :duration="800" />
                </font>
              </v-list-item-content>
            </v-list-item-content>
          </v-list-item>
        </v-card>
        <v-card
          style="width: 100%; margin-top: 1em"
          color="#0D7D8B"
          elevation="0"
          outlined
          v-if="loadingChart == false"
        >
          <v-list-item-title
            style="
              text-align: center;
              color: white;
              padding-bottom: 0.5em;
              padding-top: 0.5em;
              background-color: #1c707f;
            "
            class="headline mb-1"
          >
            P A K
          </v-list-item-title>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-content>
                <font
                  style="font-size: 1.7em; color: white; text-align: center"
                >
                  <animated-number :value="dataPak" :duration="800" />
                </font>
              </v-list-item-content>
            </v-list-item-content>
          </v-list-item>
        </v-card>
        <v-card
          style="width: 100%; margin-top: 1em"
          color="#75B1B9"
          elevation="0"
          outlined
          v-if="loadingChart == false"
        >
          <v-list-item-title
            style="
              text-align: center;
              color: white;
              padding-bottom: 0.5em;
              padding-top: 0.5em;
              background-color: #6ba1ad;
            "
            class="headline mb-1"
          >
            U K O T
          </v-list-item-title>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-content>
                <font
                  style="font-size: 1.7em; color: white; text-align: center"
                >
                  <animated-number :value="dataUkot" :duration="800" />
                </font>
              </v-list-item-content>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import AnimatedNumber from "animated-number-vue";
import ListTahun from "@/config/listTahun";
export default {
  data() {
    return {
      searchDataCabang: "",
      itemThn: ListTahun,
      selectedThn: "",
      loadingChart: true,
      headersCabang: [
        {
          text: "Nama Perusahaan",
          align: "start",
          sortable: false,
          value: "n_perusahaan",
        },
        { text: "Kab/Kota Gudang", value: "Kab_Kota_Gudang" },
      ],
      itemCabang: [],
      chartCabangPtsp: null,
      dataPbf: 0,
      dataPak: 0,
      dataUkot: 0,
      statusFetch: true,
    };
  },
  components: {
    AnimatedNumber,
  },
  watch: {
    property: {
      immediate: true,
      handler: function () {
        this.generateChart();
      },
    },
  },
  methods: {
    getRandomColor: function () {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    refreshMap: function () {
      this.selectedThn = "";
      this.generateChart();
    },
    changeTahun: function () {
      this.generateChart();
      console.log("thn dipilih", this.selectedThn);
    },
    generateChart: async function () {
      this.loadingChart = true;
      let dataAlkes = await fetch(
        this.$apiUrl +
          "/sarkes/getCurl?url=https://dpmptsp.jabarprov.go.id/api_perizinan/api/perizinan-kesehatan-sertifikat-cabang-distribusi-alkes?token=FgBcoIszpj"
      );
      dataAlkes = await dataAlkes.json();
      if(dataAlkes.data.status == false) {
        this.statusFetch = false
        return
      }
      let dataPBF = await fetch(
        this.$apiUrl +
          "/sarkes/getCurl?url=https://dpmptsp.jabarprov.go.id/api_perizinan/api/perizinan-kesehatan-farmasi?token=FgBcoIszpj"
      );
      dataPBF = await dataPBF.json();
      let dataUKOT = await fetch(
        this.$apiUrl +
          "/sarkes/getCurl?url=https://dpmptsp.jabarprov.go.id/api_perizinan/api/perizinan-kesehatan-cabang-penyalur-alkes?token=FgBcoIszpj"
      );
      dataUKOT = await dataUKOT.json();

      if (this.selectedThn !== "") {
        dataAlkes.data = dataAlkes.data.filter((item) => {
          return item.TAHUN === this.selectedThn ? item : "";
        });
        dataPBF.data = dataPBF.data.filter((item) => {
          return item.TAHUN === this.selectedThn ? item : "";
        });
        dataUKOT.data = dataUKOT.data.filter((item) => {
          return item.TAHUN === this.selectedThn ? item : "";
        });
      }

      this.dataPbf = dataPBF.data.length;
      this.dataPak = dataAlkes.data.length;
      this.dataUkot = dataUKOT.data.length;
      let allResult = [...dataAlkes.data, ...dataPBF.data, ...dataUKOT.data];

      console.log("selectedThn", this.selectedThn);
      console.log(allResult);
      this.itemCabang = allResult;
      var groupBy = (xs, key) => {
        return xs.reduce((rv, x) => {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      };
      var groubedByTeam = groupBy(allResult, "Kab_Kota_Gudang");
      let dataGroupCabang = [];
      Object.keys(groubedByTeam).forEach((category, index) => {
        dataGroupCabang.push({
          namaKabkot: category,
          jml: groubedByTeam[category].length,
        });
      });
      let results = JSON.parse(JSON.stringify(dataGroupCabang));
      const dataSet = [];
      const label = [];
      const dataSeries = [];
      results.map((item, index) => {
        label.push(item.namaKabkot);
        dataSet.push(item.jml);
        dataSeries.push({
          text: item.namaKabkot,
          values: [item.jml],
          backgroundColor: this.getRandomColor(),
        });
      });
      console.log("dataSeriesYangBaru", dataSeries);
      this.chartCabangPtsp = {
        type: "line",
        crosshairX: {},
        plot: {
          aspect: "spline",
        },
        preview: { live: true },
        legend: { draggable: true },
        backgroundColor: "#292F3D",
        height: "272px",
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
        series: dataSeries,
      };
      this.loadingChart = false;
    },
    dataCabangPtsp: function () {
      this.$http
        .get(
          this.$apiUrl +
            "/sarkes/getCurl?url=https://dpmptsp.jabarprov.go.id/api_perizinan/api/perizinan-kesehatan-sertifikat-cabang-distribusi-alkes?token=FgBcoIszpj"
        )
        // this.$http.get(this.$apiUrl + '/sarkes/getCurl?url=http://103.147.222.234/e-mosi/data-json/pak.json')
        .then((response) => {
          this.itemCabang = response.data.data;
          var groupBy = (xs, key) => {
            return xs.reduce((rv, x) => {
              (rv[x[key]] = rv[x[key]] || []).push(x);
              return rv;
            }, {});
          };
          var groubedByTeam = groupBy(response.data.data, "Kab_Kota_Gudang");
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
          results.map((item, index) => {
            label.push(item.namaKabkot);
            dataSet.push(item.jml);
          });
          this.chartCabangPtsp = {
            type: "line",
            crosshairX: {},
            plot: {
              aspect: "spline",
            },
            preview: { live: true },
            legend: { draggable: true },
            backgroundColor: "#292F3D",
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
                text: "Jml Statistik Yang Masuk",
                values: dataSet,
              },
            ],
          };
        });
    },
  },
  created() {},
};
</script>