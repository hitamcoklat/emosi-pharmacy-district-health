<template>
  <div>
    <SubMenu />
    <v-content class="pl-0">
      <v-container>
        <v-row no-gutters>
          <v-col sm="6" lg="6">
            <v-row no-gutters>
              <v-col sm="2" md="2" lg="2"
                ><v-btn @click="$router.go(-1)" color="default" elevation="0"
                  ><v-icon size="18">mdi-arrow-left-bold-circle</v-icon></v-btn
                ></v-col
              >
              <v-col sm="10" md="10" lg="10">
                <p style="font-weight: bold; font-size: 1.3em">
                  {{ title }}
                </p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <div class="my-2">
          <v-row v-if="!saveBtn" no-gutters>
            <v-alert border="left" colored-border type="info" elevation="1">
              Silahkan download terlebih dahulu template lalu sesuaikan data
              dengan template yang ada.
            </v-alert>
          </v-row>
          <v-row no-gutters>
            <v-col sm="3" md="3">
              <v-btn
                @click="downloadTemplate"
                style="margin-right: 1em"
                color="success"
                >Download Template</v-btn
              >
            </v-col>
            <v-col style="margin-left: 1em" sm="3" md="3">
              <v-file-input
                dense
                id="templateExcell"
                @change="uploadTemplate()"
                outlined=""
                label="Upload Template"
              ></v-file-input>
            </v-col>
            <v-col v-if="saveBtn" sm="1" md="1" lg="1">
              <v-btn @click="btnSubmit" style="margin-left: 1em" color="primary"
                >Simpan</v-btn
              >
            </v-col>
          </v-row>
          <v-row v-if="saveBtn" no-gutters>
            <v-alert border="left" colored-border type="warning" elevation="1">
              Mohon di cek kembali data yang akan di import.
            </v-alert>
          </v-row>
        </div>
        <div>
          <vue-excel-editor v-model="itemData"></vue-excel-editor>
        </div>
      </v-container>
    </v-content>
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
    <!-- Loading Login -->
  </div>
</template>

<script>
import routeList from "@/views/pages/sarkes/routeList";
import readXlsxFile from "read-excel-file";
import SubMenu from "../../SubMenu";

export default {
  name: "Oblik",
  data() {
    return {
      items: routeList,
      itemData: [],
      right: null,
      dialogLoading: false,
      idDaerah: "",
      id: "",
      saveBtn: false,
      tableName: "",
      title: "",
      jsondata: [
        {
          user: "hc",
          name: "Harry Cole",
          phone: "1-415-2345678",
          gender: "M",
          age: 25,
          birth: "1997-07-01",
        },
        {
          user: "sm",
          name: "Simon Minolta",
          phone: "1-123-7675682",
          gender: "M",
          age: 20,
          birth: "1999-11-12",
        },
        {
          user: "ra",
          name: "Raymond Atom",
          phone: "1-456-9981212",
          gender: "M",
          age: 19,
          birth: "2000-06-11",
        },
        {
          user: "ag",
          name: "Mary George",
          phone: "1-556-1245684",
          gender: "F",
          age: 22,
          birth: "2002-08-01",
        },
        {
          user: "kl",
          name: "Kenny Linus",
          phone: "1-891-2345685",
          gender: "M",
          age: 29,
          birth: "1990-09-01",
        },
      ],
    };
  },
  components: {
    SubMenu,
  },
  computed: {},
  methods: {
    downloadTemplate: function () {
      window.open(`${this.$downloadTemplate}/template-pusat.xlsx`, "_blank");
    },

    btnSubmit: function () {
      let data = {
        content: this.itemData,
      };

      let url =
        this.$apiUrl + "/sarkes/insert-template-pusat?tbl=" + this.tableName;

      this.dialogLoading = true;
      this.$http.post(url, data).then((response) => {
        this.dialogLoading = false;
        if (response.data.status == true) {
          this.$swal("Success!", "Data Berhasil di Input!", "success");
          this.isUpdate = true;
        } else {
        }
      });
    },

    uploadTemplate: function () {
      //   this.dialogLoading = true;
      this.itemData = [];
      const input = document.getElementById("templateExcell");

      let dataHeader = [
        "no",
        "nomorPerusahaan",
        "namaPerusahaan",
        "npwp",
        "nib",
        "alamatPerusahaan",
        "provinsi",
        "kabKota",
        "alamatPabrik",
        "provinsiPabrik",
        "kabkotaPabrik",
        "nomorSertifikat",
        "tanggalTerbit",
        "tanggalExpired",
        "kategoriYangDiProduksi",
        "jenisProduksi",
        "jenisPermohonan",
        "jenisPerubahan",
        "emailKantor",
        "telpKantor",
      ];

      readXlsxFile(input.files[0]).then((rows) => {
        let dataItem = [];
        let newHead = [];
        let newCuy = {};
        try {
          for (var i = 1; i <= rows.length; i++) {
            var dataR = rows[i];
            for (var j = 0; j <= dataHeader.length; j++) {
              newHead[dataHeader[j]] = dataR[j];
            }
            // console.log(newHead)
            newCuy[i] = {...newHead};
          }
        } catch (error) {}
        // console.log('newCuy', newCuy)
        // console.log('jsondata', this.jsondata)

        this.itemData = newCuy
        console.log(this.itemData)
        console.log(this.jsondata)
      });
    },
  },
  created() {
    if (this.$store.getters.userData.JENIS_LOGIN == "provinsi") {
      this.idDaerah = 32;
    } else {
      this.idDaerah = this.$store.getters.userData.KODE_DAERAH;
    }
    this.tableName = this.$route.params.tableName;
    this.title = this.$route.params.title;
  },
};
</script>
