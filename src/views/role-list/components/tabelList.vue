<template>
  <el-scrollbar ref="scrollbarRef" height="800px" @scroll="handelScroll">
    <el-table :data="showDataList" border style="width: 100%">
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

import { computed, onMounted, ref } from 'vue'
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
// 可视区域可以显示的列表总数
const containSize = ref(0)
const getContainSize = () => {
  console.log(~~(srollHeight.value / oneHeight.value))
  containSize.value = ~~(srollHeight.value / oneHeight.value)
}
// 监听滚动事件动态截取数据
// 记录当前滚动的第一个元素的索引
const startIndex = ref(0)
// 定义滚动行为事件方法
const handelScroll = ({ scrollTop }) => {
  startIndex.value = ~~(scrollTop / oneHeight.value)
}
// 通过计算属性获取列表最后一个元素的索引
const getEndIndex = computed(() => {
  let endIndex = startIndex.value + containSize.value
  if (!tableList.value[endIndex]) {
    endIndex = tableList.value.length - 1
  }
  return endIndex
})
// 定义可以动态显示的数组列表元素
const showDataList = computed(() => {
  console.log(startIndex.value, getEndIndex.value)
  return tableList.value.slice(startIndex.value, getEndIndex.value)
})
const scrollbarRef = ref()
onMounted(() => {
  getMockData(num)
  getContainSize()
  console.log(scrollbarRef.value.clientHeight)
})
</script>

<style lang="scss" scoped></style>
