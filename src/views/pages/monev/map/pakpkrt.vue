<template>

  <div style="height: 500px; width: 98%">
    <l-map
      v-if="showMap"
      ref="map" 
      v-resize="onResize"      
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      style="height: 80%"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
      @click="mapClick"
    >
      <l-tile-layer
        :url="url"
      />
      <l-marker
        v-for="(item, index) in arrayMarker"
        :key="'marker-' + index"
        :lat-lng="item.lokasiTempat"
      >
        <l-popup>
          <div @click="innerClick">
            {{item.namaTempat}}
          </div>
        </l-popup>      
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup, LTooltip } from "vue2-leaflet";
import { Icon } from 'leaflet';
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default {
  name: "MapMonevPbf",
  props: ['dataMap'],
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip
  },
  data() {
    return {
      zoom: 15,
      center: latLng(-6.9005281, 107.5985346),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      withPopup: latLng(-6.9005281, 107.5985346),
      arrayMarker: [],
      currentZoom: 11.5,
      currentCenter: latLng(-6.9005281, 107.5985346),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5
      },
      showMap: true
    };
  },
  methods: {
    onResize() {
      this.$refs.map.mapObject._onResize();
    },    
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    showLongText() {
      this.showParagraph = !this.showParagraph;
    },
    innerClick() {
      alert("Click!");
    },
    mapClick: function(e) {
      console.log(e)
    },
    olahData: function() {
      this.arrayMarker = []
      let dataContent = this.dataMap;
      for(let i = 0; i < dataContent.length; i++) {
        let itemLongLat = dataContent[i].LONGLAT
        let res = itemLongLat.split(",")
        this.arrayMarker.push({
          lokasiTempat: latLng({
            lat: res[0], lng: res[1]
          }),
          namaTempat: dataContent[i].CONTENT.content.nama_pbf
        })        
      }     
    }
  },
  watch : {
    dataMap : function (value) {
      this.dataMap = value
      this.olahData();
    }
  },
};
</script>
