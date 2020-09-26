<template>
  <div class="user-list">
    <!-- 添加按钮 -->
    <p class="table_title">易货列表</p>
    <div class="userserch_block">
      商品名称：
      <el-input
        style="width: 182px; margin-right: 10px"
        v-model="account"
        clearable
      ></el-input>
      店铺名称：
      <el-input
        style="width: 182px; margin-right: 10px"
        v-model="name"
        clearable
      ></el-input
      >开始时间：
      <el-date-picker
        style="width: 300px; margin-right: 10px"
        v-model="user_addTime"
        type="daterange"
        value-format="yyyy-MM-dd"
      ></el-date-picker>

      <el-button type="primary" size="small" @click="serchData">搜索</el-button>
    </div>
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
          <el-table-column
            type="index"
            align="center"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column align="center" label="缩略图" width="100">
            <!--加入下面的内容,scope.row代表这一行,img是显示这一行的哪个字段,我的是img,你的自己看下-->
            <template slot-scope="scope" class="headImage">
              <img
                v-if="scope.row.picture"
                :src="scope.row.picture"
                style="margin-left: 10px; display: block; width: 30px"
                alt
              />
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            prop="name"
            label="商品名称"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            align="left"
            prop="shopName"
            label="店铺名称"
            width="150"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="price"
            label="售价格"
            width="150"
          ></el-table-column>

          <el-table-column
            align="center"
            prop="integrals"
            label="奖励积分"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="tag"
            label="标签"
            width="150"
          ></el-table-column>
          <el-table-column
            align="createTime"
            label="添加时间"
            prop="createTime"
            fixed="right"
            width="220"
          ></el-table-column>
          <el-table-column
            align="center"
            label="操作"
            fixed="right"
            width="240"
          >
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.checked == 0"
                type="warning"
                size="mini"
                style="
                  background-color: #009688;
                  border: none;
                  border-radius: 2px;
                  margin-right: 10px;
                "
                @click="gotoDetail(scope.row)"
                >查看详情</el-button
              >
              <el-button
              plain
                v-else
                type="warning"
                size="mini"
                style="
                
                  border: none;
                  border-radius: 2px;
                  margin-right: 10px;
                "
                >已驳回</el-button
              >
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
import { findGoodsCheckeds } from "../../../network/commodity";
export default {
  components: {},
  data() {
    return {
      name: "",
      account: "",
      user_addTime: "",
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
      let user_addTime = this.user_addTime;
      if (user_addTime != "" && user_addTime != null) {
        user_addTime[0] = user_addTime[0] + " 00:00:00";
        user_addTime[1] = user_addTime[1] + " 23:59:59";
      } else {
        user_addTime = ["", ""];
      }
      let obj = {
        goodsName: this.account,
        shopName: this.name,
        startTime: user_addTime[0],
        endTime: user_addTime[1],
        page: 1,
        limit: 10,
      };
      console.log(obj);
      findGoodsCheckeds(obj).then((res) => {
        console.log(res);
        this.tableData = res.data;
        this.pages = res.count;
      });
    },
    limit() {
      let user_addTime = this.user_addTime;
      if (user_addTime != "" && user_addTime != null) {
        user_addTime[0] = user_addTime[0] + " 00:00:00";
        user_addTime[1] = user_addTime[1] + " 23:59:59";
      } else {
        user_addTime = ["", ""];
      }
      let obj = {
        goodsName: this.account,
        shopName: this.name,
        startTime: user_addTime[0],
        endTime: user_addTime[1],
        page: 1,
        limit: 10,
      };
      console.log(obj);
      findGoodsCheckeds(obj).then((res) => {
        console.log(res);
        this.tableData = res.data;
        this.pages = res.count;
      });
    },
  },
  methods: {
    // 头部搜索
    serchData() {
      let user_addTime = this.user_addTime;
      if (user_addTime != "" && user_addTime != null) {
        user_addTime[0] = user_addTime[0] + " 00:00:00";
        user_addTime[1] = user_addTime[1] + " 23:59:59";
      } else {
        user_addTime = ["", ""];
      }
      let obj = {
        goodsName: this.account,
        shopName: this.name,
        startTime: user_addTime[0],
        endTime: user_addTime[1],
        page: 1,
        limit: 10,
      };
      console.log(obj);
      findGoodsCheckeds(obj).then((res) => {
        console.log(res);
        this.tableData = res.data;
        this.pages = res.count;
        this.page = 1;
      });
    },

    //   获取列表
    getList() {
      let obj = {
        uId: this.$route.query.uId,
        page: this.page,
        limit: this.limit,
      };
      console.log(obj);
      findGoodsCheckeds(obj).then((res) => {
        console.log(res);
        this.tableData = res.data;
        this.showList = res.data;
        console.log(res);
        this.pages = res.count;
      });
    },
    gotoDetail(res) {
      this.$router.push({
        path: "/commodity/check/form",
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
    findGoodsCheckeds(obj).then((res) => {
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
  padding: 15px;
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
