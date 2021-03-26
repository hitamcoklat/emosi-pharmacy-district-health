<template>
<v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="closeObatPublik"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Pelayanan Kefarmasian</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-row>
          <v-col>
            <v-card
              style="margin: 10px; float: left;"
              width="300"
              outlined
              v-for="(item, index) in listKabkot" :key="index"
            >
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="headline">{{item.namaKabkot}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-card-actions>
                <v-btn @click="openPopUpKab(item)" outlined color="primary" dark>Lihat</v-btn>
              </v-card-actions>
            </v-card>          
          </v-col>
        </v-row>
      </v-card>
      <PopUpDetailKab v-if="popUpKab" @closeObatKab="closeObatKab" :dataKabkot="dataKabkot" /> 
    </v-dialog>   
</template>
<script>
import ListKabkot from '../../../../config/listKabkot'
import PopUpDetailKab from './sub/PopUpDetailKab'

export default {
    name: 'Yanfar',
    props: ['dialogProp'],
    components: { 
      PopUpDetailKab,
    },    
    data () {
      return {
        dialog: true,
        popUpKab: false,
        listKabkot: ListKabkot,
        dataKabkot: []
      }
    },
    methods: {
        closeObatPublik() {
          this.$emit('closeYanfar')
        },
        closeObatKab() {
          this.popUpKab = false
        },
        openPopUpKab(item) {
          this.dataKabkot = item
          this.popUpKab = true
        }
    }

}
</script>