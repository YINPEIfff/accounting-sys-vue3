<template>
  <el-container>

      <el-aside :width="asideWidth" class="sidebar">


        <el-scrollbar>
          <SideBar :isCollapse="isCollapse"/>
        </el-scrollbar>



      </el-aside>


    <el-container style="overflow: auto;" :style="class_margin">
      <el-header >
          <Navbar :isCollapse="isCollapse" @handleCollapse="handleCollapse" :asideWidth="asideWidth"/>
      </el-header>
      <el-main >
          <RouterView/>
      </el-main>
    </el-container>
  </el-container>


</template>

<script setup lang="ts">
import {reactive, ref, toRefs, provide} from "vue";
import type {Ref} from 'vue';
import SideBar from '@/layout/sidebar/SideBar.vue'
import Navbar from './navbar/Navbar.vue';

const isCollapse: Ref<boolean> = ref(false)

const asideWidth: Ref<string> = ref('200px')

const class_margin = reactive({
  'margin-left': asideWidth.value
})

const editDialogDisplay: Ref<boolean> = ref(false);

provide('editDialogDisplay', editDialogDisplay);

const handleCollapse = () => {
  isCollapse.value = !isCollapse.value;
  asideWidth.value = isCollapse.value ? '64px' : '200px';
  class_margin["margin-left"] = isCollapse.value ? '64px' : '200px';
}
</script>

<style scoped>


.el-aside {
  transition: width .3s;
}

.el-menu {
  border-right: 0;
  background-color: #f0f2f5;
  padding: 0;
  overflow: hidden;
}

.el-header {
  box-shadow: 2px 0 6px rgba(0, 21, 41, .35);
}

.sidebar {
  left: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
  background-color: #42d392;
  position: fixed;
}


</style>