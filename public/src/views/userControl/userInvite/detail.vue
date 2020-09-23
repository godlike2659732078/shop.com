<template>
  <div class="user-list">
    <!-- 添加按钮 -->
    <p class="table_title">邀请记录</p>
    <!-- 搜索列表 -->
    <div class="userList_content">
      <div class="userserch_block">
        手机号：
        <el-input style="width:182px;margin-right:10px" v-model="phone" clearable></el-input>用户身份：
        <el-select v-model="value" placeholder="请选择" style="width:182px;margin-right:10px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>邀请等级：
        <el-select v-model="values" placeholder="请选择" style="width:182px;margin-right:10px">
          <el-option
            v-for="item in optionss"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button type="primary" size="small" style="margin-right:10px" @click="serchData">搜索</el-button>
      </div>
      <!-- 用户信息列表 -->
      <div class="userList">
        <div class="userInvite_head"></div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width:100% overflow:scroll"
          class="userList_table"
        >
          <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
          <el-table-column align="left" prop="nickName" label="用户名" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column align="center" prop="acount" label="账号" width="150"></el-table-column>
          <el-table-column align="center" prop="firstNum" label="用户身份">
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
          <el-table-column
            align="center"
            prop="secondNum"
            label="邀请等级"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.grade==1"
                type="warning"
                size="mini"
                style="background-color:#009688;border:none;border-radius:2px;margin-right:10px"
              >一级邀请</el-button>
              <el-button v-else plain size="mini" style="border-radius:2px;margin-right:10px">二级邀请</el-button>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="firstNum" label="是否实名">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.isAuth==1"
                type="warning"
                size="mini"
                style="background-color:#009688;border:none;border-radius:2px;margin-right:10px"
              >已实名</el-button>
              <el-button v-else plain size="mini" style="border-radius:2px;margin-right:10px">未实名</el-button>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="createTime" label="注册时间"></el-table-column>
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
  getInviteDetail,
  editUsercap,
  froAccount,
  unfroAccount,
} from "../../../network/userControl";
export default {
  components: {},
  data() {
    return {
      phone: "",
      options: [
        {
          value: "",
          label: "全部",
        },
        {
          value: 1,
          label: "普通用户",
        },
        {
          value: 2,
          label: "vip",
        },
        {
          value: 3,
          label: "svip",
        },
      ],
      optionss: [
        {
          value: 3,
          label: "全部",
        },
        {
          value: 1,
          label: "一级邀请",
        },
        {
          value: 2,
          label: "二级邀请",
        },
      ],
      value: "",
      values: 3,
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
        userId: this.$route.query.id,
        phone: this.phone,
        level: this.value,
        type: this.values,
      };
      console.log(obj);
      getInviteDetail(obj).then((res) => {
        console.log(res);
        this.tableData = res.data;
        //console.log(res);
        this.pages = res.count;
      });
    },
    limit() {
    let obj = {
        page: this.page,
        limit: this.limit,
        userId: this.$route.query.id,
        phone: this.phone,
        level: this.value,
        type: this.values,
      };
      console.log(obj);
      getInviteDetail(obj).then((res) => {
        console.log(res);
        this.tableData = res.data;
        //console.log(res);
        this.pages = res.count;
        this.page = 1;
      });
    },
  },

  methods: {
    // 头部搜索
    serchData() {
        console.log(this.values)
      let obj = {
        page: this.page,
        limit: this.limit,
        userId: this.$route.query.id,
        phone: this.phone,
        level: this.value,
        type: this.values,
      };
      console.log(obj);
      getInviteDetail(obj).then((res) => {
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
  },
  created() {
    console.log(this.$route.query.id);
    let obj = {
      page: this.page,
      limit: this.limit,
      userId: this.$route.query.id,
      type: "3",
    };
    //console.log(obj);
    getInviteDetail(obj).then((res) => {
      console.log(res);
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
