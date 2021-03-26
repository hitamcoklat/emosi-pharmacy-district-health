<template>
  <div>
    <SubMenu />
    <v-content class="pl-0">
      <p
        style="font-weight: bold; font-size: 1.3em; margin-left: 10px"
        class="mt-n12"
      >
        KEGIATAN PERTEMUAN SEKSI FARMALKES
      </p>
      <v-row>
        <v-col cols="3" sm="3" md="3">
          <v-btn
            @click="$router.push('/keg-pertemuan/farmalkes/edit')"
            style="margin-left: 1em"
            color="success"
            elevation="2"
            >Tambah Data</v-btn
          >
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col sm="6" cols="6" md="6">
          <v-row no-gutters>
            <v-col style="padding-left: 1em" cols="3" sm="3" md="3">
              <v-subheader> Pilih Tahun </v-subheader>
            </v-col>
            <v-col style="padding-left: 1em" cols="6" sm="6" md="6">
              <v-select
                filled
                dense
                v-model="selectThn"
                :items="itemThn"
              ></v-select>
            </v-col>
            <v-col style="padding-left: 1em" cols="2" sm="2" md="2">
              <v-btn @click="btnPilihThn" color="primary">Cek Data</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="12">
          <v-card>
            <v-card-title>
              &nbsp;
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table :headers="headers" :items="items" :search="search">
              <template v-slot:item.actions="{ item }">
                <div style="width: 100px">
                  <v-btn @click="editItem(item)" x-small elevation="2">
                    <v-icon style="color: blue" x-small> mdi-pencil </v-icon>
                  </v-btn>
                  <v-btn
                    @click="removeData(item)"
                    x-small
                    class="ml-2"
                    elevation="2"
                  >
                    <v-icon style="color: red" x-small> mdi-delete </v-icon>
                  </v-btn>
                </div>
              </template>
              <template v-slot:item.actionsFile="{ item }">
                <v-btn
                  style="margin: 5px"
                  v-if="item.CONTENT.file.length > 0"
                  v-for="(i, index) in item.CONTENT.file"
                  @click="lihatFile(i)"
                  small
                  elevation="2"
                  >{{ i.response.data.namaFile }}</v-btn
                >
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-content>
  </div>
</template>

<script>
import SubMenu from "./SubMenu";
import qs from "qs";
import { ListBulan, ListTahun } from "@/config";

export default {
  components: {
    SubMenu,
  },
  data() {
    return {
      search: "",
      dialogFormInput: false,
      form: [],
      dialogUploadLoading: false,
      menu1: false,
      menu2: false,
      headers: [
        {
          text: "JUDUL KEGIATAN",
          align: "start",
          sortable: false,
          value: "CONTENT.judulKegiatan",
        },
        { text: "TGL KEGIATAN", value: "CONTENT.tglKegiatan" },
        { text: "NAMA PANITIA", value: "CONTENT.namaPanitia" },
        { text: "TEMPAT KEGIATAN", value: "CONTENT.tempatKegiatan" },
        { text: "JENIS KEGIATAN", value: "CONTENT.jenisKegiatan" },
        { text: "PANITIA ACARA", value: "PANITIA_ACARA" },
        { text: "FILES", value: "actionsFile" },
        { text: "AKSI", value: "actions" },
      ],
      items: [],
      files: [],
      itemThn: [2019, 2020, 2021, 2022],
      selectThn: new Date().getFullYear(),
      namaFiles: [],
      fileMateriKegiatan: [],
      fileFotoPertemuan: [],
      isUpdate: false,
      idUpdate: null,
      itemJenisKegiatan: ["ZOOM", "LANGSUNG"],
      petugas: [
        "Warningsih",
        "Rd Hermalia",
        "Yura Kalfataru",
        "Heru Syafarudin",
        "Mega Purnamasari",
        "Susy Susilawaty",
        "Arief Rachman",
        "Susilawati",
        "Seja",
        "Ade Lili",
        "Siti",
        "Anti",
        "Prima Eko",
        "Mukhlis",
        "Gita",
        "Amir",
        "APBD",
      ],
    };
  },
  methods: {
    clickFile: function (id) {
      const index = this.files.indexOf(id);
      const indexName = this.namaFiles.indexOf(id);
      if (confirm("Apakah anda yakin ingin menghapus file ini?")) {
        this.files.splice(index);
        this.namaFiles.splice(indexName);
      }
    },
    btnPilihThn: function () {
      this.fetchData();
    },

    fetchData: function () {
      this.$http
        .get(this.$apiUrl + "/pertemuan/read?thn=" + this.selectThn)
        .then((res) => {
          if (res.data.data.length > 0) {
            this.items = res.data.data;
          } else {
            this.items = [];
          }
        });
    },
    lihatFile: function (item) {
      window.open(item.response.data.img, "_blank");
    },
    editItem: function (item) {
      this.isUpdate = true;
      this.idUpdate = item.id;

      this.form = {
        daftarHadir: item.CONTENT.daftarHadir,
        jenisKegiatan: item.CONTENT.jenisKegiatan,
        judulKegiatan: item.CONTENT.judulKegiatan,
        kesimpulan: item.CONTENT.kesimpulan,
        materiKegiatan: item.CONTENT.materiKegiatan,
        namaPanitia: item.CONTENT.namaPanitia,
        tempatKegiatan: item.CONTENT.tempatKegiatan,
        tglKegiatan: item.CONTENT.tglKegiatan,
        jenisPanitia: item.PANITIA_ACARA,
      };

      if (item.CONTENT.file == undefined) {
        this.namaFiles = [];
      } else {
        if (item.CONTENT.file.length > 0) {
          item.CONTENT.file.map((item, index) => {
            this.namaFiles[index] = item.response.data.namaFile;
          });
        } else {
          this.namaFiles = [];
        }
      }

      this.files = item.CONTENT.file;

      this.$router.push({
        name: "EditKegPertemuan",
        params: {
          isUpdate: this.isUpdate,
          idUpdate: item.id,
          form: this.form,
          namaFiles: this.namaFiles,
          files: this.files,
        },
      });
    },
    removeData: function (item) {
      if (confirm("Apakah anda yakin ingin menghapus data ini?")) {
        this.$http
          .get(this.$apiUrl + "/pertemuan/remove?id=" + item.id)
          .then((res) => {
            if (res.data.status == 1) {
              this.fetchData();
            } else {
              alert("Terjadi kesalahan!");
            }
          });
      }
    },
    popUpFormInput: function () {
      this.form = [];
      this.namaFiles = [];
      this.files = [];
      this.dialogFormInput = true;
    },
  },
  created() {
    if (this.$store.getters.userData.JENIS_LOGIN == "provinsi") {
      this.idDaerah = 32;
    } else {
      this.idDaerah = this.$store.getters.userData.KODE_DAERAH;
    }
    this.jenisLogin = this.$store.getters.userData.JENIS_LOGIN;
    this.fetchData();
  },
};
</script>