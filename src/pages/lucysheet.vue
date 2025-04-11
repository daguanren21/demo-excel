<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import Common from "../components/common.vue";
const title = ref("Hello LuckyExcel");
const dialogVisible = ref(false);
const templateName = ref("");
// 开源,但已经不维护了 设置行宽等操作不好用
//celldata r:rowIndex c:columnIndex v:value,k: 冻结首行
const celldata = [
  { r: 0, c: 0, v: "反馈信息" },
  { r: 0, c: 1, v: "商品库关联情况" },
  { r: 0, c: 2, v: "操作" },
  { r: 0, c: 3, v: "商品标识" },
  { r: 0, c: 4, v: "SKU" },
  { r: 1, c: 1, v: "关联成功" },
  { r: 2, c: 1, v: "关联成功" },
  { r: 1, c: 0, v: "20250410jskerqerqewr" },
  { r: 2, c: 0, v: "20250410jskerqerqewr" },
  { r: 3, c: 0, v: "20250410jskerqerqewr" },
];
const currentCell = reactive({
  row: 0,
  col: 0,
});
function cellEditBefore(cell: Array<any>) {
  currentCell.row = cell[0].row_focus;
  currentCell.col = cell[0].column_focus;
  dialogVisible.value = true;
  templateName.value = luckysheet.getCellValue(
    currentCell.row,
    currentCell.col
  );
}
function confirm() {
  luckysheet.setCellValue(
    currentCell.row,
    currentCell.col,
    { m: templateName.value },
    {
      isRefresh: true,
      success: function () {
        dialogVisible.value = false;
      },
    }
  );
  luckysheet.refresh();
}
onMounted(() => {
  luckysheet.create({
    hook: {
      cellEditBefore,
    },
    container: "luckysheet",
    title: title.value,
    lang: "zh",
    showinfobar: false,
    showtoolbar: false,
    header: 1,
    config: {
      // columnlen: { 0: 1000, 1: 100, 2: 100 },
    },
    data: [
      {
        name: "Sheet1",
        config: {},
        celldata: celldata,
        charts: [],
      },
    ],
  });
  // 冻结首行
  luckysheet.setHorizontalFrozen(false);
});
</script>

<template>
  <Common>
    <div class="flex-1 overflow-hidden">
      <div id="luckysheet" style="height: 100vh"></div>
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
  </Common>
</template>
