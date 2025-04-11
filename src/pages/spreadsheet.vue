<script setup lang="ts">
import { onMounted, reactive, ref, useTemplateRef } from "vue";
import Common from "../components/common.vue";
import Spreadsheet from "x-data-spreadsheet";
//@ts-expect-error
import zhCN from "x-data-spreadsheet/src/locale/zh-cn";

Spreadsheet.locale("zh-cn", zhCN);
const spreadSheetRef = useTemplateRef("x-spreadsheet-demo");
const s = ref<Spreadsheet | null>(null);
const dialogVisible = ref(false);
const templateName = ref("");
const currentCell = reactive({
  row: 0,
  col: 0,
});
onMounted(() => {
  s.value = new Spreadsheet(spreadSheetRef.value!);
  s.value.loadData([
    {
      name: "ceshi",
      styles:[],
      rows: {
        "0": {
          cells: {
            "0": {
              text: "反馈信息",
            },
            "1": {
              text: "商品库关联情况",
            },
            "2": {
              text: "操作",
            },
            "3": {
              text: "商品标识",
            },
            "4": {
              text: "SKU",
            },
          },
        },
        "1": {
          cells: {
            "0": {
              text: "",
            },
            "1": {
              text: "关联成功",
            },
            "2": {
              text: "编辑申报要素",
            },
            "3": {
              text: "1",
            },
            "4": {
              text: "961822-200",
            },
          },
        },
      },
    },
  ]);
  s.value.on("cells-selected", (cell, params) => {
    debugger
    const { sri, sci, eri, eci } = params;
    currentCell.row = sri;
    currentCell.col = sci;
    templateName.value = cell ? cell.text : "";
    dialogVisible.value = true;
  });
});
function confirm() {
  s.value?.cellText(currentCell.row, currentCell.col, templateName.value);
  dialogVisible.value = false;
}
</script>

<template>
  <common>
    <div ref="x-spreadsheet-demo"></div>
    <el-dialog v-model="dialogVisible" title="选择模版" width="500">
      <el-form :inline="true">
        <el-form-item label="模版名称">
          <el-input v-model="templateName" placeholder="请输入模版名称" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="confirm"> Confirm </el-button>
        </div>
      </template>
    </el-dialog>
  </common>
</template>
