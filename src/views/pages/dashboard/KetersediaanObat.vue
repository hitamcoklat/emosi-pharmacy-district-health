<template>
      <v-row>
          <v-col sm="6" md="6" cols="6">
              <v-row no-gutters>
                <v-btn elevation="0" outlined>I. Ketersediaan Obat Provinsi</v-btn>                  
              </v-row>
              <v-row no-gutters>
                <v-col sm="4" md="4" lg="4">
                  <v-select
                    :items="listKabkot"
                    item-text="namaKabkot"
                    item-value="kodeKabkot"
                    label="Pilih Kabupaten/Kota"
                  ></v-select>                  
                </v-col>
                <v-col class="mt-3 pl-5" cols="4" sm="4" md="4" lg="4">
                    <v-btn @click="showVaksin = false; showObat = true;" dark color="teal">40 Item Obat</v-btn>
                </v-col>
                <v-col class="mt-3" cols="4" sm="4" md="4" lg="4">
                    <v-btn @click="showVaksin = true; showObat = false;" dark color="blue lighten-1">5 Item Vaksin</v-btn>                    
                </v-col>
              </v-row>              
              <v-row style="padding: 1em; border: 1px solid #CCC;" no-gutters>
                <v-simple-table v-if="showObat" style="width: 100%; max-height: 400px; overflow: auto;">
                    <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">Nama Obat</th>
                            <th class="text-left">Satuan</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in listObat" :key="item.name">
                        <td>{{ item.NAMA_OBAT }}</td>
                        <td>{{ item.SATUAN }}</td>
                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>                  
                <v-simple-table v-if="showVaksin" style="width: 100%; max-height: 400px; overflow: auto;">
                    <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">Nama Obat</th>
                            <th class="text-left">Satuan</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in listVaksin" :key="item.name">
                        <td>{{ item.NAMA_OBAT }}</td>
                        <td>{{ item.SATUAN }}</td>
                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>                  
              </v-row>
          </v-col>
          <v-col sm="6" md="6" cols="6">
              <v-row no-gutters>
                <v-btn elevation="0">Chart</v-btn>                  
              </v-row>
              <v-row style="padding-top: 1em;" no-gutters>
                <zingchart :data="chartData"></zingchart>
              </v-row>
          </v-col>
      </v-row>    
</template>
<script>

import listKabkot from '../../../config/listKabkot'
import obatItem from '../../../config/obat40item'
import vaksinItem from '../../../config/vaksin5item'

export default {
    data() {
        return {
            listKabkot: listKabkot,
            listObat: obatItem,
            listVaksin: vaksinItem,
            showObat: true,
            showVaksin: false,
            chartData: {
                type: 'bar',
                preview: { live: true },
                legend: { draggable: true },
                backgroundColor: '#292F3D',
                // height: '432px',
                scaleX: {
                    label: {
                        text: 'Days'
                    },
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },            
                series: [
                    {
                        // plot 1 values, linear data
                        values: [23, 20, 27, 29, 25, 17, 15],
                        text: 'Week 1',
                        backgroundColor: '#4d80a6'
                    }
                ]
            }      
        }
    },
    created() {

    }
}
</script>