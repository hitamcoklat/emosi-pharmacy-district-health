<template>
  <v-dialog v-model="dialogCapa" persistent max-width="490">
    <v-card style="padding-top: 1em">
      <v-card-text style="padding-top: 1em">
        <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="pickerDate"
              label="Tanggal Perbaikan"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="pickerDate"
            @input="menu2 = false"
          ></v-date-picker>
        </v-menu>
        <v-text-field
          v-model="insertStatusCapa"
          label="Status CAPA"
          placeholder="Masukan Status CAPA"
          outlined
        ></v-text-field>
        <v-row no-gutters>
          <v-col
            v-if="files.length > 0"
            v-for="(item, index) in files"
            :key="index"
            cols="12"
          >
            <v-card class="mx-auto" outlined style="margin-bottom: 1em">
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="headline mb-1">
                    {{ namaFiles[index] }} Berhasil di Upload
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-card-actions>
                <v-btn @click="clickFile()" outlined rounded text>
                  Hapus
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <file-upload
          ref="upload"
          v-model="files"
          :multiple="true"
          :post-action="`${this.$apiUrl}/upload`"
          @input="onChangeFile"
        >
          <v-btn style="margin-bottom: 1em" color="info" elevation="2"
            >Tambahkan File</v-btn
          >
        </file-upload>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="dialogCapa = false">
          Tutup
        </v-btn>
        <v-btn dark color="green" @click="submitCapa"> Submit </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      pickerDate: new Date().toISOString().substr(0, 10),
      dialogCapa: false,
      right: null,
      files: [],
      menu2: true,
      tampilanTableCabang: true,
      tampilanExcellCabang: false,
      selectedCapa: "",
    };
  },
};
</script>