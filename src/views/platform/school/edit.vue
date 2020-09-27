<template>
  <div class="user-list">
    <!-- 添加按钮 -->
    <p class="table_title">链商学院修改</p>
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
        <el-form-item label="标题：" prop="title">
          <el-input
            v-model="addForm.title"
            style="width: 500px; margin-right: 10px"
            placeholder="请输入标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="作者：" prop="author">
          <el-input
            v-model="addForm.author"
            style="width: 400px; margin-right: 10px"
            placeholder="请输入作者名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="分类：">
          <el-select v-model="addForm.classId" placeholder="请选择">
            <el-option
              v-for="item in options_class"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排版：">
          <el-select v-model="addForm.moduleType" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="封面图：" prop="image">
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
        <el-form-item label="类型：">
          <el-radio-group v-model="addForm.type">
            <el-radio label="0">文章</el-radio>
            <el-radio label="1">视频</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="简述：" prop="introduct">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入文章简述"
            v-model="addForm.introduct"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="内容：">
          <el-upload
            class="avatar-uploader"
            v-show="false"
            id="quill-upload"
            action="http://res.chainmall.pro/img/saveImage/image"
            list-type="picture"
            :show-file-list="false"
            :before-upload="beforeUpload"
            :on-success="handleExceed"
          >
            <el-button size="small" type="primary"></el-button>
          </el-upload>
          <el-row v-loading="uillUpdateImg">
            <quillEditor
              ref="myQuillEditor"
              @change="onEditorChange($event)"
              v-model="value_editor"
              :options="editorOption"
            />
          </el-row>
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
import {
  findCollegeActicleById,
  updateCollegeActicle,
  getCollegeClass,
} from "../../../network/platform";
import { quillEditor } from "vue-quill-editor";
// 工具栏配置
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
  ["link", "image", "video"],
  ["clean"], // remove formatting button
];
export default {
  components: { quillEditor },
  data() {
    return {
      content: "",
      uillUpdateImg: false, //根据图片上传状态来确定是否显示loading动画
      serverUrl: "", //上传的图片服务器地址
      value_editor: this.content, //富文本内容
      editorOption: {
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              image: function (value_editor) {
                if (value_editor) {
                  // 给个点击触发Element-ui，input框选择图片文件
                  document.querySelector("#quill-upload input").click();
                } else {
                  this.quill.format("image", false);
                }
              },
            },
          },
        },
      },
      options: [
        {
          value: "1",
          label: "布局 1",
        },
        {
          value: "2",
          label: "布局 2",
        },
      ],
      options_class: [],
      options_type: [
        {
          value: "1",
          label: "视频",
        },
        {
          value: "0",
          label: "文章",
        },
      ],
      coverImg: "",
      addForm: {
        classId: "",
        title: "",
        author: "",
        photo: "",
        image: "",
        moduleType: "1",
        type: "0",
        introduct: "",
        particulars: "",
      },
      isDisabled: false,
      rules: {
        author: [{ required: true, message: "必填项不能为空" }],
        introduct: [{ required: true, message: "必填项不能为空" }],
        title: [{ required: true, message: "标签名称不能为空" }],
        url: [{ required: true, message: "分类描述不能为空" }],
        sort: [{ required: true, message: "分类排序不能为空" }],
        image: [{ required: true, message: "缩略图不能为空" }],
      },
      labelPosition: "left",
      index: "",
    };
  },

  methods: {
    onEditorChange({ quill, html, text }) {
      //富文本编辑器内容发生改变的时候
      this.value_editor = html;
      this.$emit("textChange", html); //将富文本编辑器输入的文本发送给父组件，父组件涉及提交添加或者更改
    },
    beforeUpload() {
      //上传图片之前开启loading
      this.uillUpdateImg = true;
    },
    handleExceed(response, file, fileList) {
      //图片添加成功
      let quill = this.$refs.myQuillEditor.quill;
      //console.log(response);
      if (response.code === 0) {
        let length = quill.getSelection().index;
        // 插入图片 response.data.url为服务器返回的图片地址
        quill.insertEmbed(
          length,
          "image",
          "http://res.chainmall.pro/" + response.data
        );
        // 调整光标到最后
        quill.setSelection(length + 1);
      } else {
        this.$message.error("图片插入失败");
      }
      this.uillUpdateImg = false;
    },
    // 上传标签缩略图
    handlephoto(res, file) {
      //console.log(res);
      this.addForm.image = "http://res.chainmall.pro/" + res.data;
      let path = res.data;
      let obj = {
        path: path,
      };
    },

    subChange(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.value_editor == "") {
            this.$message.error("内容详情不能为空！");
            return false;
          }
          this.addForm.image = this.addForm.image.slice(25);
          this.addForm.particulars = this.value_editor;
          let obj = this.$qs.stringify(this.addForm);
          console.log(this.addForm);
          updateCollegeActicle(obj).then((res) => {
            //console.log(res);
            if (res.code == 0) {
              this.$message({
                type: "success",
                message: res.msg,
              });
              this.$router.push({ path: "/platform/school" });
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
    let obj_byId = {
      id: this.$route.query.id,
    };
    findCollegeActicleById(obj_byId).then((res) => {
      this.addForm = res.data;
      this.value_editor=res.data.particulars
      console.log(res)
    });
    let obj = {};
    getCollegeClass(obj).then((res) => {
      console.log(res);
      this.options_class = res.data;
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
