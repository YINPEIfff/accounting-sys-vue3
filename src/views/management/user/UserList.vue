<template>
  <el-card shadow="always" class="all-cards">
    <el-table :data="tableData" @selection-change="handleSelectionChange" style="width: 100%">
      <el-table-column type="selection"/>
      <el-table-column prop="id" label="用户编号" width="80"/>
      <el-table-column prop="username" label="用户名" width="120"/>
      <el-table-column prop="password" label="密码" width="120"/>
      <el-table-column prop="name" label="用户姓名" width="120"/>
      <el-table-column prop="phone" label="电话号码" width="120"/>
      <el-table-column prop="email" label="电子邮箱" width="120"/>
      <el-table-column prop="address" label="家庭住址" width="180"/>
      <el-table-column prop="birthday" label="生日" width="120"/>
      <el-table-column prop="role" label="权限" width="120"/>
      <el-table-column fixed="right" label="具体操作" width="200">
        <template #default="scope">
          <el-button link type="success" size="small"
                     @click="dialogTableVisible = true; currentIndex = scope.$index;">细节
          </el-button>
          <el-button link type="primary" size="small" @click="dialogFormVisible = true;currentIndex = scope.$index;">修改
          </el-button>
          <el-button link type="danger" size="small" @click="removeUser(scope.row.id,scope.$index)">移除
          </el-button>

        </template>
      </el-table-column>
    </el-table>

  </el-card>


  <el-dialog draggable v-model="dialogTableVisible" title="详细信息" :column="3">
    <el-descriptions :title="null" border direction="vertical" column="4">
      <el-descriptions-item label="用户名">
        {{ tableData[currentIndex]['username'] }}
      </el-descriptions-item>
      <el-descriptions-item label="密码">
        {{ tableData[currentIndex]['password'] }}
      </el-descriptions-item>
      <el-descriptions-item label="姓名">
        {{ tableData[currentIndex]['name'] }}
      </el-descriptions-item>
      <el-descriptions-item label="电话号码">
        {{ tableData[currentIndex]['phone'] }}
      </el-descriptions-item>
      <el-descriptions-item label="电子邮箱">
        {{ tableData[currentIndex]['email'] }}
      </el-descriptions-item>
      <el-descriptions-item label="家庭住址">
        {{ tableData[currentIndex]['address'] }}
      </el-descriptions-item>
      <el-descriptions-item label="生日">
        {{ tableData[currentIndex]['birthday'] }}
      </el-descriptions-item>
      <el-descriptions-item label="权限">
        {{tableData[currentIndex]['role']}}
      </el-descriptions-item>
    </el-descriptions>
  </el-dialog>

  <el-dialog v-model="dialogFormVisible" title="人员信息修改" width="30%">
    <el-form :model="tableData[currentIndex]" label-width="120px">
      <el-form-item label="用户名">
        <el-input v-model="tableData[currentIndex].username" autocomplete="off" style="width: 80%"/>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="tableData[currentIndex].password" autocomplete="off" style="width: 80%"/>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="tableData[currentIndex].name" autocomplete="off" style="width: 80%"/>
      </el-form-item>
      <el-form-item label="电话号码">
        <el-input v-model="tableData[currentIndex].phone" autocomplete="off" style="width: 80%"/>
      </el-form-item>
      <el-form-item label="电子邮件">
        <el-input v-model="tableData[currentIndex].email" autocomplete="off" style="width: 80%"/>
      </el-form-item>
      <el-form-item label="家庭住址">
        <el-input v-model="tableData[currentIndex].address" autocomplete="off" style="width: 80%"/>
      </el-form-item>
      <el-form-item label="生日">
        <el-date-picker
            v-model="tableData[currentIndex].birthday"
            type="date"
            placeholder="Pick a date"
            style="width: 50%"
        />
      </el-form-item>
      <el-form-item label="权限">
        <el-select v-model="tableData[currentIndex].role" placeholder="身份权限">
          <el-option label="管理员" value="管理员"/>
          <el-option label="用户" value="用户"/>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submitUserInfo(currentIndex)">
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>


</template>

<script setup lang="ts">
import request from '@/util/request.ts'
import {reactive, onMounted, ref} from "vue";
import {ElMessageBox, ElNotification} from "element-plus";

onMounted(() => {
  getUsers();
})
const currentIndex = ref(0);
const dialogFormVisible = ref(false)
const dialogTableVisible = ref(false)

let tableData = reactive([]);

const getUsers = () => {
  if (localStorage.getItem('honey-user') != null) {
    request.get('/user/selectAll').then(res => {
      console.log(res['data']);
      res['data'].forEach(x => {
        for (const xKey in x) {
          if (xKey == 'birthday') {
            const date = new Date(x[xKey]);
            x[xKey] = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
          }
        }
        tableData.push(x);
      });
    })
  }

}
const multipleSelection = ref<[]>([])
const handleSelectionChange = (val) => {
  multipleSelection.value = val
}
const deleteRow = (index: number) => {
  tableData.splice(index, 1);
};

const submitUserInfo = (id: number) => {
  request.put(`/user/update`, tableData[id]).then(res => {
    console.log(tableData[id])
        if (res["code"] == "200") {
          ElNotification({
            title: `Success`,
            message: '修改成功',
            type: 'success',
          })
        } else {
          ElNotification({
            title: 'Error',
            message: '修改失败',
            type: 'error',
          })
        }
      }
  )
}



const removeUser = (index: number, indexDelete: number) => {
  ElMessageBox.confirm('您确认要删除该行数据吗').then(() => {
    tableData.splice(indexDelete, 1);
    request.delete(`/user/delete/${index}`, tableData[index]).then(res => {
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
</script>

<style>
.all-cards {
  margin: 20px
}
</style>