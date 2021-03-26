<template>
  <div>
    <v-btn
      v-if="showButtonExport"
      @click="exportAsExcel"
      style="margin: 1em"
      color="green"
      dark
      small
      >Export Data</v-btn
    >
    <vue-excel-editor v-model="itemData">
      <vue-excel-column
        width="200px"
        field="nomorPerusahaan"
        label="Nomor Perusahaan"
      />
      <vue-excel-column
        width="200px"
        field="namaPerusahaan"
        label="Nama Perusahaan"
      />
      <vue-excel-column width="200px" field="npwp" label="N P W P" />
      <vue-excel-column width="200px" field="nib" label="N I B" />
      <vue-excel-column
        width="200px"
        field="alamatPerusahaan"
        label="Alamat Perusahaan"
      />
      <vue-excel-column width="200px" field="provinsi" label="Provinsi" />
      <vue-excel-column width="200px" field="kabKota" label="Kab/Kota" />
      <vue-excel-column
        width="200px"
        field="alamatPabrik"
        label="Alamat Pabrik"
      />
      <vue-excel-column
        width="200px"
        field="provinsiPabrik"
        label="Provinsi Pabrik"
      />
      <vue-excel-column
        width="200px"
        field="kabkotaPabrik"
        label="Kabupaten/Kota Pabrik"
      />
      <vue-excel-column
        width="200px"
        field="nomorSertifikat"
        label="Nomor Sertifikat"
      />
      <vue-excel-column
        width="200px"
        field="tanggalTerbit"
        label="Tanggal Terbit"
      />
      <vue-excel-column
        width="200px"
        field="tanggalExpired"
        label="Tanggal Expired"
      />
      <vue-excel-column
        width="200px"
        field="kategoriYangDiProduksi"
        label="Kategori Yang di Produksi"
      />
      <vue-excel-column
        width="200px"
        field="jenisProduksi"
        label="Jenis Produksi"
      />
      <vue-excel-column
        width="200px"
        field="jenisPermohonan"
        label="Jenis Permohonan"
      />
      <vue-excel-column
        width="200px"
        field="jenisPerubahan"
        label="Jenis Perubahan"
      />
      <vue-excel-column
        width="200px"
        field="emailKantor"
        label="Email Kantor"
      />
      <vue-excel-column
        width="200px"
        field="telpKantor"
        label="Telepon Kantor"
      />
    </vue-excel-editor>
  </div>
</template>
<script>
export default {
  props: ["itemData", "showButtonExport"],
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
  },
};
</script>