<template>
  <div>
    <v-content class="pl-0">
      <v-container>
        <p style="font-weight: bold; font-size: 1.3em" class="mt-n12 mx-auto">
          Jumlah Tenaga TKK
        </p>
        <v-btn
          :style="[
            btnPuskesmas == true
              ? { 'background-color': '#E1ECF4' }
              : { 'background-color': 'white' },
          ]"
          @click="
            btnPuskesmas = true;
            btnRsud = false;
            btnDinkes = false;
            search = 'puskesmas';
          "
          depressed
        >
          <v-icon style="margin-right: 10px" size="16"
            >mdi-file-table-box-multiple-outline</v-icon
          >
          A. PUSKESMAS (ASN & NON ASN)
        </v-btn>
        <v-btn
          :style="[
            btnRsud == true
              ? { 'background-color': '#E1ECF4' }
              : { 'background-color': 'white' },
          ]"
          @click="
            btnRsud = true;
            btnPuskesmas = false;
            btnDinkes = false;
            search = 'RSUD';
          "
          depressed
        >
          <v-icon style="margin-right: 10px" size="16"
            >mdi-file-table-box-multiple-outline</v-icon
          >
          B. RSUD (ASN & NON ASN)
        </v-btn>
        <v-btn
          :style="[
            btnDinkes == true
              ? { 'background-color': '#E1ECF4' }
              : { 'background-color': 'white' },
          ]"
          @click="
            btnDinkes = true;
            btnPuskesmas = false;
            btnRsud = false;
            search = 'dinkes';
          "
          depressed
        >
          <v-icon style="margin-right: 10px" size="16"
            >mdi-file-table-box-multiple-outline</v-icon
          >
          C. DINAS KESEHATAN
        </v-btn>

        <v-btn
          v-if="tampilanExcellCabang"
          style="margin-left: 10px"
          depressed
          color="success"
          ><v-icon size="16">mdi-file-check</v-icon>Export Excell</v-btn
        >
        <br />
        <br />
        <v-card v-if="tampilanTableCabang">
          <v-card-title>
            Tampilan Tabel
            <v-spacer></v-spacer>
            <v-btn
              @click="checkDatabase()"
              color="primary"
              style="margin-right: 20px"
            >
              <v-icon style="margin-right: 10px" size="16"
                >mdi-database-refresh</v-icon
              >
              Cek Data Terbaru
            </v-btn>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            dense
            :headers="headersCabang"
            :items="itemCabang"
            :search="search"
          >
            <template v-slot:item.actions="{ item }">
              <span
                style="color: #0e5491; cursor: pointer"
                @click="lihatIzin(item.link_naskahizin)"
              >
                Lihat Izin
              </span>
            </template>
          </v-data-table>
        </v-card>
      </v-container>
    </v-content>
    <!-- Loading Login -->
    <v-dialog v-model="dialogLoading" hide-overlay persistent width="300">
      <v-card color="primary" dark>
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
  </div>
</template>

<script>
import { ListBulan, ListTahun } from "@/config";
import readXlsxFile from "read-excel-file";
import SubMenu from "./SubMenu";
import TemplateTenaga from "./template_tenaga";

export default {
  name: "RekapTenagaTkk",
  data() {
    return {
      btnPuskesmas: false,
      btnRsud: false,
      btnDinkes: false,
      dialogLoading: false,
      id: "",
      search: "",
      tampilanTableCabang: true,
      tampilanExcellCabang: false,
      headersCabang: [
        {
          text: "Nama Kota",
          align: "start",
          sortable: false,
          value: "nama_kota",
        },
        { text: "Nama Lengkap", value: "nama" },
        { text: "No STR", value: "No_STR" },
        { text: "Pendidikan", value: "pendidikan" },
        { text: "Tempat Kerja", value: "tempat_kerja" },
        {
          text:
            "Tempat Bekerja ( Dinas Kesehatan/Puskesmas/RSUD/Instalasi Farmasi Kabkota/Sarana Pelayanan Pemerintah Lainnnya",
          value: "tempat_bekerja",
        },
        { text: "Status Pegawai (ASN/Non ASN)", value: "status_pegawai" },
        { text: "Tahun Verifikasi", value: "tahun_verifikasi" },
      ],
      itemCabang: TemplateTenaga,
    };
  },
  computed: {},
  components: {
    SubMenu,
  },
  methods: {
    checkDatabase: function () {
      console.log("check database");
      this.$http
        .get(this.$apiUrl + "/read-tenaga?sub_menu=tenaga_teknis")
        .then((response) => {
          if (response.data.status == true) {
            this.itemCabang = response.data.data;
          } else {
            this.itemCabang = [];
          }
        });
    },
  },
  created() {
    this.idDaerah = this.$store.getters.userData.KODE_DAERAH;
  },
};
</script>
