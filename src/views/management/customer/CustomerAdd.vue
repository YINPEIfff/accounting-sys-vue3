<template>

  <el-card class="box-card all-cards" shadow="always">
    <el-form :model="state.companyData" label-width="120px">


      <el-form-item label="公司名">

          <el-input v-model="state.companyData.companyName"></el-input>

      </el-form-item>

      <el-form-item label="公司地址">
        <el-input v-model="state.companyData.companyAddress"/>
      </el-form-item>

      <el-form-item label="公司法人">
        <el-input v-model="state.companyData.companyLegalRepresentative"/>
      </el-form-item>
      <el-form-item label="公司注册资本">
        <el-input v-model="state.companyData.companyRegisteredCapital"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" color="#42d392"><span style="color: white">提交</span></el-button>
      </el-form-item>
    </el-form>
  </el-card>

</template>

<script setup lang="ts">

import {reactive, toRefs} from "vue";

const state = reactive({
  companyData: [],
})

const {
  companyData
} = toRefs(state)

</script>

<style scoped>

</style>