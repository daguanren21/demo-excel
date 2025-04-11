<script setup lang="ts">
import { onMounted, reactive, ref, useTemplateRef } from "vue";
import Common from "../components/common.vue";
import { ListTable, ListColumn, Tooltip } from "@visactor/vue-vtable";
import * as VueVTable from "@visactor/vue-vtable";
import type { BaseTableConstructorOptions } from "@visactor/vtable/es/ts-types/base-table";
import {
  downloadExcel,
  exportVTableToExcel,
  downloadCsv,
  exportVTableToCsv,
} from "@visactor/vtable-export";
import {
  DateInputEditor,
  InputEditor,
  ListEditor,
  TextAreaEditor,
} from "@visactor/vtable-editors";
const dialogVisible = ref(false);
//模版替换
const templateName = ref("");
const rowIndex = ref(0);
const field = ref("");
const inputEditor = new InputEditor();
VueVTable.register.editor("input-editor", inputEditor);

const options: BaseTableConstructorOptions = {
  enableLineBreak: true, //自动换行
  autoWrapText: true, //自动换行
  rowSeriesNumber: {}, //行号
  menu: {
    renderMode: "html",
    defaultHeaderMenuItems: [
      {
        text: "新增列",
      },
      {
        text: "新增行",
      },
    ],
    contextMenuItems: [
      { text: "新增列", menuKey: "col" },
      { text: "新增行", menuKey: "row" },
    ],
  },
};

//表格 表头column
const columns = ref([
  {
    field: "column1",
    title: "反馈信息",
    editor: "input-editor",
  },
  {
    field: "column2",
    title: "商品库关联情况",
    style: {
      textAlign: "center",
      color: "#fff",
      bgColor: "#000",
    },
  },
  {
    field: "column3",
    title: "操作",
  },
  {
    field: "column4",
    title: "商品标识",
  },
  {
    field: "column5",
    title: "SKU",
    editor: "input-editor",
  },
  {
    field: "column6",
    title: "总价",
    editor: "input-editor",
  },
  {
    field: "column7",
    title: "报关单方案",
  },
]);

const records = ref([
  {
    column1: "反馈信息",
    column2: "关联成功",
    column3: "编辑申报要素",
    column4: "1",
    column5: "961822-200",
    column6: "1000",
    column7: "系统方案（默认）",
  },
  {
    column1: "反馈信息",
    column2: "关联成功",
    column3: "编辑申报要素",
    column4: "1",
    column5: "961822-200",
    column6: "1000",
    column7: "系统方案（默认）",
  },
  ...new Array(98).fill({
    column1: "",
    column2: "",
    column3: "",
    column4: "",
    column5: "",
    column6: "",
    column7: "",
  }),
]);
const tableRef = useTemplateRef("tableRef");
onMounted(() => {});
function confirm() {
  const { vTableInstance: instance } = tableRef.value as any;

  instance.setRecords(
    records.value.map((item, index) => {
      if (rowIndex.value - 1 === index) {
        item[field.value as any] = templateName.value;
      }
      return item;
    })
  );
  dialogVisible.value = false;
}

function handleCickCell(cell: any) {
  if (cell.field === "column7" && cell.row !== 0) {
    templateName.value = cell.dataValue;
    rowIndex.value = cell.row;
    field.value = cell.field;
    dialogVisible.value = true;
  }
}
async function exportCsv() {
  const { vTableInstance: instance } = tableRef.value as any;
  await downloadCsv(exportVTableToCsv(instance), "export-csv");
}
async function exportExcel() {
  const { vTableInstance: instance } = tableRef.value as any;
  await downloadExcel(await exportVTableToExcel(instance), "export-excel");
}
function handleDropDownMenuClick(e) {
  if (e.menuKey === "col") {
    columns.value.push({
      field: "column8",
      title: "demo",
    });
  }
  if (e.menuKey === "row") {
    records.value.push({
      column1: "",
      column2: "",
      column3: "",
      column4: "",
      column5: "",
      column6: "",
      column7: "系统方案（默认）",
    });
  }
}
function setScale() {
  const { vTableInstance: instance } = tableRef.value as any;
  instance.style = "transform: scale(2)";
}
</script>

<template>
  <common>
    <div class="flex grid-2 my-[10px]">
      <el-button type="primary" @click="exportCsv">导出csv</el-button>
      <el-button type="primary" @click="exportExcel">导出Excel</el-button>
      <el-button type="primary" @click="setScale">设置像素比</el-button>
    </div>
    <div class="h-[600px]">
      <ListTable
        :style="{ transform: 'scale(1)' }"
        ref="tableRef"
        :options="options"
        :records="records"
        @onClickCell="handleCickCell"
        @onDropdownMenuClick="handleDropDownMenuClick"
      >
        <!-- tooltip 提示 -->
        <Tooltip :isShowOverflowTextTooltip="true" />
        <ListColumn
          v-for="column in columns"
          :key="column.field"
          :field="column.field"
          :title="column.title"
          :width="255"
          :cell-type="'text'"
          :editor="column.editor || undefined"
          :style="column.style || undefined"
          :header-style="{ textAlign: 'center', fontSize: 14 }"
        />
      </ListTable>
    </div>
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
