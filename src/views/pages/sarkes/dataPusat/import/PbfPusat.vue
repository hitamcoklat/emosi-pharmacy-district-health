<template>
  <div>
    <SubMenu />
    <v-content class="pl-0">
      <v-container>
        <v-row no-gutters>
          <v-col sm="6" lg="6">
            <v-row no-gutters>
              <v-col sm="2" md="2" lg="2"
                ><v-btn @click="$router.go(-1)" color="default" elevation="0"
                  ><v-icon size="18">mdi-arrow-left-bold-circle</v-icon></v-btn
                ></v-col
              >
              <v-col sm="10" md="10" lg="10">
                <p style="font-weight: bold; font-size: 1.3em">
                  {{ title }}
                </p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <div class="my-2">
          <v-row v-if="!saveBtn" no-gutters>
            <v-alert border="left" colored-border type="info" elevation="1">
              Silahkan download terlebih dahulu template lalu sesuaikan data
              dengan template yang ada.
            </v-alert>
          </v-row>
          <v-row no-gutters>
            <v-col sm="3" md="3">
              <v-btn
                @click="downloadTemplate"
                style="margin-right: 1em"
                color="success"
                >Download Template</v-btn
              >
            </v-col>
            <v-col style="margin-left: 1em" sm="3" md="3">
              <v-file-input
                dense
                id="templateExcell"
                @change="uploadTemplate()"
                outlined=""
                label="Upload Template"
              ></v-file-input>
            </v-col>
            <v-col v-if="saveBtn" sm="1" md="1" lg="1">
              <v-btn @click="btnSubmit" style="margin-left: 1em" color="primary"
                >Simpan</v-btn
              >
            </v-col>
          </v-row>
          <v-row v-if="saveBtn" no-gutters>
            <v-btn
              @click="
                itemData = [];
                saveBtn = false;
              "
              class="pb-7 pt-7 mr-2"
              color="primary"
              >Reset</v-btn
            >
            <v-alert border="left" colored-border type="warning" elevation="1">
              Mohon di cek kembali data yang akan di import. Jika sudah benar,
              silahkan klik tombol "SIMPAN"
            </v-alert>
          </v-row>
        </div>
        <div v-if="saveBtn">
            <ViewExcell :itemData="itemData" :showButtonExport="false" />
        </div>
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
import routeList from "@/views/pages/sarkes/routeList";
import ViewExcell from "@/components/excell/PbfPusat"
import readXlsxFile from "read-excel-file";
import SubMenu from "../../SubMenu";

export default {
  name: "Oblik",
  data() {
    return {
      items: routeList,
      itemData: [],
      right: null,
      dialogLoading: false,
      idDaerah: "",
      id: "",
      saveBtn: false,
      tableName: "",
      title: "",
    };
  },
  components: {
    SubMenu,
    ViewExcell
  },
  computed: {},
  methods: {
    downloadTemplate: function () {
      window.open(
        `${this.$downloadTemplate}/template-pbf-pusat.xlsx`,
        "_blank"
      );
    },

    btnSubmit: function () {
      let data = {
        content: this.itemData,
      };

      let url =
        this.$apiUrl + "/sarkes/insert-template-pusat?tbl=" + this.tableName;

      this.dialogLoading = true;
      this.$http.post(url, data).then((response) => {
        this.dialogLoading = false;
        if (response.data.status == true) {
          this.$swal("Success!", "Data Berhasil di Input!", "success");
          this.isUpdate = true;
        } else {
        }
      });
    },

    uploadTemplate: function () {
      this.dialogLoading = true;
      this.itemData = [];
      const input = document.getElementById("templateExcell");

      readXlsxFile(input.files[0]).then((rows) => {
        let dataItem = [];
        for (var i = 1; i <= rows.length; i++) {
          try {
            console.log(rows[i]);
            dataItem = {
              namaPerusahaan: rows[i][1],
              nomorSertifikat: rows[i][2],
              tanggalTerbitSertifikat: rows[i][3],
              nomorAdendum: rows[i][4],
              tanggalTerbitAdendum: rows[i][5],
              nib: rows[i][6],
              alamatPerusahaan: rows[i][7],
              kabKota: rows[i][8],
              provinsi: rows[i][9],
              telpPerusahaan: rows[i][10],
              email: rows[i][11],
              statusPemodalan: rows[i][12],
              nomorNpwp: rows[i][13],
              namaDirektur: rows[i][14],
              jenisPbf: rows[i][15],
              namaPenanggungJawabKantor: rows[i][16],
              nomorStraKantor: rows[i][17],
              noHpPenanggungJawabKantor: rows[i][18],
              emailPenanggungJawabKantor: rows[i][19],
              alamatKantorPbf: rows[i][20],
              alamatKantorKabkota: rows[i][21],
              alamatKantorProvinsi: rows[i][22],
              namaGudang: rows[i][23],
              nomorStraGudang: rows[i][24],
              alamatGudang: rows[i][25],
              alamatGudangKabkota: rows[i][26],
              alamatGudangKabkotaProvinsi: rows[i][27],
              gudangTambahan1: rows[i][28],
              nomorStraGudangTambahan1: rows[i][29],
              alamatGudangTambahan1: rows[i][30],
              alamatGudangTambahan1Kabkota: rows[i][31],
              alamatGudangTambahan1Provinsi: rows[i][32],
              gudangTambahan2: rows[i][33],
              nomorStraGudangTambahan2: rows[i][34],
              alamatGudangTambahan2: rows[i][35],
              alamatGudangTambahan2Kabkota: rows[i][36],
              alamatGudangTambahan2Provinsi: rows[i][37],
              gudangTambahan3: rows[i][38],
              nomorStraGudangTambahan3: rows[i][39],
              alamatGudangTambahan3: rows[i][40],
              alamatGudangTambahan3Kabkota: rows[i][41],
              alamatGudangTambahan3Provinsi: rows[i][42],
              alamatLab1: rows[i][43],
              alamatLab2: rows[i][44],
              alamatLabGudangTambahan1: rows[i][45],
              alamatLabGudangTambahan2: rows[i][46],
              alamatLabGudangTambahan3: rows[i][47],
              cek: rows[i][48],
            };
            this.itemData.push(dataItem);
          } catch (error) {
            console.log("ada error: " + error);
          }
        }
        this.dialogLoading = false;
        this.saveBtn = true;
      });
    },
  },
  created() {
    if (this.$store.getters.userData.JENIS_LOGIN == "provinsi") {
      this.idDaerah = 32;
    } else {
      this.idDaerah = this.$store.getters.userData.KODE_DAERAH;
    }
    this.tableName = this.$route.params.tableName;
    this.title = this.$route.params.title;
  },
};
</script>
