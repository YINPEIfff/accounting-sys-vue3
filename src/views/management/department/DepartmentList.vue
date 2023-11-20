<template>
  <el-card shadow="always" class="all-cards">
    <el-table :data="state.tableData">

      <!--    展开后内部内容-->
      <el-table-column type="expand">
        <template #default="props">
          <el-table :data="props.row.departmentEmps">

            <!--              二次展开内容-->
            <el-table-column type="expand">
              <template #default="props2">

              <div style="margin-left: 40px">
                <p m="t-0 b-2">姓名: {{ props2.row.name }}</p>
                <p m="t-0 b-2">电话号码: {{ props2.row.phone }}</p>
                <p m="t-0 b-2">地址: {{ props2.row.address }}</p>
                <p m="t-0 b-2">时间: {{ props2.row.birthday }}</p>
              </div>


              </template>
            </el-table-column>

            <el-table-column label="部门员工" prop="name"/>
            <el-table-column label="电话号码" prop="phone"/>
          </el-table>
        </template>
      </el-table-column>

      <el-table-column prop="departmentName" label="部门名称" width="600"></el-table-column>
      <el-table-column prop="departmentManager" label="部门领导"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template #default="scope">
          <el-button link type="primary" size="small"
                     @click="dialogTableVisible = true; currentIndex = scope.$index;">人员管理
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>


  <el-dialog v-model="dialogTableVisible" title="人员管理">
    <el-transfer
        v-model="value"
        filterable
        :filter-method="filterMethod"
        filter-placeholder="State Abbreviations"
        :data="data"
        :titles="['可变更人员',state.tableData[currentIndex].departmentName]"
    />
  </el-dialog>

</template>

<script setup lang="ts">
import {onMounted, reactive, ref, Ref, toRefs} from "vue";
import request from "@/util/request";



//dialog
let dialogTableVisible:Ref<boolean> = ref<boolean>(false);
interface Option {
  key: number
  label: string
  initial: string
}

const generateData = () => {
  const data: Option[] = []
  const states = [
    'California',
    'Illinois',
    'Maryland',
    'Texas',
    'Florida',
    'Colorado',
    'Connecticut ',
  ]
  const initials = ['CA', 'IL', 'MD', 'TX', 'FL', 'CO', 'CT']
  states.forEach((city, index) => {
    data.push({
      label: city,
      key: index,
      initial: initials[index],
    })
  })
  return data
}

const data = ref<Option[]>(generateData())
const value = ref([])

const filterMethod = (query, item) => {
  return item.initial.toLowerCase().includes(query.toLowerCase())
}





//main
const state = reactive({
  tableData: [],
  innerTableData: [],
})

const {
  tableData,
  innerTableData,
} = toRefs(state)


const getDepartments = () => {
  if (localStorage.getItem('honey-user') != null) {
    request.get("/dept/all").then(res => {
      res['data'].forEach(x => {
        state.innerTableData.push(x['departmentEmps'])
        state.tableData.push(x)
      })
    });
  }
}


onMounted(() => {
  getDepartments()
  console.log(state.innerTableData)
  console.log(state.tableData)
})
</script>

<style scoped>

</style>