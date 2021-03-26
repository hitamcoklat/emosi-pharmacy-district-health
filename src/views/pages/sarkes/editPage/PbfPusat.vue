<template>
  <div>
    <SubMenu />
    <v-content class="pl-0">
      <v-container>
        <p style="font-weight: bold; font-size: 1.3em" class="mt-n12 mx-auto">
          Edit PBF Pusat
        </p>
        <v-row no-gutters>
          <v-col style="margin-bottom: 1em" cols="6" md="6" sm="12" lg="6">
            <v-row no-gutters>
              <v-col style="padding-right: 1em" cols="6" md="6" sm="6" lg="6">
                <v-btn
                  @click="
                    $router.push({
                      name: 'PBFarmasi',
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
              v-model="content.alamatPerusahaan"
              :value="content.alamatPerusahaan"
              label="Alamat Perusahaan"
            ></v-textarea>
            <v-text-field
              outlined
              v-model="content.nomorSertifikat"
              :value="content.nomorSertifikat"
              label="Nomor Sertifikat"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.tanggalTerbitSertifikat"
              :value="content.tanggalTerbitSertifikat"
              label="Tanggal Terbit Sertifikat"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.nomorAdendum"
              :value="content.nomorAdendum"
              label="Nomor Adendum"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.tanggalTerbitAdendum"
              :value="content.tanggalTerbitAdendum"
              label="Tanggal Terbit Adendum"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.nib"
              :value="content.nib"
              label="N I B"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.alamatPerusahaan"
              :value="content.alamatPerusahaan"
              label="Alamat Perusahaan"
            ></v-text-field>

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
              v-model="content.provinsi"
              :value="content.provinsi"
              label="Provinsi"
            ></v-textarea>
            <v-text-field
              outlined
              v-model="content.telpPerusahaan"
              :value="content.telpPerusahaan"
              label="Telpon Perusahaan"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.email"
              :value="content.email"
              label="Email"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.statusPemodalan"
              :value="content.statusPemodalan"
              label="Status Pemodalan"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.nomorNpwp"
              :value="content.nomorNpwp"
              label="Nomor NPWP"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.namaDirektur"
              :value="content.namaDirektur"
              label="Nama Direktur"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.jenisPbf"
              :value="content.jenisPbf"
              label="Jenis PBF"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.namaPenanggungJawabKantor"
              :value="content.namaPenanggungJawabKantor"
              label="Nama Penanggung Jawab Kantor"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.nomorStraKantor"
              :value="content.nomorStraKantor"
              label="Nomor STRA Kantor"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.noHpPenanggungJawabKantor"
              :value="content.noHpPenanggungJawabKantor"
              label="No HP Penanggung Jawab Kantor"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.emailPenanggungJawabKantor"
              :value="content.emailPenanggungJawabKantor"
              label="Email Penanggung Jawab Kantor"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.alamatKantorPbf"
              :value="content.alamatKantorPbf"
              label="Alamat Kantor PBF"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.alamatKantorKabkota"
              :value="content.alamatKantorKabkota"
              label="Alamat Kantor KabKota"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.alamatKantorProvinsi"
              :value="content.alamatKantorProvinsi"
              label="Alamat Kantor Provinsi"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.namaGudang"
              :value="content.namaGudang"
              label="Nama Gudang"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.nomorStraGudang"
              :value="content.nomorStraGudang"
              label="Nomor STRA Gudang"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.alamatGudang"
              :value="content.alamatGudang"
              label="Alamat Gudang"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.alamatGudangKabkota"
              :value="content.alamatGudangKabkota"
              label="Alamat Gudang Kab/Kota"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.alamatGudangKabkotaProvinsi"
              :value="content.alamatGudangKabkotaProvinsi"
              label="Alamat Gudang Kab/Kota Provinsi"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.gudangTambahan1"
              :value="content.gudangTambahan1"
              label="Gudang Tambahan 1"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.nomorStraGudangTambahan1"
              :value="content.nomorStraGudangTambahan1"
              label="Nomor STRA Gudang Tambahan 1"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.alamatGudangTambahan1"
              :value="content.alamatGudangTambahan1"
              label="Alamat Gudang Tambahan 1"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.alamatGudangTambahan1Kabkota"
              :value="content.alamatGudangTambahan1Kabkota"
              label="Alamat Gudang Tambahan 1 Kab/Kota"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.alamatGudangTambahan1Provinsi"
              :value="content.alamatGudangTambahan1Provinsi"
              label="Alamat Gudang Tambahan 1 Provinsi"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.gudangTambahan2"
              :value="content.gudangTambahan2"
              label="Gudang Tambahan 2"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.nomorStraGudangTambahan2"
              :value="content.nomorStraGudangTambahan2"
              label="Nomor STRA Gudang Tambahan 2"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.alamatGudangTambahan2"
              :value="content.alamatGudangTambahan2"
              label="Alamat Gudang Tambahan 2"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.alamatGudangTambahan2Kabkota"
              :value="content.alamatGudangTambahan2Kabkota"
              label="Alamat Gudang Tambahan 2 Kab/Kota"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.alamatGudangTambahan2Provinsi"
              :value="content.alamatGudangTambahan2Provinsi"
              label="Alamat Gudang Tambahan 2 Provinsi"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.gudangTambahan3"
              :value="content.gudangTambahan3"
              label="Gudang Tambahan 3"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.nomorStraGudangTambahan3"
              :value="content.nomorStraGudangTambahan3"
              label="Nomor STRA Gudang Tambahan 3"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.alamatGudangTambahan3"
              :value="content.alamatGudangTambahan3"
              label="Alamat Gudang Tambahan 3"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.alamatGudangTambahan3Kabkota"
              :value="content.alamatGudangTambahan3Kabkota"
              label="Alamat Gudang Tambahan 3 Kab/Kota"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.alamatGudangTambahan3Provinsi"
              :value="content.alamatGudangTambahan3Provinsi"
              label="Alamat Gudang Tambahan 3 Provinsi"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.alamatLab1"
              :value="content.alamatLab1"
              label="Alamat Lab 1"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.alamatLab2"
              :value="content.alamatLab2"
              label="Alamat Lab 2"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.alamatLabGudangTambahan1"
              :value="content.alamatLabGudangTambahan1"
              label="Alamat Lab Gudang Tambahan 1"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.alamatLabGudangTambahan2"
              :value="content.alamatLabGudangTambahan2"
              label="Alamat Lab Gudang Tambahan 2"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.alamatLabGudangTambahan3"
              :value="content.alamatLabGudangTambahan3"
              label="Alamat Lab Gudang Tambahan 3"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.cek"
              :value="content.cek"
              label="Cek"
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
        .put(this.$apiUrl + "/sarkes/input-verifikasi?t_name=verif_pbf_pusat", {
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
            "/sarkes/remove-verifikasi?t_name=verif_pbf_pusat&id=" +
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
