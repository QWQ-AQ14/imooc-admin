<template>
  <el-scrollbar height="800px">
    <el-card>
      <el-table :data="tableList" border style="width: 100%">
        <!-- 索引 -->
        <el-table-column prop="id" label="id"> </el-table-column>
        <el-table-column prop="title" label="title"> </el-table-column>
        <el-table-column prop="image" label="image"> </el-table-column>
        <el-table-column prop="reads" label="reads"> </el-table-column>
        <el-table-column prop="from" label="from"> </el-table-column>
        <el-table-column prop="date" label="date"> </el-table-column>
      </el-table>
    </el-card>
  </el-scrollbar>
</template>

<script setup>
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
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
      console.log(res.data.list)
      tableList.value = res.data.list
      isRequestStatus.value = false
      // ElMessage('请求结束')
    })
    .catch((err) => {
      window.console.log(err)
      ElMessage('网络出错')
    })
}
getMockData(num)
</script>

<style lang="scss" scoped></style>
