<template>
  <div class="user-list">
    <!-- 添加按钮 -->
    <p class="table_title">添加商品分类</p>
    <!-- 搜索列表 -->
    <div class="editShopClass">
      <!-- 编辑用户信息列表 -->
      <el-form
        :label-position="labelPosition"
        label-width="100px"
        style="padding:0px 60px"
        ref="addForm"
        :model="addForm"
        :rules="rules"
        :index="index"
      >
        <el-form-item label="分类名称：" prop="name">
          <el-input
            v-model="addForm.name"
            style="width:600px;margin-right:10px "
            placeholder="请输入分类名称"
            @blur="findName"
          ></el-input>
        </el-form-item>
        <el-form-item label="分类描述：" prop="description">
          <el-input
            v-model="addForm.description"
            style="width:600px;margin-right:10px"
            placeholder="请输入分类描述"
          ></el-input>
        </el-form-item>

        <el-form-item label="排序：" prop="sort">
          <el-input
            v-model="addForm.sort"
            style="width:600px;margin-right:10px "
            placeholder="请输入分类排序"
          ></el-input>
        </el-form-item>
        <el-form-item label="缩略图：" prop="icon">
          <el-upload
            class="avatar-uploader"
            action="http://res.chainmall.pro/img/saveImage/image"
            :on-success="handlephoto"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="addForm.icon" :src="addForm.icon" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="是否推荐：">
          <el-radio-group v-model="addForm.isRecommend">
            <el-radio label=1>是</el-radio>
            <el-radio label=0>否</el-radio>
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
import { editGoodsClass, findSysGoodsClassById ,findNames} from "../../../network/commodity";
export default {
  data() {
    return {
      addForm: {
        name: "",
        description: "",
        sort: "",
        icon: "",
        isHome:"1",
        isRecommend: "1",
        id:""
      },
      isDisabled: false,
      rules: {
        name: [{ required: true, message: "分类名称不能为空" }],
        description: [{ required: true, message: "分类描述不能为空" }],
        sort: [{ required: true, message: "分类排序不能为空" }],
        icon: [{ required: true, message: "缩略图不能为空" }],
      },
      labelPosition: "left",
      index: "",
    };
  },

  methods: {
       // 判断名字是否重复
    findName() {
      let obj = {
        name: this.addForm.name,
      };
      findNames(obj).then((res) => {
        if (res.msg == "分类名已存在") {
          this.$message.error("此分类已存在");
        } else {
          this.$message({
            type: "success",
            message: res.msg,
          });
        }
      });
    },
    // 上传直播背景
    handlephoto(res, file) {
      console.log(res);
      this.addForm.icon = "http://res.chainmall.pro/" + res.data;
      let path = res.data;
      let obj = {
        path: path,
      };
    },
    beforeAvatarUpload(file) {
      console.log(file.size);
      let isLt80K = file.size / 1024 < 80;

      if (!isLt80K) {
        this.$message.error("商品图片大小不能超过 80kb!");
        return false;
      }
    },

    subChange(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addForm.icon = this.addForm.icon.slice(25);
          let obj = this.$qs.stringify(this.addForm);
          console.log(this.addForm);
          editGoodsClass(obj).then((res) => {
            console.log(res);
            if (res.code == 0) {
              this.$message({
                type: "success",
                message: res.msg,
              });
              this.$router.push({ path: "/commodity/exClass" });
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
    findSysGoodsClassById(obj).then((res) => {
      console.log(res);
      this.addForm = res.data;
       this.addForm.id= this.$route.query.id
      this.addForm.isHome=res.data.isHome.toString()
      this.addForm.isRecommend=res.data.isRecommend.toString()
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
.editShopClass {
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
