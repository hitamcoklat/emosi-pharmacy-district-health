<template>
  <div>
    <SubMenu />
    <v-content class="pl-0">
      <v-container>
        <p style="font-weight: bold; font-size: 1.3em" class="mt-n12 mx-auto">
          Edit U K O T
        </p>
        <v-row no-gutters>
          <v-col style="margin-bottom: 1em" cols="6" md="6" sm="12" lg="6">
            <v-row no-gutters>
              <v-col style="padding-right: 1em" cols="6" md="6" sm="6" lg="6">
                <v-btn
                  @click="
                    $router.push({
                      name: 'Ukot',
                      params: { contentQuery: content.n_perusahaan }
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
              v-model="content.Alamat_Gudang"
              :value="content.Alamat_Gudang"
              label="Alamat Gudang"
            ></v-textarea>
            <small>{{ content.Kab_Kota_Gudang }}</small>
            <v-select
              :items="listKabkot"
              item-value="namaKabkot"
              item-text="namaKabkot"
              label="Kabupaten/Kota"
              outlined
              v-model="content.Kab_Kota_Gudang"
            ></v-select>
            <v-text-field
              outlined
              v-model="content.Nama_PJT"
              :value="content.Nama_PJT"
              label="Nama PJT"
            ></v-text-field>
            <v-textarea
              outlined
              v-model="content.a_perusahaan"
              :value="content.a_perusahaan"
              label="Alamat Perusahaan"
            ></v-textarea>
            <v-text-field
              outlined
              v-model="content.link_naskahizin"
              :value="content.link_naskahizin"
              label="Link Naskah Izin"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.n_perusahaan"
              :value="content.n_perusahaan"
              label="Nama Perizinan"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.nama_pimpinan"
              :value="content.nama_pimpinan"
              label="Nama Pimpinan"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.nib"
              :value="content.nib"
              label="N.I.B"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.no_izin"
              :value="content.no_izin"
              label="No Izin"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.telp_pemohon"
              :value="content.telp_pemohon"
              label="Telp. Pemohon"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="content.tgl_terbit_izin"
              :value="content.tgl_terbit_izin"
              label="Tgl. Terbit Izin"
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
      listKabkot: listKabkot,
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
        .put(this.$apiUrl + "/sarkes/input-verifikasi?t_name=verifukot", {
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
            "/sarkes/remove-verifikasi?t_name=verifukot&id=" +
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
