<template>
  <div class="user-list">
    <!-- 添加按钮 -->
    <p class="table_title">导入商品</p>
    <!-- 搜索列表 -->
    <div class="userList_content">
      <!-- 用户信息列表 -->
      <div class="userList">
        <div class="live_head">
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
          <el-table-column align="center" label="分享图" width="150">
            <template slot-scope="scope" class="headImage">
              <img
                v-if="scope.row.coverImgUrl"
                :src="scope.row.coverImgUrl"
                style="margin-left:40px;display:block;width:40px;"
                alt
              />
            </template>
          </el-table-column>

          <el-table-column align="center" prop="name" label="商品名"></el-table-column>
          <el-table-column align="center" prop="price" label="商品价格"></el-table-column>
          <el-table-column align="center" label="操作" fixed="right" width="240">
            <template slot-scope="scope">
              <el-button
                type="warning"
                size="mini"
                style="background-color:#009688;border:none;border-radius:2px;margin-right:10px"
                @click="imports(scope.row)"
              >导入商品</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="200"
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
import { getLivegoods, importLivegoods } from "../../../network/merchant";
export default {
  components: {},
  data() {
    return {
      tableData: [],
      showList: [],
      currentPage4: 1,
      pages: null,
      multipleSelection: [],
      page: 1,
      limit: 200,
      roomid: null,
      labelPosition: "left",
      index: "",
    };
  },
  watch: {
    page() {
      let obj = {
        offset: 0,
        limit: this.limit,
        status: 2,
      };
      getLivegoods(obj).then((res) => {
        console.log(res);
        this.tableData = res.data;
        this.pages = res.count;
      });
    },
    limit() {
      let obj = {
        offset: 0,
        limit: this.limit,
        status: 2,
      };
      getLivegoods(obj).then((res) => {
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
        offset: 0,
        limit: this.limit,
        status: 2,
      };
      getLivegoods(obj).then((res) => {
        console.log(res);
        this.tableData = res.data;
        this.pages = res.count;
      });
    },

    gotoAdd() {},
    imports(res) {
      console.log(res);
      let idArr = [res.goodsId];
      let obj = {
        roomId: this.roomid,
        ids: idArr,
      };
      console.log(obj);
      importLivegoods(obj).then((res) => {
        if (res.code == 0) {
          this.$message({
            type: "success",
            message: "导入成功！",
          });
        } else {
          this.$message.error("导入失败！");
        }
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
    this.roomid = this.$route.query.roomid;
    let obj = {
      offset: 0,
      limit: this.limit,
      status: 2,
    };
    getLivegoods(obj).then((res) => {
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
.live_head {
  padding: 10px;
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
