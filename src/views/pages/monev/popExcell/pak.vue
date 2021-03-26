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
                    <vue-excel-column field="nama_perusahaan"   label="Nama Badan Hukum Perusahaan" />
                    <vue-excel-column field="status_perusahaan"  label="Status Perusahaan" />
                    <vue-excel-column field="alamat_kantor_dan_telpfax" label="Alamat Kantor dan Telp/Fax" />
                    <vue-excel-column field="alamat_gudang_dan_telpfax"  label="Alamat Gudang dan Telp/Fax" />
                    <vue-excel-column field="email"  label="Email" />
                    <vue-excel-column field="nama_pimpinan"  label="Nama Pimpinan Perusahaan" />
                    <vue-excel-column field="nama_penanggung_jawab_teknis"  label="Nama Penanggung Jawab Teknis" />
                    <vue-excel-column field="npwp"  label="N P W P" />
                    <vue-excel-column field="no_izin_penyalur_alat_kesehatan"  label="Nomor Izin Penyalur Alat Kesehatan (Lampirkan Fotokopi IPAK)" />
                    <vue-excel-column field="status_produk_disalurkan_lokal"  label="Status produk yang disalurkan (LOKAL)" />
                    <vue-excel-column field="status_produk_disalurkan_import"  label="Status produk yang disalurkan (IMPORT)" />
                    <vue-excel-column field="alkes_elektromagnet_radiasi"  label="Alkes Elektromedik Radiasi" />
                    <vue-excel-column field="alkes_elektromagnet_nonradiasi"  label="Alkes Elektromedik Non Radiasi" />
                    <vue-excel-column field="alkes_non_elektromedik_steril"  label="Alkes Non Elektromedik Steril" />
                    <vue-excel-column field="alkes_non_elektromedik_nonsteril"  label="Alkes Non Elektromedik Non Steril" />
                    <vue-excel-column field="alkes_diagnostik_in_vitro"  label="Alkes Diagnostik In Vitro" />
                    <vue-excel-column field="jenis_alkes_instrumen_peralatan"  label="Instrumen/Peralatan" />
                    <vue-excel-column field="jenis_alkes_reagen"  label="Reagen" />
                    <vue-excel-column field="jenis_alkes_kalibrator"  label="Kalibrator" />
                    <vue-excel-column field="jenis_alkes_bahan_kontrol"  label="Bahan Kontrol" />
                    <vue-excel-column field="no_izin_edar_alkes_yang_dimiliki_sebagai_pemegang_izin_edar"  label="Nomor Izin Edar Alkes Yang Dimiliki (Sebagai Pemegang Izin Edar)" />
                    <vue-excel-column field="no_izin_edar_alkes_yang_dimiliki_bukan_sebagai_pemegang_izin_edar"  label="Nomor Izin Edar Alkes Yang Dimiliki (Bukan Sebagai Pemegang Izin Edar)" />
                    <vue-excel-column field="masih_melakukan_aktifitas_penyaluran_produk"  label="Masih Melakukan Aktivitas Penyaluran Produk" />
                    <vue-excel-column field="data_karyawan_laki"  label="Jumlah Karyawan Pria" />
                    <vue-excel-column field="data_karyawan_wanita"  label="Jumlah Karyawan Wanita" />
                    <vue-excel-column field="data_karyawan_penanggung_jawab_teknis"  label="PENANGGUNG JAWAB TEKNIS" />
                    <vue-excel-column field="data_karyawan_bekerja_fulltime"  label="Bekerja Full Time" />
                    <vue-excel-column field="data_karyawan_bekerja_fulltime_lainnya"  label="Pilihan Lainnya? Jika ada." />
                    <vue-excel-column field="data_karyawan_pendidikan"  label="Pendidikan (Minimal D3)" />
                    <vue-excel-column field="data_karyawan_tenaga_teknis"  label="Tenaga Teknisi (Khusus PAK yang menyalurkan Alkes Elektromedik dan Instrumen Produk IVD)" />
                    <vue-excel-column field="memiliki_bagan_struktur_organisasi"  label="Memiliki Bagan Struktur Organisasi" />
                    <vue-excel-column field="memiliki_uraian_tugas_dan_tanggung_jawab_tertulis_sesuai_struktur_organisasi"  label="Memiliki Uraian Tugas Dan Tanggung Jawab Tertulis Sesuai Struktur Organisasi" />
                    <vue-excel-column field="memiliki_pedoman_mutu"  label="Memiliki Pedoman Mutu" />
                    <vue-excel-column field="persyaratan_dokumentasi_pasif_1"  label="Tersedia Prosedur Tertulis Pengadaan Barang/Produk" />
                    <vue-excel-column field="persyaratan_dokumentasi_pasif_2"  label="Tersedia Prosedur Tertulis Penerimaan Produk" />
                    <vue-excel-column width="300px" field="persyaratan_dokumentasi_pasif_3"  label="Tersedia Prosedur Tertulis Penerimaan Dengan Sistem Rantai Dingin Untuk Alkes Diagnostik In Vitro Yang Membutuhkan Suhu Refrigerator/Cold Place/Freezer/Deep Freezer" />
                    <vue-excel-column field="persyaratan_dokumentasi_pasif_4"  label="Tersedia Prosedur Tertulis Penyimpanan Produk" />
                    <vue-excel-column width="300px" field="persyaratan_dokumentasi_pasif_5"  label="Tersedia Prosedur Tertulis Penyimpanan Dengan Sistem Rantai Dingin Untuk Alkes Diagnostik In Vitro Yang Membutuhkan Suhu Refrigerator/Cold Place/Freezer/Deep Freezer" />
                    <vue-excel-column field="persyaratan_dokumentasi_pasif_6"  label="Tersedia Prosedur Tertulis Pengiriman Produk" />
                    <vue-excel-column width="300px" field="persyaratan_dokumentasi_pasif_7"  label="Tersedia Prosedur Tertulis Pengiriman (Termasuk Proses Pengemasan) Dengan Rantai Dingin Untuk Alkes Diagnostik In Vitro Yang Membutuhkan Suhu Refrigerator/Cold Place/Freezer/Deep Freezer" />
                    <vue-excel-column width="300px" field="persyaratan_dokumentasi_pasif_8"  label="Tersedia Prosedur Penyerahan Dengan Rantai Dingin Untuk Alkes Diagnostik In Vitro Dengan Suhu Refrigerator/Cold Place/Freezer/Deep Freezer" />
                    <vue-excel-column width="300px" field="persyaratan_dokumentasi_pasif_9"  label="Tersedia Prosedur Tertulis Penanganan Produk Bila Listrik Padam Untuk Alkes Diagnostik In Vitro Dengan Suhu Refrigerator/Cold Place/Freezer/Deep Freezer" />
                    <vue-excel-column width="300px" field="persyaratan_dokumentasi_pasif_10"  label="Tersedia Prosedur Penyerahan (Termasuk Instalasi, Commissioning (Uji Fungsi, Uji Keselamatan, Uji Coba/Aplikasi Dan Pelatihan) Untuk Alat Kesehatan Elektromedik Dan/Atau Instrumen Diagnostik In Vitro" />
                    <vue-excel-column width="300px" field="persyaratan_dokumentasi_pasif_11"  label="Tersedia Prosedur Layanan Purna Jual Untuk Untuk Alat Kesehatan Elektromedik Dan/Atau Instrument Diagnostik In Vitro" />
                    <vue-excel-column field="persyaratan_dokumentasi_pasif_12"  label="Tersedia Prosedur Tertulis Penanganan Keluhan" />
                    <vue-excel-column field="persyaratan_dokumentasi_pasif_13"  label="Tersedia Prosedur Tertulis Field Safety Corrective Action (Fsca)" />
                    <vue-excel-column field="persyaratan_dokumentasi_pasif_14"  label="Tersedia Prosedur Tertulis Retur Produk" />
                    <vue-excel-column field="persyaratan_dokumentasi_pasif_15"  label="Tersedia Prosedur Tertulis Pemusnahan Produk" />
                    <vue-excel-column field="persyaratan_dokumentasi_pasif_16"  label="Tersedia Prosedur Tertulis Pengendalian Dokumen Mutu" />
                    <vue-excel-column field="persyaratan_dokumentasi_pasif_17"  label="Tersedia Prosedur Tertulis Audit Internal" />
                    <vue-excel-column field="persyaratan_dokumentasi_pasif_18"  label="Tersedia Prosedur Tertulis Kajian/Tinjauan Manajemenl" />
                    <vue-excel-column field="persyaratan_dokumentasi_pasif_19"  label="Tersedia Prosedur Tertulis Seleksi Pihak Ketiga" />
                    <vue-excel-column field="persyaratan_dokumentasi_aktif_1"  label="Tersedia Surat Pemesanan" />
                    <vue-excel-column field="persyaratan_dokumentasi_aktif_2"  label="Tersedia Catatan Stok Barang" />
                    <vue-excel-column field="persyaratan_dokumentasi_aktif_3"  label="Tersedia Faktur Penjualan" />
                    <vue-excel-column field="persyaratan_dokumentasi_aktif_4"  label="Tersedia Surat Jalan/Faktur Pengiriman Barang" />
                    <vue-excel-column field="persyaratan_dokumentasi_aktif_6"  label="Tersedia Laporan Kegiatan Penyaluran" />
                    <vue-excel-column field="persyaratan_dokumentasi_aktif_7"  label="Laporan Kegiatan Penyaluran Disampaikan Ke Kementerian Kesehatan Melalui E-Report" />
                    <vue-excel-column field="persyaratan_dokumentasi_aktif_8"  label="Tersedia Laporan Kejadian Tidak Diinginkan (Ktd)" />
                    <vue-excel-column field="persyaratan_dokumentasi_aktif_9"  label="Tersedia Laporan Penarikan Produk" />
                    <vue-excel-column field="persyaratan_dokumentasi_aktif_10"  label="Tersedia Laporan Pemusnahan Produk" />

                    <vue-excel-column width="300px" field="personalia_dan_pelatihan_1"  label="Penanggung Jawab Teknis Memiliki Kompetensi Sesuai Dengan Produk Alat Kesehatan Yang Tercantum Pada IPAK" />
                    <vue-excel-column field="personalia_dan_pelatihan_2"  label="Memiliki Sistem Penerimaan SDM (Rekruitmen)" />
                    <vue-excel-column field="personalia_dan_pelatihan_3"  label="Dilakukan Pemeriksaan Kesehatan Terhadap Karyawan" />
                    <vue-excel-column width="300px" field="personalia_dan_pelatihan_4"  label="Personil Yang Terlibat Dalam Kegiatan Distribusi Mengenakan Atribut Pengaman Yang Sesuai Dengan Sifat Produk Dan Kegiatannya" />
                    <vue-excel-column field="personalia_dan_pelatihan_5"  label="Personil Melaksanakan Prosedur Terkait Hygiene" />
                    <vue-excel-column field="personalia_dan_pelatihan_6"  label="Personil Yang Mendapatkan Sosialisasi Tentang Standar Operasioanal Prosedur" />
                    <vue-excel-column width="300px" field="personalia_dan_pelatihan_7"  label="Adanya Personil Yang Mendapatkan Pelatihan Cara Distribusi Alat Kesehatan Yang Baik" />
                    <vue-excel-column width="300px" field="personalia_dan_pelatihan_8"  label="Adanya Personil Yang Mendapatkan Pelatihan Pengelolaan Rantai Dingin Untuk Alkes Diagnostik In Vitro Yang Membutuhkan Suhu Refrigerator/Cold Place/Freezer/Deep Freezer" />
                    <vue-excel-column width="300px" field="personalia_dan_pelatihan_9"  label="Memiliki Personil Yang Mendapatkan Pelatihan Terkait Instalasi/Commisioning/Pemeliharaan/Perbaikan Untuk Alat Kesehatan Elektromedik Dan/Atau Instrument Diagnostik In Vitro" />
                    <vue-excel-column field="personalia_dan_pelatihan_10"  label="Adanya Personil Yang Mendapatkan Pelatihan Masalah Keselamatan Kerja" />
                    <vue-excel-column field="personalia_dan_pelatihan_11"  label="Tersedia Catatan Perencanaan Pelatihan Bagi Personil" />
                    <vue-excel-column field="personalia_dan_pelatihan_12"  label="Tersedia Catatan Pelatihan Personil" />

                    <vue-excel-column width="300px" field="bangungan_dan_fasilitas_1"  label="Bangunan Dapat Melindungi Produk Dari Kontaminasi Dan Kerusakan, Termasuk Perlindungan Dari Panas Berlebihan Dan/Atau Terpapar Sinar Matahari, Terlindungi Dari Binatang, Vektor Penyakit Seperti Tikus, Serangga Dan Jamur" />
                    <vue-excel-column field="bangungan_dan_fasilitas_2"  label="Tersedia Area Penerimaan Yang Memadai" />
                    <vue-excel-column width="300px" field="bangungan_dan_fasilitas_3"  label="Tersedia Ruang Penyimpanan Sesuai Dengan Kapasitas Produk Yang Disimpan Dan Sesuai Dengan Kondisi Yang Dibutuhkan Produk" />
                    <vue-excel-column field="bangungan_dan_fasilitas_4"  label="Tersedia Ruang Penyimpanan Sesuai Dengan Kondisi Lingkungan Yang Dibutuhkan Produk" />
                    <vue-excel-column field="bangungan_dan_fasilitas_5"  label="Tersedia Area/Ruangan Untuk Menyimpan Produk Kadaluarsa/Rusak/Recall/Retur/Ilegal" />
                    <vue-excel-column field="bangungan_dan_fasilitas_6"  label="Tersedia Area Pengiriman Yang Memadai" />
                    <vue-excel-column field="bangungan_dan_fasilitas_7"  label="Tersedia Sirkulasi Udara Yang Memadai" />
                    <vue-excel-column field="bangungan_dan_fasilitas_8"  label="Tersedianya Alat Untuk Mengukur Dan Memonitor Suhu" />
                    <vue-excel-column field="bangungan_dan_fasilitas_9"  label="Tersedia Alat Untuk Mengukur Dan Memonitor Kelembaban" />
                    <vue-excel-column field="bangungan_dan_fasilitas_10"  label="Tersedia Palet/Rak Yang Bersih Dan Dirawat Dengan Baik" />
                    <vue-excel-column field="bangungan_dan_fasilitas_11"  label="Tersedia Program Kontrol Hama" />
                    <vue-excel-column field="bangungan_dan_fasilitas_12"  label="Tersedia Alat Pemadam Kebakaran (Apar/Hydran/Sprinkle) Dengan Kondisi Yang Baik" />
                    <vue-excel-column field="bangungan_dan_fasilitas_13"  label="Tersedia Alat Pemadam Kebakaran Dengan Jumlahnya Sesuai Dengan Luas Ruangan" />
                    <vue-excel-column width="300px" field="bangungan_dan_fasilitas_14"  label="Alat Bantu Angkut Barang Atau Peralatan Gudang Lain Dengan Sumber Penggerak Bensin, Diesel, Gas, Tidak Dioperasikan Di Dalam Gudang" />
                    <vue-excel-column field="bangungan_dan_fasilitas_15"  label="Tersedia Instalasi Listrik Yang Aman" />
                    <vue-excel-column field="bangungan_dan_fasilitas_16"  label="Tersedia Sumber Air Bersih Yang Memadai" />
                    <vue-excel-column field="bangungan_dan_fasilitas_17"  label="Tersedia Tanda Arah Evakuasi" />
                    <vue-excel-column field="bangungan_dan_fasilitas_18"  label="Tersedia Tanda Titik Kumpul" />
                    
                    <vue-excel-column width="300px" field="bangungan_dan_fasilitas_1_1"  label="Tersedia Ruang/Tempat/Area Penerimaan Dan Pengiriman Dengan Suhu Dingin/Sejuk ((8℃ S/D 15°C)" />
                    <vue-excel-column width="300px" field="bangungan_dan_fasilitas_1_2"  label="Tersedia Ruang/Tempat/Area Karantina Dengan Suhu Refrigerator/Cold Place/Freezer/Deep Freezer Untuk Menyimpan Alkes Diagnostik In Vitro Yang Tidak Memenuhi Syarat Dan Masih Menunggu Keputusan Tindak Lanjut" />
                    <vue-excel-column width="300px" field="bangungan_dan_fasilitas_1_3"  label="Tersedia Tempat Penyimpanan Khusus (Lemari Pendingin/Cold Storage/Cold Room/Freezer) Dalam Kondisi Dirawat Dengan Baik" />
                    <vue-excel-column field="bangungan_dan_fasilitas_1_4"  label="Tersedia Thermometer Khusus Suhu Dingin" />
                    <vue-excel-column field="bangungan_dan_fasilitas_1_5"  label="Tersedia Cold Box Yang Dilapisi Bahan Yang Mampu Menjaga Stabilitas Suhu Selama Transportasi" />
                    <vue-excel-column field="bangungan_dan_fasilitas_1_6"  label="Tersedia Cool Pack/Ice/Pack/Dry Ice Untuk Pengemasan/Pengiriman Alkes Diagnostik In Vitro" />
                    <vue-excel-column width="300px" field="bangungan_dan_fasilitas_1_7"  label="Tersedia Alat Untuk Memantau Suhu Selama Transportasi (Thermal Indicator Strip Atau Data Logger Atau Thermometer Digital Atau Lainnya)" />
                    <vue-excel-column field="bangungan_dan_fasilitas_1_8"  label="Tersedia Generator Yang Masih Berfungsi Dengan Baik" />
                    <vue-excel-column field="kebersihan_1"  label="Semua Ruangan Kering, Bersih, Bebas Limbah/Sampah Debu" />
                    <vue-excel-column field="kebersihan_2"  label="Tersedia Catatan Pemeliharaan/Pembersihan Ruang Penyimpanan" />
                    <vue-excel-column field="kebersihan_3"  label="Ada Larangan Makan/Minum/Merokok Di Area Penyimpanan" />
                    <vue-excel-column field="kebersihan_4"  label="Tersedia Toilet/Wastafel Yang Terpisah Dari Ruang Penyimpanan" />
                    <vue-excel-column field="bengkel_1"  label="Tersedia Bengkel/Workshop Yang Memadai" />
                    <vue-excel-column field="bengkel_2"  label="Tersedia Surat Kerjasama Bengkel/Workshop (Jika Kerjasama Dengan Pihak Lain)" />
                    <vue-excel-column field="bengkel_3"  label="Tersedia Perlengkapan Bengkel (Sesuai Alkes Yang Disalurkan)" />
                    <vue-excel-column field="bengkel_4"  label="Tersedia Suku Cadang (Sesuai Alkes Yang Disalurkan)" />

                    <vue-excel-column field="data_page6_1"  label="Prosedur Penerimaan Produk Dilakukan Di Area/Tempat Yang Sesuai Dengan Kapasitas/Kondisi Produk" />
                    <vue-excel-column width="300px" field="data_page6_2"  label="Melaksanakan Pemeriksaan Kesesuaian Produk Yang Diterima, Minimal Meliputi (Nama Produk, Nama Produsen/Asal Barang, Nomor Izin Edar , Jumlah , Kondisi Fisik Kemasan/Produk, Keterangan Pada Label: Jangka Waktu Kedaluwarsa, Nomor Bets/Tipe/Seri)" />
                    <vue-excel-column width="300px" field="data_page6_3"  label="Produk Yang Diterima Dalam Kondisi Tidak Memenuhi Syarat Dipisah Dengan Produk Yang Diterima Dalam Kondisi Baik." />
                    <vue-excel-column width="300px" field="data_page6_4"  label="Tersedia Catatan (Faktur/Surat Pengantar Barang/Dokumen Lain) Yang Menyatakan Produk Diterima Dalam Kondisi Baik)" />
                    <vue-excel-column  width="300px" field="data_page6_5"  label="Prosedur Penerimaan Alat Kesehatan Diagnostik In Vitro Dilakukan Di Area/Tempat Dengan Suhu Dingin/Sejuk (8℃ S/D 15°C)" />
                    <vue-excel-column field="data_page6_6"  label="Melakukan Pengukuran Suhu Alat Kesehatan Diagnostik In Vitro Yang Diterima" />
                    <vue-excel-column field="data_page6_7"  label="Tersedia Catatan Kondisi Suhu Alat Kesehatan Diagnostik In Vitro Yang Diterima" />
                    <vue-excel-column width="300px" field="data_page6_8"  label="Produk Disimpan Sesuai Dengan Kondisi Yang Dibutuhkan Alat Kesehatan Untuk Tetap Terjamin Keamanan, Mutu Dan Manfaatnya" />
                    <vue-excel-column field="data_page6_9"  label="Penataan Produk Sesuai Kelompok Alat Kesehatan" />
                    <vue-excel-column field="data_page6_10"  label="Produk Tidak Diletakkan Langsung Diatas Lantai" />
                    <vue-excel-column field="data_page6_11"  label="Melakukan Pencatatan Stock Produk Secara Tertib" />
                    <vue-excel-column width="300px" field="data_page6_12"  label="Produk Yang Telah Kedaluwarsa/Rusak Disimpan Terpisah Dengan Produk Yang Masih Layak Pakai Dan Dilengkapi Dengan Penandaan" />
                    <vue-excel-column field="data_page6_13"  label="Melaksanakan Mekanisme Fefo/Fifo (First Expire First Out/ First In First Out)" />
                    <vue-excel-column field="data_page6_14"  label="Tersedia Catatan Kalibrasi Peralatan Yang Mendukung Proses Penyimpanan" />
                    <vue-excel-column field="data_page6_15"  label="Tersedia Catatan Kegiatan Kontrol Hama" />
                    <vue-excel-column field="data_page6_16"  label="Tersedia Catatan Kontrol Suhu Dan Kelembaban" />
                    <vue-excel-column width="300px" field="data_page6_17"  label="Produk Yang Disimpan Memiliki Penandaan/Labelling Alkes Lengkap (Nama Produk, Type/Model, Nomor Batch/Lot/Seri, Tanggal Kadaluarsa, Nomor Izin Edar, Nama Pabrik, Alamat Pabrik, Nama Penyalur , Alamat Penyalur, Spesifikasi Alat/Kegunaan/Cara Penggunaan, Tanda Peringatan/Perhatian (Contoh Produk Secara Acak /Sample)" />
                    <vue-excel-column field="data_page6_18"  label="Alkes Diagnostik In Vitro Disimpan Dalam Lemari Pendingin/Cold Storage/Freezer Yang Dirawat Dengan Baik" />
                    <vue-excel-column field="data_page6_19"  label="Tersedia Catatan Kontrol Suhu Lemari Pendingin/Cold Storage/Freezer" />
                    <vue-excel-column field="data_page6_20"  label="Melakukan Pemetaan Suhu" />
                    <vue-excel-column field="data_page6_21"  label="Tersedia Catatan Pemetaan Suhu" />
                    <vue-excel-column field="data_page6_22"  label="Melaksanakan Prosedur Penanganan Alkes Diagnostik In Vitro Apabila Listrik Padam" />
                    <vue-excel-column field="data_page6_23"  label="Prosedur Pengiriman Produk Dilakukan Di Area/Tempat Yang Sesuai Dengan Kapasitas/Kondisi Produk" />
                    <vue-excel-column width="300px" field="data_page6_24"  label="Melaksanakan Pemeriksaan Produk Yang Akan Dikirim, Minimal Meliputi (Nama Produk, Nama Produsen/Asal Barang, Nomor Izin Edar, Jumlah , Kondisi Fisik Kemasan/Produk, Keterangan Pada Label: Jangka Waktu Kedaluwarsa, Nomor Bets/Tipe/Seri." />
                    <vue-excel-column width="300px" field="data_page6_25"  label="Melakukan Pemeriksaan Alat Transportasi Untuk Memastikan Kesesuaian Kapasitas Dan Persyaratan Dari Produk" />
                    <vue-excel-column field="data_page6_26"  label="Persiapan Pengiriman Dilakukan Di Area Pengiriman Dengan Suhu Dingin/Sejuk (8℃ S/D 15°C)" />
                    <vue-excel-column width="300px" field="data_page6_27"  label="Alkes Diagnostik In Vitro Dikemas Dengan Menggunakan Packaging Material (Cold Box Dan Cold Pack) Yang Tervalidasi" />
                    <vue-excel-column field="data_page6_28"  label="Melakukan Pengukuran Suhu Cold Box Sebelum Dikirim" />
                    <vue-excel-column field="data_page6_29"  label="Tersedia Catatan Kondisi Suhu Cold Box Yang Dikirim" />
                    <vue-excel-column field="data_page6_30"  label="Melakukan Pengukuran Suhu Cold Box Pada Saat Penyerahan Alkes Diagnostik In Vitro Kepada Konsumen" />
                    <vue-excel-column field="data_page6_31"  label="Tersedia Catatan Kondisi Suhu Cold Box Yang Diterima Konsumen" />
                    <vue-excel-column field="data_page6_32"  label="Melaksanakan Prosedur Instalasi/Pemasangan Sesuai Dengan Petunjuk/Prosedur Pemasangan Dari Pabrik" />
                    <vue-excel-column field="data_page6_33"  label="Melaksanakan Commissioning (Pemeriksaan Fisik Setalah Instalasi Dan Pengujian (Uji Fungsi/Uji Keselamatan/Aplikasi)" />
                    <vue-excel-column field="data_page6_34"  label="Tersedia Catatan/Dokumentasi Pelaksanaan Instalasi Dan Commissioning" />
                    <vue-excel-column field="data_page6_35"  label="Melaksanakan Pelatihan Bagi Tenaga Operator/ Tenaga Teknis Fasilitas Pelayanan Kesehatan." />
                    <vue-excel-column field="data_page6_36"  label="Tersedia Catatan/Dokumentasi Kegiatan Pelatihan Bagi Tenaga Operator/ Tenaga Teknis Fasilitas Pelayanan Kesehatan" />
                    <vue-excel-column width="300px" field="data_page6_37"  label="Memiliki Dokumen Informasi Yang Mencakup Identitas Dan Spesifikasi Produk, Prosedur, Buku Petunjuk Pemasangan, Penggunaan Dan Pemeliharaan Atau Media Pendukung Lainnya Yang Menggunakan Bahasa Indonesia" />
                    <vue-excel-column field="data_page6_38"  label="Melaksanakan Layanan Purna Jual (Perbaikan/Pemeliharaan Alkes)" />
                    <vue-excel-column field="data_page6_39"  label="Tersedia Catatan/Dokumentasi Layanan Purna Jual" />
                    <vue-excel-column field="data_page6_40"  label="Dokumen Kegiatan Layanan Purna Jual Terpelihara Dengan Baik" />

                    <vue-excel-column width="300px" field="data_page7_1"  label="Memiliki Pencatatan Lengkap Terkait Alkes Yang Diterima, Meliputi Nama Pabrik/Principle/Pemegang Izin Edar, Nomor Bets/Nomor Seri, Tipe, Jumlah Dan Nomor Izin Edar Dan Data Kesesuaian Produk" />
                    <vue-excel-column width="300px" field="data_page7_2"  label="Memiliki Pencatatan Lengkap Terkait Alkes Yang Dikirim, Meliputi Nama Konsumen, Alamat, Tanggal Beserta Jadwal Pengiriman, Nama Penerima Dan Pengirim Dan Data Kesesuaian Produk" />
                    <vue-excel-column width="300px" field="data_page7_3"  label="PAKYang Menyalurkan Produk Alkes Khusus (Misalnya Katup Jantung Mekanik, Paju Jantung Implant, Stent Jantung, Dll), Memiliki Pencatatan Data Fasyankes Dan Data Pasien Lengkap" />
                    <vue-excel-column field="data_page7_4"  label="Melaksanakan Mekanisme Pengumpulan Komentar Atau Keluhan Dari Pengguna" />
                    <vue-excel-column width="300px" field="data_page7_5"  label="Tersedia Catatan Data Keluhan Pelanggan, Minimal Meliputi Nama Pelanggan, Tanggal/Bulan/Tahun, Alamat, Data Keluhan, Dan Lain-Lain" />
                    <vue-excel-column field="data_page7_6"  label="Tersedia Catatan Tindak Lanjut Korektif Terhadap Penanganan Keluhan Pelanggan" />
                    <vue-excel-column field="data_page7_7"  label="Dokumen Kegiatan Penanganan Keluhan Terpelihara Dengan Baik" />
                    <vue-excel-column field="data_page7_8"  label="Melakukan Prosedur Kegiatan FSCA" />
                    <vue-excel-column field="data_page7_9"  label="Tersedia Dokumen Laporan Perencanaan, Pelaksanaan Dan Tindakan Fsca Yang Dilakukan." />
                    <vue-excel-column field="data_page7_10"  label="Laporan FSCA Dikirim Ke Kementerian Kesehatan" />
                    <vue-excel-column field="data_page7_11"  label="Produk Recall Disimpan Terpisah Dengan Produk Yang Masih Layak Pakai/Kondisi Baik" />
                    <vue-excel-column field="data_page7_12"  label="Tersedia Catatan Data Penarikan Produk (Recall)" />
                    <vue-excel-column field="data_page7_13"  label="Dokumen Kegiatan Fsca Terpelihara Dengan Baik" />
                    <vue-excel-column field="data_page7_14"  label="Produk Retur Disimpan Terpisah Dengan Produk Yang Masih Layak Pakai/Kondisi Baik" />
                    <vue-excel-column field="data_page7_15"  label="Tersedia Catatan Data Produk Kembalian (Retur)" />

                    <vue-excel-column field="data_page8_1"  label="Produk Yang Akan Dimusnahkan Ditempatkan Terpisah Dengan Produk Yang Masih Layak Pakai/Kondisi Baik" />
                    <vue-excel-column field="data_page8_2"  label="Tersedian Catatan Data Produk Yang Dimusnahkan" />
                    <vue-excel-column field="data_page8_3"  label="Tersedia Bap Kegiatan Pemusnahan, Dilengkapi Saksi Dari Instansi Yang Berwenang" />
                    <vue-excel-column field="data_page8_4"  label="Ada Laporan Ke Instansi Yang Berwenang Terkait Pemusnahan" />
                    <vue-excel-column field="data_page8_5"  label="Dokumen Kegiatan Pemusnahan Terpelihara Dengan Baik" />
                    <vue-excel-column field="data_page8_6"  label="Produk Illegal Dan Tms Ditempatkan Terpisah Dengan Produk Yang Masih Layak Pakai/Kondisi Baik" />
                    <vue-excel-column field="data_page8_7"  label="Tersedia BAP Terkait Temuan Produk Illegal dan TMS" />
                    <vue-excel-column field="data_page8_9"  label="Memiliki Tim Audit Internal" />
                    <vue-excel-column field="data_page8_10"  label="Tersedia Jadwal Pelaksanaan Audit Internal Yang Ditandatangani Pimpinan Perusahaan" />
                    <vue-excel-column field="data_page8_11"  label="Tersedia Catatan/Laporan Kegiatan Audit Internal" />
                    <vue-excel-column field="data_page8_12"  label="Tersedia Catatan/Laporan Tindak Lanjut Audit Internal" />
                    <vue-excel-column field="data_page8_13"  label="Dokumen Kegiatan Audit Internal Terpelihara Dengan Baik" />
                    <vue-excel-column field="data_page8_14"  label="Tersedia Jadwal Pelaksanaan Tinjauan Manajemen" />
                    <vue-excel-column field="data_page8_15"  label="Tersedia Catatan/Laporan Kegiatan Tinjauan Manajemen" />
                    <vue-excel-column field="data_page8_16"  label="Tersedia Catatan/Laporan Tindak Lanjut Tinjauan Manajemen" />
                    <vue-excel-column field="data_page8_17"  label="Dokumen Kegiatan Tinjauan Manajemen Terpelihara Dengan Baik" />
                    <vue-excel-column width="300px" field="data_page8_18"  label="Melaksanakan Seleksi Terhadap Pihak Ketiga (Misalnya Untuk Kegiatan Transportasi/Pengiriman, Bengkel/Workshop, Kontrol Hama, Dll)" />
                    <vue-excel-column field="data_page8_19"  label="Tersedia Catatan Hasil Seleksi Pihak Ketiga" />
                    <vue-excel-column field="data_page8_20"  label="Tersedia Mou/Kontrak Kerjasama Yang Jelas Antara Pihak Ketiga Dengan Pak" />
                    <vue-excel-column field="data_page8_21"  label="Adanya Kontrol/Evaluasi Kegiatan Yang Dilakukan Oleh Pihak Ketiga, Sesuai Dengan Yang Telah Disepakati Atau Kontrak Tertulis" />
                                        
                    <vue-excel-column width="300px" field="data_karyawan_tenaga_teknis"  label="Foto Pemeriksaan" />
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
                        nama_perusahaan: d.nama_perusahaan, 
                        status_perusahaan: d.status_perusahaan, 
                        alamat_kantor_dan_telpfax: d.alamat_kantor_dan_telpfax, 
                        alamat_gudang_dan_telpfax: d.alamat_gudang_dan_telpfax, 
                        email: d.email, 
                        nama_pimpinan: d.nama_pimpinan, 
                        nama_penanggung_jawab_teknis: d.nama_penanggung_jawab_teknis, 
                        npwp: d.npwp, 
                        no_izin_penyalur_alat_kesehatan: d.no_izin_penyalur_alat_kesehatan, 
                        status_produk_disalurkan_lokal: d.status_produk_disalurkan_lokal, 
                        status_produk_disalurkan_import: d.status_produk_disalurkan_import, 
                        alkes_elektromagnet_radiasi: d.alkes_elektromagnet_radiasi, 
                        alkes_elektromagnet_nonradiasi: d.alkes_elektromagnet_nonradiasi, 
                        alkes_non_elektromedik_steril: d.alkes_non_elektromedik_steril, 
                        alkes_non_elektromedik_nonsteril: d.alkes_non_elektromedik_nonsteril, 
                        alkes_diagnostik_in_vitro: d.alkes_diagnostik_in_vitro, 
                        jenis_alkes_instrumen_peralatan: d.jenis_alkes_instrumen_peralatan, 
                        jenis_alkes_reagen: d.jenis_alkes_reagen, 
                        jenis_alkes_kalibrator: d.jenis_alkes_kalibrator, 
                        jenis_alkes_bahan_kontrol: d.jenis_alkes_bahan_kontrol, 
                        no_izin_edar_alkes_yang_dimiliki_sebagai_pemegang_izin_edar: d.no_izin_edar_alkes_yang_dimiliki_sebagai_pemegang_izin_edar, 
                        no_izin_edar_alkes_yang_dimiliki_bukan_sebagai_pemegang_izin_edar: d.no_izin_edar_alkes_yang_dimiliki_bukan_sebagai_pemegang_izin_edar, 
                        masih_melakukan_aktifitas_penyaluran_produk: d.masih_melakukan_aktifitas_penyaluran_produk, 
                        data_karyawan_laki: d.data_karyawan_laki, 
                        data_karyawan_wanita: d.data_karyawan_wanita, 
                        data_karyawan_penanggung_jawab_teknis: d.data_karyawan_penanggung_jawab_teknis, 
                        data_karyawan_bekerja_fulltime: d.data_karyawan_bekerja_fulltime, 
                        data_karyawan_bekerja_fulltime_lainnya: d.data_karyawan_bekerja_fulltime_lainnya, 
                        data_karyawan_pendidikan: d.data_karyawan_pendidikan, 
                        data_karyawan_tenaga_teknis: d.data_karyawan_tenaga_teknis, 
                        memiliki_bagan_struktur_organisasi: d.memiliki_bagan_struktur_organisasi, 
                        memiliki_uraian_tugas_dan_tanggung_jawab_tertulis_sesuai_struktur_organisasi: d.memiliki_uraian_tugas_dan_tanggung_jawab_tertulis_sesuai_struktur_organisasi, 
                        memiliki_pedoman_mutu: d.memiliki_pedoman_mutu, 
                        persyaratan_dokumentasi_pasif_1: d.persyaratan_dokumentasi_pasif_1, 
                        persyaratan_dokumentasi_pasif_2: d.persyaratan_dokumentasi_pasif_2, 
                        persyaratan_dokumentasi_pasif_3: d.persyaratan_dokumentasi_pasif_3, 
                        persyaratan_dokumentasi_pasif_4: d.persyaratan_dokumentasi_pasif_4, 
                        persyaratan_dokumentasi_pasif_5: d.persyaratan_dokumentasi_pasif_5, 
                        persyaratan_dokumentasi_pasif_6: d.persyaratan_dokumentasi_pasif_6, 
                        persyaratan_dokumentasi_pasif_7: d.persyaratan_dokumentasi_pasif_7, 
                        persyaratan_dokumentasi_pasif_8: d.persyaratan_dokumentasi_pasif_8, 
                        persyaratan_dokumentasi_pasif_9: d.persyaratan_dokumentasi_pasif_9, 
                        persyaratan_dokumentasi_pasif_10: d.persyaratan_dokumentasi_pasif_10, 
                        persyaratan_dokumentasi_pasif_11: d.persyaratan_dokumentasi_pasif_11, 
                        persyaratan_dokumentasi_pasif_12: d.persyaratan_dokumentasi_pasif_12, 
                        persyaratan_dokumentasi_pasif_13: d.persyaratan_dokumentasi_pasif_13, 
                        persyaratan_dokumentasi_pasif_14: d.persyaratan_dokumentasi_pasif_14, 
                        persyaratan_dokumentasi_pasif_15: d.persyaratan_dokumentasi_pasif_15, 
                        persyaratan_dokumentasi_pasif_16: d.persyaratan_dokumentasi_pasif_16, 
                        persyaratan_dokumentasi_pasif_17: d.persyaratan_dokumentasi_pasif_17, 
                        persyaratan_dokumentasi_pasif_18: d.persyaratan_dokumentasi_pasif_18, 
                        persyaratan_dokumentasi_pasif_19: d.persyaratan_dokumentasi_pasif_19, 
                        persyaratan_dokumentasi_aktif_1: d.persyaratan_dokumentasi_aktif_1, 
                        persyaratan_dokumentasi_aktif_2: d.persyaratan_dokumentasi_aktif_2, 
                        persyaratan_dokumentasi_aktif_3: d.persyaratan_dokumentasi_aktif_3, 
                        persyaratan_dokumentasi_aktif_4: d.persyaratan_dokumentasi_aktif_4, 
                        persyaratan_dokumentasi_aktif_5: d.persyaratan_dokumentasi_aktif_5, 
                        persyaratan_dokumentasi_aktif_6: d.persyaratan_dokumentasi_aktif_6, 
                        persyaratan_dokumentasi_aktif_7: d.persyaratan_dokumentasi_aktif_7, 
                        persyaratan_dokumentasi_aktif_8: d.persyaratan_dokumentasi_aktif_8, 
                        persyaratan_dokumentasi_aktif_9: d.persyaratan_dokumentasi_aktif_9, 
                        persyaratan_dokumentasi_aktif_10: d.persyaratan_dokumentasi_aktif_10, 
                        personalia_dan_pelatihan_1: d.personalia_dan_pelatihan_1, 
                        personalia_dan_pelatihan_2: d.personalia_dan_pelatihan_2, 
                        personalia_dan_pelatihan_3: d.personalia_dan_pelatihan_3, 
                        personalia_dan_pelatihan_4: d.personalia_dan_pelatihan_4, 
                        personalia_dan_pelatihan_5: d.personalia_dan_pelatihan_5, 
                        personalia_dan_pelatihan_6: d.personalia_dan_pelatihan_6, 
                        personalia_dan_pelatihan_7: d.personalia_dan_pelatihan_7, 
                        personalia_dan_pelatihan_8: d.personalia_dan_pelatihan_8, 
                        personalia_dan_pelatihan_9: d.personalia_dan_pelatihan_9, 
                        personalia_dan_pelatihan_10: d.personalia_dan_pelatihan_10, 
                        personalia_dan_pelatihan_11: d.personalia_dan_pelatihan_11, 
                        personalia_dan_pelatihan_12: d.personalia_dan_pelatihan_12, 
                        bangungan_dan_fasilitas_1: d.bangungan_dan_fasilitas_1, 
                        bangungan_dan_fasilitas_2: d.bangungan_dan_fasilitas_2, 
                        bangungan_dan_fasilitas_3: d.bangungan_dan_fasilitas_3, 
                        bangungan_dan_fasilitas_4: d.bangungan_dan_fasilitas_4, 
                        bangungan_dan_fasilitas_5: d.bangungan_dan_fasilitas_5, 
                        bangungan_dan_fasilitas_6: d.bangungan_dan_fasilitas_6, 
                        bangungan_dan_fasilitas_7: d.bangungan_dan_fasilitas_7, 
                        bangungan_dan_fasilitas_8: d.bangungan_dan_fasilitas_8, 
                        bangungan_dan_fasilitas_9: d.bangungan_dan_fasilitas_9, 
                        bangungan_dan_fasilitas_10: d.bangungan_dan_fasilitas_10, 
                        bangungan_dan_fasilitas_11: d.bangungan_dan_fasilitas_11, 
                        bangungan_dan_fasilitas_12: d.bangungan_dan_fasilitas_12, 
                        bangungan_dan_fasilitas_13: d.bangungan_dan_fasilitas_13, 
                        bangungan_dan_fasilitas_14: d.bangungan_dan_fasilitas_14, 
                        bangungan_dan_fasilitas_15: d.bangungan_dan_fasilitas_15, 
                        bangungan_dan_fasilitas_16: d.bangungan_dan_fasilitas_16, 
                        bangungan_dan_fasilitas_17: d.bangungan_dan_fasilitas_17, 
                        bangungan_dan_fasilitas_18: d.bangungan_dan_fasilitas_18, 
                        bangungan_dan_fasilitas_1_1: d.bangungan_dan_fasilitas_1_1, 
                        bangungan_dan_fasilitas_1_2: d.bangungan_dan_fasilitas_1_2, 
                        bangungan_dan_fasilitas_1_3: d.bangungan_dan_fasilitas_1_3, 
                        bangungan_dan_fasilitas_1_4: d.bangungan_dan_fasilitas_1_4, 
                        bangungan_dan_fasilitas_1_5: d.bangungan_dan_fasilitas_1_5, 
                        bangungan_dan_fasilitas_1_6: d.bangungan_dan_fasilitas_1_6, 
                        bangungan_dan_fasilitas_1_7: d.bangungan_dan_fasilitas_1_7, 
                        bangungan_dan_fasilitas_1_8: d.bangungan_dan_fasilitas_1_8, 
                        kebersihan_1: d.kebersihan_1, 
                        kebersihan_2: d.kebersihan_2, 
                        kebersihan_3: d.kebersihan_3, 
                        kebersihan_4: d.kebersihan_4, 
                        bengkel_1: d.bengkel_1, 
                        bengkel_2: d.bengkel_2, 
                        bengkel_3: d.bengkel_3, 
                        bengkel_4: d.bengkel_4, 
                        data_page6_1: d.data_page6_1, 
                        data_page6_2: d.data_page6_2, 
                        data_page6_3: d.data_page6_3, 
                        data_page6_4: d.data_page6_4, 
                        data_page6_5: d.data_page6_5, 
                        data_page6_6: d.data_page6_6, 
                        data_page6_7: d.data_page6_7, 
                        data_page6_8: d.data_page6_8, 
                        data_page6_9: d.data_page6_9, 
                        data_page6_10: d.data_page6_10, 
                        data_page6_11: d.data_page6_11, 
                        data_page6_12: d.data_page6_12, 
                        data_page6_13: d.data_page6_13, 
                        data_page6_14: d.data_page6_14, 
                        data_page6_15: d.data_page6_15, 
                        data_page6_16: d.data_page6_16, 
                        data_page6_17: d.data_page6_17, 
                        data_page6_18: d.data_page6_18, 
                        data_page6_19: d.data_page6_19, 
                        data_page6_20: d.data_page6_20, 
                        data_page6_21: d.data_page6_21, 
                        data_page6_22: d.data_page6_22, 
                        data_page6_23: d.data_page6_23, 
                        data_page6_24: d.data_page6_24, 
                        data_page6_25: d.data_page6_25, 
                        data_page6_26: d.data_page6_26, 
                        data_page6_27: d.data_page6_27, 
                        data_page6_28: d.data_page6_28, 
                        data_page6_29: d.data_page6_29, 
                        data_page6_30: d.data_page6_30, 
                        data_page6_31: d.data_page6_31, 
                        data_page6_32: d.data_page6_32, 
                        data_page6_33: d.data_page6_33, 
                        data_page6_34: d.data_page6_34, 
                        data_page6_35: d.data_page6_35, 
                        data_page6_36: d.data_page6_36, 
                        data_page6_37: d.data_page6_37, 
                        data_page6_38: d.data_page6_38, 
                        data_page6_39: d.data_page6_39, 
                        data_page6_40: d.data_page6_40, 
                        data_page7_1: d.data_page7_1, 
                        data_page7_2: d.data_page7_2, 
                        data_page7_3: d.data_page7_3, 
                        data_page7_4: d.data_page7_4, 
                        data_page7_5: d.data_page7_5, 
                        data_page7_6: d.data_page7_6, 
                        data_page7_7: d.data_page7_7, 
                        data_page7_8: d.data_page7_8, 
                        data_page7_9: d.data_page7_9, 
                        data_page7_10: d.data_page7_10, 
                        data_page7_11: d.data_page7_11, 
                        data_page7_12: d.data_page7_12, 
                        data_page7_13: d.data_page7_13, 
                        data_page7_14: d.data_page7_14, 
                        data_page7_15: d.data_page7_15, 
                        data_page8_1: d.data_page8_1, 
                        data_page8_2: d.data_page8_2, 
                        data_page8_3: d.data_page8_3, 
                        data_page8_4: d.data_page8_4, 
                        data_page8_5: d.data_page8_5, 
                        data_page8_6: d.data_page8_6, 
                        data_page8_7: d.data_page8_7, 
                        data_page8_8: d.data_page8_8, 
                        data_page8_9: d.data_page8_9, 
                        data_page8_10: d.data_page8_10, 
                        data_page8_11: d.data_page8_11, 
                        data_page8_12: d.data_page8_12, 
                        data_page8_13: d.data_page8_13, 
                        data_page8_14: d.data_page8_14, 
                        data_page8_15: d.data_page8_15, 
                        data_page8_16: d.data_page8_16, 
                        data_page8_17: d.data_page8_17, 
                        data_page8_18: d.data_page8_18, 
                        data_page8_19: d.data_page8_19, 
                        data_page8_20: d.data_page8_20, 
                        data_page8_21: d.data_page8_21, 
                        files: data_files_string, 
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