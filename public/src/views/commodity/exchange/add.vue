<template>
  <div class="user-list">
    <!-- 添加按钮 -->
    <p class="table_title">添加兑换商品</p>
    <!-- 搜索列表 -->
    <div class="addExchange">
      <!-- 编辑用户信息列表 -->
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        style="padding:0px 15px"
        ref="addForm"
        :model="addForm"
        :rules="rules"
        :index="index"
      >
        <p class="form_title">商品信息</p>
        <div style="display:flex">
          <div style="width:500px;">
            <el-form-item prop="firstPicture" label="商品轮播展示：上传商品图片(请保证上传的图片宽高比一致)">
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
                <img v-if="addForm.picture" :src="pictures" class="avatar" />
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
        <!-- 动态增加项目 -->
        <!-- 不止一个项目，用div包裹起来 -->
        <el-button @click="addItem" type="primary">添加规格</el-button>
        <div
          class="attrBox"
          style="width:100%;display:flex"
          v-for="(item, index) in addForm.sysgoodslist"
          :key="index"
        >
          <el-form-item
            label="商品规格"
            :prop="'sysgoodslist.' + index + '.param'"
            :rules="{
            required: true, message: '商品规格不能为空', trigger: 'blur'
        }"
          >
            <el-input v-model="item.param" style="width:300px;margin-left:0px;margin-right:10px"></el-input>
          </el-form-item>
          <el-form-item
            label="商品售价"
            :prop="'sysgoodslist.' + index + '.price'"
            :rules="[
             {required: true, message: '商品售价不能为空', trigger: 'blur'},
          ]"
          >
            <el-input v-model="item.price" style="width:100px;margin-right:10px"></el-input>
          </el-form-item>
          <el-form-item
            label="积分售价"
            :prop="'sysgoodslist.' + index + '.integralPrice'"
            :rules="[
             {required: true, message: '积分售价不能为空', trigger: 'blur'},
          ]"
          >
            <el-input v-model="item.integralPrice" style="width:100px;margin-right:10px"></el-input>
          </el-form-item>
          <el-form-item
            label="成本价"
            :prop="'sysgoodslist.' + index + '.costPrice'"
            :rules="[
             {required: true, message: '成本价不能为空', trigger: 'blur'},
          ]"
          >
            <el-input v-model="item.costPrice" style="width:100px;margin-right:10px"></el-input>
          </el-form-item>
          <el-form-item
            label="库存"
            :prop="'sysgoodslist.' + index + '.amount'"
            :rules="[
             {required: true, message: '库存不能为空', trigger: 'blur'},
          ]"
          >
            <el-input v-model="item.amount" style="width:80px;margin-right:10px"></el-input>
          </el-form-item>
          <el-form-item
            label="图片"
            :prop="'sysgoodslist.' + index + '.price'"
            :rules="[
             {required: true, message: '图片不能为空', trigger: 'blur'},
          ]"
          >
            <el-upload
              class="avatar-uploader"
              action="http://res.chainmall.pro/img/saveImage/image"
              :on-success="handleimage"
              :show-file-list="false"
            >
              <img v-if="item.image!=''" :src="item.images" @click="getIndex(index)" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon" @click="getIndex(index)"></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button @click="deleteItem(item, index)" style="margin-left:10px" type="primary">删除</el-button>
          </el-form-item>
        </div>
        <p class="form_title">商品设置资料</p>
        <div style="padding-left:50px">
          <el-form-item label="商品分类：" prop="goodsClass">
            <el-select v-model="value" placeholder="请选择">
              <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="可用积分：" prop="integrals">
            <el-select v-model="value1" @change="a" multiple placeholder="请选择">
              <el-option
                v-for="item in option_int"
                :key="item.id"
                :label="item.coinName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择默认积分:" prop="defaultIntegralId">
            <el-select v-model="addForm.defaultIntegralId" placeholder="请选择">
              <el-option
                v-for="item in option_default"
                :key="item.id"
                :label="item.coinName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="销量：" prop="sellAmt">
            <el-input v-model="addForm.sellAmt" style="width:200px;margin-right:10px "></el-input>修改商品销量
          </el-form-item>
          <el-form-item label="是否推荐：">
            <el-radio-group v-model="addForm.isRecommend">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="商品详情：">
            <tinymce ref="editor" v-model="addForm.detailPicture" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" :disabled="isDisabled" @click="subChange('addForm')">立即提交</el-button>
            <el-button style="margin-left:160px" @click="resetForm('addForm')">重置</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { TimeSelect } from "element-ui";
import tinymce from "../../../components/tinymce/tinymce";
import {
  addShopClass,
  getGoodsClass,
  findAllIntegrals,
  addGoods,
} from "../../../network/commodity";
export default {
  components: { tinymce },
  data() {
    return {
      pictures: "",
      options: null,
      option_int: [],
      option_default: [],
      value1: [],
      value: "",
      addForm: {
        sysgoodslist: [
          {
            param: "默认规格",
            price: "",
            integralPrice: "",
            costPrice: "",
            amount: "",
            image: "",
            images: "",
          },
        ],
        goodsClass: "",
        integrals: "",
        sellAmt: "0",
        defaultIntegralId: "",
        firstPicture: "",
        picture: "",
        name: "",
        describe: "",
        sort: "",
        freight: "",
        isRecommend: "1",
        detailPicture: "",
        status: 1,
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
        integrals: [{ required: true, message: "必填项不能为空" }],
        defaultIntegralId: [{ required: true, message: "必填项不能为空" }],
        goodsClass: [{ required: true, message: "必填项不能为空" }],
      },
      labelPosition: "top",
      index: "",
    };
  },
  watch: {
    value() {
      let goodsClass = "|";
      goodsClass += this.value;
      goodsClass += "|";
      this.addForm.goodsClass = goodsClass;
    },
  },
  methods: {
    a(value) {
      console.log(value);
      let integrals = "|";
      for (let itemss in value) {
        integrals += value[itemss];
        integrals += "|";
      }
      this.addForm.integrals = integrals;
      console.log(integrals);
      let objs = [];

      for (let item of value) {
        for (let items of this.option_int) {
          if (item == items.id) {
            console.log(items);
            objs.push(items);
          }
        }
      }
      this.option_default = objs;
    },
    addItem() {
      this.addForm.sysgoodslist.push({
        param: "默认规格",
        price: "",
        integralPrice: "",
        costPrice: "",
        amount: "",
        image: "",
      });
    },
    deleteItem(item, index) {
      this.addForm.sysgoodslist.splice(index, 1);
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
      this.addForm.sysgoodslist[this.index].images =
        "http://res.chainmall.pro/" + res.data;
      this.addForm.sysgoodslist[this.index].image = res.data;
      console.log(this.addForm.sysgoodslist);
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
          let goodsClass = "|";
          goodsClass += this.value;
          goodsClass += "|";
          console.log(goodsClass);
          // this.addForm.sysgoodslist = JSON.stringify(this.addForm.sysgoodslist);
          let list = JSON.stringify(this.addForm.sysgoodslist);
          let obj = this.$qs.stringify({
            sysgoodslist: list,
            goodsClass: this.addForm.goodsClass,
            integrals: this.addForm.integrals,
            sellAmt: "0",
            defaultIntegralId: this.addForm.defaultIntegralId,
            firstPicture: this.addForm.firstPicture,
            picture: this.addForm.picture,
            name: this.addForm.name,
            describe: this.addForm.describe,
            sort: this.addForm.sort,
            freight: this.addForm.freight,
            isRecommend: "1",
            detailPicture: this.addForm.detailPicture,
            status: 1,
            tag: "",
          });
          addGoods(obj).then((res) => {
            console.log(res);
            if (res.code == 0) {
              this.$message({
                type: "success",
                message: res.msg,
              });
              this.$router.push({ path: "/commodity/exchange" });
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
    let obj = {};
    getGoodsClass(obj).then((res) => {
      console.log(res);
      this.options = res.data;
    });
    findAllIntegrals(obj).then((res) => {
      console.log(res);
      this.option_int = res.data;
    });
  },
  mounted() {},
};
</script>
<style lang="less">
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
