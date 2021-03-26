<template>
  <div>
    <v-content class="pl-0">
      <v-container>
        <v-row dense>
          <v-col>
            <p
              style="font-weight: bold; font-size: 1.3em"
              class="mt-n12 mx-auto"
            >
              Jumlah Tenaga Apoteker
            </p>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
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
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
        <v-select
          filled
          dense
          style="margin-top: 1em;"
          :items="items"
          v-model="selectedJenisTenaga"
          @change="changeJenisTenaga"
          label="Pilih Jenis Tenaga"
        ></v-select>            
          </v-col>
        </v-row>
        <v-card v-if="tampilanTableCabang">
          <v-card-title>
            Tampilan Tabel
            <v-spacer></v-spacer>
            <v-btn
              @click="search = ''"
              color="default"
              small
              style="margin-right: 20px"
            >
              Clear
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
import SubMenu from "./SubMenu";
import TemplateTenaga from "./template_tenaga";

export default {
  name: "RekapTenagaApoteker",
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
      selectedJenisTenaga: "",
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
      items: ['Tenaga Apoteker', 'Tenaga Teknis Kefarmasian'],
      tblName: "tenaga_teknis"
    };
  },
  computed: {},
  components: {
    SubMenu,
  },
  watch: {
    property: {
      immediate: true,
      handler: function() {
        this.checkDatabase()
      }
    }
  },   
  methods: {
    changeJenisTenaga: function() {
      console.log('selectedJenisTenaga', this.selectedJenisTenaga)
      if(this.selectedJenisTenaga == 'Tenaga Teknis Kefarmasian') {
        this.tblName = "tenaga_teknis"
      } else {
        this.tblName = "tenaga_apoteker"
      }
      this.checkDatabase()
    },
    checkDatabase: function () {
      this.dialogLoading = true
      this.$http
        .get(this.$apiUrl + "/read-tenaga?sub_menu=" + this.tblName)
        .then((response) => {
          if (response.data.status == true) {
            this.itemCabang = response.data.data;
          } else {
            this.itemCabang = [];
          }
        });
      this.dialogLoading = false
    },
  },
  created() {
    this.idDaerah = this.$store.getters.userData.KODE_DAERAH;
  },
};
</script>
