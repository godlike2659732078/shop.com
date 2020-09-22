<template>
  <div class="user-list">
    <!-- 添加按钮 -->
    <p class="table_title">易货列表</p>
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
                v-if="scope.row.share_img"
                :src="scope.row.share_img"
                style="margin-left:40px;display:block;width:40px;"
                alt
              />
            </template>
          </el-table-column>
          <el-table-column align="center" label="背景图" width="100">
            <template slot-scope="scope" class="headImage">
              <img
                v-if="scope.row.cover_img"
                :src="scope.row.cover_img"
                style="margin-left:10px;display:block;width:40px;"
                alt
              />
            </template>
          </el-table-column>
          <el-table-column align="center" prop="anchor_name" label="主播名" width="150"></el-table-column>
          <el-table-column align="center" prop="name" label="直播间名称" width="150"></el-table-column>
          <el-table-column align="center" prop="roomid" label="直播间ID" width="150"></el-table-column>
          <el-table-column align="center" label="直播状态" width="100">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.live_status==101"
                type="warning"
                size="mini"
                style="background-color:#1e9fff;border:none;border-radius:2px;margin-right:10px"
              >直播中</el-button>
              <el-button
                v-else-if="scope.row.live_status==102"
                type="warning"
                size="mini"
                style="background-color:#ffb800;border:none;border-radius:2px;margin-right:10px"
              >未开始</el-button>
              <el-button
                v-else-if="scope.row.live_status==103"
                type="warning"
                size="mini"
                style="background-color:#ffb800;border:none;border-radius:2px;margin-right:10px"
              >已结束</el-button>
              <el-button
                v-else-if="scope.row.live_status==104"
                type="warning"
                size="mini"
                style="background-color:#ffb800;border:none;border-radius:2px;margin-right:10px"
              >禁播</el-button>
              <el-button
                v-else-if="scope.row.live_status==105"
                type="warning"
                size="mini"
                style="background-color:#ffb800;border:none;border-radius:2px;margin-right:10px"
              >暂停</el-button>
              <el-button
                v-else-if="scope.row.live_status==106"
                type="warning"
                size="mini"
                style="background-color:#ffb800;border:none;border-radius:2px;margin-right:10px"
              >异常</el-button>
              <el-button v-else plain size="mini" style="border-radius:2px;margin-right:10px">已过期</el-button>
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            label="开始时间"
            prop="start_time"
            :formatter="formatDate"
            fixed="right"
            width="220"
          ></el-table-column>
          <el-table-column align="center" label="结束时间" prop="end_time" fixed="right" width="220"
           :formatter="formatDates"
          ></el-table-column>
          <el-table-column align="center" label="操作" fixed="right" width="240">
            <template slot-scope="scope">
              <el-button
                type="warning"
                size="mini"
                style="background-color:#009688;border:none;border-radius:2px;margin-right:10px"
                @click="gotoDetail(scope.row)"
              >挑选商品</el-button>
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
import { getLives } from "../../../network/merchant";
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
      getLives(obj).then((res) => {
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
      getLives(obj).then((res) => {
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
      getLives(obj).then((res) => {
        console.log(res);
        this.tableData = res.data;
        this.showList = res.data;
        console.log(res);
        this.pages = res.count;
      });
    },
    formatDate(row, column) {
      let date = new Date(parseInt(row.start_time) * 1000);
      let Y = date.getFullYear() + "-";
      let M =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1) + "-"
          : date.getMonth() + 1 + "-";
      let D =
        date.getDate() < 10 ? "0" + date.getDate() + " " : date.getDate() + " ";
      let h =
        date.getHours() < 10
          ? "0" + date.getHours() + ":"
          : date.getHours() + ":";
      let m =
        date.getMinutes() < 10
          ? "0" + date.getMinutes() + ":"
          : date.getMinutes() + ":";
      let s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    },
      formatDates(row, column) {
      let date = new Date(parseInt(row.end_time) * 1000);
      let Y = date.getFullYear() + "-";
      let M =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1) + "-"
          : date.getMonth() + 1 + "-";
      let D =
        date.getDate() < 10 ? "0" + date.getDate() + " " : date.getDate() + " ";
      let h =
        date.getHours() < 10
          ? "0" + date.getHours() + ":"
          : date.getHours() + ":";
      let m =
        date.getMinutes() < 10
          ? "0" + date.getMinutes() + ":"
          : date.getMinutes() + ":";
      let s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    },
    gotoAdd() {
       this.$router.push({
        path: "/live/liveAdd",
      });
    },
    gotoDetail(res) {
      this.$router.push({
        path: "/merchant/liveShow/goodsList",
        query: {
          roomid: res.roomid,
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
    getLives(obj).then((res) => {
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
