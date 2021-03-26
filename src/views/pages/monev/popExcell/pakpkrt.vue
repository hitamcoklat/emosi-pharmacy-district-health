<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false; tutupDialog()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Data Pedagang Besar Farmasi</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list three-line subheader>
          <v-subheader>.::Data Grid::.</v-subheader>
            <v-btn style="margin-left: 15px;" small color="primary" @click="exportTable('excel')">Export Excell</v-btn>
          <v-list-item>
            <v-list-item-content>
                <vue-excel-editor :page=50 v-model="itemData" autocomplete filter-row ref="grid">
                    <vue-excel-column field="no"   label="No" />
                    <vue-excel-column field="page_2_1"   label="Nama Badan Hukum Perusahaan" />
                    <vue-excel-column field="page_2_2"  label="Status Perusahaan" />
                    <vue-excel-column field="page_2_3" label="Alamat Kantor dan Telp/Fax" />
                    <vue-excel-column field="page_2_4"  label="Alamat Pabrik dan Telp/Fax" />
                    <vue-excel-column field="page_2_5"  label="Email Perusahaan" />
                    <vue-excel-column field="page_2_6"  label="Nama Pimpinan Perusahaan" />
                    <vue-excel-column field="page_2_7"  label="Nama Penanggung Jawab Teknis" />
                    <vue-excel-column field="page_2_8"  label="N P W P" />
                    <vue-excel-column field="page_2_9"  label="Nomor Sertifikat Produksi yang masih berlaku (Lampirkan)" />
                    
                    <vue-excel-column field="peralatan_kimia_klinik_dan_toksikologi_klinik"  label="Peralatan Kimia Klinik Dan Toksikologi Klinik" />
                    <vue-excel-column field="peralatan_hematologi_dan_patologi"  label="Peralatan Hematologi Dan Patologi" />
                    <vue-excel-column field="peralatan_imunologi_dan_mikrobiologi"  label="Peralatan Imunologi Dan Mikrobiologi" />
                    <vue-excel-column field="peralatan_anestesi"  label="Peralatan Anestesi" />
                    <vue-excel-column field="peralatan_kardiologi"  label="Peralatan Kardiologi" />
                    <vue-excel-column field="peralatan_telinga_hidung_dan_tenggorokan_tht"  label="Peralatan Telinga, Hidung Dan Tenggorokan (THT)" />
                    <vue-excel-column field="peralatan_gastroenterologi_urologi_gu"  label="Peralatan Gastroenterologi-Urologi (GU)" />
                    <vue-excel-column field="peralatan_rumah_sakit_umum_dan_perorangan_rsu_p"  label="Peralatan Rumah Sakit Umum Dan Perorangan (RSU & P)" />
                    <vue-excel-column field="peralatan_neurologi"  label="Peralatan Neurologi" />
                    <vue-excel-column field="peralatan_obstetrik_dan_ginekologi_og"  label="Peralatan Obstetrik Dan Ginekologi (OG)" />
                    <vue-excel-column field="peralatan_mata"  label="Peralatan Mata" />
                    <vue-excel-column field="peralatan_ortopedi"  label="Peralatan Ortopedi" />
                    <vue-excel-column field="peralatan_kesehatan_fisik"  label="Peralatan Kesehatan Fisik" />
                    <vue-excel-column field="peralatan_radiologi"  label="Peralatan Radiologi" />
                    <vue-excel-column field="peralatan_bedah_umum_dan_bedah_plastik"  label="Peralatan Bedah Umum Dan Bedah Plastik" />
                    <vue-excel-column field="kategori_alat_kesehatan_yang_diproduksi_lainnya"  label="Lainnya" />
                    <vue-excel-column field="tisu_dan_kapas"  label="Tisu Dan Kapas" />
                    <vue-excel-column field="sediaan_untuk_mencuci"  label="Sediaan Untuk Mencuci" />
                    <vue-excel-column field="pembersih"  label="Pembersih" />
                    <vue-excel-column field="produk_perawatan_bayi_dan_ibu"  label="Produk Perawatan Bayi Dan Ibu" />
                    <vue-excel-column field="antiseptika_dan_desinfektan"  label="Antiseptika Dan Desinfektan" />
                    <vue-excel-column field="pewangi"  label="Pewangi" />
                    <vue-excel-column field="pestisida_rumah_tangga"  label="Pestisida Rumah Tangga" />
                    <vue-excel-column field="kategori_pkrt_yang_diproduksi_lainnya"  label="Lainnya" />
                    <vue-excel-column field="status_perusahaan"  label="Status Perusahaan" />
                    <vue-excel-column field="skala_perusahaan"  label="Skala Perusaan" />
                    <vue-excel-column field="page_3_lokal_sendiri"  label="Status Produk Yang Diproduksi Lokal Sendiri" />
                    <vue-excel-column field="page_3_lisensi"  label="Status Produk Yang Diproduksi Lisensi" />
                    <vue-excel-column field="page_3_perakitan"  label="Status Produk Yang Diproduksi Perakitan" />
                    <vue-excel-column field="page_3_kemas_ulang"  label="Status Produk Yang Diproduksi Perakitan Kemas Ulang" />
                    <vue-excel-column field="page_3_khusus_ekspor"  label="Status Produk Yang Diproduksi Khusus Ekspor" />
                    <vue-excel-column field="page_3_orientasi_penjualan_dalam_negeri_dan_ekspor"  label="Orientasi Penjualan (% dalam negeri dan ekspor)" />
                    <vue-excel-column field="page_3_cpakb"  label="Sertifikat Yang Dimiliki CPAKB" />
                    <vue-excel-column field="page_3_cppkrtb"  label="Sertifikat Yang Dimiliki CPPKRTB" />
                    <vue-excel-column field="page_3_9001_sistem_manajemen_mutu"  label="ISO yang dimiliki 9001 - Sistem Manajemen Mutu" />
                    <vue-excel-column field="page_3_13485_sistem_manajemen_mutu_alkes"  label="ISO yang dimiliki 13485 – Sistem Manajemen Mutu - Alkes" />
                    <vue-excel-column field="page_3_14001_sistem_manajemen_lingkungan"  label="ISO yang dimiliki 14001 – Sistem Manajemen Lingkungan" />
                    <vue-excel-column field="page_3_iso_yang_dimiliki_lainnya"  label="ISO yang dimiliki Lainnya" />
                    
                    <vue-excel-column field="page_4_lokasi_pabrik"  label="Lokasi Pabrik" />
                    <vue-excel-column field="page_4_skala_perusahaan"  label="Bangunan Pabrik" />
                    <vue-excel-column field="page_4_ruang_administrasi_jumlah_luas"  label="Ruang Administrasi (Jumlah & Luas)" />
                    <vue-excel-column field="page_4_ruang_penyimpanan_bahan_baku_jumlah_luas"  label="Ruang Penyimpanan Bahan Baku (Jumlah & Luas)" />
                    <vue-excel-column field="page_4_ruang_karantina_jumlah_luas"  label="Ruang Karantina (Jumlah & Luas)" />
                    <vue-excel-column field="page_4_ruang_produksi_jumlah_luas"  label="Ruang Produksi (Jumlah & Luas)" />
                    <vue-excel-column field="page_4_ruang_pengemasan_jumlah_luas"  label="Ruang Pengemasan (Jumlah & Luas)" />
                    <vue-excel-column field="page_4_ruang_penyimpanan_barang_jadi_jumlah_luas"  label="Ruang Penyimpanan Barang Jadi (Jumlah & Luas)" />
                    <vue-excel-column field="page_4_laboratorium_qc_jumlah_luas"  label="Laboratorium QC (Jumlah & Luas)" />
                    <vue-excel-column field="page_4_ruang_bengkel_jumlah_luas"  label="Ruang Bengkel (Jumlah & Luas)" />
                    <vue-excel-column field="page_4_ruang_bersih_clean_room_jumlah_luas"  label="Ruang Bersih (Clean Room) (Jumlah & Luas)" />
                    <vue-excel-column field="page_4_nama_alkes_pkrt_yang_dimiliki_sesuai_sertifikat"  label="Nama Alkes/PKRT Yang Dimiliki Sesuai Sertifikat" />
                    <vue-excel-column field="page_4_nama_alat_kesehatan_pkrt_yang_masih_diproduksi_aktif_lampirkan_dan_kapasitas_produksi_rata_rata_bulan"  label="Nama Alat Kesehatan/PKRT Yang Masih Diproduksi/Aktif (Lampirkan) dan Kapasitas Produksi Rata-Rata / Bulan" />
                    <vue-excel-column field="page_4_nama_produk"  label="Penandaan / Labelling Alkes Yang Diproduksi Nama Produk" />
                    <vue-excel-column field="page_4_type_model"  label="Penandaan / Labelling Alkes Yang Diproduksi Type/Model" />
                    <vue-excel-column field="page_4_nomor_batch_lot_seri"  label="Penandaan / Labelling Alkes Yang Diproduksi Nomor Batch/Lot/Seri" />
                    <vue-excel-column field="page_4_tanggal_kadaluarsa"  label="Penandaan / Labelling Alkes Yang Diproduksi Tanggal Kadaluarsa" />
                    <vue-excel-column field="page_4_kemasan"  label="Penandaan / Labelling Alkes Yang Diproduksi Kemasan" />
                    <vue-excel-column field="page_4_nomor_izin_edar"  label="Penandaan / Labelling Alkes Yang Diproduksi Nomor Izin Edar" />
                    <vue-excel-column field="page_4_nama_pabrik"  label="Penandaan / Labelling Alkes Yang Diproduksi Nama Pabrik" />
                    <vue-excel-column field="page_4_alamat_pabrik"  label="Penandaan / Labelling Alkes Yang Diproduksi Alamat Pabrik" />
                    <vue-excel-column field="page_4_nama_penyalur_tunggal"  label="Penandaan / Labelling Alkes Yang Diproduksi Nama Penyalur Tunggal" />
                    <vue-excel-column field="page_4_alamat_penyalur"  label="Penandaan / Labelling Alkes Yang Diproduksi Alamat Penyalur" />
                    
                    <vue-excel-column field="page_5_laki_laki"  label="Laki-laki" />
                    <vue-excel-column field="page_5_perempuan"  label="Perempuan" />
                    <vue-excel-column field="page_5_nama"  label="Penanggung Jawab Teknis (PJT) Nama" />
                    <vue-excel-column field="page_5_ijazah_yang_dimiliki_minimal_d_3"  label="Penanggung Jawab Teknis (PJT) Ijazah Yang Dimiliki (Minimal D3)" />
                    <vue-excel-column field="page_5_sertifikat_pendukung"  label="Penanggung Jawab Teknis (PJT) Sertifikat Pendukung" />
                    <vue-excel-column field="page_5_bekerja_full_time"  label="Penanggung Jawab Teknis Bekerja Full Time" />
                    <vue-excel-column field="page_5_bekerja_full_time_lainnya"  label="Pilihan Lainnya" />
                    <vue-excel-column field="page_5_nama_dan_ijazah"  label="Nama dan Ijazah" />
                    <vue-excel-column field="page_5_nama_dan_sertifikasi_surat_izin_bekerja_dari_bapeten"  label="Nama dan Sertifikasi & Surat Izin Bekerja dari BAPETEN" />
                    
                    <vue-excel-column field="page_6_1"  label="Perusahaan Memiliki Pedoman Mutu" />
                    <vue-excel-column field="page_6_2"  label="Perusahaan Memiliki Kebijikan Mutu (Visi)" />
                    <vue-excel-column field="page_6_3"  label="Perusahaan Memiliki Sasaran Mutu (Misi)" />
                    <vue-excel-column field="page_6_4"  label="Perusahaan Memiliki Struktur Organisasi" />
                    <vue-excel-column field="page_6_5"  label="Perusahaan Memiliki Uraian Tugas Dan Tanggung Jawab Sesuai Struktur Organisasi" />
                    <vue-excel-column field="page_6_6"  label="Perusahaan Memiliki Prosedur Tetap (Protap) Pengendalian Dokumen (Cara Memperbaiki Dokumen/Kaji Ulang Dokumen Yang Mencakup Format, Isi, Pemberian Nomor, Penanggung Jawab, Ketentuan Tanggal Pemberlakuan, Peninjauan Kembali, Distribusi Dan Sebagainya)" />
                    <vue-excel-column field="page_6_7"  label="Perusahaan Memiliki Protap Pengendalian Rekaman" />
                    <vue-excel-column field="page_6_8"  label="Perusahaan Memiliki Protap Design Dan Pengembangan (Jika Ada)" />
                    <vue-excel-column field="page_6_9"  label="Perusahaan Memiliki Protap Pembelian Bahan Baku Dan Bahan Pengemas" />
                    <vue-excel-column field="page_6_10"  label="Perusahaan Memiliki Protap Penanganan Bahan Baku Dan Bahan Pengemas (Pemeriksaan Dan Penyimpanan)" />
                    <vue-excel-column field="page_6_11"  label="Perusahaan Memiliki Protap Terkait Proses Produksi (Penimbangan Dan Pembuatan)" />
                    <vue-excel-column field="page_6_12"  label="Perusahaan Memiliki Protap Penggunaan Fasilitas Bersama (Jika Ada)" />
                    <vue-excel-column field="page_6_13"  label="Perusahaan Memiliki Protap Pengawasan Mutu Produk (In-Process Control Dan Produk Jadi)" />
                    <vue-excel-column field="page_6_14"  label="Perusahaan Memiliki Protap Pemberian Penandaan Nomor Bets/Lot/Seri, Tanggal Kadaluwarsa/Tanggal Pembuatan." />
                    <vue-excel-column field="page_6_15"  label="Perusahaan Memiliki Protap Pengemasan Produk" />
                    <vue-excel-column field="page_6_16"  label="Perusahaan Memiliki Protap Penyimpanan Produk" />
                    <vue-excel-column field="page_6_17"  label="Perusahaan Memiliki Protap Pengendalian Produk Yang Tidak Sesuai" />
                    <vue-excel-column field="page_6_18"  label="Perusahaan Memiliki Protap Proses Sterilisasi Dan Validasi Steril (Jika Ada Produk Steril)" />
                    <vue-excel-column field="page_6_19"  label="Perusahaan Memiliki Protap Penyaluran Produk (Termasuk Jumlah, Nomor Bets/Lot/Seri, Nomor Izin Edar Dan Tujuannya)" />
                    <vue-excel-column field="page_6_20"  label="Tersedia Protap Pembersihan/Pemeliharan Setiap Peralatan Produksi" />
                    <vue-excel-column field="page_6_21"  label="Tersedia Protap Pembersihan/Pemeliharaan Setiap Ruangan Produksi" />
                    <vue-excel-column field="page_6_22"  label="Perusahaan Memiliki Protap Pengendalian Produk Dengan Umur Guna Terbatas Atau Memerlukan Penyimpanan Khusus Yang Dipersyaratkan (Jika Ada)" />
                    <vue-excel-column field="page_6_23"  label="Perusahaan Memiliki Protap Penanganan Produk Kembalian (Return)" />
                    <vue-excel-column field="page_6_24"  label="Perusahaan Memiliki Protap Penarikan Produk (Recall)" />
                    <vue-excel-column field="page_6_25"  label="Perusahaan Memiliki Protap Pemusnahan Produk" />
                    <vue-excel-column field="page_6_26"  label="Perusahaan Memiliki Protap Layanan Purna Jual,(Jika Ada)" />
                    <vue-excel-column field="page_6_27"  label="Perusahaan Memiliki Protap Pelatihan Teknis Tertentu (Jika Ada)" />
                    <vue-excel-column field="page_6_28"  label="Perusahaan Memiliki Protap Kalibrasi Dan Verifikasi Alat Periksa Dan Alat Ukur" />
                    <vue-excel-column field="page_6_29"  label="Perusahaan Memiliki Protap Audit Internal" />
                    <vue-excel-column field="page_6_30"  label="Perusahaan Memiliki Protap Penerimaan Dan Penanganan Keluhan Pelanggan Atau Customer Feedback" />
                    <vue-excel-column field="page_6_31"  label="Perusahaan Memiliki Protap Tindakan Perbaikan Dan Pencegahan" />
                    <vue-excel-column field="page_6_32"  label="Perusahaan Memiliki Protap Penanganan Limbah" />
                    <vue-excel-column field="page_6_33"  label="Perusahaan Memiliki Buku Kepustakaan Tentang Alkes/PKRT" />

                    <vue-excel-column field="page_7_1"  label="Perusahaan Memfasilitasi Karyawan Atau Penanggung Jawab Teknis Untuk Mengikuti Pelatihan CPAKB/ CPPKRTB Dan Rekamannya" />
                    <vue-excel-column field="page_7_2"  label="Perusahaan Memiliki Rekaman Pelatihan Teknis Tertentu Bagi Karyawan (Jika Ada)" />
                    <vue-excel-column field="page_7_3"  label="Perusahaan Memfasilitasi Karyawan Atau Penanggung Jawab Teknis Mengikuti Asistensi E-Report Dan E-Watch" />
                    <vue-excel-column field="page_7_4"  label="Perusahaan Telah Melapor Secara Berkala Hasil Produksi Dan Penyaluran Produk (E-Report)" />
                    <vue-excel-column field="page_7_5"  label="Perusahaan Telah Melapor Kejadian Tidak Diinginkan/ KTD (E-Watch) - (Jika Ada, Lampirkan)" />
                    <vue-excel-column field="page_7_6"  label="Ruang Administrasi Terpisah Dengan Ruangan Lain" />
                    <vue-excel-column field="page_7_7"  label="Ruang Administrasi Dengan Kapasitas Yang Memadai" />
                    <vue-excel-column field="page_7_8"  label="Tersedia Fasilitas Peralatan Untuk Administrasi" />
                    <vue-excel-column field="page_7_9"  label="Tersedia Fasilitas Penunjang Untuk Kebersihan" />
                    <vue-excel-column field="page_7_10"  label="Tersedia Fasilitas Penunjang Untuk Keamanan" />
                    <vue-excel-column field="page_7_11"  label="Tersedia Tanda Titik Kumpul Pada Perusahaan" />
                    <vue-excel-column field="page_7_12"  label="Ruang Penyimpanan Bahan Baku Dan Bahan Pengemas Terpisah Dengan Ruangan Lain" />
                    <vue-excel-column field="page_7_13"  label="Ruang Penyimpanan Bahan Baku Dan Bahan Pengemas Dengan Kapasitas Yang Memadai" />
                    <vue-excel-column field="page_7_14"  label="Kondisi Ruangan Bersih" />
                    <vue-excel-column field="page_7_15"  label="Ventilasi Memadai" />
                    <vue-excel-column field="page_7_16"  label="Penerangan Memadai" />
                    <vue-excel-column field="page_7_17"  label="Lantai Plester" />
                    <vue-excel-column field="page_7_18"  label="Dinding Plester" />
                    <vue-excel-column field="page_7_19"  label="Atap" />
                    <vue-excel-column field="page_7_20"  label="Tersedia Pengatur Suhu/Kelembaban (Sesuai Produk)" />
                    <vue-excel-column field="page_7_21"  label="Tersedia Pengontrol Suhu (Sesuai Produk)" />
                    <vue-excel-column field="page_7_22"  label="Tersedia Cool-Storage/Kulkas (Sesuai Produk)" />
                    <vue-excel-column field="page_7_23"  label="Tersedia Palet" />
                    <vue-excel-column field="page_7_24"  label="Tersedia Rak" />
                    <vue-excel-column field="page_7_25"  label="Tersedia Alat Pengangkut Bahan Baku Dan Bahan Pengemas" />
                    <vue-excel-column field="page_7_26"  label="Tersedia Alat Pemadam Kebakaran Ringan (APAR) Yang Berfungsi Baik" />
                    <vue-excel-column field="page_7_27"  label="Tersedia Kontrol Hama Dan Catatannya" />
                    <vue-excel-column field="page_7_28"  label="Tersedia Tanda Arah Evakuasi" />
                    <vue-excel-column field="page_7_29"  label="Tersedia Fasilitas Penunjang Untuk Kebersihan" />
                    <vue-excel-column field="page_7_30"  label="Tersedia Fasilitas Penunjang Untuk Keselamatan Kerja Karyawan(K3) Seperti Ear-Plug, Masker, Sarung Tangan, Dll" />
                    <vue-excel-column field="page_7_31"  label="Ruang Karantina Terpisah Dengan Ruangan Lain" />
                    <vue-excel-column field="page_7_32"  label="Ruang Karantina Dengan Kapasitas Yang Memadai" />
                    <vue-excel-column field="page_7_33"  label="Kondisi Ruangan Bersih" />
                    <vue-excel-column field="page_7_34"  label="Ventilasi Memadai" />
                    <vue-excel-column field="page_7_35"  label="Penerangan Memadai" />
                    <vue-excel-column field="page_7_36"  label="Lantai Plester" />
                    <vue-excel-column field="page_7_37"  label="Dinding Plester" />
                    <vue-excel-column field="page_7_38"  label="Atap" />
                    <vue-excel-column field="page_7_39"  label="Tersedia Pengatur Suhu/Kelembaban (Sesuai Produk)" />
                    <vue-excel-column field="page_7_40"  label="Tersedia Pengontrol Suhu (Sesuai Produk)" />
                    <vue-excel-column field="page_7_41"  label="Tersedia Cool-Storage/Kulkas (Sesuai Produk)" />
                    <vue-excel-column field="page_7_42"  label="Tersedia Palet" />
                    <vue-excel-column field="page_7_43"  label="Tersedia Rak" />
                    <vue-excel-column field="page_7_44"  label="Tersedia Alat Pengangkut Produk Yang Dikarantina" />
                    <vue-excel-column field="page_7_45"  label="Tersedia Alat Pemadam Kebakaran Ringan (APAR) Yang Berfungsi Baik" />
                    <vue-excel-column field="page_7_46"  label="Tersedia Kontrol Hama Dan Catatannya" />
                    <vue-excel-column field="page_7_47"  label="Tersedia Fasilitas Penunjang Untuk Kebersihan" />
                    <vue-excel-column field="page_7_48"  label="Tersedia Fasilitas Penunjang Untuk Keselamatan Kerja Karyawan(K3) Seperti Ear-Plug, Masker, Sarung Tangan, Dll" />

                    <vue-excel-column field="page_8_1"  label="Ruang Produksi Terpisah Dengan Ruangan Lain" />
                    <vue-excel-column field="page_8_2"  label="Ruang Produksi Dengan Kapasitas Yang Memadai Sesuai Volume/Jumlah Produksi" />
                    <vue-excel-column field="page_8_3"  label="Ruang Produksi Dibuat Terpisah Untuk Setiap Jenis/Bentuk Produk" />
                    <vue-excel-column field="page_8_4"  label="Tersedia Peralatan Produksi Yang Memadai Dalam Jumlah Dan Kapasitas Untuk Setiap Jenis Produk" />
                    <vue-excel-column field="page_8_5"  label="Fasilitas Ruang Produksi Kondisi Ruangan Bersih" />
                    <vue-excel-column field="page_8_6"  label="Fasilitas Ruang Produksi Ventilasi Memadai" />
                    <vue-excel-column field="page_8_7"  label="Fasilitas Ruang Produksi Penerangan Memadai" />
                    <vue-excel-column field="page_8_8"  label="Fasilitas Ruang Produksi Lantai Keramik" />
                    <vue-excel-column field="page_8_9"  label="Fasilitas Ruang Produksi Dinding Plester" />
                    <vue-excel-column field="page_8_10"  label="Fasilitas Ruang Produksi Atap Dengan Plavon" />
                    <vue-excel-column field="page_8_11"  label="Fasilitas Ruang Produksi Tersedia Pengatur Suhu/Kelembaban" />
                    <vue-excel-column field="page_8_12"  label="Fasilitas Ruang Produksi Tersedia Pengontrol Suhu" />
                    <vue-excel-column field="page_8_13"  label="Fasilitas Ruang Produksi Tersedia Cool-Storage/Kulkas (Sesuai Produk)" />
                    <vue-excel-column field="page_8_14"  label="Fasilitas Ruang Produksi Tersedia Palet" />
                    <vue-excel-column field="page_8_15"  label="Fasilitas Ruang Produksi Tersedia Rak" />
                    <vue-excel-column field="page_8_16"  label="Fasilitas Ruang Produksi Tersedia Alat Pengangkut Produk Jadi" />
                    <vue-excel-column field="page_8_17"  label="Fasilitas Ruang Produksi Tersedia Alat Pemadam Kebakaran Ringan (APAR) Yang Berfungsi Baik" />
                    <vue-excel-column field="page_8_18"  label="Fasilitas Ruang Produksi Tersedia Kontrol Hama Dan Catatannya" />
                    <vue-excel-column field="page_8_19"  label="Fasilitas Ruang Produksi Tersedia Sumber Air" />
                    <vue-excel-column field="page_8_20"  label="Fasilitas Ruang Produksi Tersedia Tanda Arah Evakuasi" />
                    <vue-excel-column field="page_8_21"  label="Fasilitas Ruang Produksi Tersedia Fasilitas Penunjang Untuk Kebersihan" />
                    <vue-excel-column field="page_8_22"  label="Fasilitas Ruang Produksi Tersedia Fasilitas Penunjang Untuk Keselamatan Kerja Karyawan(K3) Seperti Ear-Plug, Masker, Sarung Tangan, Dll" />
                    <vue-excel-column field="page_8_23"  label="Ruang Pengemasan Primer/Sekunder Yang Diatur Untuk Mencegah Kontaminasi Silang" />
                    <vue-excel-column field="page_8_24"  label="Fasilitas Ruang Pengemasan Kondisi Ruangan Bersih" />
                    <vue-excel-column field="page_8_25"  label="Fasilitas Ruang Pengemasan Ventilasi Memadai" />
                    <vue-excel-column field="page_8_26"  label="Fasilitas Ruang Pengemasan Penerangan Memadai" />
                    <vue-excel-column field="page_8_27"  label="Fasilitas Ruang Pengemasan Lantai Plester" />
                    <vue-excel-column field="page_8_28"  label="Fasilitas Ruang Pengemasan Dinding Plester" />
                    <vue-excel-column field="page_8_29"  label="Fasilitas Ruang Pengemasan Atap" />
                    <vue-excel-column field="page_8_30"  label="Fasilitas Ruang Pengemasan Tersedia Pengatur Suhu/Kelembaban" />
                    <vue-excel-column field="page_8_31"  label="Tersedia Pengontrol Suhu" />
                    <vue-excel-column field="page_8_32"  label="Fasilitas Ruang Pengemasan Tersedia Palet" />
                    <vue-excel-column field="page_8_33"  label="Fasilitas Ruang Pengemasan Tersedia Alat Pemadam Kebakaran Ringan (APAR) Yang Berfungsi Baik" />
                    <vue-excel-column field="page_8_34"  label="Fasilitas Ruang Pengemasan Tersedia Kontrol Hama Dan Catatannya" />
                    <vue-excel-column field="page_8_35"  label="Fasilitas Ruang Pengemasan Tersedia Fasilitas Penunjang Untuk Kebersihan" />
                    <vue-excel-column field="page_8_36"  label="Fasilitas Ruang Pengemasan Tersedia Fasilitas Penunjang Untuk Keselamatan Kerja Karyawan(K3) Seperti Ear-Plug, Masker, Sarung Tangan, Dll" />
                    
                    <vue-excel-column field="page_9_1"  label="Ruang Penyimpanan Produk Jadi Terpisah Dengan Ruangan Lain" />
                    <vue-excel-column field="page_9_2"  label="Ruang Penyimpanan Produk Jadi Dengan Kapasitas Yang Memadai" />
                    <vue-excel-column field="page_9_3"  label="Fasilitas Ruang Penyimpanan Produk Jadi Kondisi Ruangan Bersih" />
                    <vue-excel-column field="page_9_4"  label="Fasilitas Ruang Penyimpanan Produk Jadi Ventilasi Memadai" />
                    <vue-excel-column field="page_9_5"  label="Fasilitas Ruang Penyimpanan Produk Jadi Penerangan Memadai" />
                    <vue-excel-column field="page_9_6"  label="Fasilitas Ruang Penyimpanan Produk Jadi Lantai Plester" />
                    <vue-excel-column field="page_9_7"  label="Fasilitas Ruang Penyimpanan Produk Jadi Dinding Plester" />
                    <vue-excel-column field="page_9_8"  label="Fasilitas Ruang Penyimpanan Produk Jadi Atap" />
                    <vue-excel-column field="page_9_10"  label="Fasilitas Ruang Penyimpanan Produk Jadi Tersedia Pengontrol Suhu" />
                    <vue-excel-column field="page_9_11"  label="Fasilitas Ruang Penyimpanan Produk Jadi Tersedia Cool-Storage/Kulkas (Produk Tertentu)" />
                    <vue-excel-column field="page_9_12"  label="Fasilitas Ruang Penyimpanan Produk Jadi Tersedia Palet" />
                    <vue-excel-column field="page_9_13"  label="Fasilitas Ruang Penyimpanan Produk Jadi Tersedia Rak" />
                    <vue-excel-column field="page_9_14"  label="Fasilitas Ruang Penyimpanan Produk Jadi Tersedia Alat Pengangkut Produk Jadi" />
                    <vue-excel-column field="page_9_15"  label="Fasilitas Ruang Penyimpanan Produk Jadi Tersedia Alat Pemadam Kebakaran Ringan (APAR) Yang Berfungsi Baik" />
                    <vue-excel-column field="page_9_16"  label="Fasilitas Ruang Penyimpanan Produk Jadi Tersedia Kontrol Hama Dan Catatannya" />
                    <vue-excel-column field="page_9_17"  label="Fasilitas Ruang Penyimpanan Produk Jadi Tersedia Tanda Arah Evakuasi" />
                    <vue-excel-column field="page_9_18"  label="Fasilitas Ruang Penyimpanan Produk Jadi Tersedia Fasilitas Penunjang Untuk Kebersihan" />
                    <vue-excel-column field="page_9_19"  label="Fasilitas Ruang Penyimpanan Produk Jadi Tersedia Fasilitas Penunjang Untuk Keselamatan Kerja Karyawan(K3) Seperti Ear-Plug, Masker, Sarung Tangan, Dll" />
                    <vue-excel-column field="page_9_20"  label="Laboratorium QC Dengan Kapasitas Yang Memadai" />
                    <vue-excel-column field="page_9_21"  label="Fasilitas Laboratorium QC Kondisi Ruangan Bersih" />
                    <vue-excel-column field="page_9_22"  label="Fasilitas Laboratorium QC Ventilasi Memadai" />
                    <vue-excel-column field="page_9_23"  label="Fasilitas Laboratorium QC Penerangan Memadai" />
                    <vue-excel-column field="page_9_24"  label="Fasilitas Laboratorium QC Lantai Keramik" />
                    <vue-excel-column field="page_9_25"  label="Fasilitas Laboratorium QC Dinding Plester" />
                    <vue-excel-column field="page_9_26"  label="Fasilitas Laboratorium QC Atap Dengan Plavon" />
                    <vue-excel-column field="page_9_27"  label="Fasilitas Laboratorium QC Tersedia Pengatur Suhu/Kelembaban" />
                    <vue-excel-column field="page_9_28"  label="Fasilitas Laboratorium QC Tersedia Pengontrol Suhu" />
                    <vue-excel-column field="page_9_29"  label="Fasilitas Laboratorium QC Tersedia Cool-Storage/Kulkas (Produk Tertentu)" />
                    <vue-excel-column field="page_9_30"  label="Fasilitas Laboratorium QC Tersedia Peralatan Laboratorium" />
                    <vue-excel-column field="page_9_31"  label="Fasilitas Laboratorium QC Tersedia Alat Pemadam Kebakaran Ringan (APAR) Yang Berfungsi Baik" />
                    <vue-excel-column field="page_9_32"  label="Fasilitas Laboratorium QC Tersedia Kontrol Hama Dan Catatannya" />
                    <vue-excel-column field="page_9_33"  label="Fasilitas Laboratorium QC Tersedia Sumber Air" />
                    <vue-excel-column field="page_9_34"  label="Fasilitas Laboratorium QC Tersedia Fasilitas Penunjang Untuk Kebersihan" />
                    <vue-excel-column field="page_9_35"  label="Fasilitas Laboratorium QC Tersedia Fasilitas Penunjang Untuk Keselamatan Kerja Karyawan(K3) Seperti Ear-Plug, Masker, Sarung Tangan, Dll" />
                    <vue-excel-column field="page_9_36"  label="Ruang Bengkel Dengan Kapasitas Yang Memadai" />
                    <vue-excel-column field="page_9_37"  label="Fasilitas Bengkel Kondisi Ruangan Bersih" />
                    <vue-excel-column field="page_9_38"  label="Fasilitas Bengkel Ventilasi Memadai" />
                    <vue-excel-column field="page_9_39"  label="Fasilitas Bengkel Penerangan Memadai" />
                    <vue-excel-column field="page_9_40"  label="Fasilitas Bengkel Lantai Plester" />
                    <vue-excel-column field="page_9_41"  label="Fasilitas Bengkel Dinding Plester" />
                    <vue-excel-column field="page_9_42"  label="Fasilitas Bengkel Atap" />
                    <vue-excel-column field="page_9_43"  label="Fasilitas Bengkel Tersedia Peralatan Bengkel" />
                    <vue-excel-column field="page_9_44"  label="Fasilitas Bengkel Tersedia Alat Pemadam Kebakaran Ringan (APAR) Yang Berfungsi Baik" />
                    <vue-excel-column field="page_9_45"  label="Fasilitas Bengkel Tersedia Kontrol Hama Dan Catatannya" />
                    <vue-excel-column field="page_9_46"  label="Fasilitas Bengkel Tersedia Fasilitas Penunjang Untuk Kebersihan" />
                    <vue-excel-column field="page_9_47"  label="Fasilitas Bengkel Tersedia Fasilitas Penunjang Untuk Keamanan Listrik" />
                    <vue-excel-column field="page_9_48"  label="Fasilitas Bengkel RowTersedia Fasilitas Penunjang Untuk Keselamatan Kerja Karyawan(K3) Seperti Ear-Plug, Masker, Sarung Tangan, Dll 3" />
                    <vue-excel-column field="page_9_49"  label="Ruangan Penyimpanan Limbah (Padat Dan/Atau Cair) Sementara Apabila Limbah Dikelola Oleh Pihak Ketiga" />
                    <vue-excel-column field="page_9_50"  label="Tersedia Kontrak Kerjasama Dengan Pihak Ketiga" />
                    <vue-excel-column field="page_9_51"  label="Tersedia Fasilitas Pengolahan Limbah (Padat/Cair)" />
                    <vue-excel-column field="page_9_52"  label="Tersedia Rekaman Penyimpanan Dan/Atau Pengolahan Limbah (Padat/Cair)" />
                    
                    <vue-excel-column field="page_10_1"  label="Tersedia Spesifikasi Bahan Baku Dan Bahan Pengemas" />
                    <vue-excel-column field="page_10_2"  label="Tersedia Certificate Of Analysis (COA)" />
                    <vue-excel-column field="page_10_3"  label="Tersedia Rekaman Penerimaan Bahan Baku Dan Bahan Pengemas" />
                    <vue-excel-column field="page_10_4"  label="Tersedia Rekaman Penyimpanan Bahan Baku Dan Bahan Pengemas" />
                    <vue-excel-column field="page_10_5"  label="Tersedia Rekaman Penimbangan Bahan Baku Dan Bahan Pengemas (Jika Ada)" />
                    <vue-excel-column field="page_10_6"  label="Tersedia Rekaman Dan Label Pelulusan/Penolakan Bahan Baku Dan Bahan Pengemas" />
                    <vue-excel-column field="page_10_7"  label="Tersedia Rekaman Dan Label Penolakan Bahan Baku Dan Bahan Pengemas" />
                    <vue-excel-column field="page_10_8"  label="Tersedia Catatan/Kartu Stok Persediaan Bahan Baku Dan Bahan Pengemas" />
                    <vue-excel-column field="page_10_9"  label="Menerapkan Metode Penyimpanan Bahan Baku Dan Bahan Pengemas Secara (FIFO/ FEFO)" />
                    <vue-excel-column field="page_10_10"  label="Tersedia Rekaman Proses Produksi Dan Pengemasan" />
                    <vue-excel-column field="page_10_11"  label="Tersedia Rekaman Penggunaan Fasilitas Bersama (Jika Ada)" />
                    <vue-excel-column field="page_10_12"  label="Tersedia Nomor Izin Edar, Nomor Bets/Lot/Seri Dan Kadalwarsa Pada Kemasan Produk (Primer/Sekunder)" />
                    <vue-excel-column field="page_10_13"  label="Tersedia Rekaman Pembersihan/Pemeliharan Setiap Peralatan Produksi" />
                    <vue-excel-column field="page_10_14"  label="Tersedia Rekaman Pembersihan/Pemeliharaan Setiap Ruangan Produksi" />
                    <vue-excel-column field="page_10_15"  label="Tersedia Rekaman Penanganan Ketidak-Sesuaian Produk" />
                    <vue-excel-column field="page_10_16"  label="Tersedia Rekaman Hasil Pengujian/Pemeriksaan Produk (In-Process Control Dan Produk Jadi)" />
                    <vue-excel-column field="page_10_17"  label="Tersedia Sampel Pertinggal Produk Atau Dokumen Pertinggal Produk Untuk Setiap Nomor Bets/Lot/Seri" />
                    <vue-excel-column field="page_10_18"  label="Tersedia Rekaman Penyimpanan Produk Jadi" />
                    <vue-excel-column field="page_10_19"  label="Tersedia Rekaman Penyaluran Produk Jadi" />
                    <vue-excel-column field="page_10_20"  label="Menerapkan Metode Penyimpanan Dan Penyaluran Produk Jadi Secara (FIFO/ FEFO)" />
                    <vue-excel-column field="page_10_21"  label="Tersedia Rekaman Kalibrasi/Verifikasi Untuk Fasilitas Alat Periksa Atau Alat Ukur" />
                    <vue-excel-column field="page_10_22"  label="Tersedia Rekaman Layanan Jaminan Purna Jual Produk (Jika Ada)" />
                    <vue-excel-column field="page_10_23"  label="Perusahaan Memiliki Ruangan Khusus Untuk Produksi" />
                    <vue-excel-column field="page_10_24"  label="Perusahaan Memiliki Peralatan Khusus Untuk Produksi" />
                    <vue-excel-column field="page_10_25"  label="Perusahaan Memiliki Pakaian Khusus Untuk Produksi" />
                    <vue-excel-column field="page_10_26"  label="Perusahaan Memiliki Petugas Pengatur Radiasi Yang Bersertifikat Dan Surat Izin Bekerja Dari BAPETEN" />
                    <vue-excel-column field="page_10_27"  label="Perusahaan Melakukan Sterilisasi, Jika YA, Sterilisasi Dilakukan Secara: Aseptis" />
                    <vue-excel-column field="page_10_28"  label="Perusahaan Melakukan Sterilisasi, Jika YA, Sterilisasi Dilakukan Secara: Basah" />
                    <vue-excel-column field="page_10_29"  label="Perusahaan Melakukan Sterilisasi, Jika YA, Sterilisasi Dilakukan Secara: Kering" />
                    <vue-excel-column field="page_10_30"  label="Perusahaan Melakukan Sterilisasi, Jika YA, Sterilisasi Dilakukan Secara: Sinar Gamma" />
                    <vue-excel-column field="page_10_31"  label="Perusahaan Melakukan Sterilisasi, Jika YA, Sterilisasi Dilakukan Secara: Etilenoksida" />
                    <vue-excel-column field="page_10_32"  label="Perusahaan Melakukan Sterilisasi, Jika YA, Sterilisasi Dilakukan Secara: Lainnya" />
                    <vue-excel-column field="page_10_33"  label="Perusahaan Memiliki Ruangan Khusus" />
                    <vue-excel-column field="page_10_34"  label="Perusahaan Memiliki Peralatan Khusus" />
                    <vue-excel-column field="page_10_35"  label="Perusahaan Memiliki Pakaian Khusus" />
                    <vue-excel-column field="page_10_36"  label="Perusahaan Memiliki Rekaman Validasi Steril" />
                    <vue-excel-column field="page_10_37"  label="Jika TIDAK, Bekerjasama Dengan Fasilitas Sterilisasi Lain, Sebutkan ......" />
                    <vue-excel-column field="page_10_38"  label="Tersedia Rekaman Validasi Steril" />
                    <vue-excel-column field="page_10_39"  label="Perusahaan Memiliki Ruangan Khusus" />
                    <vue-excel-column field="page_10_40"  label="Perusahaan Memiliki Peralatan Khusus" />
                    <vue-excel-column field="page_10_41"  label="Perusahaan Memiliki Pakaian Khusus" />
                    <vue-excel-column field="page_10_42"  label="Perusahaan Memiliki Rekaman Validasi Kontrol Suhu Pada Cool Storage/Kulkas" />
                    <vue-excel-column field="page_10_43"  label="Perusahaan Memiliki Ruang Penyimpanan Limbah Bahan Beracun Dan Berbahaya (B3) Sementara, Apabila Dikelola Oleh Pihak Ketiga, Jika Ada" />
                    <vue-excel-column field="page_10_44"  label="Perusahaan Memiliki Fasilitas Pengolahan Limbah B3, Jika Ada" />
                    <vue-excel-column field="page_10_45"  label="Tersedia Rekaman Penanganan Produk Kembalian (Jika Ada)" />
                    <vue-excel-column field="page_10_46"  label="Tersedia Rekaman Penarikan Produk (Jika Ada)" />
                    <vue-excel-column field="page_10_47"  label="Tersedia Rekaman Pemusnahan Produk (Jika Ada, Lampirkan)" />
                    <vue-excel-column field="page_10_48"  label="Tersedia Laporan Sampling Produk Pada Peredaran" />
                    <vue-excel-column field="page_10_49"  label="Tersedia Rekaman Keluhan Dan Penanganan Keluhan Pelanggan Atau Customer Feedback (Jika Ada)" />
                    <vue-excel-column field="page_10_50"  label="Tersedia Rekaman Tindakan Perbaikan Dan Pencegahan (Jika Ada)" />
                    <vue-excel-column field="page_10_51"  label="Tersedia Program Audit Internal (Tim Dan Jadwal)" />
                    <vue-excel-column field="page_10_52"  label="Tersedia Rekaman Tindak Lanjut Setiap Temuan Audit Internal" />

                    <vue-excel-column field="page_11_1"  label="Tersedia Jaminan Kesehatan Karyawan (BPJS)" />
                    <vue-excel-column field="page_11_2"  label="Tersedia Fasilitas P3K Untuk Karyawan" />
                    <vue-excel-column field="page_11_3"  label="Tersedia Toilet Dan Kamar Ganti" />
                    <vue-excel-column field="page_11_4"  label="Tersedia Sarana Ibadah" />
                    <vue-excel-column field="page_11_5"  label="Tersedia Kantin" />
                    <vue-excel-column field="page_11_6"  label="Tersedia Fasilitas Penunjang Untuk Ibu Menyusui" />
                    <vue-excel-column field="page_11_7"  label="Tersedia Peraturan Harus Mencuci Tangan Dengan Sabun Sebelum Memasuki Ruang Produksi (Sesuai Produk)" />
                    <vue-excel-column field="page_11_8"  label="Tersedia Peraturan Dilarang Makan, Minum Dan Merokok Di Ruang Perusahaan" />
                    <vue-excel-column field="page_11_9"  label="Kesimpulan" />
                    <vue-excel-column field="page_11_10"  label="Saran dan Tindak Lanjut" />
                    
                    <vue-excel-column width="300px" field="files"  label="Dokumentasi Foto Pemeriksaan" />
                </vue-excel-editor> 
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </v-row>
</template>


<script>
  export default {
    props: ['dataMap', 'dialogExcell'],  
    data () {
      return {
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
        itemData: [],
        myLabels: {
            exportExcel: 'Export Excel',
        }
      }
    },
    methods: {
        tutupDialog: function(value) {
            this.$emit('dialog', value)
        },
        exportTable: function() {
            this.$refs.grid.exportTable('excell')
        },
        olahData: function() {
            let dataContent = this.dataMap;
            let dataItem = []
            this.itemData = []
            let no = 1;
            console.log(dataContent)
            for(let i = 0; i < dataContent.length; i++) {
                try {
                    
                    var d = dataContent[i].CONTENT.content
                    // var data_files = []
                    var data_fileLokasi = []
                    var data_files_string = ''

                    try {
                        for(let j = 0; j <= dataContent[i].CONTENT.data_file.length; j++) {
                            // data_files.push(dataContent[i].CONTENT.data_file[j].response.data.img)
                            data_files_string += dataContent[i].CONTENT.data_file[j].response.data.img + ', '
                        }                        
                    } catch (error) {
                        
                    }

                    dataItem = { 
                        no: no, 
                        page_2_1: d.page_2_1, 
                        page_2_2: d.page_2_2, 
                        page_2_3: d.page_2_3, 
                        page_2_4: d.page_2_4, 
                        page_2_5: d.page_2_5, 
                        page_2_6: d.page_2_6, 
                        page_2_7: d.page_2_7, 
                        page_2_8: d.page_2_8, 
                        page_2_9: d.page_2_9, 
                        peralatan_kimia_klinik_dan_toksikologi_klinik: d.peralatan_kimia_klinik_dan_toksikologi_klinik, 
                        peralatan_hematologi_dan_patologi: d.peralatan_hematologi_dan_patologi, 
                        peralatan_imunologi_dan_mikrobiologi: d.peralatan_imunologi_dan_mikrobiologi, 
                        peralatan_anestesi: d.peralatan_anestesi, 
                        peralatan_kardiologi: d.peralatan_kardiologi, 
                        peralatan_telinga_hidung_dan_tenggorokan_tht: d.peralatan_telinga_hidung_dan_tenggorokan_tht, 
                        peralatan_gastroenterologi_urologi_gu: d.peralatan_gastroenterologi_urologi_gu, 
                        peralatan_rumah_sakit_umum_dan_perorangan_rsu_p: d.peralatan_rumah_sakit_umum_dan_perorangan_rsu_p, 
                        peralatan_neurologi: d.peralatan_neurologi, 
                        peralatan_obstetrik_dan_ginekologi_og: d.peralatan_obstetrik_dan_ginekologi_og, 
                        peralatan_mata: d.peralatan_mata, 
                        peralatan_ortopedi: d.peralatan_ortopedi, 
                        peralatan_kesehatan_fisik: d.peralatan_kesehatan_fisik, 
                        peralatan_radiologi: d.peralatan_radiologi, 
                        peralatan_bedah_umum_dan_bedah_plastik: d.peralatan_bedah_umum_dan_bedah_plastik, 
                        kategori_alat_kesehatan_yang_diproduksi_lainnya: d.kategori_alat_kesehatan_yang_diproduksi_lainnya, 
                        tisu_dan_kapas: d.tisu_dan_kapas, 
                        sediaan_untuk_mencuci: d.sediaan_untuk_mencuci, 
                        pembersih: d.pembersih, 
                        produk_perawatan_bayi_dan_ibu: d.produk_perawatan_bayi_dan_ibu, 
                        antiseptika_dan_desinfektan: d.antiseptika_dan_desinfektan, 
                        pewangi: d.pewangi, 
                        pestisida_rumah_tangga: d.pestisida_rumah_tangga, 
                        kategori_pkrt_yang_diproduksi_lainnya: d.kategori_pkrt_yang_diproduksi_lainnya, 
                        status_perusahaan: d.status_perusahaan, 
                        skala_perusahaan: d.skala_perusahaan, 
                        page_3_lokal_sendiri: d.page_3_lokal_sendiri, 
                        page_3_lisensi: d.page_3_lisensi, 
                        page_3_perakitan: d.page_3_perakitan, 
                        page_3_kemas_ulang: d.page_3_kemas_ulang, 
                        page_3_khusus_ekspor: d.page_3_khusus_ekspor, 
                        page_3_orientasi_penjualan_dalam_negeri_dan_ekspor: d.page_3_orientasi_penjualan_dalam_negeri_dan_ekspor, 
                        page_3_cpakb: d.page_3_cpakb, 
                        page_3_cppkrtb: d.page_3_cppkrtb, 
                        page_3_9001_sistem_manajemen_mutu: d.page_3_9001_sistem_manajemen_mutu, 
                        page_3_13485_sistem_manajemen_mutu_alkes: d.page_3_13485_sistem_manajemen_mutu_alkes, 
                        page_3_14001_sistem_manajemen_lingkungan: d.page_3_14001_sistem_manajemen_lingkungan, 
                        page_3_iso_yang_dimiliki_lainnya: d.page_3_iso_yang_dimiliki_lainnya, 
                        page_4_lokasi_pabrik: d.page_4_lokasi_pabrik, 
                        page_4_skala_perusahaan: d.page_4_skala_perusahaan, 
                        page_4_ruang_administrasi_jumlah_luas: d.page_4_ruang_administrasi_jumlah_luas, 
                        page_4_ruang_penyimpanan_bahan_baku_jumlah_luas: d.page_4_ruang_penyimpanan_bahan_baku_jumlah_luas, 
                        page_4_ruang_karantina_jumlah_luas: d.page_4_ruang_karantina_jumlah_luas, 
                        page_4_ruang_produksi_jumlah_luas: d.page_4_ruang_produksi_jumlah_luas, 
                        page_4_ruang_pengemasan_jumlah_luas: d.page_4_ruang_pengemasan_jumlah_luas, 
                        page_4_ruang_penyimpanan_barang_jadi_jumlah_luas: d.page_4_ruang_penyimpanan_barang_jadi_jumlah_luas, 
                        page_4_laboratorium_qc_jumlah_luas: d.page_4_laboratorium_qc_jumlah_luas, 
                        page_4_ruang_bengkel_jumlah_luas: d.page_4_ruang_bengkel_jumlah_luas, 
                        page_4_ruang_bersih_clean_room_jumlah_luas: d.page_4_ruang_bersih_clean_room_jumlah_luas, 
                        page_4_nama_alkes_pkrt_yang_dimiliki_sesuai_sertifikat: d.page_4_nama_alkes_pkrt_yang_dimiliki_sesuai_sertifikat, 
                        page_4_nama_alat_kesehatan_pkrt_yang_masih_diproduksi_aktif_lampirkan_dan_kapasitas_produksi_rata_rata_bulan: d.page_4_nama_alat_kesehatan_pkrt_yang_masih_diproduksi_aktif_lampirkan_dan_kapasitas_produksi_rata_rata_bulan, 
                        page_4_nama_produk: d.page_4_nama_produk, 
                        page_4_type_model: d.page_4_type_model, 
                        page_4_nomor_batch_lot_seri: d.page_4_nomor_batch_lot_seri, 
                        page_4_tanggal_kadaluarsa: d.page_4_tanggal_kadaluarsa, 
                        page_4_kemasan: d.page_4_kemasan, 
                        page_4_nomor_izin_edar: d.page_4_nomor_izin_edar, 
                        page_4_nama_pabrik: d.page_4_nama_pabrik, 
                        page_4_alamat_pabrik: d.page_4_alamat_pabrik, 
                        page_4_nama_penyalur_tunggal: d.page_4_nama_penyalur_tunggal, 
                        page_4_alamat_penyalur: d.page_4_alamat_penyalur, 
                        page_5_laki_laki: d.page_5_laki_laki, 
                        page_5_perempuan: d.page_5_perempuan, 
                        page_5_nama: d.page_5_nama, 
                        page_5_ijazah_yang_dimiliki_minimal_d_3: d.page_5_ijazah_yang_dimiliki_minimal_d_3, 
                        page_5_bekerja_full_time: d.page_5_bekerja_full_time, 
                        page_5_bekerja_full_time_lainnya: d.page_5_bekerja_full_time_lainnya, 
                        page_5_nama_dan_ijazah: d.page_5_nama_dan_ijazah, 
                        page_5_nama_dan_sertifikasi_surat_izin_bekerja_dari_bapeten: d.page_5_nama_dan_sertifikasi_surat_izin_bekerja_dari_bapeten, 
                        page_6_1: d.page_6_1, 
                        page_6_2: d.page_6_2, 
                        page_6_3: d.page_6_3, 
                        page_6_4: d.page_6_4, 
                        page_6_5: d.page_6_5, 
                        page_6_6: d.page_6_6, 
                        page_6_7: d.page_6_7, 
                        page_6_8: d.page_6_8, 
                        page_6_9: d.page_6_9, 
                        page_6_10: d.page_6_10, 
                        page_6_11: d.page_6_11, 
                        page_6_12: d.page_6_12, 
                        page_6_13: d.page_6_13, 
                        page_6_14: d.page_6_14, 
                        page_6_15: d.page_6_15, 
                        page_6_16: d.page_6_16, 
                        page_6_17: d.page_6_17, 
                        page_6_18: d.page_6_18, 
                        page_6_19: d.page_6_19, 
                        page_6_20: d.page_6_20, 
                        page_6_21: d.page_6_21, 
                        page_6_22: d.page_6_22, 
                        page_6_23: d.page_6_23, 
                        page_6_24: d.page_6_24, 
                        page_6_25: d.page_6_25, 
                        page_6_26: d.page_6_26, 
                        page_6_27: d.page_6_27, 
                        page_6_28: d.page_6_28, 
                        page_6_29: d.page_6_29, 
                        page_6_30: d.page_6_30, 
                        page_6_31: d.page_6_31, 
                        page_6_32: d.page_6_32, 
                        page_6_33: d.page_6_33, 
                        page_7_1: d.page_7_1, 
                        page_7_2: d.page_7_2, 
                        page_7_3: d.page_7_3, 
                        page_7_4: d.page_7_4, 
                        page_7_5: d.page_7_5, 
                        page_7_6: d.page_7_6, 
                        page_7_7: d.page_7_7, 
                        page_7_8: d.page_7_8, 
                        page_7_9: d.page_7_9, 
                        page_7_10: d.page_7_10, 
                        page_7_11: d.page_7_11, 
                        page_7_12: d.page_7_12, 
                        page_7_13: d.page_7_13, 
                        page_7_14: d.page_7_14, 
                        page_7_15: d.page_7_15, 
                        page_7_16: d.page_7_16, 
                        page_7_17: d.page_7_17, 
                        page_7_18: d.page_7_18, 
                        page_7_19: d.page_7_19, 
                        page_7_20: d.page_7_20, 
                        page_7_21: d.page_7_21, 
                        page_7_22: d.page_7_22, 
                        page_7_23: d.page_7_23, 
                        page_7_24: d.page_7_24, 
                        page_7_25: d.page_7_25, 
                        page_7_26: d.page_7_26, 
                        page_7_27: d.page_7_27, 
                        page_7_28: d.page_7_28, 
                        page_7_29: d.page_7_29, 
                        page_7_30: d.page_7_30, 
                        page_7_31: d.page_7_31, 
                        page_7_32: d.page_7_32, 
                        page_7_33: d.page_7_33, 
                        page_7_34: d.page_7_34, 
                        page_7_35: d.page_7_35, 
                        page_7_36: d.page_7_36, 
                        page_7_37: d.page_7_37, 
                        page_7_38: d.page_7_38, 
                        page_7_39: d.page_7_39, 
                        page_7_40: d.page_7_40, 
                        page_7_41: d.page_7_41, 
                        page_7_42: d.page_7_42, 
                        page_7_43: d.page_7_43, 
                        page_7_44: d.page_7_44, 
                        page_7_45: d.page_7_45, 
                        page_7_46: d.page_7_46, 
                        page_7_47: d.page_7_47, 
                        page_7_48: d.page_7_48, 
                        page_8_1: d.page_8_1, 
                        page_8_2: d.page_8_2, 
                        page_8_3: d.page_8_3, 
                        page_8_4: d.page_8_4, 
                        page_8_5: d.page_8_5, 
                        page_8_6: d.page_8_6, 
                        page_8_7: d.page_8_7, 
                        page_8_8: d.page_8_8, 
                        page_8_9: d.page_8_9, 
                        page_8_10: d.page_8_10, 
                        page_8_11: d.page_8_11, 
                        page_8_12: d.page_8_12, 
                        page_8_13: d.page_8_13, 
                        page_8_14: d.page_8_14, 
                        page_8_15: d.page_8_15, 
                        page_8_16: d.page_8_16, 
                        page_8_17: d.page_8_17, 
                        page_8_18: d.page_8_18, 
                        page_8_19: d.page_8_19, 
                        page_8_20: d.page_8_20, 
                        page_8_21: d.page_8_21, 
                        page_8_22: d.page_8_22, 
                        page_8_23: d.page_8_23, 
                        page_8_24: d.page_8_24, 
                        page_8_25: d.page_8_25, 
                        page_8_26: d.page_8_26, 
                        page_8_27: d.page_8_27, 
                        page_8_28: d.page_8_28, 
                        page_8_29: d.page_8_29, 
                        page_8_30: d.page_8_30, 
                        page_8_31: d.page_8_31, 
                        page_8_32: d.page_8_32, 
                        page_8_33: d.page_8_33, 
                        page_8_34: d.page_8_34, 
                        page_8_35: d.page_8_35, 
                        page_8_36: d.page_8_36, 
                        page_9_1: d.page_9_1, 
                        page_9_2: d.page_9_2, 
                        page_9_3: d.page_9_3, 
                        page_9_4: d.page_9_4, 
                        page_9_5: d.page_9_5, 
                        page_9_6: d.page_9_6, 
                        page_9_7: d.page_9_7, 
                        page_9_8: d.page_9_8, 
                        page_9_10: d.page_9_10, 
                        page_9_11: d.page_9_11, 
                        page_9_12: d.page_9_12, 
                        page_9_13: d.page_9_13, 
                        page_9_14: d.page_9_14, 
                        page_9_15: d.page_9_15, 
                        page_9_16: d.page_9_16, 
                        page_9_17: d.page_9_17, 
                        page_9_18: d.page_9_18, 
                        page_9_19: d.page_9_19, 
                        page_9_20: d.page_9_20, 
                        page_9_21: d.page_9_21, 
                        page_9_22: d.page_9_22, 
                        page_9_23: d.page_9_23, 
                        page_9_24: d.page_9_24, 
                        page_9_25: d.page_9_25, 
                        page_9_26: d.page_9_26, 
                        page_9_27: d.page_9_27, 
                        page_9_28: d.page_9_28, 
                        page_9_29: d.page_9_29, 
                        page_9_30: d.page_9_30, 
                        page_9_31: d.page_9_31, 
                        page_9_32: d.page_9_32, 
                        page_9_33: d.page_9_33, 
                        page_9_34: d.page_9_34, 
                        page_9_35: d.page_9_35, 
                        page_9_36: d.page_9_36, 
                        page_9_37: d.page_9_37, 
                        page_9_38: d.page_9_38, 
                        page_9_39: d.page_9_39, 
                        page_9_40: d.page_9_40, 
                        page_9_41: d.page_9_41, 
                        page_9_42: d.page_9_42, 
                        page_9_43: d.page_9_43, 
                        page_9_44: d.page_9_44, 
                        page_9_45: d.page_9_45, 
                        page_9_46: d.page_9_46, 
                        page_9_47: d.page_9_47, 
                        page_9_48: d.page_9_48, 
                        page_9_49: d.page_9_49, 
                        page_9_50: d.page_9_50, 
                        page_9_51: d.page_9_51, 
                        page_9_52: d.page_9_52, 
                        page_10_1: d.page_10_1, 
                        page_10_2: d.page_10_2, 
                        page_10_3: d.page_10_3, 
                        page_10_4: d.page_10_4, 
                        page_10_5: d.page_10_5, 
                        page_10_6: d.page_10_6, 
                        page_10_7: d.page_10_7, 
                        page_10_8: d.page_10_8, 
                        page_10_9: d.page_10_9, 
                        page_10_10: d.page_10_10, 
                        page_10_11: d.page_10_11, 
                        page_10_12: d.page_10_12, 
                        page_10_13: d.page_10_13, 
                        page_10_14: d.page_10_14, 
                        page_10_15: d.page_10_15, 
                        page_10_16: d.page_10_16, 
                        page_10_17: d.page_10_17, 
                        page_10_18: d.page_10_18, 
                        page_10_19: d.page_10_19, 
                        page_10_20: d.page_10_20, 
                        page_10_21: d.page_10_21, 
                        page_10_22: d.page_10_22, 
                        page_10_23: d.page_10_23, 
                        page_10_24: d.page_10_24, 
                        page_10_25: d.page_10_25, 
                        page_10_26: d.page_10_26, 
                        page_10_27: d.page_10_27, 
                        page_10_28: d.page_10_28, 
                        page_10_29: d.page_10_29, 
                        page_10_30: d.page_10_30, 
                        page_10_31: d.page_10_31, 
                        page_10_32: d.page_10_32, 
                        page_10_33: d.page_10_33, 
                        page_10_34: d.page_10_34, 
                        page_10_35: d.page_10_35, 
                        page_10_36: d.page_10_36, 
                        page_10_37: d.page_10_37, 
                        page_10_38: d.page_10_38, 
                        page_10_39: d.page_10_39, 
                        page_10_40: d.page_10_40, 
                        page_10_41: d.page_10_41, 
                        page_10_42: d.page_10_42, 
                        page_10_43: d.page_10_43, 
                        page_10_44: d.page_10_44, 
                        page_10_45: d.page_10_45, 
                        page_10_46: d.page_10_46, 
                        page_10_47: d.page_10_47, 
                        page_10_48: d.page_10_48, 
                        page_10_49: d.page_10_49, 
                        page_10_50: d.page_10_50, 
                        page_10_51: d.page_10_51, 
                        page_10_52: d.page_10_52, 
                        page_11_1: d.page_11_1, 
                        page_11_2: d.page_11_2, 
                        page_11_3: d.page_11_3, 
                        page_11_4: d.page_11_4, 
                        page_11_5: d.page_11_5, 
                        page_11_6: d.page_11_6, 
                        page_11_7: d.page_11_7, 
                        page_11_8: d.page_11_8, 
                        page_11_9: d.page_11_9, 
                        page_11_10: d.page_11_10,
                        files: data_files_string
                    }
                    this.itemData.push(dataItem)    
                } catch (error) {
                    console.log('ada error: ' + error)
                }
                no++;
            }
        }        
    },
    watch : {
        dialogExcell : function (value) {
            console.log(value)
            this.dialog = value
        },
        dataMap : function (value) {
            this.dataMap = value
            this.olahData();
        }        
    },    
  }
</script>