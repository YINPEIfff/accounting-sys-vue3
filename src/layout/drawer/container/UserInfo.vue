<template>
  <div aria-label="A complete example of page header">
    <el-page-header @back="onBack" title="用户信息" style="color: black;" :icon="null">
      <template #content>
        <div class="flex items-center">
          <el-avatar
              class="mr-3"
              :size="32"
              :src="[json.avatar?json.avatar:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png']"
          />
          <span class="text-large font-600 mr-3"> {{ json.name?json.name.substring(0,1):"无" }} </span>
          <span
              class="text-sm mr-2"
              style="color: var(--el-text-color-regular)"
          >
          {{ json.name?json.name.substring(1):"无" }}
          </span>
          <el-tag style="margin-left: 5px;" :type="[json.role=='管理员'?'warning':'success']">{{ json.role }}</el-tag>
        </div>
      </template>
      <template #extra>
        <div class="flex items-center">
          <el-button type="primary" color="#42d392" class="ml-2" @click="editDialogDisplay=true"><span style="color:white;">编辑信息</span></el-button>
        </div>
      </template>

      <el-descriptions border :column="3" size="small" class="mt-4">
        <el-descriptions-item label="Username"
        >{{ json.username }}
        </el-descriptions-item
        >
        <el-descriptions-item label="Telephone"
        >{{ json.phone }}
        </el-descriptions-item
        >
        <el-descriptions-item label="Email">
          {{json.email}}
        </el-descriptions-item>
        <el-descriptions-item label="Remarks">
          <el-tag size="small">School</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="Address"
        >{{ json.address }}
        </el-descriptions-item>
        <el-descriptions-item label="birthday"
        >{{ `${new Date(json.birthday).getFullYear()}-${(new Date(json.birthday).getMonth()+1).toString().padStart(2, '0')}-${new Date(json.birthday).getDate().toString().padStart(2, '0')}` }}
        </el-descriptions-item>
      </el-descriptions>
      <p class="mt-4 text-sm">
        Element Plus team uses <b>weekly</b> release strategy under normal
        circumstance, but critical bug fixes would require hotfix so the actual
        release number <b>could be</b> more than 1 per week.
      </p>
    </el-page-header>
  </div>

</template>

<script setup lang="ts">
import {ref,inject} from "vue";
import type {Ref} from "vue";
import { ElNotification } from 'element-plus'
import UserEdit from '@/layout/drawer/container/UserEdit.vue'
const json = JSON.parse(localStorage.getItem('honey-user'));
const editDialogDisplay = inject('editDialogDisplay');
console.log(json)
const onBack = ()=>{
  ElNotification({
    title: `尊敬的${json.name},您好!`,
    message: 'Have a good day',
    type: 'success',
  })
}
</script>


<style scoped>

.items-center{
  align-items: center;
  display: flex;
}

.mr-3{
  margin-right: 0.75rem;
  font-weight: 600;
}
.mr-2{
  margin-right: 0.5rem;
}
</style>