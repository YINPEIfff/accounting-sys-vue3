<template>

  <el-card class="box-card all-cards" shadow="always">
      <el-form :model="userdata" label-width="120px">

        <el-form-item label="头像上传">
          <el-col :span="10">
            <el-upload
                class="avatar-uploader"
                action="http://localhost:9090/file/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :headers='headers'
            >
              <img v-if="userdata.avatar" :src="userdata.avatar" style="padding: 10px" class="avatar"/>
              <el-icon v-else class="avatar-uploader-icon">
                <Plus/>
              </el-icon>
            </el-upload>
          </el-col>
        </el-form-item>

        <el-form-item label="用户名">
          <el-col :span="10">
            <el-input v-model="userdata.username"></el-input>
          </el-col>
          <el-col :span="2" style="text-align: center;">
            <span class="text-gray-500" style="padding-left: 30%">密码</span>
          </el-col>
          <el-col :span="12">
            <el-input v-model="userdata.password"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="姓名">
          <el-input v-model="userdata.name"/>
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
          <el-col :span="2" style="text-align: center;">
              <span class="text-gray-500" style="padding-left: 30%">权限</span>
          </el-col>
          <el-col :span="12">
            <el-select v-model="userdata.role" placeholder="权限类别">
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
        </el-form-item>
      </el-form>
  </el-card>
</template>

<script lang="ts" setup>
import {reactive, ref, Ref} from "vue";
import {Plus} from "@element-plus/icons-vue";
import {ElMessage, ElNotification, UploadProps,ElMessageBox} from "element-plus";
import request from "@/util/request";

const headers = reactive({
  "token": (JSON.parse(localStorage.getItem("honey-user") || '{}'))['token']
})
let userdata = reactive({
});


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

const onSubmit = () => {
  ElMessageBox.confirm('您确认要提交表单数据吗')
      .then(() => {
        userdata = {}
        request.post("/user/add", userdata).then(res => {
          if (res['code'] == "200") {
            ElNotification({
              title: `Success`,
              message: res['msg'],
              type: 'success',
            })
          } else {
            ElNotification({
              title: 'Error',
              message: res['msg'],
              type: 'error',
            })
          }
        })
      })
      .catch(() => {
        // catch error
        ElNotification({
          title: 'Info',
          message: '已取消',
          type: 'info',
        })
      })

}
</script>

<style scoped>

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
}

.el-row {
  margin-bottom: 20px;
}
</style>