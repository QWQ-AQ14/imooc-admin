<template>
  <div class="map">
    <tdt-map :center="state.center" :zoom="state.zoom">
      <tdt-tilelayer :url="state.url" :zIndex="1"></tdt-tilelayer>
    </tdt-map>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
const state = reactive({
  center: [102.3095614931, 38.2576931323],
  zoom: 12,
  url: 'http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=2fd531ec7b1b08115c1cd8a665b0a4ea'
})
</script>

<style lang="scss" scoped>
.map {
  width: 100%;
  height: 700px;
}
</style>
