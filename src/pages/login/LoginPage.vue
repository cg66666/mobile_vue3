<template>
  <div class="back">
    <div class="head">
      <SvgIcon name="chacha" size="0.72rem" @click="() => router.go(-1)" />
      <div>帮助</div>
    </div>
    <div class="form">
      <div class="welcomeWord">欢迎登录美团</div>
      <div class="inputContainer phoneInputContainer">
        <div
          class="inputTarget"
          ref="inputTarget"
          id="CustomInput"
          contenteditable
          @input="handlePhoneInput"
        />
        <SvgIcon
          v-show="state.loginData.phone"
          class="clearInput"
          name="chacha"
          size="0.45rem"
          @click="clearPhoneInputVal"
        />
      </div>
      <div
        class="inputContainer passwordInputContainer"
        :style="{
          marginTop: '20px'
        }"
        id="PasswordInput"
      >
        <input
          :type="isShow ? 'text' : 'password'"
          class="input"
          v-model="state.loginData.password"
        />
        <SvgIcon
          v-show="state.loginData.password"
          class="clearInput"
          name="chacha"
          size="0.45rem"
          @click="clearPasswordInputVal"
          :style="{ right: '25px' }"
        />
        <SvgIcon
          class="isShowIcon"
          v-if="isShow"
          name="yanjing_xianshi_o"
          size="0.55rem"
          @click="
            () => {
              isShow = !isShow;
            }
          "
        />
        <SvgIcon
          class="isShowIcon"
          v-else
          name="yanjing_yincang_o"
          size="0.55rem"
          @click="
            () => {
              isShow = !isShow;
            }
          "
        />
      </div>
      <div class="lawContainer">
        <Checkbox v-model="checked" shape="square" icon-size="12px" />
        <div class="lawText">
          我已阅读并统一 <a href="#">《美团用户协议》</a>、<a href="#">《隐私政策》</a
          >，并授权美团使用该美团账号信息（如昵称、头像、收货地址）进行统一管理
        </div>
      </div>
      <Button
        class="loginButton"
        color="rgb(255, 209, 0)"
        :style="{ color: 'black', fontWeight: 'bolder' }"
        >登录</Button
      >
      <!-- 这部分点了也没有 -->
      <div class="otherPart">
        <div>验证码登录</div>
        <div>遇到问题</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { Checkbox, Button } from 'vant';
import { cloneDeep } from '@/utils';
type loginDataType = {
  loginData: {
    phone: string;
    password: string;
  };
};
const router = useRouter();
const state = reactive<loginDataType>({
  loginData: {
    phone: '',
    password: ''
  }
});
const checked = ref(false);
// 根据情景将光标置于末尾
const setSelection = (e: any) => {
  let range = window.getSelection() as any; //创建range
  console.log('range222', range);
  // 根据id，判断当前DOM的光标是否需要更新
  if (range.focusNode.id === 'PasswordInput') return;
  range?.selectAllChildren(e); //range 选择obj下所有子内容
  range?.collapseToEnd(); //光标移至最后
};
watch(state, (nv) => {
  inputTarget.value.innerHTML = nv.loginData.phone || '';
  setSelection(inputTarget.value);
});
// 手写手机号输入框逻辑 contenteditable -----------------------------------------------------------
// DOM元素
const inputTarget = ref<any>();
const clearPhoneInputVal = () => {
  state.loginData.phone = '';
};
const handlePhoneInput = (e: any) => {
  // 每次操作，需要更新DOM元素
  inputTarget.value = e.target;
  let string: string = e.target.innerHTML.replace(/[^0-9]/gi, '');
  if (string.length > 11) {
    string = string.slice(0, 11);
  }
  const arry = string.split('');
  if (arry[3]) {
    arry.splice(3, 0, ' ');
  }
  if (arry[8]) {
    arry.splice(8, 0, ' ');
  }
  string = arry.join('');
  const loginData = cloneDeep(state.loginData);
  loginData.phone = string;
  state.loginData = loginData;
};

// 密码框逻辑----------------------------------------------------------
// 显示与隐藏逻辑
const isShow = ref(false);
const clearPasswordInputVal = () => {
  state.loginData.password = '';
};
</script>

<style lang="scss" scoped>
.back {
  padding: 20px;
  width: calc(100% - 40px);
  .head {
    display: flex;
    font-size: 20px;
    width: 100%;
    justify-content: space-between;
    div {
      height: 100%;
      line-height: 30px;
    }
  }
  .form {
    width: calc(100% - 25px);
    padding: 80px 0 0 25px;
    box-sizing: border-box;
    .welcomeWord {
      font-size: 33px;
      margin-bottom: 45px;
    }
    .inputContainer {
      position: relative;
      width: 100%;
      height: 50px;
      font-size: 22px;
      &::after {
        content: '';
        width: 100%;
        height: 2px;
        position: absolute;
        left: 0;
        bottom: 0;
        background: rgb(229, 229, 229);
      }
      .inputTarget {
        width: 100%;
        margin-left: 40px;
        line-height: 50px;
        left: 30px;
        border: none;
        // 去除边框
        &:focus {
          border: none;
          outline: none;
        }
      }
      .clearInput {
        position: absolute;
        right: 3px;
        top: 17px;
      }
      .input {
        outline: none;
        border: none;
        margin-top: 10.5px;
        width: 245px;
        caret-color: $brandColor;
      }
      input[type='password']::-ms-reveal {
        display: none;
      }
      .isShowIcon {
        position: absolute;
        right: 0;
        top: 15px;
      }
    }

    .phoneInputContainer {
      position: relative;
      &::before {
        content: '+86 >';
        position: absolute;
        left: 0;
        font-size: 13px;
        line-height: 50px;
      }
    }

    .lawContainer {
      margin-top: 60px;
      font-size: 14px;
      // display: flex;
      position: relative;
      .lawText {
        // margin-left: 30px;
        position: absolute;
        left: 30px;
        top: 0;
      }
    }
    .loginButton {
      margin-top: 55px;
      width: 100%;
      font-size: 14px;
      // color: bla;
    }
    .otherPart {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      margin-top: 25px;
      color: rgb(140, 140, 140);
    }
  }
}
</style>
