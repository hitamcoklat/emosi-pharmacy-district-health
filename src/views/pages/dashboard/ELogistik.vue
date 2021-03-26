<template>
  <v-row>
    <v-col sm="6" md="6" cols="6">
      <v-row no-gutters>
        <v-btn elevation="0" outlined>VII. E Logistik</v-btn>
        <v-btn
          @click="
            showIndikatorKadaluarsa = !showIndikatorKadaluarsa;
            scrollToEnd();
          "
          class="ml-5"
          color="pink"
          style="color: white"
          elevation="0"
          >Lihat Indikator Kadaluarsa</v-btn
        >
      </v-row>
      <v-row class="mt-2" no-gutters>
        <v-col class="pr-2" sm="6" md="6" lg="6" cols="6">
          <v-alert
            icon="mdi-download"
            dark
            style="
              text-align: left;
              background-color: #00b200;
              color: white;
              font-weight: bold;
            "
            >Rp {{ totalPenerimaanThn }}<br />Total Penerimaan Tahun
            {{ new Date().getFullYear() }}</v-alert
          >
        </v-col>
        <v-col sm="6" md="6" lg="6" cols="6">
          <v-alert
            icon="mdi-upload"
            dark
            style="
              text-align: left;
              background-color: #fe686a;
              color: white;
              font-weight: bold;
            "
            >Rp {{ totalDistribusiThn }}<br />Total Distribusi Tahun
            {{ new Date().getFullYear() }}</v-alert
          >
        </v-col>
      </v-row>
      <v-row style="padding: 1em; border: 1px solid #ccc" no-gutters>
        <v-simple-table style="width: 100%">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">No</th>
                <th class="text-left">Kode</th>
                <th class="text-left">Nama Barang</th>
                <th class="text-left">Jumlah</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in dataDistribusiBarang"
                :key="item.name"
              >
                <td style="width: 3%" class="text-center">{{ index + 1 }}</td>
                <td style="width: 12%" class="text-center">
                  {{ item.kodeObatRes }}
                </td>
                <td style="width: 55%" class="text-left">
                  {{ item.objectName }}
                </td>
                <td style="width: 15%" class="text-center">
                  {{ Intl.NumberFormat("de-DE").format(item.jumlah) }}
                </td>
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
      <v-row style="padding-top: 0.5em" no-gutters>
        <zingchart type="bar" :data="chartDataLogistik"></zingchart>
      </v-row>
    </v-col>
    <v-row v-if="showIndikatorKadaluarsa" no-gutters>
      <v-col sm="12" md="12">
        <h2 class="pl-5">Indikator Kadaluarsa</h2>
        <v-simple-table style="border: 1px solid #ccc" class="pa-5 ma-5">
          <template v-slot:default>
            <thead>
              <tr>
                <!-- <th class="text-center">No.</th> -->
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
              <tr
                v-for="(item, index) in dataIndikatorKadaluarsa"
                :key="`indik-${index}`"
              >
                <!-- <td :style="{ backgroundColor: item.warna_bg, width: '3%' }" class="text-center">{{ index + 1 }}</td> -->
                <td
                  :style="{ backgroundColor: item.warna_bg, width: '12%' }"
                  class="text-center"
                >
                  {{ item.kode_obat }}
                </td>
                <td
                  :style="{ backgroundColor: item.warna_bg, width: '55%' }"
                  class="text-center"
                >
                  {{ item.no_batch }}
                </td>
                <td
                  :style="{ backgroundColor: item.warna_bg, width: '15%' }"
                  class="text-center"
                >
                  {{ item.nama_obj }}
                </td>
                <td
                  :style="{ backgroundColor: item.warna_bg, width: '15%' }"
                  class="text-center"
                >
                  {{ item.deskripsi }}
                </td>
                <td
                  :style="{ backgroundColor: item.warna_bg, width: '15%' }"
                  class="text-center"
                >
                  {{ item.stok }}
                </td>
                <td
                  :style="{ backgroundColor: item.warna_bg, width: '15%' }"
                  class="text-center"
                >
                  {{ item.expired }}
                </td>
                <td
                  :style="{ backgroundColor: item.warna_bg, width: '15%' }"
                  class="text-center"
                >
                  {{ item.berlaku }}
                </td>
                <td
                  :style="{ backgroundColor: item.warna_bg, width: '15%' }"
                  class="text-center"
                >
                  {{ item.sumber_dana }}
                </td>
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
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      typeChart: ["bar", "area", "pie", "scatter"],
      selectedChart: "bar",
      dataDistribusiBarang: [],
      showIndikatorKadaluarsa: false,
      chartDataLogistik: null,
      url: "http://elogisticsdinkesjabar.com/api-dashboard.php",
      dataIndikatorKadaluarsa: [],
      page: 1,
      elogistikTableData: [],
      lengthPage: 1,
      totalPenerimaanThn: 0,
      totalDistribusiThn: 0,
      bulanSekarang: new Date(),
      monthNames: [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ],
    };
  },
  methods: {
    changeJenisChart: function () {
      this.fetchDataLogistik();
    },
    getRandomColor: function () {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    changePage: function () {
      this.url =
        "http://elogisticsdinkesjabar.com/api-dashboard.php?page=dashboard&tahunkdl=2021&bulankdl=11&h=" +
        this.page;
      this.fetchDataLogistik();
    },
    scrollToEnd: function () {
      this.$emit("scrollToBottom", true);
    },
    renderChartBar: function (label, dataSet, colorPlot) {
      this.chartDataLogistik = {
        title: {
          text: `Distribusi Obat Terbanyak Bulan ${
            this.monthNames[new Date().getMonth()]
          }`,
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
          label: {
            text: `Distribusi Obat Terbanyak Bulan ${
              this.monthNames[new Date().getMonth()]
            }`,
          },
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
      this.chartDataLogistik = {
        type: this.selectedChart,
        height: "100%",
        width: "100%",
        title: {
          text: `Distribusi Obat Terbanyak Bulan ${
            this.monthNames[new Date().getMonth()]
          }`,
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
    fetchDataLogistik: async function () {
      const response = await fetch(this.url);
      let dataLogistik = await response.json();
      let dataSet = [];
      let label = [];
      let colorPlot = [];
      let dataSeries = [];
      this.dataDistribusiBarang = dataLogistik.data.distribusiObat;
      this.dataIndikatorKadaluarsa = dataLogistik.data.indikatorKadaluarsa;
      this.lengthPage = dataLogistik.data.jmlIndikatorKadaluarsaPerPage;
      this.totalPenerimaanThn = dataLogistik.data.totalPenerimaanThn;
      this.totalDistribusiThn = dataLogistik.data.totalDistribusiThn;
      dataLogistik.data.distribusiObat.map((item, index) => {
        console.log(item);
        label.push(item.kodeObatRes);
        dataSet.push(parseInt(item.jumlah));
        colorPlot.push(this.getRandomColor());
        dataSeries.push({
          text: item.kodeObatRes,
          values: [item.jumlah],
          backgroundColor: this.getRandomColor(),
        });
      });
      if (this.selectedChart == "pie") {
        this.renderChartPie(dataSeries);
      } else {
        this.renderChartBar(label, dataSet, colorPlot);
      }
    },
  },
  created() {
    this.fetchDataLogistik();
  },
};
</script>