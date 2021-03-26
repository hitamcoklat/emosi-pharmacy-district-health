<template>
  <fragment>
    <v-btn style="margin-left: 1em" depressed color="primary"
      ><v-icon size="18">mdi-table-large</v-icon></v-btn
    >
    <v-btn style="margin-left: 10px" depressed color="success"
      ><v-icon size="20">mdi-file-excel-outline</v-icon></v-btn
    >
    <v-btn
      style="margin-left: 10px"
      @click="inputVerif"
      depressed
      dark
      color="default"
      >Set Verifikasi</v-btn
    >
    <v-btn
      style="margin-left: 10px"
      @click="updateTutup"
      depressed
      dark
      color="warning"
      >Set Tutup</v-btn
    >
    <v-btn
      style="margin-left: 10px"
      @click="
        $router.push({
          name: routeNameTo,
          params: {
            title: title,
            tableName: tableName,
          },
        })
      "
      depressed
      dark
      color="primary"
      >Import Data</v-btn
    >
    <v-btn
      style="margin-left: 10px"
      depressed
      dark
      color="red"
      @click="removeData"
    >
      <v-icon size="20">mdi-close-box-multiple-outline</v-icon>
    </v-btn>
    <v-btn
      @click="checkVerif"
      style="margin-right: 10px; float: right"
      depressed
      color="default"
      ><v-icon>mdi-checkbox-multiple-marked</v-icon></v-btn
    >
  </fragment>
</template>
<script>
export default {
  props: ["itemCapa", "tblName", "title", "routeNameTo"],
  data() {
    return {};
  },
  methods: {
    exportAsExcel() {
      const format = "xlsx";
      const exportSelectedOnly = true;
      const filename = "exportData";
      this.$refs.grid.exportTable(format, exportSelectedOnly, filename);
    },
    inputVerif: function () {
      this.$emit("inputVerif");
    },
    checkVerif: function () {
      this.$emit("checkVerif");
    },
    removeData: function () {
      this.$emit("removeData");
    },
    updateTutup: function () {
      this.$emit("updateTutup");
    },
  },
  created() {
    console.log("kampret", this.itemCapa);
  },
};
</script>