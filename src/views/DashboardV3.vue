<template>
  <!-- Container Row -->
  <div style="padding-left: 2em; padding-right: 2em">
    <v-row>
      <!-- box atas kecil kecil -->
      <BoxTop :jmlTenagaTeknis="jmlTenagaTeknis" :jmlApoteker="jmlApoteker" :jmlPuskesmas="jmlPuskesmas" />
    </v-row>
    <DataPuskesmas @getJmlPuskesmas="getJmlPuskesmas" />
    <DataRumahSakit />
    <ApotekerAoc />
    <!-- diagram 1 -->
    <KetersediaanObat />
    <!-- Dashboard 2 -->
    <MappingSarkesAlkes />
    <!-- Dashboard 3 -->
<!--     <v-row>
      <v-col sm="6" md="6" cols="6">
        <v-row no-gutters>
          <v-btn elevation="0" outlined>III. Capaian POR</v-btn>
        </v-row>
        <v-row
          style="padding: 1em; border: 1px solid #ccc; margin-top: 1em"
          no-gutters
        >
          <v-alert style="width: 100%" type="success">Coming soon!</v-alert>
        </v-row>
      </v-col>
      <v-col sm="6" md="6" cols="6">
        <v-row no-gutters>
          <v-btn elevation="0">Chart</v-btn>
        </v-row>
        <v-row style="padding-top: 1em" no-gutters>
          <v-alert style="width: 100%" type="success">Coming soon!</v-alert>
        </v-row>
      </v-col>
    </v-row> -->
    <!-- Dashboard 4 -->
    <CabangPTSP />
    <!-- Dashboard 5 -->
<!--     <v-row>
      <v-col sm="6" md="6" cols="6">
        <v-row no-gutters>
          <v-btn elevation="0" outlined
            >V. Hasil Pembinaan dan Pengawasan Sarana</v-btn
          >
        </v-row>
        <v-row
          style="padding: 1em; border: 1px solid #ccc; margin-top: 1em"
          no-gutters
        >
          <v-alert style="width: 100%" type="success">Coming soon!</v-alert>
        </v-row>
      </v-col>
      <v-col sm="6" md="6" cols="6">
        <v-row no-gutters>
          <v-btn elevation="0">Chart</v-btn>
        </v-row>
        <v-row style="padding-top: 1em" no-gutters>
          <v-alert style="width: 100%" type="success">Coming soon!</v-alert>
        </v-row>
      </v-col>
    </v-row> -->
    <!-- Dashboard 6 -->
    <TenagaApotekerTkk />
    <!-- Dashboard 7 -->
    <ELogistik @scrollToBottom="scrollToBottom" />
  </div>
</template>
<style>
.small {
  width: 600px !important;
}
</style>
<script>
import DateRangePicker from "vue2-daterange-picker";
import "vue2-daterange-picker/dist/vue2-daterange-picker.css";
import LineChart from "./chart/LineChart";
import kabkotByKode from "../config/kabkotByKode";
import TenagaApotekerTkk from "./pages/dashboard/TenagaApotekerTkk";
import ELogistik from "./pages/dashboard/ELogistik";
import CabangPTSP from "./pages/dashboard/CabangPTSP";
import DataPuskesmas from "./pages/dashboard/DataPuskesmas";
import MappingSarkesAlkes from "./pages/dashboard/MappingSarkesAlkes";
import KetersediaanObat from "./pages/dashboard/KetersediaanObat";
import ApotekerAoc from "./pages/dashboard/ApotekerAoc";
import DataRumahSakit from "./pages/dashboard/DataRumahSakit";
import BoxTop from "./pages/dashboard/BoxTop";

export default {
  name: "Dashboard",
  components: {
    DateRangePicker,
    LineChart,
    DataPuskesmas,
    ELogistik,
    CabangPTSP,
    MappingSarkesAlkes,
    TenagaApotekerTkk,
    ApotekerAoc,
    KetersediaanObat,
    DataRumahSakit,
    BoxTop,
  },
  data() {
    return {
      kabkotByKode: kabkotByKode,
      dialogPicker: false,
      openPicker: false,
      dateRange: {
        startDate: "2019-12-26",
        endDate: "2019-12-28",
      },
      chartData: {
        type: "bar",
        preview: { live: true },
        legend: { draggable: true },
        backgroundColor: "#292F3D",
        height: "432px",
        scaleX: {
          label: {
            text: "Days",
          },
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        series: [
          {
            // plot 1 values, linear data
            values: [23, 20, 27, 29, 25, 17, 15],
            text: "Week 1",
            backgroundColor: "#4d80a6",
          },
        ],
      },
      listDashboard: [
        "I. Ketersediaan Obat Provinsi",
        "II. Mapping/Sebaran Sarana Kefarmasian dan Alkes Provinsi",
        "III. Capaian POR",
        "IV. Statistik Perizinan yang masuk dari PTSP",
        "V. Hasil Pembinaan dan Pengawasan Sarana",
        "VI. Grafik total tenaga Apoteker dan TTK",
        "VII. E Logistik",
      ],
      heightChart: 400,
      jmlPuskesmas: 0,
      jmlApoteker: 0,
      dataSetTenaga: 0,
      jmlTenagaTeknis: 0,
      get: 0,
      desserts: [],
      chartCabangPtsp: [],
      itemCabang: [],
      groupCabang: null,
    };
  },
  methods: {
    getJmlPuskesmas(value) {
      console.log(`puskesmas = ${value}`);
      this.jmlPuskesmas = value;
    },
    getJmlApoteker: async function() {
      let res = await fetch(
        this.$apiUrl + "/read-tenaga?sub_menu=tenaga_apoteker"
      );
      res = await res.json();
      res = res.data;
      this.jmlApoteker = res.length
    },
    getJmlTenagaTeknis: async function() {
      let res = await fetch(
        this.$apiUrl + "/read-tenaga?sub_menu=tenaga_teknis"
      );
      res = await res.json();
      res = res.data;
      this.jmlTenagaTeknis = res.length
    },
    scrollToBottom() {
      setTimeout(() => {
        window.scrollTo(
          0,
          document.body.scrollHeight || document.documentElement.scrollHeight
        );
      }, 1000);
    },
  },
  watch: {
    property: {
      immediate: true,
      handler: function() {
        this.getJmlApoteker()
        this.getJmlTenagaTeknis()
      }
    }
  },  
  computed: {
    myStyles() {
      return {
        height: `${this.height}px`,
        position: "relative",
      };
    },
  },
  created() {},
  beforeCreate() {
    if (this.$store.getters.isLogged) {
      this.isLoggedIn = this.$store.getters.isLogged;
      this.$router.push("/dashboard");
    } else {
      this.$router.push("/");
    }
  },
};
</script>