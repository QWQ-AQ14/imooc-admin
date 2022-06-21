<template>
  <upload-excel :onSuccess="onSuccess"></upload-excel>
</template>

<script setup>
import UploadExcel from '@/components/UploadExcel'
import { useRouter } from 'vue-router'
import { USER_RELATIONS, formatDate } from './utils'
import { ElMessage } from 'element-plus'
import { userBatchImport } from '@/api/user-manage'

/**
 * 数据解析成功之后的回调
 */
const router = useRouter()
const onSuccess = async ({ header, results }) => {
  const updateData = generateData(results)
  await userBatchImport(updateData)
  ElMessage.success({
    message: results.length + '导入成功',
    type: 'success'
  })
  router.push('/user/manage')
}
/**
 * 筛选数据
 */
const generateData = (results) => {
  const arr = []
  results.forEach((result) => {
    const userInfo = {}
    Object.keys(result).forEach((key) => {
      if (USER_RELATIONS[key] === 'openTime') {
        userInfo[USER_RELATIONS[key]] = formatDate(result[key])
        return
      }
      userInfo[USER_RELATIONS[key]] = result[key]
    })
    arr.push(userInfo)
  })
  return arr
}
</script>

<style lang="scss" scoped></style>
