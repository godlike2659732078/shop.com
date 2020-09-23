<template>
  <div class="user-list">
    <!-- 添加按钮 -->
    <p class="table_title">创建直播间</p>
    <!-- 搜索列表 -->
    <div class="addLiveGoods">
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
        <el-form-item label="商品图片：(图片规则：图片尺寸最大300像素*300像素，小于80k)" prop="coverImgUrl">
          <el-upload
            class="avatar-uploader"
            action="http://res.chainmall.pro/img/saveImage/image"
            :on-success="handlephoto"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="coverImg" :src="coverImg" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品名称：(最长14个汉字)" prop="name">
          <el-input
            v-model="addForm.name"
            style="width:600px;margin-right:10px "
            placeholder="请输入商品名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="价格类型：" prop="anchorName">
          <el-input v-model="addForm.priceType" style="width:600px;margin-right:10px" disabled></el-input>
        </el-form-item>

        <el-form-item label="价格：" prop="price">
          <el-input
            v-model="addForm.price"
            style="width:600px;margin-right:10px "
            placeholder="请输入商品价格"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品类型：">
          <el-radio-group v-model="addForm.chooseType">
            <el-radio label="0">商家商品</el-radio>
            <el-radio label="1">积分商品</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商品id：" prop="url">
          <el-input
            type="number"
            v-model="addForm.url"
            style="width:600px;margin-right:10px "
            placeholder="请输入商品id"
          ></el-input>
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
import { addLiveGoods, getMedia } from "../../../network/merchant";
export default {
  components: { tinymce },
  data() {
    return {
      coverImg: "",
      addForm: {
        name: "",
        coverImgUrl: "",
        priceType: "1",
        price: "",
        chooseType: "0",
        url: "",
      },
      isDisabled: false,
      rules: {
        name: [
          { required: true, message: "商家名称不能为空" },
          { max: 14, message: "最长十四个汉字" },
        ],
        coverImgUrl: [{ required: true, message: "商品图片不能为空" }],
        price: [{ required: true, message: "商品价格不能为空" }],

        url: [{ required: true, message: "商品id不能为空" }],
      },
      labelPosition: "left",
      index: "",
    };
  },

  methods: {
    // 上传直播背景
    handlephoto(res, file) {
      console.log(res);
      this.coverImg = "http://res.chainmall.pro/" + res.data;
      let path = res.data;
      let obj = {
        path: path,
      };
      getMedia(obj).then((res) => {
        this.addForm.coverImgUrl =
          "Xrr7K298rwB7nYSr3KM00DXrNhuDep-c3BuaOrCRCgjKLjrf8_jfT_5x96Uklygl";
        // this.addForm.coverImg = res.media_id;
      });
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
          this.isDisabled = true;
          let link = "";
          if (this.addForm.chooseType == 0) {
            link = "pages/goods-details/goods-details?id=" + this.addForm.url;
          } else if (this.addForm.chooseType == 1) {
            link = "pages/int-details/int-details?id=" + this.addForm.url;
          }
          let obj = this.$qs.stringify({
            coverImgUrl: this.addForm.coverImgUrl,
            name: this.addForm.name,
            priceType: this.addForm.priceType,
            price: this.addForm.price,
            url: link,
          });
          addLiveGoods(obj).then((res) => {
            this.isDisabled = false;
            console.log(res);
            if (res.data.errcode == 0) {
              this.$message({
                type: "success",
                message: "添加成功！",
              });
              this.$router.push({ path: "/merchant/liveGoodsList" });
            } else if (res.data.errcode == 30001) {
              this.$message.error("创建商品功能被封禁");
            } else if (res.data.errcode == 30002) {
              this.$message.error("名称长度不符合规则!");
            } else if (res.data.errcode == 30003) {
              this.$message.error("商品价格不合规!");
            } else if (res.data.errcode == 30004) {
              this.$message.error("商品名称违规!");
            } else if (res.data.errcode == 30005) {
              this.$message.error("商品图片违规!");
            } else if (res.data.errcode == 30008) {
              this.$message.error("添加商品失败!");
            } else {
              this.$message.error("添加失败,请稍后重试");
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
.addLiveGoods {
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
