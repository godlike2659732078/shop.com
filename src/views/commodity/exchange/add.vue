<template>
  <div class="user-list">
    <!-- 添加按钮 -->
    <p class="table_title">添加商品分类</p>
    <!-- 搜索列表 -->
    <div class="addExchange">
      <!-- 编辑用户信息列表 -->
      <el-form
        :label-position="labelPosition"
        label-width="100px"
        style="padding:0px 15px"
        ref="addForm"
        :model="addForm"
        :rules="rules"
        :index="index"
      >
        <p class="form_title">商品信息</p>
        <div style="display:flex">
          <div style="width:500px;">
            <el-form-item prop="firstPicture">
              <el-upload
                action="http://res.chainmall.pro/img/saveImage/image"
                list-type="picture-card"
                :on-remove="handleRemove"
                :on-success="success"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          </div>
          <div style="width:50%">
            <el-form-item label="缩略图：" prop="picture">
              <el-upload
                class="avatar-uploader"
                action="http://res.chainmall.pro/img/saveImage/image"
                :on-success="handlephoto"
                :show-file-list="false"
              >
                <img v-if="addForm.picture" :src="picture" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="商品名称：" prop="name">
              <el-input
                v-model="addForm.name"
                style="width:500px;margin-right:10px "
                placeholder="请输入商品名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="排序：" prop="sort">
              <el-input v-model="addForm.sort" style="width:200px;margin-right:10px "></el-input>
            </el-form-item>
            <el-form-item label="邮费：" prop="freight">
              <el-input
                v-model="addForm.freight"
                style="width:200px;margin-right:10px "
                placeholder="请输入分类名称"
              ></el-input>元(用户需支付快递费用)
            </el-form-item>
            <el-form-item label="商品描述：" prop="describe">
              <el-input
                v-model="addForm.describe"
                style="width:400px;margin-right:10px"
                placeholder="请输入商品描述"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <p class="form_title">商品价格及规格</p>
        <el-form-item label="排序：" prop="sort">
          <el-input
            v-model="addForm.sort"
            style="width:600px;margin-right:10px "
            placeholder="请输入分类排序"
          ></el-input>
        </el-form-item>

        <el-form-item label="是否首页：">
          <el-radio-group v-model="addForm.isHome">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否推荐：">
          <el-radio-group v-model="addForm.isRecommend">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" :disabled="isDisabled" @click="subChange('addForm')">立即提交</el-button>
          <el-button style="margin-left:160px" @click="resetForm('addForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { TimeSelect } from "element-ui";
import tinymce from "../../../components/tinymce/tinymce";
import { addShopClass, getMedia } from "../../../network/commodity";
export default {
  components: { tinymce },
  data() {
    return {
      picture: "",
      addForm: {
        firstPicture: "",
        picture: "",
        name: "",
        describe: "",
        sort: "",
        freight: "",
      },
      isDisabled: false,
      rules: {
        name: [{ required: true, message: "分类名称不能为空" }],
        firstPicture: [{ required: true, message: "轮播图不能为空" }],
        sort: [{ required: true, message: "分类排序不能为空" }],
        picture: [{ required: true, message: "必填项不能为空" }],
        describe: [{ required: true, message: "必填项不能为空" }],
        freight: [{ required: true, message: "必填项不能为空" }],
      },
      labelPosition: "left",
      index: "",
    };
  },

  methods: {
    //   上传轮播图
    handleRemove(res, fileList) {},
    success(response, file, fileList) {
      let str = "";
      for (let item of fileList) {
        str += item.response.data + ",";
      }
      if (str.length > 0) {
        str = str.substr(0, str.length - 1);
      }
      console.log(str);
      this.addForm.firstPicture = str;
    },
    // 上传直播背景
    handlephoto(res, file) {
      console.log(res);
      this.picture = "http://res.chainmall.pro/" + res.data;
      this.addForm.picture = res.data;
      let path = res.data;
      let obj = {
        path: path,
      };
    },

    subChange(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.addForm);
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
  mounted() {},
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
.addExchange {
  padding: 15px;
  .el-radio__inner {
    width: 20px;
    height: 20px;
  }
  .el-form-item__label {
    margin-right: 10px;
    line-height: 20px;
  }
  .el-upload--picture-card {
    max-width: 100px;
    max-height: 100px;
    line-height: 100px;
  }
  .el-upload-list--picture-card .el-upload-list__item-thumbnail {
    width: auto;
    height: 100%;
  }
  .el-upload-list--picture-card .el-upload-list__item {
    max-width: 100px;
    max-height: 100px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 100px;
    height: 100px;
    line-height: 100px;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 55px;
    height: 50px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 55px;
    height: 50px;
    display: block;
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
</style>
