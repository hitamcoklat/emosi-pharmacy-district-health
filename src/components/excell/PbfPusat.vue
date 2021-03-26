<template>
  <div>
    <v-btn v-if="showButtonExport" @click="exportAsExcel" style="margin: 1em" color="green" dark small
      >Export Data</v-btn
    >    
    <vue-excel-editor v-model="itemData" ref="grid">
      <vue-excel-column
        width="200px"
        field="namaPerusahaan"
        label="Nama Perusahaan"
      />
      <vue-excel-column
        width="200px"
        field="nomorSertifikat"
        label="Nomor Sertifikat"
      />
      <vue-excel-column
        width="200px"
        field="tanggalTerbitSertifikat"
        label="Tanggal Terbit Sertifikat"
      />
      <vue-excel-column
        width="200px"
        field="nomorAdendum"
        label="Nomor Adendum"
      />
      <vue-excel-column
        width="200px"
        field="tanggalTerbitAdendum"
        label="Tanggal Terbit Adendum"
      />
      <vue-excel-column width="200px" field="nib" label="N I B" />
      <vue-excel-column
        width="200px"
        field="alamatPerusahaan"
        label="Alamat Perusahaan"
      />
      <vue-excel-column width="200px" field="kabKota" label="Kabupaten/Kota" />
      <vue-excel-column width="200px" field="provinsi" label="Provinsi" />
      <vue-excel-column
        width="200px"
        field="telpPerusahaan"
        label="Telepon Perusahaan"
      />
      <vue-excel-column width="200px" field="email" label="Email" />
      <vue-excel-column
        width="200px"
        field="statusPemodalan"
        label="Status Pemodalan"
      />
      <vue-excel-column width="200px" field="nomorNpwp" label="N P W P" />
      <vue-excel-column
        width="200px"
        field="namaDirektur"
        label="Nama Direktur"
      />
      <vue-excel-column width="200px" field="jenisPbf" label="Jenis PBF" />
      <vue-excel-column
        width="200px"
        field="namaPenanggungJawabKantor"
        label="Nama Penanggung Jawab Kantor"
      />
      <vue-excel-column
        width="200px"
        field="nomorStraKantor"
        label="Nomor STRA Kantor"
      />
      <vue-excel-column
        width="200px"
        field="noHpPenanggungJawabKantor"
        label="No Hp Penanggung Jawab Kantor"
      />
      <vue-excel-column
        width="200px"
        field="emailPenanggungJawabKantor"
        label="Email Penanggung Jawab Kantor"
      />
      <vue-excel-column
        width="200px"
        field="alamatKantorPbf"
        label="Alamat Kantor PBF"
      />
      <vue-excel-column
        width="200px"
        field="alamatKantorKabkota"
        label="Alamat Kantor Kab/Kota"
      />
      <vue-excel-column
        width="200px"
        field="alamatKantorProvinsi"
        label="Alamat Kantor Provinsi"
      />
      <vue-excel-column width="200px" field="namaGudang" label="Nama Gudang" />
      <vue-excel-column
        width="200px"
        field="nomorStraGudang"
        label="Nomor STRA Gudang"
      />
      <vue-excel-column
        width="200px"
        field="alamatGudang"
        label="Alamat Gudang"
      />
      <vue-excel-column
        width="200px"
        field="alamatGudangKabkota"
        label="Alamat Gudang Kab/Kota"
      />
      <vue-excel-column
        width="200px"
        field="alamatGudangKabkotaProvinsi"
        label="Alamat Gudang Provinsi"
      />
      <vue-excel-column
        width="200px"
        field="gudangTambahan1"
        label="Gudang Tambahan 1"
      />
      <vue-excel-column
        width="200px"
        field="nomorStraGudangTambahan1"
        label="Nomor STRA Gudang Tambahan 1"
      />
      <vue-excel-column
        width="200px"
        field="alamatGudangTambahan1"
        label="Alamat Gudang Tambahan 1"
      />
      <vue-excel-column
        width="200px"
        field="alamatGudangTambahan1Kabkota"
        label="Alamat Gudang Tambahan 1 (Kab/Kota)"
      />
      <vue-excel-column
        width="200px"
        field="alamatGudangTambahan1Provinsi"
        label="Alamat Gudang Tambahan 1 (Provinsi)"
      />
      <vue-excel-column
        width="200px"
        field="gudangTambahan2"
        label="Gudang Tambahan 2"
      />
      <vue-excel-column
        width="200px"
        field="nomorStraGudangTambahan2"
        label="Nomor STRA Gudang Tambahan 2"
      />
      <vue-excel-column
        width="200px"
        field="alamatGudangTambahan2"
        label="Alamat Gudang Tambahan 2"
      />
      <vue-excel-column
        width="200px"
        field="alamatGudangTambahan2Kabkota"
        label="Alamat Gudang Tambahan 2 (Kab/Kota)"
      />
      <vue-excel-column
        width="200px"
        field="alamatGudangTambahan2Provinsi"
        label="Alamat Gudang Tambahan 2 (Provinsi)"
      />
      <vue-excel-column
        width="200px"
        field="gudangTambahan3"
        label="Gudang Tambahan 3"
      />
      <vue-excel-column
        width="200px"
        field="nomorStraGudangTambahan3"
        label="Nomor STRA Gudang Tambahan 3"
      />
      <vue-excel-column
        width="200px"
        field="alamatGudangTambahan3"
        label="Alamat Gudang Tambahan 3"
      />
      <vue-excel-column
        width="200px"
        field="alamatGudangTambahan3Kabkota"
        label="Alamat Gudang Tambahan 3 (Kab/Kota)"
      />
      <vue-excel-column
        width="200px"
        field="alamatGudangTambahan3Provinsi"
        label="Alamat Gudang Tambahan 3 (Provinsi)"
      />
      <vue-excel-column width="200px" field="alamatLab1" label="Alamat Lab 1" />
      <vue-excel-column width="200px" field="alamatLab2" label="Alamat Lab 2" />
      <vue-excel-column
        width="200px"
        field="alamatLabGudangTambahan1"
        label="Alamat Lab Tambahan 1"
      />
      <vue-excel-column
        width="200px"
        field="alamatLabGudangTambahan2"
        label="Alamat Lab Tambahan 2"
      />
      <vue-excel-column
        width="200px"
        field="alamatLabGudangTambahan3"
        label="Alamat Lab Tambahan 3"
      />
      <vue-excel-column width="200px" field="cek" label="Cek" />
    </vue-excel-editor>
  </div>
</template>
<script>
export default {
  props: ["itemData", "showButtonExport"],
  data() {
      return {
          
      }
  },
  methods: {
    exportAsExcel() {
      const format = "xlsx";
      const exportSelectedOnly = true;
      const filename = "exportData";
      this.$refs.grid.exportTable(format, exportSelectedOnly, filename);
    },    
  }  
};
</script>