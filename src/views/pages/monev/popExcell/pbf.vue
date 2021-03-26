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
                    <vue-excel-column field="tgl_periksa"   label="Tanggal Periksa" />
                    <vue-excel-column field="nama_pbf"  label="Nama PBF" />
                    <vue-excel-column field="alamat_pbf" label="Alamat PBF" />
                    <vue-excel-column field="kab_kota"  label="Kab/Kota" />
                    <vue-excel-column field="status_pbf"  label="Status PBF" />
                    <vue-excel-column field="jenis_pbf"  label="Jenis PBF" />
                    <vue-excel-column field="no_izin_pbf"  label="No. Izin PBF" />
                    <vue-excel-column field="tgl_terbit_izin"  label="Tgl. Terbit izin PBF" />
                    <vue-excel-column field="hasil_tinjauan"  label="Hasil Tinjauan" />
                    <vue-excel-column field="sertifikat_codb"  label="Sertifikat CDOB dari BPOM dan/atau Rekomendasi Pemenuhan Aspek CDOB" />
                    <vue-excel-column field="nib"  label="NIB ( Nomor Induk Berusaha)" />
                    <vue-excel-column field="izin_oss"  label="Izin OSS" />
                    <vue-excel-column field="nama_apoteker"  label="NAMA APOTEKER PENANGGUNG JAWAB" />
                    <vue-excel-column field="pemeriksaan_apj_ada_ditempat"  label="Pada Saat Pemeriksaan APJ ada ditempat ?" />
                    <vue-excel-column field="lainnya"  label="Alasan Lainnya" />
                    <vue-excel-column field="no_stra"  label="Nomor STRA" />
                    <vue-excel-column field="masa_berlaku_stra"  label="Masa Berlaku STRA" />
                    <vue-excel-column field="no_sipa"  label="Nomor SIPA" />
                    <vue-excel-column field="masa_berlaku_sipa"  label="Masa Berlaku SIPA" />
                    <vue-excel-column field="gudang_penyimpanan_obat"  label="Gudang/Tempat Penyimpanan Obat" />
                    <vue-excel-column field="dokumentasi"  label="Dokumentasi" />
                    <vue-excel-column field="job_description"  label="Job Description (APJ)" />
                    <vue-excel-column field="alur_proses"  label="Alur proses perolehan sediaan farmasi dan distribusi" />
                    <vue-excel-column field="lapor_ereport"  label="Periode Terakhir Melaporkan ereport" />
                    <vue-excel-column field="hasil_tinjauan_asal_obat"  label="Hasil Tinjauan asal perolehan obat" />
                    <vue-excel-column field="hasil_tinjauan_distribusi_obat"  label="Hasil Tinjauan pendistribusian obat" />
                    <vue-excel-column field="teguran_bpom"  label="Teguran BPOM" />
                    <vue-excel-column field="progres_capa"  label="Progress CAPA" />
                    <vue-excel-column field="komitment_penyelesaian_capa"  label="Komitmen penyelesaian CAPA" />
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
                        tgl_periksa: d.tgl_periksa, 
                        nama_pbf: d.nama_pbf, 
                        alamat_pbf: d.alamat_pbf, 
                        kab_kota: d.kab_kota, 
                        status_pbf: d.status_pbf, 
                        jenis_pbf: d.jenis_pbf, 
                        no_izin_pbf: d.no_izin_pbf, 
                        tgl_terbit_izin: d.tgl_terbit_izin, 
                        hasil_tinjauan: d.hasil_tinjauan, 
                        sertifikat_codb: d.sertifikat_codb, 
                        nib: d.nib, 
                        izin_oss: d.izin_oss, 
                        nama_apoteker: d.nama_apoteker, 
                        pemeriksaan_apj_ada_ditempat: d.pemeriksaan_apj_ada_ditempat, 
                        lainnya: d.lainnya, 
                        no_stra: d.no_stra, 
                        masa_berlaku_stra: d.masa_berlaku_stra, 
                        no_sipa: d.no_sipa, 
                        masa_berlaku_sipa: d.masa_berlaku_sipa, 
                        gudang_penyimpanan_obat: d.gudang_penyimpanan_obat, 
                        dokumentasi: d.dokumentasi, 
                        job_description: d.job_description, 
                        alur_proses: d.alur_proses, 
                        lapor_ereport: d.lapor_ereport, 
                        hasil_tinjauan_asal_obat: d.hasil_tinjauan_asal_obat, 
                        hasil_tinjauan_distribusi_obat: d.hasil_tinjauan_distribusi_obat, 
                        teguran_bpom: d.teguran_bpom, 
                        progres_capa: d.progres_capa, 
                        komitment_penyelesaian_capa: d.komitment_penyelesaian_capa, 
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