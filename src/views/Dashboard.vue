<template>
  <el-row style="margin:25px;">
    <el-col v-for="(item, index) in cardItems" :key="index" :span="6">
      <el-card class="box-card card">
        <div style="display: flex;align-items: center;">
          <el-icon size="50" color="#42d392">
            <component :is="item['cardIcon']"></component>
          </el-icon>

          <div style="display: flex;flex-direction: column;margin-left: 60px;">
            <span style="color: #00000073;">{{ item['cardName'] }}</span>
            <span style="margin-top: 30px; font-weight: bold;">{{ item['data'] }} </span>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>

  <div style="width: 50%">
    <el-card shadow="always" class="all-cards">
    <h1 style="padding-left: 40px;margin-bottom: 15px;">
      系统公告
    </h1>
      <el-timeline>
          <el-timeline-item center :timestamp="item.time"  placement="top"  v-for="item in state.noticeList">
            <el-card>
              <h4>{{ item.title }}</h4>
              <p>{{ item.content }}</p>
            </el-card>
          </el-timeline-item>

      </el-timeline>
    </el-card>
  </div>

</template>


<script setup lang="ts">
import {onMounted, reactive} from 'vue'
import {
  Message,
  Switch,
  Finished,
  User,
} from '@element-plus/icons-vue'
import request from "@/util/request";

const state = reactive({
  noticeList: []
})

const cardItems = reactive([
  {

    cardIcon: Message,
    cardName: '消息数量',
    data: 1000,

  },
  {
    cardIcon: Switch,
    cardName: '收款数量',
    data: 16800,
  },
  {
    cardIcon: Finished,
    cardName: '待处理事件',
    data: 1000,
  },
  {
    cardIcon: User,
    cardName: '客户数量',
    data: 30,
  }
])

const getNotices = () => {
  request.get("/notice/selectAll").then(res => {
    res['data'].forEach(x => {
      if (x['open']){
        state.noticeList.push(x)
      }
    })
  })
}

onMounted(() => {
  getNotices()
  console.log(state.noticeList)
})


</script>


<style scoped>
.card {
  width: 90%;
  height: 125px;
  display: flex;
}

h4 {
  font-size: 1.15rem;
  font-weight: 600;
  margin: 0;
  line-height: 1.25;
}


p {
  margin: 1rem 0;
  line-height: 1.7;
}
</style>