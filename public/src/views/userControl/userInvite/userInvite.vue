<template>
  <div class="user-list">
    <!-- 添加按钮 -->
    <p class="table_title">用户邀请</p>
    <!-- 搜索列表 -->
    <div class="userList_content">
      <div class="userserch_block">
        用户名：
        <el-input style="width:182px;margin-right:10px" v-model="username" clearable></el-input>手机号：
        <el-input style="width:182px;margin-right:10px" v-model="phone" clearable></el-input>
        <el-button type="primary" size="small" style="margin-right:10px" @click="serchData">搜索</el-button>排序：
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <!-- 用户信息列表 -->
      <div class="userList">
        <div class="userInvite_head">
         
        </div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width:100% overflow:scroll"
          class="userList_table"
        >
          <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
          <el-table-column align="left" prop="nickName" label="用户名" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column align="center" prop="phone" label="手机号" width="150"></el-table-column>
          <el-table-column align="center" prop="firstNum" label="一级人数" ></el-table-column>
          <el-table-column
            align="center"
            prop="secondNum"
            label="二级人数"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column  align="center" label="操作" fixed="right" width="240">
            <template slot-scope="scope">
              <el-button
                type="warning"
                size="mini"
                style="background-color:#009688;border:none;border-radius:2px;margin-right:10px"
                @click="history(scope.row)"
              >邀请记录</el-button>
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
  findBackRMB,
  editUsercap,
  froAccount,
  unfroAccount,
} from "../../../network/userControl";
export default {
  components: {},
  data() {
    return {
      username: "",
      phone: "",
      options: [
        {
          value: "",
          label: "正序",
        },
        {
          value: "0",
          label: "倒序",
        },
        {
          value: "1",
          label: "一级返佣（可用）",
        },
        {
          value: "2",
          label: "一级返佣（冻结）",
        },
        {
          value: "3",
          label: "二级返佣（可用）",
        },
        {
          value: "4",
          label: "二级返佣（冻结）",
        },
        {
          value: "5",
          label: "一级邀请人数",
        },
        {
          value: "6",
          label: "二级邀请人数",
        },
      ],
      value: "",
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
        page: this.page,
        limit: this.limit,
        amtType: "",
        uname: this.username,
        phone: this.phone,
      };
      //console.log(obj);
      findBackRMB(obj).then((res) => {
        this.tableData = res.data;
        //console.log(res);
        this.pages = res.count;
      });
    },
    limit() {
      let obj = {
        page: this.page,
        limit: this.limit,
        amtType: "",
        uname: this.username,
        phone: this.phone,
      };
      //console.log(obj);
      findBackRMB(obj).then((res) => {
        this.tableData = res.data;
        //console.log(res);
        this.pages = res.count;
      });
    },
    value(res) {
      let obj = {
        page: 1,
        limit: 10,
        amtType: res,
        uname: this.username,
        phone: this.phone,
      };
      //console.log(obj);
      findBackRMB(obj).then((res) => {
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
        amtType: "",
        uname: this.username,
        phone: this.phone,
      };
      //console.log(obj);
      findBackRMB(obj).then((res) => {
        this.tableData = res.data;
        //console.log(res);
        this.pages = res.count;
        this.page = 1;
      });
    },
    history(res) {
     console.log(res);
      this.$router.push({
        path: "/user/userInvite/detail",
        query: { id: res.userId },
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
    let obj = {
      page: this.page,
      limit: this.limit,
    };
    //console.log(obj);
    findBackRMB(obj).then((res) => {
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
.userInvite_head {
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

.coinBox {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
