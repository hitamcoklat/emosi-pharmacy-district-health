<template>
  <div>
    <v-btn v-if="showButtonExport" @click="exportAsExcel" style="margin: 1em" color="green" dark small
      >Export Data</v-btn
    >
    <vue-excel-editor v-model="itemData" ref="grid">
      <vue-excel-column
        width="200px"
        field="nomorPermohonan"
        label="Nomor Permohonan"
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
        field="pusatCabang"
        label="Pusat / Cabang"
      />
      <vue-excel-column
        width="200px"
        field="alamatPerusahaan"
        label="Alamat Perusahaan"
      />
      <vue-excel-column width="200px" field="provinsi" label="Provinsi" />
      <vue-excel-column width="200px" field="kabKota" label="Kabupaten/Kota" />
      <vue-excel-column
        width="200px"
        field="alamatGudang"
        label="Alamat Gudang"
      />
      <vue-excel-column
        width="200px"
        field="provinsiGudang"
        label="Provinsi Gudang"
      />
      <vue-excel-column
        width="200px"
        field="kabKotaGudang"
        label="Kab./Kota Gudang"
      />
      <vue-excel-column
        width="200px"
        field="alamatBengkel"
        label="Alamat Bengkel"
      />
      <vue-excel-column
        width="200px"
        field="provinsiBengkel"
        label="Provinsi Bengkel"
      />
      <vue-excel-column
        width="200px"
        field="kabKotaBengkel"
        label="Kab./Kota Bengkel"
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
        field="kategoriDisalurkan"
        label="Kategori Disalurkan"
      />
      <vue-excel-column
        width="200px"
        field="jenisProduk"
        label="Jenis Produk"
      />
      <vue-excel-column
        width="200px"
        field="jenisPerubahan"
        label="Jenis Perubahan"
      />
      <vue-excel-column width="200px" field="email" label="Email" />
      <vue-excel-column width="200px" field="telp" label="Telp." />
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