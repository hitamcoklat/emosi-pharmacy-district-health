<template>
    <div>
        <SubMenu />
        <v-content class="pl-0">
          <v-container>
            <v-row no-gutters>
              <v-col cols="12">
                <file-upload
                    ref="upload"
                    v-model="files"
                    :multiple="true"
                    :post-action="`${this.$apiUrl}/upload/petunjuk`"
                    @input="onChangeFile"
                >
                  <v-btn style="margin-bottom: 1em;" elevation="2">Upload Petunjuk</v-btn>
                </file-upload>                   
                
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12">
                <v-alert
                  v-if="infoUploadFile"
                  type="success"
                >File berhasil di upload.</v-alert>                
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12">
                  <pdf
                    @num-pages="pageCount = $event"
                    @page-loaded="currentPage = $event"                
                    style="height: 600px; overflow: auto; border: 1px solid #CCC;"
                    :src="linkPdf"></pdf>
              </v-col>
            </v-row>
                    
          </v-container>
        </v-content>
    </div>
</template>

<script>

import pdf from 'vue-pdf'
import routeList from '@/views/pages/oblik/routeList';
import SubMenu from './SubMenu'

export default {
  name: 'Oblik',
    components: {
        pdf,
        SubMenu
    },
    data () {
      return {
        currentPage: 0,
        pageCount: 0,    
        infoUploadFile: false,      
        items: routeList,
        right: null,
        linkPdf: this.$apiUrl + '/file-upload/petunjuk.pdf',
        files: []
      }
    },
    computed: {

    },
    methods: {
      onChangeFile: function(e) {        
        if (this.$refs.upload.active) 
          return false

        this.$refs.upload.active = true
        this.infoUploadFile = true
        setTimeout(() => {
          this.infoUploadFile = false
        }, 1500);
      },
    },
    created() {
    }
}
</script>
