<template>
  <div class="user-list">
    <!-- 添加按钮 -->
    <p class="table_title">添加CMT商家</p>
    <!-- 搜索列表 -->
    <div class="userList_content">
      <!-- 编辑用户信息列表 -->
      <el-form
        :label-position="labelPosition"
        label-width="100px"
        style="padding:0px 60px"
        ref="editForm"
        :model="editForm"
        :rules="rules"
        :index="index"
      >
        <el-form-item label="商家名称：" prop="name">
          <el-input
            v-model="editForm.name"
            style="width:400px;margin-right:10px "
            placeholder="请输入商家名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系电话：" prop="phone">
          <el-input
            v-model="editForm.phone"
            style="width:200px;margin-right:10px "
            placeholder="请输入联系电话"
          ></el-input>
        </el-form-item>

        <el-form-item label="商家头像" required>
          <el-upload
            class="avatar-uploader"
            action="http://res.chainmall.pro/img/saveImage/image"
            :show-file-list="false"
            :on-success="handlephoto"
          >
            <img v-if="editForm.photo" :src="editForm.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="展示图1">
          <el-upload
            class="avatar-uploader"
            action="http://res.chainmall.pro/img/saveImage/image"
            :show-file-list="false"
            :on-success="handlephotoOne"
          >
            <img v-if="editForm.photoOne" :src="editForm.photoOne" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="展示图2">
          <el-upload
            class="avatar-uploader"
            action="http://res.chainmall.pro/img/saveImage/image"
            :show-file-list="false"
            :on-success="handlephotoTwo"
          >
            <img v-if="editForm.photoTwo" :src="editForm.photoTwo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="展示图3">
          <el-upload
            class="avatar-uploader"
            action="http://res.chainmall.pro/img/saveImage/image"
            :show-file-list="false"
            :on-success="handlephotoThree"
          >
            <img v-if="editForm.photoThree" :src="editForm.photoThree" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="所在城市" prop="city">
          <el-input
            v-model="editForm.city"
            style="width:200px;margin-right:10px "
            placeholder="请输入所在城市"
          ></el-input>
        </el-form-item>
        <el-form-item label="商家地址：" prop="address">
          <el-input
            v-model="editForm.address"
            type="textarea"
            style="width:400px;margin-right:10px "
            placeholder="请输入商家地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="商家坐标：" prop="coordinates">
          <el-input
            v-model="editForm.coordinates"
            style="width:300px;margin-right:10px "
            placeholder="请输入商家坐标"
            disabled
          ></el-input>
          <el-button type="primary" size="small" @click="chooseMap(editForm.id)">地图上选择</el-button>
        </el-form-item>
        <el-form-item label="内容：">
          <tinymce ref="editor" v-model="editForm.particulars" @onClick="onClick" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="subChange('editForm',editForm.id)">立即提交</el-button>
          <el-button style="margin-left:160px" @click="resetForm('editForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 备注信息弹窗 -->
      <el-dialog width="600px" style="height:800px" title="选择地点" :visible.sync="showMap">
        <div id="allMap"></div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { TimeSelect } from "element-ui";
import tinymce from "../../../components/tinymce/tinymce";
import { addCmtShop } from "../../../network/merchant";
export default {
  components: { tinymce },
  data() {
    return {
      defaultMsg: "", // 富文本默认提示信息
      showMap: false,
      editForm: {
        name: "",
        phone: "",
        photo: "",
        photoOne: "",
        photoTwo: "",
        photoThree: "",
        city: "",
        address: "",
        coordinates: "",
        name: "",
        particulars: "",
      },
      rules: {
        name: [{ required: true, message: "商家名称不能为空" }],
        phone: [{ required: true, message: "必填项不能为空" }],
        city: [{ required: true, message: "必填项不能为空" }],
        address: [{ required: true, message: "必填项不能为空" }],
        coordinates: [{ required: true, message: "必填项不能为空" }],
      },
      labelPosition: "left",
      index: "",
    };
  },

  methods: {
    onClick() {
      console.log(this.editForm.particulars);
    },
    // 上传商家头像
    handlephoto(res, file) {
      this.editForm.photo = "http://res.chainmall.pro/" + res.data;
      console.log(res);
      console.log(file);
    },
    handlephotoOne(res, file) {
      this.editForm.photoOne = "http://res.chainmall.pro/" + res.data;
      console.log(res);
      console.log(file);
    },
    handlephotoTwo(res, file) {
      this.editForm.photoTwo = "http://res.chainmall.pro/" + res.data;
      console.log(res);
      console.log(file);
    },
    handlephotoThree(res, file) {
      this.editForm.photoThree = "http://res.chainmall.pro/" + res.data;
      console.log(res);
      console.log(file);
    },
    chooseMap() {
      // if (this.editForm.address != "") {
      let offa = this.editForm.address;
      if (offa != "") {
        this.showMap = true;
        setTimeout(() => {
          let map = new BMap.Map("allMap"); // 创建Map实例
          let a = this.editForm;
          // 百度地图API功能
          map.centerAndZoom(new BMap.Point(112.460321, 34.623307), 15); // 初始化地图,设置中心点坐标和地图级别
          //添加地图类型控件
          //单击获取点击的经纬度
          map.addEventListener("click", function (e) {
            a.coordinates = e.point.lng + "," + e.point.lat;
            map.clearOverlays();
            // alert(e.point.lng + "," + e.point.lat);
            let x_pi = (3.14159265358979324 * 3000.0) / 180.0;
            let x = e.point.lng - 0.0065;
            let y = e.point.lat - 0.006;
            let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
            let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
            let lngs = z * Math.cos(theta);
            let lats = z * Math.sin(theta);
            let point = new BMap.Point(e.point.lng, e.point.lat);
            let marker = new BMap.Marker(point); // 创建标注
            map.addOverlay(marker);
            // $('input[name="coordinates"]').val(e.point.lng + "," + e.point.lat);
          });
          map.addControl(
            new BMap.MapTypeControl({
              mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP],
            })
          );
          map.setCurrentCity("洛阳"); // 设置地图显示的城市 此项是必须设置的
          map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

          var size = new BMap.Size(10, 20);
          map.addControl(
            new BMap.CityListControl({
              anchor: BMAP_ANCHOR_TOP_LEFT,
              offset: size,
            })
          );

          let local = new BMap.LocalSearch(map, {
            renderOptions: { map: map },
          });
          local.search(offa);
        }, 500);
      } else {
        this.$message.error("请输入地址");
      }

      // }
    },
    subChange(formName, res) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!/^1[3|4|5|7|8][0-9]\d{8}$/.test(parseInt(this.editForm.phone))) {
            this.$message.error("请输入正确手机号！")
            return false;
          }
          if (this.editForm.photo == "") {
            this.$message.error("请上传商家头像缩略图！");
            return false;
          }
          this.editForm.photo = this.editForm.photo.slice(25);
          this.editForm.photoOne = this.editForm.photoOne.slice(25);
          this.editForm.photoTwo = this.editForm.photoTwo.slice(25);
          this.editForm.photoThree = this.editForm.photoThree.slice(25);
          let obj = this.$qs.stringify(this.editForm);
          addCmtShop(obj).then((res) => {
            console.log(res);
            if (res.code == 0) {
              this.$message({
                type: "success",
                message: res.msg,
              });
              this.$router.push({ path: "/merchant/cmtShop" });
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
    gotoCredits(res) {
      // this.$router.push({ path: "/credits", query: { uId: res.uId } });
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
.userList_content {
  padding: 15px;
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
