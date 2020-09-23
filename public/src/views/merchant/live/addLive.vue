<template>
  <div class="user-list">
    <!-- 添加按钮 -->
    <p class="table_title">创建直播间</p>
    <!-- 搜索列表 -->
    <div class="addLive">
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
        <el-form-item label="房间名称：" prop="name">
          <el-input
            v-model="addForm.name"
            style="width:600px;margin-right:10px "
            placeholder="请输入房间名称(最短三个汉字，不能大于十七个字)"
          ></el-input>
        </el-form-item>
        <el-form-item label="主播昵称：" prop="anchorName">
          <el-input
            v-model="addForm.anchorName"
            style="width:600px;margin-right:10px "
            placeholder="请输入主播昵称(最短两个汉字，不能大于十五个字)"
          ></el-input>
        </el-form-item>

        <el-form-item label="直播背景图：">
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
        <el-form-item label="直播分享图：">
          <el-upload
            class="avatar-uploader"
            action="http://res.chainmall.pro/img/saveImage/image"
            :show-file-list="false"
            :on-success="handlephotoOne"
            :before-upload="beforeShareImage"
          >
            <img v-if="shareImg" :src="shareImg" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="开播时间：" prop="startTime">
          <el-date-picker
            v-model="addForm.startTime"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="关播时间：" prop="endTime">
          <el-date-picker
            v-model="addForm.endTime"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="主播微信号：" prop="anchorWechat">
          <el-input
            v-model="addForm.anchorWechat"
            style="width:600px;margin-right:10px "
            placeholder="请输入房间名称(最短三个汉字，不能大于十七个字)"
          ></el-input>
        </el-form-item>
        <el-form-item label="直播间类型：">
          <el-radio-group v-model="addForm.type">
            <el-radio label="0">手机直播</el-radio>
            <el-radio label="1">推流</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="横屏、竖屏：">
          <el-radio-group v-model="addForm.screenType">
            <el-radio label="0">竖屏</el-radio>
            <el-radio label="1">横屏</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否开启回放：">
          <el-radio-group v-model="addForm.closeReplay">
            <el-radio label="1">关闭</el-radio>
            <el-radio label="0">开启</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否关闭点赞：">
          <el-radio-group v-model="addForm.closeLike">
            <el-radio label="1">关闭</el-radio>
            <el-radio label="0">开启</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否关闭货架：">
          <el-radio-group v-model="addForm.closeGoods">
            <el-radio label="1">关闭</el-radio>
            <el-radio label="0">开启</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否关闭评论：">
          <el-radio-group v-model="addForm.closeComment">
            <el-radio label="1">关闭</el-radio>
            <el-radio label="0">开启</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否关闭客服：">
          <el-radio-group v-model="addForm.closeKf">
            <el-radio label="1">关闭</el-radio>
            <el-radio label="0">开启</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="subChange('addForm')">立即提交</el-button>
          <el-button style="margin-left:160px" @click="resetForm('addForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 备注信息弹窗 -->
      <el-dialog
        width="400px"
        style="height:800px"
        title="主播暂未认证直播，请微信扫码前往认证~"
        :visible.sync="showMap"
      >
        <img
          src="https://res.wx.qq.com/op_res/BbVNeczA1XudfjVqCVoKgfuWe7e3aUhokktRVOqf_F0IqS6kYR--atCpVNUUC3zr"
          alt
        />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { TimeSelect } from "element-ui";
import tinymce from "../../../components/tinymce/tinymce";
import { addLive, getMedia } from "../../../network/merchant";
export default {
  components: { tinymce },
  data() {
    return {
      defaultMsg: "", // 富文本默认提示信息
      showMap: false,
      shareImg: "",
      coverImg: "",
      addForm: {
        name: "",
        anchorName: "",
        coverImg: "",
        shareImg: "",
        startTime: "",
        endTime: "",
        anchorWechat: "",
        type: "0",
        screenType: "0",
        closeReplay: "1",
        closeLike: "1",
        closeGoods: "1",
        closeComment: "1",
        closeKf: "1",
      },
      rules: {
        name: [
          { required: true, message: "商家名称不能为空" },
          { min: 3, max: 17, message: "长度在 3 到 17 个字符" },
        ],
        anchorName: [
          { required: true, message: "必填项不能为空" },
          { min: 2, max: 15, message: "长度在 2 到 15 个字符" },
        ],
        anchorWechat: [
          { required: true, message: "必填项不能为空" },
          { min: 3, max: 17, message: "长度在 3 到 17 个字符" },
        ],
        address: [{ required: true, message: "必填项不能为空" }],
        coordinates: [{ required: true, message: "必填项不能为空" }],
        startTime: [{ required: true, message: "必填项不能为空" }],
        endTime: [{ required: true, message: "必填项不能为空" }],
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
        this.addForm.coverImg = this.addForm.coverImg = res.media_id;
      });
    },
    beforeAvatarUpload(file) {
      let isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("直播背景图片大小不能超过 2MB!");
        return false;
      }
    },
    // 上传直播分享图
    handlephotoOne(res, file) {
      this.shareImg = "http://res.chainmall.pro/" + res.data;
      console.log(res);
      console.log(file);
      let path = res.data;
      let obj = {
        path: path,
      };
      getMedia(obj).then((res) => {
        this.addForm.shareImg = res.media_id;
      });
    },
    beforeShareImage(file) {
      const isLt2M = file.size / 1024 / 1024 < 1;
      if (!isLt2M) {
        this.$message.error("直播分享图片大小不能超过 1MB!");
        return false;
      }
    },

    subChange(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let obj = this.$qs.stringify(this.addForm);
          addLive(obj).then((res) => {
            console.log(res);
            if (res.date.errcode == 0) {
              this.$message({
                type: "success",
                message: "创建成功！",
              });
              this.$router.push({ path: "/merchant/liveShow" });
            } else if (res.date.errcode == 300006) {
              this.$message.error("图片上传失败！");
            } else if (res.date.errcode == 300028) {
              this.$message.error("房间名称违规!");
            } else if (res.date.errcode == 300029) {
              this.$message.error("主播昵称违规!");
            } else if (res.date.errcode == 300030) {
              this.$message.error("主播微信号不合法!");
            } else if (res.date.errcode == 300035) {
              this.$message.error("主播微信号不存在!");
            } else if (res.date.errcode == 300036) {
              this.showMap = true;
            } else {
              this.$message.error("创建失败,检查开播时间等数据是否正确！");
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
.addLive {
  padding: 15px;
  .el-radio__inner {
    width: 20px;
    height: 20px;
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
