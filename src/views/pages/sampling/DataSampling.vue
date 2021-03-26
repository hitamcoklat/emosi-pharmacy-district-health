<template>
  <div>
    <SubMenu />
    <v-content class="pl-0">
      <p
        style="font-weight: bold; font-size: 1.3em; margin-left: 10px"
        class="mt-n12"
      >
        DATA SAMPLING
      </p>
      <v-row>
        <v-col cols="3" sm="3" md="3">
          <v-btn
            @click="$router.push('/sampling/data-sampling/edit')"
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
              <v-select filled dense v-model="selectThn" :items="itemThn" @change="changePilihThn">
                <template v-slot:prepend-item>
                  <v-list-item ripple @click="toggle">
                    <v-list-item-content>
                      <v-list-item-title> Tampilkan Semua </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider class="mt-2"></v-divider>
                </template>
              </v-select>
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
            <v-data-table
              dense
              fixed-header
              height="550"
              :headers="headers"
              :items="items"
              :search="search"
            >
              <template v-slot:item.actEdit="{ item }">
                <v-icon @click="editItem(item)">
                  mdi-pencil-box-multiple
                </v-icon>
              </template>
              <template v-slot:item.actRemove="{ item }">
                <v-icon style="color: red" @click="removeItem(item)">
                  mdi-close-box-multiple
                </v-icon>
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
import ListTahun from '@/config/listTahun'

export default {
  components: {
    SubMenu,
  },
  data() {
    return {
      search: "",
      dialogFormInput: false,
      form: [],
      item: [],
      headers: [
        { text: "KAB/KOTA", value: "KABKOTA" },
        { text: "KODE SAMPLING", value: "KODE_SAMPLING" },
        { text: "JENIS PRODUK", value: "JENIS_PRODUK" },
        { text: "NO REGISTRASI", value: "NO_REGISTRASI" },
        { text: "NO BATCH", value: "NO_BATCH" },
        {
          text: "JUMLAH SAMPEL UNTUK PENGUJIAN",
          value: "JUMLAH_SAMPEL_UNTUK_PENGUJIAN",
        },
        { text: "KEMASAN", value: "KEMASAN" },
        { text: "ALAMAT SARANA PEMBELIAN", value: "ALAMAT_SARANA_PEMBELIAN" },
        { text: "PRODUSEN", value: "PRODUSEN" },
        { text: "PARAMETER UJI", value: "PARAMETER_UJI" },
        { text: "BIAYA", value: "BIAYA" },
        { text: "LABORATORIUM PENGUJIAN", value: "LABORATORIUM_PENGUJIAN" },
        { text: "HASIL MEMENUHI SYARAT", value: "HASIL_MEMENUHI_SYARAT" },
        {
          text: "HASIL TIDAK MEMENUHI SYARAT",
          value: "HASIL_TIDAK_MEMENUHI_SYARAT",
        },
        { text: "Edit", value: "actEdit" },
        { text: "Remove", value: "actRemove" },
      ],
      items: [],
      itemThn: ListTahun,
      selectThn: new Date().getFullYear(),
      urlApi: this.$apiUrl + "/data-sampling",
    };
  },
  methods: {
    toggle: function() {
      this.fetchData(0);
    },
    changePilihThn: function () {
      console.log(this.selectThn);
      this.fetchData(this.selectThn);
    },
    fetchData: function (thn) {
      if (thn !== 0) {
        this.urlApi = this.$apiUrl + `/data-sampling?thn=${thn}`;
      } else {
        this.urlApi = this.$apiUrl + "/data-sampling"
      }
      this.$http.get(this.urlApi).then((res) => {
        this.items = res.data.data;
        console.log(this.items);
      });
    },
    removeItem: function (item) {
      if (confirm("Apakah anda yakin ingin menghapus data ini?")) {
        this.$http
          .get(this.$apiUrl + "/data-sampling/remove?id=" + item.id)
          .then((res) => {
            if (res.data.status == 1) {
              this.fetchData();
            } else {
              alert("Terjadi kesalahan!");
            }
          });
      }
    },
    editItem: function (item) {
      this.isUpdate = true;
      this.idUpdate = item.id;
      let dataForm = {
        kabkot: item.KABKOTA,
        tahun: parseInt(item.TAHUN),
        kodeSampling: item.KODE_SAMPLING,
        jenisProduk: item.JENIS_PRODUK,
        noRegistrasi: item.NO_REGISTRASI,
        noBatch: item.NO_BATCH,
        jumlahSampel: item.JUMLAH_SAMPEL_UNTUK_PENGUJIAN,
        kemasan: item.KEMASAN,
        alamatSaranaPembelian: item.ALAMAT_SARANA_PEMBELIAN,
        produsen: item.PRODUSEN,
        parameterUji: item.PARAMETER_UJI,
        biaya: item.BIAYA,
        laboratorium: item.LABORATORIUM_PENGUJIAN,
        hasilMemenuhiSyarat: item.HASIL_MEMENUHI_SYARAT,
        hasilTdkMemenuhiSyarat: item.HASIL_TIDAK_MEMENUHI_SYARAT,
      };

      this.$router.push({
        name: "EditDataSampling",
        params: {
          isUpdate: this.isUpdate,
          idUpdate: item.id,
          form: dataForm,
        },
      });
    },
  },
  watch: {
    property: {
      immediate: true,
      handler: function () {
        this.fetchData(0);
      },
    },
  },
  created() {
    if (this.$store.getters.userData.JENIS_LOGIN == "provinsi") {
      this.idDaerah = 32;
    } else {
      this.idDaerah = this.$store.getters.userData.KODE_DAERAH;
    }
    this.jenisLogin = this.$store.getters.userData.JENIS_LOGIN;
  },
};
</script>