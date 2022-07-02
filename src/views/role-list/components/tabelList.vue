<template>
  <el-scrollbar ref="scrollbarRef" height="800px" @scroll="handelScroll">
    <div :style="blankFillStyle">
      <el-table
        v-loading="isRequestStatus"
        :data="showDataList"
        border
        style="width: 100%"
      >
        <!-- 索引 -->
        <el-table-column prop="id" label="id"> </el-table-column>
        <el-table-column prop="title" label="title"> </el-table-column>
        <el-table-column prop="image" label="image"> </el-table-column>
        <el-table-column prop="reads" label="reads"> </el-table-column>
        <el-table-column prop="from" label="from"> </el-table-column>
        <el-table-column prop="date" label="date"> </el-table-column>
      </el-table>
    </div>
  </el-scrollbar>
</template>

<script setup>
import axios from 'axios'
import { ElMessage, ElScrollbar } from 'element-plus'

import { computed, onMounted, ref } from 'vue'
// 1. 渲染基本架构
const tableList = ref([])
const num = ref(20)
const isRequestStatus = ref(true)
const getNewList = (num) => {
  isRequestStatus.value = true
  // ElMessage('正在请求中。。。')
  return axios
    .get('http://localhost:4000/data?num=' + num.value)
    .then((res) => {
      // console.log(res.data.list)
      isRequestStatus.value = false
      return res.data.list
      // ElMessage('请求结束')
    })
    .catch((err) => {
      window.console.log(err)
      ElMessage('网络出错')
      return false
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
// 2.监听滚动事件动态截取数据
// 记录当前滚动的第一个元素的索引
const startIndex = ref(0)
// // 记录当前滚动有效的状态
// const isScrollStatus = ref(true)
// 定义滚动行为事件方法
const handelScroll = ({ scrollTop }) => {
  // if (isScrollStatus.value) {
  //   isScrollStatus.value = false
  //   // 设置一个定时器，1s钟后，才允许进行下一次的scroll滚动事件行为
  //   const timer = setTimeout(() => {
  //     isScrollStatus.value = true
  //     clearTimeout(timer)
  //   }, 30)
  //   console.log('滚动触发')
  //   setDataStartIndex(scrollTop)
  // }
  // 使用动画帧对滚动事件节流优化

  // 对requestAnimationFrame进行兼容性处理
  const requestAnimationFrame =
    window.requestAnimationFrame ||
    window.webkitrequestAnimationFrame ||
    window.mozrequestAnimationFrame ||
    window.msrequestAnimationFrame
  const fps = 30
  const interval = 1000 / fps
  let then = Date.now()
  requestAnimationFrame(() => {
    const now = Date.now()
    setDataStartIndex()
    if (now - then >= interval) {
      then = now
      requestAnimationFrame(arguments.callee)
    }
  })
}
// 将设置数据的相关任务，即滚动事件的具体行为包装成函数
const setDataStartIndex = async (scrollTop) => {
  const currentIndex = ~~(scrollTop / oneHeight.value)
  if (startIndex.value === currentIndex) return
  startIndex.value = currentIndex
  if (
    startIndex.value + containSize.value > tableList.value.length - 1 &&
    !isRequestStatus.value
  ) {
    // console.log('滚动条到底了')
    // 追加请求新的数据
    const addList = await getNewList(num)
    // console.log(addList)
    if (!addList) return
    tableList.value = [...tableList.value, ...addList]
  }
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
  // console.log(startIndex.value, getEndIndex.value)
  return tableList.value.slice(startIndex.value, getEndIndex.value)
})

// 3.动态设置上下空白占位
// 定义上空白的高度以及下空白填充的高度
// const topBlankFill = computed(() => startIndex.value * oneHeight.value)
// const bottomBlankFill = computed(
//   () => (tableList.value.length - getEndIndex.value) * oneHeight.value
// )
const blankFillStyle = computed(() => {
  return {
    paddingTop: startIndex.value * oneHeight.value + 'px',
    paddingBottom:
      (tableList.value.length - getEndIndex.value) * oneHeight.value + 'px'
  }
})

// 初始时异步获取列表数据
const initTableList = async (num) => {
  const newList = await getNewList(num)
  if (!newList) return
  tableList.value = newList
}
onMounted(() => {
  initTableList(num)
  getContainSize()
})
</script>

<style lang="scss" scoped></style>
