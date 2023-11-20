<template>
  <el-drawer v-model="drawer1Display" title="I am the title" direction="btt" :with-header="false">
    <UserInfo/>
  </el-drawer>
</template>

<script lang="ts" setup>
import UserInfo from '@/layout/drawer/container/UserInfo.vue'

import { inject} from 'vue'


const drawer1Display:boolean = inject('drawer1Display');

</script>
