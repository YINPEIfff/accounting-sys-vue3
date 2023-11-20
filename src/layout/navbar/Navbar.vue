<template>
  <div class="header-middle">
    <div class="middle">
      <el-icon @click="emitp('handleCollapse')" color="black" size="20">
        <component :is="!isCollapse ? Fold : Expand"></component>
      </el-icon>
      <el-breadcrumb :separator-icon="ArrowRight" style="margin-left: 20px;">
        <el-breadcrumb-item v-for="(item,index) in breadcrumbItems">{{ item }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="avatar">

      <el-icon color="black" size="20" style="margin-right: 20px;" @click="fullScreen">
        <ChromeFilled/>
      </el-icon>

      <el-dropdown :hide-on-click="false" placement="bottom">
        <span class="el-dropdown-link" style="outline: none;">
          <el-avatar :size="35"
                     :src="[userData['avatar']?userData['avatar']:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png']"/>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="drawer1Display=true;">个人信息</el-dropdown-item>
            <el-dropdown-item @click="editDialogDisplay=true">修改信息</el-dropdown-item>
            <el-dropdown-item @click.native="logout">退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <span style="color: black;margin-left: 10px">
        {{userData['name']}}
      </span>
    </div>
  </div>
  <Drawer/>
  <el-dialog v-model="editDialogDisplay" draggable title="修改用户信息">
    <UserEdit/>
  </el-dialog>
</template>

<script setup lang="ts">
import {
  Fold,
  Expand,
  ChromeFilled,
  ArrowRight
} from '@element-plus/icons-vue';
import {useRouter} from 'vue-router';
import {ref, Ref, provide, inject, reactive} from "vue";
import {ElMessage} from 'element-plus';
import Drawer from '@/layout/drawer/Drawer.vue';
import UserEdit from '@/layout/drawer/container/UserEdit.vue'

const drawer1Display: Ref<boolean> = ref(false);
const editDialogDisplay = inject('editDialogDisplay')
provide('drawer1Display', drawer1Display);
const props = defineProps({
  isCollapse: Boolean,
  asideWidth: String,
})


const userData = JSON.parse(localStorage.getItem('honey-user') || '{}')
let isFullScreen = ref(false)

const fullScreen = () => {
  isFullScreen = !isFullScreen;
  isFullScreen ? document.documentElement.requestFullscreen() : document.exitFullscreen();
}

const emitp = defineEmits<{
  (event: "handleCollapse"): void;
}>();

const router = useRouter();

const logout = () => {
  localStorage.removeItem("honey-user");
  router.push('/login');
  ElMessage({
    message: '退出登录成功',
    type: 'success',
  })
}
</script>

<style>
.el-dialog {
  margin: var(--el-dialog-margin-top, 15vh) auto 15px;
}

.header-middle {
  flex: 1;
  display: flex;
}

.middle {
  display: flex;
  flex: 1;
  align-items: center;
}

.avatar {
  padding: 10px 15px 0 0;
  width: 200px;
  align-items: center;
  justify-content: flex-end;
  display: flex;
}
</style>