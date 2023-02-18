<template>
  <el-row id="container">
    <el-col :span="12" class="slogan">
      <h1>你好 <br>Let's  to  chat</h1>
      <p>如果你没有账号<br>可以<span @click="loginSwitch">点击这里</span>进行注册</p>
      
      <img src="../assets/image/face.png" alt="">
    </el-col>
    <el-col :span="12" class="box">
      <el-col class="login">
         <h2>{{ title }}</h2>
         <el-form ref="form" :model="form" :rules="rules">
            <el-form-item prop="tel">
              <el-input v-model="form.tel"  maxlength="11" placeholder="账户" clearable></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="form.password" maxlength="8" show-password placeholder="密码" clearable></el-input>
            </el-form-item>
            <el-form-item v-if="isRegister" prop="">
              <el-input placeholder="验证码"></el-input>
              <div class="vcode"><span>获取验证码</span></div>
            </el-form-item>
            <el-form-item label="记住密码" prop="remember">
              <el-switch v-model="form.remember" clearable></el-switch>
            </el-form-item>
            <el-form-item>
              <el-button @click="login">{{ subTitle }}</el-button>
            </el-form-item>
            <el-form-item class="options">
              <div class="separator">
                <p>其他方式登录</p>
              </div>
              <ul>
                <li><i class="iconfont icon-weixin"></i></li>
                <li><i class="iconfont icon-iphone"></i></li>
                <li><i class="iconfont icon-google"></i></li>
              </ul>
            </el-form-item>
         </el-form>
      </el-col>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      isRegister: false,
      title:'登录',
      subTitle: '登录',
      form: {
        tel: '',
        password: '',
        remember: false
      },
      rules: {
        tel: [
          { required: true, message: '请输入手机号码', trigger: 'blur'},
        ],
        password: [
          { required: true, message: '请输入账户密码', trigger: 'blur'},
        ]
      }
    }
  },
  methods: {
    loginSwitch() {
      this.isRegister = true;
    },
    login() {
      this.$refs.form.validate( valid => {
        if(valid) {
           
              
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
#container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  max-width: 1200px;
  width: 100%;
  box-sizing: border-box;
  .slogan {
    position: relative;
    z-index: 1;
    &::before {
      content: '';
      position: absolute;
      top: 15%;
      left: 0;
      width: 300px;
      height: 100px;
      background: linear-gradient(to right, var(--primary-color), #4776E6, #8E54E9);
      z-index: -1;
      filter: blur(70px);
    }
    img {
      position: absolute;
      left: -50%;
      top: -10%;
      width: 290px;
    }
    h1 {
      margin-bottom: 50px;
      font-size: 48px;
      line-height: 66px;
      font-weight: 700;
      color: #000;
    }
    p {
      span {
        color: var(--primary-color);
        cursor: pointer;
        font-weight: bold;
        transition: .3s;
        &:hover {
          color: #767676;
        }
      }
    }
  }
  .box {
    padding-left: 16%;
    h2 {
      font-size: 40px;
    }
    /deep/.el-input__inner,
    /deep/.el-button
    {
      padding: 0 20px;
      height: 60px;
      width: 100%;
      font-size: 16px;
      border-radius: 10px;
    }
    /deep/.el-input__inner {
      border-color: var(--light-bg-color);
      background-color: var(--light-bg-color);
      transition: all .25s ease;
      outline: 0px solid var(--light-bg-color);
      &::placeholder {
        font-family: 'Noto Sans SC', sans-serif;
        color: #767676;
        font-size: inherit;
      }
      &:focus {
        outline: 3px solid rgba(49, 97, 229, 0.8);
      }
    }
    /deep/.el-button {
      border: none;
      color: #fff;
      font-weight: bold;
      background-color: var(--primary-color);
      box-shadow: var(--primary-color) 0 20px 30px -10px;
      cursor: pointer;
      transition: box-shadow .3s;
      &:hover {
        box-shadow: var(--primary-color) 0 10px 30px -10px;
      }
    }
    /deep/.el-switch.is-checked .el-switch__core {
      border-color: var(--primary-color);
      background-color: var(--primary-color);
    }
    /deep/.el-form-item__error {
      color: #4460f1;
    }
    .vcode {
      position: absolute;
      padding: 0 20px;
      right: 0;
      top: 50%;
      height: 30px;
      line-height: 30px;
      transform: translate3d(0,-50%,0);
      border-left: 1px solid #dedede;
      span {
        display: inline-block;
        font-size: 15px;
        color: var(--primary-color);
        font-family: 'Noto Sans SC', sans-serif;
        transition: .2s;
        cursor: pointer;
      }
    }

    .options {
      .separator {
        position: relative;
        margin: 40px 0 30px;
        position: relative;
        &::before {
          content: '';
          position: absolute;
          top: 50%;
          width: 100%;
          height: 1px;
          background-color: var(--light-text-color);
          opacity: .3;
          z-index: 1;
        }
        p {
          width: fit-content;
          padding: 0 10px;
          color: var(--light-text-color);
          background-color: var(--background-color);
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
      }
      ul {
        padding: 0;
        display: flex;
        justify-content: center;
        width: 100%;
        li {
          margin: 0 20px;
          padding: 5px 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #edebeb;
          border-radius: 10px;
          transition: .3s;
          cursor: pointer;
          i {
            font-size: 25px;
          }
          &:hover {
            background-color: #fff;
            border-color: #fff;
            box-shadow: 0px 10px 14px  rgba(0, 0, 0, 10%);
          }
        }
      }
    }
    .rote {
      -webkit-animation: flip-scale-up-ver 0.5s linear both;
	        animation: flip-scale-up-ver 0.5s linear both;
    }
  }
}

</style>