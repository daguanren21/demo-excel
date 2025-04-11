<script setup lang="ts">
import { reactive, ref } from "vue";

const title = ref("Hello LuckyExcel");
const form = reactive({
  company: "1",
  code: "20250410jskerqerqewr",
});
</script>

<template>
  <div class="p-[10px] flex flex-col overflow-hidden h-full w-full">
    <div>
      <div>
        <h1 class="text-[24px] border-[#ddd] border-b-[1px] py-[10px]">
          台账及报关单编辑[{{ form.code }}]
        </h1>
        <div class="mt-[10px] flex justify-between">
          <el-form :inline="true" :model="form">
            <el-form-item label="归属企业">
              <el-select v-model="form.company" class="!w-[200px]">
                <el-option label="上海东浩新贸易有限公司" value="1" />
                <el-option label="上海东浩新贸易有限公司" value="2" />
              </el-select>
            </el-form-item>
            <el-form-item label="台账管理号">
              <el-input v-model="form.code" placeholder="请输入台账管理号" />
            </el-form-item>
          </el-form>
          <div class="flex gap-2">
            <el-button class="bg-[#fff] text-[#000]">取消</el-button>
            <el-button type="primary">生成核注清单</el-button>
            <el-button type="primary">预估税金</el-button>
            <el-button type="primary">跳转至关单编辑</el-button>
            <el-button type="primary">模版载入/保存</el-button>
            <el-button type="primary">分配</el-button>
            <el-button type="primary">暂存</el-button>
          </div>
        </div>
        <div>
          <el-tabs type="border-card">
            <el-tab-pane label="基本信息"></el-tab-pane>
            <el-tab-pane label="商品详情（原始数据）"></el-tab-pane>
            <el-tab-pane label="分配详情（报关单）"></el-tab-pane>
            <el-tab-pane label="报关详情"></el-tab-pane>
          </el-tabs>
        </div>
        <div class="my-[10px] flex">
          <div class="flex items-center">
            <div class="flex items-center">
              获取模式：<span class="text-[12px] text-[#409eff]">填充：</span>
            </div>
            <el-switch />
          </div>
          <div class="flex items-center gap-2 ml-[10px]">
            <span>覆盖</span>
            <el-button type="primary">获取商品信息</el-button>
            <el-button type="primary">导出新商品</el-button>
            <el-button type="primary">编辑监管证单</el-button>
            <el-button type="primary">费用分摊</el-button>
            <el-button type="primary">批量编辑申报要素</el-button>
            <el-button type="primary" disabled>附件拆分详情</el-button>
          </div>
        </div>
      </div>
    </div>
    <slot></slot>

  
  </div>
</template>
