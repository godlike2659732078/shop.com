<template>
  <div class="user-list">
    <!-- 添加按钮 -->
    <p class="table_title">用户列表</p>
    <!-- 搜索列表 -->
    <div class="userList_content">
      <div class="userserch_block">
        <div>
          用户名：
          <el-input style="width:182px;margin-right:10px" v-model="username" clearable></el-input>手机号：
          <el-input style="width:182px;margin-right:10px" v-model="phone" clearable></el-input>钱包地址：
          <el-input style="width:400px;margin-right:10px" v-model="address" clearable></el-input>
        </div>

        <div style="margin-top:10px">
          创建时间：
          <el-date-picker
            style="width:300px;margin-right:10px"
            v-model="user_addTime"
            type="daterange"
            value-format="yyyy-MM-dd"
          ></el-date-picker>登录时间：
          <el-date-picker
            style="width:320px;margin-right:10px"
            v-model="user_loginTime"
            type="daterange"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
          <el-button type="primary" size="small" @click="serchData">搜索</el-button>
        </div>
      </div>
      <!-- 用户信息列表 -->
      <div class="userList">
        <div class="userList_head">
          <el-button
            type="warning"
            size="large"
            style="background-color:#ff5722;border:none;border-radius:2px;margin-right:10px"
            @click="frozen"
          >批量冻结</el-button>
          <el-button
            type="warning"
            size="large"
            style="background-color:#ffb800;border:none;border-radius:2px"
            @click="unfrozen"
          >批量解冻</el-button>
        </div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width:100% overflow:scroll"
          class="userList_table"
          @selection-change="handleSelectionChange"
        >
          <el-table-column align="center" type="selection" width="55"></el-table-column>
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
          <el-table-column align="center" prop="phone" label="手机号" width="150"></el-table-column>
          <el-table-column align="center" prop="level" label="用户级别" width="100">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.level==1"
                type="warning"
                size="mini"
                style="background-color:#009688;border:none;border-radius:2px;margin-right:10px"
              >普通</el-button>
              <el-button
                v-else-if="scope.row.level==2"
                type="warning"
                size="mini"
                style="background-color:#1e9fff;border:none;border-radius:2px;margin-right:10px"
              >vip</el-button>
              <el-button
                v-else-if="scope.row.level==3"
                type="warning"
                size="mini"
                style="background-color:#ffb800;border:none;border-radius:2px;margin-right:10px"
              >svip</el-button>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="invitationCode" label="邀请码" width="120"></el-table-column>
          <el-table-column
            align="center"
            prop="invitation"
            label="邀请人"
            width="160"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column align="center" prop="loginNum" label="登入次数" width="90"></el-table-column>
          <el-table-column align="center" prop="ip" label="登陆IP" width="130"></el-table-column>
          <el-table-column align="center" prop="lastLoginTime" label="登陆时间" width="180"></el-table-column>
          <el-table-column align="center" prop label="实名认证" width="100">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.isAuth==3"
                type="warning"
                size="mini"
                style="background-color:#009688;border:none;border-radius:2px;margin-right:10px"
              >已认证</el-button>
              <el-button
                v-else-if="scope.row.isAuth==1"
                size="mini"
                style="background-color:#1e9fff;border:none;border-radius:2px;margin-right:10px"
              >认证中</el-button>
              <el-button v-else size="mini" style="border-radius:2px;margin-right:10px">未认证</el-button>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" fixed="right" width="240">
            <template slot-scope="scope">
              <el-button
                type="warning"
                size="mini"
                style="background-color:#009688;border:none;border-radius:2px;margin-right:10px"
                icon="el-icon-edit"
                @click="eidt(scope.$index, scope.row)"
              >编辑</el-button>
              <el-button
                v-if="scope.row.isFrozen==0"
                type="warning"
                size="mini"
                style="background-color:#ff5722;border:none;border-radius:2px;margin-right:10px"
                @click="frizonOne(scope.row)"
              >冻结</el-button>
              <el-button
                v-else
                type="warning"
                size="mini"
                style="background-color:#ffb800;border:none;border-radius:2px;margin-right:10px"
                @click="unfrizonOne(scope.row)"
              >解冻</el-button>
              <el-button
                plain
                size="mini"
                style="border-radius:2px;margin-right:10px"
                icon="el-icon-mobile"
                @click="gotoCredits(scope.row)"
              >积分账户</el-button>
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
      <el-dialog width="800px" title="用户信息" class="allTable" :visible.sync="edit">
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          :model="editForm"
          :index="index"
        >
          <el-form-item label="账号：">
            <el-input v-model="editForm.account" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户头像">
            <el-upload
              class="avatar-uploader"
              action="http://res.chainmall.pro/img/saveImage/image"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <img v-if="editForm.headImage" :src="editForm.headImage" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="用户昵称">
            <el-input v-model="editForm.nickName"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="editForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="editForm.realName" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="身份证">
            <el-input v-model="editForm.cardCode" placeholder="请输入用户身份证号"></el-input>
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
            <el-button type="primary" @click="subChange(editForm.id)">立即提交</el-button>
            <el-button style="margin-left:160px" @click="edit= false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { TimeSelect } from "element-ui";
import {
  getUserList,
  getOneUser,
  editOneUser,
  frozenAll,
  unfrozenAll,
  frozenOne,
  unfrozenOne,
} from "../../../network/userControl";
export default {
  components: {},
  data() {
    return {
      username: "",
      phone: "",
      address: "",
      user_addTime: "",
      user_loginTime: "",
      tableData: [],
      currentPage4: 1,
      pages: null,
      multipleSelection: [],
      page: 1,
      limit: 10,
      params: {
        name: "",
      },

      lookform: {},

      editForm: {
        account: "",
        headImage: "",
        nickName: "",
        phone: "",
        realName: "",
        cardCode: "",
        image1: "",
        image2: "",
        uPassword: "",
        password: "",
      },

      labelPosition: "left",
      edit: false,
      index: "",
    };
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
      let user_loginTime = this.user_loginTime;
      console.log(user_loginTime);
      if (user_addTime != "" && user_addTime != null) {
        user_addTime[0] = user_addTime[0] + " 00:00:00";
        user_addTime[1] = user_addTime[1] + " 23:59:59";
      } else {
        user_addTime = ["", ""];
      }
      if (user_loginTime != "" && user_loginTime != null) {
        user_loginTime[0] = user_loginTime[0] + " 00:00:00";
        user_loginTime[1] = user_loginTime[1] + " 23:59:59";
      } else {
        user_loginTime = ["", ""];
      }
      let obj = {
        phone: this.phone,
        uname: this.username,
        walletAddress: this.address,
        startTime: user_addTime[0],
        endTime: user_addTime[1],
        loginStartTime: user_loginTime[0],
        loginEndTime: user_loginTime[1],
      };

      getUserList(obj).then((res) => {
        console.log(res);
        this.tableData = res.data;
        this.pages = res.count;
        this.limit = 10;
      });
    },
    // 批量冻结事件
    frozen() {
      if (this.multipleSelection.length != 0) {
        this.$confirm("确认批量冻结用户？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            let ids = [];
            for (let item in this.multipleSelection) {
              ids.push(this.multipleSelection[item].id);
            }
            ids = "(" + ids.toString() + ")";
            console.log(ids);
            let obj = this.$qs.stringify({
              ids: ids,
              status: 1,
            });
            frozenAll(obj).then((res) => {
              console.log(res);
              this.$message({
                type: "success",
                message: res.msg,
              });
              let obj = {
                page: this.page,
                limit: this.limit,
              };
              getUserList(obj).then((res) => {
                console.log(res);
                this.tableData = res.data;
                this.pages = res.count;
              });
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消操作",
            });
          });
      } else {
        return;
      }
    },
    // 批量解冻
    unfrozen() {
      if (this.multipleSelection.length != 0) {
        this.$confirm("确认批量解冻用户？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            let ids = [];
            for (let item in this.multipleSelection) {
              ids.push(this.multipleSelection[item].id);
            }
            ids = "(" + ids.toString() + ")";
            console.log(ids);
            let obj = this.$qs.stringify({
              ids: ids,
              status: 0,
            });
            unfrozenAll(obj).then((res) => {
              console.log(res);
              this.$message({
                type: "success",
                message: res.msg,
              });
              let obj = {
                page: this.page,
                limit: this.limit,
              };
              getUserList(obj).then((res) => {
                console.log(res);
                this.tableData = res.data;
                this.pages = res.count;
              });
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消操作",
            });
          });
      } else {
        return;
      }
    },
    // 单点冻结
    frizonOne(res) {
      this.$confirm("确冻结该用户？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let obj = this.$qs.stringify({
            id: res.id,
            status: 1,
          });
          frozenOne(obj).then((res) => {
            console.log(res);
            this.$message({
              type: "success",
              message: res.msg,
            });
            let obj = {
              page: this.page,
              limit: this.limit,
            };
            getUserList(obj).then((res) => {
              console.log(res);
              this.tableData = res.data;
              this.pages = res.count;
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消操作",
          });
        });
    },
    // 单点解冻
    unfrizonOne(res) {
      this.$confirm("确认解冻该用户？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let obj = this.$qs.stringify({
            id: res.id,
            status: 0,
          });
          unfrozenOne(obj).then((res) => {
            console.log(res);
            this.$message({
              type: "success",
              message: res.msg,
            });
            let obj = {
              page: this.page,
              limit: this.limit,
            };
            getUserList(obj).then((res) => {
              console.log(res);
              this.tableData = res.data;
              this.pages = res.count;
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消操作",
          });
        });
    },
    // 点击编辑事件
    eidt(index, objs) {
      console.log(objs);
      console.log(index);
      this.edit = true;
      let obj = {
        id: objs.id,
      };
      getOneUser(obj).then((res) => {
        console.log(res);
        (this.editForm.account = res.data.account),
          (this.editForm.headImage = res.data.headImage),
          (this.editForm.nickName = res.data.nickName),
          (this.editForm.phone = res.data.phone),
          (this.editForm.realName = res.data.realName),
          (this.editForm.cardCode = res.data.cardCode),
          (this.editForm.image1 = res.data.image1),
          (this.editForm.image2 = res.data.image2);
        this.editForm.id = res.data.id;
      });
    },
    // 用户头像上传
    handleAvatarSuccess(res, file) {
      this.editForm.headImage = "http://res.chainmall.pro/" + res.data;
      console.log(res);
      console.log(file);
    },
    // 提交编辑内容事件
    subChange(index) {
      // this.edit = false;
      // this.usersData.splice(index, 1, this.editForm);
      console.log(index);
      console.log(this.editForm);
      let headImage = this.editForm.headImage.slice(25);
      this.editForm.headImage = headImage;
      let obj = this.$qs.stringify(this.editForm);
      console.log(headImage);
      editOneUser(obj).then((res) => {
        console.log(res);
        if (res.code == 0) {
          this.edit = false;
          this.$message({
            message: res.msg,
            type: "success",
          });
          this.serchData();
        } else {
        }
      });
    },
    // 页面数量
    handleSizeChange(val) {
      this.limit = 10;
      this.limit = val;
      let user_addTime = this.user_addTime;
      let user_loginTime = this.user_loginTime;
      console.log(user_loginTime);
      if (user_addTime != "" && user_addTime != null) {
        user_addTime[0] = user_addTime[0] + " 00:00:00";
        user_addTime[1] = user_addTime[1] + " 23:59:59";
      } else {
        user_addTime = ["", ""];
      }
      if (user_loginTime != "" && user_loginTime != null) {
        user_loginTime[0] = user_loginTime[0] + " 00:00:00";
        user_loginTime[1] = user_loginTime[1] + " 23:59:59";
      } else {
        user_loginTime = ["", ""];
      }
      let obj = {
        phone: this.phone,
        uname: this.username,
        walletAddress: this.address,
        startTime: user_addTime[0],
        endTime: user_addTime[1],
        loginStartTime: user_loginTime[0],
        loginEndTime: user_loginTime[1],
        page: this.page,
        limit: this.limit,
      };

      getUserList(obj).then((res) => {
        console.log(res);
        this.tableData = res.data;
        this.pages = res.count;
      });
    },
    handleCurrentChange(val) {
      this.page = val;
      let user_addTime = this.user_addTime;
      let user_loginTime = this.user_loginTime;
      console.log(user_loginTime);
      if (user_addTime != "" && user_addTime != null) {
        user_addTime[0] = user_addTime[0] + " 00:00:00";
        user_addTime[1] = user_addTime[1] + " 23:59:59";
      } else {
        user_addTime = ["", ""];
      }
      if (user_loginTime != "" && user_loginTime != null) {
        user_loginTime[0] = user_loginTime[0] + " 00:00:00";
        user_loginTime[1] = user_loginTime[1] + " 23:59:59";
      } else {
        user_loginTime = ["", ""];
      }
      let obj = {
        phone: this.phone,
        uname: this.username,
        walletAddress: this.address,
        startTime: user_addTime[0],
        endTime: user_addTime[1],
        loginStartTime: user_loginTime[0],
        loginEndTime: user_loginTime[1],
        page: this.page,
        limit: this.limit,
      };

      getUserList(obj).then((res) => {
        console.log(res);
        this.tableData = res.data;
        this.pages = res.count;
      });
    },
    gotoCredits(res) {
      this.$router.push({ path: "/credits", query: { uId: res.uId } });
    },
  },

  created() {
    let obj = {
      page: this.page,
      limit: this.limit,
    };

    getUserList(obj).then((res) => {
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
.userList_head {
  padding: 10px 15px;
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
.allTable {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: Center;
  overflow: hidden;
  .el-dialog {
    margin: 20 auto !important;
    height: 80%;
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
