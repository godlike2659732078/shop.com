<template>
  <div class="user-list">
    <!-- 添加按钮 -->
    <p class="table_title">积分记录</p>
    <!-- 搜索列表 -->
    <div class="userList_content">
      <div class="userserch_block">
        开始时间：
        <el-date-picker
          v-model="date1"
          style="margin-right:10px"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>结束时间：
        <el-date-picker
          v-model="date2"
          style="margin-right:10px"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
        <el-button type="primary" size="small" @click="serchData">搜索</el-button>
      </div>
      <!-- 用户信息列表 -->
      <div class="userList">
        <div class="moner_record_head"></div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width:100% overflow:scroll"
          class="userList_table"
        >
          <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
          <el-table-column align="left" prop="orderNo" label="订单号" width="200"></el-table-column>

          <el-table-column align="center" prop="operationUse" label="操作可用" width="100"></el-table-column>
          <el-table-column align="center" prop="balanceUse" label="最新可用" width="100"></el-table-column>
          <el-table-column align="center" prop="operationFrozen" label="操作冻结" width="100"></el-table-column>
          <el-table-column
            align="center"
            prop="balanceFrozen"
            label="最新冻结"
            width="160"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column align="center" prop="operationEnsure" label="操作保证金" width="110"></el-table-column>
          <el-table-column align="center" prop="balanceEnsure" label="最新保证金" width="120"></el-table-column>
          <el-table-column align="center" prop="operation" label="备注" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column align="center" prop="creatorName" label="操作人" width="90"></el-table-column>
          <el-table-column align="center" label="操作时间" prop="createTime" fixed="right" width="220"></el-table-column>
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
import { findAllAccountTurnover } from "../../../network/merchant";
export default {
  components: {},
  data() {
    return {
      date1: "",
      date2: "",
      tableData: [],
      showList: [],
      currentPage4: 1,
      pages: null,
      multipleSelection: [],
      page: 1,
      limit: 10,
      editForm: {
        useNum: 0,
        frozenNum: 0,
        remarks: "",
      },
      useAmt: "",
      frozenAmt: "",
      uId: "",
      labelPosition: "left",
      index: "",
    };
  },
  watch: {
    page() {
       let endTime = "";
      let startTime = "";
      if (this.date2 == "" || this.date2 == null) {
        endTime = "";
      } else {
        endTime = this.date2 + " 00:00:00";
      }
      if (this.date1 == "" || this.date1 == null) {
        startTime = "";
      } else {
        startTime = this.date1 + " 23:59:59";
      }
      let obj = {
        uId: this.$route.query.userId,
        page: this.page,
        limit: this.limit,
        endTime: endTime,
        startTime: startTime,
      };
      console.log(obj);
      findAllAccountTurnover(obj).then((res) => {
        console.log(res);
        this.tableData = res.data;
        this.showList = res.data;
        console.log(res);
        this.pages = res.count;
      });
    },
    limit() {
        let endTime = "";
      let startTime = "";
      if (this.date2 == "" || this.date2 == null) {
        endTime = "";
      } else {
        endTime = this.date2 + " 00:00:00";
      }
      if (this.date1 == "" || this.date1 == null) {
        startTime = "";
      } else {
        startTime = this.date1 + " 23:59:59";
      }
      let obj = {
        uId: this.$route.query.userId,
        page: this.page,
        limit: this.limit,
        endTime: endTime,
        startTime: startTime,
      };
      console.log(obj);
      findAllAccountTurnover(obj).then((res) => {
        console.log(res);
        this.tableData = res.data;
        this.showList = res.data;
        console.log(res);
        this.pages = res.count;
      });
    },
  },
  methods: {
    //   获取列表
    getList() {
      let obj = {
        uId: this.$route.query.uId,
        page: this.page,
        limit: this.limit,
      };
      console.log(obj);
      findAllAccountTurnover(obj).then((res) => {
        console.log(res);
        this.tableData = res.data;
        this.showList = res.data;
        console.log(res);
        this.pages = res.count;
      });
    },
    // 头部搜索
    serchData() {
      let endTime = "";
      let startTime = "";
      if (this.date2 == "" || this.date2 == null) {
        endTime = "";
      } else {
        endTime = this.date2 + " 00:00:00";
      }
      if (this.date1 == "" || this.date1 == null) {
        startTime = "";
      } else {
        startTime = this.date1 + " 23:59:59";
      }
      let obj = {
        uId: this.$route.query.userId,
        page: 1,
        limit: 10,
        endTime: endTime,
        startTime: startTime,
      };
      console.log(obj);
      findAllAccountTurnover(obj).then((res) => {
        console.log(res);
        this.tableData = res.data;
        this.showList = res.data;
        console.log(res);
        this.pages = res.count;
        this.page=1
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
  },
  created() {
    console.log(this.$route.query.uId);
    let obj = {
      uId: this.$route.query.uId,
      page: this.page,
      limit: this.limit,
    };
    console.log(obj);
    findAllAccountTurnover(obj).then((res) => {
      console.log(res);
      this.tableData = res.data;
      this.showList = res.data;
      console.log(res);
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
.moner_record_head {
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
.allTable {
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
