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
        <p class="form_title">商家账号资料</p>
        <div style="display:flex">
          <el-form-item prop="account">
            账号：
            <el-input
              v-model="editForm.account"
              style="width:200px;margin-right:10px"
              placeholder="请输入商家登录账号"
              autocomplete="off"
              disabled
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
          <span style="color:#aaa">0~100 数字越小优先级越高</span>
        </el-form-item>
        <el-form-item label="店铺头像">
          <el-upload
            class="avatar-uploader"
            action="http://res.chainmall.pro/img/saveImage/image"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="editForm.headImage" :src="editForm.headImage" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="店铺背景">
          <el-upload
            class="avatar-uploader"
            action="http://res.chainmall.pro/img/saveImage/image"
            :show-file-list="false"
            :on-success="handleAvatarSuccess_bg"
          >
            <img
              v-if="editForm.headImage"
              style
              :src="editForm.backgroundImg"
              class="avatar_shopBg"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
  getmerchantOne,
  getmerchantAcount,
  updateMerchant,
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
    // 上传商家头像
    handleAvatarSuccess(res, file) {
      this.editForm.headImage = "http://res.chainmall.pro/" + res.data;
      console.log(res);
      console.log(file);
    },
    // 上传商家背景图
    handleAvatarSuccess_bg(res, file) {
      this.editForm.backgroundImg = "http://res.chainmall.pro/" + res.data;
      console.log(res);
      console.log(file);
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
          let headImage = this.editForm.headImage.slice(25);
          addForm.headImage = headImage;
          let backgroundImg = this.editForm.backgroundImg.slice(25);
          addForm.backgroundImg = backgroundImg;
          addForm.ensureAmt = amt * 10000;
          addForm.ensureMax = max * 10000;
          addForm.ensureMin = min * 10000;
          addForm.ensure = ensure / 100;
          addForm.fee = fee / 100;
          console.log(addForm);
          let obj = this.$qs.stringify(addForm);
          updateMerchant(obj).then((res) => {
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
  created() {
    console.log(this.$route.query.sId);
    let obj = {
      uId: this.$route.query.sId,
    };
    console.log(obj);
    getmerchantOne(obj).then((res) => {
      console.log(res);
      if (res.code == 0) {
        this.editForm = {
          name: res.data.name,
          phone: res.data.phone,
          sort: res.data.sort,
          shopTag: res.data.shopTag,
          account: res.data.account,
          headImage: res.data.headImage,
          backgroundImg: res.data.backgroundImg,
          shopClass: res.data.shopClass, // 商家分类
          ensureAmt: res.data.ensureAmt / 10000, // 保证金
          ensureMax: res.data.ensureMax / 10000, // 最大
          ensureMin: res.data.ensureMin / 10000, // 最小
          ensure: res.data.ensure * 100, // 保证金比例
          fee: res.data.fee * 100, // 服务费
          sId: res.data.sId,
        };
      }
    });
  },
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
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
.avatar_shopBg {
  width: 100px;
  height: 48px;
  display: block;
}
</style>
