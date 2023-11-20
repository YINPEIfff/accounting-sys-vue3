<template>
  <div :class="[!isCollapse?'logo':'logo2']">
    LOGO
  </div>
  <div class="menu">
    <el-menu :collapse="isCollapse"
             :collapse-transition="false"
             @open="handleOpen"
             @close="handleClose"
             default-active="*"
             class="el-menu-vertical-demo el-menu"
             background-color="#42d392"
             text-color="#fff"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>Navigator One</span>
        </template>
        <el-menu-item-group title="Group One">
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item two</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="1-3">item three</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="1-4">
          <template #title>item four</template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="/">
        <el-icon>
          <HomeFilled/>
        </el-icon>
        <span>首页</span>

      </el-menu-item>
      <el-menu-item index="/table">
        <el-icon>
          <icon-menu/>
        </el-icon>
        <span>客户信息</span>
      </el-menu-item>
      <el-menu-item index="/management">
        <el-icon>
          <document/>
        </el-icon>
        <span>人员列表</span>
        <el-sub-menu>
          <el-menu-item>
            人员管理
          </el-menu-item>
          <el-menu-item>
            人员修改
          </el-menu-item>
        </el-sub-menu>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon>
          <setting/>
        </el-icon>
        <span>Navigator Four</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import {
  Document,
  Menu as IconMenu,
  Fold,
  Expand,
  HomeFilled,
  Location,
  Setting,
  Sort,
} from '@element-plus/icons-vue';

const props = defineProps({
  isCollapse:Boolean,
})

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}


</script>

<style scoped>
.menu {
  /*width: 200px;*/
  /*min-height: calc(100vh - 60px);*/
  min-height: 100%;
  font-weight: bold;
}

.logo {
  padding: 0 0 0 40px;
  width: 200px;
  font-weight: bold;
  color: white;
  font-size: 30px;
  transition: all .1s;
}

.logo2 {
  font-weight: bold;
  color: white;
  justify-content: center;
  display: flex;
  transition: all .1s;
}

.el-menu{
  border: 0;
}
</style>