<template>
  <div class="user-list">
    <!-- 添加按钮 -->
    <p class="table_title">基本资料</p>
    <!-- 搜索列表 -->
    <div class="userList_content">
      <div class="userserch_block">
        用户名：
        <el-input style="width:182px;margin-right:10px" v-model="username" clearable></el-input>手机号：
        <el-input style="width:182px;margin-right:10px" v-model="phone" clearable></el-input>
        <el-button type="primary" size="small" @click="serchData">搜索</el-button>
      </div>
      <!-- 用户信息列表 -->
      <div class="userList">
        <div class="userList_head"></div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width:100% overflow:scroll"
          class="userList_table"
        >
          <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>

          <el-table-column align="left" prop="orderNo" label="订单号"></el-table-column>
          <el-table-column
            align="left"
            prop="nickName"
            label="消费者"
            :show-overflow-tooltip="true"
            width="220"
          ></el-table-column>
          <el-table-column align="center" prop="phone" label="手机号" width="150"></el-table-column>
          <el-table-column align="center" prop="type" label="返佣状态" width="100"></el-table-column>
          <el-table-column
            align="center"
            prop="operation"
            label="备注"
            :show-overflow-tooltip="true"
            width="220"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="type"
            label="邀请等级"
            width="160"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column align="center" prop="createTime" label="消费时间" width="190"></el-table-column>
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
      <el-dialog width="30%" title="修改积分" class="credits_table" :visible.sync="edit">
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          :model="editForm"
          :index="index"
        >
          <el-form-item label="可用积分">
            <div class="coinBox">
              {{useAmt}}
              <el-input
                v-model="editForm.useNum"
                placeholder="减少请输入“ - ”"
                style="width:190px;margin-left:20px"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item label="冻结积分">
            <div class="coinBox">
              {{frozenAmt}}
              <el-input
                v-model="editForm.frozenNum"
                placeholder="减少请输入“ - ”"
                style="width:190px;margin-left:20px"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="editForm.remarks" style="width:200px"></el-input>
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
import { findBackDetail, editInt } from "../../../network/userControl";
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
      let obj = {
        //   uId: this.$route.query.userId,
        typeStr: "7",
        page: 1,
        limit: this.limit,
        uname: this.username,
        phone: this.phone,
      };
      console.log(obj);
      findBackDetail(obj).then((res) => {
        this.tableData = res.data;
        console.log(res);
        this.pages = res.count;
        this.page = 1;
      });
    },
    limit() {
      let obj = {
        //   uId: this.$route.query.userId,
        typeStr: "7",
        page: 1,
        limit: this.limit,
        uname: this.username,
        phone: this.phone,
      };
      console.log(obj);
      findBackDetail(obj).then((res) => {
        this.tableData = res.data;
        console.log(res);
        this.pages = res.count;
        this.page = 1;
      });
    },
  },
  methods: {
    // 头部搜索
    serchData() {
      let obj = {
        //   uId: this.$route.query.userId,
        typeStr: "7",
        page: this.page,
        limit: this.limit,
        uname: this.username,
        phone: this.phone,
      };
      console.log(obj);
      findBackDetail(obj).then((res) => {
        this.tableData = res.data;
        console.log(res);
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
  },
  created() {
    console.log(this.$route.query.userId);
    let obj = {
        uId: this.$route.query.userId,
      typeStr: "7",
      page: this.page,
      limit: this.limit,
    };
    console.log(obj);
    findBackDetail(obj).then((res) => {
      this.tableData = res.data;
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
.userList_head {
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
.credits_table {
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
