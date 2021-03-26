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
              <p style="font-weight: bold; font-size: 1.3em;" class="mt-n12 mx-auto">IFK. FORM MONEV Daftar 150 Item Obat & Vaksin</p>
              <v-simple-table height="600px">
                <template v-slot:default>
                  <thead>
                        <th>No</th>
                        <th>NAMA OBAT</th>
                        <th>SATUAN</th>
                        <th>SISA STOK</th>
                        <th><br>PEMAKAIAN <br><br>RATA-RATA</th>
                        <th><br>TINGKAT KETERSEDIAAN<br>(BULAN)</th>
                  </thead>
                  <tbody>
 <tr>
    <td>1<br></td>
    <td>Albendazol tablet  400 mg</td>
    <td>Tablet</td>
    <td><v-text-field label=""></v-text-field></td>
    <td><v-text-field label=""></v-text-field></td>
    <td><v-text-field label=""></v-text-field></td>
  </tr>
  <tr>
    <td>2</td>
    <td>Alopurinol tablet 100 mg</td>
    <td>Tablet</td>
    <td><v-text-field label=""></v-text-field></td>
    <td><v-text-field label=""></v-text-field></td>
    <td><v-text-field label=""></v-text-field></td>
  </tr>
  <tr>
    <td>3</td>
    <td>Aminofilin injeksi 24 mg/ml</td>
    <td>Vial</td>
    <td><v-text-field label=""></v-text-field></td>
    <td><v-text-field label=""></v-text-field></td>
    <td><v-text-field label=""></v-text-field></td>
  </tr>
  <tr>
    <td>4</td>
    <td>Aminofilin tablet 200 mg</td>
    <td>Tablet</td>
    <td><v-text-field label=""></v-text-field></td>
    <td><v-text-field label=""></v-text-field></td>
    <td><v-text-field label=""></v-text-field></td>
  </tr>
  <tr>
    <td>5</td>
    <td>Amitriptilin tablet salut 25 mg (HCl)</td>
    <td>Tablet  salut</td>
    <td><v-text-field label=""></v-text-field></td>
    <td><v-text-field label=""></v-text-field></td>
    <td><v-text-field label=""></v-text-field></td>
  </tr>
  <tr>
    <td>6</td>
    <td>Amlodipin tablet 5 mg</td>
    <td>Tablet</td>
    <td><v-text-field label=""></v-text-field></td>
    <td><v-text-field label=""></v-text-field></td>
    <td><v-text-field label=""></v-text-field></td>
  </tr>
  <tr>
    <td>7</td>
    <td>Amoksisilin kaplet  500 mg</td>
    <td>Kaplet</td>
    <td><v-text-field label=""></v-text-field></td>
    <td><v-text-field label=""></v-text-field></td>
    <td><v-text-field label=""></v-text-field></td>
  </tr>
  <tr>
    <td>8</td>
    <td>Amoksisilin sirup kering 250 mg/5ml</td>
    <td>Botol</td>
    <td><v-text-field label=""></v-text-field></td>
    <td><v-text-field label=""></v-text-field></td>
    <td><v-text-field label=""></v-text-field></td>
  </tr>
  <tr>
    <td>9</td>
    <td>Ampisilin serbuk injeksi 1000 mg/vial</td>
    <td>Vial</td>
    <td><v-text-field label=""></v-text-field></td>
    <td><v-text-field label=""></v-text-field></td>
    <td><v-text-field label=""></v-text-field></td>
  </tr>
  <tr>
    <td>10</td>
    <td>Antasida DOEN I tablet kunyah, kombinasi : <br>Aluminium Hidroksida           200 mg <br>Magnesium Hidroksida         200 mg</td>
    <td>Tablet kunyah</td>
    <td><v-text-field label=""></v-text-field></td>
    <td><v-text-field label=""></v-text-field></td>
    <td><v-text-field label=""></v-text-field></td>
  </tr>
  <tr>
    <td>11</td>
    <td>Antasida DOEN II suspensi, kombinasi :<br>Aluminium Hidroksida             200 mg/5 ml <br>Magnesium Hidroksida           200 mg/5 ml</td>
    <td>Botol</td>
    <td><v-text-field label=""></v-text-field></td>
    <td><v-text-field label=""></v-text-field></td>
    <td><v-text-field label=""></v-text-field></td>
  </tr>
  <tr>
    <td>12</td>
    <td>Anti-fungi DOEN Kombinasi:<br>Asam Benzoat 6% +  Asam Salisilat 3%<br></td>
    <td>Pot</td>
    <td><v-text-field label=""></v-text-field></td>
    <td><v-text-field label=""></v-text-field></td>
    <td><v-text-field label=""></v-text-field></td>
  </tr>
  <tr>
    <td>13</td>
    <td>Arthemeter injeksi 80 mg/ml</td>
    <td>Ampul</td>
    <td><v-text-field label=""></v-text-field></td>
    <td><v-text-field label=""></v-text-field></td>
    <td><v-text-field label=""></v-text-field></td>
  </tr>
  <tr>
    <td>14</td>
    <td>Artesunate serbuk injeksi 60 mg/ml</td>
    <td>Vial</td>
    <td><v-text-field label=""></v-text-field></td>
    <td><v-text-field label=""></v-text-field></td>
    <td><v-text-field label=""></v-text-field></td>
  </tr>
  <tr>
    <td>15</td>
    <td>Asam Askorbat (Vitamin C)  tablet 50 mg</td>
    <td>Tablet</td>
    <td><v-text-field label=""></v-text-field></td>
    <td><v-text-field label=""></v-text-field></td>
    <td><v-text-field label=""></v-text-field></td>
  </tr>
  <tr>
    <td>16</td>
    <td>Asam Folat tablet 1 mg</td>
    <td></td>
    <td><v-text-field label=""></v-text-field></td>
    <td><v-text-field label=""></v-text-field></td>
    <td><v-text-field label=""></v-text-field></td>
  </tr>
                  </tbody>
                </template>
              </v-simple-table>                
          </v-container>
        </v-content>
    </div>
</template>

<script>

import obat40item from '@/config/obat40item'
import routeList from '@/views/pages/oblik/routeList';

export default {
  name: 'Oblik',
    data () {
      return {
        items: routeList,
        itemObat: obat40item,
        right: null,
      }
    },
    created() {
      console.log(this.itemObat);
    }
}
</script>
