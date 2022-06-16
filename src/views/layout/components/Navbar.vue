<template>
  <div class="navbar">
    <!-- 头像 -->
    <el-dropdown class="avatar-container" trigger="hover">
      <div class="avatar-wrapper">
        <!-- 头像展示 -->
        <el-avatar
          shape="square"
          :size="40"
          :src="$store.getters.userInfo.avatar"
        ></el-avatar>
        <!-- 设置小图标 -->
        <i class="el-icon-s-tools"></i>
      </div>
      <template #dropdown>
        <el-dropdown-menu class="user-dropdwon">
          <router-link to="/">
            <el-dropdown-item> 首页 </el-dropdown-item>
          </router-link>
          <a href="https://blog.csdn.net/qq_41863447?spm=1011.2415.3001.5343"
            ><el-dropdown-item>博客主页</el-dropdown-item></a
          >
          <el-dropdown-item divided> 退出登录 </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import {} from 'vue'
</script>

<style lang="scss" scoped></style>
