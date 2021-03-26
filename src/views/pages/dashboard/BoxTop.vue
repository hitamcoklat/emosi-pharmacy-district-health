<template>
  <v-row>
    <v-col cols="3" sm="3" md="3">
      <v-card color="#84C4F4" elevation="0" outlined>
        <v-list-item-title
          style="
            text-align: center;
            color: white;
            padding-bottom: 0.5em;
            padding-top: 0.5em;
            background-color: #78b8e7;
          "
          class="headline mb-1"
        >
          Jumlah Puskesmas
        </v-list-item-title>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-content>
              <font style="font-size: 4em; color: white; text-align: center">
                <animated-number
                  :value="jmlPuskesmas"
                  :formatValue="formatToPrice"
                  :duration="800"
                />
              </font>
            </v-list-item-content>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>
    <v-col cols="3" sm="3" md="3">
      <v-card color="#75B1B9" elevation="0" outlined>
        <v-list-item-title
          style="
            text-align: center;
            color: white;
            padding-bottom: 0.5em;
            padding-top: 0.5em;
            background-color: #6ba1ad;
          "
          class="headline mb-1"
        >
          Jumlah Kab/Kota
        </v-list-item-title>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-content>
              <font style="font-size: 4em; color: white; text-align: center">
                <animated-number
                  :value="27"
                  :formatValue="formatToPrice"
                  :duration="800"
                />
              </font>
            </v-list-item-content>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>
    <v-col cols="3" sm="3" md="3">
      <v-card color="#0D7D8B" elevation="0" outlined>
        <v-list-item-title
          style="
            text-align: center;
            color: white;
            padding-bottom: 0.5em;
            padding-top: 0.5em;
            background-color: #1c707f;
          "
          class="headline mb-1"
        >
          Jumlah Tenaga
        </v-list-item-title>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-content>
              <font style="font-size: 4em; color: white; text-align: center">
                <animated-number
                  :value="jmlTenagaTeknis"
                  :formatValue="formatToPrice"
                  :duration="800"
                />
              </font>
            </v-list-item-content>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>
    <v-col cols="3" sm="3" md="3">
      <v-card color="#50C9DC" elevation="0" outlined>
        <v-list-item-title
          style="
            text-align: center;
            color: white;
            padding-bottom: 0.5em;
            padding-top: 0.5em;
            font-size: 1em;
            background-color: #44bbcf;
          "
          class="headline mb-1"
        >
          Jumlah Apoteker
        </v-list-item-title>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-content>
              <font style="font-size: 4em; color: white; text-align: center">
                <animated-number
                  :value="jmlApoteker"
                  :formatValue="formatToPrice"
                  :duration="800"
                />
              </font>
            </v-list-item-content>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import AnimatedNumber from "animated-number-vue";
export default {
  props: ["jmlTenagaTeknis", "jmlPuskesmas", "jmlApoteker"],
  components: {
      AnimatedNumber
  },
  data() {
    return {
    };
  },
  methods: {
    formatToPrice(value) {
      return Intl.NumberFormat("de-DE").format(value);
    },
  },
};
</script>