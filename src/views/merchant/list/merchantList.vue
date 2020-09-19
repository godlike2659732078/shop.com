<template>
  <div class="user-list">
    <!-- 添加按钮 -->
    <p class="table_title">商家列表</p>
    <!-- 搜索列表 -->
    <div class="userList_content">
      <div class="userserch_block">
        搜索账号：
        <el-input style="width:182px;margin-right:10px" v-model="username" clearable></el-input>店铺名称：
        <el-input style="width:182px;margin-right:10px" v-model="phone" clearable></el-input>
        <el-button type="primary" size="small" @click="serchData">搜索</el-button>
      </div>
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
          <el-table-column align="center" label="头像" width="80">
            <!--加入下面的内容,scope.row代表这一行,img是显示这一行的哪个字段,我的是img,你的自己看下-->
            <template slot-scope="scope" class="headImage">
              <img
                v-if="scope.row.headImage"
                :src="scope.row.headImage"
                style="margin-left:10px;display:block;width:30px;"
                alt
              />
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            prop="account"
            label="商家账号"
            width="150"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column align="center" prop="name" label="店铺名称"></el-table-column>
          <el-table-column align="center" prop="num" label="收藏" width="100"></el-table-column>
          <el-table-column
            align="center"
            prop="sort"
            label="排序"
            width="100"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column align="center" prop="ensure" label="保证金比例" width="160"></el-table-column>
          <el-table-column align="center" prop="fee" label="服务费比例" width="100"></el-table-column>
          <el-table-column align="center" prop="createTime" label="添加时间" width="180"></el-table-column>
          <el-table-column align="center" label="操作" fixed="right" width="330px">
            <template slot-scope="scope">
              <el-button
                type="warning"
                size="mini"
                style="background-color:#009688;border:none;border-radius:2px;margin-right:10px"
                icon="el-icon-edit"
                @click="eidt(scope.row)"
              >编辑</el-button>
              <el-button
                type="warning"
                size="mini"
                style="background-color:#009688;border:none;border-radius:2px;margin-right:10px"
                icon="el-icon-user"
                @click="gotoTeam(scope.row)"
              >承销团队</el-button>
              <el-button
                v-if="scope.row.isFrozen==1"
                plain
                size="mini"
                style="border-radius:2px;margin-right:10px"
                @click="frizonOne(scope.row)"
              >已下架</el-button>
              <el-button
                v-else
                type="warning"
                size="mini"
                style="background-color:#ffb800;border:none;border-radius:2px;margin-right:10px"
                @click="unfrizonOne(scope.row)"
              >已上架</el-button>
              <el-button
                type="warning"
                size="mini"
                style="background-color:#ff5722;border:none;border-radius:2px;margin-right:10px"
                icon="el-icon-delete"
                @click="delOne(scope.row)"
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
    </div>
  </div>
</template>

<script>
import { TimeSelect } from "element-ui";
import { getmerchantList, noShow,delOne } from "../../../network/merchant";
export default {
  components: {},
  data() {
    return {
      username: "",
      phone: "",
      tableData: [],
      currentPage4: 1,
      pages: null,
      multipleSelection: [],
      page: 1,
      limit: 10,
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
  watch: {
    page() {
      let obj = {
        page: this.page,
        limit: this.limit,
        account: this.username,
        uname: this.phone,
      };
      getmerchantList(obj).then((res) => {
        console.log(res);
        this.tableData = res.data;
        this.pages = res.count;
      });
    },
    limit() {
      let obj = {
        page: this.page,
        limit: this.limit,
        account: this.username,
        uname: this.phone,
      };
      getmerchantList(obj).then((res) => {
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
      getmerchantList(obj).then((res) => {
        console.log(res);
        this.tableData = res.data;
        this.pages = res.count;
      });
    },
    // 头部搜索
    serchData() {
      let obj = {
        page: this.page,
        limit: this.limit,
        account: this.username,
        uname: this.phone,
      };
      getmerchantList(obj).then((res) => {
        console.log(res);
        this.tableData = res.data;
        this.pages = res.count;
        this.page = 1;
      });
    },
    gotoTeam(res) {
      this.$router.push({
        path: "/merchant/merchantList/team",
        query: {
          shopId: res.sId,
        },
      });
    },
    // 单点上架
    frizonOne(res) {
      this.$confirm("是否上架？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let obj = this.$qs.stringify({
            uId: res.sId,
            status: 0,
          });
          noShow(obj).then((res) => {
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
    // 单点下架
    unfrizonOne(res) {
      this.$confirm("是否下架？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let obj = this.$qs.stringify({
            uId: res.sId,
            status: 1,
          });
          noShow(obj).then((res) => {
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
    // 点击编辑事件
    eidt(res) {
      this.$router.push({
        path: "/merchant/merchantList/form",
        query: {
          sId: res.sId,
        },
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
      let obj = this.$qs.stringify(this.editForm);
      console.log(obj);
      editOneUser(obj).then((res) => {
        console.log(res);
        if (res.code == 0) {
          this.$message({
            message: res.msg,
            type: "success",
          });
          this.$router.push({ path: "/userList" });
        } else {
        }
      });
    },
    // 删除单个商家
    delOne(res) {
       this.$confirm("是否删除该商家？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let obj = this.$qs.stringify({
            uId: res.sId,
          });
          delOne(obj).then((res) => {
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
    // 页面数量
    handleSizeChange(val) {
      this.limit = 10;
      this.limit = val;
    },
    handleCurrentChange(val) {
      this.page = val;
    },
    gotoAdd() {
      this.$router.push({ path: "/merchant/merchantList/add" });
    },
    gotoCredits(res) {
      // this.$router.push({ path: "/credits", query: { uId: res.uId } });
    },
  },

  created() {
    let obj = {
      page: this.page,
      limit: this.limit,
    };
    getmerchantList(obj).then((res) => {
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
