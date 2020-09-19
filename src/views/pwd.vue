<template>
  <div>
    <div class="pwdChange">
      <h4 class="pwd_title">修改密码：</h4>
      <el-form :label-position="labelPosition" label-width="100px" :model="form">
        <el-form-item label="当前密码" >
          <el-input  class="pwd" v-model="form.pwd" show-password></el-input>
        </el-form-item>
        <el-form-item  label="新密码">
          <el-input class="npwd" v-model="form.npwd" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认新密码">
          <el-input class="npwd" v-model="form.npwds" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="margin-left:50px" type="primary" >修改</el-button>
          <el-button >取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      form: {
        pwd: "",
        npwd: "",
        npwds: "",
        
      },
        labelPosition: "left",
    };
  }
};
</script>
<style scoped>

.pwd_title{
  margin-left: 26px;
  margin-bottom: 20px;
}
.pwdChange {
  width: 100%;
  height: 300px;
  background: #fff;
  padding-top: 20px;
  padding-left: 20px ;
}
.pwd{
  width: 500px;

}
.npwd{
  width: 500px;
  
}
</style>