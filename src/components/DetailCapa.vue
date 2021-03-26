<template>
  <v-dialog v-model="propsDetailCapa" persistent max-width="490">
    <v-card style="padding-top: 1em">
      <v-card-text style="padding-top: 1em">
        <h3 style="margin-bottom: 1em">Detail Capa</h3>
        <p>Tanggal : {{ dataCapa.CAPA_TGL }}</p>
        <p>
          CAPA FILE/IMAGE :
          <a target="_blank" :href="dataCapa.CAPA_IMAGE">Lihat File</a>
        </p>
        <p>Status CAPA : {{ dataCapa.STATUS_CAPA }}</p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="tutupCapa"> Tutup </v-btn>
        <v-btn color="warning" @click="hapusCapa"> Reset </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["propsDetailCapa", "dataCapa", "tableName"],
  data() {
    return {
      // tableName: this.tableName
    };
  },
  methods: {
    tutupCapa: function () {
      this.$emit("emitTutupDetailCapa", true);
    },
    hapusCapa: function () {
      console.log("tableName", this.tableName);
      console.log("dataCapa", this.dataCapa);
      console.log("hapus capa");
      this.$http
        .get(`${this.$apiUrl}/sarkes/reset-capa?t_name=${this.tableName}&id=${this.dataCapa.ID}`)
        .then((res) => {
          if(res.data.status ==  true) {
            this.$swal("Success!", "CAPA berhasil di reset!", "success");
            this.$emit("emitTutupDetailCapa", true);
          } else {
            alert('Terjadi kesalahan!')
          }
        })
    },
  },
  created() {},
};
</script>