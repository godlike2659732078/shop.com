<template>
  <div class="tinymce-box">
    <editor v-model="myValue" :init="init" @onClick="onClick"></editor>
  </div>
</template>

<script>
import tinymce from "tinymce/tinymce"; //tinymce默认hidden，不引入不显示
import Editor from "@tinymce/tinymce-vue";

import "tinymce/themes/silver";
// 编辑器插件plugins
// 更多插件参考：https://www.tiny.cloud/docs/plugins/
import "tinymce/plugins/image"; // 插入上传图片插件
import "tinymce/plugins/media"; // 插入视频插件
import "tinymce/plugins/table"; // 插入表格插件
import "tinymce/plugins/lists"; // 列表插件
import "tinymce/plugins/wordcount"; // 字数统计插件
import "tinymce/icons/default";
export default {
  components: {
    Editor,
  },
  name: "tinymce",
  props: {
    value: {
      type: String,
      default: "",
    },

    plugins: {
      type: [String, Array],
      default: "lists image media table wordcount",
    },
    toolbar: {
      type: [String, Array],
      default:
        "undo redo |  formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat",
    },
  },
  data() {
    return {
      init: {
        paste_webkit_styles: true,
        paste_data_images: true, //  设置为允许粘帖图片
        images_upload_url: "/upload/file/tinymce", //  图片上传地址
        language_url: "/tinymce/langs/zh_CN.js",
        language: "zh_CN",
        skin_url: "/tinymce/skins/ui/oxide",
        // skin_url: 'tinymce/skins/ui/oxide-dark',//暗色系
        height: 600,
        plugins: this.plugins,
        toolbar: this.toolbar,
        branding: false,
        menubar: false,
        // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
        // 如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
        images_upload_handler: (blobInfo, success, failure) => {
          const img = "data:image/jpeg;base64," + blobInfo.base64();
          success(img);
          console.log(blobInfo)
           console.log(success)
            console.log(failure)
        },
      },
      myValue: this.value,
    };
  },
  mounted() {
     this.tinymceInit = {
        language: "zh_CN",
        height: 600,
        theme: "silver",
        browser_spellcheck: true, // 拼写检查
        branding: true, // 去水印
        // elementpath: false,  //禁用编辑器底部的状态栏
        statusbar: false, // 隐藏编辑器底部的状态栏
        paste_data_images: true, // 允许粘贴图像
        menubar: true, // 隐藏最上方menu
        fontsize_formats:
            "12px 13px 14px 15px 16px 17px 18px 20px 22px 24px 26px 30px 35px 40px 50px",
        plugins:
            "print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount  imagetools  contextmenu colorpicker textpattern help code",
        toolbar:
            "formatselect | bold italic strikethrough forecolor backcolor fontsizeselect | link image  | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat| code",
        paste_webkit_styles: true,
        paste_data_images: true,  //  设置为允许粘帖图片
        //    上传方式1：填写images_upload_url和images_upload_base_path
        images_upload_url: '/upload/file/tinymce', //  图片上传地址
        contextmenu: `inserttable | cell row column deletetable`,
        relative_urls: false,
        remove_script_host: false,
    };
    this.tinymceFlag++;
  },
  methods: {
    // 添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
    // 需要什么事件可以自己增加
    onClick(e) {
      this.$emit("onClick", e, tinymce);
    },
    // 可以添加一些自己的自定义事件，如清空内容
    clear() {
      this.myValue = "";
    },
  },
  watch: {
    value(newValue) {
      this.myValue = newValue;
    },
    myValue(newValue) {
      this.$emit("input", newValue);
    },
  },
};
</script>
<style scoped>
</style>