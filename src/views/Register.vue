<template>
  <div class="login-background">
    <div class="login-form">
      <div class="login-logo">
        <h1>
          <span class="logo-font">
            Register
          </span>
        </h1>


        <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm"
          style="width: 100%; text-align: center; margin: 25px 100px">
          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="ruleForm.username" style="width: 500px" placeholder="username" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input :prefix-icon="Lock" v-model="ruleForm.password" type="password" autocomplete="off"
              style="width: 500px" placeholder="password" />
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-input :prefix-icon="Check" v-model="ruleForm.checkPass" type="password" autocomplete="off"
              style="width: 500px" placeholder="Check" />
          </el-form-item>
          <el-form-item style="width: 80%;">
            <div style="display: flex; width: 80%;">
              <div>
                <el-button color="#647eff" @click="submitForm(ruleFormRef)" style="color: white;">Submit</el-button>
                <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
              </div>


              <div style="flex: 1;text-align: right;">
                <div style="color: #42d392;font-weight: bold;">"Already have an account,&nbsp;&nbsp;
                  <span @click="router.push('/login');" style="color: #647eff;font-weight: bold;font-style: italic;">
                     try logging in?"
                  </span>
                </div>
              </div>
            </div>



          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  User,
  Lock,
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import request from '@/util/request';
import { ElMessage } from 'element-plus';
import router from "@/router";


const ruleFormRef = ref<FormInstance>();

const validateUsername = (rule: any, vlaue: any, callback: any) => {
  if (vlaue === "") {
    callback(new Error("Please input the username"));
  } else {
    callback();
  }
};

const validatePass = (rule: any, value: string, callback: any) => {
  if (value === "") {
    callback(new Error("Please input the password"));
  } else {
    if (ruleForm.checkPass !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("checkPass", () => null);
    }
    callback();
  }
};
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Please input the password again"));
  } else if (value !== ruleForm.password) {
    callback(new Error("Two inputs don't match!"));
  } else {
    callback();
  }
};

const ruleForm = reactive({
  password: '',
  checkPass: '',
  username: '',
});

const rules = reactive<FormRules<typeof ruleForm>>({
  password: [{ validator: validatePass, trigger: "blur" }],
  checkPass: [{ validator: validatePass2, trigger: "blur" }],
  username: [{ validator: validateUsername, trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      request.post("/register", ruleForm).then(
        res =>{
          console.log(res)
          if (res["code"] == '200'){
            ElMessage({
              message: '注册成功',
              type: 'success',
            });
            router.push("/login");
          }
          else{
            ElMessage.error(res["msg"]);
            formEl.resetFields();
          }
        }
      );
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style scoped>
.login-background {
  overflow: hidden;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: -webkit-linear-gradient(315deg, #647eff 25%, #42d392);
}

.login-form {
  height: 400px;
  width: 900px;
  margin: 150px auto;
  border-radius: 10px;
  border: 1px solid #ccc;
  background-color: white
}

.login-logo {
  width: 100%;
  text-align: center;
  padding: 20px 0;
}

.logo-font {
  font-weight: 900;
  font-size: 76px;
  background: -webkit-linear-gradient(315deg, #647eff 25%, #42d392);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
}
</style>
