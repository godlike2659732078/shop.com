<template>
  <div>
    <div class="login_bg">
      <div class="login_bgcolor">
        <div class="login_box">
          <div class="box_lg">
            <div class="text_name">
              <p>链上商城 后台管理系统</p>
              <p>链上商城 总后台</p>
            </div>
          </div>
          <div class="box_left">
            <p class="login_name">欢迎登陆</p>
            <el-input
              placeholder="用户名"
              class="userName"
              prefix-icon="el-icon-user"
              v-model="username"
              clearable
            ></el-input>
            <el-input
              type="password"
              placeholder="密码"
              class="pwd"
              prefix-icon="el-icon-unlock"
              v-model="password"
              show-password
            ></el-input>
            <el-button type="primary" class="sub" @click="gotoHome">登入</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getLogin } from "../network/login";
export default {
  components: {},
  props: {},
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    gotoHome() {
      if (this.username == "") {
        this.$notify.error({
          title: "错误",
          message: "用户名不能为空",
        });
      } else if (this.password == "") {
        this.$notify.error({
          title: "错误",
          message: "密码不能为空",
        });
      } else {
        let obj = this.$qs.stringify({
          username: this.username,
          password: this.password,
        });
        console.log(obj);
        getLogin(obj).then((res) => {
          console.log(res);
          if (res.code == 0) {
            this.$message({
              message: "登入成功！",
              type: "success",
            });
            this.$store.commit("innerUuid", res.data.uuid);
            this.$store.commit("innerAccessToken", res.data.accessToken);
            this.$store.commit("innerNickname", res.data.nickname);
            this.$router.push({ path: "/home" });
          } else {
            this.$message.error(res.data);
          }
          // this.$alert(res.data.info);
          // if (res.data.status == 1) {
          //   this.$store.commit("innerUid", res.data.data.uid);
          //   this.$store.commit("innerName", res.data.data.g_name);

          //   this.$router.push({ path: "/home" });
          // } else {
          // }
        });
      }
    },
  },
  created() {
    if (this.$route.query.type) {
      this.$message.error("登录超时，请重新登录！");
    }
  },
};
</script>
<style scoped>
.login_bg {
  background: url("../assets/images/login-bg.png");
  background-size: 100% 100%;
  height: 100%;
  position: fixed;
  width: 100%;
}
.login_bgcolor {
  width: 100%;
  min-height: 100vh;
  background-color: #25458eda;
  display: flex;
  justify-content: center;
  padding: 8% 0% 12%;
}
.login_box {
  text-align: center;
  width: 70%;
  height: 70%;
  background: url("../assets/images/login-bg.png");
  background-size: 100% 100%;

  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  border-radius: 18px;
  display: flex;
  justify-content: space-between;
}
.box_lg {
  width: 70%;
  height: 100%;
  background-color: #26468f67;
  position: relative;
}
.box_left {
  width: 30%;
  height: 100%;
  background: #fff;
  border-top-right-radius: 18px;
  border-bottom-right-radius: 18px;
}
.text_name {
  position: absolute;
  right: 50px;
  bottom: 60px;
  text-align: right;
}
.text_name p:first-child {
  font-size: 34px;
  color: #ffffff;
}
.text_name p:last-child {
  margin-top: 30px;
  font-size: 18px;
  color: #ffffff;
}
.login_name {
  display: inline-block;
  width: 100%;
  height: 50px;
  margin-top: 50px;
  font-size: 18px;
  line-height: 48px;
  text-align: center;
  color: #666;
  font-weight: 700;
  border-radius: 3px;
  border: none;
  margin-bottom: 100px;
}
.userName {
  width: 80%;
  margin-bottom: 20px;
}
.pwd {
  width: 80%;
}
.sub {
  margin-top: 30px;
  width: 80%;
  height: 40px;
  text-align: center;
  color: #ffffff;
  border: none;
}
</style>
