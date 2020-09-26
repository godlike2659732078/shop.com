<template>
  <div class="user-list">
    <!-- 添加按钮 -->
    <p class="table_title">添加产品</p>
    <!-- 搜索列表 -->
    <div class="addExchange">
      <!-- 编辑用户信息列表 -->
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        style="padding: 0px 15px"
        ref="addForm"
        :model="addForm"
        :rules="rules"
        :index="index"
      >
        <p class="form_title">商品信息</p>
        <div style="display: flex">
          <div style="width: 500px">
            <el-form-item
              prop="firstPicture"
              label="商品轮播展示：上传商品图片(请保证上传的图片宽高比一致)"
            >
              <el-upload
                action="http://res.chainmall.pro/img/saveImage/image"
                :file-list="fileList"
                list-type="picture-card"
                :on-remove="handleRemove"
                :on-success="success"
                :index="index"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          </div>
          <div style="width: 50%">
            <el-form-item label="缩略图：" prop="picture">
              <el-upload
                class="avatar-uploader"
                action="http://res.chainmall.pro/img/saveImage/image"
                :on-success="handlephoto"
                :show-file-list="false"
              >
                <img v-if="addForm.picture" :src="pictures" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="商品名称：" prop="name">
              <el-input
                v-model="addForm.name"
                style="width: 500px; margin-right: 10px"
                placeholder="请输入商品名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="商家名称" prop="shopId">
              <el-select v-model="addForm.shopId" placeholder="请选择">
                <el-option
                  v-for="item in options_shopName"
                  :key="item.sId"
                  :label="item.name"
                  :value="item.sId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="排序：" prop="sort">
              <el-input
                v-model="addForm.sort"
                style="width: 200px; margin-right: 10px"
              ></el-input>
            </el-form-item>
            <el-form-item label="邮费：" prop="freight">
              <el-input
                v-model="addForm.freight"
                style="width: 200px; margin-right: 10px"
                placeholder="请输入分类名称"
              ></el-input
              >元(用户需支付快递费用)
            </el-form-item>
            <el-form-item label="商品描述：" prop="describe">
              <el-input
                v-model="addForm.describe"
                style="width: 400px; margin-right: 10px"
                placeholder="请输入商品描述"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <p class="form_title">商品价格及规格</p>
        <!-- 动态增加项目 -->
        <!-- 不止一个项目，用div包裹起来 -->
        <div
          class="attrBox"
          style="width: 100%; display: flex"
          v-for="(item, index) in addForm.chainShopGoodsSpecificationsLst"
          :key="index"
        >
          <el-form-item
            label="商品规格"
            :prop="'chainShopGoodsSpecificationsLst.' + index + '.param'"
            :rules="{
              required: true,
              message: '商品规格不能为空',
              trigger: 'blur',
            }"
          >
            <el-input
              v-model="item.param"
              style="width: 300px; margin-left: 0px; margin-right: 10px"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="商品售价"
            :prop="'chainShopGoodsSpecificationsLst.' + index + '.price'"
            :rules="[
              { required: true, message: '商品售价不能为空', trigger: 'blur' },
            ]"
          >
            <el-input
              v-model="item.price"
              style="width: 100px; margin-right: 10px"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="奖励积分"
            :prop="'chainShopGoodsSpecificationsLst.' + index + '.integrals'"
            :rules="[
              { required: true, message: '奖励积分不能为空', trigger: 'blur' },
            ]"
          >
            <el-input
              v-model="item.integrals"
              style="width: 100px; margin-right: 10px"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="库存"
            :prop="'chainShopGoodsSpecificationsLst.' + index + '.amount'"
            :rules="[
              { required: true, message: '库存不能为空', trigger: 'blur' },
            ]"
          >
            <el-input
              v-model="item.amount"
              style="width: 80px; margin-right: 10px"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="图片"
            :prop="'chainShopGoodsSpecificationsLst.' + index + '.price'"
            :rules="[
              { required: true, message: '图片不能为空', trigger: 'blur' },
            ]"
          >
            <el-upload
              class="avatar-uploader"
              action="http://res.chainmall.pro/img/saveImage/image"
              :on-success="handleimage"
              :show-file-list="false"
            >
              <img
                v-if="item.images != ''"
                :src="item.images"
                @click="getIndex(index)"
                class="avatar"
              />
              <i
                v-else
                class="el-icon-plus avatar-uploader-icon"
                @click="getIndex(index)"
              ></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button
              @click="deleteItem(item, index)"
              style="margin-left: 10px"
              type="primary"
              >删除</el-button
            >
          </el-form-item>
        </div>
        <el-button @click="addItem" type="primary">添加规格</el-button>
        <p class="form_title">商品设置资料</p>
        <div style="padding-left: 50px">
          <el-form-item label="是否上架：">
            <el-radio-group v-model="addForm.isOnline">
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
          <el-form-item label="参与返佣：">
            <el-radio-group v-model="addForm.isDistribution">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <div style="display: flex" v-if="addForm.isDistribution == 1">
            <el-form-item prop="firstProportion">
              一级返佣：
              <el-input
                v-model="addForm.firstProportion"
                style="width: 200px; margin-right: 10px; margin-bottom: 10px"
                placeholder="请输入 0~100 纯数字"
                autocomplete="off"
              ></el-input>
              <span style="color: #aaa; margin-right: 20px">% </span>
            </el-form-item>
            <el-form-item prop="secondProportion">
              二级返佣：
              <el-input
                v-model="addForm.secondProportion"
                style="width: 200px; margin-right: 10px; margin-bottom: 10px"
                placeholder="请输入 0~100 纯数字"
                autocomplete="off"
              ></el-input>
              <span style="color: #aaa; margin-right: 20px">% </span>
            </el-form-item>
          </div>
          <el-form-item label="销量：" prop="sellAmt">
            <el-input
              placeholder="请输入纯数字"
              v-model="addForm.sellAmt"
              style="width: 200px; margin-right: 10px"
            ></el-input
            >修改商品销量
          </el-form-item>
          <el-form-item label="商品分类：" prop="goodsClass">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品标签" prop="tag">
            <el-select
              v-model="value1"
              @change="a"
              multiple
              placeholder="请选择"
            >
              <el-option
                v-for="item in option_int"
                :key="item.id"
                :label="item.title"
                :value="item.title"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品详情：">
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
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { TimeSelect } from "element-ui";

import { quillEditor } from "vue-quill-editor";
import {
  getOneShopGoods,
  findAllShops,
  addShopClass,
  getmerClass,
  taxonomy,
  editShopGoods,
} from "../../../network/commodity";
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
      fileList: [],
      pictures: "",
      options_shopName: [],
      options: null,
      option_int: [],
      option_default: [],
      value1: [],
      value: "",
      value_shop: "",
      addForm: {
        chainShopGoodsSpecificationsLst: [
          {
            param: "默认规格",
            price: "",
            integrals: "",
            amount: "",
            image: "",
            images: "",
          },
        ],
        shopId: "",
        goodsClass: "",
        sellAmt: "0",

        firstPicture: "",
        picture: "",
        name: "",
        describe: "",
        sort: "",
        freight: "",
        isRecommend: "1",
        isOnline: "1",
        isDistribution: "1",
        firstProportion: "",
        secondProportion: "",
        content: "",
        tag: "",
      },
      getImage: "",
      isDisabled: false,
      rules: {
        name: [{ required: true, message: "名称不能为空" }],
        sort: [{ required: true, message: "排序不能为空" }],
        describe: [{ required: true, message: "必填项不能为空" }],
        freight: [{ required: true, message: "必填项不能为空" }],
        sellAmt: [{ required: true, message: "必填项不能为空" }],
        tag: [{ required: true, message: "必填项不能为空" }],
        shopId: [{ required: true, message: "必填项不能为空" }],
        goodsClass: [{ required: true, message: "必填项不能为空" }],
      },
      labelPosition: "top",
      index: "",
    };
  },
  watch: {
    value() {
      console.log(this.value)
      let num = "";
      for (let item of this.options) {
        if (item.id == this.value) {
          num = item.id;
         
        }
      }
      let goodsClass_ = "|";
      goodsClass_ += num;
      goodsClass_ += "|";
      this.addForm.goodsClass = goodsClass_;
      console.log(this.addForm.goodsClass)
    },
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
    submit() {
      console.log(this.value_editor);
    },
    a(value) {
      this.addForm.tag = this.value1.toString();
    },
    addItem() {
      this.addForm.chainShopGoodsSpecificationsLst.push({
        param: "默认规格",
        price: "",
        integrals: "",
        amount: "",
        image: "",
        images: "",
      });
    },
    deleteItem(item, index) {
      this.addForm.chainShopGoodsSpecificationsLst.splice(index, 1);
    },
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
    // 商品缩略图上传
    handlephoto(res, file) {
      console.log(res);
      this.pictures = "http://res.chainmall.pro/" + res.data;
      this.addForm.picture = res.data;
      let path = res.data;
      let obj = {
        path: path,
      };
    },
    getIndex(index) {
      this.index = index;
    },
    // 商品图片上传
    handleimage(res, file) {
      this.addForm.chainShopGoodsSpecificationsLst[this.index].images =
        "http://res.chainmall.pro/" + res.data;
      console.log(this.addForm.chainShopGoodsSpecificationsLst);
    },
    subChange(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.addForm.picture == "") {
            this.$message.error("商品缩略图不能为空！");
            return false;
          }
          if (this.addForm.firstPicture == "") {
            this.$message.error("商品轮播图不能为空！");
            return false;
          }
          // this.addForm.chainShopGoodsSpecificationsLst = JSON.stringify(this.addForm.chainShopGoodsSpecificationsLst);
          let list = JSON.stringify(
            this.addForm.chainShopGoodsSpecificationsLst
          );
          let isRecommend = parseInt(this.addForm.isRecommend);
          let isOnline = parseInt(this.addForm.isOnline);
          let isDistribution = parseInt(this.addForm.isDistribution);
          let a = {
             shopId: this.addForm.shopId,
            chainShopGoodsSpecificationsLst: list,
            goodsClass: this.addForm.goodsClass,
            integrals: this.addForm.integrals,
            sellAmt: this.addForm.sellAmt,
            firstPicture: this.addForm.firstPicture,
            picture: this.addForm.picture,
            name: this.addForm.name,
            describe: this.addForm.describe,
            sort: this.addForm.sort,
            freight: this.addForm.freight,
            isRecommend: isRecommend,
            isOnline: isOnline,
            isDistribution: isDistribution,
            firstProportion: this.addForm.firstProportion,
            secondProportion: this.addForm.secondProportion,
            content: this.value_editor,
            tag: this.addForm.tag,
          }
          console.log(a);
          let obj = this.$qs.stringify({
            shopId: this.addForm.shopId,
            goodslist: list,
            goodsClass: this.addForm.goodsClass,
            integrals: this.addForm.integrals,
            sellAmt: this.addForm.sellAmt,
            firstPicture: this.addForm.firstPicture,
            picture: this.addForm.picture,
            name: this.addForm.name,
            describe: this.addForm.describe,
            sort: this.addForm.sort,
            freight: this.addForm.freight,
            isRecommend: isRecommend,
            isOnline: isOnline,
            isDistribution: isDistribution,
            firstProportion: this.addForm.firstProportion,
            secondProportion: this.addForm.secondProportion,
            content: this.value_editor,
            tag: this.addForm.tag,
            id:this.$route.query.goodsId
          });
          editShopGoods(obj).then((res) => {
            console.log(res);
            if (res.code == 0) {
              this.$message({
                type: "success",
                message: res.msg,
              });
              this.$router.push({ path: "/commodity/merchant" });
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
    let obj_shopGoods = {
      goodsId: this.$route.query.goodsId,
    };
    getOneShopGoods(obj_shopGoods).then((res) => {
      console.log(res);

      this.addForm = res.data;
      this.value_editor=res.data.content
      let firstPicture = res.data.firstPicture;
      firstPicture = firstPicture.split(",");
      console.log(firstPicture);
      let pictures_ = [];
      for (let item of firstPicture) {
        item = { url: "http://res.chainmall.pro/" + item };
        pictures_.push(item);
      }
      console.log(pictures_);
      this.fileList = pictures_;
      this.pictures = res.data.picture;
      this.addForm.isRecommend = res.data.isRecommend.toString();
      this.addForm.isOnline = res.data.isOnline.toString();
      this.addForm.isDistribution = res.data.isDistribution.toString();
      let goodsClass = res.data.goodsClass;
      goodsClass = goodsClass.split("|");
      console.log(goodsClass);
      for (let item of this.options) {
        if (goodsClass[1] == item.id) {
          this.value = item.name;
        }
      }
      let tag = res.data.tag;
      tag = tag.split(",");
      console.log(tag);
      this.value1 = tag;
      let arrItem = "";
      let arr = [];
      for (let item of tag) {
        if (item != "") {
          arrItem = item;
          console.log(arrItem);
          arr.push(arrItem);
        }
      }
      this.value1 = arr;
    });
    let obj = {};
    findAllShops(obj).then((res) => {
      console.log(res);
      this.options_shopName = res.data;
    });
    getmerClass(obj).then((res) => {
      console.log(res);
      this.options = res.data;
    });
    taxonomy(obj).then((res) => {
      console.log(res);
      this.option_int = res.data;
    });
  },
  mounted() {},
};
</script>
<style lang="less">
.ivu-upload {
  display: none;
}
.attrBox {
  align-items: center;
  .avatar {
    width: 38px;
    height: 38px;
    display: block;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 38px;
    height: 38px;
    line-height: 100px;
  }
}
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
    width: 100px;
    height: auto;
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
