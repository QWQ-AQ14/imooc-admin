<template>
  <el-scrollbar ref="scrollbarRef" height="800px" @scroll="scroll">
    <el-table :data="tableList" border style="width: 100%">
      <!-- 索引 -->
      <el-table-column prop="id" label="id"> </el-table-column>
      <el-table-column prop="title" label="title"> </el-table-column>
      <el-table-column prop="image" label="image"> </el-table-column>
      <el-table-column prop="reads" label="reads"> </el-table-column>
      <el-table-column prop="from" label="from"> </el-table-column>
      <el-table-column prop="date" label="date"> </el-table-column>
    </el-table>
  </el-scrollbar>
</template>

<script setup>
import axios from 'axios'
import { ElMessage, ElScrollbar } from 'element-plus'

import { onMounted, ref } from 'vue'
// 渲染基本架构
const tableList = ref([])
const num = ref(20)
const isRequestStatus = ref(true)
const getMockData = (num) => {
  isRequestStatus.value = true
  // ElMessage('正在请求中。。。')
  axios
    .get('http://localhost:4000/data?num=' + num.value)
    .then((res) => {
      // console.log(res.data.list)
      tableList.value = res.data.list
      isRequestStatus.value = false
      // ElMessage('请求结束')
    })
    .catch((err) => {
      window.console.log(err)
      ElMessage('网络出错')
    })
}
// 获取可渲染的列表项数:计算容器的最大容积
// 表格可视区的高度
const srollHeight = ref(800)
// 单个列表项的高度
const oneHeight = ref(48)
const cotainSize = ref(0)
const getContainSize = () => {
  console.log(~~(srollHeight.value / oneHeight.value))
  cotainSize.value = ~~(srollHeight.value / oneHeight.value)
}

const scrollbarRef = ref()
onMounted(() => {
  getMockData(num)
  getContainSize()
  console.log(scrollbarRef.value.clientHeight)
})
</script>

<style lang="scss" scoped></style>
