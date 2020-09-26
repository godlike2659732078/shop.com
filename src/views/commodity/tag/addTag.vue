<template>
  <div class="user-list">
    <!-- 添加按钮 -->
    <p class="table_title">添加商品标签</p>
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
        <el-form-item label="标签名称：" prop="title">
          <el-input
            v-model="addForm.title"
            style="width: 600px; margin-right: 10px"
            placeholder="请输入标签名称"
       
          ></el-input>
        </el-form-item>
        <el-form-item label="标签描述：" prop="description">
          <el-input
            v-model="addForm.description"
            style="width: 600px; margin-right: 10px"
            placeholder="请输入标签描述"
          ></el-input>
        </el-form-item>

        <el-form-item label="排序：" prop="sort">
          <el-input
            v-model="addForm.sort"
            style="width: 600px; margin-right: 10px"
            placeholder="请输入分类排序"
          ></el-input>
        </el-form-item>
        <el-form-item label="缩略图：" prop="image">
          <el-upload
            class="avatar-uploader"
            action="http://res.chainmall.pro/img/saveImage/image"
            :on-success="handlephoto"
            :show-file-list="false"
          
          >
            <img v-if="addForm.image" :src="addForm.image" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
import { addTaxonomy, getMedia } from "../../../network/commodity";
export default {
  components: { tinymce },
  data() {
    return {
      coverImg: "",
      addForm: {
        title: "",
        description: "",
        sort: "",
        isHome:"1",
        image: "",
        isRecommend: "1",
      },
      isDisabled: false,
      rules: {
        title: [{ required: true, message: "标签名称不能为空" }],
        description: [{ required: true, message: "分类描述不能为空" }],
        sort: [{ required: true, message: "分类排序不能为空" }],
        image: [{ required: true, message: "缩略图不能为空" }],
      },
      labelPosition: "left",
      index: "",
    };
  },

  methods: {
    // 上传标签缩略图
    handlephoto(res, file) {
      console.log(res);
      this.addForm.image = "http://res.chainmall.pro/" + res.data;
      let path = res.data;
      let obj = {
        path: path,
      };
    },


    subChange(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addForm.image = this.addForm.image.slice(25);
          let obj = this.$qs.stringify(this.addForm);
          console.log(this.addForm);
          addTaxonomy(obj).then((res) => {
            console.log(res);
            if (res.code == 0) {
              this.$message({
                type: "success",
                message: res.msg,
              });
              this.$router.push({ path: "/commodity/tag" });
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
