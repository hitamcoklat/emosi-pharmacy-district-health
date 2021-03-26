<template>
    <div>
        <v-card
          outlined
          flat
          height="auto"
          width="256"
          class="mx-auto float-left"
        >
          <v-navigation-drawer permanent>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="title">
                  Sub Menu
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list
              dense
              nav
            >
              <v-list-item
                v-for="item in items"
                :key="item.title"
                link
              >
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <router-link tag="span" :to=item.toLink>
                <v-list-item-content>
                  <p>{{ item.title }}</p>
                </v-list-item-content>
                </router-link>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>
        </v-card>
        <v-content class="pl-0">
          <v-container>
            <p style="font-weight: bold; font-size: 1.3em;" class="mt-n12 mx-auto">Laporan Pelayanan Kefarmasian dan POR di Puskesmas</p>
            <iframe style="width: 100%; height: 700px; border: 0 !important;" src="https://docs.google.com/forms/d/e/1FAIpQLScFeMfa9G8AOPuKc4VnxTT1R8Z1FkwOjwlQ50HYb19NkMgbrA/viewform" />
          </v-container>
        </v-content>
    </div>
</template>

<script>

import obat40item from '@/config/obat40item'
import {ListBulan, ListTahun} from '@/config'
import itemVaksin from '@/config/vaksin5item'
import routeList from '@/views/pages/monev/routeList';
import readXlsxFile from 'read-excel-file'

export default {
  name: 'FormPOR',
    data () {
      return {
        items: routeList,
        itemObat: [],
        jmlObat: [],
        right: null,
        itemTahun: ListTahun,
        itemBulan: ListBulan,
        itemJenis: ['Obat', 'Vaksin'],
        pilihJenis: '',
        pilihTahun: '',
        pilihBulan: '',
        isUpdate: false,
        dialogLoading: false,
        showWarning: true,
        idDaerah: '',
        textButton: 'Insert Data',
        id: ''
      }
    },
    methods: {

      updateData: function() {

        let dataInput = (this.pilihJenis == 'Obat') ? obat40item : itemVaksin

        dataInput.forEach((index, item) => {
          this.jmlObat[item] = this.jmlObat[item]
        })

        let data = {
            itemObat: this.itemObat,
            jmlObat: this.jmlObat,
            idDaerah: this.idDaerah,
            thn: this.pilihTahun,
            bln: ListBulan.indexOf(this.pilihBulan) + 1,
            jenis: this.pilihJenis
        }

        let url = (this.isUpdate == false) ? this.$apiUrl + '/obat/insert?jenis=' + this.pilihJenis : this.$apiUrl + '/obat/update?jenis=' + this.pilihJenis + '&id=' + this.id
        
        this.dialogLoading = true
        this.$http.post(url, data)
            .then((response) => {
              this.dialogLoading = false
              if(response.data.status == true) {
                this.$swal(
                  'Success!',
                  'Data Berhasil di Input!',
                  'success'        
                );
                this.isUpdate = true                  
              }else{
              }
            })    

      },

      downloadTemplate: function() {
        console.log(this.pilihJenis)
        if(this.pilihJenis == 'Obat') {
          window.location.href='http://app.diskes.jabarprov.go.id/e-mosi/upload/template-obat.xlsx'
        }
        if(this.pilihJenis == 'Vaksin') {
          window.location.href='http://app.diskes.jabarprov.go.id/e-mosi/upload/template-vaksin.xlsx'
        }
      },

      uploadTemplate: function() {
        console.log('upload template')
        console.log(this.pilihJenis)
        
        const input = document.getElementById('templateExcell')

        readXlsxFile(input.files[0]).then((rows) => {
          console.log(rows)
          // `rows` is an array of rows
          // each row being an array of cells.
          if(this.pilihJenis == 'Obat') {
            var jmlObat = [];
            for(var i=1; i<=40; i++) {
              console.log(rows[i][1])
              jmlObat[i] = rows[i][3]
            }
            this.jmlObat = jmlObat;
          }else if(this.pilihJenis == 'Vaksin') {
            var jmlObat = [];
            for(var i=1; i<=5; i++) {
              console.log(rows[i][1])
              jmlObat[i] = rows[i][3]
            }
            this.jmlObat = jmlObat;
          }

        })        
      },
      
      fetchData: function () {

        if(this.pilihJenis != '' && this.pilihTahun != '') {
          this.showWarning = false
          this.itemObat = (this.pilihJenis == 'Obat') ? obat40item : itemVaksin
        }
        
        let indexBulan = ListBulan.indexOf(this.pilihBulan) + 1;

        this.dialogLoading = true
        this.$http.get(this.$apiUrl + '/obat?jenis=' + this.pilihJenis + '&thn=' + this.pilihTahun + '&bln='+indexBulan+'&id_daerah=' + this.idDaerah)
            .then(res => JSON.parse(JSON.stringify(res)))
            .then(response => {
              
              this.dialogLoading = false

              if(response.data.status == true) {
                console.log('masuk kesini')
                
                this.isUpdate = true
                this.textButton = 'Update Data'
                this.id = response.data.data.id

                let dataObat = response.data.data.CONTENT.ITEM_OBAT;
                var jmlObat = [];
              
                dataObat.forEach((index, item) => {
                  jmlObat[item] = response.data.data.CONTENT.JML_OBAT[item]
                })
                
                this.jmlObat = jmlObat;                
              
              } else {
                this.isUpdate = false
                this.jmlObat = []
              }
            })
      }
    },
    created() {
      this.idDaerah = this.$store.getters.userData.KODE_DAERAH
    }
}
</script>
