<template>
  <div class="user-list">
    <!-- 添加按钮 -->
    <p class="table_title">易货列表</p>
    <!-- 搜索列表 -->
    <div class="userList_content">
      <!-- 用户信息列表 -->
      <div class="userList">
        <div class="barter_head"></div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width:100% overflow:scroll"
          class="userList_table"
        >
          <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
          <el-table-column align="left" prop="account" label="账号" width="150"></el-table-column>
          <el-table-column align="center" prop="status" label="状态" width="100">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.status==1"
                type="warning"
                size="mini"
                style="background-color:#1e9fff;border:none;border-radius:2px;margin-right:10px"
              >已通过</el-button>
              <el-button
                v-else-if="scope.row.status==2"
                type="warning"
                size="mini"
                style="background-color:#ffb800;border:none;border-radius:2px;margin-right:10px"
              >已拒绝</el-button>
              <el-button v-else plain size="mini" style="border-radius:2px;margin-right:10px">待审核</el-button>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="goodsName" label="商品名称" width="150"></el-table-column>

          <el-table-column align="center" prop="detail" label="商品详情"></el-table-column>

          <el-table-column
            align="createTime"
            label="添加时间"
            prop="createTime"
            fixed="right"
            width="220"
          ></el-table-column>
          <el-table-column align="center" label="操作" fixed="right" width="240">
            <template slot-scope="scope">
              <el-button
                type="warning"
                size="mini"
                style="background-color:#009688;border:none;border-radius:2px;margin-right:10px"
                @click="gotoDetail(scope.row)"
              >查看详情</el-button>
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
import { findAllGoods } from "../../../network/merchant";
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
      let obj = {
      page: this.page,
      limit: this.limit,
    };
    console.log(obj);
    findAllGoods(obj).then((res) => {
      console.log(res);
      this.tableData = res.data;
      this.pages = res.count;
    });
    },
    limit() {
      let obj = {
      page: this.page,
      limit: this.limit,
    };
    console.log(obj);
    findAllGoods(obj).then((res) => {
      console.log(res);
      this.tableData = res.data;
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
      findAllGoods(obj).then((res) => {
        console.log(res);
        this.tableData = res.data;
        this.showList = res.data;
        console.log(res);
        this.pages = res.count;
      });
    },
    gotoDetail(res) {
      this.$router.push({
        path: "/barter/barterGoodsForm",
        query: {
          id: res.id,
        },
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
    console.log(obj);
    findAllGoods(obj).then((res) => {
      console.log(res);
      this.tableData = res.data;
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
.barter_head {
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
