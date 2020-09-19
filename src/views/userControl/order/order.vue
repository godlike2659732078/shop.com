<template>
  <div class="user-list">
    <!-- 添加按钮 -->
    <p class="table_title">vip订单</p>
    <!-- 搜索列表 -->
    <div class="userList_content">
      <div class="userserch_block">
        手机号：
        <el-input style="width:182px;margin-right:10px" v-model="phone" clearable></el-input>订单类型：
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button type="primary" style="margin-left:10px" size="small" @click="serchData">搜索</el-button>
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
          <el-table-column align="center" prop="order_no" label="订单号" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column align="center" prop="user_id" label="uid" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column align="center" prop="phone" label="手机号" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column align="center" prop="username" label="用户名" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column align="center" prop="fee" label="金额" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column align="center" prop="type" label="订单类型" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column
            align="center"
            prop="create_time"
            label="创建时间"
            :show-overflow-tooltip="true"
          ></el-table-column>
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
import { getvipOrder, passReal } from "../../../network/userControl";
export default {
  components: {},
  data() {
    return {
      phone: "",
      value: "",
      options: [
          {
            value:"",
            label:"全部"  
          },
        {
          value: "vip",
          label: "vip",
        },
        {
          value: "svip",
          label: "svip",
        },
        
      ],
      tableData: [],
      currentPage4: 1,
      pages: null,
      multipleSelection: [],
      page: 1,
      limit: 10,
      labelPosition: "left",
      index: "",
    };
  },
  watch: {
    page() {
      let obj = {
        page: this.page,
        limit: this.limit,
        phone:this.phone,
        type:this.value
      };
      getvipOrder(obj).then((res) => {
        //console.log(res);
        this.tableData = res.data;
        this.pages = res.count;
      });
    },
    limit() {
        let obj = {
        page: this.page,
        limit: this.limit,
        phone:this.phone,
        type:this.value
      };
      getvipOrder(obj).then((res) => {
        //console.log(res);
        this.tableData = res.data;
        this.pages = res.count;
      });
    },
  },
  methods: {
    // 头部搜索
    serchData() {
      let obj = {
        page: this.page,
        limit: this.limit,
        phone:this.phone,
        type:this.value
      };
      getvipOrder(obj).then((res) => {
        //console.log(res);
        this.tableData = res.data;
        this.pages = res.count;
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
  },

  created() {
    let obj = {
      page: this.page,
      limit: this.limit,
    };
    getvipOrder(obj).then((res) => {
      //console.log(res);
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
</style>
