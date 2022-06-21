<template>
  <el-dialog
    title="导出为excel"
    :model-value="modelValue"
    @close="closed"
    width="30%"
  >
    <el-input v-model="excelName" placeholder="excel文件名称"></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">取消</el-button>
        <el-button type="primary" @click="onConfirm" :loading="loading"
          >导出</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { getUserManageAllList } from '@/api/user-manage'
const excelName = ref('')
defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})
const emits = defineEmits(['update:modelValue'])

/**
 * 导出按钮点击事件
 */
const loading = ref(false)
const onConfirm = async () => {
  loading.value = true
  const allUser = (await getUserManageAllList()).list
  console.log(allUser)
  closed()
}

/**
 * 关闭
 */
const closed = () => {
  emits('update:modelValue', false)
}
</script>

<style lang="scss" scoped></style>
