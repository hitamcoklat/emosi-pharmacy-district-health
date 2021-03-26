<template>
    <div style="padding-left: 1em; padding-right: 1em; margin-top: 1em;">
            <v-row no-gutters>
              <v-col cols="12" lg="12" sm="12" md="12">
                <v-btn depressed color="red" @click="$router.go(-1)" dark elevation="2">Kembali</v-btn>                
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" lg="12" sm="12" md="12">
                  <h2>List Data Indikator Persentase Instalasi Farmasi Kab/Kota yang Mengelola Obat & Vaksin Sesuai Standar</h2>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12">
                <vue-excel-editor autocomplete filter-row ref="grid" v-model="itemData">
                    <vue-excel-column width="200px" field="entry_1092702264"   label="Nama Petugas Pengisi Formulir" />
                    <vue-excel-column width="200px" field="entry_116349522"   label="Nomor Handphone Petugas Pengisi Formulir" />
                    <vue-excel-column width="200px" field="entry_101285633"  label="Kabupaten/Kota" />
                    <vue-excel-column width="200px" field="entry_1473308435" label="Jumlah Penduduk Kabupaten/Kota Tahun 2020" />
                    <vue-excel-column width="200px" field="entry_1143979095"    label="Jumlah Kunjungan Kasus Penyakit di Puskesmas Rawat Jalan dan Rawat Inap Tahun 2019" />
                    <vue-excel-column width="200px" field="entry_1858772161"  label="Lampirkan Surat Keputusan yang ditanda tangani oleh Kepala Daerah melalui email, jika struktur organisasi UPTD" />
                    <vue-excel-column width="200px" field="entry_1460669114"  label="Lampirkan Surat Keputusan/Surat Penugasan/Uraian Tugas Pegawai yang ditunjuk sebagai Penanggung Jawab Instalasi Farmasi melalui email" />
                    <vue-excel-column width="200px" field="entry_230266986"  label="Lampirkan 1 sertifikat pelatihan/surat tugas/foto saat pelatihan yang terakhir kali diikuti melalui email, jika Penanggung Jawab Instalasi Farmasi pernah mengikuti pelatihan Pengelola Obat" />
                    <vue-excel-column width="200px" field="entry_222859530"  label="Pegawai tetap maupun kontrak/pramubakti yang ada di Instalasi Farmasi" />
                    <vue-excel-column width="200px" field="entry_1408411838"  label="Anggaran Obat dan BMHP dari Berbagai Sumber" />
                    <vue-excel-column width="200px" field="entry_501486573"  label="Anggaran Obat Berdasarkan Sumber Anggaran tahun 2020 (DAK)" />
                    <vue-excel-column width="200px" field="entry_1824102050"  label="Anggaran Obat Berdasarkan Sumber Anggaran tahun 2020 (APBD 2)" />
                    <vue-excel-column width="200px" field="entry_1611591121"  label="Anggaran Obat Berdasarkan Sumber Anggaran tahun 2020 (KAPITASI)" />
                    <vue-excel-column width="200px" field="entry_588052904"  label="Anggaran Obat Berdasarkan Sumber Anggaran tahun 2020 (APBD 1)" />
                    <vue-excel-column width="200px" field="entry_1736779268"  label="Anggaran Biaya Operasional yang Tersedia" />                                  
                    <vue-excel-column width="200px" field="entry_848259323"  label="Status Kepemilikan Gedung Instalasi Farmasi" />                                  
                    <vue-excel-column width="200px" field="entry_294604813"  label="Kondisi Gedung Instalasi Farmasi" />                                  
                    <vue-excel-column width="200px" field="entry_155997445"  label="Ruang Administrasi" />                                  
                    <vue-excel-column width="200px" field="entry_2125242524"  label="Ruang Karantina/Area Karantina" />                                  
                    <vue-excel-column width="200px" field="entry_43087646"  label="Ruang Penyimpanan Obat dan BMHP" />                                  
                    <vue-excel-column width="200px" field="entry_1443728309"  label="Penyimpanan Suhu Khusus" />                                  
                    <vue-excel-column width="200px" field="entry_1783512856"  label="Penyimpanan Narkotik/Psikotropik/Prekursor" />                                  
                    <vue-excel-column width="200px" field="entry_1479579599"  label="Penyimpanan Obat dan BMHP Rusak dan Kedaluwarsa" />                                  
                    <vue-excel-column width="200px" field="entry_880701057"  label="Sarana Pengolah Data (Komputer/Laptop)" />                                  
                    <vue-excel-column width="200px" field="entry_430640708"  label="Sarana Pengolah Data (Printer)" />                                  
                    <vue-excel-column width="200px" field="entry_750620757"  label="Sarana Pengolah Data (UPS)" />                                  
                    <vue-excel-column width="200px" field="entry_96200957"  label="Penggunaan aplikasi manajemen obat secara elektronik, jika menggunakan aplikasi E-logistik sudah sampai tahap" />                                  
                    <vue-excel-column width="200px" field="entry_427172942"  label="Mempunyai aplikasi manajemen obat elektronik mandiri" />                                  
                    <vue-excel-column width="200px" field="entry_122862268"  label="Alat Pendukung Jaringan Internet" />                                  
                    <vue-excel-column width="200px" field="entry_319637814"  label="Kendaraan roda empat/transportasi air" />                                  
                    <vue-excel-column width="200px" field="entry_442350784"  label="Kondisi Kendaraan roda empat/transportasi air" />                                  
                    <vue-excel-column width="200px" field="entry_1813834489"  label="Terdapat Box untuk penyimpanan Obat" />                                  
                    <vue-excel-column width="200px" field="entry_1326696117"  label="Terdapat tulisan secara permanen &quot;Kendaraan Operasional Instalasi Farmasi&quot;" />                                  
                    <vue-excel-column width="200px" field="entry_2104860046"  label="Kendaraan roda dua" />                                  
                    <vue-excel-column width="200px" field="entry_582588768"  label="Kondisi Kendaraan Roda Dua" />                                  
                    <vue-excel-column width="200px" field="entry_826772659"  label="Terdapat Box untuk penyimpanan Obat" />                                  
                    <vue-excel-column width="200px" field="entry_1048704191"  label="Terdapat tulisan secara permanen &quot;Kendaraan Operasional Instalasi Farmasi&quot;" />                                  
                    <vue-excel-column width="200px" field="entry_205720571"  label="Sarana Pengaman (Alarm untuk mencegah terjadinya pencurian)" />                                  
                    <vue-excel-column width="200px" field="entry_465947646"  label="Sarana Pengaman (Alarm Kebakaran)" />                                  
                    <vue-excel-column width="200px" field="entry_1918510300"  label="Sarana Pengaman (Melakukan Pemeriksaan Alarm Kebakaran Secara Berkala)" />                                  
                    <vue-excel-column width="200px" field="entry_1841974390"  label="Sarana Pengaman (APAR)" />                                  
                    <vue-excel-column width="200px" field="entry_998230477"  label="Sarana Pengaman (Melakukan Pemeriksaan APAR Secara Berkala)" />                                  
                    <vue-excel-column width="200px" field="entry_1567161500"  label="Sarana Pengaman (CCTV)" />                                  
                    <vue-excel-column width="200px" field="entry_1115045341"  label="Sarana Pengaman (Pagar)" />                                  
                    <vue-excel-column width="200px" field="entry_102859222"  label="Sarana Pengaman (Teralis)" />                                  
                    <vue-excel-column width="200px" field="entry_1719853877"  label="Sarana Penyimpanan (Rak)" />                                  
                    <vue-excel-column width="200px" field="entry_550273218"  label="Sarana Penyimpanan (Pallet)" />                                  
                    <vue-excel-column width="200px" field="entry_572199137"  label="Sarana Penyimpanan (Lemari Narkotika/Psikotropika)" />                                  
                    <vue-excel-column width="200px" field="entry_686229440"  label="Sarana Penyimpanan (Refrigerator Pharmaceutical)" />                                  
                    <vue-excel-column width="200px" field="entry_1169479813"  label="Sarana Penyimpanan (Fungsi Refrigerator Pharmaceutical)" />                                  
                    <vue-excel-column width="200px" field="entry_1423940511"  label="Sarana Penyimpanan (Freezer)" />                                  
                    <vue-excel-column width="200px" field="entry_61179498"  label="Sarana Penyimpanan (Fungsi Freezer)" />                                  
                    <vue-excel-column width="200px" field="entry_1982404012"  label="Sarana Penyimpanan (Cold Box/Vaccine Carrier)" />                                  
                    <vue-excel-column width="200px" field="entry_71103163"  label="Sarana Penyimpanan (Fungsi Cold Box/Vaccine Carrier)" />                                  
                    <vue-excel-column width="200px" field="entry_2104561668"  label="Sarana Penunjang (AC)" />                                  
                    <vue-excel-column width="200px" field="entry_399910362"  label="Sarana Penunjang (Fungsi Air Conditioning)" />                                  
                    <vue-excel-column width="200px" field="entry_144596763"  label="Sarana Penunjang (Exhaust Fan)" />                                  
                    <vue-excel-column width="200px" field="entry_2092180337"  label="Sarana Penunjang (Fungsi Exhaust Fan)" />                                  
                    <vue-excel-column width="200px" field="entry_2133947953"  label="Sarana Penunjang (Termometer Ruangan)" />                                  
                    <vue-excel-column width="200px" field="entry_1701759800"  label="Sarana Penunjang (Pernah Dilakukan Kalibrasi Termometer Secara Rutin)" />                                  
                    <vue-excel-column width="200px" field="entry_1600040244"  label="Sarana Penunjang (Hygrometer/Thermohygrometer)" />                                  
                    <vue-excel-column width="200px" field="entry_637117363"  label="Sarana Penunjang (Pernah Dilakukan Kalibrasi Hygrometer/Thermohygrometer secara rutin)" />                                  
                    <vue-excel-column width="200px" field="entry_434169413"  label="Sarana Penunjang (Genset)" />                                  
                    <vue-excel-column width="200px" field="entry_699061303"  label="Sarana Penunjang (Trolley/Kereta Dorong)" />                                  
                    <vue-excel-column width="200px" field="entry_1283104659"  label="Sarana Penunjang (Hand Pallet/Electric Pallet/Forklift/Hand Forklift)" />                                  
                    <vue-excel-column width="200px" field="entry_1728944441"  label="Sarana Penunjang (Fungsi Hand Pallet/Electric Pallet/Forklift/Hand Forklift)" />                                  
                    <vue-excel-column width="200px" field="entry_450631094"  label="Sarana Penunjang (Tangga)" />                                  
                    <vue-excel-column width="200px" field="entry_855732277"  label="Sarana Penunjang (Timbangan Barang)" />                                  
                    <vue-excel-column width="200px" field="entry_110177228" type="string" label="Sarana Penunjang (Pets Control)" />                                  
                    <vue-excel-column width="200px" field="entry_98299243_1" type="string" label="Perencanaan - Tersedia SOP/prosedur tertulis Perencanaan Obat sesuai dengan format Permenpan dan RB Nomor 35 Tahun 2012 tentang Pedoman Penyusunan SOP AP" />                                  
                    <vue-excel-column width="200px" field="entry_98299243_2" type="string" label="Perencanaan - Ada petugas yang diberikan tanggung jawab khusus terhadap perencanaan" />                                  
                    <vue-excel-column width="200px" field="entry_98299243_3" type="string" label="Perencanaan - Tersedia SK Tim Perencanaan Obat Terpadu (TPOT)" />                                  
                    <vue-excel-column width="200px" field="entry_98299243_4" type="string" label="Perencanaan - TPOT mempunyai rencana kerja" />                                  
                    <vue-excel-column width="200px" field="entry_98299243_5" type="string" label="Perencanaan - Rencana Kebutuhan Obat (RKO) dikirim melalui e-monev katalog obat secara tepat waktu" />                                  
                    <vue-excel-column width="200px" field="entry_98299243_6" type="string" label="Perencanaan - Tidak ada aktifitas dan tidak tersedia dokumen" />                                  
                    <vue-excel-column width="200px" field="entry_326608995_1" type="string" label="Penerimaan - Tersedia SOP/ prosedur tertulis Penerimaan Obat sesuai dengan format Permenpan dan RB Nomor 35 Tahun 2012 tentang Pedoman Penyusunan SOP AP" />                                  
                    <vue-excel-column width="200px" field="entry_326608995_2" type="string" label="Penerimaan - Ada petugas yang diberikan tanggung jawab khusus terhadap penerimaan" />                                  
                    <vue-excel-column width="200px" field="entry_326608995_3" type="string" label="Penerimaan - Tersedia Dokumen Penerimaan (surat pengiriman barang)" />                                  
                    <vue-excel-column width="200px" field="entry_326608995_4" type="string" label="Penerimaan - Petugas melakukan pemeriksaan kesesuaian antara dokumen dan fisik barang meliputi: nama obat kekuatan sediaan bentuk sediaan jumlah obat tanggal kedaluwarsa dan kondisi obat" />                                  
                    <vue-excel-column width="200px" field="entry_326608995_5" type="string" label="Penerimaan - Tidak ada aktifitas dan tidak tersedia dokumen" />                                  
                    <vue-excel-column width="200px" field="entry_951153286_1" type="string" label="Penyimpanan - Tersedia SOP/prosedur tertulis Penyimpanan Obat sesuai dengan format Permenpan dan RB Nomor 35 Tahun 2012 tentang Pedoman Penyusunan SOP AP" />                                  
                    <vue-excel-column width="200px" field="entry_951153286_2" type="string" label="Penyimpanan - Ada petugas yang diberikan tanggung jawab khusus terhadap penyimpanan" />                                  
                    <vue-excel-column width="200px" field="entry_951153286_3" type="string" label="Penyimpanan - Tersedia dokumen pencatatan suhu dan kelembaban di ruang penyimpanan" />                                  
                    <vue-excel-column width="200px" field="entry_951153286_4" type="string" label="Penyimpanan - Ruang penyimpanan bersih dan rapi" />                                  
                    <vue-excel-column width="200px" field="entry_951153286_5" type="string" label="Penyimpanan - Penyusunan obat menggunakan prinsip First Expired First Out (FEFO) dan First In First Out (FIFO)" />                                  
                    <vue-excel-column width="200px" field="entry_951153286_6" type="string" label="Penyimpanan - Pengelompokan  dilakukan secara jenis peruntukkan (program dan non program) bentuk sediaan alfabetis dan farmakologi" />                                  
                    <vue-excel-column width="200px" field="entry_951153286_7" type="string" label="Penyimpanan - Dilakukan pengamatan mutu obat secara organoleptis dan dicatat dalam buku catatan penyimpanan obat" />                                  
                    <vue-excel-column width="200px" field="entry_951153286_8" type="string" label="Penyimpanan - Tidak ada aktifitas dan tidak tersedia dokumen" />                                  
                    <vue-excel-column width="200px" field="entry_1708223880" type="string" label="Penyimpanan - Melakukan Penyimpanan Obat dan BMHP Satu Pintu" />                                  
                    <vue-excel-column width="200px" field="entry_1008775876_1" type="string" label="Distribusi - Tersedia SOP/ prosedur tertulis Distribusi Obat sesuai dengan format Permenpan dan RB Nomor 35 Tahun 2012 tentang Pedoman Penyusunan SOP AP" />                                  
                    <vue-excel-column width="200px" field="entry_1008775876_2" type="string" label="Distribusi - Ada petugas yang diberikan tanggung jawab khusus terhadap distribusi" />                                  
                    <vue-excel-column width="200px" field="entry_1008775876_3" type="string" label="Distribusi - Tersedia jadwal distribusi" />                                  
                    <vue-excel-column width="200px" field="entry_1008775876_4" type="string" label="Distribusi - Melakukan verifikasi data LPLPO Puskesmas" />                                  
                    <vue-excel-column width="200px" field="entry_1008775876_5" type="string" label="Distribusi - Tersedia dokumen Surat Bukti Barang Keluar (SBBK) obat dan BMHP pada saat penyerahan" />                                  
                    <vue-excel-column width="200px" field="entry_1008775876_6" type="string" label="Distribusi - Melakukan pengecekan terhadap obat dan BMHP sebelum penyerahan" />                                  
                    <vue-excel-column width="200px" field="entry_1008775876_7" type="string" label="Distribusi - Tidak ada aktifitas dan tidak tersedia dokumen" />                                  
                    <vue-excel-column width="200px" field="entry_939702821_1" type="string" label="Pencatatan dan Pelaporan - Tersedia SOP/ prosedur tertulis Pencatatan dan Pelaporan sesuai dengan format Permenpan dan RB Nomor 35 Tahun 2012 tentang Pedoman Penyusunan SOP AP" />                                  
                    <vue-excel-column width="200px" field="entry_939702821_2" type="string" label="Pencatatan dan Pelaporan - Ada petugas yang diberikan tanggung jawab khusus terhadap pencatatan dan pelaporan" />                                  
                    <vue-excel-column width="200px" field="entry_939702821_3" type="string" label="Pencatatan dan Pelaporan - Kartu stok sudah diisi dengan benar" />                                  
                    <vue-excel-column width="200px" field="entry_939702821_4" type="string" label="Pencatatan dan Pelaporan - Tersedia Dokumen Dinamika Logistik Obat/ Laporan Mutasi Obat pada periode tertentu" />                                  
                    <vue-excel-column width="200px" field="entry_939702821_5" type="string" label="Pencatatan dan Pelaporan - Melakukan Stok Opname secara periodik" />                                  
                    <vue-excel-column width="200px" field="entry_939702821_6" type="string" label="Pencatatan dan Pelaporan - Tersedia catatan tersendiri untuk obat rusak/kedaluwarsa" />                                  
                    <vue-excel-column width="200px" field="entry_939702821_7" type="string" label="Pencatatan dan Pelaporan - Tidak ada aktifitas dan tidak ada dokumen" />                                  
                    <vue-excel-column width="200px" field="entry_1068412331_1" type="string" label="Pemusnahan - Tersedia SOP/ prosedur tertulis Pemusnahan obat sesuai dengan format Permenpan dan RB Nomor 35 Tahun 2012 tentang Pedoman Penyusunan SOP AP" />                                  
                    <vue-excel-column width="200px" field="entry_1068412331_2" type="string" label="Pemusnahan - Tersedia SK Tim/Panitia Pemusnahan" />                                  
                    <vue-excel-column width="200px" field="entry_1068412331_3" type="string" label="Pemusnahan - Tersedia Berita Acara Pemeriksaan Obat kedaluwarsa" />                                  
                    <vue-excel-column width="200px" field="entry_1068412331_4" type="string" label="Pemusnahan - Tersedia Berita Acara Pemusnahan Obat kedaluwarsa" />                                  
                    <vue-excel-column width="200px" field="entry_1068412331_5" type="string" label="Pemusnahan - Tersedia dokumen surat pengajuan penghapusan Barang Milik Daerah" />                                  
                    <vue-excel-column width="200px" field="entry_1068412331_6" type="string" label="Pemusnahan - Tidak pernah melakukan pemusnahan dan tidak ada dokumen/SOP pemusnahan" />                                  
                    <vue-excel-column width="200px" field="entry_1131564199_1" type="string" label="Pengembangan Kompetensi - Melaksanakan Peningkatan Kapasitas SDM di Puskesmas" />                                  
                    <vue-excel-column width="200px" field="entry_1131564199_2" type="string" label="Pengembangan Kompetensi - Melaksanakan Supervisi/Bimbingan Teknis ke Puskesmas" />                                  
                    <vue-excel-column width="200px" field="entry_1131564199_3" type="string" label="Pengembangan Kompetensi - Melaksanakan Pertemuan Koordinasi dengan Puskesmas" />                                  
                    <vue-excel-column width="200px" field="entry_1131564199_4" type="string" label="Pengembangan Kompetensi - Tidak ada aktifitas" />                                  
                    <vue-excel-column width="200px" field="entry_696846582" type="string" label="Sertifikasi Instalasi Farmasi - Instalasi Farmasi telah tersertifikasi ISO 9001:2015?" />                                  
                    <vue-excel-column width="200px" field="entry_1475964230" type="string" label="Jika sudah tersertifikasi, tahun berapakah Instalasi Farmasi mendapat sertifikasi ISO 9001:2015?" />                                  
                    <vue-excel-column width="200px" field="entry_1676188844" type="string" label="Jika sudah tersertifikasi, apa ruang lingkup/scope yang disertifikasi?" :link="routeToUserFunc" />                                  
                </vue-excel-editor> 
              </v-col>
            </v-row>              
    </div>
</template>

<script>

import routeList from '@/views/pages/oblik/routeList';
import SubMenu from './SubMenu'

export default {
    components: {
        SubMenu
    },
    data () {
      return {
        currentPage: 0,
        pageCount: 0,          
        items: routeList,
        right: null,
        itemData: [],
        idDaerah: '',
        jenisLogin: ''
      }
    },
    methods: {
        fetchData: function() {
            this.$http.get(this.$apiUrl + '/oblik/get-indikator-persentase?id_daerah=' + this.idDaerah)
            .then((response) => {
                if(response.data.status == true) {
                    let data = []
                    response.data.data.map((item, index) => {
                        data.push(item.CONTENT)
                    })
                    this.itemData = data
                }
                // console.log(data)
            })             
        },
        routeToUserFunc: function(content, record) {
            console.log('kampret')
        }
    },
    created() {
      if(this.$store.getters.userData.JENIS_LOGIN == 'provinsi') {
        this.idDaerah = 32
      } else {
        this.idDaerah = this.$store.getters.userData.KODE_DAERAH
      }
      this.jenisLogin = this.$store.getters.userData.JENIS_LOGIN
      this.fetchData()
    }
}
</script>
