<template>
  <div class="user-list">
    <!-- 添加按钮 -->
    <p class="table_title">用户认证</p>
    <!-- 搜索列表 -->
    <div class="userList_content">
      <div class="userserch_block">
        用户名：
        <el-input style="width:182px;margin-right:10px" v-model="username" clearable></el-input>手机号：
        <el-input style="width:182px;margin-right:10px" v-model="phone" clearable></el-input>创建时间：
        <el-date-picker
          style="width:300px;margin-right:10px"
          v-model="user_addTime"
          type="daterange"
          value-format="yyyy-MM-dd"
        ></el-date-picker>

        <el-button type="primary" size="small" @click="serchData">搜索</el-button>
      </div>
      <!-- 用户信息列表 -->
      <div class="userList">
        <div class="check_head"></div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width:100% overflow:scroll"
          class="userList_table"
        >
          <el-table-column align="center" label="头像" width="80">
            <!--加入下面的内容,scope.row代表这一行,img是显示这一行的哪个字段,我的是img,你的自己看下-->
            <template slot-scope="scope" class="headImage">
              <img
                v-if="scope.row.headImage"
                :src="scope.row.headImage"
                style="margin-left:10px;display:block;width:30px;height:40px"
                alt
              />
              <img
                v-else
                src="http://res.chainmall.pro/card/2019/03/06/3f13e76272621b39f0fa920d195c57642019-03-06-14-22-46.png"
                style=" margin-left:10px;display:block;width:30px;height:30px"
                alt
              />
            </template>
          </el-table-column>
          <el-table-column align="left" prop="nickName" label="用户名" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column align="center" label="操作" fixed="right" width="240">
            <template slot-scope="scope">
              <el-button
                type="warning"
                size="mini"
                style="background-color:#009688;border:none;border-radius:2px;margin-right:10px"
                icon="el-icon-edit"
                @click="check_detail(scope.row)"
              >详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="pages"
        ></el-pagination>
      </div>

      <!-- 编辑用户信息列表 -->
      <el-dialog width="800px" title="用户信息" class="checkTable" :visible.sync="edit">
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          :model="editForm"
          :index="index"
        >
          <el-form-item label="姓名">
            <el-input v-model="editForm.realName" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="身份证">
            <el-input v-model="editForm.cardCode" placeholder="请输入用户身份证号"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio v-model="editForm.sex" label="男">男</el-radio>
            <el-radio v-model="editForm.sex" label="女">女</el-radio>
          </el-form-item>
          <el-form-item label>
            <div class="showSelf">
              <p>身份证正面</p>
              <p v-if="editForm.image1==''||editForm.image1==null"></p>
              <img v-else :src="editForm.image1" alt />
              <p>身份证背面</p>
              <p v-if="editForm.image2==''||editForm.image2==null"></p>
              <img v-else :src="editForm.image2" alt />
            </div>
          </el-form-item>
          <el-form-item label="登陆密码">
            <el-input type="password" v-model="editForm.password" placeholder="请输入登陆密码"></el-input>
          </el-form-item>
          <el-form-item label="资金密码">
            <el-input type="password" v-model="editForm.uPassword" placeholder="请输入资金密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="subChange(editForm.uId)">认证通过</el-button>
            <el-button style="margin-left:160px" @click="loseApply">认证驳回</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 备注信息弹窗 -->
      <el-dialog
        width="500px"
        style="height:500px"
        title="认证驳回"
        class="checkTable"
        :visible.sync="lose"
      >
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          :model="editForm"
          :index="index"
        >
          <el-form-item label="驳回原因">
            <el-input type="textarea" v-model="authNotReason" :rows="3" placeholder="请输入驳回原因"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="subLose(editForm.uId)">确认</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { TimeSelect } from "element-ui";
import { getCheck, passReal } from "../../../network/userControl";
export default {
  components: {},
  data() {
    return {
      username: "",
      phone: "",
      user_addTime: "",
      tableData: [],
      currentPage4: 1,
      pages: null,
      multipleSelection: [],
      page: 1,
      limit: 10,
      editForm: {
        realName: "",
        cardCode: "",
        sex: null,
        image1: "",
        image2: "",
        image3: "",
        image4: "",
      },
      authNotReason: "",
      labelPosition: "left",
      edit: false,
      lose: false,
      index: "",
    };
  },
  watch: {
    page() {
      let user_addTime = this.user_addTime;
      if (user_addTime != "" && user_addTime != null) {
        user_addTime[0] = user_addTime[0] + " 00:00:00";
        user_addTime[1] = user_addTime[1] + " 23:59:59";
      } else {
        user_addTime = ["", ""];
      }
      let obj = {
        phone: this.phone,
        uname: this.username,
        startTime: user_addTime[0],
        endTime: user_addTime[1],
        isAuth: 1,
        page: this.page,
        limit: this.limit,
      };
      console.log(obj);
      getCheck(obj).then((res) => {
        console.log(res);
        this.tableData = res.data;
        this.pages = res.count;
        this.page = 1;
      });
    },
    limit() {
      let user_addTime = this.user_addTime;
      if (user_addTime != "" && user_addTime != null) {
        user_addTime[0] = user_addTime[0] + " 00:00:00";
        user_addTime[1] = user_addTime[1] + " 23:59:59";
      } else {
        user_addTime = ["", ""];
      }
      let obj = {
        phone: this.phone,
        uname: this.username,
        startTime: user_addTime[0],
        endTime: user_addTime[1],
        isAuth: 1,
        page: this.page,
        limit: this.limit,
      };
      console.log(obj);
      getCheck(obj).then((res) => {
        console.log(res);
        this.tableData = res.data;
        this.pages = res.count;
        this.page = 1;
      });
    },
  },
  methods: {
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    // 头部搜索
    serchData() {
      let user_addTime = this.user_addTime;
      if (user_addTime != "" && user_addTime != null) {
        user_addTime[0] = user_addTime[0] + " 00:00:00";
        user_addTime[1] = user_addTime[1] + " 23:59:59";
      } else {
        user_addTime = ["", ""];
      }
      let obj = {
        phone: this.phone,
        uname: this.username,
        startTime: user_addTime[0],
        endTime: user_addTime[1],
        isAuth: 1,
      };
      console.log(obj);
      getCheck(obj).then((res) => {
        console.log(res);
        this.tableData = res.data;
        this.pages = res.count;
        this.page = 1;
      });
    },

    // 点击编辑事件
    check_detail(res) {
      this.edit = true;
      console.log(res);
      let obj = {
        uId: res.uId,
        isAuth: 1,
      };
      console.log(obj);
      getCheck(obj).then((res) => {
        console.log(res);
        (this.editForm.realName = res.data[0].realName),
          (this.editForm.cardCode = res.data[0].cardCode);
        this.editForm.uId = res.data[0].uId;
        this.editForm.sex = res.data[0].sex;
        this.editForm.image1 = res.data[0].image1;
        this.editForm.image2 = res.data[0].image2;
        this.editForm.image3 = res.data[0].image3;
        this.editForm.image4 = res.data[0].image4;
        console.log(this.editForm);
      });
    },

    // 认证通过
    subChange(res) {
      console.log(res);
      let obj = this.$qs.stringify({
        uId: res,
        isAuth: 3,
      });
      console.log(obj);
      passReal(obj).then((res) => {
        console.log(res);
        if (res.code == 0) {
          this.edit = false;
          this.$message({
            type: "success",
            message: res.msg,
          });
          this.serchData();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 认证驳回
    loseApply(res) {
      this.lose = true;
      console.log(res);
    },
    subLose(res) {
      console.log(res);
      let obj = this.$qs.stringify({
        uId: res,
        isAuth: 2,
        authNotReason: this.authNotReason,
      });
      console.log(obj);
      passReal(obj).then((res) => {
        console.log(res);
        if (res.code == 0) {
          this.lose = false;
          this.$message({
            type: "success",
            message: res.msg,
          });
          this.serchData();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 页面数量
    handleSizeChange(val) {
      this.limit = 10;
      this.limit = val;
    },
    handleCurrentChange(val) {
      this.page = val;
    },
    gotoCredits(res) {
      this.$router.push({ path: "/credits", query: { uId: res.uId } });
    },
  },

  created() {
    let obj = {
      page: this.page,
      limit: this.limit,
      isAuth: 1,
    };
    getCheck(obj).then((res) => {
      console.log(res);
      this.tableData = res.data;
      this.pages = res.count;
    });
  },
  mounted() {},
};
</script>
<style lang="less">
.user-list {
  background: #fff;
}
.table_title {
  display: block;
  font-size: 14px;
  height: 43px;
  line-height: 43px;
  padding: 0px 15px;
}
.userList_content {
  width: 100%;
  height: auto;
  padding: 15px;
  box-sizing: border-box;
}
.userList {
  background-color: #f2f2f2;
  border: 1px solid #e6e6e6;
  width: 100%;
  margin-top: 10px;
}
.cell {
  margin: 5px 0px;
}
.check_head {
  height: 50px;
  border-bottom: 1px solid #ebeef5;
}
.userList_table {
  th {
    padding: 0 !important; //必须加important，不然覆盖优先级不够高
    height: auto; //你需要设置的高度
    line-height: 50px;
  }
  td {
    padding: 0 !important;
    height: auto;
    line-height: 50px;
  }
}
.el-button--mini,
.el-button--mini.is-round {
  padding: 5px 5px;
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
.checkTable {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: Center;
  overflow: hidden;
  .el-dialog {
    margin: 20 auto !important;
    height: 60%;
    overflow: hidden;
    .el-dialog__body {
      position: absolute;
      left: 0;
      top: 54px;
      bottom: 0;
      right: 0;
      padding: 0px 20px;
      z-index: 1;
      overflow: hidden;
      overflow-y: auto;
    }
  }
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
