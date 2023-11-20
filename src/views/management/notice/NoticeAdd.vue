<template>


  <el-card class="box-card all-cards" shadow="always">
    <el-form :model="state.noticeData" label-width="120px">
      <el-form-item label="公告标题">
        <el-input v-model="state.noticeData.title"/>
      </el-form-item>
      <el-form-item label="UI测试">
        <el-select placeholder="please select your zone">
          <el-option label="Zone one" value="shanghai"/>
          <el-option label="Zone two" value="beijing"/>
          <el-option label="Zone two" value="beijing"/>
        </el-select>
      </el-form-item>
      <el-form-item label="是否公开">
        <el-switch v-model="state.noticeData.open" class="ml-2" style="--el-switch-on-color: #42d392;"/>
      </el-form-item>

      <el-form-item label="无用功能">
        <el-radio-group>
          <el-radio label="Sponsor"/>
          <el-radio label="Venue"/>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="公告内容">
        <el-input v-model="state.noticeData.content"
                  :autosize="{ minRows: 6, maxRows: 6 }"
                  maxlength="250"
                  show-word-limit
                  type="textarea"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" color="#42d392" @click="onSubmit"><span style="color: white">提交</span></el-button>
      </el-form-item>
    </el-form>
  </el-card>


</template>

<script lang="ts" setup>
import {reactive} from "vue";
import request from "@/util/request";
import {ElMessageBox, ElNotification} from "element-plus";

const state = reactive({
  noticeData: {}
})


const onSubmit = () => {
  ElMessageBox.confirm('您确认要提交公告数据吗')
      .then(() => {
        request.post("/notice/add", state.noticeData).then(res => {
          if (res['code'] == "200") {
            state.noticeData={}
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

</style>