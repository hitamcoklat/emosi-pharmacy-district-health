<template>
    <div>
        <SubMenu />
        <v-content class="pl-0">
          <v-container>
                <p style="font-weight: bold; font-size: 1.3em;" class="mt-n12 mx-auto">INSTRUMEN MONITORING KETERSEDIAAN OBAT DAN PELAYANAN KEFARMASIAN DI PUSKESMAS</p>
                <v-btn color="primary" dark @click="dialog = true">INPUT RESPONDEN & DATA UMUM</v-btn>
                <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                    <template v-slot:activator="{ on }">
                        
                    </template>
                    <v-card>
                        <v-toolbar dark color="primary">
                        <v-btn icon dark @click="dialog = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-toolbar-title>Input Hasil Perjalanan Dinas</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-btn dark text @click="simpanPerjadin">Simpan</v-btn>
                        </v-toolbar-items>
                        </v-toolbar>
                        <v-list three-line subheader>
                        <v-container class="grey lighten-5">
                            <v-row no-gutters>
                              <v-col class="pa-10">
                                <label style="font-weight: bold;">IDENTITAS RESPONDEN</label>
                                <v-text-field class="pb-0 mb-0" label="Nama Responden"></v-text-field>                             
                                <v-text-field class="pa-0 ma-0" label="Jabatan"></v-text-field>                             
                                <v-text-field class="pa-0 ma-0" label="Nomor HP"></v-text-field>                             
                                <v-text-field class="pa-0 ma-0" label="Email"></v-text-field>                             
                                <br />
                                <label style="font-weight: bold;">DATA UMUM</label>
                                <v-text-field class="pb-0 mb-0" label="Nama Puskesmas"></v-text-field>                             
                                <v-text-field class="pa-0 ma-0" label="Alamat Puskesmas"></v-text-field>                             
                                <v-text-field class="pa-0 ma-0" label="Telepon & Faks"></v-text-field>                             
                                <v-text-field class="pa-0 ma-0" label="E-mail"></v-text-field>                             
                                <v-text-field class="pa-0 ma-0" label="Provinsi"></v-text-field>   
                                <v-col class="d-flex pa-0 ma-0" cols="12">
                                    <v-select
                                    :items="itemsPerawatan"
                                    label="Puskesmas"
                                    outlined
                                    ></v-select>
                                </v-col>                                                          
                                <v-text-field class="pa-0 ma-0" label="Jumlah Tempat Tidur"></v-text-field>   
                                <br />

                              </v-col>
                              <v-col class="pa-10">
                                                                <label style="font-weight: bold;">SUMBER DAYA MANUSIA</label>
                                <v-text-field label="Jumlah Dokter Spesialis (Orang)"></v-text-field>                             
                                <v-text-field label="Jumlah Dokter Umum (Orang)"></v-text-field>                             
                                <v-text-field label="Jumlah Tenaga Kefarmasian Apoteker (Orang)"></v-text-field>                             
                                <v-text-field label="Jumlah Tenaga Kefarmasian S1 Farmasi (Orang)"></v-text-field>                             
                                <v-text-field label="Jumlah Tenaga Kefarmasian D3 Farmasi (Orang)"></v-text-field>                             
                                <v-text-field label="Jumlah Tenaga Kefarmasian SMF (Orang)"></v-text-field>                             
                                <v-text-field label="Jumlah Tenaga Kefarmasian Lain-lain (Orang)"></v-text-field>                                                                      
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-list>
                    </v-card>
                    </v-dialog>                 
          </v-container>
        </v-content>
        <v-dialog
          v-model="dialogLoading"
          hide-overlay
          persistent
          width="300"
        >
          <v-card
            color="primary"
            dark
          >
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
    </div>
</template>

<script>

import obat40item from '@/config/obat40item'
import routeList from '@/views/pages/oblik/routeList';
import SubMenu from './SubMenu'

export default {
  name: 'Oblik',
    data () {
      return {
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
        dialogLoading: false,
        itemsPerawatan: ['Perawatan', 'Non Perawatan'],
        items: routeList,
        itemObat: obat40item,
        lama_perjalanan: '',
        tempat_kunjungan: '',
        modal: false,
        date: new Date().toISOString().substr(0, 10),
        menu: false,        
        right: null,      
      }
    },
    components: {
      SubMenu
    },    
    methods: {
      simpanPerjadin: function() {
        this.dialogLoading = true
        setTimeout(() => {
          this.dialogLoading = false                
          this.dialog = false;
        }, 2000);         
      }
    },
    created() {
      console.log(this.itemObat);
    }
}
</script>
