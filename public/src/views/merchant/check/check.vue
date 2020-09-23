<template>
  <div class="user-list">
    <!-- 添加按钮 -->
    <p class="table_title">商家审核</p>
    <!-- 搜索列表 -->
    <div class="userList_content">
      <div class="userserch_block">
        店铺名称：
        <el-input style="width:182px;margin-right:10px" v-model="username" clearable></el-input>开始时间：
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
          <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
          <el-table-column align="center" label="头像" width="80">
            <!--加入下面的内容,scope.row代表这一行,img是显示这一行的哪个字段,我的是img,你的自己看下-->
            <template slot-scope="scope" class="headImage">
              <img
                v-if="scope.row.headImage"
                :src="scope.row.headImage"
                style="margin-left:10px;display:block;width:30px;height:30px"
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
          <el-table-column align="center" label="背景图" width="80">
            <!--加入下面的内容,scope.row代表这一行,img是显示这一行的哪个字段,我的是img,你的自己看下-->
            <template slot-scope="scope" class="headImage">
              <img
                :src="scope.row.backgroundImg"
                style="margin-left:10px;display:block;width:30px;height:30px"
                alt
              />
            </template>
          </el-table-column>
          <el-table-column align="left" prop="name" label="店铺名称" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column align="left" prop="phone" label="手机号" width="120"></el-table-column>
          <el-table-column align="left" prop="createTime" label="添加时间" width="180"></el-table-column>
          <el-table-column align="center" label="操作" fixed="right" width="240">
            <template slot-scope="scope">
              <el-button
                type="warning"
                size="mini"
                style="background-color:#009688;border:none;border-radius:2px;margin-right:10px"
                icon="el-icon-edit"
                @click="check_detail(scope.row)"
              >详情</el-button>
              <el-button
                type="warning"
                size="mini"
                style="background-color:#ffb800;border:none;border-radius:2px;margin-right:10px"
                @click="passCheck(scope.row)"
              >通过</el-button>
              <el-button
                type="warning"
                size="mini"
                style="background-color:#ff5722;border:none;border-radius:2px;margin-right:10px"
                @click="checkFail(scope.row)"
              >驳回</el-button>
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
      <el-dialog width="30%" title="用户信息" class="checkTable" :visible.sync="edit">
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          :model="editForm"
          :index="index"
        >
          <el-form-item label="店铺名称">
            <el-input v-model="editForm.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="editForm.phone" disabled></el-input>
          </el-form-item>
          <el-form-item label="店铺头像">
            <img :src="editForm.headImage" style="width:100px;height:100px" class="avatar" />
          </el-form-item>
          <el-form-item label="店铺背景">
            <img
              style="width:100px;height:100px"
              :src="editForm.backgroundImg"
              class="avatar_shopBg"
            />
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 备注信息弹窗 -->
      <el-dialog
        width="500px"
        style="height:400px"
        title="认证驳回"
        class="checkTable"
        :visible.sync="lose"
      >
        <el-form :label-position="labelPosition" label-width="80px" :model="noPass" :index="index">
          <el-form-item label="驳回原因">
            <el-input type="textarea" v-model="noPass.text" :rows="3" placeholder="请输入驳回原因"></el-input>
          </el-form-item>
          <div style="display:flex;">
            <el-form-item>
              <el-button type="primary" @click="subLose(noPass.id)">确认</el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { TimeSelect } from "element-ui";
import { getCheck, checkPass,checkFail } from "../../../network/merchant";
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
      editForm: {
        name: "",
        phone: "",
        headImage: "",
        backgroundImg: "",
      },
      noPass: {
        text: "",
        id: "",
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
        name: this.username,
        startTime: user_addTime[0],
        endTime: user_addTime[1],
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
        name: this.username,
        startTime: user_addTime[0],
        endTime: user_addTime[1],
        page: this.page,
        limit: this.limit,
      };
      console.log(obj);
      getCheck(obj).then((res) => {
        console.log(res);
        this.tableData = res.data;
        this.pages = res.count;
      });
    },
  },
  methods: {
    // 获取列表
    getList() {
      let obj = {
        page: this.page,
        limit: this.limit,
      };
      getCheck(obj).then((res) => {
        console.log(res);
        this.tableData = res.data;
        this.pages = res.count;
      });
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
        name: this.username,
        startTime: user_addTime[0],
        endTime: user_addTime[1],
        page: 1,
        limit: 10,
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
        name: res.name,
        page: 1,
        limit: 10,
      };
      console.log(obj);
      getCheck(obj).then((res) => {
        console.log(res);
        if (res.code == 0) {
          this.editForm = res.data[0];
        }
      });
    },

    // 认证通过
    passCheck(res) {
      this.$confirm("确认通过？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let obj = this.$qs.stringify({
            id: res.id,
          });
          checkPass(obj).then((res) => {
            // console.log(res);
            this.$message({
              type: "success",
              message: res.msg,
            });
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消操作",
          });
        });
    },
    checkFail(res){
      this.lose=true
this.noPass.id=res.id
    },
    subLose(res) {
      console.log(res);
      let obj = this.$qs.stringify({
        id: this.noPass.id,
        remarks: this.noPass.text,
      });
      console.log(obj);
      checkFail(obj).then((res) => {
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
