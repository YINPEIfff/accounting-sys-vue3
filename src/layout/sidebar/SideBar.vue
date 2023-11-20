<template>
  <div :class="[!isCollapse?'logo':'logo2']">
    LOGO
  </div>

  <div>
      <el-menu :collapse="isCollapse"
               :collapse-transition="false"
               @open="handleOpen"
               @close="handleClose"
               default-active="*"
               class="el-menu-vertical-demo el-menu"
               background-color="#42d392"
               text-color="#fff"
               router
      >
        <el-menu-item index="/home">
          <el-icon>
            <HomeFilled/>
          </el-icon>
          <span>首页</span>

        </el-menu-item>
        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <icon-menu/>
            </el-icon>
            <span>客户信息</span>
          </template>
          <el-menu-item index="/customer/list">
            <el-icon>
              <List/>
            </el-icon>
            <span>客户列表</span>
          </el-menu-item>
          <el-menu-item index="/customer/add">
            <el-icon>
              <Plus></Plus>
            </el-icon>
            <span>客户添加</span>
          </el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="2">
          <template #title>
            <el-icon>
              <document/>
            </el-icon>
            <span>人员信息</span>
          </template>
          <el-menu-item index="/user/list">
            <el-icon>
              <List/>
            </el-icon>
            人员列表
          </el-menu-item>
          <el-menu-item>
            <el-icon>
              <Search/>
            </el-icon>
            人员检索
          </el-menu-item>
          <el-menu-item index="/user/add">
            <el-icon>
              <Plus/>
            </el-icon>
            人员添加
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon>
              <document/>
            </el-icon>
            <span>部门信息</span>
          </template>
          <el-menu-item index="/department/list">
            <el-icon>
              <List/>
            </el-icon>
            部门列表
          </el-menu-item>
          <el-menu-item index="/department/add">
            <el-icon>
              <Plus/>
            </el-icon>
            部门管理
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="4">
          <template #title>
            <el-icon>
              <document/>
            </el-icon>
            <span>系统公告</span>
          </template>
          <el-menu-item index="/notice/list">
            <el-icon>
              <Promotion/>
            </el-icon>
            <span>
            系统公告
          </span>
          </el-menu-item>
          <el-menu-item index="/notice/add">
            <el-icon>
              <Plus/>
            </el-icon>
            <span>
            添加公告
          </span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/setting">
          <el-icon>
            <Setting/>
          </el-icon>
          <span>设置</span>
        </el-menu-item>
      </el-menu>
  </div>

</template>

<script setup lang="ts">
import {
  Document,
  Promotion,
  Menu as IconMenu,
  List,
  Plus,
  Search,
  Fold,
  Expand,
  HomeFilled,
  Location,
  Setting,
  Sort,
} from '@element-plus/icons-vue';
import {reactive} from "vue";


const props = defineProps({
  isCollapse: Boolean,
})

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}


</script>

<style scoped>




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

.el-menu {
  border: 0;
}
</style>