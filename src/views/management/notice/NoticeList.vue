<template>

  <el-card class="box-card all-cards" shadow="always">
    <el-table :data="state.tableData" style="width: 100%">
      <el-table-column prop="title" label="标题" width="120"/>
      <el-table-column prop="user.name" label="发表用户" width="120"/>
      <el-table-column prop="content" label="内容" width="400"/>
      <el-table-column label="是否公开" width="120">
        <template #default="prop">
          <el-switch v-model="prop.row.open" class="ml-2" style="--el-switch-on-color: #42d392;"
                     @change="updateNoticeState(prop.$index)"/>
        </template>
      </el-table-column>
      <el-table-column prop="time" label="发布时间" width="300"/>
      <el-table-column fixed="right" label="具体操作" width="120">
        <template #default="prop">
          <el-button type="primary" link @click="openDialog(prop.row.id,prop.$index)">
            修改
          </el-button>
          <el-button type="danger" link @click="removeNotice(prop.row.id,prop.$index)">
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <el-dialog v-model="dialogFormVisible" title="公告修改">
    <el-form :model="state.tableData[currentIndex]">
      <el-form-item label="标题">
        <el-input v-model="state.tableData[currentIndex].title" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="公告内容">
        <el-input v-model="state.tableData[currentIndex].content" autocomplete="off"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="updateNotice(currentIndex)">
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>

import request from "@/util/request";
import {onMounted, reactive, Ref, ref} from "vue";
import {ElMessageBox, ElNotification} from "element-plus";

const state = reactive({
  tableData: [],
})
let dialogFormVisible: Ref<boolean> = ref<boolean>(false);
let currentIndex: Ref<number> = ref<number>(0);
let dataIndex: Ref<number> = ref<number>(0);

const openDialog = (dbIndex:number,index: number) => {
  dataIndex.value = dbIndex
  currentIndex.value = index
  dialogFormVisible.value = true
}

const getNotices = () => {
  request.get("/notice/selectAll").then(res => {
    console.log(res['data'])
    res['data'].forEach(x => state.tableData.push(x))
  })
}

const updateNoticeState = (index: number) => {
  request.put("/notice/update", state.tableData[index]).then(res => {
    console.log(res)
  })
}

const updateNotice = (index: number) => {
  request.put("/notice/update", state.tableData[index]).then(res => {
    console.log(res)
  })
}

const removeNotice = (index: number, indexDelete: number) => {
  console.log(index);
  ElMessageBox.confirm('您确认要删除该行数据吗').then(() => {
    state.tableData.splice(indexDelete, 1);
    request.delete(`/notice/delete/${index}`, state.tableData[index]).then(res => {
      console.log(res)
    })
  }).catch(() => {
    ElNotification({
      title: 'Info',
      message: '已取消',
      type: 'info',
    })
  })

}

onMounted(() => {
  getNotices()
})
</script>

<style scoped>

</style>