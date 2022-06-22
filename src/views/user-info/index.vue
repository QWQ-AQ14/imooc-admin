<template>
  <div class="">用户详情</div>
</template>

<script setup>
import { userDetail } from '@/api/user-manage'
import { defineProps, ref } from 'vue'
const props = defineProps({
  id: {
    type: String,
    requored: true
  }
})
// 数据相关
const detailData = ref({})
const getUserDetail = async () => {
  detailData.value = await userDetail(props.id)
}
getUserDetail()
</script>

<style lang="scss" scoped></style>
