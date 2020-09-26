<template>
  <div class="user-list">
    <!-- 添加按钮 -->
    <p class="table_title">添加银行</p>
    <!-- 搜索列表 -->
    <div class="addTaxonomy">
      <!-- 编辑用户信息列表 -->
      <el-form
        :label-position="labelPosition"
        label-width="100px"
        style="padding: 0px 60px"
        ref="addForm"
        :model="addForm"
        :rules="rules"
        :index="index"
      >
        <el-form-item label="银行名称：" prop="bankName">
          <el-input
            v-model="addForm.bankName"
            style="width: 600px; margin-right: 10px"
            placeholder="请输入银行名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="银行标识：" prop="bankCode">
          <el-input
            v-model="addForm.bankCode"
            style="width: 600px; margin-right: 10px"
            placeholder="请输入银行标识"
          ></el-input>
        </el-form-item>

        <el-form-item label="银行图标：" prop="bankLogo">
          <el-upload
            class="avatar-uploader"
            action="http://res.chainmall.pro/img/saveImage/image"
            :on-success="handlebankLogo"
            :show-file-list="false"
          >
            <img
              v-if="addForm.bankLogo"
              :src="addForm.bankLogo"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="银行图片：" prop="bankImage">
          <el-upload
            class="avatar-uploader"
            action="http://res.chainmall.pro/img/saveImage/image"
            :on-success="handlebankImage"
            :show-file-list="false"
          >
            <img
              v-if="addForm.bankImage"
              :src="addForm.bankImage"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="是否开启：">
          <el-radio-group v-model="addForm.isOpen">
            <el-radio label="1">开启</el-radio>
            <el-radio label="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            :disabled="isDisabled"
            @click="subChange('addForm')"
            >立即提交</el-button
          >
          <el-button style="margin-left: 160px" @click="resetForm('addForm')"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { TimeSelect } from "element-ui";
import tinymce from "../../../components/tinymce/tinymce";
import { addBank, findBankById,editBankById } from "../../../network/platform";
export default {
  components: { tinymce },
  data() {
    return {
      options: [
        {
          value: "WEB",
          label: "WEB",
        },
        {
          value: "NATIVE",
          label: "NATIVE",
        },
      ],

      coverImg: "",
      addForm: {
        bankName: "",
        bankCode: "",
        bankLogo: "",
        bankImage: "",
        isOpen: "1",
      },
      isDisabled: false,
      rules: {
        bankName: [{ required: true, message: "必填项不能为空" }],
        bankCode: [{ required: true, message: "必填项不能为空" }],
        bankLogo: [{ required: true, message: "必填项不能为空" }],
        bankImage: [{ required: true, message: "必填项不能为空" }],
      },
      labelPosition: "left",
      index: "",
    };
  },

  methods: {
    // 上传银行图标
    handlebankLogo(res, file) {
      console.log(res);
      this.addForm.bankLogo = "http://res.chainmall.pro/" + res.data;
      let path = res.data;
      let obj = {
        path: path,
      };
    },
    // 上传银行图片
    handlebankImage(res, file) {
      console.log(res);
      this.addForm.bankImage = "http://res.chainmall.pro/" + res.data;
      let path = res.data;
      let obj = {
        path: path,
      };
    },
    subChange(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addForm.bankLogo = this.addForm.bankLogo.slice(25);
          this.addForm.bankImage = this.addForm.bankImage.slice(25);
          let obj = this.$qs.stringify(this.addForm);
          console.log(this.addForm);
          editBankById(obj).then((res) => {
            console.log(res);
            if (res.code == 0) {
              this.$message({
                type: "success",
                message: res.msg,
              });
              this.$router.push({ path: "/platform/bank" });
            } else {
              this.$message.error("操作失败！");
            }
          });
        } else {
          this.$message.error("请检查必填项是否为空");
          return false;
        }
      });
    },
    resetForm(ruleForm) {
      this.$refs[ruleForm].resetFields();
    },
  },
  created() {
    let obj = {
      id: this.$route.query.id,
    };
    findBankById(obj).then((res) => {
      this.addForm = res.data;
      this.addForm.isOpen = res.data.isOpen.toString();
    });
  },
};
</script>
<style lang="less">
#allMap {
  width: 100%;
  height: 600px;
  overflow: hidden;
  margin: 0px auto;
  font-family: "微软雅黑";
}
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
.addTaxonomy {
  padding: 15px;
  .el-radio__inner {
    width: 20px;
    height: 20px;
  }
  .el-form-item__label {
    margin-right: 10px;
    line-height: 20px;
  }
}
.user-list {
  background: #fff;
}

.el-button--mini,
.el-button--mini.is-round {
  padding: 5px 5px;
}
.el-form-item__label {
  padding: 0px;
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
