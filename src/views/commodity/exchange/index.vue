<template>
  <div class="user-list">
    <!-- 添加按钮 -->
    <p class="table_title">CMT商家列表</p>
    <!-- 搜索列表 -->
    <div class="userList_content">
      <div class="userserch_block">
        商品名称：
        <el-input style="width:182px;margin-right:10px" v-model="goodsName" clearable></el-input>时间搜索：
        <el-date-picker
          style="width:300px;margin-right:10px"
          v-model="user_addTime"
          type="daterange"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
        <el-button type="primary" size="small" @click="serchData">搜索</el-button>
      </div>
      <!-- 用户信息列表 -->
      <div class="userList">
        <div class="userList_head">
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
          <el-table-column align="center" label="缩略图" width="100">
            <!--加入下面的内容,scope.row代表这一行,img是显示这一行的哪个字段,我的是img,你的自己看下-->
            <template slot-scope="scope" class="headImage">
              <img
                v-if="scope.row.picture"
                :src="scope.row.picture"
                style="margin-left:10px;display:block;width:30px;"
                alt
              />
            </template>
          </el-table-column>

          <el-table-column align="center" prop="name" label="商品名称" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column align="center" prop="id" label="商品ID"></el-table-column>
          <el-table-column align="center" prop="quantity" label="限制数量"></el-table-column>
          <el-table-column align="center" prop="price" label="销售价格"></el-table-column>
          <el-table-column align="center" prop="integralPrice" label="积分价格"></el-table-column>
          <el-table-column align="center" prop="amount" label="库存"></el-table-column>
          <el-table-column align="center" prop="sort" label="排序" width="80"></el-table-column>
          <el-table-column align="center" prop="freight" label="邮费"></el-table-column>
          <el-table-column align="center" prop="className" label="分类"></el-table-column>
          <el-table-column align="center" prop="status" label="状态" width="100">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.status==0"
                plain
                size="mini"
                style="border-radius:2px;margin-right:10px"
              >已下架</el-button>
              <el-button
                v-else
                type="warning"
                size="mini"
                style="background-color:#009688;border:none;border-radius:2px;margin-right:10px"
              >已上架</el-button>
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            prop="createTime"
            label="添加时间"
            fixed="right"
            width="180px"
          ></el-table-column>
          <el-table-column align="center" label="操作" fixed="right" width="240px">
            <template slot-scope="scope">
              <el-button
                type="warning"
                size="mini"
                style="background-color:#009688;border:none;border-radius:2px;margin-right:10px"
                icon="el-icon-edit"
                @click="eidt(scope.row)"
              >编辑</el-button>
              <el-button
                v-if="scope.row.status==0"
                plain
                size="mini"
                style="border-radius:2px;margin-right:10px"
                @click="upFace(scope.row)"
              >上架</el-button>
              <el-button
                v-else
                type="warning"
                size="mini"
                style="background-color:#ffb800;border:none;border-radius:2px;margin-right:10px"
                @click="downFace(scope.row)"
              >下架</el-button>
              <el-button
                type="warning"
                size="mini"
                style="background-color:#ff5722;border:none;border-radius:2px;margin-right:10px"
                icon="el-icon-delete"
                @click="delOne(scope.row)"
              >删除</el-button>
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
import { allSysGoods, upShopClass, delGoods } from "../../../network/commodity";
export default {
  components: {},
  data() {
    return {
      goodsName: "",
      phone: "",
      address: "",
      user_addTime: "",
      tableData: [],
      currentPage4: 1,
      pages: null,
      multipleSelection: [],
      page: 1,
      limit: 10,
      editForm: {},
      labelPosition: "left",
      edit: false,
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
        page: this.page,
        limit: this.limit,
        goodsName: this.goodsName,
        startTime: user_addTime[0],
        endTime: user_addTime[1],
      };
      console.log(obj);
      allSysGoods(obj).then((res) => {
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
        page: this.page,
        limit: this.limit,
        goodsName: this.goodsName,
        startTime: user_addTime[0],
        endTime: user_addTime[1],
      };
      console.log(obj);
      allSysGoods(obj).then((res) => {
        console.log(res);
        this.tableData = res.data;
        this.pages = res.count;
      });
    },
  },
  methods: {
    // 获取列表
    getList() {
      let obj = {
        page: this.page,
        limit: this.limit,
      };
      allSysGoods(obj).then((res) => {
        //console.log(res);
        this.tableData = res.data;
        this.pages = res.count;
      });
    },
    serchData() {
      let user_addTime = this.user_addTime;
      if (user_addTime != "" && user_addTime != null) {
        user_addTime[0] = user_addTime[0] + " 00:00:00";
        user_addTime[1] = user_addTime[1] + " 23:59:59";
      } else {
        user_addTime = ["", ""];
      }
      let obj = {
        goodsName: this.goodsName,
        startTime: user_addTime[0],
        endTime: user_addTime[1],
      };
      console.log(obj);
      allSysGoods(obj).then((res) => {
        console.log(res);
        this.tableData = res.data;
        this.pages = res.count;
        this.page = 1;
      });
    },
    // 点击编辑事件
    eidt(res) {
      console.log(res);
      this.$router.push({
        path: "/commodity/merClass/edit",
        query: {
          id: res.id,
        },
      });
    },
    downFace(res) {
      this.$confirm("是否下架该商品？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let obj = this.$qs.stringify({
            id: res.id,
            status: 0,
          });
          upShopClass(obj).then((res) => {
            console.log(res);
            if (res.code == 0) {
              this.$message({
                type: "success",
                message: res.msg,
              });
              this.getList();
            } else {
              this.$message.error("操作失败！");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消操作",
          });
        });
    },
    upFace(res) {
      this.$confirm("是否上架该商品？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let obj = this.$qs.stringify({
            id: res.id,
            status: 1,
          });
          upShopClass(obj).then((res) => {
            if (res.code == 0) {
              this.$message({
                type: "success",
                message: res.msg,
              });
              this.getList();
            } else {
              this.$message.error("操作失败！");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消操作",
          });
        });
    },
    // 删除单个商家
    delOne(res) {
      this.$confirm("是否删除该分类？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let obj = this.$qs.stringify({
            goodsId: res.id,
          });
          delGoods(obj).then((res) => {
            // //console.log(res);
            this.$message({
              type: "success",
              message: res.msg,
            });
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消操作",
          });
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
    gotoAdd() {
      this.$router.push({ path: "/commodity/exchange/add" });
    },
    gotoCredits(res) {
      // this.$router.push({ path: "/credits", query: { uId: res.uId } });
    },
  },

  created() {
    let obj = {
      page: this.page,
      limit: this.limit,
    };
    allSysGoods(obj).then((res) => {
      console.log(res);
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
.userList_head {
  padding: 10px 15px;
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

.timeline {
  margin-left: 20px;
}
.user_edit {
  background: rgb(255, 184, 0);
  border: none;
}
.user_look {
  border: none;
}
</style>
