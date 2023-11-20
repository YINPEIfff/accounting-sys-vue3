<template>
  <el-form :model="userdata" label-width="120px">

    <el-form-item label="头像上传">
      <el-upload
          class="avatar-uploader"
          action="http://localhost:9090/file/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :headers='headers'
      >
        <img v-if="userdata.avatar" :src="userdata.avatar" style="padding: 10px" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon">
          <Plus/>
        </el-icon>
      </el-upload>
    </el-form-item>

    <el-form-item label="姓名">
      <el-input v-model="userdata.name" disabled/>
    </el-form-item>

    <el-form-item label="生日">
      <el-col :span="10">
        <el-date-picker
            v-model="userdata.birthday"
            type="date"
            placeholder="Pick a date"
            style="width: 100%"
        />
      </el-col>
      <el-col :span="4" style="text-align: center;">
        <span class="text-gray-500">身份权限</span>
      </el-col>
      <el-col :span="10">
        <el-select v-model="userdata.role" disabled placeholder="身份权限">
          <el-option label="管理员" value="管理员"/>
          <el-option label="用户" value="用户"/>
        </el-select>
      </el-col>
    </el-form-item>
    <el-form-item label="住址">
      <el-input v-model="userdata.address"/>
    </el-form-item>
    <el-form-item label="电子邮箱">
      <el-input v-model="userdata.email"/>
    </el-form-item>
    <el-form-item label="电话号码">
      <el-input v-model="userdata.phone"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit" color="#42d392"><span style="color: white">提交</span></el-button>
      <el-button @click="editDialogDisplay=false">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import {inject, ref, reactive} from 'vue';
import type {Ref} from 'vue';
import {ElMessage, ElMessageBox, ElNotification} from 'element-plus'
import type {UploadProps} from 'element-plus'
import {Plus, Male, Female} from '@element-plus/icons-vue'
import request from "@/util/request";

const userJson = localStorage.getItem('honey-user');
const userdata = reactive(JSON.parse(userJson || '{}'));
let editDialogDisplay: Ref<boolean> = inject('editDialogDisplay');
const headers = reactive({
  "token": userdata.token
})

const sex: Ref<string> = ref('')
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => userdata.avatar = response.data;

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
    ElMessage.error('Avatar picture must be JPG/PNG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

const update = () => {
  request.put('/user/update', userdata).then(res => {
    if (res['code'] == "200") {
      ElNotification({
        title: `Success`,
        message: '用户数据上传成功',
        type: 'success',
      })
      localStorage.setItem('honey-user', JSON.stringify(userdata))
    } else {
      ElNotification({
        title: 'Error',
        message: '用户数据上传失败',
        type: 'error',
      })
    }
  })
}

const onSubmit = () => {
  ElMessageBox.confirm('您确认要提交数据吗').then(()=>update())
}
</script>

<style scoped>
.text-gray-500 {
  --un-text-opacity: 1;
  color: rgba(107, 114, 128, var(--un-text-opacity));
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}


</style>