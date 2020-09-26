<template>
  <div>
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
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
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
      console.log(response);
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
      this.fileList = fileList;
      this.uillUpdateImg = false;
    },
  },
};
</script>

<style>
</style>