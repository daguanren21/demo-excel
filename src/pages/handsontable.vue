<script setup lang="ts">
// 不开源
import Common from "../components/common.vue";
import { HotTable } from "@handsontable/vue3";
import { registerAllModules } from "handsontable/registry";
import "handsontable/styles/handsontable.min.css";
import "handsontable/styles/ht-theme-main.min.css";
import { ref } from "vue";
registerAllModules();
const data = ref([
  ["", "Ford", "Volvo", "Toyota", "Honda"],
  ["2016", 10, 11, 12, 13],
  ["2017", 20, 11, 14, 13],
  ["2018", 30, 15, 12, 13],
]);
</script>

<template>
  <Common>
    <hot-table :contextMenu="true" :height="600" :setting="{licenseKey: 'non-commercial-and-evaluation'}" :data="data" :rowHeaders="true" :colHeaders="true"></hot-table>
  </Common>
</template>
<style>
</style>
