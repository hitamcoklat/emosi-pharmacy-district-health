<template>
  <div>
    <SubMenu />
    <v-content class="pl-0">
      <p
        style="font-weight: bold; font-size: 1.3em; margin-left: 10px"
        class="mt-n12"
      >
        INPUT KEGIATAN PERTEMUAN SEKSI FARMALKES
      </p>
      <v-row>
        <v-col cols="6" sm="6" md="6">
          <v-alert
            v-if="alertInputKegiatan"
            style="margin-left: 1em; margin-right: 1em"
            text
            type="success"
          >
            Kegiatan berhasil di input!
          </v-alert>
          <v-container>
            <v-row no-gutters>
              <v-col cols="12">
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  max-width="290"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.tglKegiatan"
                      v-on="on"
                      @click:clear="date = null"
                      outlined
                      label="Tgl. Kegiatan"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    @change="menu2 = false"
                    v-model="form.tglKegiatan"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12">
                <v-text-field
                  v-model="form.judulKegiatan"
                  outlined
                  label="Judul Kegiatan"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12">
                <v-select
                  v-model="form.namaPanitia"
                  :items="petugas"
                  @change="onChangePanitia"
                  attach
                  :deletable-chips="true"
                  chips
                  label="Nama Panitia"
                  multiple
                >
                  <template v-slot:append-item>
                    <v-divider class="mb-2"></v-divider>
                    <v-list-item @click="tambahCustomPanitia">
                      <v-list-item-content>
                        <v-list-item-title> Tambah Panitia </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-select>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12">
                <v-text-field
                  v-model="form.tempatKegiatan"
                  outlined
                  label="Tempat Kegiatan"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12">
                <v-select
                  v-model="form.jenisKegiatan"
                  :items="itemJenisKegiatan"
                  outlined
                  label="Jenis Kegiatan"
                >
                </v-select>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12">
                <v-select
                  v-model="form.jenisPanitia"
                  :items="itemJenisPanitia"
                  outlined
                  label="Panitia"
                >
                </v-select>
              </v-col>
            </v-row>
            <v-row v-if="files.length > 0" no-gutters>
              <v-col v-for="(item, index) in files" :key="index" cols="12">
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
            <v-row no-gutters>
              <v-col cols="2">
                <file-upload
                  ref="upload"
                  v-model="files"
                  :multiple="true"
                  :post-action="`${this.$apiNode}/upload`"
                  @input="getNamaFile"
                >
                  <v-btn style="margin-bottom: 1em" color="info" elevation="2"
                    >Tambahkan File</v-btn
                  >
                </file-upload>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12">
                <v-textarea
                  v-model="form.kesimpulan"
                  outlined
                  label="Kesimpulan"
                  hint="Masukan kesimpulan"
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col style="padding-right: 1em" cols="6" sm="6" md="6" lg="6">
                <v-btn
                  @click="$router.go(-1)"
                  x-large
                  depressed
                  dark
                  color="red"
                  block
                  >Kembali</v-btn
                >
              </v-col>
              <v-col style="padding-left: 1em" cols="6" sm="6" md="6" lg="6">
                <v-btn
                  @click="insertData"
                  x-large
                  depressed
                  color="green"
                  dark
                  block
                  >Submit</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-content>
    <v-dialog v-model="dialogUploadLoading" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Uploading...
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
import SubMenu from "./SubMenu";
import qs from "qs";

export default {
  components: {
    SubMenu,
  },
  data() {
    return {
      search: "",
      dialogFormInput: false,
      form: [],
      menu1: false,
      menu2: false,
      alertInputKegiatan: false,
      dialogUploadLoading: false,
      files: [],
      itemThn: [2019, 2020, 2021, 2022],
      selectThn: new Date().getFullYear(),
      namaFiles: [],
      fileMateriKegiatan: [],
      fileFotoPertemuan: [],
      isUpdate: false,
      idUpdate: null,
      itemJenisPanitia: ["PUSAT", "PROVINSI"],
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
    insertData: function () {
      let dataThn = this.form.tglKegiatan;

      let resDate = dataThn.split("-");
      let formThn = resDate[0];
      let formBln = resDate[1];
      let formHari = resDate[2];

      if (this.files.length > 0) {
        this.files.map((item, index) => {
          this.files[index].response.data.namaFile = this.namaFiles[index];
        });
      }

      let olahData = {
        daftarHadir: this.form.daftarHadir,
        jenisKegiatan: this.form.jenisKegiatan,
        judulKegiatan: this.form.judulKegiatan,
        kesimpulan: this.form.kesimpulan,
        materiKegiatan: this.form.materiKegiatan,
        namaPanitia: this.form.namaPanitia,
        tempatKegiatan: this.form.tempatKegiatan,
        tglKegiatan: this.form.tglKegiatan,
        file: this.files,
      };

      let data = {
        content: olahData,
        idDaerah: this.idDaerah,
        jenisPanitia: this.form.jenisPanitia,
        thn: parseInt(formThn),
        bln: parseInt(formBln),
      };

      let urlPost =
        this.isUpdate == true
          ? this.$apiUrl + `/pertemuan/update?id=${this.idUpdate}`
          : this.$apiUrl + `/pertemuan/insert`;

      this.$http.post(urlPost, qs.stringify(data)).then((res) => {
        if (res.data.status == true) {
          this.form = [];
          this.files = [];
          this.dialogFormInput = false;
          // this.dialogUploadLoading = false
          // this.alertInputKegiatan = true
          alert("Input data berhasil!");
          this.$router.go(-1);
        } else {
          alert("Terjadi kesalahan!");
        }
      });
    },
    tambahCustomPanitia: function (e) {
      let namaCustomPanitia = prompt("Masukan nama panitia");
      this.petugas.push(namaCustomPanitia);
      this.form.namaPanitia.push(namaCustomPanitia);
    },
    onChangePanitia: function (e) {
      console.log(e);
    },
    getNamaFile: function (newFile, oldFile) {
      if (this.$refs.upload.active || this.$refs.upload.uploaded) return false;

      this.$swal({
        title: "Masukan nama file",
        input: "text",
        inputAttributes: {
          autocapitalize: "off",
        },
        preConfirm: (text) => {
          return text;
        },
      }).then((res) => {
        let countFiles = this.namaFiles.length == 0 ? 0 : this.namaFiles.length;
        this.$refs.upload.active = true;
        if (res.value !== undefined) {
          this.namaFiles[countFiles] = res.value;
        }
        console.log('statusUpload', this.$refs.upload.uploaded)
        console.log("dataFiles", this.namaFiles, this.files);
      });
    },
    /*     inputFile: function (newFile, oldFile) {
      // this.dialogUploadLoading = true;
      console.log("namaFiles", this.namaFiles, this.files);
      if (newFile && oldFile && !newFile.active && oldFile.active) {
        // Get response data
        if (newFile.response.status == true) {
          this.dialogUploadLoading = false;
        }
      }
    }, */
  },
  created() {
    if (this.$route.params.isUpdate) {
      console.log("navigateEdit", this.$route.params.form);
      this.isUpdate = this.$route.params.isUpdate;
      this.idUpdate = this.$route.params.idUpdate;
      this.form = this.$route.params.form;
      this.namaFiles = this.$route.params.namaFiles;
      this.files = this.$route.params.files;
    } else {
      console.log("tidak ada data");
    }
  },
};
</script>