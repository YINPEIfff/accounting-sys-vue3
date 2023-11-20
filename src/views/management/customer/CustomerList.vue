<script setup lang="ts">
import {
  Search,
  Refresh,
  User,
} from '@element-plus/icons-vue'
import request from '@/util/request';
import {onMounted} from "vue";
import {ref, reactive, provide} from "vue";
import {ElMessageBox, ElNotification, ElTable} from 'element-plus'
import type {Company} from "@/interface/Company";
import type {User2} from '@/interface/User2'

let currentIndex = ref<number>(0);
const name = ref<string>("");
const pageSize = ref<number>(15);

let dialogTableVisible = ref(false);
let dialogFormVisible = ref(false);


provide('dialogFormVisible', dialogFormVisible)

let tableData: Array<Company> = reactive([]);
let tableData2: Array<Company> = reactive([]);


const getAllData = () => {
  request.get("/company/getAllCompanies").then((res) => {
    console.log(res.data)
    res['data'].forEach(x => {
      for (const key in x)
        if (typeof x[key] == 'string') {
          if (x[key].length > 10) {
            x[key] = x[key].substring(0, 10) + '...';
          }
        } else if (typeof x[key] == 'number') {
          if (key != 'id') {
            const date = new Date(x[key]);
            console.log(date)
            const year = date.getFullYear();
            const month = date.getMonth() + 1; // 月份从 0 开始，需要加 1
            const day = date.getDate();
            x[key] = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
          }
        }
      tableData.push(x);
    })
  })

  request.get("/company/getAllCompanies").then(res => res['data'].forEach(x => {
    for (const key in x)
      if (typeof x[key] == 'number') {
        if (key != 'id') {
          const date = new Date(x[key]);
          const year = date.getFullYear();
          const month = date.getMonth() + 1; // 月份从 0 开始，需要加 1
          const day = date.getDate();
          const hour = date.getHours();
          x[key] = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hour.toString().padStart(2, '0')}:00:00`;
        }
      }
    tableData2.push(x);
  }))
}


onMounted(() => {
  if (localStorage.getItem('honey-user') != null) {
    getAllData();
  }
})
const removeCompany = (index: number, indexDelete: number) => {
  ElMessageBox.confirm('您确认要删除该行数据吗').then(() => {
    tableData.splice(indexDelete, 1);
    request.delete(`/company/delete/${index}`, tableData[index]).then(res => {
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

const deleteRow = (index: number) => {
  tableData.splice(index, 1);
};

const currentPage = ref(1);
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<User2[]>([])
const handleSelectionChange = (val: User2[]) => {
  multipleSelection.value = val
}
const dataTotal = ref(tableData.length);
</script>

<template>
  <div class="background">
    <div class="content">
      <el-card shadow="always" style="margin: 20px;">
        <div class="data-table">
          <el-scrollbar max-height="400px">
            <el-table :data="tableData" @selection-change="handleSelectionChange" style="width: 100%">
              <el-table-column type="selection"/>
              <el-table-column prop="id" label="公司编号" width="80"/>
              <el-table-column prop="companyName" label="公司名称" width="180"/>
              <el-table-column prop="companyAddress" label="公司地址" show-overflow-tooltip="10" width="180"/>
              <el-table-column prop="companyResponsibleOfficer" label="负责人" width="120"/>
              <el-table-column prop="companyDate" label="加入日期" width="120"/>
              <el-table-column prop="companyLegalRepresentative" label="法定代表人" width="120"/>
              <el-table-column prop="companyRegisteredCapital" label="公司注册资本" width="180"/>
              <el-table-column fixed="right" label="Operations" width="200">
                <template #default="scope">
                  <el-button link type="success" size="small"
                             @click="dialogTableVisible = true; currentIndex = scope.$index;">细节
                  </el-button>
                  <el-button link type="primary" size="small" @click="dialogFormVisible = true">编辑
                  </el-button>

                  <el-button link type="danger" size="small" @click="removeCompany(scope.$index)">移除
                  </el-button>


                </template>
              </el-table-column>
            </el-table>
          </el-scrollbar>
        </div>
      </el-card>


      <div class="pagination">
        <el-pagination v-model:current-page="currentPage" background layout="prev, pager, next" :total="dataTotal"
                       v-model:page-size="pageSize"/>
      </div>
    </div>
  </div>
  <el-dialog draggable v-model="dialogTableVisible" title="详细信息" :column="3">
    <el-descriptions :title="null" border>
      <el-descriptions-item label="公司名称">{{ tableData2[currentIndex]['companyName'] }}</el-descriptions-item>
      <el-descriptions-item label="公司法人">{{ tableData2[currentIndex]['companyLegalRepresentative'] }}
      </el-descriptions-item>
      <el-descriptions-item label="公司注册资本">{{ tableData2[currentIndex]['companyRegisteredCapital'] }}
      </el-descriptions-item>
      <el-descriptions-item label="状态">
        <el-tag size="small"
                :type="[tableData2[currentIndex]['companyState'] === '在业' ? 'null' : tableData2[currentIndex]['companyState'] === '停业' ? 'warning' : 'danger']">
          {{ tableData2[currentIndex]['companyState'] }}
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="公司地址">
        {{ tableData2[currentIndex]['companyAddress'] }}
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions border :title="null">
      <el-descriptions-item label="负责人">{{
          tableData2[currentIndex]['companyResponsibleOfficer']
        }}
      </el-descriptions-item>

      <el-descriptions-item label="加入日期">{{ tableData2[currentIndex]['companyDate'] }}</el-descriptions-item>

    </el-descriptions>
  </el-dialog>
</template>

<style scoped>
.background {
  overflow: hidden;
  align-items: center;
  justify-content: center;
}

.content {
  flex: 1;
}

.inputs {
  padding-bottom: 10px;
}

.data-table {
  margin: 0;
}

.pagination {
  padding: 10px;
}
</style>
