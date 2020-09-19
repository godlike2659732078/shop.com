<template>
  <div class="user-list">
    <!-- 添加按钮 -->
    <p class="table_title">分销返用</p>
    <!-- 搜索列表 -->
    <div class="userList_content">
      <div class="userserch_block">
        搜索账号：
        <el-input style="width:182px;margin-right:10px" v-model="username" clearable></el-input>店铺名称：
        <el-input style="width:182px;margin-right:10px" v-model="phone" clearable></el-input>
        <el-button type="primary" size="small" style="margin-right:10px" @click="serchData">搜索</el-button>
      </div>
      <!-- 用户信息列表 -->
      <div class="userList">
        <div class="shop_rebate_head"></div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width:100% overflow:scroll"
          class="userList_table"
        >
          <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
          <el-table-column align="left" prop="account" label="账号" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column align="center" prop="name" label="店铺名称" width="150"></el-table-column>
          <el-table-column align="center" prop="firstUse" label="一级返佣（解冻）" width="150"></el-table-column>
          <el-table-column align="center" prop="firstFrozen" label="一级返佣（冻结）" width="150"></el-table-column>
          <el-table-column align="center" prop="secondUse" label="二级返佣（解冻）" width="150"></el-table-column>
          <el-table-column align="center" prop="sencedFrozen" label="二级返佣（冻结）" width="150"></el-table-column>center
          <el-table-column align="center" label="操作" fixed="right" width="240">
            <template slot-scope="scope">
              <el-button
                type="warning"
                size="mini"
                style="background-color:#009688;border:none;border-radius:2px;margin-right:10px"
                @click="history(scope.row)"
              >邀请记录</el-button>
              <el-button
                plain
                size="mini"
                style="border-radius:2px;margin-right:10px"
                icon="el-icon-mobile"
                @click="gotoRecord(scope.row)"
              >返佣明细</el-button>
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
import {
  getShoprebate,
  editUsercap,
  froAccount,
  unfroAccount,
} from "../../../network/merchant";
export default {
  components: {},
  data() {
    return {
      username: "",
      phone: "",

      value: "",
      userId: "",
      tableData: [],
      currentPage4: 1,
      pages: null,
      multipleSelection: [],
      page: 1,
      limit: 10,
      params: {
        name: "",
      },
      editForm: {
        useNum: 0,
        frozenNum: 0,
        remarks: "",
      },
      useAmt: "",
      frozenAmt: "",
      uId: "",
      coinId: "",
      labelPosition: "left",
      edit: false,
      index: "",
    };
  },
  watch: {
    page() {
      this.value = "";
      let obj = {
        page: 1,
        limit: this.limit,
        account: this.username,
        uname: this.phone,
      };
      //console.log(obj);
      getShoprebate(obj).then((res) => {
        this.tableData = res.data;
        //console.log(res);
        this.pages = res.count;
      });
    },
    limit() {
      this.value = "";
      let obj = {
        page: 1,
        limit: this.limit,
        account: this.username,
        uname: this.phone,
      };
      //console.log(obj);
      getShoprebate(obj).then((res) => {
        this.tableData = res.data;
        //console.log(res);
        this.pages = res.count;
      });
    },
  },

  methods: {
    // 头部搜索
    serchData() {
      this.value = "";
      let obj = {
        page: 1,
        limit: this.limit,
        account: this.username,
        uname: this.phone,
      };
      //console.log(obj);
      getShoprebate(obj).then((res) => {
        this.tableData = res.data;
        //console.log(res);
        this.pages = res.count;
        this.page = 1;
      });
    },
    // 邀请记录
    history(res) {
      let obj = {
        page: 1,
        limit: this.limit,
        account: this.username,
        uname: this.phone,
        uId: res.shopId,
      };
      //console.log(obj);
      getShoprebate(obj).then((res) => {
        console.log(res);
        this.tableData = res.data;
        //console.log(res);
        this.pages = res.count;
        this.page = 1;
      });
    },

    // 页面数量
    handleSizeChange(val) {
      this.limit = val;
    },
    // 页数
    handleCurrentChange(val) {
      this.page = val;
    },
    // 跳转到积分记录
    gotoRecord(res) {
      console.log(res);
      this.$router.push({
        path: "/merchant/rebate/detail",
        query: { shopId: res.shopId },
      });
    },
  },
  created() {
    let obj = {
      page: this.page,
      limit: this.limit,
    };
    //console.log(obj);
    getShoprebate(obj).then((res) => {
      this.tableData = res.data;
      //console.log(res);
      this.pages = res.count;
    });
  },
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
.shop_rebate_head {
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
.capitalList_table {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: Center;
  overflow: hidden;
  .el-dialog {
    margin: 20 auto !important;
    height: 35%;
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
.coinBox {
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-dialog__header {
  padding: 20px 20px 10px;
  background: rgb(241, 241, 241);
  margin-bottom: 10px;
}
.el-dialog__title {
  line-height: 24px;
  font-size: 16px;
  color: #303133;
}
</style>
