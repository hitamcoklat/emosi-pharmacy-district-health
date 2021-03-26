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
                  >P T S P</v-list-item-title
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
            rounded
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
                rounded
                depressed
                color="success"
                v-bind="attrs"
                v-on="on"
                ><v-icon size="20">mdi-file-excel-outline</v-icon></v-btn
              >
            </template>
            <span>Tampilan Excel</span>
          </v-tooltip>
          <v-btn
            rounded
            v-if="tampilanExcellCabang"
            style="margin-left: 10px"
            depressed
            color="success"
            >Export Excell</v-btn
          >
          <v-menu>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
                rounded
                class="ml-5"
              >
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
            rounded
            style="margin-left: 10px"
            @click="inputVerif"
            depressed
            dark
            color="default"
            >Set Verifikasi</v-btn
          >
          <v-btn
            rounded
            style="margin-left: 10px"
            @click="updateTutup"
            depressed
            dark
            color="warning"
            >Set Tutup</v-btn
          >
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
              <template v-slot:item.actCapa="{ item }">
                {{
                  item.STATUS_CAPA !== "" &&
                  typeof item.STATUS_CAPA !== "undefined"
                    ? "[Sudah di input]"
                    : ""
                }}
                <v-btn small color="primary" @click="changeCapa(item)">
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
                <v-btn small color="primary" @click="editItem(item)">
                  <v-icon small> mdi-pencil-box-multiple </v-icon>
                </v-btn>
              </template>
              <template v-slot:item.actStandar="{ item }">
                <v-menu>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
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
            <vue-excel-editor
              readonly
              autocomplete
              filter-row
              ref="grid"
              v-model="itemCabang"
            >
              <vue-excel-column field="n_perusahaan" label="Nama Perusahaan" />
              <vue-excel-column
                field="a_perusahaan"
                label="Alamat Perusahaan"
              />
              <vue-excel-column field="Alamat_Gudang" label="Alamat Gudang" />
              <vue-excel-column
                field="Kab_Kota_Gudang"
                label="Kab/Kota Gudang"
              />
              <vue-excel-column field="telp_pemohon" label="Telp. Pemohon" />
              <vue-excel-column field="nama_pimpinan" label="Nama Pimpinan" />
              <vue-excel-column field="no_izin" label="No. Izin" />
              <vue-excel-column
                field="tgl_terbit_izin"
                label="Tgl. Terbit Izin"
              />
              <vue-excel-column field="n_perizinan" label="Nama Perizinan" />
              <vue-excel-column field="Nama_PJT" label="Nama PJT" />
              <vue-excel-column field="nib" label="NIB" />
              <vue-excel-column field="link_naskahizin" label="Link Izin" />
            </vue-excel-editor>
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
                  <v-btn @click="clickFile()" outlined rounded text>
                    Hapus
                  </v-btn>
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
import readXlsxFile from "read-excel-file";
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
      itemTutup: ["Y", "N"],
      tampilanTableCabang: true,
      tampilanExcellCabang: false,
      itemCapa: ["CPOB", "CDOB", "CPOTB", "CPPKRTB", "CPAKB", "CPKB", "CDAKB"],
      item: [],
      selectedCapa: "",
      headersCabang: [
        {
          text: "Nama Perusahaan",
          align: "start",
          sortable: false,
          value: "n_perusahaan",
        },
        { text: "Alamat Perusahaan", value: "a_perusahaan" },
        { text: "Alamat Gudang", value: "Alamat_Gudang" },
        { text: "Kab/Kota Gudang", value: "Kab_Kota_Gudang" },
        { text: "Telp. Pemohon", value: "telp_pemohon" },
        { text: "Nama Pimpinan", value: "nama_pimpinan" },
        { text: "No. Izin", value: "no_izin" },
        { text: "Tgl. Terbit Izin", value: "tgl_terbit_izin" },
        { text: "Nama Perizinan", value: "n_perizinan" },
        { text: "Nama PJT", value: "Nama_PJT" },
        { text: "Bentuk Sediaan", value: "bentuk_sediaan" },
        { text: "NIB", value: "nib" },
        { text: "Link Naskah Izin", value: "actions" },
        { text: "CAPA", value: "actCapa" },
        { text: "Standar", value: "STANDAR_STATUS" },
        { text: "Set Standar", value: "actStandar" },
        { text: "Status Tutup", value: "STATUS_TUTUP" },
        { text: "Set Tutup", value: "actTutup" },
        { text: "Edit", value: "actEdit" },
        { text: "Verifikasi", value: "checkbox" },
      ],
      itemCabang: [],
      namaFiles: [],
      titleTable: "",
      statusData: "PTSP",
      insertStatusCapa: "",
      dialogDetailCapa: false,
      dataCapa: [],
      tableName: ""
    };
  },
  components: {
    SubMenu,
    DetailCapa
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
        this.tableName = "verifukot";
        this.dialogDetailCapa = true;
        this.dataCapa = item;
      } else {
        this.dialogCapa = true;
      }
    },

    emitTutupDetailCapa: function () {
      this.dialogDetailCapa = false;
    },

    checkVerif: function () {
      let itemCabang = this.itemCabang;
      itemCabang.map((item, index) => {
        itemCabang[index].checkbox = !item.checkbox;
      });
      this.itemCabang = itemCabang;
    },

    inputVerif: function () {
      if (!confirm("Apakah anda yakin ingin melakukan verifikasi?")) {
        return false;
      }
      let data = [];
      let itemCabang = this.itemCabang;
      itemCabang.map((item, index) => {
        if (item.checkbox == true) {
          data.push(item);
        }
      });
      this.$http
        .post(this.$apiUrl + "/sarkes/input-verifikasi?t_name=verifukot", {
          content: data,
        })
        .then((response) => {
          if (response.data.status == true) {
            this.$swal("Success!", "Data Berhasil di Verifikasi!", "success");
          }
          this.dialogLoading = false;
        });
    },

    lihatDataVerifikasi: function () {
      this.$store.commit("SET_STATUS_DATA", "verifikasi");
      this.itemCabang = [];
      this.$http
        .get(this.$apiUrl + "/sarkes/read-verifikasi?t_name=verifukot")
        .then((response) => {
          this.itemCabang = response.data.data;
        });
      this.titleTable = ".:[ Terverifikasi ]:.";
    },

    submitCapa: function () {
      let tglPerbaikan = this.pickerDate;
      let statusCapa = this.insertStatusCapa;

      let dataKirim = {
        id: this.id,
        tglPerbaikan: tglPerbaikan,
        statusCapa: statusCapa,
        file: this.files[0].response.data.img,
        namaFile: this.namaFiles[0],
      };

      this.$http
        .post(this.$apiUrl + "/sarkes/update-capa?t_name=verifukot", {
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
        name: "EditUkot",
        params: { content: item },
      });
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
        .post(this.$apiUrl + "/sarkes/update-tutup?t_name=verifukot", {
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
        .post(this.$apiUrl + "/sarkes/update-standar?t_name=verifukot", {
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
      if (this.$refs.upload.active) return false;

      let namaFile = prompt("Masukan nama file");
      if (namaFile === "") return false;
      let countFiles = this.namaFiles.length == 0 ? 0 : this.namaFiles.length;

      this.namaFiles[countFiles] = namaFile;
      this.$refs.upload.active = true;
    },

    clickFile: function () {
      this.namaFiles = [];
      this.files = [];
    },

    lihatIzin: function (val) {
      console.log(val);
      window.open(`${val}`);
    },

    dataCabang: function () {
      this.$store.commit("SET_STATUS_DATA", "");
      this.titleTable = "";
      this.dialogLoading = true;
      this.itemCabang = [];
      this.$http
        .get(
          this.$apiUrl +
            "/sarkes/getCurl?url=https://dpmptsp.jabarprov.go.id/api_perizinan/api/perizinan-kesehatan-cabang-penyalur-alkes?token=FgBcoIszpj"
        )
        // this.$http.get(this.$apiUrl + '/sarkes/getCurl?url=http://103.147.222.234/e-mosi/data-json/ukot.json')
        .then((response) => {
          if(response.data.status == false) {
            alert('Server PTSP Error! Gagal mengambil data dari PTSP!')
          }          
          this.dialogLoading = false;
          response.data.data.map((item, index) => {
            response.data.data[index]["checkbox"] = false;
          });
          this.itemCabang = response.data.data;
        });
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