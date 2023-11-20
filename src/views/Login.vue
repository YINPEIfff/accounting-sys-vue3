<template>
  <div class="login-background">
    <div class="login-form">
      <div class="login-logo">
        <h1>
          <span class="logo-font">
            Login
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
          <el-form-item prop="validCode">
            <div style="display: flex;">
              <el-input :prefix-icon="Check" v-model="ruleForm.validCode" style="flex: 1;" placeholder="captcha code" @keydown.enter="submitForm(ruleFormRef)"/>

              <Sidentify :identifyCode="identifyCode" @click="refreshCode" style="height: 30px;flex: 1;"></Sidentify>
            </div>
          </el-form-item>
          <el-form-item style="width:80%;">
            <div style="display:flex;color: black;width: 80%;">
              <div>
                <el-button color="#42d392" @click="submitForm(ruleFormRef)"
                  style="color: white;justify-content: left;">Submit
                </el-button>
                <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
              </div>
              <div style="flex: 1;text-align: right;">
                <div style="color: #42d392;font-weight: bold;">No account?&nbsp;&nbsp;
                  <span @click="router.push('/register');" style="color: #647eff;font-weight: bold;font-style: italic;">
                    Register one.
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
  Check
} from '@element-plus/icons-vue'
import { reactive, ref, onMounted } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import Sidentify from '@/components/Sidentify.vue';
import request from '@/util/request';
import { ElMessage } from 'element-plus';
import router from "@/router";


const ruleFormRef = ref<FormInstance>();



let identifyCode = ref(''); //图形验证码
let identifyCodes = ref('1234567890abcdefjhijklinopqrsduvwxyz'); //验证码出现的数字和字母

//组件挂载
onMounted(() => {
  identifyCode.value = ''
  makeCode(identifyCodes.value, 4)
})

// 生成随机数
const randomNum = (min: number, max: number) => {
  max = max + 1
  return Math.floor(Math.random() * (max - min) + min)
}
// 随机生成验证码字符串
const makeCode = (o: String, l: number) => {
  for (let i = 0; i < l; i++) {
    identifyCode.value += o[randomNum(0, o.length)]
  }
}
// 更新验证码
const refreshCode = () => {
  identifyCode.value = ''
  makeCode(identifyCodes.value, 4)
}


const validateUsername = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Please input the username"));
  } else {
    callback();
  }
};

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Please input the password"));
  } else {
    callback();
  }
};

const validateValidCode = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Please input the valid code"))
  } else if (value !== identifyCode.value) {
    callback(new Error("Please enter the correct captcha code."))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  password: "",
  username: "",
  validCode: "",
});

const rules = reactive<FormRules<typeof ruleForm>>({
  password: [{ validator: validatePass, trigger: "blur" }],
  username: [{ validator: validateUsername, trigger: "blur" }],
  validCode: [{ validator: validateValidCode, trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log("submit!");
      request.post("/login", ruleForm).then(response => {
        console.log(response)
        if (response["code"] === '200') {
          router.push("/home");
          ElMessage({
            message: '登陆成功',
            type: 'success',
          });
          localStorage.setItem('honey-user', JSON.stringify(response.data))
        } else {
          resetForm;
          refreshCode;
          ElMessage.error(response["msg"]);
        }
      });
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
  background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
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
  background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
}
</style>
