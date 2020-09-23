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
        <div class="mermoney_head"></div>
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
            prop="account"
            label="账号"
            width="150"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column align="center" prop="name" label="店铺名称" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column align="center" prop="amount" label="总资金" width="100"></el-table-column>
          <el-table-column
            align="center"
            prop="useAmt"
            label="可用资金"
            width="100"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column align="center" prop="frozenAmt" label="冻结资金" width="160"></el-table-column>
          <el-table-column align="center" prop="ensureAmt" label="保证金" width="100"></el-table-column>
          <el-table-column align="center" prop="integralFrozenNum" label="冻结积分" width="150"></el-table-column>
          <el-table-column align="center" prop="integralUseNum" label="可用积分" width="150"></el-table-column>
          <el-table-column align="center" label="操作" fixed="right" width="300px">
            <template slot-scope="scope">
              <el-button
                type="warning"
                size="mini"
                style="background-color:#009688;border:none;border-radius:2px;margin-right:10px"
                icon="el-icon-edit"
                @click="editMoney(scope.$index,scope.row)"
              >编辑</el-button>

              <el-button
                v-if="scope.row.isFrozen==1"
                plain
                size="mini"
                style="border-radius:2px;margin-right:10px"
                @click="frizonOne(scope.row)"
              >解冻</el-button>
              <el-button
                v-else
                type="warning"
                size="mini"
                style="background-color:#ffb800;border:none;border-radius:2px;margin-right:10px"
                @click="unfrizonOne(scope.row)"
              >冻结</el-button>
              <el-button
                type="warning"
                size="mini"
                style="background-color:#009688;border:none;border-radius:2px;margin-right:10px"
                @click="gotoTeam(scope.row)"
              >资金记录</el-button>
              <el-button
                type="warning"
                size="mini"
                style="background-color:#ff5722;border:none;border-radius:2px;margin-right:10px"
                @click="gotoInrecord(scope.row)"
              >积分记录</el-button>
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
      <el-dialog width="30%" title="修改资金" class="capitalList_table" :visible.sync="edit">
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          :model="editForm"
          :index="index"
        >
          <el-form-item label="可用资金">
            <div class="coinBox">
              {{useAmt}}
              <el-input
                v-model="editForm.useNum"
                placeholder="减少请输入“ - ”"
                style="width:190px;margin-left:20px"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item label="冻结资金">
            <div class="coinBox">
              {{frozenAmt}}
              <el-input
                v-model="editForm.frozenNum"
                placeholder="减少请输入“ - ”"
                style="width:190px;margin-left:20px"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item label="保证金">
            <div class="coinBox">
              {{ensureAmt}}
              <el-input
                v-model="editForm.ensureAmt"
                placeholder="减少请输入“ - ”"
                style="width:190px;margin-left:20px"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item label="可用积分">
            <div class="coinBox">
              {{integralUseNum}}
              <el-input
                v-model="editForm.integralUseAmt"
                placeholder="减少请输入“ - ”"
                style="width:190px;margin-left:20px"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item label="冻结积分">
            <div class="coinBox">
              {{integralFrozenNum}}
              <el-input
                v-model="editForm.integralFrozenAmt"
                placeholder="减少请输入“ - ”"
                style="width:190px;margin-left:20px"
              ></el-input>
            </div>
          </el-form-item>
          

          <el-form-item>
            <el-button type="primary" style="margin-left:100px" @click="subChange(editForm)">立即提交</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { TimeSelect } from "element-ui";
import { findShopAccounts,updateMoney, updateShopFrozen } from "../../../network/merchant";
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
        uId: null,
        useNum: 0,
        frozenNum: 0,
        ensureAmt: 0,
        integralUseAmt: 0,
        integralFrozenAmt: 0,
      },

      labelPosition: "left",
      edit: false,
      index: "",
      useAmt: null,
      frozenAmt: null,
      ensureAmt: null,
      integralUseNum: null,
      integralFrozenNum: null,
    };
  },
  watch: {
    //   监听页码变化
    page() {
      let obj = {
        page: this.page,
        limit: this.limit,
        account: this.username,
        uname: this.phone,
      };
      findShopAccounts(obj).then((res) => {
        console.log(res);
        this.tableData = res.data;
        this.pages = res.count;
      });
    },
    // 监听页面显示数量变化
    limit() {
      let obj = {
        page: this.page,
        limit: this.limit,
        account: this.username,
        uname: this.phone,
      };
      findShopAccounts(obj).then((res) => {
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
      findShopAccounts(obj).then((res) => {
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
      findShopAccounts(obj).then((res) => {
        console.log(res);
        this.tableData = res.data;
        this.pages = res.count;
        this.page = 1;
      });
    },
    // 跳转到资金记录
    gotoTeam(res) {
      this.$router.push({
        path: "/merchant/record",
        query: {
          uId: res.sId,
        },
      });
    },
    // 跳转积分记录
    gotoInrecord(res){
  this.$router.push({
        path: "/merchant/inRecord",
        query: {
          uId: res.sId,
        },
      });
    },
    // 编辑
    editMoney(index, res) {
      this.edit = true;
      console.log(index);
      this.editForm.uId = this.tableData[index].shopId;
      (this.useAmt = this.tableData[index].useAmt),
        (this.frozenAmt = this.tableData[index].frozenAmt),
        (this.ensureAmt = this.tableData[index].ensureAmt),
        (this.integralUseNum = this.tableData[index].integralUseNum),
        (this.integralFrozenNum = this.tableData[index].integralFrozenNum);
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
            uId: res.shopId,
            status: 0,
          });
          updateShopFrozen(obj).then((res) => {
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
      this.$confirm("是否冻结？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let obj = this.$qs.stringify({
            uId: res.shopId,
            status: 1,
          });
          updateShopFrozen(obj).then((res) => {
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

    // 提交编辑内容事件
    subChange(index) {
      let useNum = parseFloat(this.editForm.useNum);
      let frozenNum = parseFloat(this.editForm.frozenNum);
      this.editForm.useNum;
      if (this.useAmt + useNum < 0) {
        this.$message.error("用户资金不能小于0");
        return false;
      }
      if (this.frozenAmt + frozenNum < 0) {
        this.$message.error("用户冻结资金不能小于0");
        return false;
      }
      let obj = this.$qs.stringify(this.editForm);
      //console.log(obj);
      updateMoney(obj).then((res) => {
        //console.log(res);
        if (res.code == 0) {
            console.log(res)
          this.edit = false;
          this.$message({
            message: res.msg,
            type: "success",
          });

          this.getList();
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
    findShopAccounts(obj).then((res) => {
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
.mermoney_head {
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
