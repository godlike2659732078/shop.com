<template>
  <div class="user-list">
    <!-- 添加按钮 -->
    <p class="table_title">优惠券</p>
    <!-- 搜索列表 -->
    <div class="addExchange">
      <!-- 编辑用户信息列表 -->
      <el-form
        :label-position="labelPosition"
        label-width="100px"
        style="padding: 0px 15px"
        ref="addForm"
        :model="addForm"
        :index="index"
        :rules="rules"
      >
        <p class="form_title">优惠券详情</p>
        <div style="padding-left: 50px">
          <el-form-item label="商家名称">
            <el-input
              disabled
              v-model="addForm.name"
              style="width: 200px; margin-right: 10px"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品名称">
            <el-input
              disabled
              v-model="goodsName"
              style="width: 200px; margin-right: 10px"
            ></el-input>
          </el-form-item>
          <el-form-item label="价格：" prop="price">
            <el-input
              v-model="addForm.price"
              style="width: 200px; margin-right: 10px"
            ></el-input>
          </el-form-item>
          <el-form-item label="过期天数：" prop="expirationDay">
            <el-input
              v-model="addForm.expirationDay"
              style="width: 200px; margin-right: 10px"
            ></el-input>
          </el-form-item>
          <el-form-item label="满多少金额：" prop="fullAmount">
            <el-input
              v-model="addForm.fullAmount"
              style="width: 200px; margin-right: 10px"
            ></el-input>
          </el-form-item>
          <el-form-item label="减多少金额：" prop="lowerAmount">
            <el-input
              v-model="addForm.lowerAmount"
              style="width: 200px; margin-right: 10px"
            ></el-input>
          </el-form-item>
          <el-form-item label="销量：" prop="sellAmt">
            <el-input
              v-model="addForm.sellAmt"
              style="width: 200px; margin-right: 10px"
            ></el-input>
          </el-form-item>
          <el-form-item label="库存：" prop="amount">
            <el-input
              v-model="addForm.amount"
              style="width: 200px; margin-right: 10px"
            ></el-input>
          </el-form-item>
          <el-form-item label="可用积分：">
            <el-select
              v-model="value1"
              @change="a"
              multiple
              placeholder="请选择"
            >
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

          <el-form-item label="是否上架：">
            <el-radio-group v-model="addForm.status">
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
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { TimeSelect } from "element-ui";
import tinymce from "../../../components/tinymce/tinymce";
import {
  updateShopCoupon,
  findShopCouponById,
  findAllIntegrals,
  getAllShopGoods,
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
      goodsName: "通用",
      addForm: {
        name: "",
        shopId: "",
        goodId: "",
        fullAmount: "",
        lowerAmount: "",
        amount: "",
        sellAmt: "",
        integralsId: "",
        defaultIntegralId: "",
        price: "",
        expirationDay: "",
        status: "",
      },
      getImage: "",
      isDisabled: false,
      rules: {
        price: [{ required: true, message: "名称不能为空" }],
        expirationDay: [{ required: true, message: "排序不能为空" }],
        fullAmount: [{ required: true, message: "必填项不能为空" }],
        lowerAmount: [{ required: true, message: "必填项不能为空" }],
        sellAmt: [{ required: true, message: "必填项不能为空" }],
        defaultIntegralId: [{ required: true, message: "必填项不能为空" }],
        amount: [{ required: true, message: "必填项不能为空" }],
      },
      labelPosition: "left",
      index: "",
    };
  },
  methods: {
    a(value) {
      //console.log(value);
      let integrals = "|";
      for (let itemss in value) {
        integrals += value[itemss];
        integrals += "|";
      }
      this.addForm.integralsId = integrals;
      //console.log(this.addForm.integralsId);
      let objs = [];

      for (let item of value) {
        for (let items of this.option_int) {
          if (item == items.id) {
            //console.log(items);
            objs.push(items);
          }
        }
      }
      this.option_default = objs;
    },
    subChange(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.addForm.integralsId == "") {
            this.$message.error("可用积分不能为空！");
            return false;
          }
          //console.log(this.addForm);
          let obj = this.$qs.stringify(this.addForm);
          updateShopCoupon(obj).then((res) => {
            //console.log(res);
            if (res.code == 0) {
              this.$message({
                type: "success",
                message: res.msg,
              });
              this.$router.push({ path: "/commodity/shopCoupon" });
            } else {
              this.$message.error(res.msg);
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
    let obj_id = {
      id: this.$route.query.id,
    };
    //console.log(obj_id);
    findShopCouponById(obj_id).then((res) => {
      let formData = res;

      if (res.data.shopId) {
        let obj_shopId = {
          shopId: res.data.shopId,
        };
        getAllShopGoods(obj_shopId).then((res) => {
          for (let item of res.data) {
            if (formData.data.goodId == item.id) {
              this.goodsName= item.name;
            }
          }
          if (formData.data.goodId) {
            this.addForm = {
              name: formData.data.name,
              shopId: formData.data.shopId,
              goodId: formData.data.goodId,
              fullAmount: formData.data.fullAmount,
              lowerAmount: formData.data.lowerAmount,
              amount: formData.data.amount,
              sellAmt: formData.data.sellAmt,
              defaultIntegralId: formData.data.defaultIntegralId,
              price: formData.data.price,
              expirationDay: formData.data.expirationDay,
              status: formData.data.status.toString(),
              id: this.$route.query.id,
            };
          } else {
            this.addForm = {
              name: formData.data.name,
              shopId: formData.data.shopId,
              goodId: "",
              fullAmount: formData.data.fullAmount,
              lowerAmount: formData.data.lowerAmount,
              amount: formData.data.amount,
              sellAmt: formData.data.sellAmt,
              defaultIntegralId: formData.data.defaultIntegralId,
              price: formData.data.price,
              expirationDay: formData.data.expirationDay,
              status: formData.data.status.toString(),
              id: this.$route.query.id,
            };
          }
        });
      } else {
        this.addForm = {
          name: res.data.name,
          shopId: "",
          goodId: "",
          fullAmount: res.data.fullAmount,
          lowerAmount: res.data.lowerAmount,
          amount: res.data.amount,
          sellAmt: res.data.sellAmt,
          defaultIntegralId: res.data.defaultIntegralId,
          price: res.data.price,
          expirationDay: res.data.expirationDay,
          status: res.data.status.toString(),
          id: this.$route.query.id,
        };
      }
      let integrals = res.data.integralsId;
      integrals = integrals.split("|");
      //console.log(integrals);
      this.value1 = integrals;
      let arrItem = "";
      let arr = [];
      for (let item of integrals) {
        if (item != "") {
          arrItem = Number(item);
          arr.push(arrItem);
        }
      }
      this.value1 = arr;
      let objs = [];
      for (let item of this.value1) {
        for (let items of this.option_int) {
          if (item == items.id) {
            //console.log(items);
            objs.push(items);
          }
        }
      }
      this.option_default = objs;
    });
    let obj = {};
    findAllIntegrals(obj).then((res) => {
      // //console.log(res);
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
