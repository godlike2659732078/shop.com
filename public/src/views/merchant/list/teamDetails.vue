<template>
  <div class="user-list">
    <!-- 添加按钮 -->
    <p class="table_title">分销团队</p>
    <!-- 搜索列表 -->
    <div class="userList_content">
      <!-- 用户信息列表 -->
      <div class="userList">
        <div class="userList_head">
          <el-button
            type="primary"
            size="large"
            style="border:none;border-radius:2px;margin-right:10px"
            @click="gotoAdd"
            icon="el-icon-plus"
          >增加</el-button>
        </div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width:100% overflow:scroll"
          class="userList_table"
        >
          <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
          <el-table-column
            align="left"
            prop="nickName"
            label="用户名"
            width="150"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column align="center" prop="phone" label="手机号" width="150"></el-table-column>
          <el-table-column align="center" prop="inviteNum" label="邀请人数" width="180"></el-table-column>
          <el-table-column align="center" prop="dmoney" label="业绩" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column align="center" prop="createTime" label="添加时间" width="200"></el-table-column>
          <el-table-column align="center" label="操作" fixed="right" width="161">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.manager!=1"
                type="warning"
                size="mini"
                style="background-color:#009688;border:none;border-radius:2px;margin-right:10px"
                @click="setUser(scop.row)"
              >设为管理员</el-button>
              <el-button
                v-else
                type="warning"
                size="mini"
                style="background-color:#1e9fff;border:none;border-radius:2px;margin-right:10px"
              >管理员</el-button>
              <el-button
                type="warning"
                size="mini"
                style="background-color:#ff5722;border:none;border-radius:2px;margin-right:10px"
                icon="el-icon-delete"
                @click="del(scop.row)"
              >删除</el-button>
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
      <el-dialog width="400px" title="添加团队成员" class="team_allTable" :visible.sync="edit">
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          :model="editForm"
          :index="index"
        >
          <el-form-item label="手机号">
            <el-input v-model="editForm.phone"></el-input>
          </el-form-item>

          <el-form-item label="邀请码">
            <el-input v-model="editForm.code"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="subChange">立即提交</el-button>
            <el-button style="margin-left:60px" @click="edit= false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { TimeSelect } from "element-ui";
import {
  getteamDetails,
  addTeamCus,
  setUser,
  delUser,
} from "../../../network/merchant";
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
        phone: "",
        code: "",
        shopId: "",
        teamId: "",
      },

      labelPosition: "left",
      edit: false,
      index: "",
    };
  },
  watch: {
    page() {
      let obj = {
        page: this.page,
        limit: this.limit,
        shopId: this.$route.query.shopId,
        teamId: this.$route.query.teamId,
      };
      console.log(obj);
      getteamDetails(obj).then((res) => {
        console.log(res);
        this.tableData = res.data;
        this.pages = res.count;
      });
    },
    limit() {
      let obj = {
        page: this.page,
        limit: this.limit,
        shopId: this.$route.query.shopId,
        teamId: this.$route.query.teamId,
      };
      console.log(obj);
      getteamDetails(obj).then((res) => {
        console.log(res);
        this.tableData = res.data;
        this.pages = res.count;
      });
    },
  },
  methods: {
    getList() {
      let obj = {
        page: this.page,
        limit: this.limit,
        shopId: this.$route.query.shopId,
        teamId: this.$route.query.teamId,
      };
      console.log(obj);
      getteamDetails(obj).then((res) => {
        console.log(res);
        this.tableData = res.data;
        this.pages = res.count;
        (this.editForm.shopId = this.$route.query.shopId),
          (this.editForm.teamId = this.$route.query.teamId);
      });
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    // 批量删除事件
    frozen() {
      if (this.multipleSelection.length != 0) {
        this.$confirm("确认批量删除？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            let teamIds = [];
            for (let item in this.multipleSelection) {
              teamIds.push(this.multipleSelection[item].teamId);
            }
            teamIds = "(" + ids.toString() + ")";
            console.log(teamIds);
            let obj = this.$qs.stringify({
              teamIds: teamIds,
            });
            delAllTeam(obj).then((res) => {
              console.log(res);
              if (res.code == 0) {
                this.$message({
                  type: "success",
                  message: res.msg,
                });
                let obj = {
                  page: this.page,
                  limit: this.limit,
                  shopId: this.$route.query.shopId,
                };
                getteamDetails(obj).then((res) => {
                  console.log(res);
                  this.tableData = res.data;
                  this.pages = res.count;
                  this.editForm.shopId = res.data[0].shopId;
                });
              } else {
                this.$message.error("操作失败！");
              }
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
    // 设为管理员
    setUser(res) {
      let obj = this.$qs.stringify({
        teamId: res.teamId,
        userId: res.uId,
      });
      setUser(obj).then((res) => {
        console.log(res);
        if (res.code == 0) {
          this.getList();
        } else {
          this.$message.error("操作失败！");
        }
      });
    },
    // 单点删除
    del(res) {
      let teamId=res.teamId;
      let userId=res.uId
      if (this.multipleSelection.length != 0) {
        this.$confirm("确认批量删除？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            let obj = this.$qs.stringify({
              teamId: teamId,
              userId: userId,
            });
            delUser(obj).then((res) => {
              console.log(res);
              if (res.code == 0) {
                this.$message({
                  type: "success",
                  message: res.msg,
                });
              } else {
                this.$message.error("操作失败！");
              }
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
    // 提交编辑内容事件
    subChange() {
      console.log();
      console.log(this.editForm);
      let obj = this.$qs.stringify(this.editForm);
      console.log(obj);
      addTeamCus(obj).then((res) => {
        console.log(res);
        if (res.code == 0) {
          this.edit = false;
          this.$message({
            message: res.msg,
            type: "success",
          });
          this.$router.push({ path: "/merchant/merchantList/teamDetails" });
        } else {
          this.$message.error("添加失败");
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
    gotoAdd() {
      this.edit = true;
    },
    gotoCredits(res) {
      // this.$router.push({ path: "/credits", query: { uId: res.uId } });
    },
  },

  created() {
    let obj = {
      page: this.page,
      limit: this.limit,
      shopId: this.$route.query.shopId,
      teamId: this.$route.query.teamId,
    };
    console.log(obj);
    getteamDetails(obj).then((res) => {
      console.log(res);
      this.tableData = res.data;
      this.pages = res.count;
      (this.editForm.shopId = this.$route.query.shopId),
        (this.editForm.teamId = this.$route.query.teamId);
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
.team_allTable {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: Center;
  overflow: hidden;
  .el-dialog {
    margin: 20 auto !important;
    height: 30%;
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
