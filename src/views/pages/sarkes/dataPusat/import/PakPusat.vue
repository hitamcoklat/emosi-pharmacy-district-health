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
import ViewExcell from "@/components/excell/PakPusat"
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
        `${this.$downloadTemplate}/template-pak-pusat.xlsx`,
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

      try {
        readXlsxFile(input.files[0]).then((rows) => {
          let dataItem = [];
          for (var i = 1; i <= rows.length; i++) {
            try {
              console.log(rows[i]);
              dataItem = {
                nomorPermohonan: rows[i][1],
                namaPerusahaan: rows[i][2],
                npwp: rows[i][3],
                nib: rows[i][4],
                pusatCabang: rows[i][5],
                alamatPerusahaan: rows[i][6],
                provinsi: rows[i][7],
                kabKota: rows[i][8],
                alamatGudang: rows[i][9],
                provinsiGudang: rows[i][10],
                kabKotaGudang: rows[i][11],
                alamatBengkel: rows[i][12],
                provinsiBengkel: rows[i][13],
                kabKotaBengkel: rows[i][14],
                nomorSertifikat: rows[i][15],
                tanggalTerbit: rows[i][16],
                tanggalExpired: rows[i][17],
                kategoriDisalurkan: rows[i][18],
                jenisProduk: rows[i][19],
                jenisPermohonan: rows[i][20],
                jenisPerubahan: rows[i][21],
                email: rows[i][22],
                telp: rows[i][23],
              };
              this.itemData.push(dataItem);
            } catch (error) {
              console.log("ada error: " + error);
            }
          }
          this.dialogLoading = false;
          this.saveBtn = true;
        });
      } catch (error) {
        alert("Terjadi kesalahan! File tidak sesuai!");
      }
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
