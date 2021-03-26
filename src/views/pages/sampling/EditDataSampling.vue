<template>
  <div>
    <SubMenu />
    <v-content class="pl-0">
      <p
        style="font-weight: bold; font-size: 1.3em; margin-left: 10px"
        class="mt-n12"
      >
        INPUT DATA SAMPLING
      </p>
      <v-row>
        <v-col cols="6" sm="6" md="6">
          <v-alert
            v-if="alertInputKegiatan"
            style="margin-left: 1em; margin-right: 1em"
            text
            type="success"
          >
            Data Sampling berhasil di input!
          </v-alert>
          <v-container>
            <v-row no-gutters>
              <v-col cols="12">
                <v-select
                  v-model="form.kabkot"
                  :items="listKabkot"
                  outlined
                  item-text="namaKabkot"
                  item-value="namaKabkot"
                  label="Kabupaten/Kota"
                >
                </v-select>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12">
                <v-select
                  v-model="form.tahun"
                  :items="itemThn"
                  outlined
                  label="Pilih Tahun"
                >
                </v-select>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12">
                <v-text-field
                  filled
                  dense
                  v-model="form.kodeSampling"
                  label="Kode Sampling"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12">
                <v-text-field
                  filled
                  dense
                  v-model="form.jenisProduk"
                  label="Jenis Produk"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12">
                <v-text-field
                  filled
                  dense
                  v-model="form.noRegistrasi"
                  label="No. Registrasi"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12">
                <v-text-field
                  filled
                  dense
                  v-model="form.noBatch"
                  label="No Batch"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12">
                <v-text-field
                  filled
                  dense
                  v-model="form.jumlahSampel"
                  label="Jumlah Sampel Untuk Pengujian"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12">
                <v-text-field
                  filled
                  dense
                  v-model="form.kemasan"
                  label="Kemasan"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12">
                <v-text-field
                  filled
                  dense
                  v-model="form.alamatSaranaPembelian"
                  label="Alamat Sarana Pembelian"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12">
                <v-text-field
                  filled
                  dense
                  v-model="form.produsen"
                  label="Produsen"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12">
                <v-text-field
                  filled
                  dense
                  v-model="form.parameterUji"
                  label="Parameter Uji"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12">
                <v-text-field
                  filled
                  dense
                  v-model="form.biaya"
                  label="biaya"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12">
                <v-text-field
                  filled
                  dense
                  v-model="form.laboratorium"
                  label="Laboratorium"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12">
                <v-text-field
                  filled
                  dense
                  v-model="form.hasilMemenuhiSyarat"
                  label="Hasil Memenuhi Syarat"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12">
                <v-text-field
                  filled
                  dense
                  v-model="form.hasilTdkMemenuhiSyarat"
                  label="Hasil Tidak Memenuhi Syarat"
                ></v-text-field>
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
import listKabkot from "../../../config/listKabkot";

export default {
  components: {
    SubMenu,
  },
  data() {
    return {
      search: "",
      listKabkot: listKabkot,
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
    };
  },
  methods: {    
    insertData: function () {
      let data = {
        content: this.form,
      };

      let urlPost =
        this.isUpdate == true
          ? this.$apiUrl + `/data-sampling/update?id=${this.idUpdate}`
          : this.$apiUrl + `/data-sampling/insert`;

      this.$http.post(urlPost, qs.stringify(data)).then((res) => {
        if (res.data.status == true) {
          this.form = [];
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
      if (this.$refs.upload.active) return false;

      let namaFile = prompt("Masukan nama file");
      if (namaFile === "") return false;
      let countFiles = this.namaFiles.length == 0 ? 0 : this.namaFiles.length;

      this.namaFiles[countFiles] = namaFile;
      this.$refs.upload.active = true;
    },
    inputFile: function (newFile, oldFile) {
      this.dialogUploadLoading = true;
      if (newFile && oldFile && !newFile.active && oldFile.active) {
        // Get response data
        if (newFile.response.status == true) {
          this.dialogUploadLoading = false;
        }
      }
    },
  },
  created() {
    if (this.$route.params.isUpdate) {
      this.isUpdate = this.$route.params.isUpdate;
      this.idUpdate = this.$route.params.idUpdate;
      this.form = this.$route.params.form;
      console.log(this.idUpdate)
      console.log(this.form)
    } else {
      console.log("tidak ada data");
    }
  },
};
</script>