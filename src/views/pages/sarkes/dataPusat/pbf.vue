<template>
  <div>
    <v-card color="basil" flat>
      <v-row>
        <v-col>
          <v-menu transition="scale-transition" bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="ml-3"
                color="default"
                outlined
                v-bind="attrs"
                v-on="on"
              >
                <v-icon size="16">mdi-file-table</v-icon>Sumber Data
              </v-btn>
            </template>

            <v-list>
              <v-list-item>
                <v-list-item-title @click="dataCabang" style="cursor: pointer"
                  >DATA MASTER PUSAT</v-list-item-title
                >
              </v-list-item>
              <v-list-item>
                <v-list-item-title
                  @click="lihatDataVerifikasi"
                  style="cursor: pointer"
                  >TERVERIFIKASI</v-list-item-title
                >
              </v-list-item>
            </v-list>
          </v-menu>
          <v-btn
            style="margin-left: 1em"
            @click="
              tampilanTableCabang = true;
              tampilanExcellCabang = false;
            "
            depressed
            color="primary"
            ><v-icon size="18">mdi-table-large</v-icon></v-btn
          >
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                @click="
                  tampilanExcellCabang = true;
                  tampilanTableCabang = false;
                "
                style="margin-left: 10px"
                depressed
                color="success"
                v-bind="attrs"
                v-on="on"
                ><v-icon size="20">mdi-file-excel-outline</v-icon></v-btn
              >
            </template>
            <span>Tampilan Excel</span>
          </v-tooltip>
          <v-menu>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark v-bind="attrs" v-on="on" class="ml-5">
                <v-icon size="18">mdi-filter-menu-outline</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, index) in itemCapa"
                :key="index"
                style="cursor: pointer"
              >
                <v-list-item-title>{{ item }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-btn
            style="margin-left: 10px"
            @click="inputVerif"
            depressed
            dark
            color="default"
            >Set Verifikasi</v-btn
          >
          <v-btn
            style="margin-left: 10px"
            @click="updateTutup"
            depressed
            dark
            color="warning"
            >Set Tutup</v-btn
          >
          <v-btn
            style="margin-left: 10px"
            @click="
              $router.push({
                name: 'ImportTemplatePbfPusat',
                params: {
                  title: 'Import Data PBF Pusat',
                  tableName: 'master_pbf_pusat',
                },
              })
            "
            depressed
            dark
            color="primary"
            >Import Data</v-btn
          >
          <v-btn
            style="margin-left: 10px"
            depressed
            dark
            color="red"
            @click="removeData"
          >
            <v-icon size="20">mdi-close-box-multiple-outline</v-icon>
          </v-btn>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                @click="checkVerif"
                style="margin-right: 10px; float: right"
                depressed
                color="default"
                v-bind="attrs"
                v-on="on"
                ><v-icon>mdi-checkbox-multiple-marked</v-icon></v-btn
              >
            </template>
            <span>Check/Uncheck Semua</span>
          </v-tooltip>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card v-if="tampilanTableCabang">
            <v-card-title>
              Tampilan Tabel {{ titleTable }}
              <v-spacer></v-spacer>
              <v-btn
                small
                style="margin-top: 1em; margin-right: 1em"
                @click="search = ''"
                >Clear</v-btn
              >
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
              fixed-header
              height="550"
              :calculate-widths="true"
              :headers="headersPusat"
              :items="itemPusat"
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
              <template v-slot:item.actCapa="{ item }">
                {{
                  item.STATUS_CAPA !== "" &&
                  typeof item.STATUS_CAPA !== "undefined"
                    ? "[Sudah di input]"
                    : ""
                }}
                <v-btn rounded small color="primary" @click="changeCapa(item)">
                  <v-icon small> mdi-backburger </v-icon>
                </v-btn>
              </template>
              <template v-slot:item.checkbox="{ item }">
                <v-simple-checkbox
                  :ripple="false"
                  v-model="item.checkbox"
                ></v-simple-checkbox>
              </template>
              <template v-slot:item.actEdit="{ item }">
                <v-btn rounded small color="primary" @click="editItem(item)">
                  <v-icon small> mdi-pencil-circle </v-icon>
                </v-btn>
                <v-btn rounded small color="warning" @click="removeItem(item)">
                  <v-icon small> mdi-close-circle </v-icon>
                </v-btn>
              </template>
              <template v-slot:item.actStandar="{ item }">
                <v-menu>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      rounded
                      small
                      color="primary"
                      dark
                      v-bind="attrs"
                      v-on="on"
                      class="ml-5"
                    >
                      <v-icon>mdi-filter-menu-outline</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      v-for="(i, index) in itemCapa"
                      :key="index"
                      @click="updateStandar(item, i)"
                      style="cursor: pointer"
                    >
                      <v-list-item-title>{{ i }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </template>
              <template v-slot:item.actTutup="{ item }">
                <v-menu>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      rounded
                      small
                      color="primary"
                      dark
                      v-bind="attrs"
                      v-on="on"
                      class="ml-5"
                    >
                      <v-icon>mdi-filter-menu-outline</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      v-for="(i, index) in itemTutup"
                      :key="index"
                      @click="updateTutup(item, i)"
                      style="cursor: pointer"
                    >
                      <v-list-item-title>{{ i }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </template>
            </v-data-table>
          </v-card>
          <v-card v-if="tampilanExcellCabang">
            <ViewExcell :itemData="itemPusat" :showButtonExport="true" />
          </v-card>
        </v-col>
      </v-row>
    </v-card>
    <v-dialog v-model="dialogCapa" persistent max-width="490">
      <v-card style="padding-top: 1em">
        <v-card-text style="padding-top: 1em">
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="pickerDate"
                label="Tanggal Perbaikan"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="pickerDate"
              @input="menu2 = false"
            ></v-date-picker>
          </v-menu>
          <v-text-field
            v-model="insertStatusCapa"
            label="Status CAPA"
            placeholder="Masukan Status CAPA"
            outlined
          ></v-text-field>
          <v-row no-gutters>
            <v-col
              v-if="files.length > 0"
              v-for="(item, index) in files"
              :key="index"
              cols="12"
            >
              <v-card class="mx-auto" outlined style="margin-bottom: 1em">
                <v-list-item three-line>
                  <v-list-item-content>
                    <v-list-item-title class="headline mb-1">
                      {{ namaFiles[index] }} Berhasil di Upload
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-card-actions>
                  <v-btn @click="clickFile()" outlined text> Hapus </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          <file-upload
            ref="upload"
            v-model="files"
            :multiple="true"
            :post-action="`${this.$apiUrl}/upload`"
            @input="onChangeFile"
          >
            <v-btn style="margin-bottom: 1em" color="info" elevation="2"
              >Tambahkan File</v-btn
            >
          </file-upload>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialogCapa = false">
            Tutup
          </v-btn>
          <v-btn dark color="green" @click="submitCapa"> Submit </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <DetailCapa
      v-if="dialogDetailCapa"
      propsDetailCapa="dialogDetailCapa"
      :dataCapa="dataCapa"
      :tableName="tableName"
      @emitTutupDetailCapa="emitTutupDetailCapa"
    />
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
  </div>
</template>
<script>
import { ListBulan, ListTahun } from "@/config";
import routeList from "@/views/pages/sarkes/routeList";
import ViewExcell from "@/components/excell/PbfPusat";
import SubMenu from "../SubMenu";
import DetailCapa from "@/components/DetailCapa";

export default {
  data() {
    return {
      pickerDate: new Date().toISOString().substr(0, 10),
      dialogCapa: false,
      items: routeList,
      itemData: [],
      right: null,
      isUpdate: false,
      dialogLoading: false,
      showWarning: true,
      idDaerah: "",
      id: "",
      search: "",
      files: [],
      tab: null,
      menu2: true,
      tampilanTableCabang: true,
      tampilanExcellCabang: false,
      itemCapa: ["CPOB", "CDOB", "CPOTB", "CPPKRTB", "CPAKB", "CPKB", "CDAKB"],
      item: [],
      selectedCapa: "",
      itemTutup: ["Y", "N"],
      headersPusat: [
        {
          text: "Nama Perusahaan",
          align: "start",
          sortable: false,
          value: "namaPerusahaan",
          width: "200px",
        },
        {
          text: "Alamat Perusahaan",
          value: "alamatPerusahaan",
          width: "200px",
        },
        { text: "Alamat Gudang", value: "alamatGudang", width: "200px" },
        { text: "Kab/Kota Gudang", value: "kabKota", width: "200px" },
        { text: "Telp. Kantor", value: "telpPerusahaan", width: "200px" },
        { text: "No. Sertifikat", value: "nomorSertifikat", width: "200px" },
        { text: "NPWP", value: "nomorNpwp", width: "200px" },
        { text: "Jenis PBF", value: "jenisPbf", width: "80px" },
        { text: "NIB", value: "nib", width: "200px" },
        { text: "CAPA", value: "actCapa" },
        { text: "Standar", value: "STANDAR_STATUS" },
        { text: "Set Standar", value: "actStandar" },
        { text: "Status Tutup", value: "STATUS_TUTUP" },
        { text: "Set Tutup", value: "actTutup" },
        { text: "Edit", value: "actEdit", width: "150px" },
        { text: "Verifikasi", value: "checkbox" },
      ],
      itemPusat: [],
      namaFiles: [],
      titleTable: "",
      statusData: "PTSP",
      insertStatusCapa: "",
      dialogDetailCapa: false,
      dataCapa: [],
      tableName: "",
    };
  },
  components: {
    SubMenu,
    DetailCapa,
    ViewExcell,
  },
  computed: {},
  methods: {
    dataPusat: function () {
      console.log("data pusat");
    },

    changeCapa: function (item) {
      console.log("dataCapa", item);
      this.id = item.ID;
      this.insertStatusCapa = item.STATUS_CAPA;
      if (item.STATUS_CAPA !== "") {
        this.tableName = "verifpbf";
        this.dialogDetailCapa = true;
        this.dataCapa = item;
      } else {
        this.dialogCapa = true;
      }
    },

    emitTutupDetailCapa: function () {
      this.dialogDetailCapa = false;
      this.lihatDataVerifikasi();
    },

    updateTutup: function (item, i) {
      if (item.checkbox == false) {
        return this.$swal({
          icon: "error",
          title: "Oops...",
          text: "Anda harus melakukan verifikasi terlebih dahulu!",
        });
      }
      let dataKirim = {
        statusTutup: i,
        id: item.ID,
      };
      this.$http
        .post(this.$apiUrl + "/sarkes/update-tutup?t_name=verif_pbf_pusat", {
          content: dataKirim,
        })
        .then((response) => {
          if (response.data.status == true) {
            this.$swal("Success!", "Data Berhasil di update!", "success");
          }
          this.dialogLoading = false;
          this.lihatDataVerifikasi();
        });
    },

    checkVerif: function () {
      let itemPusat = this.itemPusat;
      itemPusat.map((item, index) => {
        itemPusat[index].checkbox = !item.checkbox;
      });
      this.itemPusat = itemPusat;
    },

    removeData: function () {
      if (!confirm("Apakah anda yakin ingin menghapus data terpilih?")) {
        return false;
      }
      let data = [];
      let itemPusat = this.itemPusat;
      itemPusat.map((item, index) => {
        if (item.checkbox == true) {
          data.push(item);
        }
      });
      this.$http
        .post(this.$apiUrl + "/sarkes/remove-master?t_name=master_pbf_pusat", {
          content: data,
        })
        .then((response) => {
          if (response.data.status == true) {
            this.$swal("Success!", "Data Berhasil di hapus!", "success");
            this.dataCabang();
          }
          this.dialogLoading = false;
        });
    },

    inputVerif: function () {
      if (!confirm("Apakah anda yakin ingin melakukan verifikasi?")) {
        return false;
      }
      let data = [];
      let itemPusat = this.itemPusat;
      itemPusat.map((item, index) => {
        if (item.checkbox == true) {
          data.push(item);
        }
      });
      this.$http
        .post(
          this.$apiUrl + "/sarkes/input-verifikasi?t_name=verif_pbf_pusat",
          { content: data }
        )
        .then((response) => {
          if (response.data.status == true) {
            this.$swal("Success!", "Data Berhasil di Verifikasi!", "success");
          }
          this.dialogLoading = false;
        });
    },

    lihatDataVerifikasi: function () {
      this.$store.commit("SET_STATUS_DATA", "verifikasi");
      this.dialogLoading = true;
      this.itemPusat = [];
      this.$http
        .get(this.$apiUrl + "/sarkes/read-verifikasi?t_name=verif_pbf_pusat")
        .then((response) => {
          this.dialogLoading = false;
          this.itemPusat = response.data.data;
        });
      this.titleTable = ".:[ Terverifikasi ]:.";
    },

    submitCapa: function () {
      let tglPerbaikan = this.pickerDate;
      let statusCapa = this.insertStatusCapa;

      if (this.files.length == 0) {
        alert("File Capa belum dipilih");
        return;
      }

      let dataKirim = {
        id: this.id,
        tglPerbaikan: tglPerbaikan,
        statusCapa: statusCapa,
        file: this.files[0].response.data.img,
        namaFile: this.namaFiles[0],
      };

      this.$http
        .post(this.$apiUrl + "/sarkes/update-capa?t_name=verif_pbf_pusat", {
          content: dataKirim,
        })
        .then((response) => {
          if (response.data.status == true) {
            this.$swal("Success!", "Data Berhasil di update!", "success");
          }
          this.dialogLoading = false;
          this.lihatDataVerifikasi();
        });
    },

    editItem: function (item) {
      if (item.checkbox == false) {
        return this.$swal({
          icon: "error",
          title: "Oops...",
          text: "Anda harus melakukan verifikasi terlebih dahulu!",
        });
      }
      this.$router.push({
        name: "EditPbfPusat",
        params: { content: item },
      });
    },

    removeItem: function (item) {
      let tblName = "master_pbf_pusat";
      if (this.$store.getters.statusData == "verifikasi") {
        tblName = "verif_pbf_pusat";
      }

      if (confirm("Apakah anda yakin ingin menghapus data ini?")) {
        this.$http
          .get(
            this.$apiUrl +
              "/sarkes/remove-verifikasi?t_name=" +
              tblName +
              "&id=" +
              item.ID
          )
          .then((response) => {
            if (response.data.status == true) {
              this.$swal("Success!", "Data Berhasil di hapus!", "success");
              this.dataCabang();
            } else {
              alert("Terjadi kesalahan!");
            }
          });
      }
    },

    actStandar: function (item) {
      console.log(item);
    },

    verifItem: function () {
      if (confirm("Apakah anda yakin ingin melakukan verifikasi?")) {
        console.log("tes");
      }
    },

    updateStandar: function (item, i) {
      if (item.checkbox == false) {
        return this.$swal({
          icon: "error",
          title: "Oops...",
          text: "Anda harus melakukan verifikasi terlebih dahulu!",
        });
      }
      let dataKirim = {
        statusStandar: i,
        id: item.ID,
      };
      this.$http
        .post(this.$apiUrl + "/sarkes/update-standar?t_name=verif_pbf_pusat", {
          content: dataKirim,
        })
        .then((response) => {
          if (response.data.status == true) {
            this.$swal("Success!", "Data Berhasil di update!", "success");
          }
          this.dialogLoading = false;
          this.lihatDataVerifikasi();
        });
    },

    onChangeFile: function (e) {
      if (this.$refs.upload.active || this.$refs.upload.uploaded) return false;

      let namaFile = prompt("Masukan nama file");
      if (namaFile === "") return false;
      let countFiles = this.namaFiles.length == 0 ? 0 : this.namaFiles.length;

      this.namaFiles[countFiles] = namaFile;
      this.$refs.upload.active = true;
    },

    lihatIzin: function (val) {
      console.log(val);
      window.open(`${val}`);
    },

    dataCabang: async function () {
      this.$store.commit("SET_STATUS_DATA", "");
      this.titleTable = "";
      this.dialogLoading = true;
      this.itemPusat = [];

      // get default data
      const res = await fetch(
        `${this.$apiUrl}/sarkes/read-template-pusat?tbl=master_pbf_pusat`
      );
      let jsonResult = await res.json();
      jsonResult = jsonResult.data;

      jsonResult.map((item, index) => {
        jsonResult[index]["checkbox"] = false;
      });
      this.dialogLoading = false;
      this.itemPusat = jsonResult;
    },
  },
  created() {
    if (this.$store.getters.userData.JENIS_LOGIN == "provinsi") {
      this.idDaerah = 32;
    } else {
      this.idDaerah = this.$store.getters.userData.KODE_DAERAH;
    }
    this.$store.commit("STATUS_DRAWER", false);
    if (this.$store.getters.statusData == "verifikasi") {
      this.lihatDataVerifikasi();
    } else {
      this.dataCabang();
    }
    if (this.$route.params.contentQuery) {
      this.search = this.$route.params.contentQuery;
    }
  },
};
</script>