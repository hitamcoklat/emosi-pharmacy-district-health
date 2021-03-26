<template>
  <div>
    <SubMenu />
    <v-content class="pl-0">
      <v-container>
        <p style="font-weight: bold; font-size: 1.3em" class="mt-n12 mx-auto">
          LAPORAN HASIL PERJALANAN DINAS
        </p>
        <table style="width: 70%">
          <tr class="m-0 p-0">
            <td>TUJUAN PERJALANAN</td>
            <td>Monitoring Ketersediaan Obat dan Vaksin</td>
          </tr>
          <tr class="m-0 p-0">
            <td>LAMA PERJALANAN DINAS</td>
            <td>
              <v-text-field
                class="pa-0 ma-0"
                v-model="lama_perjalanan"
              ></v-text-field>
            </td>
          </tr>
          <tr class="m-0 p-0">
            <td>TANGGAL PERJALANAN DINAS</td>
            <td>
              <v-col class="pa-0 ma-0" cols="12" sm="12" md="12">
                <v-dialog
                  ref="dialog"
                  v-model="modal"
                  :return-value.sync="date"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      class="pa-0 ma-0"
                      v-model="date"
                      label="Tanggal"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker class="pa-0 ma-0" v-model="date" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="modal = false"
                      >Cancel</v-btn
                    >
                    <v-btn text color="primary" @click="$refs.dialog.save(date)"
                      >OK</v-btn
                    >
                  </v-date-picker>
                </v-dialog>
              </v-col>
            </td>
          </tr>
          <tr class="m-0 p-0">
            <td>TEMPAT YANG DIKUNJUNGI</td>
            <td>
              <v-text-field
                class="pa-0 ma-0"
                v-model="tempat_kunjungan"
              ></v-text-field>
            </td>
          </tr>
          <tr class="m-0 p-0">
            <td>KABUPATEN/KOTA</td>
            <td>
              <v-text-field
                class="pa-0 ma-0"
                v-model="tempat_kunjungan"
              ></v-text-field>
            </td>
          </tr>
          <tr class="m-0 p-0">
            <td>NAMA PETUGAS</td>
            <td>
              <v-row no-gutters>
                <v-col cols="12">
                  <v-select
                    v-model="namaPanitia"
                    :items="petugas"
                    @change="onChangePanitia"
                    attach
                    :deletable-chips="true"
                    chips
                    label="NAMA PETUGAS"
                    multiple
                  >
                    <template v-slot:append-item>
                      <v-divider class="mb-2"></v-divider>
                      <v-list-item @click="tambahCustomPanitia">
                        <v-list-item-content>
                          <v-list-item-title>
                            Tambah Panitia
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                  </v-select>
                </v-col>
              </v-row>
            </td>
          </tr>
          <tr class="m-0 p-0">
            <td>Upload Foko/Dokumentasi</td>
            <td>
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
            </td>
          </tr>
        </table>
        <v-btn color="primary" dark @click="dialog = true"
          >INPUT HASIL PERJADIN</v-btn
        >
        <v-card style="margin-top: 1em">
          <v-card-title>
            Daftar Perjalanan Dinas
            <v-spacer></v-spacer>
          </v-card-title>
          <v-data-table :headers="headers" :items="dataPerjadin"></v-data-table>
        </v-card>
        <v-dialog
          v-model="dialog"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <template v-slot:activator="{ on }"> </template>
          <v-card>
            <v-toolbar dark color="primary">
              <v-btn icon dark @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>Input Hasil Perjalanan Dinas</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn dark text @click="simpanPerjadin">Simpan</v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <v-list three-line subheader>
              <v-container class="grey lighten-5">
                <v-row no-gutters>
                  <v-col class="pa-10">
                    <v-text-field
                      v-model="laporanPerjadin['jmlPkm']"
                      label="Jumlah Puskesmas (Unit)"
                    ></v-text-field>
                    <v-text-field
                      v-model="laporanPerjadin['jmlPkmNonPerawat']"
                      label="Puskesmas Non Perawatan (Unit)"
                    ></v-text-field>
                    <br />
                    <label style="font-weight: bold"
                      >Berdasarkan Jenis Pengelolaan Keuangan</label
                    >
                    <v-text-field
                      v-model="laporanPerjadin['pkmBLU']"
                      label="Puskesmas BLU (Unit)"
                    ></v-text-field>
                    <v-text-field
                      v-model="laporanPerjadin['pkmNonBLU']"
                      label="Puskesmas Non BLU (Unit)"
                    ></v-text-field>
                    <br />
                    <label style="font-weight: bold"
                      >DATA SUMBER DANA PENGADAAN OBAT</label
                    >
                    <v-text-field
                      v-model="laporanPerjadin['danaDAK']"
                      label="Dana DAK"
                    ></v-text-field>
                    <v-text-field
                      v-model="laporanPerjadin['danaAPBDKabKota']"
                      label="Dana APBD Kabupaten/Kota"
                    ></v-text-field>
                    <v-text-field
                      v-model="laporanPerjadin['danaKapitasi']"
                      label="Dana Kapitasi"
                    ></v-text-field>
                    <v-text-field
                      v-model="laporanPerjadin['obatProgram']"
                      label="Obat Program"
                    ></v-text-field>
                    <v-text-field
                      v-model="laporanPerjadin['sumberLain']"
                      label="Sumber Lain"
                    ></v-text-field>
                  </v-col>
                  <v-col class="pa-10">
                    <label style="font-weight: bold"
                      >DATA TENAGA KEFARMASIAN DINAS KESEHATAN</label
                    >
                    <v-text-field
                      v-model="laporanPerjadin['apotekerDinas']"
                      label="Apoteker (Orang)"
                    ></v-text-field>
                    <v-text-field
                      v-model="laporanPerjadin['tenagaTeknisDinas']"
                      label="Tenaga Teknis Kefarmasian (Orang)"
                    ></v-text-field>
                    <label style="font-weight: bold"
                      >DATA TENAGA KEFARMASIAN INSTALASI FARMASI</label
                    >
                    <v-text-field
                      v-model="laporanPerjadin['apotekerInstFarmasi']"
                      label="Apoteker (Orang)"
                    ></v-text-field>
                    <v-text-field
                      v-model="laporanPerjadin['tenagaTeknisInstFarmasi']"
                      label="Tenaga Teknis Kefarmasian (Orang)"
                    ></v-text-field>
                    <label style="font-weight: bold"
                      >DATA TENAGA KEFARMASIAN PUSKESMAS</label
                    >
                    <v-text-field
                      v-model="laporanPerjadin['apotekerPuskesmas']"
                      label="Apoteker (Orang)"
                    ></v-text-field>
                    <v-text-field
                      v-model="laporanPerjadin['tenagaTeknisPuskesmas']"
                      label="Tenaga Teknis Kefarmasian (Orang)"
                    ></v-text-field>
                    <v-textarea
                      filled
                      name="input-7-4"
                      label="Kesimpulan"
                      v-model="laporanPerjadin['kesimpulan']"
                      value=""
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </v-list>
          </v-card>
        </v-dialog>
      </v-container>
    </v-content>
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
import obat40item from "@/config/obat40item";
import routeList from "@/views/pages/oblik/routeList";
import SubMenu from "./SubMenu";

export default {
  name: "Oblik",
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      dialogLoading: false,
      items: routeList,
      itemObat: obat40item,
      lama_perjalanan: "",
      tempat_kunjungan: "",
      laporanPerjadin: [],
      modal: false,
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      right: null,
      dataPerjadin: [],
      headers: [
        { text: "LAMA PERJALANAN DINAS", value: "LAMA_PERJALANAN_DINAS" },
        { text: "TANGGAL PERJALANAN DINAS", value: "TANGGAL_PERJALANAN_DINAS" },
        { text: "TEMPAT YG DIKUNJUNGI", value: "TEMPAT_KUNJUNGAN" },
      ],
      files: [],
      namaFiles: [],
      namaPanitia: [],
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
  components: {
    SubMenu,
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
    simpanPerjadin: function () {
      this.dialogLoading = true;
      console.log(this.laporanPerjadin);
      let data = {
        LAMA_PERJALANAN_DINAS: this.lama_perjalanan,
        TANGGAL_PERJALANAN_DINAS: this.date,
        TEMPAT_KUNJUNGAN: this.tempat_kunjungan,
        LAPORAN: Object.assign({}, this.laporanPerjadin),
      };

      console.log(data);
      this.$http
        .post(this.$apiUrl + "/oblik/laporan-perjadin", data)
        .then((response) => {
          console.log(response);
          setTimeout(() => {
            this.dialogLoading = false;
            this.dialog = false;
          }, 2000);
        });
    },
    tambahCustomPanitia: function (e) {
      let namaCustomPanitia = prompt("Masukan nama panitia");
      this.petugas.push(namaCustomPanitia);
      this.namaPanitia.push(namaCustomPanitia);
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
        console.log("statusUpload", this.$refs.upload.uploaded);
        console.log("dataFiles", this.namaFiles, this.files);
      });
    },
    getAllPerjadin: function () {
      this.$http
        .get(this.$apiUrl + "/oblik/get-all-perjadin")
        .then((response) => {
          this.dataPerjadin = response.data.data;
          console.log(response);
        });
    },
  },
  created() {
    this.getAllPerjadin();
    console.log(this.itemObat);
  },
};
</script>
