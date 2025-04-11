<script setup lang="ts">
import { onMounted, useTemplateRef } from "vue";

const gridRef = useTemplateRef("grid");
const gridData = [
  { col1: "row 1 column 1" },
  { col1: "row 2 column 1" },
  { col1: "row 3 column 1" },
];
onMounted(() => {
  const grid = gridRef.value;
  console.log(grid);
});
</script>

<template>
  <div class="absolute top-0 w-full">
    <canvas-datagrid ref="grid" :data.prop="gridData"></canvas-datagrid>
  </div>
</template>
