<template>
  <div>
    <SubMenu />
    <v-content class="pl-0">
      <v-container>
        <p style="font-weight: bold; font-size: 1.3em" class="mt-n12 mx-auto">
          Edit Sertifikat Produksi A L K E S
        </p>
        <v-row no-gutters>
          <v-col style="margin-bottom: 1em" cols="6" md="6" sm="12" lg="6">
            <v-row no-gutters>
              <v-col style="padding-right: 1em" cols="6" md="6" sm="6" lg="6">
                <v-btn
                  @click="
                    $router.push({
                      name: 'SertifikatProdAlkes',
                      params: { contentQuery: content.namaPerusahaan }
                    })
                  "    
                  color="warning"
                  dark
                  depressed
                  block
                  >Kembali</v-btn
                >
              </v-col>
              <v-col style="padding-left: 1em" cols="6" md="6" sm="6" lg="6">
                <v-btn @click="updateData" color="success" dark depressed block
                  >Submit</v-btn
                >
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="6" md="6" sm="12" lg="6">
            <v-textarea
              outlined
              v-model="content.alamatPabrik"
              :value="content.alamatPabrik"
              label="Alamat Pabrik"
            ></v-textarea>
            <v-textarea
              outlined
              v-model="content.alamatPerusahaan"
              :value="content.alamatPerusahaan"
              label="Alamat Perusahaan"
            ></v-textarea>
            <v-text-field
              outlined
              v-model="content.namaPerusahaan"
              :value="content.namaPerusahaan"
              label="Nama Perusahaan"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.emailKantor"
              :value="content.emailKantor"
              label="Email Kantor"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.jenisPermohonan"
              :value="content.jenisPermohonan"
              label="Jenis Permohonan"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.jenisPerubahan"
              :value="content.jenisPerubahan"
              label="Jenis Perubahan"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.npwp"
              :value="content.npwp"
              label="N P W P"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.nib"
              :value="content.nib"
              label="N I B"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.nomorPerusahaan"
              :value="content.nomorPerusahaan"
              label="Nomor Perusahaan"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.nomorSertifikat"
              :value="content.nomorSertifikat"
              label="Nomor Sertifikat"
            ></v-text-field>
            <v-textarea
              outlined
              v-model="content.jenisProduksi"
              :value="content.jenisProduksi"
              label="Jenis Produksi"
            ></v-textarea>
            <v-textarea
              outlined
              v-model="content.kategoriYangDiProduksi"
              :value="content.kategoriYangDiProduksi"
              label="Kategori yang di produksi"
            ></v-textarea>
            <small>{{ content.kabKota }}</small>
            <v-select
              :items="listKabkot"
              item-value="namaKabkot"
              item-text="namaKabkot"
              label="Kabupaten/Kota"
              outlined
              v-model="content.kabKota"
            ></v-select>
            <v-textarea
              outlined
              v-model="content.alamatPerusahaan"
              :value="content.alamatPerusahaan"
              label="Alamat Perusahaan"
            ></v-textarea>
            <v-text-field
              outlined
              v-model="content.nomorSertifikat"
              :value="content.nomorSertifikat"
              label="No Sertifikat"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.telpKantor"
              :value="content.telpKantor"
              label="Telp. Kantor"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.tanggalTerbit"
              :value="content.tanggalTerbit"
              label="Tgl. Terbit"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.tanggalExpired"
              :value="content.tanggalExpired"
              label="Tgl. Expired"
            ></v-text-field>
            <v-row no-gutters>
              <v-col cols="12" md="12" sm="12" lg="12">
                <v-btn
                  @click="removeData"
                  color="red"
                  dark
                  depressed
                  large
                  block
                  >Hapus Data</v-btn
                >
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </div>
</template>

<style scoped>
</style>

<script>
import routeList from "@/views/pages/sarkes/routeList";
import SubMenu from "../SubMenu";
import listKabkot from "@/config/listKabkot";

export default {
  props: ["content"],
  data() {
    return {
      content: [],
      listKabkot: listKabkot
    };
  },
  components: {
    SubMenu,
  },
  computed: {},
  methods: {
    updateData: function () {
      let dataKirim = {
        id: this.content.ID,
        content: this.content,
      };
      this.$http
        .put(this.$apiUrl + "/sarkes/input-verifikasi?t_name=verif_ser_prod_alkes", {
          content: dataKirim,
        })
        .then((response) => {
          if (response.data.status == true) {
            this.$swal("Success!", "Data Berhasil di update!", "success");
          } else {
            alert("Terjadi kesalahan!");
          }
        });
    },
    removeData: function () {
      this.$http
        .get(
          this.$apiUrl +
            "/sarkes/remove-verifikasi?t_name=verif_ser_prod_alkes&id=" +
            this.content.ID
        )
        .then((response) => {
          if (response.data.status == true) {
            this.$swal("Success!", "Data Berhasil di hapus!", "success");
            this.$router.go(-1);
          } else {
            alert("Terjadi kesalahan!");
          }
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
    this.$store.commit("SET_STATUS_DATA", "verifikasi");
    console.log(this.content);
  },
};
</script>
