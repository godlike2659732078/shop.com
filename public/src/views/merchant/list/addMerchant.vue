<template>
  <div class="user-list">
    <!-- 添加按钮 -->
    <p class="table_title">商家列表</p>
    <!-- 搜索列表 -->
    <div class="userList_content">
      <!-- 编辑用户信息列表 -->
      <el-form
        :label-position="labelPosition"
        :rules="rules"
        ref="editForm"
        label-width="80px"
        :model="editForm"
        :index="index"
      >
        <p class="form_title">创建商家账号</p>
        <div style="display:flex">
          <el-form-item prop="account">
            账号：
            <el-input
              v-model="editForm.account"
              style="width:200px;margin-right:10px"
              placeholder="请输入商家登录账号"
              @blur="getAcount"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            登录密码：
            <el-input
              v-model="editForm.password"
              style="width:200px;margin-right:10px"
              placeholder="请输入商家登录密码"
              autocomplete="off"
            ></el-input>
            <span style="color:#aaa">请填写6到12位密码</span>
          </el-form-item>
        </div>

        <p class="form_title">设置商家基础参数</p>
        <div style="display:flex">
          <el-form-item prop="name">
            店铺名称：
            <el-input
              v-model="editForm.name"
              style="width:200px;margin-right:10px "
              placeholder="请输入店铺名称"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item prop="phone">
            联系电话：
            <el-input
              v-model="editForm.phone"
              style="width:200px; margin-right:10px ;"
              placeholder="请输入联系电话"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </div>

        <el-form-item prop="sort">
          商家排序：
          <el-input v-model="editForm.sort" style="width:200px;margin-right:10px ;" :value="0"></el-input>
        </el-form-item>
        <p class="form_title">设置商家资金参数</p>
        <div style="display:flex">
          <el-form-item prop="ensureAmt">
            商家保证金：
            <el-input
              v-model="editForm.ensureAmt"
              style="width:200px;margin-right:10px ;margin-bottom:10px"
              placeholder="请输入商家保证金"
              autocomplete="off"
            ></el-input>
            <span style="color:#aaa;margin-right:20px">万元</span>
          </el-form-item>
          <el-form-item prop="ensureMax">
            最高阀值：
            <el-input
              v-model="editForm.ensureMax"
              style="width:200px; margin-right:10px;margin-bottom:10px ;"
              placeholder="请输入商家保证金最大值"
              autocomplete="off"
            ></el-input>
            <span style="color:#aaa;margin-right:20px">万元</span>
          </el-form-item>
        </div>
        <div style="display:flex">
          <el-form-item prop="ensureMin">
            最低阀值：
            <el-input
              v-model="editForm.ensureMin"
              style="width:200px;margin-right:10px;margin-bottom:10px ;"
              placeholder="请输入商家保证金最小值"
              :value="0"
              autocomplete="off"
            ></el-input>
            <span style="color:#aaa;margin-right:20px">万元</span>
          </el-form-item>
          <el-form-item prop="ensure">
            保证金比例：
            <el-input
              v-model="editForm.ensure"
              style="width:200px; margin-right:10px;margin-bottom:10px ;"
              placeholder="请输入商家保证金比例"
              autocomplete="off"
            ></el-input>
            <span style="color:#aaa;margin-right:20px">% （保证金比例为商家冻结资金解冻占比）</span>
          </el-form-item>
        </div>

        <el-form-item prop="fee">
          服务费：
          <el-input
            v-model="editForm.fee"
            style="width:200px;margin-right:10px;margin-bottom:10px ;"
            placeholder="请输入需要支付的服务费"
            autocomplete="off"
            :value="0"
          ></el-input>
          <span style="color:#aaa;margin-right:20px">% （商家卖出商品向平台支付的服务费）</span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('editForm')">立即提交</el-button>
          <el-button style="margin-left:160px" @click="resetForm('editForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { TimeSelect } from "element-ui";
import {
  getmerchantList,
  getmerchantAcount,
  addMerchant,
} from "../../../network/merchant";
export default {
  components: {},
  data() {
    return {
      editForm: {
        headImage:
          "adm/2019/03/16/30bbdbf89001863348e4c8d8d7801d462019-03-16-08-48-22.png",
        backgroundImg:
          "adm/2019/03/16/f257ae6b19b68a7dbcac28319eb5afe02019-03-16-08-49-49.png",
        account: "",
        phone: "",
        password: "",
        name: "",
        sort: "",
        ensureAmt: "",
        ensureMax: "",
        ensureMin: "",
        ensure: "",
        fee: "",
      },
      rules: {
        account: [{ required: true, message: "必填项不能为空", tigger: "" }],
        fee: [{ required: true, message: "必填项不能为空" }],
        name: [{ required: true, message: "必填项不能为空" }],
        sort: [{ required: true, message: "必填项不能为空" }],
        phone: [{ required: true, message: "必填项不能为空" }],
        ensureAmt: [{ required: true, message: "必填项不能为空" }],
        ensureMax: [{ required: true, message: "必填项不能为空" }],
        ensureMin: [{ required: true, message: "必填项不能为空" }],
        ensure: [{ required: true, message: "必填项不能为空" }],
      },
      labelPosition: "left",
      index: "",
    };
  },

  methods: {
    getAcount() {
      let obj = {
        account: this.editForm.account,
      };
      getmerchantAcount(obj).then((res) => {
        console.log(res);
        if (res.msg == "此账号可用") {
          this.$message({
            message: res.msg,
            type: "success",
          });
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 提交编辑内容事件
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          let addForm = "";
          addForm = this.editForm;
          let amt = parseInt(addForm.ensureAmt);
          let max = parseInt(addForm.ensureMax);
          let min = parseInt(addForm.ensureMin);
          let ensure = parseInt(addForm.ensure);
          let fee = parseInt(addForm.fee);

          if (amt.toString().length >= 5) {
            this.$message.error("保证金金额位数最大为四位");

            return false;
          }

          if (max.toString().length >= 5) {
            this.$message.error("最高阀值位数最大为四位");

            return false;
          }

          if (min.toString().length >= 5) {
            this.$message.error("最低阀值位数最大为四位");
            return false;
          }

          if (amt > max) {
            this.$message.error("最高阀值需大于商家保证金金额");

            return false;
          }

          if (amt < min) {
            this.$message.error("最低阀值需小于商家保证金金额");

            return false;
          }

          if (ensure > 100) {
            this.$message.error("保证金比例不能大于100");
            return false;
          }

          if (fee > 100) {
            this.$message.error("平台服务费比例不能大于100");
            return false;
          }
          addForm.ensureAmt = amt * 10000;
          addForm.ensureMax = max * 10000;
          addForm.ensureMin = min * 10000;
          addForm.ensure = ensure / 100;
          addForm.fee = fee / 100;
          console.log(addForm);
          let obj = this.$qs.stringify(addForm);
          addMerchant(obj).then((res) => {
            console.log(res);
            if (res.code == 0) {
              this.$message({
                message: res.msg,
                type: "success",
              });
              this.$router.push({ path: "/merchant/merchantList" });
            } else {
              this.$message.error("操作失败");
            }
          });
        } else {
          this.$message.error("操作失败");
          return false;
        }
      });
    },
    resetForm(ruleForm) {
      this.$refs[ruleForm].resetFields();
    },
    gotoCredits(res) {
      // this.$router.push({ path: "/credits", query: { uId: res.uId } });
    },
  },
  mounted() {},
};
</script>
<style lang="less">
.table_title {
  display: block;
  font-size: 14px;
  height: 43px;
  line-height: 43px;
  padding: 0px 15px;
}
.form_title {
  display: block;
  font-size: 14px;
  height: 43px;
  line-height: 43px;
  padding: 0px 15px;
  border-left: 2px solid #009688;
  margin-bottom: 10px;
}
.userList_content {
  padding: 15px;
}
.user-list {
  background: #fff;
}

.el-button--mini,
.el-button--mini.is-round {
  padding: 5px 5px;
}
.el-table td,
.el-table th.is-leaf {
  border-bottom: 1px solid #ebeef5;
  border-right: 1px solid #ebeef5;
}
.showSelf {
  display: flex;
  width: 600px;
  justify-content: space-between;
  align-items: center;
}
.showSelf img {
  max-width: 100px;
  max-height: 100px;
}
.userserch_block {
  font-size: 14px;
  color: #666;
}
.el-button + .el-button {
  margin-left: 0px;
}
.el-menu-demo {
  display: block;
  width: 500px;
}

.timeline {
  margin-left: 20px;
}
.user_edit {
  background: rgb(255, 184, 0);
  border: none;
}
.user_look {
  border: none;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>
